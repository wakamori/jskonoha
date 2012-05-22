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
//
///* ************************************************************************ */
//
///* ************************************************************************ */


konoha.new_Block = function(_ctx, ks, parent, tls, s, e, delim) {
	var bk = new kBlock();
	if(parent != NULL) {
		KINITv(bk.parentNULL, parent);
	}
	var i = s, indent = 0, atop = tls.data.length;
	while(i < e) {
		var tkERR = NULL;
		i =  konoha.selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tls, tkERR);
		var asize = tls.data.length;
		if(asize > atop) {
			konoha.Block_addStmtline(_ctx, bk, tls, atop, asize, tkERR);
			tls.data.length = 0;
		}
	}
	return bk;
}

konoha.Token_resolved = function(_ctx, ks, tk) {
	var kw = konoha.keyword(_ctx, S_text(tk.text), S_size(tk.text), FN_NONAME);
	if(kw != FN_NONAME) {
		syn = konoha.KonohaSpace_syntax(_ctx, ks, kw, 0);
		if(syn != NULL) {
			if(syn.ty != TY_unknown) {
				tk.kw = KW_Type;
				tk.ty = syn.ty;
			}
			else {
				tk.kw = kw;
			}
			return 1;
		}
	}
	return 0;
}

konoha.TokenType_resolveGenerics = function(_ctx, ks, tk, tkP) {
	if(tkP.tt == konoha.ktoken_t.AST_BRANCET) {
		var i, psize = 0, size = tkP.sub.data.length;
		var p[size];
		for(i = 0; i < size; i++) {
			var tkT = (tkP.sub.toks[i]);
			if(TK_isType(tkT)) {
				p[psize].ty = TK_type(tkT);
				psize++;
				continue;
			}
			if(tkT.topch == ',') continue;
			return NULL;
		}
		var ct;
		if(psize > 0) {
			ct = CT_(TK_type(tk));
			if(ct.cparam == K_NULLPARAM) {
				konoha.sugar_p(_ctx, ERR_, tk.uline, tk.lpos, "not generic type: %s", T_ty(TK_type(tk)));
				return tk;
			}
			ct = new konoha.CT_Generics(_ctx, ct, psize, p);
		}
		else {
			ct = konoha.CT_p0(_ctx, CT_Array, TK_type(tk));
		}
		tk.ty = ct.cid;
		return tk;
	}
	return NULL;
}

konoha.appendKeyword = function(_ctx, ks, tls, s, e, dst, tkERR)
{
	var ext = s;
	var tk = tls.Wtoks[s];
	if(tk.tt < konoha.ktoken_t.TK_OPERATOR) {
		tk.kw = tk.tt;
	}
	if(tk.tt == konoha.ktoken_t.TK_SYMBOL) {
		konoha.Token_resolved(_ctx, ks, tk);
	}
	else if(tk.tt == konoha.ktoken_t.TK_USYMBOL) {
		if(!Token_resolved(_ctx, ks, tk)) {
			var ct = new konoha.kKonohaSpace_getCT(ks, NULL/*FIXME*/, S_text(tk.text), S_size(tk.text), TY_unknown);
			if(ct != NULL) {
				tk.kw = KW_Type;
				tk.ty = ct.cid;
			}
		}
	}
	else if(tk.tt == konoha.ktoken_t.TK_OPERATOR) {
		if(!Token_resolved(_ctx, ks, tk)) {
			var errref = konoha.sugar_p(_ctx, ERR_, tk.uline, tk.lpos, "undefined token: %s", kToken_s(tk));
			konoha.Token_toERR(_ctx, tk, errref);
			tkERR[0] = tk;
			return e;
		}
	}
	else if(tk.tt == konoha.ktoken_t.TK_CODE) {
		tk.kw = KW_Brace;
	}
	if(TK_isType(tk)) { 
		dst.data.push(tk);
		while(next + 1 < e) {
			var tkB = tls.toks[next + 1];
			if(tkB.topch != '[') break;
			var abuf = ctxsugar.tokens;
			var atop = abuf.data.length;
			next = konoha.makeTree(_ctx, ks, AST_BRANCET, tls,  next+1, e, ']', abuf, tkERR);
			if(!(abuf.data.length) > atop)) return next;
			tkB = abuf.toks[atop];
			tk = TokenType_resolveGenerics(_ctx, ks, tk, tkB);
			if(tk == NULL) {
				if(abuf != dst) {
					dst.data.push(tk);
					abuf.data.length = 0;
				}
				return next;
			}
			abuf.data.length = 0;
		}
	}
	else if(tk.kw > KW_Expr) {
		dst.data.push(tk);
	}
	return next;
}

