//////////////////////
//  ParseExpr_Parenthesis
/////////////////////

function ParseExpr_ParenthesisTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseExpr_ParenthesisTest);

ParseExpr_ParenthesisTest.prototype.ReturnCorrectParseExpr_Parenthesis = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseExpr_Parenthesis(_ctx, sfp, _rix);

//TODO	expectEq();
}

