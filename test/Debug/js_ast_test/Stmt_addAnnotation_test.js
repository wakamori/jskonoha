//////////////////////
//  Stmt_addAnnotation
/////////////////////

function Stmt_addAnnotationTest() {
	this.resultCallback_ = createMockFunction();
}
registerTestSuite(Stmt_addAnnotationTest);

Stmt_addAnnotationTest.prototype.ReturnCorrectStmt_addAnnotation = function() {
	var _ctx = new konoha.kcontext_t();
	var stmt = new konoha.kStmt();
	var tls = new konoha.kArray();
	var s = null;
	var e = null;

	konoha.Stmt_addAnnotation(_ctx, stmt, tls, s, e);

//TODO	expectEq();
}

