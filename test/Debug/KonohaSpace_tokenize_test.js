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

	expectThat(a.data, elementsAre(['1','+','1']));

}
