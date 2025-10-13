
.PHONY: all
all: build

.PHONY: build
build:
	npm install
	npm run lint
	npm run snapshots

.PHONY: lint
lint:
	npm run lint

.PHONY: clean
clean:
	rm -rf cdk.out

.PHONY: clean-all
clean-all: clean
	rm -rf node_modules

.PHONY: snapshots
snapshots:
	npm run snapshots

.PHONY: upgrade-dependencies
upgrade-dependencies:
	npm run upgrade-dependencies
	npm run snapshots
