konoha.ParseExpr_new = function(_ctx, tls, stmt)
{
//	konoha.assert(s == c);
	var tkNEW = tls.data[s];
	if(s + 2 < tls.data.length) {
		var tk1 = tls.data[s+1];
		var tk2 = tls.data[s+2];
		if(konoha.TK_isType(_ctx, tk1) && tk2.tt == konoha.ktoken_t.AST_PARENTHESIS) {  // new C (...)
			var syn = konoha.SYN_(kStmt_ks(_ctx,stmt), konoha.kw.ExprMethodCall);
			var expr = konoha.new_ConsExpr(_ctx, syn, 2, tkNEW, NewExpr(_ctx, syn, tk1, konoha.TK_type(tk1), 0));
			return expr;
		}
		if(konoha.TK_isType(_ctx, tk1) && tk2.tt == konoha.ktoken_t.AST_BRANCET) {     // new C [...]
			var syn = SYN_(kStmt_ks(stmt), konoha.kw.New);
			var ct = CT_p0(_ctx, CT_Array, konoha.TK_type(tk1));
			kToken_setmn(tkNEW, MN_("newArray"), MNTYPE_method);
			var expr = konoha.new_ConsExpr(_ctx, syn, 2, tkNEW, NewExpr(_ctx, syn, tk1, ct.cid, 0));
			return expr;
		}
	}
	konoha.sugar_p(_ctx, konoha.ERR_, stmt.uline, -1, "syntax error:" +  tkNEW.text.text);
}

konoha.defineClassName = function(_ctx, ks, cflag, name, supcid)
{
	var cdef = {
		cflag: 0,
		cid: 0,
		bcid: konoha.CLASS_Object,
		supcid: supcid,
	};
	var ct = konoha.addClassDef(_ctx, name, cdef);
	return ct;
}

konoha.Stmt_parseClassBlock = function(_ctx, stmt, tkC)
{
	var tkP = konoha.KObject_getObjectNULL(_ctx, stmt, konoha.kw.Block, null);
	if (tkP != null && tkP.tt == konoha.ktoken_t.TK_CODE) {
		var a = _ctx.ctxsugar.tokens;
		var atop = a.length;
		konoha.KonohaSpace_tokenize(_ctx, konoha.kStmt_ks(stmt), tkP.text.text, tkP.uline, a);
		var s = a.length;
		var cname = tkC.text.text;
		for (var i = atop; i < s; i++) {
			var tk = a[i];
			if (tk.topch == '(' && tkP.tt == konoha.ktoken_t.TK_USYMBOL && cname.equals(tkP.text.text)) {
				throw("at parseClassBlock");
			}
			a.push(tk);
			tkP = tk;
		}
		bk = konoha.new_Block(_ctx, konoha.kStmt_ks(stmt), stmt, a, s, a.length, ';');
		for (var i = 0; i < bk.blocks.data.length; i++) {
			var methodDecl = bk.blocks.data[i];
			if (methodDecl.syn.kw == konoha.kw.KW_StmtMethodDecl) {
				konoha.KObject_setObject(_ctx, methodDecl, konoha.kw.Usymbol, tkC);
			}
		}
		konoha.KObject_setObject(_ctx, stmt, konoha.kw.Block, konoha.TY_Block, bk);
		a = a.slice(0, atop);
	}
}

konoha.checkFieldSize = function(_ctx, bk)
{
	var c = 0;
	for (var i = 0; i < bk.blocks.data.length; i++) {
		var stmt = bk.blocks.data[i];
		if (stmt.syn.kw == konoha.kw.KW_StmtTypeDecl) {
			var expr = konoha.Stmt_expr(_ctx, stmt, konoha.kw.Expr, null);
			if (expr.syn.kw == konoha.kw.COMMA) {
				c += expr.cons.data.length - 1;
			} else if (expr.syn.kw == konoha.kw.LET || konoha.Expr_isTerm(expr)) {
				c++;
			}
		}
	}
	return c;
}

konoha.StmtTyCheck_class = function(_ctx, stmt, gma)
{
	var tkC = konoha.Stmt_token(_ctx, stmt, konoha.kw.Usymbol, null);
	var tkE = konoha.Stmt_token(_ctx, stmt, konoha.kw.Type,  null);
	var cflag = 0;
	var supcid = konoha.CLASS_Object;
	var supct = _ctx.share.ca[supcid];
	if(tkE != null) {
		supcid = konoha.TK_Type(tkE);
		supct = konoha.CT_(_ctx, supcid);
		//if(CT_isFinal(supct)) {
		//	konoha.sugar_p(_ctx, konoha.ERR_, stmt.uline, -1, T_CT(supct) + " is final");
		//	return false;
		//}
		//if(!CT_isDefined(supct)) {
		//	konoha.sugar_p(_ctx, konoha.ERR_, stmt.uline, -1,  T_CT(supct) + " has undefined field(s)");
		//	return false;
		//}
	}
	var ct = konoha.KonohaSpace_getCT(_ctx, gma.genv.ks, null/*FIXME*/, tkC.text.text, tkC.text.text.length, konoha.TY_unknown);
	if (ct != null) {
		throw ('forward declaration is unsupported now');
	} else {
		ct = konoha.defineClassName(_ctx, gma.genv.ks, cflag, tkC.text.text, supcid);
	}
	konoha.Stmt_parseClassBlock(_ctx, stmt, tkC);
	var bk = konoha.Stmt_block(_ctx, stmt, konoha.kw.Block, null);
	if (ct.nulvalNUL == null) {
		konoha.CT_initField()
	} else {
		var fsize = checkFieldSize(_ctx, bk);
		konoha.CT_setField(_ctx, ct, supct, fsize);
	}
	//CT_setField(_ctx, ct, supct, konoha.checkFieldSize(_ctx, bk));
	//if(!CT_addClassFields(_ctx, ct, gma, bk, stmt.uline)) {
	//	return false;
	//}
	//tkC.kw = konoha.kw.Type;
	//tkC.ty = ct.cid;
	//kStmt_done(stmt);
	//CT_checkMethodDecl(_ctx, tkC, bk, stmt);
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
