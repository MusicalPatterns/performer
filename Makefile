.PHONY: lint
.PHONY: test

publish:
	./bin/publish.sh

setup:
	./bin/setup.sh

test:
	./bin/test.sh

lint:
	./bin/lint.sh

build:
	./bin/build.sh
