//////////////////////
//  Stmt_findBinaryOp
/////////////////////

function Stmt_findBinaryOpTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Stmt_findBinaryOpTest);

Stmt_findBinaryOpTest.prototype.ReturnCorrectStmt_findBinaryOp = function() {
	var _ctx = new konoha.kcontext_t();
	var stmt = new konoha.kStmt();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;
	var synRef = new konoha.ksyntax_t();

	konoha.Stmt_findBinaryOp(_ctx, stmt, tls, s, e, synRef);

//TODO	expectEq();
}

