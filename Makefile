.PHONY: lint
.PHONY: test

publish:
	./bin/publish.sh

setup:
	./bin/setup.sh

test:
	./bin/test.sh

lint:
	sh ./node_modules/.bin/musical-patterns lint

build:
	./bin/build.sh
