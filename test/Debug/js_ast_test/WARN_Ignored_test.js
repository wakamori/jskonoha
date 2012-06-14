//////////////////////
//  WARN_Ignored
/////////////////////

function WARN_IgnoredTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(WARN_IgnoredTest);

WARN_IgnoredTest.prototype.ReturnCorrectWARN_Ignored = function() {
	var _ctx = new konoha.kcontext_t();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;

	konoha.WARN_Ignored(_ctx, tls, s, e);

//TODO	expectEq();
}

