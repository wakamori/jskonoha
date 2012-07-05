cmake_minimum_required(VERSION 2.6)

project(jskonoha)

enable_testing()
set(CODEGEN_TEST_DIR ${CMAKE_CURRENT_SOURCE_DIR}/test/codegen_test)
set(TEST_BIN ${CODEGEN_TEST_DIR}/jskonoha_test.sh)

macro(add_jskonoha_test test_name f)
  set(TEST_COMMAND ${TEST_BIN} ${f})
  add_test(${test_name} ${TEST_COMMAND})
endmacro(add_jskonoha_test test_name)

file(GLOB_RECURSE test_files ${CMAKE_CURRENT_SOURCE_DIR}/test/codegen_test/*.k)
foreach(f ${test_files})
#	string(REPLACE // / f ${f})
	string(REPLACE ${CMAKE_CURRENT_SOURCE_DIR}/test/codegen_test/ "" test_name ${f})
	add_jskonoha_test(${test_name} ${f})
	set_tests_properties(${test_name} PROPERTIES TIMEOUT 10)
endforeach(f ${test_files})

