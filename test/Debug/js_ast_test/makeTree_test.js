//////////////////////
//  makeTree
/////////////////////

function makeTreeTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(makeTreeTest);

makeTreeTest.prototype.ReturnCorrectmakeTree = function() {
	var _ctx = new konoha.kcontext_t();
	var ks = new konoha.kKonohaSpace();
	var tt = new konoha.ktoken_t();
	var tls = new konoha.kArray();
	tls.data[1] = new konoha.kToken();
	tls.data[1].text = "1";
	tls.data[1].kw = 1;
	tls.data[1].tt = konoha.ktoken_t.TK_SYMBOL;
	tls.data[2] = new konoha.kToken();
	tls.data[2].text = "+";
	tls.data[2].kw = 2;
	tls.data[2].tt = konoha.ktoken_t.TK_OPERATOR;
	tls.data[3] = new konoha.kToken();
	tls.data[3].text = "";
	tls.data[3].kw = 1;
	tls.data[3].tt = konoha.ktoken_t.TK_SYMBOL;
	var s = 1;
	var e = 4;
	var closech = null;
	var tlsdst = new konoha.kArray();
	var tkERRRef = new konoha.kToken();


	var ret = konoha.makeTree(_ctx, ks, tt, tls, s, e, closech, tlsdst, tkERRRef);
	expectEq(3, ret);

//TODO	expectEq();
}

