//////////////////////
// parseNL
//////////////////////

function parseNLTest() {}
registerTestSuite(parseNLTest);

parseNLTest.prototype.ReturnCorrectparseNL = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "int fibo(n) {\n \t return n;}"
	var pos = 0;
	var thunk = null;
	var ret = konoha.parseNL(_ctx, tk ,tenv, pos, thunk);
	expectEq(1, ret);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "if(a < b) { \n \treturn a; \n}else{\n return b;\n}";
	var pos = 0;
	var thunk = null;
	var ret = konoha.parseNL(_ctx, tk ,tenv, pos, thunk);
	expectEq(1, tenv.uline);
	expectEq(1, tenv.bol);
}
