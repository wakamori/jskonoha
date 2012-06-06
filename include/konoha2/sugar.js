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
//#ifndef SUGAR_H_
//#define SUGAR_H_
//
///* ------------------------------------------------------------------------ */
///* sugar.h */
//
//#include <dlfcn.h>
//#include "konoha2.h"
//#include "klib.h"
//
//#ifdef __cplusplus
//extern "C" {
//#endif
//
//typedef ksymbol_t keyword_t;
//#define T_kw(X)   T_kw_(_ctx, X)
//#define Skeyword(X)   Skw_(_ctx, X)
//
//#define kflag_clear(flag)  (flag) = 0
//#define K_CHECKSUM 1
//
//#define KPACKNAME(N, V) \
//	.name = N, .version = V, .konoha_checksum = K_CHECKSUM, .konoha_revision = K_REVISION
//
//#define KPACKLIB(N, V) \
//	.libname = N, .libversion = V
//
//typedef struct {
//	int konoha_checksum;
//	const char *name;
//	const char *version;
//	const char *libname;
//	const char *libversion;
//	const char *note;
//	kbool_t (*initPackage)(CTX, const struct _kKonohaSpace *, int, const char**, kline_t);
//	kbool_t (*setupPackage)(CTX, const struct _kKonohaSpace *, kline_t);
//	kbool_t (*initKonohaSpace)(CTX, const struct _kKonohaSpace *, kline_t);
//	kbool_t (*setupKonohaSpace)(CTX, const struct _kKonohaSpace *, kline_t);
//	int konoha_revision;
//} KDEFINE_PACKAGE_;
//
//typedef const KDEFINE_PACKAGE_ KDEFINE_PACKAGE;
//typedef KDEFINE_PACKAGE* (*Fpackageinit)(void);
//
//typedef struct _kpackage kpackage_t;
//struct _kpackage {
//	kpack_t                      packid;
//	const struct _kKonohaSpace  *ks;
//	KDEFINE_PACKAGE             *packdef;
//	kline_t                      export_script;
//};
//
//// tokenizer
//#define KCHAR_MAX  41
//struct tenv_t;
//typedef int (*Ftokenizer)(CTX, struct _kToken *, struct tenv_t *, int, kMethod *thunk);
//
konoha.tenv_t = function() {
	this.source = null; //const char* => String
	this.uline = null; //kline_t
	this.list = new konoha.kArray(); //kArray*
	this.bol = null; //const char* => Number
	this.indent_tab = null; //int => Number
	this.fmat = null; //Ftokenizer*
}
//
//// ParseToken
//#define VAR_ParseToken(TK, STR, UL) \
//		struct _kToken *TK = (struct _kToken*)sfp[0].o;\
//		kString *STR = sfp[1].s;\
//		int UL = (int)sfp[2].ivalue;\
//		(void)TK; (void)STR; (void)UL;\
//
//// int ParseStmt.parseStmt(Token[] tls, int s, int e)
//#define VAR_ParseStmt(STMT, SYN, NAME, TLS, S, E) \
//		kStmt *STMT = (kStmt*)sfp[0].o;\
//		ksyntax_t *SYN = (ksyntax_t*)sfp[0].ndata;\
//		ksymbol_t NAME = (ksymbol_t)sfp[1].ivalue;\
//		kArray *TLS = (kArray*)sfp[2].o;\
//		int S = (int)sfp[3].ivalue;\
//		int E = (int)sfp[4].ivalue;\
//		(void)STMT; (void)SYN; (void)NAME; (void)TLS; (void)S; (void)E;\
//
//// Expr Stmt.parseExpr(Token[] tls, int s, int c, int e)
//#define VAR_ParseExpr(STMT, SYN, TLS, S, C, E) \
//		kStmt *STMT = (kStmt*)sfp[0].o;\
//		ksyntax_t *SYN = (ksyntax_t*)sfp[0].ndata;\
//		kArray *TLS = (kArray*)sfp[1].o;\
//		int S = (int)sfp[2].ivalue;\
//		int C = (int)sfp[3].ivalue;\
//		int E = (int)sfp[4].ivalue;\
//		(void)STMT; (void)SYN; (void)TLS; (void)S; (void)C; (void)E;\
//
//// Expr Stmt.tycheck(Gamma gma)
//
//#define VAR_StmtTyCheck(STMT, SYN, GMA) \
//		kStmt *STMT = (kStmt*)sfp[0].o;\
//		ksyntax_t *SYN = (ksyntax_t*)sfp[0].ndata;\
//		kGamma *GMA = (kGamma*)sfp[1].o;\
//		(void)STMT; (void)SYN; (void)GMA;\
//
//// Expr Expr.tycheck(Gamma gma, int t)
//
//#define VAR_ExprTyCheck(EXPR, SYN, GMA, TY) \
//		kExpr *EXPR = (kExpr*)sfp[0].o;\
//		ksyntax_t *SYN = (ksyntax_t*)sfp[0].ndata;\
//		kGamma *GMA = (kGamma*)sfp[1].o;\
//		ktype_t TY = (ktype_t)sfp[2].ivalue;\
//		(void)EXPR; (void)SYN; (void)GMA; (void)TY;\
//
////#define SYN_ExprFlag      1
//#define SYN_isExpr(syn)   TFLAG_is(kflag_t, syn->flag, SYN_ExprFlag)


