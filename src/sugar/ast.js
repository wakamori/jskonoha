<<<<<<< HEAD
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


/* ------------------------------------------------------------------------ */
// Block

//static int selectStmtLine(_ctx, kKonohaSpace *ks, int *indent, kArray *tls, int s, int e, int delim, kArray *tlsdst, kToken **tkERRRef);
//static void Block_addStmtLine(_ctx, kBlock *bk, kArray *tls, int s, int e, kToken *tkERR);
//static int makeTree(_ctx, kKonohaSpace *ks, ktoken_t tt, kArray *tls, int s, int e, int closech, kArray *tlsdst, kToken **tkERRRef);


konoha.new_Block = function(_ctx, ks, parent, tls, s, e, delim) {
	var bk = new kBlock;
	//#define new_W(C, A)    (struct _k##C*)(KPI)->Knew_Object(_ctx, CT_##C, (void *)(A))      //		//#define KPI  (_ctx->lib2)
	//#define kArray_add(A, V)   (KPI)->KArray_add(_ctx, A, UPCAST(V))	//#define UPCAST(o)   ((kObject *)o)
	if(parent != NULL) {
		KINITv(bk.parentNULL, parent);
		//#define KINITv(VAR, VAL)    OBJECT_SET(VAR, VAL)
		//#if defined(_MSC_VER)
		//#define OBJECT_SET(var, val) do {
		//kObject **var_ = (kObject **)&val;
		//var_[0] = (val_);
		//} while (0)
		//#else
		//#define OBJECT_SET(var, val)  var = (typeof(var))(val)
		//#endif
	}
    var i = s, indent = 0, atop = Array.length(tls);
	//#define kArray_size(A)  (((A)->bytesize)/sizeof(void *))
    while(i < e) {
    	var tkERR = NULL;
    	//DBG_ASSERT(atop == kArray_size(tls));
		//#define DBG_ASSERT(a)   assert(a)
    	i =  konoha.selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tls, tkERR);
    	var asize = Array.length(tls);
    	if(asize > atop) {
    		konoha.Block_addStmtline(_ctx, bk, tls, atop, asize, tkERR);
    		Array.clear();
			//#define kArray_clear(A, S)   (KPI)->KArray_clear(_ctx, A, S)
			//src/old/array.c    l.118  ref
    		}
    	}
    return bk;
}

