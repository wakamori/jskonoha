/////////////////////////
//KonohaSpace_tokenize
/////////////////////////

function KonohaSpace_tokenizeTest() {}
registerTestSuite(KonohaSpace_tokenizeTest);

KonohaSpace_tokenizeTest.prototype.ReturnCorrectTokens = function() {
	var _ctx = null;
	var ks = null;
	var source = "1+1";
	var uline = 0;
	var a = new konoha.kArray();
	konoha.KonohaSpace_tokenize(_ctx, ks, source, uline, a);
//	expectThat(a.data, elementsAre(['1','+','1']));
	expectEq(konoha.ktoken_t.TK_INDENT, a.data[0].tt);
//	expectEq("", a.data[0].text.text);
	expectEq(konoha.ktoken_t.TK_INT, a.data[1].tt);
	expectEq("1", a.data[1].text.text);
	expectEq(konoha.ktoken_t.TK_OPERATOR, a.data[2].tt);
	expectEq("+", a.data[2].text.text);
	expectEq(konoha.ktoken_t.TK_INT, a.data[3].tt);
	expectEq("1", a.data[3].text.text);

	var _ctx = null;
	var ks = null;
	var source = "\"hoge\"";
	var uline = 0;
	var a = new konoha.kArray();
	konoha.KonohaSpace_tokenize(_ctx, ks, source, uline, a);
//	expectThat(a.data, elementsAre(['1','+','1']));
	expectEq(konoha.ktoken_t.TK_INDENT, a.data[0].tt);
//	expectEq("", a.data[0].text.text);
	expectEq(konoha.ktoken_t.TK_TEXT, a.data[1].tt);
	expectEq("hoge", a.data[1].text.text);
}