konoha.ksyntax = function() {
	this.kw = null;				//keyword_t
	this.flag = null;				//kflag_t
	this.syntaxRuleNULL = new konoha.kArray();	//kArray *
	this.ParseStmtNULL = null;		//Method *
	this.ParseExpr = null;			//kMethod *
	this.TopStmtTyCheck = null;	//kMethod *
	this.StmtTyCheck = null;		//kMethod *
	this.ExprTyCheck = null;		//kMethod *
	this.ty = null;				//ktype_t
	this.priority = null;			//kshort_t
	this.op2 = null;				//kmethodn_t
	this.op1 = null;				//kmethodn_t
	//	//kshort_t dummy;
};
//
//#define TOKEN(T)  .name = T
//#define ParseStmt_(NAME)  .ParseStmt = ParseStmt_##NAME
//#define ParseExpr_(NAME)   .ParseExpr = ParseExpr_##NAME
//#define TopStmtTyCheck_(NAME)  .TopStmtTyCheck = StmtTyCheck_##NAME
//#define StmtTyCheck_(NAME)     .StmtTyCheck = StmtTyCheck_##NAME
//#define ExprTyCheck_(NAME)     .ExprTyCheck = ExprTyCheck_##NAME
//
//#define _TERM  .flag = SYNFLAG_ExprTerm
//#define _OP    .flag = SYNFLAG_ExprOp
//#define _OPLeft   .flag = (SYNFLAG_ExprOp|SYNFLAG_ExprLeftJoinOp2)
//
//#define SYNFLAG_ExprTerm           ((kflag_t)1)
//#define SYNFLAG_ExprOp             ((kflag_t)1 << 1)
//#define SYNFLAG_ExprLeftJoinOp2    ((kflag_t)1 << 2)
//#define SYNFLAG_ExprPostfixOp2     ((kflag_t)1 << 3)
//
//#define SYNFLAG_StmtBreakExec      ((kflag_t)1 << 8)  /* return, throw */
//#define SYNFLAG_StmtJumpAhead      ((kflag_t)1 << 9)  /* continue */
//#define SYNFLAG_StmtJumpSkip       ((kflag_t)1 << 10)  /* break */
//
//typedef struct KDEFINE_SYNTAX {
//	const char *name;
//	keyword_t kw;  kflag_t flag;
//	const char *rule;
//	const char *op2;
//	const char *op1;
//	int priority_op2;
//	int type;
//	knh_Fmethod ParseStmt;
//	knh_Fmethod ParseExpr;
//	knh_Fmethod TopStmtTyCheck;
//	knh_Fmethod StmtTyCheck;
//	knh_Fmethod ExprTyCheck;
//} KDEFINE_SYNTAX;
//
//#define new_SugarMethod(F)     new_kMethod(0, 0, 0, NULL, F)
//
//#define SYN_setTopStmtTyCheck(KS, KW, F) do {\
//		struct _ksyntax *syn_ = NEWSYN_(KS, KW);\
//		DBG_ASSERT(syn_ != NULL);\
//		KSETv(syn_->TopStmtTyCheck, new_SugarMethod(StmtTyCheck_##F));\
//	}while(0)\
//
//#define SYN_setStmtTyCheck(KS, KW, F) do {\
//		struct _ksyntax *syn_ = NEWSYN_(KS, KW);\
//		DBG_ASSERT(syn_ != NULL);\
//		KSETv(syn_->StmtTyCheck, new_SugarMethod(StmtTyCheck_##F));\
//	}while(0)\
//
//#define SYN_setExprTyCheck(KS, KW, F) do {\
//		struct _ksyntax *syn_ = NEWSYN_(KS, KW);\
//		DBG_ASSERT(syn_ != NULL);\
//		KSETv(syn_->ExprTyCheck, new_SugarMethod(ExprTyCheck_##F));\
//	}while(0)\
//
//
konoha.kKonohaSpace = function() {
	this.h = new konoha.kObjectHeader();				//	kObjectHeader
	this.packid = null;		//	kpack_t
	this.pakdom = null;		//kpack_t
	this.parentNULL = null;	//const struct _kKonohaSpace *
	this.fmat = null;			//const Ftokenizer *
	this.syntaxMapNN = null;	//struct kmap_t *
	this.gluehdr = null;		//void *
	this.scrNUL = new konoha.kObject();		//kObject *
	this.static_cid = null;	//kcid_t
	this.function_cid = null;	//kcid_t
	this.methods = new konoha.kArray();		//kArray *
	this.cl = null;			//	karray_t
};
//
//typedef kshort_t    ksugar_t;
//typedef kshort_t    kexpr_t;
//
konoha.ktoken_t = new konoha.Enum(
	"TK_NONE",          // KW_Err
	"TK_INDENT",        // KW_Expr
	"TK_SYMBOL",        // KW_Symbol
	"TK_USYMBOL",       // KW_Usymbol
	"TK_TEXT",          // KW_Text
	"TK_INT",           // KW_Int
	"TK_FLOAT",         // KW_Float
	"TK_TYPE",          // KW_Type
	"AST_PARENTHESIS",  // KW_Parenthesis
	"AST_BRANCET",      // KW_Brancet
	"AST_BRACE",        // KW_Brace

	"TK_OPERATOR",
	"TK_MSYMBOL",       //
	"TK_ERR",           //
	"TK_CODE",          //
	"TK_WHITESPACE",    //
	"TK_METANAME",
	"TK_MN",
	"AST_OPTIONAL"      // for syntax sugar
);
//
konoha.kToken = function() {
	this.h = new konoha.kObjectHeader;				//kObjectHeader
	this.tt = null;			//kushort_t
	this.kw = null;			//ksymbol_t
	//	union {
	this.text = null;		//kString *
	this.sub = new konoha.kArray();		//kArray *
	//	};
	this.uline = null;			//kline_t
	//	union {
	this.lpos = null;		//kushort_t
	this.closech = null;	//kshort_t  // ast
	this.nameid = null;	//ksymbol_t   // sugar rule    in sugar
	this.mn_type = null;	//kshort_t    // method type   if tt == TK_MN
	//	};
	//	union {
	this.topch = null;		//kshort_t
	this.ty = null;		//ktype_t       // if kw == KW_Type
	this.mn = null;		//kmethodn_t	     // if tt == TK_MN
	//	};
};
//
konoha.mntype_t = new konoha.Enum (
	"MNTYPE_method",
	"MNTYPE_unary",
	"MNTYPE_binary"
);
//
//static inline void kToken_setmn(kToken *tk, kmethodn_t mn, mntype_t mn_type)
//{
//	((struct _kToken*)tk)->tt = TK_MN;
//	((struct _kToken*)tk)->mn = mn;
//	((struct _kToken*)tk)->mn_type = (kshort_t)mn_type;
//}
//
//#define TEXPR_LOCAL_   -4   /*THIS IS NEVER PASSED*/
//#define TEXPR_BLOCK_   -3   /*THIS IS NEVER PASSED*/
//#define TEXPR_FIELD_   -2   /*THIS IS NEVER PASSED*/
//#define TEXPR_shift    (TEXPR_LOCAL - (TEXPR_LOCAL_))
//#define TEXPR_UNTYPED       -1   /*THIS MUST NOT HAPPEN*/
//#define TEXPR_CONST          0
//#define TEXPR_NEW            1
//#define TEXPR_NULL           2
//#define TEXPR_NCONST         3
//#define TEXPR_LOCAL          4
//#define TEXPR_BLOCK          5
//#define TEXPR_FIELD          6
//#define TEXPR_BOX            7
//#define TEXPR_UNBOX          8
//#define TEXPR_CALL           9
//#define TEXPR_AND           10
//#define TEXPR_OR            11
//#define TEXPR_LET           12
//#define TEXPR_STACKTOP      13
//#define TEXPR_MAX           14
//
//
//#define Expr_isCONST(o)     (TEXPR_CONST <= (o)->build && (o)->build <= TEXPR_NCONST)
//#define Expr_isTerm(o)      (TFLAG_is(uintptr_t,(o)->h.magicflag,kObject_Local1))
//#define Expr_setTerm(o,B)   TFLAG_set(uintptr_t,(o)->h.magicflag,kObject_Local1,B)
//#define kExpr_at(E,N)        ((E)->cons->exprs[(N)])
//
konoha.kExpr = function() {
	this.h = new konoha.kObjectHeader();				//kObjectHeader
	this.ty = null;			//ktype_t
	this.build = null;			//kexpr_t
	this.tk = null;			//kToken
	//	union {
	this.data = new konoha.kObject();		//kObject*
	this.cons = new konoha.kArray();		//kArray *
	this.single = null;	//kExpr *
	this.block = null;		//const struct _kBlock *
	//	};
	//	union {
	this.syn = null;		//ksyntax_t *
	this.ivalue = null;	//kint_t
	this.fvalue = null;	//kfloat_t
	this.ndata = null;		//uintptr_t
	this.index = null;		//intptr_t
	this.cid = null;		//uintptr_t
	this.mh = null;		//uintptr_t
	//	};
};
//
//#define TSTMT_UNDEFINED      0
//#define TSTMT_ERR            1
//#define TSTMT_EXPR           2
//#define TSTMT_BLOCK          3
//#define TSTMT_RETURN         4
//#define TSTMT_IF             5
//#define TSTMT_LOOP           6
//#define TSTMT_JUMP           7
//
konoha.kStmt = function() {
	this.h = new konoha.kObjectHeader();				//	kObjectHeader;
	this.uline = null;			//	kline_t;
	this.syn = null;			//	ksyntax_t *;
	this.parentNULL = null	//	const struct _kBlock *;
	this.build = null;			//	kushort_t;
};

