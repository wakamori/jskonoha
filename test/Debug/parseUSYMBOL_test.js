//////////////////////
// parseUSYMBOL
//////////////////////

function parseUSYMBOLTest() {}
registerTestSuite(parseUSYMBOLTest);

parseUSYMBOLTest.prototype.ReturnCorrectparseUSYMBOL = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "1 + 3";
	var tok_start = 0;
	var thunk = null;

	var ret = konoha.parseUSYMBOL(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(konoha.ktoken_t.TK_USYMBOL, tk.tt);
	expectEq("1 + 3", tk.text.text);
}
