//////////////////////
//  new_Block
/////////////////////

function new_BlockTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(new_BlockTest);

new_BlockTest.prototype.ReturnCorrectnew_Block = function() {
	var _ctx = new konoha.kcontext_t();
	var ks = null;
	var prt = new konoha.kStmt();
	var tls = new konoha.kArray();
	tls.data[1] = new konoha.kToken();
	tls.data[1].text = "1";
	tls.data[1].tt = konoha.ktoken_t.TK_SYMBOL;
	tls.data[1].kw = 0;
	tls.data[1].topch = 1;
	tls.data[2] = new konoha.kToken();
	tls.data[2].text = "+";
	tls.data[2].tt = konoha.ktoken_t.TK_OPERATOR;
	tls.data[2].kw = 0;
	tls.data[2].topch = 1;
	tls.data[3] = new konoha.kToken();
	tls.data[3].text = "2";
	tls.data[3].tt = konoha.ktoken_t.TK_SYMBOL;
	tls.data[3].kw = 0;
	tls.data[3].topch = 0;
	tls.data[4] = new konoha.kToken();
	tls.data[5] = new konoha.kToken();
	tls.data[6] = new konoha.kToken();

	var s = 1;
	var e = 4;
	var delim = null;

	var bk = konoha.new_Block(_ctx, ks, prt, tls, s, e, delim);
	expectEq("1", bk.blocks.data[0].h.kvproto.kvs[0].uval.cons.data[1].tk.text););
	expectEq("2", bk.blocks.data[0].h.kvproto.kvs[0].uval.cons.data[2].tk.text);

//TODO	expectEq();
}
