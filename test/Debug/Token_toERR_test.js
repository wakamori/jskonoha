///////////////////////////
// Token_toERR
///////////////////////////


function Token_toERRTest() {}
registerTestSuite(Token_toERRTest);

Token_toERRTest.prototype.ReturntoERR = function() {
	var _ctx = null;
	var tk = new konoha.kToken();;
	var errref = 32;

	konoha.Token_toERR(_ctx, tk, errref);

	expectEq(konoha.ktoken_t.TK_ERR, tk.tt);

}
