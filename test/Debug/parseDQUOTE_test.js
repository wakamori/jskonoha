//////////////////////
// parseDQUOTE
//////////////////////

function parseDQUOTETest() {}
registerTestSuite(parseDQUOTETest);

parseDQUOTETest.prototype.ReturnCorrectparseDQUOTE = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "\"hoge\"";
	var tok_start = 0;
	var thunk = null;

	konoha.parseLINE(_ctx, tk ,tenv, tok_start, thunk);
	expectEq('\"', tk.text.text);
	expectEq(tk.tt, konoha.ktoken_t.TK_TEX);
}
