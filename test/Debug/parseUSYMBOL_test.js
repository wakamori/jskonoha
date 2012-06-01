//////////////////////
// parseUSYMBOL
//////////////////////

function parseUSYMBOLTest() {}
registerTestSuite(parseUSYMBOLTest);

parseUSYMBOLTest.prototype.ReturnCorrectparseUSYMBOL = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	var tok_start = 0;
	var thunk = null;

	konoha.parseUSYMBOL(_ctx, tk ,tenv, tok_start, thunk);

}
