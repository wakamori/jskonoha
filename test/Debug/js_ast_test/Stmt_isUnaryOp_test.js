//////////////////////
//  Stmt_isUnaryOp
/////////////////////

function Stmt_isUnaryOpTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Stmt_isUnaryOpTest);

Stmt_isUnaryOpTest.prototype.ReturnCorrectStmt_isUnaryOp = function() {
	var _ctx = new konoha.kcontext_t();
	var stmt = new konoha.kStmt();
	var tk = new konoha.kToken();

	konoha.Stmt_isUnaryOp(_ctx, stmt, tk);

//TODO	expectEq();
}

