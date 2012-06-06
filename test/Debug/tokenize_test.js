////////////////////////
// tokenize
////////////////////////

function tokenizeTest() {}
registerTestSuite(tokenizeTest);

tokenizeTest.prototype.ReturnCorrectTokenwords = function() {
	var _ctx = null;
	var tenv = new konoha.tenv_t;
	tenv.source = "if(n < 3) {\n return 1;\n}";
//	tenv.fmat = 4;
	konoha.tokenize(_ctx, tenv);
	expectThat(tenv.list.data, elementAre(['if', '(', 'n', '<', '3', ')', '{', 'return', '1', ';', '}']));

	var _ctx = null;
	var tenv = new konoha.tenv_t;
	tenv.source = "a + b";
	tenv.fmat = 4;
	konoha.tokenize(_ctx, tenv);
	expectThat(tenv.list.data, elementAre(['a', '+', 'b']));
}
