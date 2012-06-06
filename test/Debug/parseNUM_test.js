//////////////////////
// parseNUM
//////////////////////

function parseNUMTest() {}
registerTestSuite(parseNUMTest);

parseNUMTest.prototype.ReturnCorrectparseNUM = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "12";
	var tok_start = 0;
	var thunk = null;

	konoha.parseNUM(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_INT, tk.tt);
	expectEq('12', tk.text.text);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "281";
	var tok_start = 0;
	var thunk = null;

	konoha.parseNUM(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_INT, tk.tt);
	expectEq('281', tk.text.text);

// 	var _ctx = null;
// 	var tk = new konoha.kToken();
// 	var tenv = new konoha.tenv_t;
// 	tenv.source = "-1";
// 	var tok_start = 0;
// 	var thunk = null;

// 	konoha.parseNUM(_ctx, tk ,tenv, tok_start, thunk);
// 	expectEq(konoha.ktoken_t.TK_INT, tk.tt);
// 	expectEq('-1', tk.text.text);

}
