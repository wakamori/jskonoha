///////////////////////
// parseINDENT
///////////////////////

function parseINDENTTest() {}
registerTestSuite(parseINDENTTest);

parseINDENTTest.prototype.ReturnCorrectINDENT = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	var pos = 0;
	var thunk = null;


	konoha.parseINDENT(_ctx, tk, tenv, pos, thunk);

}
