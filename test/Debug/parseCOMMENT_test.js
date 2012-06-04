//////////////////////
// parseCOMMENT
//////////////////////

function parseCOMMENTTest() {}
registerTestSuite(parseCOMMENTTest);

parseCOMMENTTest.prototype.ReturnCorrectparseCOMMENT = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "b - a";
	var tok_start = 0;
	var thunk = null;

	konoha.parseCOMMENT(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(tk.tt, 3);
	expectThat(tk.sub, elementsAre(['b', '-', 'a']));

}
