//////////////////////
//  Stmt_parseSyntaxRule
/////////////////////

function Stmt_parseSyntaxRuleTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Stmt_parseSyntaxRuleTest);

Stmt_parseSyntaxRuleTest.prototype.ReturnCorrectStmt_parseSyntaxRule = function() {
	var _ctx = new konoha.kcontext_t();
	var stmt = new konoha.kStmt();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;

	konoha.Stmt_parseSyntaxRule(_ctx, stmt, tls, s, e);

//TODO	expectEq();
}

