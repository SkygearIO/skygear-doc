#!/bin/bash -e

if [[ "$TRAVIS_BRANCH" == "$PRODUCTION_BRANCH" ]]; then
  echo -n "Preparing for production deployment... "
  mv build/production-robots.txt build/robots.txt
  echo "Done"
  echo "Removing existing files on production..."
  aws s3 rm s3://$PRODUCTION_BUCKET --recursive --exclude "android/*" --exclude "ios/*"
  echo "Done"
fi

if [[ "$TRAVIS_BRANCH" == "$STAGING_BRANCH" ]]; then
  echo "Removing existing files on staging..."
  aws s3 rm s3://$STAGING_BUCKET --recursive --exclude "android/*" --exclude "ios/*"
  echo "Done"
fi
