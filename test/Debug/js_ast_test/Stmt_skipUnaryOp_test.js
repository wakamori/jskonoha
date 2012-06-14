//////////////////////
//  Stmt_skipUnaryOp
/////////////////////

function Stmt_skipUnaryOpTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Stmt_skipUnaryOpTest);

Stmt_skipUnaryOpTest.prototype.ReturnCorrectStmt_skipUnaryOp = function() {
	var _ctx = new konoha.kcontext_t();
	var stmt = new konoha.kStmt();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;

	konoha.Stmt_skipUnaryOp(_ctx, stmt, tls, s, e);

//TODO	expectEq();
}