konoha.Token_toBRACE = function(_ctx, tk, ks)
{
	if(tk.tt == TK_CODE) {
		var a = new kArray();
		KonohaSpace_tokenize(_ctx, ks, S_text(tk.text), tk.uline, a);
		tk.tt = konoha.ktoken_t.AST_BRACE;
		tk.topch = '{';
		tk.closech = '}';
		konoha.KSETv(tk.sub, a);
		return 1;
	}
	return 0;
}

konoha.makeTree = function(_ctx, ks, tt, tls, s, e, closech, tlsdst, tkERRRef)

{
	var i, probablyCloseBefore = e - 1;
	var tk = tls.toks[s];
	var tkP = new kBlock();
	tlsdst.data.push;
	tkP.tt = tt;
	tkP.kw = tt;
	tkP.uline = tk.uline;
	tkP.topch = tk.topch;
	tkP.lpos = closech;
	konoha.KSETv(tkP.sub, new_(TokenArray, 0));
	for(i = s + 1; i < e; i++) {
		tk = tls.toks[i];
		if(tk.tt == TK_ERR) break;
		if(tk.topch == '(') {
			i = konoha.makeTree(_ctx, ks, AST_PARENTHESIS, tls, i, e, ')', tkP.sub, tkERRRef);
			continue;
		}
		if(tk.topch == '[') {
			i = konoha.makeTree(_ctx, ks, AST_BRANCET, tls, i, e, ']', tkP.sub, tkERRRef);
			continue;
		}
		if(tk.topch == closech) {
			return i;
		}
		if((closech == ')' || closech == ']') && tk.tt == TK_CODE) probablyCloseBefore = i;
		if(tk.tt == TK_INDENT && closech != '}') continue;
		i = konoha.appendKeyword(_ctx, ks, tls, i, e, tkP.sub, tkERRRef);
	}
	if(tk.tt != TK_ERR) {
		var errref = konoha.suger_p(ERR_, tk.uline, tk.lpos, "'%c' is expected (probably before %s)", closech, kToken_s(tls.toks[probablyCloseBefore]));
		konoha.Token_toERR(_ctx, tkP, errref);
	}
	else {
		tkP.tt = TK_ERR;
		konoha.KSETv(tkP.text, tk.text);
	}
	tkERRRef[0] = tkP;
	return e;
}