konoha.kBlock = function() {
	this.h = new konoha.kObjectHeader();				//kObjectHeader
	this.ks = null;			//kKonohaSpace *
	this.parentNULL = null;	//kStmt *
	this.blocks = new konoha.kArray();		//kArray *
	this.esp = null;			//kExpr *
};

//typedef struct _kGamma kGamma;
//
//typedef struct {
//	ktype_t    ty;    ksymbol_t  fn;
//} gammastack_t ;
//
//#define kGamma_TOPLEVEL        (kflag_t)(1)
//#define kGamma_isTOPLEVEL(GMA)  TFLAG_is(kflag_t, GMA->genv->flag, kGamma_TOPLEVEL)
//#define kGamma_ERROR           (kflag_t)(1<<1)
//#define kGamma_isERROR(GMA)    TFLAG_is(kflag_t, GMA->genv->flag, kGamma_ERROR)
//#define kGamma_setERROR(GMA,B) TFLAG_set(kflag_t, GMA->genv->flag, kGamma_ERROR, B)
//
//typedef struct {
//	gammastack_t *vars;
//	size_t varsize;
//	size_t capacity;
//	size_t allocsize;
//} gstack_t ;
//
//typedef struct gmabuf_t {
//	kflag_t  flag;    kflag_t  cflag;
//
//	kKonohaSpace     *ks;
//
//	kcid_t            this_cid;
//	kcid_t            static_cid;
//	kMethod*          mtd;
//	gstack_t f;
//	gstack_t l;
//	kArray           *lvarlst;
//	size_t lvarlst_top;
//} gmabuf_t;
//
//struct _kGamma {
//	kObjectHeader h;
//	struct gmabuf_t *genv;
//};
//
///* ------------------------------------------------------------------------ */
//
// konoha.ctxsugar       = _ctx.modlocal[MOD_sugar]
// konoha.kmodsugar      = _ctx.modshare[MOD_sugar]
// konoha.CT_Token       = kmodsugar.cToken
// konoha.CT_Expr        = kmodsugar.cExpr
// konoha.CT_Stmt        = kmodsugar.cStmt
// konoha.CT_Block       = kmodsugar.cBlock
// konoha.CT_KonohaSpace = kmodsugar.cKonohaSpace
// konoha.CT_Gamma       = kmodsugar.cGamma

