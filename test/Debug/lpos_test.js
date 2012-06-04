///////////////////////
// lpos
///////////////////////


function lposTest() {}
registerTestSuite(lposTest);

lposTest.prototype.Correctlpos = function() {
	var tenv = new konoha.tenv_t;
	var s = "function";  //const char *

	konoha.lpos(tenv, s);
	expectEq(tenv.bol, s - tenv.bol);

}
