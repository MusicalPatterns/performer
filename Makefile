.PHONY: test, lint

publish:
	musical-patterns publish

test:
	musical-patterns test

lint:
	musical-patterns lint

build:
	musical-patterns build --command webpack
