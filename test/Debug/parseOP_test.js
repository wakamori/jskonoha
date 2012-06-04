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
	expectEq(tk.tt, 3);
	expectThat(tk.sub, elementsAre(['ac', '+', 'd']));
}
