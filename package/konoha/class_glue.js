konoha.ParseExpr_new = function(_ctx, tls, stmt)
{
//	konoha.assert(s == c);
	var tkNEW = tls.data[s];
	if(s + 2 < tls.data.length) {
		var tk1 = tls.data[s+1];
		var tk2 = tls.data[s+2];
		if(konoha.TK_isType(_ctx, tk1) && tk2.tt == konoha.ktoken_t.AST_PARENTHESIS) {  // new C (...)
			var syn = konoha.SYN_(kStmt_ks(_ctx,stmt), konoha.kw.ExprMethodCall);
			var expr = konoha.new_ConsExpr(_ctx, syn, 2, tkNEW, NewExpr(_ctx, syn, tk1, TK_type(tk1), 0));
			return expr;
		}
		if(konoha.TK_isType(_ctx, tk1) && tk2.tt == konoha.ktoken_t.AST_BRANCET) {     // new C [...]
			var syn = SYN_(kStmt_ks(stmt), konoha.kw.New);
			var ct = CT_p0(_ctx, CT_Array, TK_type(tk1));
			kToken_setmn(tkNEW, MN_("newArray"), MNTYPE_method);
			var expr = konoha.new_ConsExpr(_ctx, syn, 2, tkNEW, NewExpr(_ctx, syn, tk1, ct.cid, 0));
			return expr;
		}
	}
	konoha.sugar_p(_ctx, konoha.ERR_, stmt.uline, -1, "syntax error:" +  tkNEW.text.text);
}


konoha.StmtTyCheck_class = function(_ctx, stmt)
{
	var tkC = kStmt_token(stmt, konoha.kw.Usymbol, null);
	var tkE = kStmt_token(stmt, konoha.kw.Type,  null);
	var  cflag = 0;
	var supct = CT_Object;
	if(tkE != null) {
		supct = konoha.CT_(_ctx, TK_type(tkE));
		if(CT_isFinal(supct)) {
			konoha.sugar_p(_ctx, konoha.ERR_, stmt.uline, -1, T_CT(supct) + " is final");
			return false;
		}
		if(!CT_isDefined(supct)) {
			konoha.sugar_p(_ctx, konoha.ERR_, stmt.uline, -1,  T_CT(supct) + " has undefined field(s)");
			return false;
		}
	}
	var ct = defineClassName(_ctx, gma.genv.ks, cflag, tkC.text, stmt.uline);
	Stmt_parseClassBlock(_ctx, stmt, S_text(tkC.text), ct);
	var bk = kStmt_block(stmt, KW_Block, K_NULLBLOCK);
	CT_setField(_ctx, ct, supct, checkFieldSize(_ctx, bk));
	if(!CT_addClassFields(_ctx, ct, gma, bk, stmt.uline)) {
		return false;
	}
	tkC.kw = konoha.kw.Type;
	tkC.ty = ct.cid;
	kStmt_done(stmt);
	CT_checkMethodDecl(_ctx, tkC, bk, stmt);
	return false;
}

konoha.ExprTyCheck_Getter = function(_ctx, expr)
{
	var tkN = expr.cons.data[0];
	var fn = tosymbolUM(_ctx, tkN);
	var self = konoha.Expr_tyCheckAt(_ctx, expr, 1, gma, konoha.TY_var, 0);
	if(self != null) {
		var mtd = konoha.KonohaSpace_getMethodNULL(_ctx, gma.genv.ks, self.ty, MN_toGETTER(fn));
		if(mtd == null) {
			mtd = konoha.KonohaSpace_getMethodNULL(_ctx, gma.genv.ks, self.ty, MN_toISBOOL(fn));
		}
		if(mtd != null) {
			expr.cons.data[0] = mtd;
			return konoha.Expr_tyCheckCallParams(_ctx, expr, mtd, gma, reqty);
		}
		konoha.sugar_p(_ctx, konoha.ERR_, tkN.uline, tkN.lpos, "undefined field:", tkN.text.text);
	}
	return null;
}
