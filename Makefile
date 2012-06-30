SRC_DIR = src
INCLUDE_DIR = include/konoha2
TEST_DIR = test
BUILD_DIR = build
PACKAGE_DIR = package

PREFIX = .
##DIST_DIR = ${PREFIX}/dist

JS_ENGINE ?= `which node nodejs 2>/dev/null`
COMPILER = ${JS_ENGINE} ${BUILD_DIR}/uglify.js --unsafe
POST_COMPILER = ${JS_ENGINE} ${BUILD_DIR}/post-compile.js

BASE_FILES = \
	${SRC_DIR}/konoha_namespace.js\
	${INCLUDE_DIR}/konoha2.js\
	${INCLUDE_DIR}/sugar.js\
	${SRC_DIR}/sugar/perror.js\
	${SRC_DIR}/konoha/datatype.js\
	${SRC_DIR}/konoha/konoha2.js\
	${SRC_DIR}/konoha/klibexec.js\
	${PACKAGE_DIR}/konoha/while_glue.js\
	${PACKAGE_DIR}/konoha/class_glue.js\
	${SRC_DIR}/sugar/tycheck.js\
	${SRC_DIR}/sugar/sugar.js\
	${SRC_DIR}/sugar/token.js\
	${SRC_DIR}/sugar/ast.js\
	${SRC_DIR}/sugar/struct.js\
	${SRC_DIR}/vm/asm.js\
	${SRC_DIR}/tool/command.js



JSKONOHA = ${BUILD_DIR}/jskonoha.js
JSKONOHA_VER = $(shell cat version.txt)
VER = sed "s/@VERSION/${JQ_VER}/"
DATE=$(shell git log -1 --pretty=format:%ad)

all: $(JSKONOHA)

$(JSKONOHA): $(BASE_FILES)
	@@echo "Building" ${JSKONOHA}
	@@if [ ! -d ${BUILD_DIR} ]; then \
		mkdir -p ${BUILD_DIR};       \
	fi
	@@cat ${BASE_FILES} | \
		${VER} > ${JSKONOHA};

clean:
	@@echo "Removing" ${JSKONOHA}
	@@rm -rf ${JSKONOHA}
	@@rm -rf test/Debug/js_ast_test/*.{html,xml}

test:
	@@echo "Run google-js-test"
	@@files="test/Debug/js_token_test/*.js"
##	@@for utest in test/Debug/js_token_test/*.js; do (gjstest --js_files=${JSKONOHA},$$utest); done;
	@@for utest in test/Debug/js_ast_test/*.js; do (gjstest --js_files=${JSKONOHA},$$utest); done;

test-html:
	@@echo "Run google-js-test, then generate html"
	@@files="test/Debug/js_token_test/*.js"
##	@@for utest in test/Debug/js_token_test/*.js; do (gjstest --js_files=${JSKONOHA},$$utest); done;
	@@for utest in test/Debug/js_ast_test/*.js; do (gjstest --js_files=${JSKONOHA},$$utest --html_output_file=$$utest.html); done;

test-xml:
	@@echo "Run google-js-test and output test result as xml report"
	@@files="test/Debug/js_token_test/*.js"
	@@for utest in test/Debug/js_ast_test/*.js; do (gjstest --js_files=${JSKONOHA},$$utest --xml_output_file=$$utest.xml); done;

.PHONY: all clean test test-html test-xml
