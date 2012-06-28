konoha.CT_isa = function(_ctx, cid1, cid2)
{
	if(cid2 == konoha.CLASS_Object) return true;
	var ct = _ctx.share.ca.cts[cid1];
	while(ct.supcid != konoha.CLASS_Object) {
		ct = _ctx.share.ca.cts[ct.supcid];
		if(ct.cid == cid2) return true;
	}
	return false;
}

konoha.new_BoxingExpr = function(_ctx, expr, reqty)
{
	if(expr.build == konoha.TEXPR_NCONST) {
		W(kExpr, expr);
		var Wexpr = expr;
		var _checkexpr;
		Wexpr.build = konoha.TEXPR_CONST;
		Wexpr.data = konoha.new_kObject(_ctx.share.ca.cts[Wexpr.ty], Wexpr.ndata);
		Wexpr.ty = reqty;
		return expr;
	}
	else {
		var texpr = _ctx.klib2.konoha.new_Object(_ctx, _ctx.modsugar.cExpr, null);
		texpr.single = expr;
		texpr.build = konoha.TEXPR_BOX;
		texpr.ty = reqty;
		return texpr;
	}
}

konoha.Expr_tyCheck = function(_ctx, stmt, expr, gma, reqty, pol)
{
	var texpr = expr;
	if(expr.ty == konoha.TY_var && expr != null/*_ctx.kmodsugar.cExpr.nulvalNUL*/) {
//TODO  if(!konoha.IS_Expr(expr)) {
// 			expr = konoha.Expr_setConstValue(_ctx, null, expr.h.ct.cid, expr)
		// 		}
		texpr = konoha.ExprTyCheck(_ctx, stmt, expr, gma, reqty);
	}
	if(texpr != null/*_ctx.kmodsugar.cExpr.nulvalNUL*/) {
		if(texpr.ty == konoha.TY_void) {
			return konoha.TFLAG_is(pol, konoha.TPOL_ALLOWVOID);
//				texpr: kExpr_p(expr, ERR_, "void is not acceptable");
		}
		if(reqty == konoha.TY_var || texpr.ty == reqty || konoha.TFLAG_is(pol, konoha.TPOL_NOCHECK)) {
			return texpr;
		}
// 		if(konoha.CT_isa(_ctx, texpr.ty, reqty)) {
// 			if(konoha.TFLAG_is(_ctx.share.ca.cts[texpr.ty].cflag, konoha.kClass_UnboxType) && !konoha.TFLAG_is(_ctx.share.ca.cts[reqty].cflag, konoha.kCladd_UnboxType)) {
// 				return konoha.new_BoxingExpr(_ctx, expr, reqty);
// 			}
			return texpr;
//		}
		var mtd = konoha.KonohaSpace_getCastMethodNULL(_ctx, null, texpr.ty, reqty);
		if(mtd != null && (konoha.kMethod_isCoercion(mtd) || konoha.TFLAG_is(pol, konoha.TPOL_COERCION))) {
			return konoha.new_TypedMethodCall(_ctx, reqty, mtd, 1, texpr);
		}
//		return Expr_p(_ctx, texpr, ERR_, "%s is requested, but %s is given", T_ty(reqty), T_ty(texpr.ty));
	}
	return texpr;
}

konoha.Expr_tyCheckAt = function(_ctx, stmt, exprP, pos, gma, reqty, pol)
{
	if(/*!konoha.Expr_isTerm(exprP) &&*/ pos < exprP.cons.data.length) {
		var expr = exprP.cons.data[pos];
		expr = konoha.Expr_tyCheck(_ctx, stmt, expr, gma, reqty, pol);
		exprP.cons.data[pos] =  expr;
		return expr;
	}
	return null;
}

konoha.Stmt_tyCheckExpr = function(_ctx, stmt, nameid, gma, reqty, pol)
{
	var expr = konoha.KObject_getObjectNULL(_ctx, stmt, nameid, null);
	if(expr != null/* && konoha.IS_Expr(expr)*/) {
		var texpr = konoha.Expr_tyCheck(_ctx, stmt, expr, gma, reqty, pol);
		if(texpr != null/*_ctx.kmodsugar.cExpr.nulvalNUL*/) {
			if(texpr != expr) {
				konoha.KObject_setObject(_ctx, stmt, nameid, texpr);
			}
			return 1;
		}
	}
	return 0;
}

