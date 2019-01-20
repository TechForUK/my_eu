#!/usr/bin/env bash

set -e

ENVIRONMENT=$1
if [ "$ENVIRONMENT" = "production" ]; then
  SUBDOMAIN=www
  if [[ -n $(git status -s) ]]; then
    echo 'Please commit all changes before deploying so we get a hash.'
    exit
  fi
elif [ "$ENVIRONMENT" = "staging" ]; then
  SUBDOMAIN=staging
else
  echo 'Please specify environment (production or staging)'
  exit
fi

# This is picked up in the rollbar config.
export ROLLBAR_CODE_VERSION=`git rev-parse --verify HEAD`

npm run build

# Copy assets and hashed files with long-term caching headers.
gsutil -m -h "Cache-Control:public,max-age=31536000" \
  rsync -c -r -j js,css \
    -x 'static\..+\.js(\.map)?$|.+\.html$|.+\.txt$|signs/|signs.json$' \
  dist gs://$SUBDOMAIN.myeu.uk

# Copy unhashed html files with the default caching headers.
gsutil -m \
  rsync -c -r -j js,css -x 'static\..+\.js$' \
  dist gs://$SUBDOMAIN.myeu.uk

# Update rollbar for error tracking across deploys.
if [ "$ENVIRONMENT" = "production" ]; then
  if [ -n "$ROLLBAR_DEPLOY_ACCESS_TOKEN" ]; then
    LOCAL_USERNAME=`whoami`
    curl https://api.rollbar.com/api/1/deploy/ \
      -F access_token=$ROLLBAR_DEPLOY_ACCESS_TOKEN \
      -F environment=$ENVIRONMENT \
      -F revision=$ROLLBAR_CODE_VERSION \
      -F local_username=$LOCAL_USERNAME
  fi
fi
