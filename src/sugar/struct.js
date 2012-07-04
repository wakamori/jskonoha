///****************************************************************************
// * Copyright (c) 2012, the Konoha project authors. All rights reserved.
// * Redistribution and use in source and binary forms, with or without
// * modification, are permitted provided that the following conditions are met:
// *
// *  * Redistributions of source code must retain the above copyright notice,
// *    this list of conditions and the following disclaimer.
// *  * Redistributions in binary form must reproduce the above copyright
// *    notice, this list of conditions and the following disclaimer in the
// *    documentation and/or other materials provided with the distribution.
// *
// * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
// * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// ***************************************************************************/

// konoha.KonohaSpace_init goes include/konoha/konoha2.js

konoha.Stmt_token = function(_ctx, stmt, kw, def)
{
	var tk = konoha.KObject_getObjectNULL(_ctx, stmt, kw);
	if(tk != null && konoha.IS_Token(_ctx, tk)) {
		return tk;
	}
	return def;
}

konoha.Stmt_expr = function(_ctx, stmt, kw, def)
{
	var expr = konoha.KObject_getObjectNULL(_ctx, stmt, kw);
	if(expr != null && konoha.IS_Expr(_ctx, expr)) {
		return expr;
	}
	return def;
}

konoha.KonohaSpace_syntax = function(_ctx, ks0, kw, isnew)
{
//	var ks = new konoha.kKonohaSpace();
	ks = ks0;
	var parent = null;
	while(ks != null) {
		if(ks.syntaxMapNN != null) {
			var e = ks.syntaxMapNN[kw];
			while(e != null) {
//TODO!!	if(isnew && ks0 != ks) goto L_NEW;
				return e;
			}
		}
		ks = ks.parentNULL;
	}

	if(isnew == 1) {
		if(ks0.syntaxMapNN == null) {
			ks0.syntaxMapNN = new Array();
		}
		var syn = new konoha.ksyntax();
		ks0.syntaxMapNN[kw] = syn;

		if(parent != null) {  // TODO: RCGC
			syn = parent;
		}
		else {
			syn.kw = kw;
			syn.ty  = konoha.TY_unknown;
			syn.op1 = konoha.MN_NONAME;
			syn.op2 = konoha.MN_NONAME;
			syn.ParseExpr = _ctx.kmodsugar.UndefinedParseExpr;
			syn.TopStmtTyCheck = _ctx.kmodsugar.UndefinedStmtTyCheck;
			syn.StmtTyCheck = _ctx.kmodsugar.UndefinedStmtTyCheck;
			syn.ExprTyCheck = _ctx.kmodsugar.UndefinedExprTyCheck;
		}
		return syn;
	}
	return null;
}
//#define T_statement(kw)  T_statement_(_ctx, kw)
konoha.T_statement_ = new function(_ctx,  kw)
{
	var buf = new Array();  // this is not good, but this is very rare case.
	var statement = null, postfix = " statement";
	if(kw == konoha.kw.Expr) { statement = "expression"; postfix = ""; }
	if(kw == konoha.kw.StmtTypeDecl) { statement = "variable"; postfix = " declaration"; }
	if(kw == konoha.kw.StmtMethodDecl) { statement =  "function"; postfix = " declaration"; }
//	snprintf(buf, sizeof(buf), "%s%s", statement, postfix);
	return buf;
}
//#define kToken_s(tk) kToken_s_(_ctx, tk)
konoha.kToken_s_ = function(_ctx, tk)
{
	switch(tk.tt) {
	case konoha.ktoken_t.TK_INDENT: return "end of line";
	case konoha.ktoken_t.TK_CODE: ;
	case konoha.ktoken_t.AST_BRACE: return "{... }";
	case konoha.ktoken_t.AST_PARENTHESIS: return "(... )";
	case konoha.ktoken_t.AST_BRANCET: return "[... ]";
	default:  return tk.text.text;
	}
}

konoha.setSyntaxMethod = function(_ctx, f, synp, p, mp)
{
	if(f != null) {
		if(f != p) {
			p = f;
			mp = f;
		}
		synp = mp;  // FIXME: in case of
	}
}

