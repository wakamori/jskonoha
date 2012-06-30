konoha.StmtTyCheck_while = function(_ctx)
{
	//konoha.assert("while statement .. ");
	var ret = false;
	if(konoha.Stmt_tyCheckExpr(_ctx, stmt, konoha.kw.Expr, gma, konoha.TY_Boolean, 0)) {
		var bk = konoha.kStmt_block(stmt, konoha.kw.Block, null);
		ret = konoha.Block_tyCheckAll(_ctx, bk, gma);
		konoha.kStmt_typed(stmt, LOOP);
	}
	return ret;
}

konoha.StmtTyCheck_for = function(_ctx)
{
	//konoha.assert("for statement .. ");
	var ret = false;
	if(konoha.Stmt_tyCheckExpr(_ctx, stmt, konoha.kw.Expr, gma, konoha.TY_Boolean, 0)) {
		var bk = konoha.kStmt_block(stmt, konoha.kw.Block, null);
		ret = konoha.Block_tyCheckAll(_ctx, bk, gma);
		konoha.kStmt_typed(stmt, LOOP);
	}
	return ret;
}

// static inline kStmt* kStmt_getParentNULL(kStmt *stmt)
// {
// 	return stmt->parentNULL->parentNULL;
// }

konoha.StmtTyCheck_break = function(_ctx, stmt)
{
	var p = stmt;
	while((p = konoha.kStmt_getParentNULL(p)) != null) {
		if(konoha.FLAG_is(p.syn.flag, konoha.SYNFLAG_StmtJumpSkip)) {
			konoha.kObject_setObject(stmt, syn.kw, p);
			konoha.kStmt_typed(stmt, JUMP);
			return true;
		}
	}
//	konoha.sugar_p(_ctx, konoha.ERR_, stmt.uline, -1, "break statement not within a loop");
	return false;
}

// static KMETHOD StmtTyCheck_continue(CTX, ksfp_t *sfp _RIX)
// {
// 	USING_SUGAR;
// 	VAR_StmtTyCheck(stmt, syn, gma);
// 	DBG_P("continue statement .. ");
// 	kStmt *p = stmt;
// 	while((p = kStmt_getParentNULL(p)) != NULL) {
// 		if(FLAG_is(p.syn.flag, SYNFLAG_StmtJumpAhead)) {
// 			kObject_setObject(stmt, syn.kw, p);
// 			kStmt_typed(stmt, JUMP);
// 			RETURNb_(true);
// 		}
// 	}
// 	SUGAR p(_ctx, ERR_, stmt.uline, -1, "continue statement not within a loop");
// 	RETURNb_((false));
// }

