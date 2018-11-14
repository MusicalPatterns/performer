.PHONY: lint
.PHONY: test

deploy:
	./bin/deploy.sh

setup:
	./bin/setup.sh

test:
	./bin/test.sh

lint:
	./bin/lint.sh

build:
	./bin/build.sh
