///////////////////////
// lpos
///////////////////////


function lposTest() {}
registerTestSuite(lposTest);

lposTest.prototype.Correctlpos = function() {
	var tenv = new konoha.tenv_t;
	var s = "function";  //const char *

	konoha.lpos(tenv, s);
	expectEq(s - tenv.bol, tenv.bol);

}
