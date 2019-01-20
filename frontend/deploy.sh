#!/usr/bin/env bash

set -e

if [[ -n $(git status -s) ]]; then
  echo 'Please commit all changes before deploying so we get a hash.'
  exit
fi

npm run build

# Copy assets and hashed files with long-term caching headers.
gsutil -m -h "Cache-Control:public,max-age=31536000" \
  rsync -c -r -j js,css \
    -x 'static\..+\.js$|.+\.html$|.+\.txt$|signs/|signs.json$' \
  dist gs://www.myeu.uk

# Copy unhashed html files with the default caching headers.
gsutil -m \
  rsync -c -r -j js,css -x 'static\..+\.js$' \
  dist gs://www.myeu.uk

# Update rollbar for error tracking across deploys.
if [ -n "$ROLLBAR_DEPLOY_ACCESS_TOKEN" ]; then
  ENVIRONMENT=production
  LOCAL_USERNAME=`whoami`
  REVISION=`git rev-parse --verify HEAD`
  curl https://api.rollbar.com/api/1/deploy/ \
    -F access_token=$ROLLBAR_DEPLOY_ACCESS_TOKEN \
    -F environment=$ENVIRONMENT \
    -F revision=$REVISION \
    -F local_username=$LOCAL_USERNAME
fi
