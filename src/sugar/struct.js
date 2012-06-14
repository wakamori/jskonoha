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

konoha.KonohaSpace_syntax = function(_ctx, ks0, kw, isnew)
{
	var ks = new konoha.kKonohaSpace();
	ks = ks0;
	var parent = null;
	// while(ks != null) {
	// 	if(ks.syntaxMapNN != null) {
	// 		var e = kw;
	// 		while(e != null) {
	// 			if(e.hcode == hcode) {
	// 				parent = e.uvalue;
	// 				if(isnew && ks0 != ks)
	// 				return parent;
	// 			}
	// 			e = e.next;
	// 		}
	// 	}
	// 	ks = ks.parentNULL;
	// }

	if(isnew == 1) {
		if(ks0.syntaxMapNN == null) {
			ks0.syntaxMapNN = kmap_init(0);
		}
		ks0.syntaxMapNN[kw] = syn;

		if(parent != null) {  // TODO: RCGC
			syn = parent;
		}
		else {
			syn.kw = kw;
			syn.ty  = konoha.TY_unknown;
			syn.op1 = konoha.MN_NONAME;
			syn.op2 = konoha.MN_NONAME;
			konoha.KSETv(syn.ParseExpr, kmodsugar.UndefinedParseExpr);
			konoha.KSETv(syn.TopStmtTyCheck, kmodsugar.UndefinedStmtTyCheck);
			konoha.KSETv(syn.StmtTyCheck, kmodsugar.UndefinedStmtTyCheck);
			konoha.KSETv(syn.ExprTyCheck, kmodsugar.UndefinedExprTyCheck);
		}
		return syn;
	}
	return null;
}
//#define T_statement(kw)  T_statement_(_ctx, kw)
konoha.T_statement_ = new function(CTX,  kw)
{
	var buf = new Array();  // this is not good, but this is very rare case.
	var statement = null, postfix = " statement";
	if(kw == konoha.KW_Expr) { statement = "expression"; postfix = ""; }
	if(kw == konoha.KW_StmtTypeDecl) { statement = "variable"; postfix = " declaration"; }
	if(kw == konoha.KW_StmtMethodDecl) { statement =  "function"; postfix = " declaration"; }
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