konoha.selectStmtLine = function(_ctx, ks, indent, tls, s, e, delim, tlsdst, tkERRRef)
{
	var i = s;
	for(; i < e - 1; i++) {
		var tk = tls.toks[i];
		var tk1 = tls.Wtoks[i+1];
		if(tk.kw > 0) break;
		if(tk.topch == '@' && (tk1.tt == konoha.ktoken_t.TK_SYMBOL || tk1.tt == konoha.ktoken_t.TK_USYMBOL)) {
			tk1.tt = konoha.ktoken_t.TK_METANAME;  tk1.kw = 0;
			tlsdst.data.push(tk1); i++;
			if(i + 1 < e && tls.toks[i+1].topch == '(') {
				i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_PARENTHESIS, tls, i+1, e, ')', tlsdst, tkERRRef);
			}
			continue;
		}
		if(tk.tt == konoha.ktoken_t.TK_METANAME) {
			tlsdst.data.push(tk1);
			if(tk1.tt == konoha.ktoken_t.AST_PARENTHESIS) {
				tlsdst.data.push(tk1);
				i++;
			}
			continue;
		}
		if(tk.tt != konoha.ktoken_t.TK_INDENT) break;
		if(indent == 0) indent = tk.lpos;
	}
	for(; i < e ; i++) {
		var tk = tls.toks[i];
		if(tk.topch == delim && tk.tt == konoha.ktoken_t.TK_OPERATOR) {
			return i+1;
		}
		if(tk.kw > 0) {
			tlsdst.data.push(tk1);
			continue;
		}
		else if(tk.topch == '(') {
			i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_PARENTHESIS, tls,  i, e, ')', tlsdst, tkERRRef);
			continue;
		}
		else if(tk.topch == '[') {
			i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_BRANCET, tls, i, e, ']', tlsdst, tkERRRef);
			continue;
		}
		else if(tk.tt == konoha.ktoken_t.TK_ERR) {
			tkERRRef[0] = tk;
		}
		if(tk.tt == konoha.ktoken_t.TK_INDENT) {
			if(tk.lpos <= indent) {
				return i+1;
			}
			continue;
		}
		i = konoha.appendKeyword(_ctx, ks, tls, i, e, tlsdst, tkERRRef);
	}
	return i;
}

konoha.Stmt_newExpr2 = function(_ctx, stmt, tls, s, e);

konoha.Stmt_addAnnotation = function(_ctx, stmt, tls, s, e)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(tk.tt != konoha.ktoken_t.TK_METANAME) break;
		if(i+1 < e) {
			var buf[64];
			snprintf(buf, sizeof(buf), "@%s", S_text(tk.text));
			var kw = konoha.keyword(_ctx, buf, S_size(tk.text)+1, FN_NEWID);
			var tk1 = tls.toks[i+1];
			var value = UPCAST(K_TRUE);
			if(tk1.tt == konoha.ktoken_t.AST_PARENTHESIS) {
				value = konoha.Stmt_newExpr2(_ctx, stmt, tk1.sub, 0, kArray_size(tk1.sub));
				i++;
			}
			if(value != NULL) {
				kObject_setObject(stmt, kw, value);
			}
		}
	}
	return i;
}

konoha.WARN_Ignored = function(_ctx, tls, s, e)
{
	if(s < e) {
		var i = s;
		var wb;
		kwb_printf(wb, "%s", kToken_s(tls.toks[i])); i++;
		while(i < e) {
			kwb_printf(wb, " %s", kToken_s(tls.toks[i])); i++;
		}
		konoha.sugar_p(WARN_, tls.toks[s].uline, tls.toks[s].lpos, "ignored tokens: %s", kwb_top(wb, 1));
	}
}

//konoha.ParseStmt = function(_ctx, syn, stmt, name, tls, s, e)
//{
//	BEGIN_LOCAL(lsfp, 8);
//	konoha.KSETv(lsfp[K_CALLDELTA+0].o, stmt);
//	lsfp[K_CALLDELTA+0].ndata = syn;
//	lsfp[K_CALLDELTA+1].ivalue = name;
//	konoha.KSETv(lsfp[K_CALLDELTA+2].a, tls);
//	lsfp[K_CALLDELTA+3].ivalue = s;
//	lsfp[K_CALLDELTA+4].ivalue = e;
//	KCALL(lsfp, 0, syn.ParseStmtNULL, 4, knull(CT_Int));
//	END_LOCAL();
//	return lsfp[0].ivalue;
//}
//
konoha.lookAheadKeyword = function(tls, s, e, rule)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(rule.kw == tk.kw) return i;
	}
	return -1;
}

