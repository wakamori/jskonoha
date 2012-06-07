/////////////////////
// parseSLASH
/////////////////////

function parseSLASHTest() {}
registerTestSuite(parseSLASHTest);

parseSLASHTest.prototype.ReturnCorrectparseSLASH = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "// a+b;";
	var tok_start = 0;
	var thunk = null;

	var ret = konoha.parceSLASH(_ctx, tk, tenv, tok_start, thunk);
	expectEq(7, ret);
}
