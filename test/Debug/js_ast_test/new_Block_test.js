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
	tls.data.push("1");
	tls.data.push("+");
	tls.data.push("2");
	var s = 0;
	var e = 4;
	var delim = null;

	var bk = konoha.new_Block(_ctx, ks, prt, tls, s, e, delim);
	expectEq("1", bk.blocks.data[0].h.kvproto.kvs[0].uval.cons.data[1].tk.text);
	expectEq("2", bk.blocks.data[0].h.kvproto.kvs[0].uval.cons.data[2].tk.text);

//TODO	expectEq();
}

