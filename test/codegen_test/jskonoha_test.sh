#!/bin/sh

if [ $# = 0 ]; then
	echo "need args!"
	exit 1
fi

if [ -r ${1} ];then
	echo "start"
	node ../build/jskonoha.js -s ${1} > ${1}.tested
	diff ${1}.tested ${1}.proof > /dev/null
	exit_status=$?
#	rm ${1}.tested
	echo "end";
	exit ${exit_status}
else
	echo ${1} " is not found!!"
	exit 1
fi
