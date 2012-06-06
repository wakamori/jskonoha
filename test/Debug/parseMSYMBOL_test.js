//////////////////////
// parseMSYMBOL
//////////////////////

function parseMSYMBOLTest() {}
registerTestSuite(parseMSYMBOLTest);

parseMSYMBOLTest.prototype.ReturnCorrectparseMSYMBOL = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "int f(int a, int b) { return a+b; };";
	var tok_start = 0;
	var thunk = null;

	var ret = konoha.parseMSYMBOL(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(0, ret);
	expectEq(konoha.ktoken_t.TK_MSYMBOL, tk.tt);
	expectEq("", tk.text.text);
}
