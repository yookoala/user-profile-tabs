SHELL:=/bin/bash
PLUGIN_NAME:=$(shell basename ${PWD})
PLUGIN_VERSION?=1.0.0
WP_TESTED_UP_TO?=6.0
WP_STABLE_TAG?=${PLUGIN_VERSION}

all: dist/${PLUGIN_NAME}.zip

dist/${PLUGIN_NAME}:
	mkdir -p dist/${PLUGIN_NAME}
	rsync -av \
		--exclude='.*' \
		--exclude='codeception.*' \
		--exclude='composer.*' \
		--exclude='makefile' \
		--exclude='dist/' \
		--exclude='tests/' \
		--exclude='vendor/' \
		--exclude='temp/' \
		./ \
		dist/${PLUGIN_NAME}/

	# Replace version in main plugin file
	sed -i "s/^\(.*Version: \).*/\1${PLUGIN_VERSION}/" dist/${PLUGIN_NAME}/${PLUGIN_NAME}.php

	# Replace "Stable tag" in README.txt
	sed -i "s/^\(Stable tag: \).*/\1${WP_STABLE_TAG}/" dist/${PLUGIN_NAME}/README.txt

	# Replace "Tested up to" in README.txt
	sed -i "s/^\(Tested up to: \).*/\1${WP_TESTED_UP_TO}/" dist/${PLUGIN_NAME}/README.txt

dist/${PLUGIN_NAME}.zip: dist/${PLUGIN_NAME}
	cd dist && zip -r ${PLUGIN_NAME}.zip ${PLUGIN_NAME}

dist/svn:
	svn checkout https://plugins.svn.wordpress.org/${PLUGIN_NAME}/ dist/svn

prepare: dist/svn dist/${PLUGIN_NAME}
	@echo "Inspect the SVN directory"
	ls -la dist/svn

	@echo "Copy the latest dist files to trunk"
	rsync -av --delete dist/${PLUGIN_NAME}/ dist/svn/trunk/
	rsync -av --delete .wordpress-org/ dist/svn/assets/


publish:
	# Require manual username / password and a commit message
	cd dist/svn && svn commit

# Remove all generated files.
clean:
	rm -Rf dist/

.PHONY: all clean prepare publish
