//////////////////////
//  ParseStmt_Expr
/////////////////////

function ParseStmt_ExprTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseStmt_ExprTest);

ParseStmt_ExprTest.prototype.ReturnCorrectParseStmt_Expr = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseStmt_Expr(_ctx, sfp, _rix);

//TODO	expectEq();
}

