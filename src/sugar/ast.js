///****************************************************************************
// * copyright (c) 2012, the Konoha project authors. All rights reserved.
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

konoha.new_Block = function(_ctx, ks, prt, tls, s, e, delim) {
	var bk = new konoha.kBlock(_ctx, ks);
	if(prt != null) {
		bk.parentNULL = prt;
	}
	var i = s, indent = 0, atop = tls.length;
	while(i < e) {
		var tkERR = null;
		i =  konoha.selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tls, tkERR);
		var asize = tls.length;
		if(asize > atop) {
			konoha.Block_addStmtLine(_ctx, bk, tls, atop, asize, tkERR);
			tls.length = 0;
		}
	}
	console.log(bk.blocks.data[0].h.kvproto.data[0].cons.data[0]);
	console.log(bk.blocks.data[0].h.kvproto.data[0].cons.data[1].tk);
	console.log(bk.blocks.data[0].h.kvproto.data[0].cons.data[2].tk);
	return bk;
}

konoha.Token_resolved = function(_ctx, ks, tk) {//
	var kw =  tk.text.text;
	syn = konoha.KonohaSpace_syntax(_ctx, ks, kw, 0);
	if(syn != null) {
		if(syn.ty != konoha.TY_unknown) {
			tk.kw = konoha.kw.Type;
			tk.ty = syn.ty;
		}
		else {
			tk.kw = kw;
		}
		return 1;
	}
	return 0;
}

konoha.TokenType_resolveGenerics = function(_ctx, ks, tk, tkP) {
	if(tkP.tt == konoha.ktoken_t.AST_BRANCET) {
		var i = 0, psize = 0, size = tkP.sub.data.length;
		var p = new konoha.Array(size);
		for(i = 0; i < size; i++) {
			var tkT = (tkP.sub.toks[i]);
			if((tkT).kw == konoha.kw.Type) {
				p[psize].ty = tkT.ty;
				psize++;
				continue;
			}
			if(tkT.topch == ',') continue;
			return null;
		}
		var ct;
		if(psize > 0) {
			ct = _ctx.share.ca.cts[tk.ty];
			if(ct.cparam == konoha.K_NULLPARAM) {
				konoha.sugar_p(_ctx, konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "not generic type: " + konoha.S_ty(tk.ty));
				return tk;
			}
			ct = new konoha.CT_Generics(_ctx, ct, psize, p);
		}
		else {
			ct = konoha.CT_p0(_ctx, CT_Array, tk.ty);
		}
		tk.ty = ct.cid;
		return tk;
	}
	return null;
}

konoha.appendKeyword = function(_ctx, ks, tls, s, e, dst, tkERR) {
	var next = s;
	var tk = tls[s];
	if(tk.tt < konoha.ktoken_t.TK_OPERATOR) {
		tk.kw = konoha.kw.array[tk.tt];
	}
	if(tk.tt == konoha.ktoken_t.TK_SYMBOL) {
		konoha.Token_resolved(_ctx, ks, tk);
	}
	else if(tk.tt == konoha.ktoken_t.TK_USYMBOL) {
		if(!konoha.Token_resolved(_ctx, ks, tk)) {
			var ct = new konoha.kKonohaSpace_getCT(ks, null/*FIXME*/, tk.text, tk.text.length, konoha.TY_unknown);
			if(ct != null) {
				tk.kw = konoha.kw.type;
				tk.ty = ct.cid;
			}
		}
	}
	else if(tk.tt == konoha.ktoken_t.TK_OPERATOR) {
		if(!konoha.Token_resolved(_ctx, ks, tk)) {
			var errref = -1;
			konoha.sugar_p(_ctx, konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "undefined token: " + konoha.kToken_s_(tk));
			konoha.Token_toERR(_ctx, tk, errref);
			tkERR = tk;
			return e;
		}
	}
	else if(tk.tt == konoha.ktoken_t.TK_CODE) {
		tk.kw = konoha.kw.Brace;
	}
	if((tk).kw == konoha.kw.Type) { 
		dst.push(tk);
		while(next + 1 < e) {
			var tkB = tls[next + 1];
			if(tkB.topch != '[') break;
			var abuf = new konoha.kArray();
			var atop = abuf.data.length;
			next = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_BRANCET, tls,  next+1, e, ']', abuf, tkERR);
			if(!((abuf.data.length) > atop)) return next;

			tkB = abuf.data[atop];
			tk = TokenType_resolveGenerics(_ctx, ks, tk, tkB);
			if(tk == null) {
				if(abuf != dst) {
					dst.push(tk);
					abuf.data.length = 0;
				}
				return next;
			}
			abuf.length = 0;
		}
	}
	else if(tk.kw != konoha.kw.Err) {
		dst.push(tk);
	}
	return next;
}

