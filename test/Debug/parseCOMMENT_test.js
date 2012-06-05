//////////////////////
// parseCOMMENT
//////////////////////

function parseCOMMENTTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(parseCOMMENTTest);

parseCOMMENTTest.prototype.ReturnCorrectparseCOMMENT = function() {
	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "/* int fib(n) */";
	var tok_start = 0;
	var thunk = null;

	konoha.parseCOMMENT(_ctx, tk ,tenv, tok_start, thunk);
	expectCall(this.resultCallback_)(11);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "/*abc != d*/";
	var tok_start = 0;
	var thunk = null;

	konoha.parseCOMMENT(_ctx, tk ,tenv, tok_start, thunk);
	expectCall(this.resultCallback_)(7);

	var _ctx = null;
	var tk = new konoha.kToken();
	var tenv = new konoha.tenv_t;
	tenv.source = "/*a*b*/";
	var tok_start = 0;
	var thunk = null;

	konoha.parseCOMMENT(_ctx, tk ,tenv, tok_start, thunk);
	expectCall(this.resultCallback_)(2);

}
