//////////////////////
// parseOP1
//////////////////////

function parseOP1Test() {}
registerTestSuite(parseOP1Test);

parseOP1Test.prototype.ReturnCorrectparseOP1 = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "12 + 3";
	var tok_start = 0;
	var thunk = null;

	var ret = konoha.parseOP1(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(1, ret);
	expectEq("1", tk.text.text);
	expectEq(konoha.ktoken_t.TK_OPERATOR, tk.tt);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "a / b";
	var tok_start = 3;
	var thunk = null;

	var ret = konoha.parseOP1(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(4, ret);
	expectEq("a /", tk.text.text);
	expectEq(konoha.ktoken_t.TK_OPERATOR, tk.tt);

}
