Makefile.self:
	@:

build:
	@musical-patterns-cli build "webpack --config webpack.publish.js"

build-local:
	@musical-patterns-cli build "webpack --config webpack.local.js"

start:
	@webpack-dev-server --config webpack.qa.js
