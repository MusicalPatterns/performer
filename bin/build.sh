#!/usr/bin/env sh

set -e

rm -rf dist/
NODE_ENV=production ./node_modules/.bin/webpack
