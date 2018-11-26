.PHONY: lint
.PHONY: test

publish:
	sh ./node_modules/.bin/musical-patterns publish

test:
	sh ./node_modules/.bin/musical-patterns test

lint:
	sh ./node_modules/.bin/musical-patterns lint

build:
	sh ./node_modules/.bin/musical-patterns build --command ./node_modules/.bin/webpack
