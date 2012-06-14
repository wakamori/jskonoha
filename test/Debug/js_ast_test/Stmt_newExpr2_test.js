//////////////////////
//  Stmt_newExpr2
/////////////////////

function Stmt_newExpr2Test() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Stmt_newExpr2Test);

Stmt_newExpr2Test.prototype.ReturnCorrectStmt_newExpr2 = function() {
	var _ctx = new konoha.kcontext_t();
	var stmt = new konoha.kStmt();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;

	konoha.Stmt_newExpr2(_ctx, stmt, tls, s, e);

//TODO	expectEq();
}

