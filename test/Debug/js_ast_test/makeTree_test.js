//////////////////////
//  makeTree
/////////////////////

function makeTreeTEST() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(makeTreeTest);

makeTreeTest.prototype.ReturnCorrectmakeTree = function() {
	var _ctx = new konoha.kcontext_t();
	var ks = new konoha.kKonohaSpace();
	var tt = new konoha.ktoken_t();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;
	var closech = null;
	var tlsdst = new konoha.kArray();
	var tkERRRef = new konoha.kToken();


	konoha.makeTree(_ctx, ks, tt, tls, s, e, closech, tlsdst, tkERRRef);

//TODO	expectEq();
}

