//////////////////////
//  isFieldName
/////////////////////

function isFieldNameTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(isFieldNameTest);

isFieldNameTest.prototype.ReturnCorrectisFieldName = function() {

//	var _ctx = new konoha.kcontext_t();
	var tls = new konoha.kArray();
	var c = null;
	var e = null;

	konoha.isFieldName(tls, c, e);

//TODO	expectEq();
}

