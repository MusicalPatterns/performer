.PHONY: lint
.PHONY: test

publish:
	sh ./node_modules/.bin/musical-patterns publish

test:
	./bin/test.sh

lint:
	sh ./node_modules/.bin/musical-patterns lint

build:
	sh ./node_modules/.bin/webpack
