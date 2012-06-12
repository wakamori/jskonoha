//////////////////////
//  Token_toBRACE
/////////////////////

function Token_toBRACETEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Token_toBRACETest);

Token_toBRACETest.prototype.ReturnCorrectToken_toBRACE = function() {
	var _ctx = new konoha.kcontext_t();
	var tk = new konoha.kToken();
	var ks = new konoha.kKonohaSpace();

	konoha.Token_toBRACE(_ctx, tk, ks);

//TODO	expectEq();
}

