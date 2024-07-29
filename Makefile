.PHONY: all build clean

all: build
build:
	npm install
	npm run lint
	npm run snapshots

clean:
	rm -rf node_modules
