//////////////////////
// parseLINE
//////////////////////

function parseLINETest() {}
registerTestSuite(parseLINETest);

parseLINETest.prototype.ReturnCorrectparseLINE = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "if(n < 3) {\n return 1;\n}";
	var tok_start = 0;
	var thunk = null;

	var ret = konoha.parseLINE(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(11, ret);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "while((ch = tenv.source[pos++]) == 0) {\n a *=a\n}";
	var tok_start = 0;
	var thunk = null;

	var ret = konoha.parseLINE(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(39, ret);
}
