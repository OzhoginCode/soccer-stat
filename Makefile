dev:
	docker-compose build
	docker-compose up

build:
	npm run build

lint:
	npm run lint

install:
	npm ci

type-check:
	npx tsc -b

test: type-check
	npx vitest --run

test-watch:
	npx vitest