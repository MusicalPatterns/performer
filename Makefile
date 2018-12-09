.PHONY: lint
.PHONY: test

test:
	musical-patterns test

lint:
	musical-patterns lint

%:
	musical-patterns $@

-include Makefile.*
