//////////////////////
//  UndefinedParseExpr
/////////////////////

function UndefinedParseExprTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(UndefinedParseExprTest);

UndefinedParseExprTest.prototype.ReturnCorrectUndefinedParseExpr = function() {
	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.UndefinedParseExpr(_ctx, sfp, _rix);

//TODO	expectEq();
}

