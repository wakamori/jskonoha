//////////////////////
//  ParseStmt_Symbol
/////////////////////

function ParseStmt_SymbolTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseStmt_SymbolTest);

ParseStmt_SymbolTest.prototype.ReturnCorrectParseStmt_Symbol = function() {

	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseStmt_Symbol(_ctx, sfp, _rix);

//TODO	expectEq();
}

