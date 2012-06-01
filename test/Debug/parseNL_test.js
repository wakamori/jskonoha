//////////////////////
// parseNL
//////////////////////

function parseNLTest() {}
registerTestSuite(parseNLTest);

parseNLTest.prototype.ReturnCorrectparseNL = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	var pos = 0;
	var thunk = null;

	konoha.parseNL(_ctx, tk ,tenv, pos, thunk);

}
