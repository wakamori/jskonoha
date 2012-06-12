//////////////////////
//  Block_addStmtLine
/////////////////////

function Block_addStmtLineTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Block_addStmtLineTest);

Block_addStmtLineTest.prototype.ReturnCorrectBlock_addStmtLine = function() {
	var _ctx = new konoha.kcontext_t();
	var bk = new konoha.kBlock();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;
	var tkERR = new konoha.kToken();

	konoha.Block_addStmtLine(_ctx, stmt, tls, s, e, tkERR);

//TODO	expectEq();
}

