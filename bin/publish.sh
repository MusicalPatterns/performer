#!/usr/bin/env sh

set -e

make build
npm i
npm publish --access public
