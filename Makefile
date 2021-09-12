.PHONY: app
default: help

# build all theme
dev:
	npm start

analyz:
	npm run analyz

build:
	npm run build

autofix:
	npm run autofix

dll:
	npm run build:dll

pro:
	npm run build

lint:
	npm run lint

e2e:
	npm run test:e2e

unit:
	npm run test:unit

pre:
	npm run precommit
