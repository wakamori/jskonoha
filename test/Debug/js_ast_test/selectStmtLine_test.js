//////////////////////
//  selectStmtLine
/////////////////////

function selectStmtLineTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(selectStmtLineTest);

selectStmtLineTest.prototype.ReturnCorrectselectStmtLine = function() {
	var _ctx = new konoha.kcontext_t();
	var ks = new konoha.kKonohaSpace();
	var indent = null;
	var tls = new konoha.kArray();
	tls.data[0] = new konoha.kToken();
	tls.data[0].text = "\000";
	tls.data[0].tt = konoha.ktoken_t.TK_INDENT;
	tls.data[0].kw = 0;
	tls.data[1] = new konoha.kToken();
	tls.data[1].text = "1";
	tls.data[1].tt = konoha.ktoken_t.TK_INT;
	tls.data[1].kw = 0;
	tls.data[2] = new konoha.kToken();
	tls.data[2].text = "+";
	tls.data[2].tt = konoha.ktoken_t.TK_OPERATOR;
	tls.data[2].kw = 0;
	tls.data[3] = new konoha.kToken();
	tls.data[3].text = "2";
	tls.data[3].tt = konoha.ktoken_t.TK_INT;
	tls.data[3].kw = 0;
	tls.data[4] = new konoha.kToken();
	tls.data[5] = new konoha.kToken();
	tls.data[6] = new konoha.kToken();

	var i = 1;
	var e = 4;
	var delim = null;
	var tlsdst = new konoha.kArray();
	var tkERRRef = new konoha.kToken();

	konoha.selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tlsdst, tkERRRef);
	expectEq(1, i);
	expectEq('\000', tls.data[0].text);
	expectEq(1, i);
	expectEq('1', tls.data[1].text);
	expectEq('1', tls.data[4].text);
	konoha.selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tlsdst, tkERRRef);
	expectEq(1, i);
	expectEq('+', tls.data[2].text);
	expectEq('+', tls.data[5].text);
	konoha.selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tlsdst, tkERRRef);
	expectEq(1, i);
	expectEq('2', tls.data[3].text);
	expectEq('2', tls.data[6].text);
	konoha.selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tlsdst, tkERRRef);
	expectEq(1, i);

//TODO	expectEq();
}

