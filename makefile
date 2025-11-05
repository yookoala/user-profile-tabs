SHELL:=/bin/bash
PLUGIN_NAME:=$(shell basename ${PWD})

all: dist/${PLUGIN_NAME}.zip

dist/${PLUGIN_NAME}:
	mkdir -p dist/${PLUGIN_NAME}
	rsync -av \
		--exclude='.git/' \
		--exclude='.github/' \
		--exclude='.gitignore' \
		--exclude='.editorconfig' \
		--exclude='codeception.*' \
		--exclude='composer.*' \
		--exclude='makefile' \
		--exclude='dist/' \
		--exclude='tests/' \
		--exclude='vendor/' \
		./ \
		dist/${PLUGIN_NAME}/

dist/${PLUGIN_NAME}.zip: dist/${PLUGIN_NAME}
	echo "cd dist && zip -r ${PLUGIN_NAME}.zip ${PLUGIN_NAME} && cd .."

# Remove all generated files.
clean:
	rm -Rf dist/

.PHONY: all clean