konoha.Token_resolved = function(_ctx, ks, tk) {
	var kw = konoha.keyword(_ctx, S_text(tk.text), S_size(tk.text), FN_NONAME);
	//#define S_text(s)   ((const char *) (O_ct(s)->unbo(_ctx, (kObject *)s)))
	//#define O_ct(o)     ((o)->h.ct)
	//#define S_size(s)   ((s)->bytesize)
	if(kw != FN_NONAME) {
		//#define FN_NONAME   ((ksymbol_t)-1)
		syn = konoha.KonohaSpace_syntax(_ctx, ks, kw, 0);
		//#define SYN_(KS, KW)   KonohaSpace_syntax(_ctx, KS, KW, 0)
	if(syn != NULL) {
			if(syn.ty != TY_unknown) {
				//#define TY_unknown   ((kcid_t)-2)
				tk.kw = KW_Type;
				//#define KW_Type   7
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
	if(tkP.tt == AST_BRANCET) {
		//typedef enum { ... , AST_BRANCET, ...}
		var i, psize = 0, size = Array.length(tkP.sub);
		var p[size];
		for(i = 0; i < size; i++) {
			var tkT = (tkP.sub.toks[i]);
			if(TK_isType(tkT)) {
				//#define TK_isType(TK)   ((TK)->kw == KW_Type)
				//#define KW_Type   7
				p[psize].ty = TK_type(tkT);
				//#define TK_type(TK)   (TK)->ty
				psize++;
				continue;
			}
			if(tkT.topch == ',') continue;
			return NULL; // new int[10];
		}
	var ct;
		if(psize > 0) {
			ct = CT_(TK_type(tk));
			if(ct.cparam == K_NULLPARAM) {
				//#define K_NULLPARAM  (_ctx->share->nullParam)
				konoha.sugar_p(_ctx, ERR_, tk.uline, tk.lpos, "not generic type: %s", T_ty(TK_type(tk)));
				//#define SUGAR_P(PE, UL, POS, FMT, ...)  sugar_p(_ctx, PE, UL, POS, FMT, ## __VA_ARGS__)
				//static size_t sugar_p(CTX, int pe, kline_t uline, int lpos, const char *fmt, ...)
				return tk;
			}
			ct = new konoha.CT_Generics(_ctx, ct, psize, p);
			//ct = kClassTable_Generics(ct, psize, p);
			//#define kClassTable_Generics(CT, R, PSIZE, P)  (KPI)->KCT_Generics(_ctx, CT, R, PSIZE, P)
		}
		else {
			ct = konoha.CT_p0(_ctx, CT_Array, TK_type(tk));
			//static inline kclass_t *CT_P0(CTX, kclass_t *ct, ktype_t ty)
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
	if(tk.tt < TK_OPERATOR) {
		tk.kw = tk.tt;
	}
	if(tk.tt == TK_SYMBOL) {
		konoha.Token_resolved(_ctx, ks, tk);
		//static kbool_t Token_resolved(CTX, kKonohaSpace *ks, struct _kToken *tk)
	}
	else if(tk.tt == TK_USYMBOL) {
		if(!Token_resolved(_ctx, ks, tk)) {
			var ct = new konoha.kKonohaSpace_getCT(ks, NULL/*FIXME*/, S_text(tk.text), S_size(tk.text), TY_unknown);
			//#define kKonohaSpace_getCT(NS, THIS, S, L, C)  (KPI)->KS_getCT(_ctx, NS, THIS, S, L, C)
			if(ct != NULL) {
				tk.kw = KW_Type;
				tk.ty = ct.cid;
			}
		}
	}
	else if(tk.tt == TK_OPERATOR) {
		if(!Token_resolved(_ctx, ks, tk)) {
			var errref = konoha.sugar_p(_ctx, ERR_, tk.uline, tk.lpos, "undefined token: %s", kToken_s(tk));
			konoha.Token_toERR(_ctx, tk, errref);
			tkERR[0] = tk;
			return e;
		}
	}
	else if(tk.tt == TK_CODE) {
		tk.kw = KW_Brace;
	}
	if(TK_isType(tk)) { 
		//#define TK_isType(TK)    ((TK)->kw == KW_Type)
		Array.push(_ctx);
		//#define kArray_add(A, V)    (KPI)->KArray_add(_ctx, A, UPCAST(V))
		while(next + 1 < e) {
			var tkB = tls.toks[next + 1];
			if(tkB.topch != '[') break;
			var abuf = ctxsugar.tokens;
			var atop = Array.length(abuf);
			//#define kArray_size(A)      (((A)->bytesize)/sizeof(void*))
			next = konoha.makeTree(_ctx, ks, AST_BRANCET, tls,  next+1, e, ']', abuf, tkERR);
			if(!(Array.length(abuf) > atop)) return next;
			tkB = abuf.toks[atop];
			tk = TokenType_resolveGenerics(_ctx, ks, tk, tkB);
			if(tk == NULL) {
				DBG_P("APPEND tkB.tt=%s", T_tt(tkB.tt));
				if(abuf != dst) {
					Array.push(dst);
					Array.clear(abuf);
					//#define kArray_clear(A, S)        (KPI)->KArray_clear(_ctx, A, S)
				}
				DBG_P("next=%d", next);
				return next;
			}
			Array.clear(abuf);
		}
	}
	else if(tk.kw > KW_Expr) {
		Array.push(dst);
	}
	return next;
}

konoha.Token_toBRACE = function(_ctx, tk, ks)
{
	if(tk.tt == TK_CODE) {
		//INIT_GCSTACK();
		var a = new kArray();
		//#define new_(C, A)                (k##C*)(KPI)->Knew_Object(_ctx, CT_##C, (void*)(A))
		//PUSH_GCSTACK(a);
		//define PUSH_GCSTACK(o)        kArray_add(_ctx->stack->gcstack, o)$
		KonohaSpace_tokenize(_ctx, ks, S_text(tk.text), tk.uline, a);
		tk.tt = AST_BRACE;
		tk.topch = '{';
		tk.closech = '}';
		konoha.KSETv(tk.sub, a);
		//RESET_GCSTACK();
		//define RESET_GCSTACK()        kArray_clear(_ctx->stack->gcstack, gcstack_)
		return 1;
	}
	return 0;
}

konoha.makeTree = function(_ctx, ks, tt, tls, s, e, closech, tlsdst, tkERRRef)
 
{
	var i, probablyCloseBefore = e - 1;
	var tk = tls.toks[s];
//	DBG_ASSERT(tk.kw == 0);
//	if(AST_PARENTHESIS <= tk.tt && tk.tt <= AST_BRACE) {
//		kArray_add(tlsdst, tk);
//		return s;
//	}
	var tkP = new kBlock(Token, 0);
	//define new_W(C, A)       (struct _k##C*)(KPI)->Knew_Object(_ctx, CT_##C, (void*)(A))
	Array.push(tlsdst);
	tkP.tt = tt;
	tkP.kw = tt;
	tkP.uline = tk.uline;
	tkP.topch = tk.topch;
	tkP.lpos = closech;
	konoha.KSETv(tkP.sub, new_(TokenArray, 0));
	for(i = s + 1; i < e; i++) {
		tk = tls.toks[i];
		//DBG_ASSERT(tk.kw == 0);
		if(tk.tt == TK_ERR) break;
		//DBG_ASSERT(tk.topch != '{');
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
		var errref = suger_p(ERR_, tk.uline, tk.lpos, "'%c' is expected (probably before %s)", closech, kToken_s(tls.toks[probablyCloseBefore]));
		//#define SUGAR_P(PE, UL, POS, FMT, ...)  sugar_p(_ctx, PE, UL, POS, FMT,  ## __VA_ARGS__)
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
	//DBG_ASSERT(e <= kArray_size(tls));
	for(; i < e - 1; i++) {
		var tk = tls.toks[i];
		var tk1 = tls.Wtoks[i+1];
		if(tk.kw > 0) break;
		if(tk.topch == '@' && (tk1.tt == TK_SYMBOL || tk1.tt == TK_USYMBOL)) {
			tk1.tt = TK_METANAME;  tk1.kw = 0;
			Array.push(tlsdst); i++;
			if(i + 1 < e && tls.toks[i+1].topch == '(') {
				i = konoha.makeTree(_ctx, ks, AST_PARENTHESIS, tls, i+1, e, ')', tlsdst, tkERRRef);
			}
			continue;
		}
		if(tk.tt == TK_METANAME) {
			Array.push(tlsdst);
			if(tk1.tt == AST_PARENTHESIS) {
				Array.push(tlsdst);
				i++;
			}
			continue;
		}
		if(tk.tt != TK_INDENT) break;
		if(indent == 0) indent = tk.lpos;
	}
	for(; i < e ; i++) {
		var tk = tls.toks[i];
		if(tk.topch == delim && tk.tt == TK_OPERATOR) {
			return i+1;
		}
		if(tk.kw > 0) {
			Array.push(tlsdst);
			continue;
		}
		else if(tk.topch == '(') {
			i = konoha.makeTree(_ctx, ks, AST_PARENTHESIS, tls,  i, e, ')', tlsdst, tkERRRef);
			continue;
		}
		else if(tk.topch == '[') {
			i = konoha.makeTree(_ctx, ks, AST_BRANCET, tls, i, e, ']', tlsdst, tkERRRef);
			continue;
		}
		else if(tk.tt == TK_ERR) {
			tkERRRef[0] = tk;
		}
		if(tk.tt == TK_INDENT) {
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
		if(tk.tt != TK_METANAME) break;
		if(i+1 < e) {
			var buf[64];
			snprintf(buf, sizeof(buf), "@%s", S_text(tk.text));
			var kw = konoha.keyword(_ctx, buf, S_size(tk.text)+1, FN_NEWID);
			var tk1 = tls.toks[i+1];
			var value = UPCAST(K_TRUE);
			//#define UPCAST(o)         ((kObject*)o)
			//#define K_TRUE            (_ctx->share->constTrue)
			if(tk1.tt == AST_PARENTHESIS) {
				value = konoha.Stmt_newExpr2(_ctx, stmt, tk1.sub, 0, kArray_size(tk1.sub));
				i++;
			}
			if(value != NULL) {
				kObject_setObject(stmt, kw, value);
				//#define kObject_setObject(O, K, V)   (KPI)->KObject_setObject(_ctx, UPCAST(O), K, O_cid(V), UPCAST(V))
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
		kwb_init(_ctx.stack.cwb, wb);
		//#define kwb_init(M,W)            (KPI)->Kwb_init(M,W)
		kwb_printf(wb, "%s", kToken_s(tls.toks[i])); i++;
		while(i < e) {
			kwb_printf(wb, " %s", kToken_s(tls.toks[i])); i++;
		}
		sugar_p(WARN_, tls.toks[s].uline, tls.toks[s].lpos, "ignored tokens: %s", kwb_top(wb, 1));
		kwb_free(wb);
		//#define kwb_free(W)              (KPI)->Kwb_free(W)
	}
}

konoha.ParseStmt = function(_ctx, syn, stmt, name, tls, s, e)
{
	//INIT_GCSTACK();
	BEGIN_LOCAL(lsfp, 8);
	//define BEGIN_LOCAL(V,N) \
	//ksfp_t *V = _ctx->esp, *esp_ = _ctx->esp; (void)V;((kcontext_t*)_ctx)->esp = esp_+N;\
	konoha.KSETv(lsfp[K_CALLDELTA+0].o, stmt);
	lsfp[K_CALLDELTA+0].ndata = syn;
	lsfp[K_CALLDELTA+1].ivalue = name;
	konoha.KSETv(lsfp[K_CALLDELTA+2].a, tls);
	lsfp[K_CALLDELTA+3].ivalue = s;
	lsfp[K_CALLDELTA+4].ivalue = e;
	KCALL(lsfp, 0, syn.ParseStmtNULL, 4, knull(CT_Int));
	END_LOCAL();
	//#define END_LOCAL() ((kcontext_t*)_ctx)->esp = esp_;
	//RESET_GCSTACK();
	return lsfp[0].ivalue;
}

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
	var ri, ti, rule_size = Array.length(rules);
	ti = s;
	for(ri = 0; ri < rule_size && ti < e; ri++) {
		var rule = rules.toks[ri];
		var tk = tls.toks[ti];
		uline = tk.uline;
		//DBG_P("matching rule=%d,%s,%s token=%d,%s,%s", ri, T_tt(rule.tt), T_kw(rule.kw), ti-s, T_tt(tk.tt), kToken_s(tk));
		if(rule.tt == TK_CODE) {
			if(rule.kw != tk.kw) {
				if(optional) return s;
				kToken_p(tk, ERR_, "%s needs '%s'", T_statement(stmt.syn.kw), T_kw(rule.kw));
				//#define T_statement(kw)  T_statement_(_ctx, kw)
				//static const char* T_statement_(CTX, ksymbol_t kw)
				return -1;
			}
			ti++;
			continue;
		}
		else if(rule.tt == TK_METANAME) {
			var syn = KonohaSpace_syntax(_ctx, kStmt_ks(stmt), rule.kw, 0);
			//#define SYN_(KS, KW)                KonohaSpace_syntax(_ctx, KS, KW, 0)
			//define kStmt_ks(STMT)   Stmt_ks(_ctx, STMT)
			//
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
					//#define kToken_p(TK, PE, FMT, ...)   Token_p(_ctx, TK, PE, FMT, ## __VA_ARGS__)
					return -1;
				}
				ri++;
			}
		    var err_count = ctxsugar.err_count;
			var next =  konoha.ParseStmt(_ctx, syn, stmt, rule.nameid, tls, ti, c);
			//DBG_P("matched '%s' nameid='%s', next=%d=>%d", Pkeyword(rule.kw), Pkeyword(rule.nameid), ti, next);
			if(next == -1) {
				if(optional) return s;
				if(err_count == ctxsugar.err_count) {
					kToken_p(tk, ERR_, "%s needs syntax pattern %s, not %s ..", T_statement(stmt.syn.kw), T_kw(rule.kw), kToken_s(tk));
				}
				return -1;
			}
			//optional = 0;
			ti = (c == e) ? next : c + 1;
			continue;
		}
		else if(rule.tt == AST_OPTIONAL) {
			var next = matchSyntaxRule(_ctx, stmt, rule.sub, uline, tls, ti, e, 1);
			if(next == -1) return -1;
			ti = next;
			continue;
		}
		else if(rule.tt == AST_PARENTHESIS || rule.tt == AST_BRACE || rule.tt == AST_BRANCET) {
			if(tk.tt == rule.tt && rule.topch == tk.topch) {
				var next =  konoha.matchSyntaxRule(_ctx, stmt, rule.sub, uline, tk.sub, 0, kArray_size(tk.sub), 0);
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
		for(; ri < kArray_size(rules); ri++) {
			var rule = rules.toks[ri];
			if(rule.tt != AST_OPTIONAL) {
				sugar_p(ERR_, uline, -1, "%s needs syntax pattern: %s", T_statement(stmt.syn.kw), T_kw(rule.kw));
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
		if(tk.tt == TK_SYMBOL || tk.tt == TK_USYMBOL) {
			tk = konoha.TokenArray_lookAhead(_ctx, tls, s+2, e);
			if(tk.tt == AST_PARENTHESIS || tk.kw == KW_DOT) {
				return konoha.KonohaSpace_syntax(_ctx, ks, KW_StmtMethodDecl, 0); 
			}
			return konoha.KonohaSpace_syntax(_ctx, ks, KW_StmtTypeDecl, 0);  
		}
		return konoha.KonohaSpace_syntax(_ctx, ks, KW_Expr, 0);
	}
	var syn = konoha.KonohaSpace_syntax(_ctx, ks, tk.kw, 0);
	if(syn.syntaxRuleNULL == NULL) {
		DBG_P("kw='%s', %d, %d", T_kw(syn.kw), syn.ParseExpr == kmodsugar.UndefinedParseExpr, kmodsugar.UndefinedExprTyCheck == syn.ExprTyCheck);
		int i;
		for(i = s + 1; i < e; i++) {
			tk = tls.toks[i];
			syn = konoha.KonohaSpace_syntax(_ctx, ks, tk.kw, 0);
			if(syn.syntaxRuleNULL != NULL && syn.priority > 0) {
				sugar_p(DEBUG_, tk.uline, tk.lpos, "binary operator syntax kw='%s'", T_kw(syn.kw));
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
	DBG_ASSERT(syn != NULL);
	if(syn.syntaxRuleNULL != NULL) {
		stmt.syn = syn;
		ret = (matchSyntaxRule(_ctx, stmt, syn.syntaxRuleNULL, stmt.uline, tls, s, e, 0) != -1);
	}
	else {
		sugar_p(ERR_, stmt.uline, 0, "undefined syntax rule for '%s'", T_kw(syn.kw));
	}
	return ret;
}

konoha.Block_addStmtLine = function(_ctx, bk, tls, s, e, tkERR)
{
	var stmt = new kBlock(Stmt, tls.toks[s].uline);
	//#define new_W(C, A)               (struct _k##C*)(KPI)->Knew_Object(_ctx, CT_##C, (void*)(A))
	Array.push(bk.blocks);
	KINITv(stmt.parentNULL, bk);
	if(tkERR != NULL) {
		stmt.syn = SYN_(kStmt_ks(stmt), KW_Err);
		stmt.build = TSTMT_ERR;
		kObject_setObject(stmt, KW_Err, tkERR.text);
		//#define kObject_setObject(O, K, V)             (KPI)->KObject_setObject(_ctx, UPCAST(O), K, O_cid(V), UPCAST(V))
	}
	else {
		var estart = kerrno;
		s = konoha.Stmt_addAnnotation(_ctx, stmt, tls, s, e);
		if(!Stmt_parseSyntaxRule(_ctx, stmt, tls, s, e)) {
			kStmt_toERR(stmt, estart);
		}
	}
	//DBG_ASSERT(stmt.syn != NULL);
}

/* ------------------------------------------------------------------------ */

konoha.UndefinedParseExpr = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	//#define VAR_ParseExpr(STMT, SYN, TLS, S, C, E) \
	//>--->---kStmt *STMT = (kStmt*)sfp[0].o;\
	//>--->---ksyntax_t *SYN = (ksyntax_t*)sfp[0].ndata;\
	//>--->---kArray *TLS = (kArray*)sfp[1].o;\
	//>--->---int S = (int)sfp[2].ivalue;\
	//>--->---int C = (int)sfp[3].ivalue;\
	//>--->---int E = (int)sfp[4].ivalue;\
	//>--->---(void)STMT; (void)SYN; (void)TLS; (void)S; (void)C; (void)E;\
	tk = tls.toks[c];
	sugar_p(ERR_, tk.uline, tk.lpos, "undefined expression parser for '%s'", kToken_s(tk));
	RETURN_(K_NULLEXPR);  //unnecessary


konoha.ParseExpr = function(_ctx, syn, stmt, tls, s, c, e)
{
	var mtd = (syn == NULL || syn.ParseExpr == NULL) ? kmodsugar.UndefinedParseExpr : syn.ParseExpr;
	BEGIN_LOCAL(lsfp, 10);
	KSETv(lsfp[K_CALLDELTA+0].o, stmt;
	lsfp[K_CALLDELTA+0].ndata = syn;
	KSETv(lsfp[K_CALLDELTA+1].o, tls);
	lsfp[K_CALLDELTA+2].ivalue = s;
	lsfp[K_CALLDELTA+3].ivalue = c;
	lsfp[K_CALLDELTA+4].ivalue = e;
	KCALL(lsfp, 0, mtd, 4, K_NULLEXPR);
	END_LOCAL();
	DBG_ASSERT(IS_Expr(lsfp[0].o));
	return lsfp[0].expr;
}

/* ------------------------------------------------------------------------ */

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
		var syn = SYN_(kStmt_ks(stmt), tk.kw);
		//if(syn != NULL && syn.op2 != 0) {
		if(syn.priority > 0) {
			if(prif < syn.priority || (prif == syn.priority && !(FLAG_is(syn.flag, SYNFLAG_ExprLeftJoinOp2)) )) {
				prif = syn.priority;
				idx = i;
				synRef = syn;
			}
			if(!FLAG_is(syn.flag, SYNFLAG_ExprPostfixOp2)) {  /* check if real binary operator to parse f() + 1 */
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
	Array.clear(tls);
	return expr;
}

konoha.Stmt_newExpr2 = function(_ctx, stmt, tls, s,  e)
{
	if(s < e) {
		var syn = NULL;
		var idx = konoha.Stmt_findBinaryOp(_ctx, stmt, tls, s, e, syn);
		if(idx != -1) {
			DBG_P("** Found BinaryOp: s=%d, idx=%d, e=%d, '%s'**", s, idx, e, kToken_s(tls.toks[idx]));
			return konoha.ParseExpr(_ctx, syn, stmt, tls, s, idx, e);
		}
		var c = s;
		syn = konoha.KonohaSpace_syntax(_ctx, kStmt_ks(stmt), (tls.toks[c]).kw, 0);
		return konoha.ParseExpr(_ctx, syn, stmt, tls, c, c, e);
	}
	else {
		if (0 < s - 1) {
			sugar_p(ERR_, stmt.uline, -1, "expected expression after %s", kToken_s(tls.toks[s-1]));
		}
		else if(e < kArray_size(tls)) {
			sugar_p(ERR_, stmt.uline, -1, "expected expression before %s", kToken_s(tls.toks[e]));
		}
		else {
			sugar_p(ERR_, stmt.uline, 0, "expected expression");
		}
		return K_NULLEXPR;
		//#define K_NULLEXPR   (kExpr*)((CT_Expr)->nulvalNUL)
	}
}


//#define kExpr_rightJoin(EXPR, STMT, TLS, S, C, E)    Expr_rightJoin(_ctx, EXPR, STMT, TLS, S, C, E)

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
	assert(s == c);
	var tk = tls.toks[c];
	var expr = new kBlock(Expr, SYN_(kStmt_ks(stmt), tk.kw));
	//PUSH_GCSTACK(expr);
	Expr_setTerm(expr, 1);
	KSETv(expr.tk, tk);
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
		syn = SYN_(kStmt_ks(stmt), KW_ExprMethodCall);
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
		return (tk.tt == TK_SYMBOL || tk.tt == TK_USYMBOL || tk.tt == TK_MSYMBOL);
	}
	return false;
}
konoha.ParseExpr_DOT = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	DBG_P("s=%d, c=%d", s, c);
	//DBG_ASSERT(s < c);
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
		var expr = Stmt_newExpr2(_ctx, stmt, tk.sub, 0, kArray_size(tk.sub));
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
		lexpr = konoha.Stmt_addExprParams(_ctx, stmt, lexpr, tk.sub, 0, kArray_size(tk.sub), 1/*allowEmpty*/);
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
		if(tk.tt == AST_BRACE) {
			var expr = new kBlock();
			//PUSH_GCSTACK(expr);
			Expr_setTerm(expr, 1);
			KSETv(expr.tk, tk);
			KSETv(expr.block, new_Block(_ctx, kStmt_ks(stmt), stmt, tk.sub, 0, kArray_size(tk.sub), ';'));
			RETURN_(expr);
		}
	}
	RETURN_(kToken_p(tls.toks[c], ERR_, "unknown %s parser", kToken_s(tls.toks[c])));
}

//konoha.ParseExpr_Type = function(_ctx, sfp ,_rix)
//{
//	VAR_ParseExpr(stmt, syn, tls, s, c, e);
//	if(c + 1 < e) {
//		var tkT = tls.toks[c];
//		var tk = new_W(Token, TK_OPERATOR);
//		tk.kw  = KW_StmtTypeDecl;
//		syn = SYN_(kStmt_ks(stmt), KW_StmtTypeDecl);
//		RETURN_(new_ConsExpr(_ctx, syn, 3, tk, Stmt_newExpr2(_ctx, stmt, tls, c+1, e), tkT));
//	}
//	else {
//		ParseExpr_Term(_ctx, sfp, K_rix);
//	}
//}
//
/* ------------------------------------------------------------------------ */

konoha.ParseStmt_Expr = function(_ctx, sfp ,_rix)
{
	VAR_ParseStmt(stmt, syn, name, tls, s, e);
	//INIT_GCSTACK();
	var r = -1;
	konoha.dumpTokenArray(_ctx, 0, tls, s, e);
	var expr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, e);
	if(expr != K_NULLEXPR) {
		konoha.dumpExpr(_ctx, 0, 0, expr);
		konoha.kObject_setObject(stmt, name, expr);
		//#define kObject_setObject(O, K, V)             (KPI)->KObject_setObject(_ctx, UPCAST(O), K, O_cid(V), UPCAST(V))
		r = e;
	}
	//RESET_GCSTACK();
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
	if(tk.tt == TK_USYMBOL) {
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
	if(tk.tt == TK_SYMBOL) {
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
	if(tk.tt == AST_PARENTHESIS) {
		var tls = tk.sub;
		var ss = 0, ee = kArray_size(tls);
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
	else if(tk.tt == AST_BRACE) {
		var bk = konoha.new_Block(_ctx, kStmt_ks(stmt), stmt, tk.sub, 0, kArray_size(tk.sub), ';');
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
		//#define new_(C, A)                (k##C*)(KPI)->Knew_Object(_ctx, CT_##C, (void*)(A))$
		while(s < e) {
			a.data.push(tls.toks[s]);
			s++;
		}
		konoha.kObject_setObject(stmt, name, a);
		RETURNi_(e);
	}
	RETURNi_(-1);
}

/* ------------------------------------------------------------------------ */

#ifdef __cplusplus
}
#endif

