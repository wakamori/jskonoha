///////////////////////
// lpos
///////////////////////


function lposTest() {}
registerTestSuite(lposTest);

lposTest.prototype.Correctlpos = function() {
	var s = "function";  //const char *
	var tenv = new konoha.tenv_t;
	tenv.source = s;

	konoha.lpos(tenv, s);
	expectEq(s - tenv.bol, tenv.bol);
}