konoha.matchSyntaxRule = function(_ctx, stmt, rules, uline, tls, s, e, optional)
{
	var ri, ti, rule_size = rules.data.length;
	ti = s;
	for(ri = 0; ri < rule_size && ti < e; ri++) {
		var rule = rules.toks[ri];
		var tk = tls.toks[ti];
		uline = tk.uline;
		if(rule.tt == TK_CODE) {
			if(rule.kw != tk.kw) {
				if(optional) return s;
				kToken_p(tk, ERR_, "%s needs '%s'", T_statement(stmt.syn.kw), T_kw(rule.kw));
				return -1;
			}
			ti++;
			continue;
		}
		else if(rule.tt == TK_METANAME) {
			var syn = KonohaSpace_syntax(_ctx, kStmt_ks(stmt), rule.kw, 0);
			if(syn == NULL || syn.ParseStmtNULL == NULL) {
				kToken_p(tk, ERR_, "unknown syntax pattern: %s", T_kw(rule.kw));
				return -1;
			}
			int c = e;
			if(ri + 1 < rule_size && rules.toks[ri+1].tt == TK_CODE) {
				c = lookAheadKeyword(tls, ti+1, e, rules.toks[ri+1]);
				if(c == -1) {
					if(optional) return s;
					kToken_p(tk, ERR_, "%s needs '%s'", T_statement(stmt.syn.kw), T_kw(rule.kw));
					return -1;
				}
				ri++;
			}
			var err_count = ctxsugar.err_count;
			var next =  konoha.ParseStmt(_ctx, syn, stmt, rule.nameid, tls, ti, c);
			if(next == -1) {
				if(optional) return s;
				if(err_count == ctxsugar.err_count) {
					kToken_p(tk, ERR_, "%s needs syntax pattern %s, not %s ..", T_statement(stmt.syn.kw), T_kw(rule.kw), kToken_s(tk));
				}
				return -1;
			}
			ti = (c == e) ? next : c + 1;
			continue;
		}
		else if(rule.tt == konoha.ktoken_t.AST_OPTIONAL) {
			var next = konoha.matchSyntaxRule(_ctx, stmt, rule.sub, uline, tls, ti, e, 1);
			if(next == -1) return -1;
			ti = next;
			continue;
		}
		else if(rule.tt == konoha.ktoken_t.AST_PARENTHESIS || rule.tt == konoha.ktoken_t.AST_BRACE || rule.tt == konoha.ktoken_t.AST_BRANCET) {
			if(tk.tt == rule.tt && rule.topch == tk.topch) {
				var next =  konoha.matchSyntaxRule(_ctx, stmt, rule.sub, uline, tk.sub, 0, tk.sub.data.length, 0);
				if(next == -1) return -1;
				ti++;
			}
			else {
				if(optional) return s;
				kToken_p(tk, ERR_, "%s needs '%c'", T_statement(stmt.syn.kw), rule.topch);
				return -1;
			}
		}
	}
	if(!optional) {
		for(; ri < rules.data.length; ri++) {
			var rule = rules.toks[ri];
			if(rule.tt != konoha.ktoken_t.AST_OPTIONAL) {
				konoha.sugar_p(ERR_, uline, -1, "%s needs syntax pattern: %s", T_statement(stmt.syn.kw), T_kw(rule.kw));
				return -1;
			}
		}
		konoha.WARN_Ignored(_ctx, tls, ti, e);
	}
	return ti;
}

konoha.TokenArray_lookAhead = function(_ctx, tls, s, e)
{
	return (s < e) ? tls.toks[s] : K_NULLTOKEN;
}

