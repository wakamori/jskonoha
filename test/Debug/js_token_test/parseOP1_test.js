//////////////////////
// parseOP1
//////////////////////

function parseOP1Test() {}
registerTestSuite(parseOP1Test);

parseOP1Test.prototype.ReturnCorrectparseOP1 = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "(";
	var tok_start = 0;
	var thunk = null;

	var ret = konoha.parseOP1(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(1, ret);
	expectEq("(", tk.text.text);
	expectEq(konoha.ktoken_t.TK_OPERATOR, tk.tt);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "[";
	var tok_start = 0;
	var thunk = null;

	var ret = konoha.parseOP1(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(1, ret);
	expectEq("[", tk.text.text);
	expectEq(konoha.ktoken_t.TK_OPERATOR, tk.tt);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = ",";
	var tok_start = 0;
	var thunk = null;

	var ret = konoha.parseOP1(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(1, ret);
	expectEq(",", tk.text.text);
	expectEq(konoha.ktoken_t.TK_OPERATOR, tk.tt);

}