konoha.StmtTyCheck_if = function(_ctx, stmt, gma)
{
	var r = 1;
	if((r = konoha.Stmt_tyCheckExpr(_ctx, stmt, konoha.kw.Expr, gma, konoha.TY_Boolean, 0))) {
		var bkThen = konoha.Stmt_block(_ctx, stmt, konoha.kw.Block, null);
		var bkElse = konoha.Stmt_block(_ctx, stmt, konoha.kw._else, null);
		r = konoha.Block_tyCheckAll(_ctx, bkThen, gma);
		if (bkElse != null) {
			r = r & konoha.Block_tyCheckAll(_ctx, bkElse, gma);
		}
		konoha.Stmt_typed(stmt, konoha.TSTMT_IF);
	}
	return r;
}

konoha.StmtTyCheck_else = function(_ctx, stmt, gma)
{
	var r = 1;
	var stmtIf = konoha.Stmt_lookupIfStmtNULL(_ctx, stmt);
	if(stmtIf != null) {
		var bkElse = konoha.kStmt_block(stmt, konoha.kw.Block, null);
		konoha.kObject_setObject(stmtIf, konoha.kw._else, bkElse);
		konoha.kStmt_done(stmt);
		r = konoha.Block_tyCheckAll(_ctx, bkElse, gma);
	}
	else {
//		konoha.sugar_p(ERR_, stmt->uline, -1, "else is not statement");
		r = 0;
	}
	return r;
}

konoha.StmtTyCheck_return = function(_ctx, stmt, gma)
{
	var r = 1;
	var rtype = null; //FIXME!!
	konoha.Stmt_typed(stmt, konoha.TSTMT_RETURN);
	if(rtype != konoha.TY_void) {
		r = konoha.Stmt_tyCheckExpr(_ctx, stmt, konoha.kw.Expr, gma, rtype, 0);
	} else {
		var expr = konoha.KObject_getObjectNULL(_ctx, stmt, 1, null);
		if (expr != null) {
//			SUGAR_P(WARN_, stmt->uline, -1, "ignored return value");
			r = konoha.Stmt_tyCheckExpr(_ctx, stmt, konoha.kw.Expr, gma, konoha.TY_var, 0);
			konoha.kObject_removeKey(stmt, 1);
		}
	}
	return r;
}

konoha.StmtTyCheck_TypeDecl = function(_ctx, stmt, gma)
{
	var tk  = konoha.kStmt_token(stmt, konoha.kw.Type, null);
	var expr = konoha.kStmt_expr(stmt, konoha.kw.Expr, null);
	if(tk == null || !konoha.TK_isType(_ctx, tk) || expr == null) {
		konoha.ERR_SyntaxError(stmt.uline);
		return false;
	}
	konoha.kStmt_done(stmt);
	return (Expr_declType(_ctx, expr, konoha.TK_type(_ctx, tk), stmt));
}

konoha.StmtTyCheck_MethodDecl = function(_ctx, stmt, gma)
{
// 	var r = 0;
// //TODO!	var flag =  konoha.Stmt_flag(_ctx, stmt, konoha.MethodDeclFlag, 0);
// 	var cid =  konoha.Stmt_getcid(_ctx, stmt, ks, konoha.kw.Usymbol, ks.function_cid);
// 	var mn = konoha.Stmt_getmn(_ctx, stmt, ks, konoha.kw.Symbol, MN_("new"));
// 	var pa = konoha.Stmt_newMethodParamNULL(_ctx, stmt);
// //TODO!!	if(konoha.TY_isSingleton(cid)) flag |= konoha.kMethod_Static;
// 	if(pa != null) {
// 		var mtd = konoha.new_kMethod(flag, cid, mn, pa, null);
// 		if(konoha.kKonohaSpace_defineMethod(ks, mtd, stmt.uline)) {
// 			r = 1;
// 			konoha.Stmt_setMethodFunc(_ctx, stmt, ks, mtd);
// 			konoha.kStmt_done(stmt);
// 		}
// 	}
// 	return r;
	konoha.Stmt_typed(stmt, konoha.TSTMT_MTDDEF);
	return 1;
}

