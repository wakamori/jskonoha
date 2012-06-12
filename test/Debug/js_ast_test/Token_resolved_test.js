//////////////////////
//  Token_resolved
/////////////////////

function Token_resolvedTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Token_resolvedTest);

Token_resolvedTest.prototype.ReturnCorrectToken_resolved = function() {
	var _ctx = new konoha.kcontext_t();
	var ks = null;
	var tk = new konoha.kToken();

	konoha.Token_resolved(_ctx, ks, tk);

//TODO	expectEq();
}

