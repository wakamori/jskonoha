//////////////////////
//  ParseStmt_Usymbol
/////////////////////

function ParseStmt_UsymbolTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseStmt_UsymbolTest);

ParseStmt_UsymbolTest.prototype.ReturnCorrectParseStmt_Usymbol = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseStmt_Usymbol(_ctx, sfp, _rix);

//TODO	expectEq();
}