konoha.Token_toBRACE = function(_ctx, tk, ks) {
	if(tk.tt == konoha.ktoken_t.TK_CODE) {
		var a = new konoha.kArray();
		KonohaSpace_tokenize(_ctx, ks, tk.text, tk.uline, a);
		tk.tt = konoha.ktoken_t.AST_BRACE;
		tk.topch = '{';
		tk.closech = '}';
		tk.sub =  a;
		return 1;
	}
	return 0;
}

konoha.makeTree = function(_ctx, ks, tt, tls, s, e, closech, tlsdst, tkERRRef) {
	var i, probablyCloseBefore = e - 1;
	var tk = tls[s];
	var tkP = new konoha.kBlock();
	tlsdst.push(tkP);
	tkP.tt = tt;
	tkP.kw = konoha.kw.array[tt];
	tkP.uline = tk.uline;
	tkP.topch = tk.topch;
	tkP.lpos = closech;
	tkP.sub = new konoha.kArray();
	for(i = s + 1; i < e; i++) {
		tk = tls[i];
		if(tk.tt == konoha.ktoken_t.TK_ERR) break;
		if(tk.topch == '(') {
			i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_PARENTHESIS, tls, i, e, ')', tkP.sub, tkERRRef);
			continue;
		}
		if(tk.topch == '[') {
			i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_BRANCET, tls, i, e, ']', tkP.sub, tkERRRef);
			continue;
		}
		if(tk.topch == closech) {
			return i;
		}
		if((closech == ')' || closech == ']') && tk.tt == konoha.ktoken_t.TK_CODE) probablyCloseBefore = i;
		if(tk.tt == konoha.ktoken_t.TK_INDENT && closech != '}') continue;
		i = konoha.appendKeyword(_ctx, ks, tls, i, e, tkP.sub, tkERRRef);
	}
	if(tk.tt != konoha.ktoken_t.TK_ERR) {
		var errref = konoha.suger_p(konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, closech + " is expected (probably before " + konoha.kToken_s(tls[probablyCloseBefore]) + ")");
		konoha.Token_toERR(_ctx, tkP, errref);
	}
	else {
		tkP.tt = konoha.ktoken_t.TK_ERR;
		tkP.text = tk.text;
	}
	tkERRRef[0] = tkP;
	return e;
}