konoha.KonohaSpace_defineSyntax = function(_ctx, ks, syndef)
{
	pParseStmt = null, pParseExpr = null, pStmtTyCheck = null, pExprTyCheck = null;
	mParseStmt = null, mParseExpr = null, mStmtTyCheck = null, mExprTyCheck = null;
	var i = 0;
	while(syndef[i].name != null) {
//		var kw = keyword(_ctx, syndef[i].name, syndef[i].name.length, konoha.FN_NEWID);
		var kw = syndef[i].name;
		var syn = konoha.KonohaSpace_syntax(_ctx, ks, kw, 1/*isnew*/);
		//syn->token = syndef->name;
		syn.flag  |= syndef[i].flag;
		if(syndef[i].type != null) {
			syn.ty = syndef[i].type;
		}
		if(syndef[i].op1 != null) {
			syn.op1 = syndef[i].op1;
		}
		if(syndef[i].op2 != null) {
			syn.op2 = syndef[i].op2;
		}
		if(syndef[i].priority_op2 > 0) {
			syn.priority = syndef[i].priority_op2;
		}
		if(syndef[i].rule != null) {
			syn.syntaxRuleNULL = new Array();
			konoha.parseSyntaxRule(_ctx, syndef[i].rule, 0, syn.syntaxRuleNULL);
		}


 		// konoha.setSyntaxMethod(_ctx, syndef[i].ParseStmt, syn.ParseStmtNULL, pParseStmt, mParseStmt);
 		// konoha.setSyntaxMethod(_ctx, syndef[i].ParseExpr, syn.ParseExpr, pParseExpr, mParseExpr);
 		// konoha.setSyntaxMethod(_ctx, syndef[i].TopStmtTyCheck, syn.TopStmtTyCheck, pStmtTyCheck, mStmtTyCheck);
 		// konoha.setSyntaxMethod(_ctx, syndef[i].StmtTyCheck, syn.StmtTyCheck, pStmtTyCheck, mStmtTyCheck);
 		// konoha.setSyntaxMethod(_ctx, syndef[i].ExprTyCheck, syn.ExprTyCheck, pExprTyCheck, mExprTyCheck);
		if (syndef[i].ParseStmt != null) syn.ParseStmtNULL = syndef[i].ParseStmt;
		if (syndef[i].ParseExpr != null) syn.ParseExpr = syndef[i].ParseExpr;
		if (syndef[i].TopStmtTyCheck != null) syn.TopStmtTyCheck = syndef[i].TopStmtTyCheck;
		if (syndef[i].StmtTyCheck != null) syn.StmtTyCheck = syndef[i].StmtTyCheck;
		if (syndef[i].ExprTyCheck != null) syn.ExprTyCheck = syndef[i].ExprTyCheck;

		if(syn.ParseExpr == _ctx.kmodsugar.UndefinedParseExpr) {
			if(konoha.FLAG_is(syn.flag, konoha.SYNFLAG_ExprOp)) {
				syn.ParseExpr = _ctx.kmodsugar.ParseExpr_Op;
			}
			else if(konoha.FLAG_is(syn.flag, konoha.SYNFLAG_ExprTerm)) {
				syn.ParseExpr = _ctx.kmodsugar.ParseExpr_Term;
			}
		}
//		konoha.assert(syn == SYN_(ks, kw));
		i++;
	}
	//DBG_P("syntax size=%d, hmax=%d", ks->syntaxMapNN->size, ks->syntaxMapNN->hmax);
}

konoha.Expr_vadd = function(_ctx, expr, n, args)
{
	var i;
//	konoha.DBG_P(args);
	for(i = 0; i < n; i++) {
		var v = args[i];
		if(v == null || v == konoha.K_NULLEXPR) {
			return konoha.K_NULLEXPR;
		}
		expr.cons.data.push(v);
	}
	return expr;
}

konoha.new_ConsExpr = function(_ctx, syn, n)
{
	var args = Array.prototype.slice.call(arguments).slice(3);
	konoha.assert(syn != null, "konoha.new_ConsExpr: syn == null");
	expr = new konoha.kExpr(syn);
	expr = konoha.Expr_vadd(_ctx, expr, n, args);
	return expr;
}

konoha.CT_findMethodNULL = function(_ctx, ct, mn)
{
	while(ct != null) {
		var ret = ct[mn];
		if (ret != null) {
			ret.mtdname = "konoha.ct." + ct.DBG_NAME + "." + mn;
			return ret;
		}
		else {
			ct = ct.superclass;
		}
	}
	return null;
}

