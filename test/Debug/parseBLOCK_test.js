//////////////////////
// parseBLOCK
//////////////////////

function parseBLOCKTest() {}
registerTestSuite(parseBLOCKTest);

parseBLOCKTest.prototype.ReturnCorrectparseBLOCK = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	var tok_start = 0;
	var thunk = null;

	konoha.parseBLOCK(_ctx, tk ,tenv, tok_start, thunk);

}
