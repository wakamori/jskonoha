//////////////////////
// parseLINE
//////////////////////

function parseLINETest() {}
registerTestSuite(parseLINETest);

parseLINETest.prototype.ReturnCorrectparseLINE = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	var tok_start = 0;
	var thunk = null;

	konoha.parseLINE(_ctx, tk ,tenv, tok_start, thunk);

}
