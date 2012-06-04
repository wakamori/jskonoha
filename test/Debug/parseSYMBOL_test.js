//////////////////////
// parseSYMBOL
//////////////////////

function parseSYMBOLTest() {}
registerTestSuite(parseSYMBOLTest);

parseSYMBOLTest.prototype.ReturnCorrectparseSYMBOL = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "32 / 2";
	var tok_start = 0;
	var thunk = null;

	konoha.parseSYMBOL(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(tk.tt, 5);
	expectThat(tk.sub, elementsAre(['32', '/', '2']));

}
