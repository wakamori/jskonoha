//////////////////////
//  ParseStmt_Params
/////////////////////

function ParseStmt_ParamsTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseStmt_ParamsTest);

ParseStmt_ParamsTest.prototype.ReturnCorrectParseStmt_Params = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseStmt_Params(_ctx, sfp, _rix);

//TODO	expectEq();
}

