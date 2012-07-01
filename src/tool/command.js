///****************************************************************************
// * Copyright (c) 2012, the Konoha project authors. All rights reserved.
// * Redistribution and use in source and binary forms, with or without
// * modification, are permitted provided that the following conditions are met:
// *
// *  * Redistributions of source code must retain the above copyright notice,
// *    this list of conditions and the following disclaimer.
// *  * Redistributions in binary form must reproduce the above copyright
// *    notice, this list of conditions and the following disclaimer in the
// *    documentation and/or other materials provided with the distribution.
// *
// * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
// * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// ***************************************************************************/

konoha.eval = function(script) {
	var _konoha = konoha.konoha_open();
	konoha.konoha_load(_konoha, script);
	return konoha.result;
}

//var script = "1.2+3.4;";
//var script = "12+34;"
//var script = "12+34;"
//var script = "1.2+3.4";
//var script = "12+34; 56+78;";
//var script = "123+456+789;";
//var script = 'System.p(123);';
//var script = 'System.p("hello");';
//var script = 'if (true) {123+456;}';
//var script = 'if (false) {12+34;} else {56+78;}';
//var script = 'int func(int i) {return 1;}\nfunc(1);';
var script = 'int f(int i) {int a = 1234;\nreturn a;}\nf(1);';
//var script = 'int func(int i) {return 1;}';
//var script = 'int func(int i) {return 1+i;}';
//var script = 'int func(int i) {return 1+i;}\nfunc(2);';
//var script = 'int func(int i) {return i+1;}\nfunc(1) + func(2);';
//var script = "int func(int i) {1+1; return 1;}";
//var script = "int func(int n) {if (n < 3) {return 1;} else {return 2;}}";
//var script = "int fib(int n) {if (n < 3) {return 1;} else {return fib(n - 1) + fib(n - 2);}}";
var script = "int fib(int n) {if (n < 3) {return 1;} else {return fib(n - 1) + fib(n - 2);}}\n\nSystem.p(fib(10));";
//var script = 'int f() {\n int i;\n while(i < 10) {\n i = i + 1;\n} \n return i;\n}\nf();';
//var script = 'int f() {\n int i;\n  i = i + 1;\n return i;\n}\n f();';
//var script = 'int f () {\n int i; \n while (i < 100) {\n i = i + 1;\n if (i == 10) {\n break;\n }\n}\n return i;\n}';
//var script = 'int f () {\n int i = 0;\n int sum = 0;\n while (i < 10) {\n i = i + 1;\n if (i == 5) {\n continue;\n } else {\n sum = sum + i;\n }\n }\n return sum;\n}\n'
//var script = 'while(false) {\n 1+2;\n continue;\n}';
//var script = 'while(ture) {\n 1+2;\n break;\n}';
//var script = "return f(int i) { while(false){1+1;} return 1;}";
//var script = 'class A {int x;}';
//var script = "for(1;1;1) {1+1;}";
konoha.eval(script);
