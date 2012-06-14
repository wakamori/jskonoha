//////////////////////
//  ParseExpr_DOT
/////////////////////

function ParseExpr_DOTTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseExpr_DOTTest);

ParseExpr_DOTTest.prototype.ReturnCorrectParseExpr_DOT = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseExpr_DOT(_ctx, sfp, _rix);

//TODO	expectEq();
}

