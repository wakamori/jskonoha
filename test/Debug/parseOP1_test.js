//////////////////////
// parseOP1
//////////////////////

function parseOP1Test() {}
registerTestSuite(parseOP1Test);

parseOP1Test.prototype.ReturnCorrectparseOP1 = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	var tok_start = 0;
	var thunk = null;

	konoha.parseOP1(_ctx, tk ,tenv, tok_start, thunk);

}
