//////////////////////
//  KonohaSpace_getSyntaxRule
/////////////////////

function KonohaSpace_getSyntaxRuleTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(KonohaSpace_getSyntaxRuleTest);

KonohaSpace_getSyntaxRuleTest.prototype.ReturnCorrectKonohaSpace_getSyntaxRule = function() {
	var _ctx = new konoha.kcontext_t();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;

	konoha.KonohaSpace_getSyntaxRule(_ctx, tls, s, e);

//TODO	expectEq();
}

