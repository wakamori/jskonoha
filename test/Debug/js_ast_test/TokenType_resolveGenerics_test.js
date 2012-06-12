//////////////////////
//  TokenType_resolveGenerics
/////////////////////

function TokenType_resolveGenericsTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(TokenType_resolveGenericsTest);

TokenType_resolveGenericsTest.prototype.ReturnCorrectTokenType_resolveGenerics = function() {
	var _ctx = new konoha.kcontext_t();
	var ks = null;
	var tk = new konoha.kToken();
	var tkP = new konoha.kToken();

	konoha.TokenType_resolveGenerics(_ctx, ks, tk, tkP);

//TODO	expectEq();
}

