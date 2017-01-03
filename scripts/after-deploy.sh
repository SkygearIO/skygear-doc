#!/bin/bash -e

if [[ "$TRAVIS_BRANCH" == "$PRODUCTION_BRANCH" ]]; then
  echo "Invalidating cloudfront caching... "
  npm run invalidate-cf
fi
