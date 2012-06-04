//////////////////////
// parseLINE
//////////////////////

function parseLINETest() {}
registerTestSuite(parseLINETest);

parseLINETest.prototype.ReturnCorrectparseLINE = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "ae + cji";
	var tok_start = 0;
	var thunk = null;

	konoha.parseLINE(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(tk.tt, 3);
	expectThat(tk.sub, elementsAre(['ad', '+', 'cje']));
}
