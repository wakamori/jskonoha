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
//
//#ifdef __cplusplus
//extern "C" {
//#endif
//
///* ------------------------------------------------------------------------ */
//// Block
//
//static int selectStmtLine(CTX, kKonohaSpace *ks, int *indent, kArray *tls, int s, int e, int delim, kArray *tlsdst, kToken **tkERRRef);
//static void Block_addStmtLine(CTX, kBlock *bk, kArray *tls, int s, int e, kToken *tkERR);
//static int makeTree(CTX, kKonohaSpace *ks, ktoken_t tt, kArray *tls, int s, int e, int closech, kArray *tlsdst, kToken **tkERRRef);
//
//static kBlock *new_Block(CTX, kKonohaSpace *ks, kStmt *parent, kArray *tls, int s, int e, int delim)
//{
//	struct _kBlock *bk = new_W(Block, ks);
//	PUSH_GCSTACK(bk);
//	if(parent != NULL) {
//		KINITv(bk->parentNULL, parent);
//	}
//	int i = s, indent = 0, atop = kArray_size(tls);
//	while(i < e) {
//		kToken *tkERR = NULL;
//		DBG_ASSERT(atop == kArray_size(tls));
//		i = selectStmtLine(_ctx, ks, &indent, tls, i, e, delim, tls, &tkERR);
//		int asize = kArray_size(tls);
//		if(asize > atop) {
//			Block_addStmtLine(_ctx, bk, tls, atop, asize, tkERR);
//			kArray_clear(tls, atop);
//		}
//	}
//	return (kBlock*)bk;
//}
//
//static kbool_t Token_resolved(CTX, kKonohaSpace *ks, struct _kToken *tk)
//{
//	keyword_t kw = keyword(_ctx, S_text(tk->text), S_size(tk->text), FN_NONAME);
//	if(kw != FN_NONAME) {
//		ksyntax_t *syn = SYN_(ks, kw);
//		if(syn != NULL) {
//			if(syn->ty != TY_unknown) {
//				tk->kw = KW_Type; tk->ty = syn->ty;
//			}
//			else {
//				tk->kw = kw;
//			}
//			return 1;
//		}
//	}
//	return 0;
//}
//
//static struct _kToken* TokenType_resolveGenerics(CTX, kKonohaSpace *ks, struct _kToken *tk, kToken *tkP)
//{
//	if(tkP->tt == AST_BRANCET) {
//		size_t i, psize= 0, size = kArray_size(tkP->sub);
//		kparam_t p[size];
//		for(i = 0; i < size; i++) {
//			kToken *tkT = (tkP->sub->toks[i]);
//			if(TK_isType(tkT)) {
//				p[psize].ty = TK_type(tkT);
//				psize++;
//				continue;
//			}
//			if(tkT->topch == ',') continue;
//			return NULL; // new int[10];  // not generics
//		}
//		kclass_t *ct;
//		if(psize > 0) {
//			ct = CT_(TK_type(tk));
//			if(ct->cparam == K_NULLPARAM) {
//				SUGAR_P(ERR_, tk->uline, tk->lpos, "not generic type: %s", T_ty(TK_type(tk)));
//				return tk;
//			}
//			ct = kClassTable_Generics(ct, psize, p);
//		}
//		else {
//			ct = CT_p0(_ctx, CT_Array, TK_type(tk));
//		}
//		tk->ty = ct->cid;
//		return tk;
//	}
//	return NULL;
//}
//
//static int appendKeyword(CTX, kKonohaSpace *ks, kArray *tls, int s, int e, kArray *dst, kToken **tkERR)
//{
//	int next = s; // don't add
//	struct _kToken *tk = tls->Wtoks[s];
//	if(tk->tt < TK_OPERATOR) {
//		tk->kw = tk->tt;
//	}
//	if(tk->tt == TK_SYMBOL) {
//		Token_resolved(_ctx, ks, tk);
//	}
//	else if(tk->tt == TK_USYMBOL) {
//		if(!Token_resolved(_ctx, ks, tk)) {
//			kclass_t *ct = kKonohaSpace_getCT(ks, NULL/*FIXME*/, S_text(tk->text), S_size(tk->text), TY_unknown);
//			if(ct != NULL) {
//				tk->kw = KW_Type;
//				tk->ty = ct->cid;
//			}
//		}
//	}
//	else if(tk->tt == TK_OPERATOR) {
//		if(!Token_resolved(_ctx, ks, tk)) {
//			size_t errref = SUGAR_P(ERR_, tk->uline, tk->lpos, "undefined token: %s", kToken_s(tk));
//			Token_toERR(_ctx, tk, errref);
//			tkERR[0] = tk;
//			return e;
//		}
//	}
//	else if(tk->tt == TK_CODE) {
//		tk->kw = KW_Brace;
//	}
//	if(TK_isType(tk)) {   // trying to resolve Type[Type, Type]
//		kArray_add(dst, tk);
//		while(next + 1 < e) {
//			kToken *tkB = tls->toks[next + 1];
//			if(tkB->topch != '[') break;
//			kArray *abuf = ctxsugar->tokens;
//			size_t atop = kArray_size(abuf);
//			next = makeTree(_ctx, ks, AST_BRANCET, tls,  next+1, e, ']', abuf, tkERR);
//			if(!(kArray_size(abuf) > atop)) return next;
//			tkB = abuf->toks[atop];
//			tk = TokenType_resolveGenerics(_ctx, ks, tk, tkB);
//			if(tk == NULL) {
//				DBG_P("APPEND tkB->tt=%s", T_tt(tkB->tt));
//				if(abuf != dst) {
//					kArray_add(dst, tkB);
//					kArray_clear(abuf, atop);
//				}
//				DBG_P("next=%d", next);
//				return next;
//			}
//			kArray_clear(abuf, atop);
//		}
//	}
//	else if(tk->kw > KW_Expr) {
//		kArray_add(dst, tk);
//	}
//	return next;
//}
//
//static kbool_t Token_toBRACE(CTX, struct _kToken *tk, kKonohaSpace *ks)
//{
//	if(tk->tt == TK_CODE) {
//		INIT_GCSTACK();
//		kArray *a = new_(TokenArray, 0);
//		PUSH_GCSTACK(a);
//		KonohaSpace_tokenize(_ctx, ks, S_text(tk->text), tk->uline, a);
//		tk->tt = AST_BRACE; tk->topch = '{'; tk->closech = '}';
//		KSETv(tk->sub, a);
//		RESET_GCSTACK();
//		return 1;
//	}
//	return 0;
//}
//
//static int makeTree(CTX, kKonohaSpace *ks, ktoken_t tt, kArray *tls, int s, int e, int closech, kArray *tlsdst, kToken **tkERRRef)
//{
//	int i, probablyCloseBefore = e - 1;
//	kToken *tk = tls->toks[s];
//	DBG_ASSERT(tk->kw == 0);
////	if(AST_PARENTHESIS <= tk->tt && tk->tt <= AST_BRACE) {  // already transformed
////		kArray_add(tlsdst, tk);
////		return s;
////	}
//	struct _kToken *tkP = new_W(Token, 0);
//	kArray_add(tlsdst, tkP);
//	tkP->tt = tt; tkP->kw = tt; tkP->uline = tk->uline; tkP->topch = tk->topch; tkP->lpos = closech;
//	KSETv(tkP->sub, new_(TokenArray, 0));
//	for(i = s + 1; i < e; i++) {
//		tk = tls->toks[i];
//		DBG_ASSERT(tk->kw == 0);
//		if(tk->tt == TK_ERR) break;  // ERR
//		DBG_ASSERT(tk->topch != '{');
//		if(tk->topch == '(') {
//			i = makeTree(_ctx, ks, AST_PARENTHESIS, tls, i, e, ')', tkP->sub, tkERRRef);
//			continue;
//		}
//		if(tk->topch == '[') {
//			i = makeTree(_ctx, ks, AST_BRANCET, tls, i, e, ']', tkP->sub, tkERRRef);
//			continue;
//		}
//		if(tk->topch == closech) {
//			return i;
//		}
//		if((closech == ')' || closech == ']') && tk->tt == TK_CODE) probablyCloseBefore = i;
//		if(tk->tt == TK_INDENT && closech != '}') continue;  // remove INDENT;
//		i = appendKeyword(_ctx, ks, tls, i, e, tkP->sub, tkERRRef);
//	}
//	if(tk->tt != TK_ERR) {
//		size_t errref = SUGAR_P(ERR_, tk->uline, tk->lpos, "'%c' is expected (probably before %s)", closech, kToken_s(tls->toks[probablyCloseBefore]));
//		Token_toERR(_ctx, tkP, errref);
//	}
//	else {
//		tkP->tt = TK_ERR;
//		KSETv(tkP->text, tk->text);
//	}
//	tkERRRef[0] = tkP;
//	return e;
//}
//
//static int selectStmtLine(CTX, kKonohaSpace *ks, int *indent, kArray *tls, int s, int e, int delim, kArray *tlsdst, kToken **tkERRRef)
//{
//	int i = s;
//	DBG_ASSERT(e <= kArray_size(tls));
//	for(; i < e - 1; i++) {
//		kToken *tk = tls->toks[i];
//		struct _kToken *tk1 = tls->Wtoks[i+1];
//		if(tk->kw > 0) break;  // already parsed
//		if(tk->topch == '@' && (tk1->tt == TK_SYMBOL || tk1->tt == TK_USYMBOL)) {
//			tk1->tt = TK_METANAME;  tk1->kw = 0;
//			kArray_add(tlsdst, tk1); i++;
//			if(i + 1 < e && tls->toks[i+1]->topch == '(') {
//				i = makeTree(_ctx, ks, AST_PARENTHESIS, tls, i+1, e, ')', tlsdst, tkERRRef);
//			}
//			continue;
//		}
//		if(tk->tt == TK_METANAME) {  // already parsed
//			kArray_add(tlsdst, tk);
//			if(tk1->tt == AST_PARENTHESIS) {
//				kArray_add(tlsdst, tk1);
//				i++;
//			}
//			continue;
//		}
//		if(tk->tt != TK_INDENT) break;
//		if(*indent == 0) *indent = tk->lpos;
//	}
//	for(; i < e ; i++) {
//		kToken *tk = tls->toks[i];
//		if(tk->topch == delim && tk->tt == TK_OPERATOR) {
//			return i+1;
//		}
//		if(tk->kw > 0) {
//			kArray_add(tlsdst, tk);
//			continue;
//		}
//		else if(tk->topch == '(') {
//			i = makeTree(_ctx, ks, AST_PARENTHESIS, tls,  i, e, ')', tlsdst, tkERRRef);
//			continue;
//		}
//		else if(tk->topch == '[') {
//			i = makeTree(_ctx, ks, AST_BRANCET, tls, i, e, ']', tlsdst, tkERRRef);
//			continue;
//		}
//		else if(tk->tt == TK_ERR) {
//			tkERRRef[0] = tk;
//		}
//		if(tk->tt == TK_INDENT) {
//			if(tk->lpos <= *indent) {
//				return i+1;
//			}
//			continue;
//		}
//		i = appendKeyword(_ctx, ks, tls, i, e, tlsdst, tkERRRef);
//	}
//	return i;
//}
//
//static kExpr* Stmt_newExpr2(CTX, kStmt *stmt, kArray *tls, int s, int e);
//
//static int Stmt_addAnnotation(CTX, kStmt *stmt, kArray *tls, int s, int e)
//{
//	int i;
//	for(i = s; i < e; i++) {
//		kToken *tk = tls->toks[i];
//		if(tk->tt != TK_METANAME) break;
//		if(i+1 < e) {
//			char buf[64];
//			snprintf(buf, sizeof(buf), "@%s", S_text(tk->text));
//			keyword_t kw = keyword(_ctx, (const char*)buf, S_size(tk->text)+1, FN_NEWID);
//			kToken *tk1 = tls->toks[i+1];
//			kObject *value = UPCAST(K_TRUE);
//			if(tk1->tt == AST_PARENTHESIS) {
//				value = (kObject*)Stmt_newExpr2(_ctx, stmt, tk1->sub, 0, kArray_size(tk1->sub));
//				i++;
//			}
//			if(value != NULL) {
//				kObject_setObject(stmt, kw, value);
//			}
//		}
//	}
//	return i;
//}
//
//static void WARN_Ignored(CTX, kArray *tls, int s, int e)
//{
//	if(s < e) {
//		int i = s;
//		kwb_t wb;
//		kwb_init(&(_ctx->stack->cwb), &wb);
//		kwb_printf(&wb, "%s", kToken_s(tls->toks[i])); i++;
//		while(i < e) {
//			kwb_printf(&wb, " %s", kToken_s(tls->toks[i])); i++;
//		}
//		SUGAR_P(WARN_, tls->toks[s]->uline, tls->toks[s]->lpos, "ignored tokens: %s", kwb_top(&wb, 1));
//		kwb_free(&wb);
//	}
//}
//
//static int ParseStmt(CTX, ksyntax_t *syn, kStmt *stmt, ksymbol_t name, kArray *tls, int s, int e)
//{
//	INIT_GCSTACK();
//	BEGIN_LOCAL(lsfp, 8);
//	KSETv(lsfp[K_CALLDELTA+0].o, (kObject*)stmt);
//	lsfp[K_CALLDELTA+0].ndata = (uintptr_t)syn;
//	lsfp[K_CALLDELTA+1].ivalue = name;
//	KSETv(lsfp[K_CALLDELTA+2].a, tls);
//	lsfp[K_CALLDELTA+3].ivalue = s;
//	lsfp[K_CALLDELTA+4].ivalue = e;
//	KCALL(lsfp, 0, syn->ParseStmtNULL, 4, knull(CT_Int));
//	END_LOCAL();
//	RESET_GCSTACK();
//	return (int)lsfp[0].ivalue;
//}
//
//static int lookAheadKeyword(kArray *tls, int s, int e, kToken *rule)
//{
//	int i;
//	for(i = s; i < e; i++) {
//		kToken *tk = tls->toks[i];
//		if(rule->kw == tk->kw) return i;
//	}
//	return -1;
//}
//
//static int matchSyntaxRule(CTX, kStmt *stmt, kArray *rules, kline_t /*parent*/uline, kArray *tls, int s, int e, int optional)
//{
//	int ri, ti, rule_size = kArray_size(rules);
//	ti = s;
//	for(ri = 0; ri < rule_size && ti < e; ri++) {
//		kToken *rule = rules->toks[ri];
//		kToken *tk = tls->toks[ti];
//		uline = tk->uline;
//		//DBG_P("matching rule=%d,%s,%s token=%d,%s,%s", ri, T_tt(rule->tt), T_kw(rule->kw), ti-s, T_tt(tk->tt), kToken_s(tk));
//		if(rule->tt == TK_CODE) {
//			if(rule->kw != tk->kw) {
//				if(optional) return s;
//				kToken_p(tk, ERR_, "%s needs '%s'", T_statement(stmt->syn->kw), T_kw(rule->kw));
//				return -1;
//			}
//			ti++;
//			continue;
//		}
//		else if(rule->tt == TK_METANAME) {
//			ksyntax_t *syn = SYN_(kStmt_ks(stmt), rule->kw);
//			if(syn == NULL || syn->ParseStmtNULL == NULL) {
//				kToken_p(tk, ERR_, "unknown syntax pattern: %s", T_kw(rule->kw));
//				return -1;
//			}
//			int c = e;
//			if(ri + 1 < rule_size && rules->toks[ri+1]->tt == TK_CODE) {
//				c = lookAheadKeyword(tls, ti+1, e, rules->toks[ri+1]);
//				if(c == -1) {
//					if(optional) return s;
//					kToken_p(tk, ERR_, "%s needs '%s'", T_statement(stmt->syn->kw), T_kw(rule->kw));
//					return -1;
//				}
//				ri++;
//			}
//			int err_count = ctxsugar->err_count;
//			int next = ParseStmt(_ctx, syn, stmt, rule->nameid, tls, ti, c);
////			DBG_P("matched '%s' nameid='%s', next=%d=>%d", Pkeyword(rule->kw), Pkeyword(rule->nameid), ti, next);
//			if(next == -1) {
//				if(optional) return s;
//				if(err_count == ctxsugar->err_count) {
//					kToken_p(tk, ERR_, "%s needs syntax pattern %s, not %s ..", T_statement(stmt->syn->kw), T_kw(rule->kw), kToken_s(tk));
//				}
//				return -1;
//			}
//			////XXX Why???
//			//optional = 0;
//			ti = (c == e) ? next : c + 1;
//			continue;
//		}
//		else if(rule->tt == AST_OPTIONAL) {
//			int next = matchSyntaxRule(_ctx, stmt, rule->sub, uline, tls, ti, e, 1);
//			if(next == -1) return -1;
//			ti = next;
//			continue;
//		}
//		else if(rule->tt == AST_PARENTHESIS || rule->tt == AST_BRACE || rule->tt == AST_BRANCET) {
//			if(tk->tt == rule->tt && rule->topch == tk->topch) {
//				int next = matchSyntaxRule(_ctx, stmt, rule->sub, uline, tk->sub, 0, kArray_size(tk->sub), 0);
//				if(next == -1) return -1;
//				ti++;
//			}
//			else {
//				if(optional) return s;
//				kToken_p(tk, ERR_, "%s needs '%c'", T_statement(stmt->syn->kw), rule->topch);
//				return -1;
//			}
//		}
//	}
//	if(!optional) {
//		for(; ri < kArray_size(rules); ri++) {
//			kToken *rule = rules->toks[ri];
//			if(rule->tt != AST_OPTIONAL) {
//				SUGAR_P(ERR_, uline, -1, "%s needs syntax pattern: %s", T_statement(stmt->syn->kw), T_kw(rule->kw));
//				return -1;
//			}
//		}
//		WARN_Ignored(_ctx, tls, ti, e);
//	}
//	return ti;
//}
//
//static inline kToken* TokenArray_lookAhead(CTX, kArray *tls, int s, int e)
//{
//	return (s < e) ? tls->toks[s] : K_NULLTOKEN;
//}
//
//static ksyntax_t* KonohaSpace_getSyntaxRule(CTX, kKonohaSpace *ks, kArray *tls, int s, int e)
//{
//	kToken *tk = tls->toks[s];
//	if(TK_isType(tk)) {
//		tk = TokenArray_lookAhead(_ctx, tls, s+1, e);
//		if(tk->tt == TK_SYMBOL || tk->tt == TK_USYMBOL) {
//			tk = TokenArray_lookAhead(_ctx, tls, s+2, e);
//			if(tk->tt == AST_PARENTHESIS || tk->kw == KW_DOT) {
//				return SYN_(ks, KW_StmtMethodDecl); //
//			}
//			return SYN_(ks, KW_StmtTypeDecl);  //
//		}
//		return SYN_(ks, KW_Expr);  // expression
//	}
//	ksyntax_t *syn = SYN_(ks, tk->kw);
//	if(syn->syntaxRuleNULL == NULL) {
//		DBG_P("kw='%s', %d, %d", T_kw(syn->kw), syn->ParseExpr == kmodsugar->UndefinedParseExpr, kmodsugar->UndefinedExprTyCheck == syn->ExprTyCheck);
//		int i;
//		for(i = s + 1; i < e; i++) {
//			tk = tls->toks[i];
//			syn = SYN_(ks, tk->kw);
//			if(syn->syntaxRuleNULL != NULL && syn->priority > 0) {
//				SUGAR_P(DEBUG_, tk->uline, tk->lpos, "binary operator syntax kw='%s'", T_kw(syn->kw));   // sugar $expr "=" $expr;
//				return syn;
//			}
//		}
//		return SYN_(ks, KW_Expr);
//	}
//	return syn;
//}
//
//static kbool_t Stmt_parseSyntaxRule(CTX, kStmt *stmt, kArray *tls, int s, int e)
//{
//	kbool_t ret = false;
//	ksyntax_t *syn = KonohaSpace_getSyntaxRule(_ctx, kStmt_ks(stmt), tls, s, e);
//	DBG_ASSERT(syn != NULL);
//	if(syn->syntaxRuleNULL != NULL) {
//		((struct _kStmt*)stmt)->syn = syn;
//		ret = (matchSyntaxRule(_ctx, stmt, syn->syntaxRuleNULL, stmt->uline, tls, s, e, 0) != -1);
//	}
//	else {
//		SUGAR_P(ERR_, stmt->uline, 0, "undefined syntax rule for '%s'", T_kw(syn->kw));
//	}
//	return ret;
//}
//
//static void Block_addStmtLine(CTX, kBlock *bk, kArray *tls, int s, int e, kToken *tkERR)
//{
//	struct _kStmt *stmt = new_W(Stmt, tls->toks[s]->uline);
//	kArray_add(bk->blocks, stmt);
//	KINITv(stmt->parentNULL, bk);
//	if(tkERR != NULL) {
//		((struct _kStmt*)stmt)->syn = SYN_(kStmt_ks(stmt), KW_Err);
//		((struct _kStmt*)stmt)->build = TSTMT_ERR;
//		kObject_setObject(stmt, KW_Err, tkERR->text);  // @See Token_toERR()
//	}
//	else {
//		int estart = kerrno;
//		s = Stmt_addAnnotation(_ctx, stmt, tls, s, e);
//		if(!Stmt_parseSyntaxRule(_ctx, stmt, tls, s, e)) {
//			kStmt_toERR(stmt, estart);
//		}
//	}
//	DBG_ASSERT(stmt->syn != NULL);
//}
//
///* ------------------------------------------------------------------------ */
//
//static KMETHOD UndefinedParseExpr(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseExpr(stmt, syn, tls, s, c, e);
//	kToken *tk = tls->toks[c];
//	SUGAR_P(ERR_, tk->uline, tk->lpos, "undefined expression parser for '%s'", kToken_s(tk));
//	RETURN_(K_NULLEXPR); // unnecessary
//}
//
//static kExpr *ParseExpr(CTX, ksyntax_t *syn, kStmt *stmt, kArray *tls, int s, int c, int e)
//{
//	kMethod *mtd = (syn == NULL || syn->ParseExpr == NULL) ? kmodsugar->UndefinedParseExpr : syn->ParseExpr;
//	BEGIN_LOCAL(lsfp, 10);
//	KSETv(lsfp[K_CALLDELTA+0].o, (kObject*)stmt);
//	lsfp[K_CALLDELTA+0].ndata = (uintptr_t)syn;  // quick access
//	KSETv(lsfp[K_CALLDELTA+1].o, tls);
//	lsfp[K_CALLDELTA+2].ivalue = s;
//	lsfp[K_CALLDELTA+3].ivalue = c;
//	lsfp[K_CALLDELTA+4].ivalue = e;
//	KCALL(lsfp, 0, mtd, 4, K_NULLEXPR);
//	END_LOCAL();
//	DBG_ASSERT(IS_Expr(lsfp[0].o));
//	return lsfp[0].expr;
//}
//
///* ------------------------------------------------------------------------ */
//
//static kbool_t Stmt_isUnaryOp(CTX, kStmt *stmt, kToken *tk)
//{
//	ksyntax_t *syn = SYN_(kStmt_ks(stmt), tk->kw);
//	return (syn->op1 != MN_NONAME);
//}
//
//static int Stmt_skipUnaryOp(CTX, kStmt *stmt, kArray *tls, int s, int e)
//{
//	int i;
//	for(i = s; i < e; i++) {
//		kToken *tk = tls->toks[i];
//		if(!Stmt_isUnaryOp(_ctx, stmt, tk)) {
//			break;
//		}
//	}
//	return i;
//}
//
//static int Stmt_findBinaryOp(CTX, kStmt *stmt, kArray *tls, int s, int e, ksyntax_t **synRef)
//{
//	int idx = -1, i, prif = 0;
//	for(i = Stmt_skipUnaryOp(_ctx, stmt, tls, s, e) + 1; i < e; i++) {
//		kToken *tk = tls->toks[i];
//		ksyntax_t *syn = SYN_(kStmt_ks(stmt), tk->kw);
////		if(syn != NULL && syn->op2 != 0) {
//		if(syn->priority > 0) {
//			if(prif < syn->priority || (prif == syn->priority && !(FLAG_is(syn->flag, SYNFLAG_ExprLeftJoinOp2)) )) {
//				prif = syn->priority;
//				idx = i;
//				*synRef = syn;
//			}
//			if(!FLAG_is(syn->flag, SYNFLAG_ExprPostfixOp2)) {  /* check if real binary operator to parse f() + 1 */
//				i = Stmt_skipUnaryOp(_ctx, stmt, tls, i+1, e) - 1;
//			}
//		}
//	}
//	return idx;
//}
//
//static kExpr *Stmt_addExprParams(CTX, kStmt *stmt, kExpr *expr, kArray *tls, int s, int e, int allowEmpty)
//{
//	int i, start = s;
//	for(i = s; i < e; i++) {
//		kToken *tk = tls->toks[i];
//		if(tk->kw == KW_COMMA) {
//			expr = Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
//			start = i + 1;
//		}
//	}
//	if(allowEmpty == 0 || start < i) {
//		expr = Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
//	}
//	kArray_clear(tls, s);
//	return expr;
//}
//
//static kExpr* Stmt_newExpr2(CTX, kStmt *stmt, kArray *tls, int s, int e)
//{
//	if(s < e) {
//		ksyntax_t *syn = NULL;
//		int idx = Stmt_findBinaryOp(_ctx, stmt, tls, s, e, &syn);
//		if(idx != -1) {
//			DBG_P("** Found BinaryOp: s=%d, idx=%d, e=%d, '%s'**", s, idx, e, kToken_s(tls->toks[idx]));
//			return ParseExpr(_ctx, syn, stmt, tls, s, idx, e);
//		}
//		int c = s;
//		syn = SYN_(kStmt_ks(stmt), (tls->toks[c])->kw);
//		return ParseExpr(_ctx, syn, stmt, tls, c, c, e);
//	}
//	else {
//		if (0 < s - 1) {
//			SUGAR_P(ERR_, stmt->uline, -1, "expected expression after %s", kToken_s(tls->toks[s-1]));
//		}
//		else if(e < kArray_size(tls)) {
//			SUGAR_P(ERR_, stmt->uline, -1, "expected expression before %s", kToken_s(tls->toks[e]));
//		}
//		else {
//			SUGAR_P(ERR_, stmt->uline, 0, "expected expression");
//		}
//		return K_NULLEXPR;
//	}
//}
//
//
//#define kExpr_rightJoin(EXPR, STMT, TLS, S, C, E)    Expr_rightJoin(_ctx, EXPR, STMT, TLS, S, C, E)
//
//static kExpr *Expr_rightJoin(CTX, kExpr *expr, kStmt *stmt, kArray *tls, int s, int c, int e)
//{
//	if(c < e && expr != K_NULLEXPR) {
//		WARN_Ignored(_ctx, tls, c, e);
//	}
//	return expr;
//}
//
//static KMETHOD ParseExpr_Term(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseExpr(stmt, syn, tls, s, c, e);
//	assert(s == c);
//	kToken *tk = tls->toks[c];
//	struct _kExpr *expr = new_W(Expr, SYN_(kStmt_ks(stmt), tk->kw));
//	PUSH_GCSTACK(expr);
//	Expr_setTerm(expr, 1);
//	KSETv(expr->tk, tk);
//	RETURN_(kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e));
//}
//
//static KMETHOD ParseExpr_Op(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseExpr(stmt, syn, tls, s, c, e);
//	kToken *tk = tls->toks[c];
//	kExpr *expr, *rexpr = Stmt_newExpr2(_ctx, stmt, tls, c+1, e);
//	kmethodn_t mn = (s == c) ? syn->op1 : syn->op2;
//	if(mn != MN_NONAME && syn->ExprTyCheck == kmodsugar->UndefinedExprTyCheck) {
//		kToken_setmn(tk, mn, (s == c) ? MNTYPE_unary: MNTYPE_binary);
//		syn = SYN_(kStmt_ks(stmt), KW_ExprMethodCall);  // switch type checker
//	}
//	if(s == c) { // unary operator
//		expr = new_ConsExpr(_ctx, syn, 2, tk, rexpr);
//	}
//	else {   // binary operator
//		kExpr *lexpr = Stmt_newExpr2(_ctx, stmt, tls, s, c);
//		expr = new_ConsExpr(_ctx, syn, 3, tk, lexpr, rexpr);
//	}
//	RETURN_(expr);
//}
//
//static inline kbool_t isFieldName(kArray *tls, int c, int e)
//{
//	if(c+1 < e) {
//		kToken *tk = tls->toks[c+1];
//		return (tk->tt == TK_SYMBOL || tk->tt == TK_USYMBOL || tk->tt == TK_MSYMBOL);
//	}
//	return false;
//}
//static KMETHOD ParseExpr_DOT(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseExpr(stmt, syn, tls, s, c, e);
//	DBG_P("s=%d, c=%d", s, c);
//	DBG_ASSERT(s < c);
//	if(isFieldName(tls, c, e)) {
//		kExpr *expr = Stmt_newExpr2(_ctx, stmt, tls, s, c);
//		expr = new_ConsExpr(_ctx, syn, 2, tls->toks[c+1], expr);
//		RETURN_(kExpr_rightJoin(expr, stmt, tls, c+2, c+2, e));
//	}
//	if(c + 1 < e) c++;
//	RETURN_(kToken_p(tls->toks[c], ERR_, "expected field name: not %s", kToken_s(tls->toks[c])));
//}
//
//static KMETHOD ParseExpr_Parenthesis(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseExpr(stmt, syn, tls, s, c, e);
//	kToken *tk = tls->toks[c];
//	if(s == c) {
//		kExpr *expr = Stmt_newExpr2(_ctx, stmt, tk->sub, 0, kArray_size(tk->sub));
//		RETURN_(kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e));
//	}
//	else {
//		kExpr *lexpr = Stmt_newExpr2(_ctx, stmt, tls, s, c);
//		if(lexpr == K_NULLEXPR) {
//			RETURN_(lexpr);
//		}
//		if(lexpr->syn->kw == KW_DOT) {
//			((struct _kExpr*)lexpr)->syn = SYN_(kStmt_ks(stmt), KW_ExprMethodCall); // CALL
//		}
//		else if(lexpr->syn->kw != KW_ExprMethodCall) {
//			DBG_P("function calls  .. ");
//			syn = SYN_(kStmt_ks(stmt), KW_Parenthesis);    // (f null ())
//			lexpr  = new_ConsExpr(_ctx, syn, 2, lexpr, K_NULL);
//		}
//		lexpr = Stmt_addExprParams(_ctx, stmt, lexpr, tk->sub, 0, kArray_size(tk->sub), 1/*allowEmpty*/);
//		RETURN_(kExpr_rightJoin(lexpr, stmt, tls, s+1, c+1, e));
//	}
//}
//
//static KMETHOD ParseExpr_COMMA(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseExpr(stmt, syn, tls, s, c, e);
//	kExpr *expr = new_ConsExpr(_ctx, syn, 1, tls->toks[c]);
//	expr = Stmt_addExprParams(_ctx, stmt, expr, tls, s, e, 0/*allowEmpty*/);
//	RETURN_(expr);
//}
//
//static KMETHOD ParseExpr_DOLLAR(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseExpr(stmt, syn, tls, s, c, e);
//	if(s == c && c + 1 < e) {
//		kToken *tk = tls->toks[c+1];
//		if(tk->tt == TK_CODE) {
//			Token_toBRACE(_ctx, (struct _kToken*)tk, kStmt_ks(stmt));
//		}
//		if(tk->tt == AST_BRACE) {
//			struct _kExpr *expr = new_W(Expr, SYN_(kStmt_ks(stmt), KW_Block));
//			PUSH_GCSTACK(expr);
//			Expr_setTerm(expr, 1);
//			KSETv(expr->tk, tk);
//			KSETv(expr->block, new_Block(_ctx, kStmt_ks(stmt), stmt, tk->sub, 0, kArray_size(tk->sub), ';'));
//			RETURN_(expr);
//		}
//	}
//	RETURN_(kToken_p(tls->toks[c], ERR_, "unknown %s parser", kToken_s(tls->toks[c])));
//}
//
////static KMETHOD ParseExpr_Type(CTX, ksfp_t *sfp _RIX)
////{
////	VAR_ParseExpr(stmt, syn, tls, s, c, e);
////	if(c + 1 < e) {   // typing T v
////		kToken *tkT = tls->toks[c];
////		struct _kToken *tk = new_W(Token, TK_OPERATOR);
////		tk->kw  = KW_StmtTypeDecl;
////		syn = SYN_(kStmt_ks(stmt), KW_StmtTypeDecl);
////		RETURN_(new_ConsExpr(_ctx, syn, 3, tk, Stmt_newExpr2(_ctx, stmt, tls, c+1, e), tkT));
////	}
////	else {
////		ParseExpr_Term(_ctx, sfp, K_RIX);
////	}
////}
//
///* ------------------------------------------------------------------------ */
//
//static KMETHOD ParseStmt_Expr(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseStmt(stmt, syn, name, tls, s, e);
//	INIT_GCSTACK();
//	int r = -1;
//	dumpTokenArray(_ctx, 0, tls, s, e);
//	kExpr *expr = Stmt_newExpr2(_ctx, stmt, tls, s, e);
//	if(expr != K_NULLEXPR) {
//		dumpExpr(_ctx, 0, 0, expr);
//		kObject_setObject(stmt, name, expr);
//		r = e;
//	}
//	RESET_GCSTACK();
//	RETURNi_(r);
//}
//
//static KMETHOD ParseStmt_Type(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseStmt(stmt, syn, name, tls, s, e);
//	int r = -1;
//	kToken *tk = tls->toks[s];
//	if(TK_isType(tk)) {
//		kObject_setObject(stmt, name, tk);
//		r = s + 1;
//	}
//	RETURNi_(r);
//}
//
//static KMETHOD ParseStmt_Usymbol(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseStmt(stmt, syn, name, tls, s, e);
//	int r = -1;
//	kToken *tk = tls->toks[s];
//	if(tk->tt == TK_USYMBOL) {
//		kObject_setObject(stmt, name, tk);
//		r = s + 1;
//	}
//	RETURNi_(r);
//}
//
//static KMETHOD ParseStmt_Symbol(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseStmt(stmt, syn, name, tls, s, e);
//	int r = -1;
//	kToken *tk = tls->toks[s];
//	if(tk->tt == TK_SYMBOL) {
//		kObject_setObject(stmt, name, tk);
//		r = s + 1;
//	}
//	RETURNi_(r);
//}
//
//static KMETHOD ParseStmt_Params(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseStmt(stmt, syn, name, tls, s, e);
//	int r = -1;
//	kToken *tk = tls->toks[s];
//	if(tk->tt == AST_PARENTHESIS) {
//		kArray *tls = tk->sub;
//		int ss = 0, ee = kArray_size(tls);
//		if(0 < ee && tls->toks[0]->kw == KW_void) ss = 1;  //  f(void) = > f()
//		kBlock *bk = new_Block(_ctx, kStmt_ks(stmt), stmt, tls, ss, ee, ',');
//		kObject_setObject(stmt, name, bk);
//		r = s + 1;
//	}
//	RETURNi_(r);
//}
//
//static KMETHOD ParseStmt_Block(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseStmt(stmt, syn, name, tls, s, e);
//	kToken *tk = tls->toks[s];
//	if(tk->tt == TK_CODE) {
//		kObject_setObject(stmt, name, tk);
//		RETURNi_(s+1);
//	}
//	else if(tk->tt == AST_BRACE) {
//		kBlock *bk = new_Block(_ctx, kStmt_ks(stmt), stmt, tk->sub, 0, kArray_size(tk->sub), ';');
//		kObject_setObject(stmt, name, bk);
//		RETURNi_(s+1);
//	}
//	else {
//		kBlock *bk = new_Block(_ctx, kStmt_ks(stmt), stmt, tls, s, e, ';');
//		kObject_setObject(stmt, name, bk);
//		RETURNi_(e);
//	}
//	RETURNi_(-1); // ERROR
//}
//
//static KMETHOD ParseStmt_Toks(CTX, ksfp_t *sfp _RIX)
//{
//	VAR_ParseStmt(stmt, syn, name, tls, s, e);
//	if(s < e) {
//		kArray *a = new_(TokenArray, (intptr_t)(e - s));
//		while(s < e) {
//			kArray_add(a, tls->toks[s]);
//			s++;
//		}
//		kObject_setObject(stmt, name, a);
//		RETURNi_(e);
//	}
//	RETURNi_(-1);
//}
//
///* ------------------------------------------------------------------------ */
//
//#ifdef __cplusplus
//}
//#endif
