#!/bin/bash -e

if [[ "$TRAVIS_BRANCH" == "$PRODUCTION_BRANCH" ]]; then
  echo "Invalidating cloudfront caching... "
  npm run invalidate-cf

  echo "Upload guide document index to Algolia... "
  npm run site-index
fi
