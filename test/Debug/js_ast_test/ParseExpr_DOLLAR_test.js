//////////////////////
//  ParseExpr_DOLLAR
/////////////////////

function ParseExpr_DOLLARTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseExpr_DOLLARTest);

ParseExpr_DOLLARTest.prototype.ReturnCorrectParseExpr_DOLLAR = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseExpr_DOLLAR(_ctx, sfp, _rix);

//TODO	expectEq();
}

