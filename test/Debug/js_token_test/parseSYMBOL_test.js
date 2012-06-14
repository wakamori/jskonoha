//////////////////////
// parseSYMBOL
//////////////////////

function parseSYMBOLTest() {}
registerTestSuite(parseSYMBOLTest);

parseSYMBOLTest.prototype.ReturnCorrectparseSYMBOL = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "abc + def";
	var tok_start = 0;
	var thunk = null;
	var ret = konoha.parseSYMBOL(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_SYMBOL, tk.tt);
	expectEq("abc", tk.text.text);
	expectEq(3, ret);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "abc + def";
	var tok_start = 6;
	var thunk = null;
	var ret = konoha.parseSYMBOL(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_SYMBOL, tk.tt);
	expectEq("def", tk.text.text);
	expectEq(9, ret);
}
