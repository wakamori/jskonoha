//////////////////////
//  ParseExpr_COMMA
/////////////////////

function ParseExpr_COMMATest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseExpr_COMMATest);

ParseExpr_COMMATest.prototype.ReturnCorrectParseExpr_COMMA = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseExpr_COMMA(_ctx, sfp, _rix);

//TODO	expectEq();
}