konoha.selectStmtLine = function(_ctx, ks, indent, tls /* Native array */, s, e, delim, tlsdst /* Native array */, tkERRRef) {
	var i = s;
	for(; i < e - 1; i++) {
		var tk = tls[i];
		var tk1 = tls[i+1];
		if(tk.kw > 0) break;
		if( tk.topch == '@' && (tk1.tt == konoha.ktoken_t.TK_SYMBOL || tk1.tt == konoha.ktoken_t.TK_USYMBOL)) {
			tk1.tt = konoha.ktoken_t.TK_METANAME;  tk1.kw = 0;
			tlsdst.push(tk1); i++;
			if(i + 1 < e && tls[i+1].topch == '(') {
				i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_PARENTHESIS, tls, i+1, e, ')', tlsdst, tkERRRef);
			}
			continue;
		}
		if(tk.tt == konoha.ktoken_t.TK_METANAME) {
			tlsdst.push(tk1);
			if(tk1.tt == konoha.ktoken_t.AST_PARENTHESIS) {
				tlsdst.push(tk1);
				i++;
			}
			continue;
		}
		if(tk.tt != konoha.ktoken_t.TK_INDENT) break;
		if(indent == 0) indent = tk.lpos;
	}
	for(; i < e ; i++) {
		var tk = tls[i];
		if(tk.topch == delim && tk.tt == konoha.ktoken_t.TK_OPERATOR) {
			return i+1;
		}
		if(tk.kw > 0) {
			tlsdst.push(tk1);
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


konoha.Stmt_addAnnotation = function(_ctx, stmt, tls, s, e) {
	var i;
	for(i = s; i < e; i++) {
		var tk = tls[i];
		if(tk.tt != konoha.ktoken_t.TK_METANAME) break;
		if(i+1 < e) {
			var buf = "@".concat(tk.text);
			var kw = konoha.keyword(_ctx, buf, tk.text.text.length+1, konoha.FN_NEWID);
			var tk1 = tls[i+1];
			var value = _ctx.share.constTrue;
			if(tk1.tt == konoha.ktoken_t.AST_PARENTHESIS) {
				value = konoha.Stmt_newExpr2(_ctx, stmt, tk1.sub, 0, tk1.sub.data.length);
				i++;
			}
			if(value != null) {
				konoha.kObject_setObject(stmt, kw, value);
			}
		}
	}
	return i;
}

konoha.WARN_Ignored = function(_ctx, tls, s, e) {
	if(s < e) {
//TODO unimplemeted
//		var i = s;
//		var wb;
// 		kwb_printf(wb, "%s", konoha.kToken_s(tls[i])); i++;
// 		while(i < e) {
// 			kwb_printf(wb, " %s", konoha.kToken_s(tls[i])); i++;
// 		}
// 		konoha.sugar_p(WARN_, tls[s].uline, tls[s].lpos, "ignored tokens: %s", kwb_top(wb, 1));
	}
}

// konoha.ParseStmt = function(_ctx, syn, stmt, name, tls, s, e) {
// 	var lsfp = _ctx.esp;
// 	var esp_ = _ctx.esp;
// 	_ctx.esp = esp_+8;
// 	// lsfp[K_CALLDELTA+0].o = stmt;
// 	// lsfp[K_CALLDELTA+0].ndata = syn;
// 	// lsfp[K_CALLDELTA+1].ivalue = name;
// 	// lsfp[K_CALLDELTA+2].a = tls;
// 	// lsfp[K_CALLDELTA+3].ivalue = s;
// 	// lsfp[K_CALLDELTA+4].ivalue = e;
// 	var tsfp = lsfp + 0 + K_CALLDELTA;
// 	// tsfp[K_MTDIDX].mtdNC = syn.ParseStmtNULL;
// 	// tsfp[K_SHIFTIDX].shift = 0;
// 	// tsfp[K_RTNIDX].o = knull(CT_int);
// 	_ctx.esp = (tsfp + 4 + 1);
// 	syn.ParseStmtNULL.fastcall_1(_ctx, tsfp, K_RTNIDX);
// //	tsfp[K_MTDIDX].mtdNC = null;
// 	_ctx.esp = exp_;
// //	return lsfp[0].ivalue;
// }

konoha.lookAheadKeyword = function(tls, s, e, rule) {
	var i;
	for(i = s; i < e; i++) {
		var tk = tls[i];
		if(rule.kw == tk.kw) return i;
	}
	return -1;
}

konoha.matchSyntaxRule = function(_ctx, stmt, rules, uline, tls, s, e, optional) {
	var ri, ti, rule_size = rules.length;
	ti = s;
	for(ri = 0; ri < rule_size && ti < e; ri++) {
		var rule = rules[ri];
		var tk = tls[ti];
		uline = tk.uline;
		if(rule.tt == konoha.ktoken_t.TK_CODE) {
			if(rule.kw != tk.kw) {
				if(optional) return s;
				konoha.Token_p(_ctx, tk, konoha.kreportlevel_t.ERR_, konoha.T_statement_(_ctx, stmt.syn.kw) + " needs " +  konoha.T_kw_(_ctx, rule.kw));
				return -1;
			}
			ti++;
			continue;
		}
		else if(rule.tt == konoha.ktoken_t.TK_METANAME) {
			var syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), rule.kw, 0);
			if(syn == null || syn.ParseStmtNULL == null) {
				konoha.Token_p(_ctx, tk, konoha.kreportlevel_t.ERR_, "unknown syntax pattern: " + konoha.T_kw_(_ctx, rule.kw));
				return -1;
			}
			var c = e;
			if(ri + 1 < rule_size && rules.data[ri+1].tt == konoha.ktoken_t.TK_CODE) {
				c = lookAheadKeyword(tls, ti+1, e, rules.data[ri+1]);
				if(c == -1) {
					if(optional) return s;
					konoha.Token_p(_ctx, tk, konoha.kreportlevel_t.ERR_, konoha.T_statement_(_ctx, stmt.syn.kw) + " needs " + konoha.T_kw_(_ctx, rule.kw));
					return -1;
				}
				ri++;
			}
//TODO!!			var err_count = ctxsugar.err_count;
			var next = syn.ParseStmtNULL(_ctx, stmt, syn, rule.nameid, tls, ti, c);

			if(next == -1) {
				if(optional) return s;
//TODO!!
// 				if(err_count == ctxsugar.err_count) {
// 					konoha.Token_p(_ctx, tk, konoha.ERR_, "%s needs syntax pattern %s, not %s ..", konoha.T_statement_(_ctx, stmt.syn.kw), konoha.T_kw_(_ctx, rule.kw), konoha.kToken_s(tk));
// 				}
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
				konoha.Token_p(_ctx, tk, konoha.kreportlevel_t.ERR_, konoha.T_statement_(_ctx, stmt.syn.kw) + " needs " + rule.topch);
				return -1;
			}
		}
	}
	if(!optional) {
		for(; ri < rules.length; ri++) {
			var rule = rules[ri];
			if(rule.tt != konoha.ktoken_t.AST_OPTIONAL) {
				konoha.sugar_p(konoha.kreportlevel_t.ERR_, uline, -1, konoha.T_statement_(_ctx, stmt.syn.kw) + " needs syntax pattern: " +  konoha.T_kw_(_ctx, rule.kw));
				return -1;
			}
		}
		konoha.WARN_Ignored(_ctx, tls, ti, e);
	}
	return ti;
}

