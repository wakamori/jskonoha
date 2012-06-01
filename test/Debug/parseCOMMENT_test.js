//////////////////////
// parseCOMMENT
//////////////////////

function parseCOMMENTest() {}
registerTestSuite(parseCOMMENTTest);

parseCOMMENTTest.prototype.ReturnCorrectparseCOMMENT = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	var tok_start = 0;
	var thunk = null;

	konoha.parseCOMMENT(_ctx, tk ,tenv, tok_start, thunk);

}