// konoha.CT_TokenArray           kmodsugar->cTokenArray
// konoha.kTokenArray             kArray
// konoha.CT_ExprArray            CT_Array
// konoha.kExprArray              kArray
// konoha.CT_StmtArray            CT_Array
// konoha.kStmtArray              kArray
// //
// konoha.IS_Token(O)  ((O)->h.ct == CT_Token)
// konoha.IS_Expr(O)  ((O)->h.ct == CT_Expr)
// konoha.IS_Stmt(O)  ((O)->h.ct == CT_Stmt)
// konoha.IS_Block(O)  ((O)->h.ct == CT_Block)
// konoha.IS_Gamma(O)  ((O)->h.ct == CT_Gamma)
// //
// konoha.K_NULLTOKEN  (kToken*)((CT_Token)->nulvalNUL)
// konoha.K_NULLEXPR   (kExpr*)((CT_Expr)->nulvalNUL)
// konoha.K_NULLBLOCK  (kBlock*)((CT_Block)->nulvalNUL)
// //
// konoha.TK_SHIFT    10000
// konoha.KW_TK(N)    (((keyword_t)N)+TK_SHIFT)
//
konoha.KW_Err     = 0;
konoha.KW_Expr    = 1;
konoha.KW_Symbol  = 2;
konoha.KW_name    = 2;
konoha.KW_Usymbol = 3;
konoha.KW_cname   = 3;
konoha.KW_Text    = 4;
konoha.KW_Int     = 5;
konoha.KW_Float   = 6;
konoha.KW_Type    = 7;
konoha.KW_StmtTypeDecl =  konoha.KW_Type;
konoha.KW_Parenthesis = 8
konoha.KW_Brancet     = 9
konoha.KW_Brace       = 10