konoha.StmtTyCheck_ParamsDecl = function(_ctx, stmt, gma)
{
	var tkT = konoha.kStmt_token(stmt, konoha.kw.Type, null); // type
	var rtype =  tkT == null ? konoha.TY_void : konohaTK_type(_ctx, tkT);
	var pa = null;
	var params = konoha.KObject_getObjectNULL(_ctx, stmt, konoha.kw.Params, null);
	if(params == null) {
		pa = (rtype == konoha.TY_void) ? konoha.K_NULLPARAM : konoha.new_kParam(rtype, 0, null);
	}
	else if(konoha.IS_Param(params)) {
		pa = params;
	}
	else if(konoha.IS_Block(params)) {
		var i, psize = params.blocks.data;
		var p = new Array(psize);
		for(i = 0; i < psize; i++) {
			var stmts = params.blocks.stmts[i];
			if(stmt.syn.kw != konoha.kw.StmtTypeDecl || !konoha.StmtTypeDecl_setParam(_ctx, stmt, i, p)) {
//				SUGAR_P(ERR_, stmt->uline, -1, "parameter declaration must be a $type $name form");
				return false;
			}
		}
		pa = konoha.new_kParam(rtype, psize, p);
	}
	konoha.kObject_setObject(stmt, konoha.kw.Params, pa);
	return 1;
}

konoha.StmtTyCheck_Expr = function(_ctx, stmt, gma)  // $expr
{
	var r = konoha.Stmt_tyCheckExpr(_ctx, stmt, konoha.kw.Expr, gma, konoha.TY_var, konoha.TPOL_ALLOWVOID);
	konoha.Stmt_typed(stmt, konoha.TSTMT_EXPR);
}

konoha.Stmt_TyCheckFunc = function(_ctx, fo, stmt, gma)
{
	return fo(_ctx, stmt, gma);
}

konoha.Stmt_TyCheck = function(_ctx, syn, stmt, gma)
{
	var fo = gma.flag ? syn.TopStmtTyCheck : syn.StmtTyCheck;
	var result;
// 	if(IS_Array(fo)) { // @Future
// 		int i;
// 		kArray *a = (kArray*)fo;
// 		for(i = kArray_size(a) - 1; i > 0; i++) {
// 			result = Stmt_TyCheckFunc(_ctx, a->funcs[i], stmt, gma);
// 			if(stmt->syn == NULL) return true;
// 			if(stmt->build != TSTMT_UNDEFINED) return result;
// 		}
// 		fo = a->funcs[0];
// 	}
// 	DBG_ASSERT(IS_Func(fo));
	result = konoha.Stmt_TyCheckFunc(_ctx, fo, stmt, gma);
	if(stmt.syn == null) return true; // this means done;
	if(result == false && stmt.build == konoha.TSTMT_UNDEFINED) {
//TODO		konoha.kStmt_p(stmt, ERR_, "statement typecheck error: %s", T_statement(syn.kw));
	}
	return result;
}

konoha.Block_tyCheckAll = function(_ctx, bk, gma)
{
	var i, result = 1;
	for(i = 0; i < bk.blocks.data.length; i++) {
		var stmt = bk.blocks.data[i];
		var syn = stmt.syn;
		if(syn == null) continue; /* This means 'done' */
		if(syn.kw == konoha.kw.Err) {
			result = 0;
			break;
		}
		konoha.Stmt_TyCheck(_ctx, syn, stmt, gma);
	}
	if(bk != null) {
//TODO!!		konoha.kExpr_setVariable(bk.esp, LOCAL_, TY_void, gma.genv.l.varsize, gma);
	}
	return result;
}

konoha.Stmt_checkReturnType = function(_ctx, data)
{
	if(data.syn.kw == "$expr") {
		var expr = konoha.KObject_getObjectNULL(_ctx, data, 0, null);
		if(expr.ty != konoha.TY_void) {
//			konoha.kStmt_setsyn(_ctx, data, konoha.SYN_(_ctx, konoha.Stmt_ks(_ctx, data), konoha.KW_return));
			konoha.Stmt_typed(data, konoha.TSTMT_RETURN);
			return expr.ty;
		}
	}
	return konoha.TY_void;
}

// konoha.Gamma_evalMethod = function(_ctx, kGamma *gma, kBlock *bk, kMethod *mtd)
// {
// 	kStmt *stmt = bk.blocks.stmts[0];
// 	if(stmt.syn == NULL) {
// 		_ctx.stack.evalty = TY_void;
// 		return K_CONTINUE;
// 	}
// 	if(stmt.syn.kw == KW_Err) return K_FAILED;
	
// 	kMethod_genCode(mtd, bk);
// 	return Method_runEval(_ctx, mtd, rtype);
// }

