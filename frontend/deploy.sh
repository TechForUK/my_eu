#!/usr/bin/env bash

set -e

npm run build

# Copy assets and hashed files with long-term caching headers.
gsutil -m -h "Cache-Control:public,max-age=31536000" \
  rsync -c -r -j js,css -x 'static\..+\.js$|.+\.html$|.+\.txt$' \
  dist gs://www.myeu.uk

# Copy unhashed html files with the default caching headers.
gsutil -m \
  rsync -c -r -j js,css -x 'static\..+\.js$' \
  dist gs://www.myeu.uk
