#!/usr/bin/env sh

set -e

export JASMINE_CONFIG_PATH=test/support/jasmine.json

./node_modules/.bin/tsc -p ./test/tsconfig.json --noEmit
./node_modules/.bin/ts-node -P ./test/tsconfig.json ./node_modules/jasmine/bin/jasmine.js
