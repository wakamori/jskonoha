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
//
///* ************************************************************************ */
//
//#ifdef __cplusplus
//extern "C" {
//#endif
//
//
///* ------------------------------------------------------------------------ */
//
//#define NEW_EXPR(expr)  \
//	if(expr == NULL) {\
//		expr = new_(Expr, 0);\
//		PUSH_GCSTACK(_ctx, expr);\
//	}\
//
//#define new_Const(_ctx, expr, data)  new_Const_(_ctx, expr, UPCAST(data))
//static kExpr *new_Const_(CTX, kExpr *expr, kObject *data)
//{
//	NEW_EXPR(expr);
//	expr->kexpr = TEXPR_CONST;
//	KSETv(expr->data, data);
//	expr->type = O_cid(data);
//	return expr;
//}
//
//static kExpr *new_FuncVar(CTX, kExpr *expr, ktype_t ty, int index)
//{
//	NEW_EXPR(expr);
//	expr->kexpr = TEXPR_FUNCVAR;
//	expr->index = index;
//	expr->type  = ty;
//	return expr;
//}
//
//static kExpr *new_Field(CTX, kExpr *expr, ktype_t ty, int index, int xindex)
//{
//	NEW_EXPR(expr);
//	expr->kexpr = TEXPR_FIELD;
//	expr->index = index;
//	expr->xindex = index;
//	expr->type  = ty;
//	return expr;
//}
//
//static kExpr *new_LocalVar(CTX, kExpr *expr, ktype_t ty, int index, kGamma *gma)
//{
//	NEW_EXPR(expr);
//	expr->kexpr = TEXPR_LOCAL_;
//	expr->index = index;
//	expr->type  = ty;
//	kArray_add(DP(gma)->lvars, expr);
//	return expr;
//}
//
//#define Expr_cons(_ctx, stmt, ...)   Expr_cons_(_ctx, stmt, ## __VA_ARGS__, NULL)
//static kExpr* Expr_cons_(CTX, kExpr *expr, ...)
//{
//	kExpr *tm = NULL;
//	va_list ap;
//	va_start(ap, expr);
//	KSETv(expr->cons, new_Array0(_ctx, 0));
//	while((tm = (kExpr*)va_arg(ap, kExpr*)) != NULL) {
//		kArray_add(expr->cons, tm);
//	}
//	va_end(ap);
//	return expr;
//}
//
//static kExpr* Expr_typed(CTX, kExpr *expr, ktype_t ty)
//{
//	expr->type = ty;
//	return expr;
//}
//
//static kExpr* Expr_typeCheck(CTX, kExpr *expr, kGamma *gma, kcid_t reqt);
//static kObject *Expr_getConst(CTX, kExpr *expr, kcid_t cid)
//{
//	if(Expr_typeCheck(_ctx, expr, NULL, cid)) {
//		if(expr->kexpr == TEXPR_CONST) {
//			return expr->data;
//		}
//	}
//	return NULL;
//}
//
///* ------------------------------------------------------------------------ */
//
//#define Stmt_getTokenNULL(_ctx, stmt, T)          Stmt_getTokenNULL_(_ctx, stmt, STEXT(T))
//#define Stmt_getConst(_ctx, stmt, T, cid)         Stmt_getConst_(_ctx, stmt, STEXT(T), cid)
//#define Stmt_getint(_ctx, stmt, T, n)             Stmt_getint_(_ctx, stmt, STEXT(T), n)
//
//#define Stmt_getBlock(_ctx, stmt, T)              Stmt_getBlock_(_ctx, stmt, STEXT(T))
//
//#define Stmt_getcid(_ctx, stmt, T, ns, defcid)    Stmt_getcid_(_ctx, stmt, STEXT(T), ns, defcid)
//#define Stmt_gettype(_ctx, stmt, T, ns, defcid)   Stmt_getcid_(_ctx, stmt, STEXT(T), ns, defcid)
//#define Stmt_getmn(_ctx, stmt, T, def)            Stmt_getmn_(_ctx, stmt, STEXT(T), def)
//#define Stmt_getfn(_ctx, stmt, T, def)            Stmt_getfn_(_ctx, stmt, STEXT(T), def)
//#define Stmt_uline(stmt)  stmt->uline
//#define Stmt_done(_ctx, stmt)  KSETv(stmt->parent, K_NULL);
//
//
//static kObject* Stmt_getConst_(CTX, kStmt *stmt, kbytes_t name, kcid_t cid)
//{
//	kObject *term = knh_DictMap_getNULL(_ctx, stmt->clauseDictMap, name);
//	if(term != NULL && IS_Expr(term)) {
//		return Expr_getConst(_ctx, (kExpr*)term, cid);
//	}
//	return NULL;
//}
//
//static kint_t Stmt_getint_(CTX, kStmt *stmt, kbytes_t name, kint_t defn)
//{
//	kObject *o = Stmt_getConst_(_ctx, stmt, name, CLASS_Int);
//	if(o != NULL) {
//		return ((kInt*)o)->n.ivalue;
//	}
//	return defn;
//}
//
//
//static kToken *Stmt_getTokenNULL_(CTX, kStmt *stmt, kbytes_t name)
//{
//	kObject *term = knh_DictMap_getNULL(_ctx, stmt->clauseDictMap, name);
//	if(term != NULL && IS_Expr(term)) {
//		return ((kExpr*)term)->token;
//	}
//	return NULL;
//}
//
//static kBlock *Stmt_getBlock_(CTX, kStmt *stmt, kbytes_t name)
//{
//	kBlock *bk = (kBlock*)knh_DictMap_getNULL(_ctx, stmt->clauseDictMap, name);
//	if(bk != NULL && IS_Block(bk)) {
//		return bk;
//	}
//	return KNH_TNULL(Block);
//}
//
//
////define Term_fn(_ctx, tk) FN_UNMASK(Term_fnq(_ctx, tk))
////
////ksymbol_t Term_fnq(CTX, kTerm *tk)
////{
////	ksymbol_t fn = FN_;
////	if(TT_(tk) == TT_NAME || TT_(tk) == TT_UNAME) {
////		fn = knh_getfnq(_ctx, TK_tobytes(tk), FN_NEWID);
////	}
////	return fn;
////}
////
////static kmethodn_t Term_mn(CTX, kTerm *tk)
////{
////	if(TT_(tk) == TT_FUNCNAME || TT_(tk) == TT_NAME || TT_(tk) == TT_UNAME || TT_(tk) == TT_UFUNCNAME) {
////		TT_(tk) = TT_MN;
////		(tk)->mn = knh_getmn(_ctx, TK_tobytes(tk), MN_NEWID);
////	}
////	if(TT_(tk) == TT_NEW) {
////		TT_(tk) = TT_MN;
////		(tk)->mn = knh_getmn(_ctx, TK_tobytes(tk), MN_NEWID);
////	}
////	DBG_ASSERT(TT_(tk) == TT_MN);
////	if(Term_isISBOOL(tk)) {
////		(tk)->mn = MN_toISBOOL(MN_toFN((tk)->mn));
////		Term_setISBOOL(tk, 0);
////	}
////	else if(Term_isGetter(tk)) {
////		(tk)->mn = MN_toGETTER(MN_toFN((tk)->mn));
////		Term_setGetter(tk, 0);
////	}
////	else if(Term_isSetter(tk)) {
////		(tk)->mn = MN_toSETTER(MN_toFN((tk)->mn));
////		Term_setSetter(tk, 0);
////	}
////	return (tk)->mn;
////}
//
//static ksymbol_t Stmt_getfn_(CTX, kStmt *stmt, kbytes_t name, ksymbol_t deffn)
//{
//	return deffn;
//}
//
//static kmethodn_t Stmt_getmn_(CTX, kStmt *stmt, kbytes_t name, kmethodn_t defmn)
//{
//	kExpr *expr = Stmt_getExprNULL_(_ctx, stmt, name);
//	if(expr == NULL) {
//		return defmn;
//	}
//	if(expr->kexpr == UEXPR_TOKEN) {
//		kmethodn_t mn = knh_getmn(_ctx, TK_tobytes(tk), defmn);
//		expr->kexpr = EXPR_METHOD;
//		expr->mn   = mn;
//	}
//	DBG_ASSERT(expr->kexpr == EXPR_METHOD);
//	if(expr->kexpr == EXPR_METHOD) {
//		return expr->mn;
//	}
//	return defmn;
//}
//
///* ------------------------------------------------------------------------ */
//
//#ifdef __cplusplus
//}
//#endif
