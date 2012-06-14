//////////////////////
//  ParseStmt_Toks
/////////////////////

function ParseStmt_ToksTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseStmt_ToksTest);

ParseStmt_ToksTest.prototype.ReturnCorrectParseStmt_Toks = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseStmt_Toks(_ctx, sfp, _rix);

//TODO	expectEq();
}

