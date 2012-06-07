//////////////////////
//  selectStmtLine
/////////////////////

function selectStmtLineTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(selectStmtLineTest);

selectStmtLineTest.prototype.ReturnCorrectselectStmtLine = function() {
	var _ctx = new konoha.kcontext_t();
	var ks = new konoha.kKonohaSpace();
	var indent = null;
	var tls = new konoha.kArray();
	var s = null;
	var e = null;
	var delim = null;
	var tlsdst = new konoha.kArray();
	var tkERRRef = new konoha.kToken();


	konoha.selectStmtLine(_ctx, ks, tt, tls, s, e, closech, tlsdst, tkERRRef);

//TODO	expectEq();
}

