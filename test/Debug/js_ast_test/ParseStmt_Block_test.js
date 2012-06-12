//////////////////////
//  ParseStmt_Block
/////////////////////

function ParseStmt_BlockTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseStmt_BlockTest);

ParseStmt_BlockTest.prototype.ReturnCorrectParseStmt_Block = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseStmt_Block(_ctx, sfp, _rix);

//TODO	expectEq();
}

