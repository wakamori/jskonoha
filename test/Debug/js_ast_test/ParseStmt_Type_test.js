//////////////////////
//  ParseStmt_Type
/////////////////////

function ParseStmt_TypeTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseStmt_TypeTest);

ParseStmt_TypeTest.prototype.ReturnCorrectParseStmt_Type = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseStmt_Type(_ctx, sfp, _rix);

//TODO	expectEq();
}

