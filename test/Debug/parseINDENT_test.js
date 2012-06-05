///////////////////////
// parseINDENT
///////////////////////

function parseINDENTTest() {}
registerTestSuite(parseINDENTTest);

parseINDENTTest.prototype.ReturnCorrectINDENT = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "int f(n) {\n \t return n;\n}"
	var pos = 0;
	var thunk = null;


	konoha.parseINDENT(_ctx, tk, tenv, pos, thunk);
	expectEq(null, tenv.indent_tab);
	expectEq(konoha.ktoken.TK_INDENT, tk.tt);

}
