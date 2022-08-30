SHELL:=/bin/bash

all: user-meta-tabs.zip

user-meta-tabs.zip:
	cd ..; zip -9 -r user-meta-tabs/user-meta-tabs.zip ./user-meta-tabs -x '*/.git/*' -x '*/makefile'

# Remove all generated files.
clean:
	rm -f user-meta-tabs.zip

.PHONY: all clean all-mo clean-mo merge install-mo
