#!/usr/bin/env sh

set -e

rm -rf dist/
./node_modules/.bin/webpack