konoha.Gamma_push = function(_ctx, gma, newone)
{
	oldone = gma.genv;
	gma.genv = newone;
	newone.lvarlst = _ctx.ctxsugar.lvarlst;
	newone.lvarlst_top = _ctx.ctxsugar.lvarlst.length;
	return oldone;
}

konoha.Gamma_initParam = function(_ctx, genv, params)
{
//FIX ME!! multiple arguments
	genv.f.push({});
	var p = {};
	p.fn = (konoha.KObject_getObjectNULL(_ctx, params, konoha.kw.Expr, null)).tk.text.text;
	p.ty = (konoha.KObject_getObjectNULL(_ctx, params, konoha.kw.Type, null)).ty;
	genv.f.push(p);
	console.log(genv.f, p.ty);
}

konoha.Gamma_shiftBlockIndex = function(_ctx, genv)
{
	var a = genv.lvarlst;
	var size = a.length;
	var shift = genv.f.length;
	for(i = genv.lvarlst_top; i < size; i++) {
		var expr = a[i];
		if (expr.build == konoha.TEXPR_STACKTOP) continue;
		konoha.assert(expr.build < TEXPR_UNTYPED, "konoha.Gamma_shiftBlockIndex: build error");
		expr.index += shift;
		expr.build += konoha.TEXPR_shift;
	}
}

konoha.SingleBlock_eval = function(_ctx, bk, mtd, ks)
{
	var gma = {flag : konoha.kGamma_TOPLEVEL};//TODO
	konoha.Block_tyCheckAll(_ctx, bk, gma);
//	return  konoha.Gamma_evalMethod(_ctx, gma, bk, mtd);
}

konoha.Block_eval = function(_ctx, bk)
{
	var bk1 = _ctx.ctxsugar.singleBlock;
	var mtd = {};//konoha.new_Method(_ctx, konoha.kMethod_Static, 0, 0, _ctx.share.defParam, null);
	var result = konoha.kstatus_t.K_CONTINUE;
	var i;
	for(i = 0; i < bk.blocks.data.length; i++) {
		bk1.blocks.data[0] = bk.blocks.data[i];
		bk1.ks = bk.ks;
		console.log("singleblock_eval");
		bk1.blocks.data.slice(0, 1);
		result = konoha.SingleBlock_eval(_ctx, bk1, mtd, bk.ks);
		if(result == konoha.kstatus_t.K_FAILED) break;
	}
//	return result;
//	var result = konoha.Stmt_checkReturnType(_ctx, bk.blocks.data[0]);
	konoha.BLOCK_asm(_ctx, bk, 0, 0);
	konoha.modcode.ASM("\nsfp0;"); //FIX ME!!
	console.log("################### code ####################");
	console.log(konoha.modcode.output);
// 	console.log(bk.blocks.data[0]);
	console.log("############################################");
	var result = eval(konoha.modcode.output);

	return result;
}

konoha.Expr_typedWithMethod = function(_ctx, expr, mtd, reqty) {
	var expr1 = konoha.kExpr_at(expr, 1);
	expr.cons.data[0] = mtd;
	if(expr1.build == konoha.TEXPR_NEW) {
		konoha.Expr_typed(expr, konoha.TEXPR_CALL, expr1.ty);
	}
	else {
//TODO!!typing		konoha.Expr_typed(expr, konoha.TEXPR_CALL, konoha.kMethod_isSmartReturn(mtd) ? reqty : ktype_var(_ctx, konoha.kMethod_rtype(mtd), konoha.CT_(expr1.ty)));
		konoha.Expr_typed(expr, konoha.TEXPR_CALL, reqty);
	}
	return expr;
}

