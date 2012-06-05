//////////////////////
// parseCOMMENT
//////////////////////

function parseCOMMENTTest() {}
registerTestSuite(parseCOMMENTTest);

parseCOMMENTTest.prototype.ReturnCorrectparseCOMMENT = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "/* int fib(n) */";
	var tok_start = 0;
	var thunk = null;

	konoha.parseCOMMENT(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(11, pos-1);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "/*abc != d*/";
	var tok_start = 0;
	var thunk = null;

	konoha.parseCOMMENT(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(7, pos-1);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "/*a*b*/";
	var tok_start = 0;
	var thunk = null;

	konoha.parseCOMMENT(_ctx, tk ,tenv, tok_start, thunk);
	expectEq(2, pos-1);

}
