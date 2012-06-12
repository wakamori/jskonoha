//////////////////////
//  ParseExpr
/////////////////////

function ParseExprTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseExprTest);

ParseExprTest.prototype.ReturnCorrectParseExpr = function() {
	var _ctx = new konoha.kcontext_t();
	var syn = new konoha.ksyntax_t();
	var stmt = new konoha.kStmt();
	var tls = new konoha.kArray();
	var s = null;
	var c = null;
	var e = null;

	konoha.ParseExpr(_ctx, syn, stmt, tls, s, c, e);

//TODO	expectEq();
}

