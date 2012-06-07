//////////////////////
// parseSKIP
//////////////////////

function parseSKIPTest() {}
registerTestSuite(parseSKIPTest);

parseSKIPTest.prototype.ReturnCorrectparseSKIP = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	var tok_start = 0;
	var thunk = null;

	konoha.parseSKIP(_ctx, tk ,tenv, tok_start, thunk);

}
