/////////////////////////
//jskonoha_Test
/////////////////////////

function jskonoha_Test() {}
registerTestSuite(jskonoha_Test);

jskonoha_Test.prototype.ReturnCorrectAnswer = function() {

	var ret;
	var script;
	var console = {};
	console.log = function(){};
	script = "1+1";
	ret = konoha.eval(script);
	expectEq(2 ,ret);

	script = "123+456";
	ret = konoha.eval(script);
	expectEq(579 ,ret);

	script = "1+3+78";
	ret = konoha.eval(script);
	expectEq(82 ,ret);

	script = "32-49";
	ret = konoha.eval(script);
	expectEq(-17 ,ret);

	script = "41-8-3";
	ret = konoha.eval(script);
	expectEq(30 ,ret);

	script = "2*3*7";
	ret = konoha.eval(script);
	expectEq(42 ,ret);

	script = "81/9";
	ret = konoha.eval(script);
	expectEq(9 ,ret);

	script = "((21 + (3 * 2) - 4) / 2)";
	ret = konoha.eval(script);
	expectEq(11 ,ret);

	script = "(((7-2-1) * (3 + 11) - 7) / 2 )";
	ret = konoha.eval(script);
	expectEq(24 ,ret);

	script = "73 < 3";
	ret = konoha.eval(script);
	expectEq(true ,ret);

	script = "92 >= 92";
	ret = konoha.eval(script);
	expectEq(true ,ret);

	script = "1 > 3";
	ret = konoha.eval(script);
	expectEq(false ,ret);

	script = "if(1 < 3) { return 1;}";
	ret = konoha.eval(script);
	expectEq(1 ,ret);

	script = "var f(n) { if(n == 2) return 2;} \n f(2)";
	ret = konoha.eval(script);
	expectEq(2 ,ret);

	script = "var pow(n) { return n*n;} \n pow(3)";
	ret = konoha.eval(script);
	expectEq(9 ,ret);

	script = "var f(a ,b) { if(a < b) return a; \n return b;} \n f(8 ,2)";
	ret = konoha.eval(script);
	expectEq(2 ,ret);

	script = "var f(a, b, c) { if( (a<b) && (a<c) ) { return a; } else { return b;} } \n f(1, 2, 3)";
	ret = konoha.eval(script);
	expectEq(1 ,ret);

	script = "var fibo(n) { if(n < 3) { return 1;} \n return fibo(n-1) + fibo(n-2);} \n fibo(10)";
	ret = konoha.eval(script);
	expectEq(55 ,ret);

	script = "var fibo(n) { if(n < 3) { return 1;} \n return fibo(n-1) + fibo(n-2);} \n fibo(36)";
	ret = konoha.eval(script);
	expectEq(14930352 ,ret);

	script = "var fibo(n) { if(n < 3) { return 1;} \n return fibo(n-1) + fibo(n-2);} \n fibo(40)";
	ret = konoha.eval(script);
	expectEq(102334155 ,ret);

}
