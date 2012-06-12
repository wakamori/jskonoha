//////////////////////
//  matchSyntaxRule
/////////////////////

function matchSyntaxRuleTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(matchSyntaxRuleTest);

matchSyntaxRuleTest.prototype.ReturnCorrectmatchSyntaxRule = function() {
	var _ctx = new konoha.kcontext_t();
	var stmt = new konoha.kStmt();
	var rules = new konoho.kArray();
	var uline = null;
	var tls = new konoha.kArray();
	var s = null;
	var e = null;
	var optional = null;

	konoha.matchSyntaxRule(_ctx, stmt, rules, uline, tls, s, e, optinal);

//TODO	expectEq();
}

