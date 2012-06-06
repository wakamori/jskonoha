//////////////////////
// KonohaSpace_tokenizerMatrix
//////////////////////

function KonohaSpace_tokenizerMatrixTest() {}
registerTestSuite(KonohaSpace_tokenizerMatrixTest);

KonohaSpace_tokenizerMatrixTest.prototype.ReturnCorrectKonohaSpace_tokenizerMatrix = function() {
	var _ctx = null;
	var ks = new konoha.kKonohaSpace();

	var ret = konoha.KonohaSpace_tokenizerMatrix(_ctx, ks);
	expectThat(ret, elementsAre(konoha.MiniKonohaTokenMatrix));
}
