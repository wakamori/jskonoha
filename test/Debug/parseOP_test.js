//////////////////////
// parseOP
//////////////////////

function parseOPTest() {}
registerTestSuite(parseOPTest);

parseOPTest.prototype.ReturnCorrectparseOP = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "ac + d";
	var tok_start = 0;
	var thunk = null;

	konoha.parseOP(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_OPERATOR, tk.tt);
	expectEq("+", tk.text.text);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "1 < 3";
	var tok_start = 0;
	var thunk = null;

	konoha.parseOP(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_OPERATOR, tk.tt);
	expectEq("<", tk.text.text);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "ABC != BCD";
	var tok_start = 0;
	var thunk = null;

	konoha.parseOP(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_OPERATOR, tk.tt);
	expectEq("!=", tk.text.text);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "D^10";
	var tok_start = 0;
	var thunk = null;

	konoha.parseOP(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_OPERATOR, tk.tt);
	expectEq("^", tk.text.text);

}
