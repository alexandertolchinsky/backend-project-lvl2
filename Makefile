install:
	npm install
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build
test:
	npm run test
test-coverage:
	npm run test -- --coverage