konoha.KonohaSpace_getMethodNULL = function(_ctx, ks, cid, mn)
{
// 	while(ks != null) {
// 		var i;
// 		var mtd = ks.methods[mn];
// 		if (mtd != null) {
// 			return mtd;
// 		}
// 		else {
// 			ks = ks.parentNULL;
// 		}
// 	}
	var mtd = konoha.ct.Script[mn];
	if (mtd != null) {
		mtd.mtdname = "konoha.ct.Script." + mn;
		mtd.static_flag = true;
		return mtd;
	}
	return konoha.CT_findMethodNULL(_ctx, konoha.CT_(_ctx, cid), mn);
}

konoha.KonohaSpace_getCastMethodNULL = function(_ctx, ks, cid, tcid)
{
	var mtd = konoha.KonohaSpace_getMethodNULL(_ctx, ks, cid, tcid | konoha.MN_TOCID);
	if(mtd == null) {
		mtd = konoha.KonohaSpace_getMethodNULL(_ctx, ks, cid, tcid | konoha.MN_ASCID);
	}
	return mtd;
}

konoha.Expr_setNConstValue = function(_ctx, expr, ty, ndata)
{
	if(expr == null) {
		expr = new kExpr();
	}
	expr.build = konoha.TEXPR_NCONST;
	expr.ndata = ndata;
	expr.data = konoha.K_NULL;
	expr.ty = ty;
	return expr;
}
konoha.Expr_setConstValue = function(_ctx, expr, ty, o)
{
	if(expr == null) {
		expr = new konoha.kExpr();
//		PUSH_GCSTACK(expr);
	}
	if(true /*TODO!! konoha.TY_isUnbox(ty)*/) {
		expr.build = konoha.TEXPR_NCONST;
//TODO		expr.ndata = konoha.N_toint(o);
		expr.ndata = o;
		expr.data = null;
	}
	else {
		expr.build = konoha.TEXPR_CONST;
		expr.data = o;
	}
//	WASSERT(expr);
	return expr;
}

konoha.Expr_add = function(_ctx, expr, e)
{
//	konoha.assert(konoha.IS_Array(expr.cons));
	if(expr != null && e != null) {
		expr.cons.data.push(e);
		return expr;
	}
	return null;
}

//#define kExpr_setVariable(E, B, T, I, G)  Expr_setVariable(_ctx, E, TEXPR_##B, T, I, G)
konoha.Expr_setVariable = function(_ctx, expr, build, ty, index, gma)
{
	if(expr == null) {
		expr = new konoha.kExpr();
	}
	expr.build = build;
	expr.ty = ty;
	expr.index = index;
	// KSETv(Wexpr->data, K_NULL);  block need unclear
	if(build < konoha.TEXPR_UNTYPED) {
		gma.genv.lvarlst.push(expr);
	}
	return expr;
}

konoha.new_TypedConsExpr = function(_ctx,build, ty, n)
{
	var expr = new konoha.kExpr();
	expr = konoha.Expr_vadd(_ctx, expr, n /*ap*/);
	expr.build = build;
	expr.ty = ty;
	return expr;
}

konoha.Stmt_block = function(_ctx, stmt, kw, def)
{
	var bk = konoha.KObject_getObjectNULL(_ctx, stmt, kw);
	if(bk != null) {
		if(konoha.IS_Token(_ctx, bk)) {
			var tk = bk;
			if (tk.tt == konoha.ktoken_t.TK_CODE) {
				konoha.Token_toBRACE(_ctx, tk, konoha.Stmt_ks(_ctx, stmt));
			}
			if (tk.tt == konoha.ktoken_t.AST_BRACE) {
				bk = konoha.new_Block(_ctx, konoha.Stmt_ks(_ctx, stmt), stmt, tk.sub, 0, tk.sub.length, ';');
				konoha.KObject_setObject(_ctx, stmt, kw, null, bk);
			}
		}
		if(konoha.IS_Block(_ctx, bk)) return bk;
	}
	return def;
}

konoha.KonohaSpace_getCT = function(_ctx, ks, thisct/*NULL*/, name, len, def)
{
	var ct = null;
	if(name != null) {
		ct = konoha.ct[name];
	}
	return (ct != null) ? ct : ((def >= 0) ? null : konoha.CT_(_ctx, def));
}
