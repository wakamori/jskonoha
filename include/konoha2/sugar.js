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
konoha.tenv_t = function() {
	this.source = null; //const char* => String
	this.uline = null; //kline_t
	this.list = new konoha.kArray(); //kArray*
	this.bol = null; //const char* => Number
	this.indent_tab = null; //int => Number
	this.fmat = null; //Ftokenizer*
}
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

konoha.TEXPR_LOCAL_     =  -4;   /*THIS IS NEVER PASSED*/
konoha.TEXPR_BLOCK_     =  -3;   /*THIS IS NEVER PASSED*/
konoha.TEXPR_FIELD_     =  -2;   /*THIS IS NEVER PASSED*/
konoha.TEXPR_shift      =  (konoha.TEXPR_LOCAL - (konoha.TEXPR_LOCAL_));
konoha.TEXPR_UNTYPED    =  -1;   /*THIS MUST NOT HAPPEN*/
konoha.TEXPR_CONST      =   0;
konoha.TEXPR_NEW        =   1;
konoha.TEXPR_NULL       =   2;
konoha.TEXPR_NCONST     =   3;
konoha.TEXPR_LOCAL      =   4;
konoha.TEXPR_BLOCK      =   5;
konoha.TEXPR_FIELD      =   6;
konoha.TEXPR_BOX        =   7;
konoha.TEXPR_UNBOX      =   8;
konoha.TEXPR_CALL       =   9;
konoha.TEXPR_AND        =  10;
konoha.TEXPR_OR         =  11;
konoha.TEXPR_LET        =  12;
konoha.TEXPR_STACKTOP   =  13;
konoha.TEXPR_MAX        =  14;

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

konoha.TSTMT_UNDEFINED    = 0;
konoha.TSTMT_ERR          = 1;
konoha.TSTMT_EXPR         = 2;
konoha.TSTMT_BLOCK        = 3;
konoha.TSTMT_RETURN       = 4;
konoha.TSTMT_IF           = 5;
konoha.TSTMT_LOOP         = 6;
konoha.TSTMT_JUMP         = 7;

konoha.kStmt = function() {
	this.h = new konoha.kObjectHeader();				//	kObjectHeader;
	this.uline = null;			//	kline_t;
	this.syn = null;			//	ksyntax_t *;
	this.parentNULL = null	//	const struct _kBlock *;
	this.build = null;			//	kushort_t;
};

konoha.kBlock = function(conf) {
	this.h = new konoha.kObjectHeader();				//kObjectHeader
	this.ks = conf;			//kKonohaSpace *
	this.parentNULL = null;	//kStmt *
	this.blocks = new konoha.kArray();		//kArray *
	this.esp = null;			//kExpr *
};

konoha.SYNFLAG_ExprTerm        = 1;
konoha.SYNFLAG_ExprOp          = 1 << 1;
konoha.SYNFLAG_ExprLeftJoinOp2 = 1 << 2;
konoha.SYNFLAG_ExprPostfixOp2  = 1 << 3;

konoha.SYNFLAG_StmtBreakExec   = 1 << 8;
konoha.SYNFLAG_StmtJumpAhead   = 1 << 9;
konoha.SYNFLAG_StmtJumpSkip    = 1 << 10;

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

konoha.Stmt_ks = function(stmt)
{
	return stmt.parentNULL.ks;
}
