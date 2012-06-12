//////////////////////
//  ParseStmt
/////////////////////

function ParseStmtTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(ParseStmtTest);

ParseStmtTest.prototype.ReturnCorrectParseStmt = function() {
	var _ctx = new konoha.kcontext_t();
	var syn = new konoha.ksyntax_t();
	var stmt = new konoha.kStmt();
	var name = null;
	var tls = new konoha.kArray();
	var s = null;
	var e = null;

	konoha.ParseStmt(_ctx, syn, stmt, name, tls, s, e);

//TODO	expectEq();
}