konoha.TokenArray_lookAhead = function(_ctx, tls, s, e) {
	return (s < e) ? tls[s] : K_NULLTOKEN;
}

konoha.KonohaSpace_getSyntaxRule = function(_ctx, ks, tls, s, e) {
	var tk = tls[s];
	if((tk).kw == konoha.kw.Type) {
		tk = konoha.TokenArray_lookAhead(_ctx, tls, s+1, e);
		if(tk.tt == konoha.ktoken_t.TK_SYMBOL || tk.tt == konoha.ktoken_t.TK_USYMBOL) {
			tk = konoha.TokenArray_lookAhead(_ctx, tls, s+2, e);
			if(tk.tt == konoha.ktoken_t.AST_PARENTHESIS || tk.kw == konoha.kw.DOT) {
				return konoha.KonohaSpace_syntax(_ctx, ks, KW_StmtMethodDecl, 0); 
			}
			return konoha.KonohaSpace_syntax(_ctx, ks, KW_StmtTypeDecl, 0);  
		}
		return konoha.KonohaSpace_syntax(_ctx, ks, KW_Expr, 0);
	}
	var syn = konoha.KonohaSpace_syntax(_ctx, ks, tk.kw, 0);
	if(syn.syntaxRuleNULL == null) {
		var i;
		for(i = s + 1; i < e; i++) {
			tk = tls[i];
			syn = konoha.KonohaSpace_syntax(_ctx, ks, tk.kw, 0);
			if(syn.syntaxRuleNULL != null && syn.priority > 0) {
				konoha.sugar_p(DEBUG_, tk.uline, tk.lpos, "binary operator syntax kw= " + konoha.T_kw_(_ctx, syn.kw));
				return syn;
			}
		}
		return konoha.KonohaSpace_syntax(_ctx, ks, konoha.kw.Expr, 0);
	}
	return syn;
}

konoha.Stmt_parseSyntaxRule = function(_ctx, stmt, tls, s, e) {
	var ret = false;
	var syn = konoha.KonohaSpace_getSyntaxRule(_ctx, konoha.Stmt_ks(stmt), tls, s, e);
	if(syn.syntaxRuleNULL != null) {
		stmt.syn = syn;
		ret = (konoha.matchSyntaxRule(_ctx, stmt, syn.syntaxRuleNULL, stmt.uline, tls, s, e, 0) != -1);
	}
	else {
		konoha.sugar_p(konoha.kreportlevel_t.ERR_, stmt.uline, 0, "undefined syntax rule for " +  konoha.T_kw_(_ctx, syn.kw));
	}
	return ret;
}