konoha.KonohaSpace_getSyntaxRule = function(_ctx, ks, tls, s, e)
{
	var tk = tls.toks[s];
	if(TK_isType(tk)) {
		tk = konoha.TokenArray_lookAhead(_ctx, tls, s+1, e);
		if(tk.tt == konoha.ktoken_t.TK_SYMBOL || tk.tt == konoha.ktoken_t.TK_USYMBOL) {
			tk = konoha.TokenArray_lookAhead(_ctx, tls, s+2, e);
			if(tk.tt == konoha.ktoken_t.AST_PARENTHESIS || tk.kw == KW_DOT) {
				return konoha.KonohaSpace_syntax(_ctx, ks, KW_StmtMethodDecl, 0); 
			}
			return konoha.KonohaSpace_syntax(_ctx, ks, KW_StmtTypeDecl, 0);  
		}
		return konoha.KonohaSpace_syntax(_ctx, ks, KW_Expr, 0);
	}
	var syn = konoha.KonohaSpace_syntax(_ctx, ks, tk.kw, 0);
	if(syn.syntaxRuleNULL == NULL) {
		int i;
		for(i = s + 1; i < e; i++) {
			tk = tls.toks[i];
			syn = konoha.KonohaSpace_syntax(_ctx, ks, tk.kw, 0);
			if(syn.syntaxRuleNULL != NULL && syn.priority > 0) {
				konoha.sugar_p(DEBUG_, tk.uline, tk.lpos, "binary operator syntax kw='%s'", T_kw(syn.kw));
				return syn;
			}
		}
		return konoha.KonohaSpace_syntax(_ctx, ks, KW_Expr, 0);
	}
	return syn;
}

konoha.Stmt_parseSyntaxRule = function(_ctx, stmt, tls, s, e)
{
	var ret = false;
	var syn = konoha.KonohaSpace_getSyntaxRule(_ctx, kStmt_ks(stmt), tls, s, e);
	if(syn.syntaxRuleNULL != NULL) {
		stmt.syn = syn;
		ret = (konoha.matchSyntaxRule(_ctx, stmt, syn.syntaxRuleNULL, stmt.uline, tls, s, e, 0) != -1);
	}
	else {
		konoha.sugar_p(ERR_, stmt.uline, 0, "undefined syntax rule for '%s'", T_kw(syn.kw));
	}
	return ret;
}

konoha.Block_addStmtLine = function(_ctx, bk, tls, s, e, tkERR)
{
	var stmt = new kBlock();
	bk.blocks.data.push(stmt);
	KINITv(stmt.parentNULL, bk);
	if(tkERR != NULL) {
		stmt.syn = konoha.KonohaSpace_syntax(_ctx, kStmt_ks(stmt), KW_Err, 0);
		stmt.build = TSTMT_ERR;
		kObject_setObject(stmt, KW_Err, tkERR.text);
	}
	else {
		var estart = kerrno;
		s = konoha.Stmt_addAnnotation(_ctx, stmt, tls, s, e);
		if(!Stmt_parseSyntaxRule(_ctx, stmt, tls, s, e)) {
			kStmt_toERR(stmt, estart);
		}
	}
}

/* ------------------------------------------------------------------------ */

