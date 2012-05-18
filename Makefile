SRC_DIR = src
INCLUDE_DIR = include/konoha2
##TEST_DIR = test
BUILD_DIR = build

PREFIX = .
##DIST_DIR = ${PREFIX}/dist

JS_ENGINE ?= `which node nodejs 2>/dev/null`
COMPILER = ${JS_ENGINE} ${BUILD_DIR}/uglify.js --unsafe
POST_COMPILER = ${JS_ENGINE} ${BUILD_DIR}/post-compile.js

BASE_FILES = \
	${SRC_DIR}/konoha_namespace.js\
	${SRC_DIR}/sugar/token.js\
	${SRC_DIR}/sugar/ast.js

JSKONOHA = ${BUILD_DIR}/jskonoha.js
JSKONOHA_VER = $(shell cat version.txt)
VER = sed "s/@VERSION/${JQ_VER}/"
DATE=$(shell git log -1 --pretty=format:%ad)

all: $(JSKONOHA)

$(JSKONOHA): $(BASE_FILES)
	@@echo "Building" ${JSKONOHA}

	@@cat ${BASE_FILES} | \
		${VER} > ${JSKONOHA};

# ${JQ_MIN}: ${JQ}
# 	@@if test ! -z ${JS_ENGINE}; then \
# 		echo "Minifying jQuery" ${JQ_MIN}; \
# 		${COMPILER} ${JQ} > ${JQ_MIN}.tmp; \
# 		${POST_COMPILER} ${JQ_MIN}.tmp; \
# 		rm -f ${JQ_MIN}.tmp; \
# 	else \
# 		echo "You must have NodeJS installed in order to minify jQuery."; \
# 	fi

clean:
	@@echo "Removing" ${JSKONOHA}
	@@rm -rf ${JSKONOHA}

.PHONY: all clean 