konoha.Block_addStmtLine = function(_ctx, bk, tls, s, e, tkERR) {
	var stmt = new konoha.kStmt();
	bk.blocks.data.push(stmt);
	stmt.parentNULL = bk;
	if(tkERR != null) {
		stmt.syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), konoha.KW_Err, 0);
		stmt.build = konoha.TSTMT_ERR;
		konoha.kObject_setObject(stmt, konoha.KW_Err, tkERR.text);
	}
	else {
		s = konoha.Stmt_addAnnotation(_ctx, stmt, tls, s, e);
		if(!konoha.Stmt_parseSyntaxRule(_ctx, stmt, tls, s, e)) {
		}
	}
}

konoha.UndefinedParseExpr = function(_ctx, stmt, syn, tls, s, c, e ,_rix) {
	tk = tls[c];
//TODO!!	konoha.sugar_p(konoha.ERR_, tk.uline, tk.lpos, "undefined expression parser for '%s'", konoha.kToken_s(tk));
}

konoha.Stmt_isUnaryOp = function(_ctx, stmt, tk) {
	var syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), tk.kw, 0);
	return (syn.op1 != konoha.MN_NONAME);
}

konoha.Stmt_skipUnaryOp = function(_ctx, stmt, tls, s, e) {
	var i;
	for(i = s; i < e; i++) {
		var tk = tls[i];
		if(!konoha.Stmt_isUnaryOp(_ctx, stmt, tk)) {
			break;
		}
	}
	return i;
}

konoha.Stmt_findBinaryOp = function(_ctx, stmt, tls, s, e, synRef) {
	var idx = -1, i, prif = 0;
	for(i = konoha.Stmt_skipUnaryOp(_ctx, stmt, tls, s, e) + 1; i < e; i++) {
		var tk = tls[i];
		var syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), tk.kw, 0);
		if(syn.priority > 0) {
			if(prif < syn.priority || (prif == syn.priority && !(FLAG_is(syn.flag, SYNFLAG_ExprLeftJoinOp2)) )) {
				prif = syn.priority;
				idx = i;
				synRef.syn = syn;
			}
//			if(!FLAG_is(syn.flag, SYNFLAG_ExprPostfixOp2)) {
			if(syn.flag == konoha.SYNFLAG_ExprPostfixOp2) {
				i = konoha.Stmt_skipUnaryOp(_ctx, stmt, tls, i+1, e) - 1;
			}
		}
	}
	return idx;
}

konoha.Stmt_addExprParams = function(_ctx, stmt, expr, tls, s, e, allowEmpty) {
	var i, start = s;
	for(i = s; i < e; i++) {
		var tk = tls[i];
		if(tk.kw == konoha.kw.COMMA) {
			expr = konoha.Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
			start = i + 1;
		}
	}
	if(allowEmpty == 0 || start < i) {
		expr = konoha.Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
	}
	tls.length = 0;
	return expr;
}

konoha.ParseExpr = function(_ctx, syn, stmt, tls, s, idx, e) {
	if (syn == null || syn.ParseExpr == null) {
		return _ctx.kmodsugar.UndefinedParseExpr(_ctx, stmt, syn, tls, s, idx, e);
	}
	else {
		return syn.ParseExpr(_ctx, stmt, syn, tls, s, idx, e);
	}
}

konoha.Stmt_newExpr2 = function(_ctx, stmt, tls, s,  e) {
	if(s < e) {
		var synref = {};
		var idx = konoha.Stmt_findBinaryOp(_ctx, stmt, tls, s, e, synref);
		var syn = synref.syn;
		if(idx != -1) {
			return konoha.ParseExpr(_ctx, syn, stmt, tls, s, idx, e);
		}
		var c = s;
		syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), (tls[c]).kw, 0);
		return konoha.ParseExpr(_ctx, syn, stmt, tls, c, c, e);
	}
	else {
		if (0 < s - 1) {
			konoha.sugar_p(konoha.kreportlevel_t.ERR_, stmt.uline, -1, "expected expression after " + konoha.kToken_s(tls[s-1]));
		}
		else if(e < tls.length) {
			konoha.sugar_p(konoha.kreportlevel_t.ERR_, stmt.uline, -1, "expected expression before " + konoha.kToken_s(tls[e]));
		}
		else {
			konoha.sugar_p(konoha.kreportlevel_t.ERR_, stmt.uline, 0, "expected expression");
		}
		return K_NULLEXPR;
	}
}

