//////////////////////
// kchar
//////////////////////

function kcharTest() {}
registerTestSuite(kcharTest);

kcharTest.prototype.ReturnCorrectkchar = function() {
	var t = "token";
	var pos = 42;

	konoha.kchar(t, pos);

}
