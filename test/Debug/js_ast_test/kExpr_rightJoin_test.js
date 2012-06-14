//////////////////////
//  kExpr_rightJoin
/////////////////////

function kExpr_rightJoinTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(kExpr_rightJoinTest);

kExpr_rightJoinTest.prototype.ReturnCorrectkExpr_rightJoin = function() {
	var _ctx = new konoha.kcontext_t();
	var expr = new konoha.kExpr();
	var stmt = new konoha.kStmt();
	var tls = new konoha.kArray();
	var s = null;
	var c = null;
	var e = null;

	konoha.kExpr_rightJoin(_ctx, expr, stmt, tls, s, c, e);

//TODO	expectEq();
}

