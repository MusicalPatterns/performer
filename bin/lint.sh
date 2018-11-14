#!/usr/bin/env sh

set -e

./node_modules/.bin/tslint '**/*.ts{,x}' -e **/node_modules/** --fix --project tsconfig.json

./node_modules/.bin/tslint 'test/**/*.ts' --fix --project test/tsconfig.json