konoha.KW_Block  = 11
konoha.KW_Params = 12
konoha.KW_ExprMethodCall = 12/*FIXME*/
konoha.KW_Toks   = 13

konoha.KW_DOT    = 14
konoha.KW_DIV    = (1+konoha.KW_DOT)
konoha.KW_MOD    = (2+konoha.KW_DOT)
konoha.KW_MUL    = (3+konoha.KW_DOT)
konoha.KW_ADD    = (4+konoha.KW_DOT)
konoha.KW_SUB    = (5+konoha.KW_DOT)
konoha.KW_LT     = (6+konoha.KW_DOT)
konoha.KW_LTE    = (7+konoha.KW_DOT)
konoha.KW_GT     = (8+konoha.KW_DOT)
konoha.KW_GTE    = (9+konoha.KW_DOT)
konoha.KW_EQ     = (10+konoha.KW_DOT)
konoha.KW_NEQ    = (11+konoha.KW_DOT)
konoha.KW_AND    = (12+konoha.KW_DOT)
konoha.KW_OR     = (13+konoha.KW_DOT)
konoha.KW_NOT    = (14+konoha.KW_DOT)
konoha.KW_COLON  = (15+konoha.KW_DOT)
konoha.KW_LET    = (15+konoha.KW_DOT)
konoha.KW_COMMA  = (16+konoha.KW_DOT)
konoha.KW_DOLLAR = (17+konoha.KW_DOT)

