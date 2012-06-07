//////////////////////
//  TokenArray_lookAhead
/////////////////////

function TokenArray_lookAheadTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(TokenArray_lookAheadTest);

TokenArray_lookAheadTest.prototype.ReturnCorrectTokenArray_lookAhead = function() {
	var _ctx = new konoha.kcontext_t();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;

	konoha.TokenArray_lookAhead(_ctx, tls, s, e);

//TODO	expectEq();
}

