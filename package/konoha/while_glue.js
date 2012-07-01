konoha.StmtTyCheck_while = function(_ctx, stmt, gma)
{
	//konoha.assert("while statement .. ");
	var ret = false;
	if(konoha.Stmt_tyCheckExpr(_ctx, stmt, konoha.kw.Expr, gma, konoha.TY_Boolean, 0)) {
		var bk = konoha.Stmt_block(_ctx, stmt, konoha.kw.Block, null);
		ret = konoha.Block_tyCheckAll(_ctx, bk, gma);
		konoha.Stmt_typed(stmt, konoha.TSTMT_LOOP);
	}
	return ret;
}

konoha.StmtTyCheck_for = function(_ctx, stmt, gma)
{
	//konoha.assert("for statement .. ");
	var ret = false;
	if(konoha.Stmt_tyCheckExpr(_ctx, stmt, konoha.kw.Expr, gma, konoha.TY_Boolean, 0)) {
		var bk = konoha.Stmt_block(_ctx, stmt, konoha.kw.Block, null);
		ret = konoha.Block_tyCheckAll(_ctx, bk, gma);
		konoha.Stmt_typed(stmt, konoha.TSTMT_LOOP);
	}
	return ret;
}

konoha.kStmt_getParentNULL = function(stmt)
{
	return stmt.parentNULL.parentNULL;
}

konoha.StmtTyCheck_break = function(_ctx, stmt)
{
	var p = stmt;
	while((p = konoha.kStmt_getParentNULL(p)) != null) {
		if(!p.syn.flag) {
			konoha.KObject_setObject(_ctx, stmt, syn.kw, p, syn.kw);
			konoha.Stmt_typed(stmt, konoha.TSTMT_JUMP);
			return true;
		}
	}
//	konoha.sugar_p(_ctx, konoha.ERR_, stmt.uline, -1, "break statement not within a loop");
	return false;
}

konoha.StmtTyCheck_continue = function(_ctx, stmt)
{
//	konoha.assert("continue statement .. ");
	var p = stmt;
	while((p = konoha.kStmt_getParentNULL(p)) != null) {
		if(!p.syn.flag) {
			konoha.KObject_setObject(_ctx, stmt, syn.kw, p, syn.kw);
			konoha.Stmt_typed(stmt, konoha.TSTMT_JUMP);
			return true;
		}
	}
//	konoha.sugar_p(_ctx, konoha.ERR_, stmt.uline, -1, "continue statement not within a loop");
	return false;
}