konoha.Expr_tyCheckCallParams = function(_ctx, stmt, expr, mtd, gma, reqty)
{
	var cons = expr.cons;
	var i, size = cons.data.length;
	var expr1 = cons.data[1];
	var this_ct = konoha.CT_(_ctx, expr1.ty);
//	DBG_ASSERT(IS_Method(mtd));
//	DBG_ASSERT(this_ct.cid != TY_var);
// 	if(!konoha.TY_isUnbox(mtd.cid) && konoha.CT_isUnbox(this_ct)) {
// 		expr1 = konoha.new_BoxingExpr(_ctx, cons.data[1], this_ct.cid);
// 		cons.exprs[1] = expr1;
// 	}
//	var isConst = (konoha.Expr_isCONST(expr1)) ? 1 : 0;
	//	if(rtype == TY_var && gma.genv.mtd == mtd) {
	//		return ERROR_Unsupported(_ctx, "type inference of recursive calls", TY_unknown, null);
	//	}
	for(i = 2; i < size; i++) {
		var texpr = konoha.Expr_tyCheckAt(_ctx, stmt, expr, i, gma, konoha.TY_var, 0);
		if(texpr == null) {
			return texpr;
		}
	}
// //	mtd = kExpr_lookUpOverloadMethod(_ctx, expr, mtd, gma, this_ct);
// 	var pa = konoha.kMethod_param(mtd);
// 	if(pa.psize + 2 != size) {
// //		return konoha.kExpr_p(stmt, expr, ERR_, "%s.%s%s takes %d parameter(s), but given %d parameter(s)", CT_t(this_ct), T_mn(mtd.mn), (int)pa.psize, (int)size-2);
// 		return null;//TODO!!
// 	}
// 	for(i = 0; i < pa.psize; i++) {
// 		var n = i + 2;
// 		var ptype = konoha.ktype_var(_ctx, pa.p[i].ty, this_ct);
// 		var pol = konoha.param_policy(pa.p[i].fn);
// 		var texpr = konoha.kExpr_tyCheckAt(_ctx, stmt, expr, n, ptype, pol);
// 		if(texpr == null) {
// //			return konoha.kExpr_p(stmt, expr, ERR_, "%s.%s%s accepts %s at the parameter %d", CT_t(this_ct), T_mn(mtd.mn), TY_t(ptype), (int)i+1);
// 			return null;//TODO!!
// 		}
// 		if(!konoha.Expr_isCONST(expr)) isConst = 0;
// 	}
 	expr = konoha.Expr_typedWithMethod(_ctx, expr, mtd, reqty);
// 	if(konoha.isConst && konoha.kMethod_isConst(mtd)) {
// 		var rtype = konoha.ktype_var(_ctx, pa.rtype, this_ct);
// 		return konoha.ExprCall_toConstValue(_ctx, expr, cons, rtype);
// 	}
	return expr;
}

konoha.Expr_lookupMethod = function(_ctx, stmt, expr, this_cid, gma, reqty)
{
	var mtd = null;
//	var ks = gma.genv.ks;
	var tkMN = expr.cons.data[0];
//	DBG_ASSERT(IS_Token(tkMN));
	if(tkMN.tt == konoha.ktoken_t.TK_SYMBOL || tkMN.tt == konoha.ktoken_t.TK_USYMBOL) {
		konoha.kToken_setmn(tkMN, tkMN.text.text, konoha.MNTYPE_method);
	}
	if(tkMN.tt == konoha.ktoken_t.TK_MN) {
		mtd = konoha.KonohaSpace_getMethodNULL(_ctx, ks, this_cid, tkMN.mn);
		if(mtd == null) {
			if(tkMN.text != konoha.TS_EMPTY) {
				mtd = konoha.KonohaSpace_getMethodNULL(_ctx, ks, this_cid, 0);
				if(mtd != null) {
					return konoha.Expr_tyCheckDynamicCallParams(_ctx, stmt, expr, mtd, tkMN.text, tkMN.mn, reqty);
				}
			}
			if(tkMN.mn == konoha.MN_new && expr.cons.data.length == 2 && konoha.CT_(konoha.kExpr_at(expr, 1).ty).bcid == konoha.TY_Object) {
				//DBG_P("bcid=%s", TY_t(CT_(kExpr_at(expr, 1).ty).bcid));
//				DBG_ASSERT(kExpr_at(expr, 1).ty != TY_var);
				return konoha.kExpr_at(expr, 1);  // new Person(); // default constructor
			}
//			kToken_p(stmt, tkMN, ERR_, "undefined %s: %s.%s", T_mntype(tkMN.mn_type), TY_t(this_cid), kToken_s(tkMN));
//TODO!!
		}
	}
	if(mtd != null) {
		return konoha.Expr_tyCheckCallParams(_ctx, stmt, expr, mtd, gma, reqty);
	}
	return null;
}

konoha.ExprTyCheck_MethodCall = function(_ctx, stmt, expr, gma, reqty)
{
	var texpr = konoha.Expr_tyCheckAt(_ctx, stmt, expr, 1, gma, konoha.TY_var, 0);
	if(texpr != null) {
		var this_cid = texpr.ty;
		return konoha.Expr_lookupMethod(_ctx, stmt, expr, this_cid, gma, reqty);
	}
}

