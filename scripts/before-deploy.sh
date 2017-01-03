#!/bin/bash -e

if [[ "$TRAVIS_BRANCH" == "$PRODUCTION_BRANCH" ]]; then
  echo -n "Preparing for production deployment... "
  mv build/production-robots.txt build/robots.txt
  echo "Done"
fi

