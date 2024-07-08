dev:
	docker-compose build
	docker-compose up

build:
	npm run build

lint:
	npm run lint

install:
	npm ci