konoha.ExprTyCheckFunc = function(_ctx, fo, stmt, expr, gma, reqty)
{
	var ret = fo(_ctx, stmt, expr, gma, reqty)
//	DBG_ASSERT(IS_Expr(lsfp[0].o));
	return ret;
}

konoha.ExprTyCheck_Text = function(_ctx, stmt, expr, gma, reqty)
{
	var tk = expr.tk;
	return konoha.Expr_setConstValue(_ctx, expr, konoha.TY_String, tk.text);
}

konoha.ExprTyCheck_Type = function(_ctx, stmt, expr, gma, reqty)
{
//	konoha.assert(konoha.TK_isType(expr->tk));
	return konoha.Expr_setVariable(_ctx, expr, null, expr.tk.ty, 0, gma);
}

konoha.ExprTyCheck_Symbol = function(_ctx, stmt, expr, gma, reqty)
{
	return konoha.Expr_tyCheckVariable2(_ctx, stmt, expr, gma, reqty);
}

konoha.ExprTyCheck_true = function(_ctx, stmt, expr, gma, reqty)
{
	return konoha.Expr_setNConstValue(_ctx, expr, konoha.TY_Boolean, 1);
}

konoha.ExprTyCheck_false = function(_ctx, stmt, expr, gma, reqty)
{
	return konoha.Expr_setNConstValue(_ctx, expr, konoha.TY_Boolean, 0);
}

konoha.ExprTyCheck_Int = function(_ctx, stmt, expr, gma, reqty)
{
	var tk = expr.tk;
	var n = Number(tk.text.text);
	return konoha.Expr_setNConstValue(_ctx, expr, konoha.TY_Int, n);
}

konoha.ExprTyCheck = function(_ctx, stmt, expr, gma, reqty) {
	var fo = expr.syn.ExprTyCheck;
	var texpr;
//TODO!!
// 	if(konoha.IS_Array(fo)) {
// 		var i;
// 		var a = fo;
// 		for(i = a.length - 1; i > 0; i++) {
// 			texpr = konoha.ExprTyCheckFunc(_ctx, a.data[i], stmt, expr, gma, reqty);
// 			if(konoha.kStmt_isERR(stmt)) return null;
// 			if(texpr.ty != konoha.TY_var) return texpr;
// 		}
// 		fo = a.funcs[0];
// 	}
//	DBG_ASSERT(IS_Func(fo));
	texpr = konoha.ExprTyCheckFunc(_ctx, fo, stmt, expr, gma, reqty);
	if(stmt.build == konoha.TSTMT_ERR) return null;
//	FIXME: CHECK ALL VAR_ExprTyCheck
//	if(texpr.ty == TY_var && texpr != K_NULLEXPR) {
//		texpr = kExpr_p(stmt, expr, ERR_, "typing error");
//	}
	return texpr;
}

konoha.KS_getGetterMethodNULL = function(_ctx, ks, cid, fn)
{
	var mtd = konoha.kKonohaSpace_getMethodNULL(ks, cid, konoha.MN_toGETTER(fn));
	if(mtd == null) {
		mtd = konoha.kKonohaSpace_getMethodNULL(ks, cid, konoha.MN_toISBOOL(fn));
	}
	return mtd;
}

konoha.new_GetterExpr = function(_ctx, tkU, mtd, expr)
{
	var expr1 = konoha.new_TypedConsExpr(_ctx, konoha.TEXPR_CALL, konoha.kMethod_rtype(mtd), 2, mtd, expr);
	expr1.tk = tkU; // for uline
	return expr1;
}

