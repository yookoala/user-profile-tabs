SHELL:=/bin/bash
PLUGIN_NAME:=$(shell basename ${PWD})

all: ${PLUGIN_NAME}.zip

%.zip:
	cd ..; zip -9 -r ${*}/${*}.zip ./${*} -x '*/.git/*' -x '*/makefile' -x '*/codeception.*' -x '*/tests'

# Remove all generated files.
clean:
	rm -f ${PLUGIN_NAME}.zip

.PHONY: all clean
