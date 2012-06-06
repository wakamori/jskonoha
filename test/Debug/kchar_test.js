//////////////////////
// kchar
//////////////////////

function kcharTest() {}
registerTestSuite(kcharTest);

kcharTest.prototype.ReturnCorrectkchar = function() {
	var t = "1aB";
//	var pos = 42;

	expectEq(konoha.MKTM_type._DIGIT, konoha.kchar(t, 0));
	expectEq(konoha.MKTM_type._LALPHA, konoha.kchar(t, 1));
	expectEq(konoha.MKTM_type._UALPHA, konoha.kchar(t, 2));
}
