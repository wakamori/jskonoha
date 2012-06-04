//////////////////////
// parseNUM
//////////////////////

function parseNUMTest() {}
registerTestSuite(parseNUMTest);

parseNUMTest.prototype.ReturnCorrectparseNUM = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "12 * 3";
	var tok_start = 0;
	var thunk = null;

	konoha.parseNUM(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(tk.tt, 3);
	expectThat(tk.sub, elementsAre(['12', '*', '3']));
}
