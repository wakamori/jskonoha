//////////////////////
//  lookAheadKeyword
/////////////////////

function lookAheadKeywordTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(lookAheadKeywordTest);

lookAheadKeywordTest.prototype.ReturnCorrectlookAheadKeyword = function() {
	var tls = new konoha.kArray();
	var s = null;
	var e = null;
	var rule = new konoho.kToken();

	konoha.lookAheadKeyword(tls, s, e rule);

//TODO	expectEq();
}

