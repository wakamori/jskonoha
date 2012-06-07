//////////////////////
//  Stmt_addExprParams
/////////////////////

function Stmt_addExprParamsTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Stmt_addExprParamsTest);

Stmt_addExprParamsTest.prototype.ReturnCorrectStmt_addExprParams = function() {
	var _ctx = new konoha.kcontext_t();
	var stmt = new konoha.kStmt();
	var expr = new konoha.kExpr();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;
	var allowEmpty = null;

	konoha.Stmt_addExprParams(_ctx, stmt, expr, tls, s, e, allowEmpty);

//TODO	expectEq();
}

