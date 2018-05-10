#!/bin/bash

if [ $# != 2 ]; then
  echo 'Usage: upload-sourcemaps platform[ios/android] bugsnag-api-key'
  exit -1
fi

PLATFORM=$1
API_KEY=$2

npx react-native bundle \
--platform $PLATFORM \
--dev false \
--entry-file index.js \
--bundle-output $PLATFORM-release.bundle \
--sourcemap-output $PLATFORM-release.bundle.map

npx bugsnag-sourcemaps upload \
--api-key $API_KEY \
--minified-file $PLATFORM-release.bundle \
--source-map $PLATFORM-release.bundle.map \
--minified-url main.jsbundle \
--upload-sources
