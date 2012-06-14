//////////////////////
// parseUNDEF
//////////////////////

function parseUNDEFTest() {}
registerTestSuite(parseUNDEFTest);

parseUNDEFTest.prototype.ReturnCorrectparseUNDEF = function() {
	var _ctx = new konoha.kcontext_t();
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "'hoge"
	var tok_start = 0;
	var thunk = null;

	var ret =konoha.parseUNDEF(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_ERR, tk.tt);
//	expectEq("'hoge", tk.text.text);
	expectEq(5, ret);
}