konoha.Expr_rightJoin = function(_ctx, expr, stmt, tls, s, c, e) {
	if(c < e && expr != konoha.K_NULLEXPR) {
		konoha.WARN_Ignored(_ctx, tls, c, e);
	}
	return expr;
}

konoha.ParseExpr_Term = function(_ctx, stmt, syn, tls, s, c, e) {
	var tk = tls[c];
	var expr = new konoha.kExpr(konoha.KonohaSpace_syntax(konoha.Stmt_ks(stmt), tk.kw));
//FIX ME!!	konoha.Expr_setTerm(expr, 1);
	expr.tk = tk;
	return konoha.Expr_rightJoin(_ctx, expr, stmt, tls, s+1, c+1, e);
}

konoha.ParseExpr_Op = function(_ctx, stmt, syn, tls, s, c, e ,_rix) {
	var tk = tls[c];
	var expr, rexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, c+1, e);
	var mn = (s == c) ? syn.op1 : syn.op2;
	if(mn != konoha.MN_NONAME && syn.ExprTyCheck == _ctx.kmodsugar.UndefinedExprTyCheck) {
		konoha.kToken_setmn(tk, mn, (s == c) ? konoha.mntype_t.MNTYPE_unary: konoha.mntype_t.MNTYPE_binary);
		syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), konoha.KW_ExprMethodCall, 0);
	}
	if(s == c) {
		expr = konoha.new_ConsExpr(_ctx, syn, 2, tk, rexpr);
	}
	else {
		var lexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
		expr = konoha.new_ConsExpr(_ctx, syn, 3, tk, lexpr, rexpr);
	}

	return expr;
}

konoha.isFieldName = function(tls, c, e) {
	if(c+1 < e) {
		var tk = tls[c+1];
		return (tk.tt == konoha.ktoken_t.TK_SYMBOL || tk.tt == konoha.ktoken_t.TK_USYMBOL || tk.tt == konoha.ktoken_t.TK_MSYMBOL);
	}
	return false;
}

konoha.ParseExpr_DOT = function(_ctx, stmt, syn, tls, s, c, e,_rix) {
	if(isFieldName(tls, c, e)) {
		var expr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
		expr = konoha.new_ConsExpr(_ctx, syn, 2, tls[c+1], expr);
		sfp[_rix].o = konoha.kExpr_rightJoin(expr, stmt, tls, c+2, c+2, e);
	}
	if(c + 1 < e) c++;
	sfp[_rix].o = konoha.kToken_p(_ctx, tls[c], konoha.kreportlevel_t.ERR_, "expected field name: not " + konoha.kToken_s(tls[c]));
}

konoha.ParseExpr_Parenthesis = function(_ctx, stmt, syn, tls, s, c, e) {
	var tk = tls[c];
	if(s == c) {
		var expr = konoha.Stmt_newExpr2(_ctx, stmt, tk.sub, 0, kArray_size(tk.sub));
		sfp[_rix].o = konoha.kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e);
	}
	else {
		var lexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
		if(lexpr == K_NULLEXPR) {
			sfp[_rix].o = lexpr;
		}
		if(lexpr.syn.kw == konoha.KW_DOT) {
			lexpr.syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), KW_ExprMethodCall, 0);
		}
		else if(lexpr.syn.kw != konoha.KW_ExprMethodCall) {
			syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), konoha.KW_Parenthesis, 0);
			lexpr  = konoha.new_ConsExpr(_ctx, syn, 2, lexpr, K_NULL);
		}
		lexpr = konoha.Stmt_addExprParams(_ctx, stmt, lexpr, tk.sub, 0, tk.sub.data.length, 1/*allowEmpty*/);
		sfp[_rix].o = konoha.kExpr_rightJoin(lexpr, stmt, tls, s+1, c+1, e);
	}
}

