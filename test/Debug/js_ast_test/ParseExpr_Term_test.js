//////////////////////
//  ParseExpr_Term
/////////////////////

function ParseExpr_TermTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseExpr_TermTest);

ParseExpr_TermTest.prototype.ReturnCorrectParseExpr_Term = function() {
	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseExpr_Term(_ctx, sfp, _rix);

//TODO	expectEq();
}

