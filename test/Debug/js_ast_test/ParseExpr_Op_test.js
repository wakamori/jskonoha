//////////////////////
//  ParseExpr_Op
/////////////////////

function ParseExpr_OpTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseExpr_OpTest);

ParseExpr_OpTest.prototype.ReturnCorrectParseExpr_Op = function() {
	var _ctx = new konoha.kcontext_t();
	var sfp = new konoha.ksfp_t();
	var _rix = null;

	konoha.ParseExpr_Op(_ctx, sfp, _rix);

//TODO	expectEq();
}