konoha.ParseExpr_COMMA = function(_ctx, stmt, syn, tls, s, c, e,_rix) {
	var expr = konoha.new_ConsExpr(_ctx, syn, 1, tls[c]);
	expr = konoha.Stmt_addExprParams(_ctx, stmt, expr, tls, s, e, 0/*allowEmpty*/);
	sfp[_rix].o = expr;
}

konoha.ParseExpr_DOLLAR = function(_ctx, stmt, syn, tls, s, c, e,_rix) {
	if(s == c && c + 1 < e) {
		var tk = tls[c+1];
		if(tk.tt == konoha.ktoken_t.TK_CODE) {
			konoha.Token_toBRACE(_ctx, tk, konoha.Stmt_ks(stmt));
		}
		if(tk.tt == konoha.ktoken_t.AST_BRACE) {
			var expr = new konoha.kBlock();
			Expr_setTerm(expr, 1);
			expr.tk = tk;
			expr.block = konoha.new_Block(_ctx, konoha.Stmt_ks(stmt), stmt, tk.sub, 0, tk.sub.data.length, ';');
			RETURN_(expr);
		}
	}
}

konoha.ParseStmt_Expr = function(_ctx, stmt, syn, name, tls, s, e) {
	var r = -1;
//TODO	konoha.dumpTokenArray(_ctx, 0, tls, s, e);
	var expr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, e);

	if(expr != konoha.K_NULLEXPR) {
//		konoha.dumpExpr(_ctx, 0, 0, expr);
		var ty_expr = -1; //FIX ME!!
		konoha.KObject_setObject(_ctx, stmt, name, ty_expr, expr);
		r = e;
	}
	return r;
}

konoha.ParseStmt_Type = function(_ctx, stmt, syn, name,s, e)
{
	var r = -1;
	var tk = tls[s];
	if((tk).kw == konoha.KW_Type) {
		konoha.kObject_setObject(_ctx, stmt, name, tk_ty, tk);
		r = s + 1;
	}
}

konoha.ParseStmt_Usymbol = function(_ctx, stmt, syn, name, tls, s, e) {
	
	var r = -1;
	var tk = tls[s];
	if(tk.tt == konoha.ktoken_t.TK_USYMBOL) {
		konoha.kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
}

konoha.ParseStmt_Symbol = function(_ctx, stmt, syn, name, tls, s, e,_rix) {
	var r = -1;
	var tk = tls[s];
	if(tk.tt == konoha.ktoken_t.TK_SYMBOL) {
		konoha.kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
}

konoha.ParseStmt_Params = function(_ctx, stmt, syn, name, tls, s, e,_rix) {
	var r = -1;
	var tk = tls[s];
	if(tk.tt == konoha.ktoken_t.AST_PARENTHESIS) {
		var tls = tk.sub;
		var ss = 0, ee = tls.length;
		if(0 < ee && tls[0].kw == konoha.kw._void) ss = 1;
		var bk = konoha.new_Block(_ctx, konoha.kStmt_ks(stmt), stmt, tls, ss, ee, ',');
		konoha.kObject_setObject(stmt, name, bk);
		r = s + 1;
	}
}

konoha.ParseStmt_Block = function(_ctx, stmt, syn, name, tls, s, e,_rix) {
	var tk = tls[s];
	if(tk.tt == konoha.ktoken_t.TK_CODE) {
		konoha.kObject_setObject(stmt, name, tk);
	}
	else if(tk.tt == konoha.ktoken_t.AST_BRACE) {
		var bk = konoha.new_Block(_ctx, konoha.Stmt_ks(stmt), stmt, tk.sub, 0, tk.sub.data.length, ';');
		konoha.kObject_setObject(stmt, name, bk);
		sfp[_rix].ivalue = s+1;
	}
	else {
		var bk = konoha.new_Block(_ctx, konoha.Stmt_ks(stmt), stmt, tls, s, e, ';');
		konoha.kObject_setObject(stmt, name, bk);
	}
}

konoha.ParseStmt_Toks = function(_ctx, stmt, syn, name, s, e) {
	if(s < e) {
		var a = new konoha.kArray();
		while(s < e) {
			a.data.push(tls[s]);
			s++;
		}
		konoha.kObject_setObject(stmt, name, a);
	}
}