konoha.Expr_tyCheckVariable2 = function(_ctx, stmt, expr, gma, reqty)
{
	//DBG_ASSERT(expr.ty == TY_var);
	var tk = expr.tk;
	var fn = tk.text.text;
	var genv = gma.genv;
//TODO!!
// 	for(i = genv.l.varsize - 1; i >= 0; i--) {
// 		if(genv.l.vars[i].fn == fn) {
// 			return konoha.Expr_setVariable(_ctx, expr, konoha.TEXPR_LOCAL_, genv.l.vars[i].ty, i);
// 		}
// 	}
	for(var i = genv.f.length - 1; i >= 0; i--) {
		if(genv.f[i].fn == fn) {
			return konoha.Expr_setVariable(_ctx, expr, konoha.TEXPR_LOCAL, genv.f[i].ty, i);
		}
	}
//TODO!!
// 	if(genv.f.vars[0].ty != konoha.TY_void) {
// 		var ct = CT_(genv.this_cid);
// 		for(i = ct.fsize; i >= 0; i--) {
// 			if(ct.fields[i].fn == fn && ct.fields[i].ty != TY_void) {
// 				return konoha.Expr_setVariable(_ctx, expr, konoha.TEXPR_FIELD, ct.fields[i].ty, longid(i, 0));
// 			}
// 		}
// 		var mtd = konoha.KS_getGetterMethodNULL(_ctx, genv.ks, genv.this_cid, fn);
// 		if(mtd != null) {
// 			return konoha.new_GetterExpr(_ctx, tk, mtd, konoha.new_Variable(LOCAL, genv.this_cid, 0, gma));
// 		}
// 	}
// 	if(genv.ks.scrNUL != null) {
// 		var cid = O_cid(genv.ks.scrNUL);
// 		var mtd = konoha.KS_getGetterMethodNULL(_ctx, genv.ks, cid, fn);
// 		if(mtd != null) {
// 			return konoha.new_GetterExpr(_ctx, tk, mtd, new_ConstValue(cid, genv.ks.scrNUL));
// 		}

// 	}
// 	//konoha.assert("reqty=%s", T_ty(reqty));
// 	return konoha.kToken_p(tk, konoha.ERR_, "undefined name: " + konoha.kToken_s(tk));
}

konoha.ExprTyCheck_Usymbol = function(_ctx)
{
	konoha.assert("USYMBOL...");
	var tk = expr.tk;
	var ukey = konoha.kuname(tk.text.text, tk.text.text.length, 0, konoha.FN_NONAME);
	if(ukey != konoha.FN_NONAME) {
		var kv = konoha.KonohaSpace_getConstNULL(_ctx, gma.genv.ks, ukey);
		if(kv != null) {
			if(konoha.FN_isBOXED(kv.key)) {
				konoha.kExpr_setConstValue(expr, kv.ty, kv.oval);
			}
			else {
				konoha.kExpr_setNConstValue(expr, kv.ty, kv.uval);
			}
			return expr;
		}
	}
	var v = konoha.KonohaSpace_getSymbolValueNULL(_ctx, gma.genv.ks, tk.text.text, tk.text.text.length);
	var texpr = (v == null) ?
			konoha.kToken_p(tk, konoha.ERR_, "undefined name: " + konoha.kToken_s(tk)) : konoha.kExpr_setConstValue(expr, O_cid(v), v);
	return texpr;
}

konoha.StmtTyCheck_ConstDecl = function(_ctx)
{
	var r = false;
	var tk = konoha.kStmt_token(stmt, konoha.kw.Usymbol, null);
	var ukey = konoha.ksymbolA(tk.text.text, tk.text.text.length, konoha.FN_NEWID);
	var kv = konoha.KonohaSpace_getConstNULL(_ctx, ks, ukey);
	if(kv != null) {
		konoha.sugar_p(konoha.ERR_, stmt.uline, -1, "already defined name: " + konoha.kToken_s(tk));
	}
	else {
		r = konoha.Stmt_tyCheckExpr(_ctx, stmt, konoha.kw.Expr, gma, konoha.TY_var, konoha.TPOL_CONST);
		if(r) {
			var expr = konoha.kStmt_expr(stmt, konoha.kw.Expr, null);
			var kv = ukey;
			if(expr.build == konoha.TEXPR_NULL) {
				kv.ty = konoha.TY_TYPE;
				kv.uval = (uintptr_t)(CT_(expr.ty));
				expr = null;
			}
			else if(expr.build == konoha.TEXPR_CONST) {
				kv.key = ukey;
				kv.oval = expr.data;
				expr = null;
			}
			else if(expr.build == konoha.TEXPR_NCONST) {
				kv.uval = expr.ndata;
				expr = null;
			}
			if(expr == null) {
				konoha.KonohaSpace_mergeConstData(_ctx, ks, kv, 1, stmt.uline);
			}
			else {
				konoha.sugar_p(konoha.ERR_, stmt.uline, -1, "constant value is expected");
			}
			konoha.kStmt_done(stmt);
		}
	}
	return r;
}