konoha.KW_void   =   (18+konoha.KW_DOT)
konoha.KW_StmtMethodDecl  = konoha.KW_void
konoha.KW_boolean =  (1+konoha.KW_void)
konoha.KW_int     =  (2+konoha.KW_void)
konoha.KW_null    =  (3+konoha.KW_void)
konoha.KW_true    =  (3+konoha.KW_void)
konoha.KW_false   =  (4+konoha.KW_void)
konoha.KW_if      =  (5+konoha.KW_void)
konoha.KW_else    =  (6+konoha.KW_void)
konoha.KW_return  =  (7+konoha.KW_void)
//// reserved
konoha.KW_new     =  (8+konoha.KW_void)
//#define FN_this      FN_("this")
//
//struct _kKonohaSpace;
//
//#define kKonohaSpace_defineSyntax(L, S)  kmodsugar->KKonohaSpace_defineSyntax(_ctx, L, S)
//
//typedef struct {
//	kmodshare_t h;
//	kclass_t *cToken;
//	kclass_t *cExpr;
//	kclass_t *cStmt;
//	kclass_t *cBlock;
//	kclass_t *cKonohaSpace;
//	kclass_t *cGamma;
//	kclass_t *cTokenArray;
//	//
//	kArray         *keywordList;
//	struct kmap_t         *keywordMapNN;
//	kArray         *packageList;
//	struct kmap_t         *packageMapNO;
//	kKonohaSpace         *rootks;
//
//	kMethod *UndefinedParseExpr;
//	kMethod *UndefinedStmtTyCheck;
//	kMethod *UndefinedExprTyCheck;
//	kMethod *ParseExpr_Term;
//	kMethod *ParseExpr_Op;
//
//	// export
//	keyword_t  (*keyword)(CTX, const char*, size_t, ksymbol_t);
//	void (*KonohaSpace_setTokenizer)(CTX, kKonohaSpace *ks, int ch, Ftokenizer f, kMethod *mtd/*future extension*/);
//	void (*KonohaSpace_tokenize)(CTX, kKonohaSpace *, const char *, kline_t, kArray *);
//
//	kExpr* (*Expr_setConstValue)(CTX, kExpr *expr, ktype_t ty, kObject *o);
//	kExpr* (*Expr_setNConstValue)(CTX, kExpr *expr, ktype_t ty, uintptr_t ndata);
//	kExpr* (*Expr_setVariable)(CTX, kExpr *expr, kexpr_t build, ktype_t ty, intptr_t index, kGamma *gma);
//
//	kToken* (*Stmt_token)(CTX, kStmt *stmt, keyword_t kw, kToken *def);
//	kExpr* (*Stmt_expr)(CTX, kStmt *stmt, keyword_t kw, kExpr *def);
//	const char* (*Stmt_text)(CTX, kStmt *stmt, keyword_t kw, const char *def);
//	kBlock* (*Stmt_block)(CTX, kStmt *stmt, keyword_t kw, kBlock *def);
//
//	kExpr*     (*Expr_tyCheckAt)(CTX, kExpr *, size_t, kGamma *, ktype_t, int);
//	kbool_t    (*Stmt_tyCheckExpr)(CTX, kStmt*, ksymbol_t, kGamma *, ktype_t, int);
//	kbool_t    (*Block_tyCheckAll)(CTX, kBlock *, kGamma *);
//	kExpr *    (*Expr_tyCheckCallParams)(CTX, kExpr *, kMethod *, kGamma *, ktype_t);
//	kExpr *    (*new_TypedMethodCall)(CTX, ktype_t ty, kMethod *mtd, kGamma *gma, int n, ...);
//	void       (*Stmt_toExprCall)(CTX, kStmt *stmt, kMethod *mtd, int n, ...);
//
//	size_t     (*p)(CTX, int pe, kline_t uline, int lpos, const char *fmt, ...);
//	kline_t    (*Expr_uline)(CTX, kExpr *expr, int level);
//	ksyntax_t* (*KonohaSpace_syntax)(CTX, kKonohaSpace *, ksymbol_t, int);
//	void       (*KonohaSpace_defineSyntax)(CTX, kKonohaSpace *, KDEFINE_SYNTAX *);
//
//	kbool_t    (*makeSyntaxRule)(CTX, kArray*, int, int, kArray *);
//	kBlock*    (*new_Block)(CTX, kKonohaSpace *, kStmt *, kArray *, int, int, int);
//	void       (*Block_insertAfter)(CTX, kBlock *bk, kStmt *target, kStmt *stmt);
//
//	kExpr*     (*Stmt_newExpr2)(CTX, kStmt *stmt, kArray *tls, int s, int e);
//	kExpr*     (*new_ConsExpr)(CTX, ksyntax_t *syn, int n, ...);
//	kExpr *    (*Stmt_addExprParams)(CTX, kStmt *, kExpr *, kArray *tls, int s, int e, int allowEmpty);
//	kExpr *    (*Expr_rightJoin)(CTX, kExpr *, kStmt *, kArray *, int, int, int);
//} kmodsugar_t;
//
//#define EXPORT_SUGAR(base) \
//	base->keyword             = keyword;\
//	base->KonohaSpace_setTokenizer = KonohaSpace_setTokenizer;\
//	base->KonohaSpace_tokenize = KonohaSpace_tokenize;\
//	base->p                   = sugar_p;\
//	base->Expr_uline          = Expr_uline;\
//	base->Stmt_token          = Stmt_token;\
//	base->Stmt_block          = Stmt_block;\
//	base->Stmt_expr           = Stmt_expr;\
//	base->Stmt_text           = Stmt_text;\
//	base->Expr_setConstValue  = Expr_setConstValue;\
//	base->Expr_setNConstValue  = Expr_setNConstValue;\
//	base->Expr_setVariable    = Expr_setVariable;\
//	base->Expr_tyCheckAt      = Expr_tyCheckAt;\
//	base->Stmt_tyCheckExpr    = Stmt_tyCheckExpr;\
//	base->Block_tyCheckAll    = Block_tyCheckAll;\
//	base->Expr_tyCheckCallParams = Expr_tyCheckCallParams;\
//	base->new_TypedMethodCall = new_TypedMethodCall;\
//	base->Stmt_toExprCall     = Stmt_toExprCall;\
//	/*syntax*/\
//	base->KonohaSpace_defineSyntax  = KonohaSpace_defineSyntax;\
//	base->KonohaSpace_syntax        = KonohaSpace_syntax;\
//	base->makeSyntaxRule     = makeSyntaxRule;\
//	/*ast*/\
//	base->new_Block          = new_Block;\
//	base->Block_insertAfter  = Block_insertAfter;\
//	base->Stmt_newExpr2      = Stmt_newExpr2;\
//	base->new_ConsExpr       = new_ConsExpr;\
//	base->Stmt_addExprParams = Stmt_addExprParams;\
//	base->Expr_rightJoin     = Expr_rightJoin;\
//
//
//typedef struct {
//	kmodlocal_t h;
//	kArray *tokens;
//	karray_t cwb;
//	int     err_count;
//	kArray *errors;
//	kBlock *singleBlock;
//	kGamma *gma;
//	kArray *lvarlst;
//	kArray *definedMethods;
//} ctxsugar_t;
//
//#define TPOL_NOCHECK              1
//#define TPOL_ALLOWVOID      (1 << 1 kObjectHeader ;)
//#define TPOL_COERCION       (1 << 2)
//
//#ifdef USING_SUGAR_AS_BUILTIN
//
//#define KW_(T)                      keyword(_ctx, T, sizeof(T)-1, FN_NONAME)
//#define SYN_(KS, KW)                KonohaSpace_syntax(_ctx, KS, KW, 0)
//
//#define kStmt_token(STMT, KW, DEF)  Stmt_token(_ctx, STMT, KW, DEF)
//#define kStmt_expr(STMT, KW, DEF)   Stmt_expr(_ctx, STMT, KW, DEF)
//#define kStmt_text(STMT, KW, DEF)   Stmt_text(_ctx, STMT, KW, DEF)
//#define kStmt_block(STMT, KW, DEF)  Stmt_block(_ctx, STMT, KW, DEF)
//
//#define kExpr_uline(EXPR)           Expr_uline(_ctx, EXPR, 0)
//#define new_ConstValue(T, O)  Expr_setConstValue(_ctx, NULL, T, UPCAST(O))
//#define kExpr_setConstValue(EXPR, T, O)  Expr_setConstValue(_ctx, EXPR, T, UPCAST(O))
//#define new_NConstValue(T, D)  Expr_setNConstValue(_ctx, NULL, T, D)
//#define kExpr_setNConstValue(EXPR, T, D)  Expr_setNConstValue(_ctx, EXPR, T, D)
//#define new_Variable(B, T, I, G)          Expr_setVariable(_ctx, NULL, TEXPR_##B, T, I, G)
//#define kExpr_setVariable(E, B, T, I, G)  Expr_setVariable(_ctx, E, TEXPR_##B, T, I, G)
//#define kExpr_tyCheckAt(E, N, GMA, T, P)     Expr_tyCheckAt(_ctx, E, N, GMA, T, P)
//#define kStmt_tyCheck(E, NI, GMA, T, P)      Stmt_tyCheck(_ctx, STMT, NI, GMA, T, P)
//
//#else/*SUGAR_EXPORTS*/
//#define USING_SUGAR                          const kmodsugar_t *_e = (const kmodsugar_t *)kmodsugar
//#define SUGAR                                _e->
//#define TY_KonohaSpace                       _e->cKonohaSpace->cid
//#define TY_Token                             _e->cToken->cid
//#define TY_Stmt                              _e->cStmt->cid
//#define TY_Block                             _e->cBlock->cid
//#define TY_Expr                              _e->cExpr->cid
//#define TY_Gamma                             _e->cGamma->cid
//#define TY_TokenArray                        _e->cTokenArray->cid
// kObjectHeader ;
//#define KW_(T)                               _e->keyword(_ctx, T, sizeof(T)-1, FN_NONAME)
//#define SYN_(KS, KW)                         _e->KonohaSpace_syntax(_ctx, KS, KW, 0)
//#define NEWSYN_(KS, KW)                      (struct _ksyntax*)_e->KonohaSpace_syntax(_ctx, KS, KW, 1)
//
//#define kStmt_token(STMT, KW, DEF)           _e->Stmt_token(_ctx, STMT, KW, DEF)
//#define kStmt_expr(STMT, KW, DEF)            _e->Stmt_expr(_ctx, STMT, KW, DEF)
//#define kStmt_text(STMT, KW, DEF)            _e->Stmt_text(_ctx, STMT, KW, DEF)
//#define kStmt_block(STMT, KW, DEF)           _e->Stmt_block(_ctx, STMT, KW, DEF)
//
//#define kExpr_uline(EXPR)                    _e->Expr_uline(_ctx, EXPR, 0)
//#define new_ConstValue(T, O)                 _e->Expr_setConstValue(_ctx, NULL, T, UPCAST(O))
//#define kExpr_setConstValue(EXPR, T, O)      _e->Expr_setConstValue(_ctx, EXPR, T, UPCAST(O))
//#define new_NConstValue(T, D)                _e->Expr_setNConstValue(_ctx, NULL, T, D)
//#define kExpr_setNConstValue(EXPR, T, D)     _e->Expr_setNConstValue(_ctx, EXPR, T, D)
//#define new_Variable(B, T, I, G)             _e->Expr_setVariable(_ctx, NULL, TEXPR_##B, T, I, G)
//#define kExpr_setVariable(E, B, T, I, G)     _e->Expr_setVariable(_ctx, E, TEXPR_##B, T, I, G)
//#define kExpr_tyCheckAt(E, N, GMA, T, P)     _e->Expr_tyCheckAt(_ctx, E, N, GMA, T, P)
//#define kStmt_tyCheck(E, NI, GMA, T, P)      _e->Stmt_tyCheck(_ctx, STMT, NI, GMA, T, P)
//
//#endif/*SUGAR_EXPORTS*/
//
/////* ------------------------------------------------------------------------ */
//
//static inline const char *T_kw_(CTX, keyword_t kw)
//{
//	kArray *a = kmodsugar->keywordList;
//	DBG_ASSERT(kw < kArray_size(a));
//	return S_text(a->strings[kw]);
//}
//
//// In future, typeof operator is introduced
//#define TK_isType(TK)    ((TK)->kw == KW_Type)
//#define TK_type(TK)       (TK)->ty
//
//#define kStmt_ks(STMT)   Stmt_ks(_ctx, STMT)
//static inline kKonohaSpace *Stmt_ks(CTX, kStmt *stmt)
//{
//	return stmt->parentNULL->ks;
//}
//
//#define kStmt_setsyn(STMT, S)  Stmt_setsyn(_ctx, STMT, S)
//#define kStmt_done(STMT)       Stmt_setsyn(_ctx, STMT, NULL)
//static inline void Stmt_setsyn(CTX, kStmt *stmt, ksyntax_t *syn)
//{
////	if(syn == NULL && stmt->syn != NULL) {
////		DBG_P("DONE: STMT='%s'", T_kw(syn->kw));
////	}
//	((struct _kStmt*)stmt)->syn = syn;
//}
//
//#define kStmt_typed(STMT, T)  Stmt_typed(STMT, TSTMT_##T)
//static inline void Stmt_typed(kStmt *stmt, int build)
//{
//	((struct _kStmt*)stmt)->build = build;
//}
//
//static inline void kExpr_setsyn(kExpr *expr, ksyntax_t *syn)
//{
//	((struct _kExpr*)expr)->syn = syn;
//}
//
//#define kExpr_typed(E, B, TY)   Expr_typed(E, TEXPR_##B, TY)
//static inline kExpr *Expr_typed(kExpr *expr, int build, ktype_t ty)
//{
//	((struct _kExpr*)expr)->build = build;
//	((struct _kExpr*)expr)->ty = ty;
//	return expr;
//}
//
//
//#ifdef __cplusplus
//}
//#endif
//
///* ------------------------------------------------------------------------ */
//
//
//#endif /* SUGAR_H_ */