konoha.UndefinedParseExpr = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	tk = tls.toks[c];
	konoha.sugar_p(ERR_, tk.uline, tk.lpos, "undefined expression parser for '%s'", kToken_s(tk));
	RETURN_(K_NULLEXPR);


	konoha.ParseExpr = function(_ctx, syn, stmt, tls, s, c, e)
	{
		var mtd = (syn == NULL || syn.ParseExpr == NULL) ? kmodsugar.UndefinedParseExpr : syn.ParseExpr;
		BEGIN_LOCAL(lsfp, 10);
		konoha.KSETv(lsfp[K_CALLDELTA+0].o, stmt;
				lsfp[K_CALLDELTA+0].ndata = syn;
				konoha.KSETv(lsfp[K_CALLDELTA+1].o, tls);
				lsfp[K_CALLDELTA+2].ivalue = s;
				lsfp[K_CALLDELTA+3].ivalue = c;
				lsfp[K_CALLDELTA+4].ivalue = e;
				KCALL(lsfp, 0, mtd, 4, K_NULLEXPR);
				END_LOCAL();
				DBG_ASSERT(IS_Expr(lsfp[0].o));
				return lsfp[0].expr;
				}

				konoha.Stmt_isUnaryOp = function(_ctx, stmt, tk)
				{
					var syn = konoha.KonohaSpace_syntax(_ctx, kStmt_ks(stmt), tk.kw, 0);
					return (syn.op1 != MN_NONAME);
				}

				konoha.Stmt_skipUnaryOp = function(_ctx, stmt, tls, s, e)
				{
					var i;
					for(i = s; i < e; i++) {
						var tk = tls.toks[i];
						if(!Stmt_isUnaryOp(_ctx, stmt, tk)) {
							break;
						}
					}
					return i;
				}

		konoha.Stmt_findBinaryOp = function(_ctx, stmt, tls, s, e, synRef)
		{
			var idx = -1, i, prif = 0;
			for(i = Stmt_skipUnaryOp(_ctx, stmt, tls, s, e) + 1; i < e; i++) {
				var tk = tls.toks[i];
				var syn = konoha.KonohaSpace_syntax(kStmt_ks(stmt), tk.kw);
				if(syn.priority > 0) {
					if(prif < syn.priority || (prif == syn.priority && !(FLAG_is(syn.flag, SYNFLAG_ExprLeftJoinOp2)) )) {
						prif = syn.priority;
						idx = i;
						synRef = syn;
					}
					if(!FLAG_is(syn.flag, SYNFLAG_ExprPostfixOp2)) {
						i = konoha.Stmt_skipUnaryOp(_ctx, stmt, tls, i+1, e) - 1;
					}
				}
			}
			return idx;
		}

		konoha.Stmt_addExprParams = function(_ctx, stmt, expr, tls, s, e, allowEmpty)
		{
			var i, start = s;
			for(i = s; i < e; i++) {
				var tk = tls.toks[i];
				if(tk.kw == KW_COMMA) {
					expr = konoha.Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
					start = i + 1;
				}
			}
			if(allowEmpty == 0 || start < i) {
				expr = konoha.Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
			}
			tls.data.length = 0;
			return expr;
		}

		konoha.Stmt_newExpr2 = function(_ctx, stmt, tls, s,  e)
		{
			if(s < e) {
				var syn = NULL;
				var idx = konoha.Stmt_findBinaryOp(_ctx, stmt, tls, s, e, syn);
				if(idx != -1) {
					return konoha.ParseExpr(_ctx, syn, stmt, tls, s, idx, e);
				}
				var c = s;
				syn = konoha.KonohaSpace_syntax(_ctx, kStmt_ks(stmt), (tls.toks[c]).kw, 0);
				return konoha.ParseExpr(_ctx, syn, stmt, tls, c, c, e);
			}
			else {
				if (0 < s - 1) {
					konoha.sugar_p(ERR_, stmt.uline, -1, "expected expression after %s", kToken_s(tls.toks[s-1]));
				}
				else if(e < Array.length(tls)) {
					konoha.sugar_p(ERR_, stmt.uline, -1, "expected expression before %s", kToken_s(tls.toks[e]));
				}
				else {
					konoha.sugar_p(ERR_, stmt.uline, 0, "expected expression");
				}
				return K_NULLEXPR;
			}
		}

		konoha.Expr_rightJoin = function(_ctx, expr, stmt, tls, s, c, e)
		{
			if(c < e && expr != K_NULLEXPR) {
				konoha.WARN_Ignored(_ctx, tls, c, e);
			}
			return expr;
		}

		konoha.ParseExpr_Term = function(_ctx, sfp ,_rix)
		{
			VAR_ParseExpr(stmt, syn, tls, s, c, e);
			var tk = tls.toks[c];
			var expr = new kBlock(Expr, SYN_(kStmt_ks(stmt), tk.kw));
			Expr_setTerm(expr, 1);
			konoha.KSETv(expr.tk, tk);
			RETURN_(kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e));
		}

		konoha.ParseExpr_Op = function(_ctx, sfp ,_rix)
		{
			VAR_ParseExpr(stmt, syn, tls, s, c, e);
			var tk = tls.toks[c];
			var expr, rexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, c+1, e);
			kmethodn_t mn = (s == c) ? syn.op1 : syn.op2;
			if(mn != MN_NONAME && syn.ExprTyCheck == kmodsugar.UndefinedExprTyCheck) {
				kToken_setmn(tk, mn, (s == c) ? MNTYPE_unary: MNTYPE_binary);
				syn = konoha.KonohaSpace_syntax(_ctx, kStmt_ks(stmt), KW_ExprMethodCall, 0);
			}
			if(s == c) {
				expr = konoha.new_ConsExpr(_ctx, syn, 2, tk, rexpr);
			}
			else {
				var lexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
				expr = konoha.new_ConsExpr(_ctx, syn, 3, tk, lexpr, rexpr);
			}
			RETURN_(expr);
		}

		konoha.isFieldName = function(tls, c, e)
		{
			if(c+1 < e) {
				var tk = tls.toks[c+1];
				return (tk.tt == konoha.ktoken_t.TK_SYMBOL || tk.tt == konoha.ktoken_t.TK_USYMBOL || tk.tt == konoha.ktoken_t.TK_MSYMBOL);
			}
			return false;
		}
		konoha.ParseExpr_DOT = function(_ctx, sfp ,_rix)
		{
			VAR_ParseExpr(stmt, syn, tls, s, c, e);
			if(isFieldName(tls, c, e)) {
				var expr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
				expr = konoha.new_ConsExpr(_ctx, syn, 2, tls.toks[c+1], expr);
				RETURN_(kExpr_rightJoin(expr, stmt, tls, c+2, c+2, e));
			}
			if(c + 1 < e) c++;
			RETURN_(kToken_p(tls.toks[c], ERR_, "expected field name: not %s", kToken_s(tls.toks[c])));
		}

		konoha.ParseExpr_Parenthesis = function(_ctx, sfp ,_rix)
		{
			VAR_ParseExpr(stmt, syn, tls, s, c, e);
			var tk = tls.toks[c];
			if(s == c) {
				var expr = konoha.Stmt_newExpr2(_ctx, stmt, tk.sub, 0, kArray_size(tk.sub));
				RETURN_(kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e));
			}
			else {
				var lexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
				if(lexpr == K_NULLEXPR) {
					RETURN_(lexpr);
				}
				if(lexpr.syn.kw == KW_DOT) {
					lexpr.syn = konoha.KonohaSpace_syntax(_ctx, kStmt_ks(stmt), KW_ExprMethodCall, 0);
				}
				else if(lexpr.syn.kw != KW_ExprMethodCall) {
					DBG_P("function calls  .. ");
					syn = konoha.KonohaSpace_syntax(_ctx, kStmt_ks(stmt), KW_Parenthesis, 0);
					lexpr  = konoha.new_ConsExpr(_ctx, syn, 2, lexpr, K_NULL);
				}
				lexpr = konoha.Stmt_addExprParams(_ctx, stmt, lexpr, tk.sub, 0, tk.sub.data.length, 1/*allowEmpty*/);
				RETURN_(kExpr_rightJoin(lexpr, stmt, tls, s+1, c+1, e));
			}
		}

		konoha.ParseExpr_COMMA = function(_ctx, sfp ,_rix)
		{
			VAR_ParseExpr(stmt, syn, tls, s, c, e);
			var expr = konoha.new_ConsExpr(_ctx, syn, 1, tls.toks[c]);
			expr = konoha.Stmt_addExprParams(_ctx, stmt, expr, tls, s, e, 0/*allowEmpty*/);
			RETURN_(expr);
		}

		konoha.ParseExpr_DOLLAR = function(_ctx, sfp ,_rix)
		{
			VAR_ParseExpr(stmt, syn, tls, s, c, e);
			if(s == c && c + 1 < e) {
				var tk = tls.toks[c+1];
				if(tk.tt == TK_CODE) {
					konoha.Token_toBRACE(_ctx, tk, kStmt_ks(stmt));
				}
				if(tk.tt == konoha.ktoken_t.AST_BRACE) {
					var expr = new kBlock();
					Expr_setTerm(expr, 1);
					konoha.KSETv(expr.tk, tk);
					konoha.KSETv(expr.block, new_Block(_ctx, kStmt_ks(stmt), stmt, tk.sub, 0, tk.sub.data.length, ';'));
					RETURN_(expr);
				}
			}
			RETURN_(kToken_p(tls.toks[c], ERR_, "unknown %s parser", kToken_s(tls.toks[c])));
		}

		konoha.ParseStmt_Expr = function(_ctx, sfp ,_rix)
		{
			VAR_ParseStmt(stmt, syn, name, tls, s, e);
			var r = -1;
			konoha.dumpTokenArray(_ctx, 0, tls, s, e);
			var expr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, e);
			if(expr != K_NULLEXPR) {
				konoha.dumpExpr(_ctx, 0, 0, expr);
				konoha.kObject_setObject(stmt, name, expr);
				r = e;
			}
			RETURNi_(r);
		}

		konoha.ParseStmt_Type = function(_ctx, sfp ,_rix)
		{
			VAR_ParseStmt(stmt, syn, name, tls, s, e);
			var r = -1;
			var tk = tls.toks[s];
			if(TK_isType(tk)) {
				konoha.kObject_setObject(stmt, name, tk);
				r = s + 1;
			}
			RETURNi_(r);
		}

		konoha.ParseStmt_Usymbol = function(_ctx, sfp ,_rix)
		{
			VAR_ParseStmt(stmt, syn, name, tls, s, e);
			var r = -1;
			var tk = tls.toks[s];
			if(tk.tt == konoha.ktoken_t.TK_USYMBOL) {
				konoha.kObject_setObject(stmt, name, tk);
				r = s + 1;
			}
			RETURNi_(r);
		}

		konoha.ParseStmt_Symbol = function(_ctx, sfp ,_rix)
		{
			VAR_ParseStmt(stmt, syn, name, tls, s, e);
			var r = -1;
			var tk = tls.toks[s];
			if(tk.tt == konoha.ktoken_t.TK_SYMBOL) {
				konoha.kObject_setObject(stmt, name, tk);
				r = s + 1;
			}
			RETURNi_(r);
		}

		konoha.ParseStmt_Params = function(_ctx, sfp ,_rix)
		{
			VAR_ParseStmt(stmt, syn, name, tls, s, e);
			var r = -1;
			var tk = tls.toks[s];
			if(tk.tt == konoha.ktoken_t.AST_PARENTHESIS) {
				var tls = tk.sub;
				var ss = 0, ee = Array.length(tls);
				if(0 < ee && tls.toks[0].kw == KW_void) ss = 1;
				var bk = konoha.new_Block(_ctx, kStmt_ks(stmt), stmt, tls, ss, ee, ',');
				konoha.kObject_setObject(stmt, name, bk);
				r = s + 1;
			}
			RETURNi_(r);
		}

		konoha.ParseStmt_Block = function(_ctx, sfp ,_rix)
		{
			VAR_ParseStmt(stmt, syn, name, tls, s, e);
			var tk = tls.toks[s];
			if(tk.tt == TK_CODE) {
				konoha.kObject_setObject(stmt, name, tk);
				RETURNi_(s+1);
			}
			else if(tk.tt == konoha.ktoken_t.AST_BRACE) {
				var bk = konoha.new_Block(_ctx, kStmt_ks(stmt), stmt, tk.sub, 0, tk.sub.data.length, ';');
				konoha.kObject_setObject(stmt, name, bk);
				RETURNi_(s+1);
			}
			else {
				var bk = konoha.new_Block(_ctx, kStmt_ks(stmt), stmt, tls, s, e, ';');
				konoha.kObject_setObject(stmt, name, bk);
				RETURNi_(e);
			}
			RETURNi_(-1);
		}

		konoha.ParseStmt_Toks = function(_ctx, sfp _rix)
		{
			konoha.VAR_ParseStmt(stmt, syn, name, tls, s, e);
			if(s < e) {
				var a = new kArray();
				while(s < e) {
					a.data.push(tls.toks[s]);
					s++;
				}
				konoha.kObject_setObject(stmt, name, a);
				RETURNi_(e);
			}
	RETURNi_(-1);
}
