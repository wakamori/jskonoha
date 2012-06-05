//////////////////////
// parseNL
//////////////////////

function parseNLTest() {}
registerTestSuite(parseNLTest);

parseNLTest.prototype.ReturnCorrectparseNL = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "int fibo(n) {\n if(n < 3) {\n return 1;\n}\n return fibo(n-1) + fibo(n-2); }";
	var pos = 0;
	var thunk = null;

	konoha.parseNL(_ctx, tk ,tenv, pos, thunk);
	expectEq(2, tenv.uline);
	expectEq(3, tenv.bol);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "if(a < b) { \n return a; \n}else{\n return b;\n}";
	var pos = 0;
	var thunk = null;

	konoha.parseNL(_ctx, tk ,tenv, pos, thunk);
	expectEq(3, tenv.uline);
	expectEq(4, tenv.bol);

}
