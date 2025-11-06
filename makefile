SHELL:=/bin/bash
PLUGIN_NAME:=$(shell basename ${PWD})
PLUGIN_VERSION?=1.0.0
WP_TESTED_UP_TO?=6.0
WP_STABLE_TAG?=${PLUGIN_VERSION}

all: dist/${PLUGIN_NAME}.zip prepare

dist/${PLUGIN_NAME}:
	@echo
	@printf "\033[1;34mCreate distributed plugin folder: dist/%s/\033[0m\n" "${PLUGIN_NAME}"
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
	@echo
	@printf "\033[1;34mUpdating version number to %s in main plugin file\033[0m\n" "${PLUGIN_VERSION}"
	sed -i "s/^\(.*Version: \).*/\1${PLUGIN_VERSION}/" dist/${PLUGIN_NAME}/${PLUGIN_NAME}.php

	# Replace "Stable tag" in README.txt
	@echo
	@printf "\033[1;34mUpdating Stable tag to %s in README.txt\033[0m\n" "${WP_STABLE_TAG}"
	sed -i "s/^\(Stable tag: \).*/\1${WP_STABLE_TAG}/" dist/${PLUGIN_NAME}/README.txt

	# Replace "Tested up to" in README.txt
	@echo
	@printf "\033[1;34mUpdating Tested up to to %s in README.txt\033[0m\n" "${WP_TESTED_UP_TO}"
	sed -i "s/^\(Tested up to: \).*/\1${WP_TESTED_UP_TO}/" dist/${PLUGIN_NAME}/README.txt

dist/${PLUGIN_NAME}.zip: dist/${PLUGIN_NAME}
	@echo
	@printf "\033[1;33mCreating ${PLUGIN_NAME}.zip\033[0m\n"
	cd dist && zip -r ${PLUGIN_NAME}.zip ${PLUGIN_NAME}

dist/svn:
	@echo
	@printf "\033[1;33mChecking out SVN repo into dist/svn\033[0m\n"
	svn checkout https://plugins.svn.wordpress.org/${PLUGIN_NAME}/ dist/svn

prepare: dist/svn dist/${PLUGIN_NAME}
	@echo
	@printf "\033[1;33mPrepare for SVN publishing\033[0m\n"

	@echo
	@printf "\033[1;34mInspect the SVN directory\033[0m\n"
	ls -la dist/svn

	@echo
	@printf "\033[1;34mCopy the latest dist/ files to the trunk/ svn local copy\033[0m\n"
	rsync -av --delete dist/${PLUGIN_NAME}/ dist/svn/trunk/

	@echo
	@printf "\033[1;34mCopy the latest .wordpress-org/ files to the assets/ in svn local copy\033[0m\n"
	rsync -av --delete .wordpress-org/ dist/svn/assets/

	@echo
	@printf "\033[1;34mRemove outdated files from the svn local copy\033[0m\n"
	@cd dist/svn && for f in $$(svn status | grep '^!' | awk '{print $$2}'); do svn delete "$$f"; done
	@echo done

	@echo
	@printf "\033[1;34mAdd new files to the svn local copy\033[0m\n"
	@cd dist/svn && for f in $$(svn status | grep '^?' | awk '{print $$2}'); do if [ "$$f" != "svn-commit.tmp" ]; then svn add "$$f"; fi; done
	@echo done

	@echo
	@printf "\033[1;34mInspect the repository status\033[0m\n"
	cd dist/svn && svn status && cd ../..

publish:
	@echo
	@printf "\033[1;33mPublishing to WordPress.org SVN repository\033[0m\n"
	# Require manual username / password and a commit message
	cd dist/svn && svn commit

# Remove all generated files.
clean:
	@echo
	@printf "\033[1;34mClear the dist/ folder\033[0m\n"
	rm -Rf dist/

.PHONY: all clean prepare publish
