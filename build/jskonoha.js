konoha = {};

konoha.Enum = function() {
	for (var i in arguments) {
		this[arguments[i]] = i;
	}
};

konoha.isalpha = function(c) { //only use string which is single letter
	var cc = c.charCodeAt(0);
	if ((65 <= cc && cc <= 90) ||
		(97 <= cc && cc <= 122)) {
		return true;
	}
	else {
		return false;
	}
}

konoha.isnum = function(str) { //ignore number of letters
	if (isNaN(Number(str))) {
		return false;
	}
	else {
		return true;
	}
}

konoha.isalnum = function(c) {
	if (konoha.isalpha(c) &&
		Konoha.isnum(c)) {
		return true;
	}
	else {
		return false;
	}
}

konoha.assert = function(cond, msg) {
	if (!cond) {
		var e = "Assersion!! " + msg;
		console.log(e);
		throw e;
	}
}
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
//#ifndef KONOHA2_H_
//#define KONOHA2_H_
//
//#ifdef HAVE_CONFIG_H
//#include "config.h"
//#endif
//
//#define K_CLASSTABLE_INIT 64
//#define K_PAGESIZE        4096
//
//#ifndef K_OSDLLEXT
//#if defined(__APPLE__)
//#define K_OSDLLEXT        ".dylib"
//#elif defined(__linux__)
//#define K_OSDLLEXT        ".so"
//#endif
//#endif
//
//#ifndef K_REVISION
//#define K_REVISION  1
//#endif
//
//#define K_USING_UTF8 1
//
//#define USE_BUILTINTEST  1
//
////#include"konoha2/konoha_config.h"
//
//#include <stdio.h>
//#include <stdlib.h>
//#include <stddef.h>
//#include <ctype.h>
//#include <assert.h>
//#include <string.h>
//#include <setjmp.h>
//#include <stdarg.h>
//
//#if defined(K_USING_SIGNAL)
//#include <signal.h>
//#endif
//
//#if defined(K_USING_PTHREAD)
//#include <pthread.h>
//#endif
//
///* ------------------------------------------------------------------------ */
///* type */
//
//#include <limits.h>
//#include <float.h>
//
//#include <stdbool.h>
//#include <stdint.h>
//
//#if defined(__LP64__) || defined(_WIN64)
//#define K_USING_SYS64_    1
//typedef int32_t           kshort_t;
//typedef uint32_t          kushort_t;
//#ifdef K_USING_NOFLOAT
//typedef uintptr_t         kfloat_t;
//#else
//typedef double            kfloat_t;
//#endif
//#else
//typedef int16_t           kshort_t;
//typedef uint16_t          kushort_t;
//#ifdef K_USING_NOFLOAT
//typedef uintptr_t         kfloat_t;
//#else
//typedef float             kfloat_t;
//#endif
//#endif
//
//typedef bool             kbool_t;
//
//typedef enum {
//	K_FAILED, K_CONTINUE, K_BREAK
//} kstatus_t;
//
//typedef intptr_t         kint_t;
//typedef uintptr_t        kuint_t;
//
//#ifdef K_USING_SYS64_
//
//#ifndef LLONG_MIN
//#define LLONG_MIN -9223372036854775807LL
//#define LLONG_MAX  9223372036854775807LL
//#endif
//
//#ifndef ULLONG_MAX
//#define ULLONG_MAX 18446744073709551615ULL
//#endif
//
//#define KINT_MAX               LLONG_MAX
//#define KINT_MIN               LLONG_MIN
//#define KINT_FMT               "%lld"
//
//#else/*K_USING_SYS64_*/
//
//#define KINT_MAX               LONG_MAX
//#define KINT_MIN               LONG_MIN
//#define KINT_FMT               "%ld"
//#define KINT0                  0UL
//
//#endif/*K_USING_SYS64_*/
//
//typedef intptr_t         kindex_t;
//typedef kushort_t        kflag_t;    /* flag field */
//
//#ifdef __GCC__
//#define __PRINT_FMT(idx1, idx2) __attribute__((format(printf, idx1, idx2)))
//#else
//#define __PRINT_FMT(idx1, idx2)
//#endif
//
//#define KFLAG_H(N)               ((sizeof(kflag_t)*8)-N)
//#define KFLAG_H0                 ((kflag_t)(1 << KFLAG_H(1)))
//#define KFLAG_H1                 ((kflag_t)(1 << KFLAG_H(2)))
//#define KFLAG_H2                 ((kflag_t)(1 << KFLAG_H(3)))
//#define KFLAG_H3                 ((kflag_t)(1 << KFLAG_H(4)))
//#define KFLAG_H4                 ((kflag_t)(1 << KFLAG_H(5)))
//#define KFLAG_H5                 ((kflag_t)(1 << KFLAG_H(6)))
//#define KFLAG_H6                 ((kflag_t)(1 << KFLAG_H(7)))
//#define KFLAG_H7                 ((kflag_t)(1 << KFLAG_H(8)))
//
//#define TFLAG_is(T,f,op)          (((T)(f) & (T)(op)) == (T)(op))
//#define TFLAG_set1(T,f,op)        f = (((T)(f)) | ((T)(op)))
//#define TFLAG_set0(T,f,op)        f = (((T)(f)) & (~((T)(op))))
//#define TFLAG_set(T,f,op,b)       if(b) {TFLAG_set1(T,f,op);} else {TFLAG_set0(T,f,op);}
//
//#define FLAG_set(f,op)            TFLAG_set1(kflag_t,f,op)
//#define FLAG_unset(f,op)          TFLAG_set0(kflag_t,f,op)
//#define FLAG_is(f,op)             TFLAG_is(kflag_t,f,op)
//
///* uline */
//
//typedef kushort_t                 kfileid_t;
//#define URI_unknown               ((kfileid_t)-1)
//#define URI_EVAL                  ((kfileid_t)0)
//#define URI_UNMASK(fileid)           (fileid)
//
//#define URI__(fileid) S_text(knh_getURN(_ctx, fileid))
//#define shortname__(fileid) knh_sfile(URI__(fileid))
//
//typedef uintptr_t                 kline_t;
//#define NOPLINE                   0
//#define new_ULINE(fileid, line)       ((((kline_t)fileid) << (sizeof(kfileid_t) * 8)) | ((kushort_t)line))
//#define ULINE_setURI(line, fileid)    line |= (((kline_t)fileid) << (sizeof(kfileid_t) * 8))
//#define ULINE_fileid(line)            ((kfileid_t)(line >> (sizeof(kfileid_t) * 8)))
//#define ULINE_line(line)           (line & (kline_t)((kfileid_t)-1))
//
//#define kjmpbuf_t       sigjmp_buf
//#define ksetjmp(B)      sigsetjmp(B, 0)
//#define klongjmp(B, N)  siglongjmp(B, N)
//
///* ------------------------------------------------------------------------ */
//
//#define COMMON_BYTEARRAY \
//		size_t bytesize;\
//		union {\
//			const char *byteptr;\
//			const char *text;\
//			const unsigned char *utext;\
//			char *buf;\
//			unsigned char *ubuf;\
//		}\
//
//#define KARRAYSIZE(BS, T)   ((BS)/sizeof(T##_t))
//
//typedef struct {
//	size_t bytesize;
//	union {
//		char  *bytebuf;
//		const struct _kclass **cts;
//		struct kvs_t          *kvs;
//		struct kopl_t          *opl;
//		const struct _kObject **objects;
//		struct _kObject       **refhead;  // stack->ref
//	};
//	size_t bytemax;
//} karray_t ;
//
//typedef struct kwb_t {
//	karray_t *m;
//	size_t pos;
//} kwb_t;
//
//// kmap
//
//typedef struct kmape_t {
//	uintptr_t hcode;
//	struct kmape_t *next;
//	union {
//		const struct _kString  *skey;
//		uintptr_t        ukey;
//		void            *pkey;
//	};
//	union {
//		const struct _kObject  *ovalue;
//		void            *pvalue;
//		uintptr_t        uvalue;
//	};
//} kmape_t;
//
//typedef struct kmap_t {
//	kmape_t *arena;
//	kmape_t *unused;
//	kmape_t **hentry;
//	size_t arenasize;
//	size_t size;
//	size_t hmax;
//} kmap_t;
//
//// classdef_t
//
//typedef kushort_t       kpack_t;   /* package id*/
//typedef kushort_t       kcid_t;    /* class id */
//typedef kushort_t       ktype_t;     /* extended ktype_t */
//typedef kushort_t       ksymbol_t;
//typedef kushort_t       kuname_t;
//typedef kushort_t       kmethodn_t;
//
///* kcid_t */
konoha.CLASS_newid = -1;      //  ((kcid_t)-1)
konoha.TY_unknown = -2;      //  ((kcid_t)-2)
//
//#define CT_(t)              (_ctx->share->ca.cts[t])
//#define TY_isUnbox(t)       FLAG_is(CT_(t)->cflag, kClass_UnboxType)
//#define CT_isUnbox(C)       FLAG_is(C->cflag, kClass_UnboxType)
//
//#define FN_NONAME          ((ksymbol_t)-1)
//#define FN_NEWID           ((ksymbol_t)-2)
//#define _NEWID             FN_NEWID
//#define FN_UNMASK(fnq)     (fnq & (~(KFLAG_H0|KFLAG_H1|KFLAG_H2)))
//#define FN_BOXED           KFLAG_H0
//#define FN_UNBOX(fn)       (fn & ~(FN_BOXED))
//#define FN_isBOXED(fn)     ((fn & FN_BOXED) == FN_BOXED)
//
//#define FN_COERCION        KFLAG_H0
//#define FN_Coersion        FN_COERCION
//#define FN_isCOERCION(fn)  ((fn & FN_COERCION) == FN_COERCION)
//
//#define MN_NONAME    ((kmethodn_t)-1)
//#define MN_NEWID     ((kmethodn_t)-2)
//
//#define MN_UNMASK(fnq)       (fnq & (~(KFLAG_H0|KFLAG_H1|KFLAG_H2)))
//#define MN_ISBOOL     KFLAG_H0
//#define MN_GETTER     KFLAG_H1
//#define MN_SETTER     KFLAG_H2
//#define MN_TOCID      (KFLAG_H0|KFLAG_H1)
//#define MN_ASCID      (KFLAG_H0|KFLAG_H1|KFLAG_H2)
//
//#define MN_isISBOOL(mn)   ((mn & MN_ISBOOL) == MN_ISBOOL)
//#define MN_toISBOOL(mn)   (mn | MN_ISBOOL)
//#define MN_isGETTER(mn)   ((mn & MN_GETTER) == MN_GETTER)
//#define MN_toGETTER(mn)   (mn | MN_GETTER)
//#define MN_isSETTER(mn)   ((mn & MN_SETTER) == MN_SETTER)
//#define MN_toSETTER(mn)   ((MN_UNMASK(mn)) | MN_SETTER)
//
//#define MN_to(cid)        (cid | MN_TOCID)
//#define MN_isTOCID(mn)    ((mn & MN_TOCID) == MN_TOCID)
//#define MN_as(cid)        (cid | MN_ASCID)
//#define MN_isASCID(mn)    ((mn & MN_ASCID) == MN_ASCID)
//
///* ------------------------------------------------------------------------ */
//
//typedef const struct kcontext_t* konoha_t;
//
//struct  kcontext_t;
//typedef const struct kcontext_t *const CTX_t;
//#define CTX      CTX_t _ctx
//
//#define MOD_MAX    128
//struct _kObject;




konoha.MOD_logger =  0
konoha.MOD_gc     =  1
konoha.MOD_code   =  2
konoha.MOD_sugar  =  3
konoha.MOD_float  = 11
konoha.MOD_iconv  = 13

//struct kmodlocal_t;
//typedef struct kmodlocal_t {
//	uintptr_t unique;
//	void (*reftrace)(CTX, struct kmodlocal_t *);
//	void (*free)(CTX, struct kmodlocal_t *);
//} kmodlocal_t;
//
//struct kmodshare_t;
//typedef struct kmodshare_t {
//	const char *name;
//	int mod_id;
//	void (*setup)(CTX, struct kmodshare_t *, int newctx);
//	void (*reftrace)(CTX, struct kmodshare_t *);
//	void (*free)(CTX, struct kmodshare_t *);
//} kmodshare_t;
//
//#define CTX_isInteractive()  1
//#define CTX_isCompileOnly()  0
//#define CTX_isDebug()        0
//
//typedef struct kcontext_t {
//	int						          safepoint; // set to 1
//	struct ksfp_t                    *esp;
//	const struct _klib2              *lib2;
//	/* TODO(imasahiro)
//	 * checking modgc performance and remove
//	 * memshare/memlocal from context
//	 */
//	struct kmemshare_t                *memshare;
//	struct kmemlocal_t                *memlocal;
//	struct kshare_t                   *share;
//	struct klocal_t                   *local;
//	struct kstack_t                   *stack;
//	struct klogger_t                  *logger;
//	struct kmodshare_t               **modshare;
//	struct kmodlocal_t               **modlocal;
//} kcontext_t ;
//
//typedef struct kshare_t {
//	karray_t ca;
//	struct kmap_t         *lcnameMapNN;
//	/* system shared const */
//	const struct _kObject       *constNull;
//	const struct _kBoolean      *constTrue;
//	const struct _kBoolean      *constFalse;
//	const struct _kString       *emptyString;
//	const struct _kArray        *emptyArray;
//	const struct _kParam        *nullParam;
//	const struct _kParam        *defParam;
//
//	const struct _kArray         *fileidList;    // file, http://
//	struct kmap_t         *fileidMapNN;   //
//	const struct _kArray         *packList;   // are you using this?
//	struct kmap_t         *packMapNN;
//	const struct _kArray         *unameList;  // NAME, Name, INT_MAX Int_MAX
//	struct kmap_t         *unameMapNN;
//	const struct _kArray         *symbolList;   // name, f,
//	struct kmap_t         *symbolMapNN;
//} kshare_t ;
//
//#define K_FRAME_NCMEMBER \
//		uintptr_t   ndata;  \
//		kbool_t     bvalue; \
//		kint_t      ivalue; \
//		kuint_t     uvalue; \
//		kfloat_t    fvalue; \
//		intptr_t    shift;  \
//		uintptr_t   uline; \
//		struct kopl_t  *pc; \
//		const struct _kMethod *mtdNC; \
//		const char     *fname \
//
//#define K_FRAME_MEMBER \
//		const struct _kObject *o;  \
//		struct _kObject       *Wo; \
//		const struct _kInt    *i; \
//		const struct _kFloat *f; \
//		const struct _kString *s; \
//		struct kClass  *c; \
//		struct kDate *dt;\
//		const struct _kBytes  *ba; \
//		struct kRegex  *re; \
//		struct kRange  *range; \
//		const struct _kArray  *a; \
//		struct kIterator *it; \
//		struct kMap           *m;    \
//		struct kFunc         *fo; \
//		struct kPath         *pth; \
//		struct kInputStream  *in; \
//		struct kOutputStream *w;  \
//		struct kView *rel;\
//		const struct _kMethod            *mtd;\
//		struct kException         *e;\
//		struct kExceptionHandler  *hdr; \
//		const struct _kKonohaSpace             *ks;\
//		const struct _kObject   *p; \
//		struct kConverter         *conv;\
//		struct kContext           *cx;\
//		struct kScript            *scr;\
//		const struct _kToken             *tk;\
//		const struct _kStmt              *stmt;\
//		const struct _kExpr              *expr;\
//		const struct _kBlock             *bk;\
//		struct _kGamma  *gma;\
//		kint_t     dummy_ivalue;\
//		kfloat_t   dummy_fvalue \
//
//typedef struct ksfp_t {
//	union {
//		K_FRAME_MEMBER;
//	};
//	union {
//		K_FRAME_NCMEMBER;
//	};
//} ksfp_t;
//
//typedef struct krbp_t {
//	union {
//		K_FRAME_NCMEMBER;
//		K_FRAME_MEMBER;
//	};
//} krbp_t;
//
//typedef struct kstack_t {
//	struct ksfp_t*               stack;
//	size_t                       stacksize;
//	struct ksfp_t*               stack_uplimit;
//	const struct _kArray        *gcstack;
//	karray_t                     cwb;
//	CTX_t                        *rootctx;
//	void*                        cstack_bottom;  // for GC
//	karray_t                     ref;   // reftrace
//	struct _kObject**            reftail;
//	ktype_t   evalty;
//	kushort_t evalidx;
//	kjmpbuf_t* evaljmpbuf;
//} kstack_t;
//
//typedef struct kfield_t {
//	kflag_t    flag    ;
//	kshort_t   isobj   ;
//	ktype_t    ty      ;
//	ksymbol_t  fn      ;
//} kfield_t ;
//
//#define P_STR    0
//#define P_DUMP   1
//
//struct _kclass;
//
//#define KCLASSSPI \
//		void (*init)(CTX, const struct _kObject*, void *conf);\
//		void (*reftrace)(CTX, const struct _kObject*);\
//		void (*free)(CTX, const struct _kObject*);\
//		const struct _kObject* (*fnull)(CTX, const struct _kclass*);\
//		void (*p)(CTX, ksfp_t *, int, kwb_t *, int);\
//		uintptr_t (*unbox)(CTX, const struct _kObject*);\
//		int  (*compareTo)(const struct _kObject*, const struct _kObject*);\
//		void (*initdef)(CTX, struct _kclass*, kline_t);\
//		kbool_t (*issubtype)(CTX, const struct _kclass*, const struct _kclass*);\
//		const struct _kclass* (*realtype)(CTX, const struct _kclass*, const struct _kclass*)
//
//typedef struct KDEFINE_CLASS {
//	const char *structname;
//	kcid_t     cid;         kflag_t    cflag;
//	kcid_t     bcid;        kcid_t     supcid;
//	ktype_t    rtype;       kushort_t  psize;
//	struct kparam_t   *cparams;
//	size_t     cstruct_size;
//	kfield_t   *fields;
//	kushort_t  fsize;       kushort_t fallocsize;
//	KCLASSSPI;
//} KDEFINE_CLASS;
//
//#define STRUCTNAME(C) \
//	.structname = #C,\
//	.cid = CLASS_newid,\
//	.cstruct_size = sizeof(k##C)\
//
//struct _kString;
//struct _kObject;
////struct _kclass;
//typedef uintptr_t kmagicflag_t;
//
konoha.kclass = function() {
//	KCLASSSPI;
	this.packid = null;			//kpack_t
	this.packdom = null;			//kpack_t
	this.cid = null;				//kcid_t
	this.cflag = null;				//kflag_t
	this.bcid = null;				//kcid_t
	this.supcid = null;			//kcid_t
	this.magicflag = null;			//magicflag_t
	this.cstruct_size = null;		//size_t
	this.fields = null;			//kfield_t *
	this.fsize = null;				//kushort_t
	this.fallocsize = null;		//kushort_t
	this.DBG_NAME = null;			//const char *
	this.nameid = null;			//kuname_t
	this.optvalue = null;			//kushort_t
//
	this.cparam = null;			//const struct _kParam *
	this.methods = null;			//const struct _kArray *
	this.shortNameNULL = null;		//const struct _kString *
//	union {   // default value
		this.nulvalNUL = null;		//const struct _kObject *
		this.WnulvalNUl = null;	//struct _kObject *
//	};
	this.constPoolMapNO = null;	//struct kmap_t *
	this.searchSimilarClassNULL = null;	//kclass_t
	this.searchSuperMethodClassNULL = null;//kclass_t *
};
//
///* ----------------------------------------------------------------------- */
///* CLASS */
//
///* ------------------------------------------------------------------------ */
///* mini konoha */
//
//#define CLASS_Tvoid             ((kcid_t)0)
//#define CLASS_Tvar              ((kcid_t)1)
//#define CLASS_Object            ((kcid_t)2)
//#define CLASS_Boolean           ((kcid_t)3)
//#define CLASS_Int               ((kcid_t)4)
//#define CLASS_String            ((kcid_t)5)
//#define CLASS_Param             ((kcid_t)6)
//#define CLASS_Method            ((kcid_t)7)
//#define CLASS_Array             ((kcid_t)8)
//#define CLASS_System            ((kcid_t)9)
//#define CLASS_T0                ((kcid_t)10)    /* ParamType*/
//
//#define CT_Object               CT_(CLASS_Object)
//#define CT_Boolean              CT_(CLASS_Boolean)
//#define CT_Int                  CT_(CLASS_Int)
//#define CT_String               CT_(CLASS_String)
//#define CT_Array                CT_(CLASS_Array)
//#define CT_Param                CT_(CLASS_Param)
//#define CT_Method               CT_(CLASS_Method)
//
//#define CT_StringArray          CT_Array
//#define kStringArray            kArray
//#define CT_MethodArray          CT_Array
//#define kMethodArray            kArray
//
//#define kClass_Ref              ((kflag_t)(1<<0))
//#define kClass_Prototype        ((kflag_t)(1<<1))
//#define kClass_Immutable        ((kflag_t)(1<<2))
//#define kClass_Private          ((kflag_t)(1<<4))
//#define kClass_Final            ((kflag_t)(1<<5))
//#define kClass_Singleton        ((kflag_t)(1<<6))
//#define kClass_UnboxType        ((kflag_t)(1<<7))
//#define kClass_Interface        ((kflag_t)(1<<8))
//#define kClass_TypeVar          ((kflag_t)(1<<9))
//
////#define T_isRef(t)          (TFLAG_is(kflag_t,(ClassTBL(t))->cflag, kClass_Ref))
////#define T_isPrototype(t)    (TFLAG_is(kflag_t,(ClassTBL(t))->cflag, kClass_Expando))
////#define T_isImmutable(t)    (TFLAG_is(kflag_t,(ClassTBL(t))->cflag, kClass_Immutable))
//#define CT_isPrivate(ct)      (TFLAG_is(kflag_t,(ct)->cflag, kClass_Private))
////#define T_isFinal(t)        (TFLAG_is(kflag_t,(ClassTBL(t))->cflag, kClass_Final))
//
//#define TY_isSingleton(T)     (TFLAG_is(kflag_t,(CT_(T))->cflag, kClass_Singleton))
//#define CT_isSingleton(ct)    (TFLAG_is(kflag_t,(ct)->cflag, kClass_Singleton))
//
//#define CT_isFinal(ct)         (TFLAG_is(kflag_t,(ct)->cflag, kClass_Final))
//// this is used in konoha.class
//#define CT_isDefined(ct)  ((ct)->fallocsize == 0 || (ct)->fsize == (ct)->fallocsize)
//
////#define TY_isUnboxType(t)    (TFLAG_is(kflag_t,(ClassTBL(t))->cflag, kClass_UnboxType))
////#define T_isInterface(t)    (TFLAG_is(kflag_t,(ClassTBL(t))->cflag, kClass_Interface))
////#define T_isTypeVar(t)      (TFLAG_is(kflag_t,(ClassTBL(t))->cflag, kClass_TypeVar))
//
///* magic flag */
//#define MAGICFLAG(f)             (K_OBJECT_MAGIC | ((kmagicflag_t)(f) & K_CFLAGMASK))
//
//#define kObject_NullObject       ((kmagicflag_t)(1<<0))
//
//#define kObject_Local6           ((kmagicflag_t)(1<<10))
//#define kObject_Local5           ((kmagicflag_t)(1<<11))
//#define kObject_Local4           ((kmagicflag_t)(1<<12))
//#define kObject_Local3           ((kmagicflag_t)(1<<13))
//#define kObject_Local2           ((kmagicflag_t)(1<<14))
//#define kObject_Local1           ((kmagicflag_t)(1<<15))
//
//#define kObject_is(O,A)            (TFLAG_is(kmagicflag_t,(O)->h.magicflag,A))
//#define kObject_set(O,A,B)         TFLAG_set(kmagicflag_t,(O)->h.magicflag,A,B)
//
//#define kField_Hidden          ((kflag_t)(1<<0))
//#define kField_Protected       ((kflag_t)(1<<1))
//#define kField_Getter          ((kflag_t)(1<<2))
//#define kField_Setter          ((kflag_t)(1<<3))
//#define kField_Key             ((kflag_t)(1<<4))
//#define kField_Volatile        ((kflag_t)(1<<5))
//#define kField_ReadOnly        ((kflag_t)(1<<6))
//#define kField_Property        ((kflag_t)(1<<7))
//
///* ------------------------------------------------------------------------ */
///* Type Variable */
////## @TypeVariable class Tvoid Tvoid;
////## @TypeVariable class Tvar  Tvoid;
//
//#define OFLAG_Tvoid              MAGICFLAG(0)
//#define CFLAG_Tvoid              kClass_TypeVar|kClass_UnboxType|kClass_Singleton|kClass_Final
//#define TY_void                  CLASS_Tvoid
//#define OFLAG_Tvar               MAGICFLAG(0)
//#define CFLAG_Tvar               CFLAG_Tvoid
//#define TY_var                   CLASS_Tvar
//
///* ------------------------------------------------------------------------ */
//
//#define CFLAG_Object               0
//#define OFLAG_Object               MAGICFLAG(0)
//#define TY_Object                  CLASS_Object
//
//#define kObject_NullObject         ((kmagicflag_t)(1<<0))
//#define kObject_isNullObject(o)    (TFLAG_is(kmagicflag_t,(o)->h.magicflag,kObject_NullObject))
//#define kObject_setNullObject(o,b) TFLAG_set(kmagicflag_t,((struct _kObject*)o)->h.magicflag,kObject_NullObject,b)
//#define IS_NULL(o)                 ((((o)->h.magicflag) & kObject_NullObject) == kObject_NullObject)
//#define IS_NOTNULL(o)              ((((o)->h.magicflag) & kObject_NullObject) != kObject_NullObject)
//
//#define K_FASTMALLOC_SIZE  (sizeof(void*) * 8)
//
//#define K_OBJECT_MAGIC           (578L << ((sizeof(kflag_t)*8)))
//#define K_CFLAGMASK              (FLAG_Object_Ref)
//#define KNH_MAGICFLAG(f)         (K_OBJECT_MAGIC | ((kmagicflag_t)(f) & K_CFLAGMASK))
//#define DBG_ASSERT_ISOBJECT(o)   DBG_ASSERT(TFLAG_is(uintptr_t,(o)->h.magicflag, K_OBJECT_MAGIC))
//
konoha.kObjectHeader = function() {
	this.magicflag = null;				//kmagicflag_t
	this.ct = null;					//kclass_t
//	union {
		this.refc = null;				//uintptr_t
		this.gcinfo = null;			//void *
		this.hashcode = null;			//uintptr_t
//	};
	this.kvproto = null;				//karray_t *
};


konoha.kObject = function() {
	this.h = null;						//kObjectHeader
//	union {
		this.fields[4] = null;			//const struct _kObject
		this.ndata[4] = null;			//uintptr_t
//	};
};
//
//typedef struct kvs_t {
//	ksymbol_t key;
//	ktype_t   ty;
//	union {
//		uintptr_t                uval;
//		kObject                 *oval;
//		const struct _kString   *sval;
//	};
//} kvs_t;
//
//#define O_ct(o)             ((o)->h.ct)
//#define O_cid(o)            (O_ct(o)->cid)
//#define O_bcid(o)           (O_ct(o)->bcid)
//#define O_unbox(o)          (O_ct(o)->unbox(_ctx, o))
//#define O_p0(o)             (O_ct(o)->cparam->p[0].ty)
//
///* ------------------------------------------------------------------------ */
////## @Immutable class Boolean Object;
//
//#define CFLAG_Boolean              kClass_Immutable|kClass_UnboxType|kClass_Final
//#define OFLAG_Boolean              MAGICFLAG(0)
//#define TY_Boolean                 CLASS_Boolean
//#define IS_Boolean(o)              (O_cid(o) == CLASS_Boolean)
//
//#define ABSTRACT_NUMBER \
//		union {\
//			uintptr_t  ndata;\
//			kbool_t    bvalue;\
//			kint_t     ivalue;\
//			kuint_t    uvalue;\
//			kfloat_t   fvalue;\
//		}\
//
//typedef const struct _kNumber kNumber;
//struct _kNumber {
//	kObjectHeader h;
//	ABSTRACT_NUMBER;
//};
//
//typedef const struct _kBoolean kBoolean;
//struct _kBoolean /* extends kNumber */ {
//	kObjectHeader h;
//	ABSTRACT_NUMBER;
//};
//
//#define IS_TRUE(o)             (O_bcid(o) == CLASS_Boolean && N_tobool(o))
//#define IS_FALSE(o)            (O_bcid(o) == CLASS_Boolean && N_tobool(o) == 0)
//#define new_Boolean(_ctx, c)    ((c) ? K_TRUE : K_FALSE)
//#define N_toint(o)             (((kBoolean*)o)->ivalue)
//#define N_tofloat(o)           (((kBoolean*)o)->fvalue)
//#define N_tobool(o)            (((kBoolean*)o)->bvalue)
//
///* ------------------------------------------------------------------------ */
////## @Immutable class Int Number;
//
//#define CFLAG_Int              kClass_Immutable|kClass_UnboxType|kClass_Final
//#define OFLAG_Int              MAGICFLAG(0)
//#define TY_Int                 CLASS_Int
//#define IS_Int(o)              (O_cid(o) == CLASS_Int)
//
//typedef const struct _kInt kInt;
//struct _kInt /* extends kNumber */ {
//	kObjectHeader h;
//	ABSTRACT_NUMBER;
//	void *bignum;  /* reserved */
//};
//
///* ------------------------------------------------------------------------ */
///* String */
//
//#define CFLAG_String              kClass_Immutable|kClass_Final
//#define OFLAG_String              MAGICFLAG(0)
//#define TY_String                 CLASS_String
//#define TY_TEXT                   TY_void    /*special use for const char*/
//#define TY_TYPE                   TY_var     /*special use for kclass_t*/
//#define IS_String(o)              (O_cid(o) == CLASS_String)
//
///*
// * Bit encoding for Rope String
// * 5432109876543210
// * 000xxxxxxxxxxxxx ==> magicflag bit representation
// * 001xxxxxxxxxxxxx LinerString
// * 011xxxxxxxxxxxxx ExterenalString
// * 010xxxxxxxxxxxxx InlinedString
// * 100xxxxxxxxxxxxx RopeString
// */
//#define S_FLAG_MASK_BASE (13)
//#define S_FLAG_LINER     ((1UL << (0)))
//#define S_FLAG_NOFREE    ((1UL << (1)))
//#define S_FLAG_ROPE      ((1UL << (2)))
//#define S_FLAG_INLINE    (S_FLAG_NOFREE)
//#define S_FLAG_EXTERNAL  (S_FLAG_LINER | S_FLAG_NOFREE)
//
//#define S_isRope(o)          (TFLAG_is(uintptr_t,(o)->h.magicflag,kObject_Local1))
//#define S_isTextSgm(o)       (TFLAG_is(uintptr_t,(o)->h.magicflag,kObject_Local2))
//#define S_setTextSgm(o,b)    TFLAG_set(uintptr_t,(o)->h.magicflag,kObject_Local2,b)
//#define S_isMallocText(o)    (TFLAG_is(uintptr_t,(o)->h.magicflag,kObject_Local3))
//#define S_setMallocText(o,b) TFLAG_set(uintptr_t,(o)->h.magicflag,kObject_Local3,b)
//#define S_isASCII(o)         (TFLAG_is(uintptr_t,(o)->h.magicflag,kObject_Local4))
//#define S_setASCII(o,b)      TFLAG_set(uintptr_t,((struct _kObject*)o)->h.magicflag,kObject_Local4,b)
//#define S_isPooled(o)        (TFLAG_is(uintptr_t,(o)->h.magicflag,kObject_Local5))
//#define S_setPooled(o,b)     TFLAG_set(uintptr_t,(o)->h.magicflag,kObject_Local5,b)
//#define SIZEOF_INLINETEXT    (sizeof(void*)*8 - sizeof(kBytes))
//
//typedef const struct _kBytes kBytes;
//struct _kBytes {
//	kObjectHeader h;
//	COMMON_BYTEARRAY;
//};
//
////typedef struct {
////	COMMON_BYTEARRAY;
////} kbytes_t;
//
//
//typedef const struct _kString kString;
konoha.kString = function()/* extends _Bytes */ {
	this.h = null;        // kObjectHeader => kObjectHeader
	this.bytesize = null; // size_t => Number
	// union {
	// 	   const char *byteptr;
	// 	   const char *text;
	// 	   const unsigned char *utext;
	// 	   char *buf;
	// 	   unsigned char *ubuf;
	// }
	this.text = null;     // union => String
	this.hashCode = null; // kuint_t => Number
//	const char inline_text[SIZEOF_INLINETEXT];
};
//
konoha.SPOL_TEXT        =  (1<<0)
konoha.SPOL_ASCII       =  (1<<1)
konoha.SPOL_UTF8        =  (1<<2)
konoha.SPOL_POOL        =  (1<<3)
konoha.SPOL_NOCOPY      =  (1<<4)
//
//#define new_T(t)            new_kString(t, knh_strlen(t), SPOL_TEXT|SPOL_ASCII|SPOL_POOL)
//#define new_S(T, L)         new_kString(T, L, SPOL_ASCII|SPOL_POOL)
//#define S_text(s)           ((const char*) (O_ct(s)->unbox(_ctx, (kObject*)s)))
//#define S_size(s)           ((s)->bytesize)
//
////#define S_equals(s, b)        knh_bytes_equals(S_tobytes(s), b)
////#define S_startsWith(s, b)    knh_bytes_startsWith_(S_tobytes(s), b)
////#define S_endsWith(s, b)      knh_bytes_endsWith_(S_tobytes(s), b)
//
///* ------------------------------------------------------------------------ */
////## class Array   Object;
//
//#define CFLAG_Array              kClass_Final
//#define OFLAG_Array              MAGICFLAG(0)
//#define TY_Array                 CLASS_Array
//#define IS_Array(o)              (O_bcid(o) == CLASS_Array)
//
//#define kArray_isUnboxData(o)    (TFLAG_is(uintptr_t,(o)->h.magicflag,kObject_Local1))
//#define kArray_setUnboxData(o,b) TFLAG_set(uintptr_t,(o)->h.magicflag,kObject_Local1,b)
//
//

konoha.kArray = function() {
	this.h = null;				//ObjectHeader
	this.bytesize = null;		//size_t => Number

	this.data = null;           //union => Array

	this.btyemax = null;		//size_t => Number
};


//
///* ------------------------------------------------------------------------ */
////## @Private @Immutable class Param Object;
////## flag Param VARGs  1 - is set * *;
////## flag Param RVAR   2 - is set * *;
//
//#define CFLAG_Param              kClass_Final
//#define OFLAG_Param              MAGICFLAG(0)
//#define TY_Param                 CLASS_Param
//#define IS_Param(o)              (O_bcid(o) == CLASS_Param)
//
konoha.kparam_t = function() {
	this.ty = null;			//ktype_t
	this.fn = null;			//ksymbol_t
};
//
konoha.kParam = function() {
	this.h = null;				//kObjectHeader
	this.rtype = null;			//ktype_t
	this.psize = null;			//kushort_t
	this.p[3] = null;			//kparam_t
};
//
///* ------------------------------------------------------------------------ */
////## class Method Object;
//
//#define CFLAG_Method              kClass_Final
//#define OFLAG_Method              MAGICFLAG(0)
//#define TY_Method                 CLASS_Method
//#define IS_Method(o)              (O_cid(o) == CLASS_Method)
//
//typedef const struct _kMethod kMethod;
//
//#define kMethod_Public               ((uintptr_t)(1<<0))
//#define kMethod_Virtual              ((uintptr_t)(1<<1))
//#define kMethod_Hidden               ((uintptr_t)(1<<2))
//#define kMethod_Const                ((uintptr_t)(1<<3))
//#define kMethod_Static               ((uintptr_t)(1<<4))
//#define kMethod_Immutable            ((uintptr_t)(1<<5))
//#define kMethod_Restricted           ((uintptr_t)(1<<6))
//#define kMethod_Overloaded           ((uintptr_t)(1<<7))
//#define kMethod_CALLCC               ((uintptr_t)(1<<8))
//#define kMethod_FASTCALL             ((uintptr_t)(1<<9))
//#define kMethod_D                    ((uintptr_t)(1<<10))
//#define kMethod_Abstract             ((uintptr_t)(1<<11))
//#define kMethod_Coercion             ((uintptr_t)(1<<12))
//#define kMethod_SmartReturn          ((uintptr_t)(1<<13))
//
//#define kMethod_isPublic(o)     (TFLAG_is(uintptr_t, (o)->flag,kMethod_Public))
////#define kMethod_setPublic(o,B)  TFLAG_set(uintptr_t, (o)->flag,kMethod_Public,B)
//#define kMethod_isVirtual(o)     (TFLAG_is(uintptr_t, (o)->flag,kMethod_Virtual))
////#define kMethod_setVirtual(o,B)  TFLAG_set(uintptr_t, (o)->flag,kMethod_Virtual,B)
//#define kMethod_isHidden(o)     (TFLAG_is(uintptr_t, (o)->flag,kMethod_Hidden))
//#define kMethod_setHidden(o,B)  TFLAG_set(uintptr_t, (o)->flag,kMethod_Hidden,B)
//#define kMethod_isStatic(o)     (TFLAG_is(uintptr_t, (o)->flag,kMethod_Static))
//#define kMethod_setStatic(o,B)  TFLAG_set(uintptr_t, (o)->flag,kMethod_Static,B)
//#define kMethod_isConst(o)      (TFLAG_is(uintptr_t, (o)->flag,kMethod_Const))
////#define kMethod_setConst(o,B)   TFLAG_set(uintptr_t, (o)->flag,kMethod_Const,B)
//#define kMethod_isVirtual(o)     (TFLAG_is(uintptr_t, (o)->flag,kMethod_Virtual))
//#define kMethod_setVirtual(o,B)  TFLAG_set(uintptr_t, (o)->flag,kMethod_Virtual,B)
//
//#define kMethod_isSmartReturn(o)     (TFLAG_is(uintptr_t, (o)->flag, kMethod_SmartReturn))
//
//#define kMethod_isTransCast(mtd)    MN_isTOCID(mtd->mn)
//#define kMethod_isCast(mtd)         MN_isASCID(mtd->mn)
//#define kMethod_isCoercion(mtd)    (TFLAG_is(uintptr_t, (mtd)->flag,kMethod_Coercion))
//
////#define kMethod_isOverload(o)  (TFLAG_is(uintptr_t,DP(o)->flag,kMethod_Overload))
////#define kMethod_setOverload(o,b) TFLAG_set(uintptr_t,DP(o)->flag,kMethod_Overload,b)
//
///* method data */
//#define DEND     (-1)
//
//#if 1
//#define _RIX         ,long _rix
//#define K_RIX        _rix
//#define K_RIXPARAM    ,K_RTNIDX
//#define _KFASTCALL   ,long _rix
//#define K_FASTRIX    _rix
//#else
//#define _RIX
//#define K_RIX (-4)
//#define K_RIXPARAM
//#define _KFASTCALL
//#define K_FASTRIX K_RIXPARAM
//#endif
//
//#ifdef K_USING_WIN32_
////#define KMETHOD  void CC_EXPORT
////#define ITRNEXT int   CC_EXPORT
////typedef void (CC_EXPORT *knh_Fmethod)(CTX, ksfp_t* _RIX);
////typedef int  (CC_EXPORT *knh_Fitrnext)(CTX, ksfp_t * _RIX);
//#else
//#define KMETHOD    void  /*CC_FASTCALL_*/
//#define KMETHODCC  int  /*CC_FASTCALL_*/
//typedef KMETHOD   (*knh_Fmethod)(CTX, ksfp_t* _RIX);
//typedef KMETHOD   (*FmethodFastCall)(CTX, ksfp_t * _KFASTCALL);
//typedef KMETHODCC (*FmethodCallCC)(CTX, ksfp_t *, int, int, struct kopl_t*);
//#endif
//
//struct _kMethod {
//	kObjectHeader     h;
//	union {
//		knh_Fmethod          fcall_1;
//		FmethodFastCall      fastcall_1;
//	};
//	union {/* body*/
//		struct kopl_t        *pc_start;
//		FmethodCallCC         callcc_1;
//	};
//	uintptr_t         flag;
//	kcid_t            cid;   kmethodn_t  mn;
//	kshort_t delta;          kpack_t packid;
//	kParam            *pa;
//	const struct _kToken            *tcode;
//	union {
//		kObject              *objdata;
//		const struct _kKonohaCode   *kcode;
//		const struct _kKonohaSpace  *lazyns;       // lazy compilation
//	};
//	const struct _kMethod           *proceedNUL;   // proceed
//};
//
///* ------------------------------------------------------------------------ */
////## @Singleton class System Object;
//
//#define CFLAG_System              kClass_Singleton|kClass_Final
//#define OFLAG_System              MAGICFLAG(0)
//#define TY_System                 CLASS_System
//#define IS_System(o)              (O_cid(o) == CLASS_System)
//
//typedef const struct _kSystem kSystem;
//
//struct _kSystem {
//	kObjectHeader h;
//};
//
///* ------------------------------------------------------------------------ */
////## class Tdynamic Object;
//
//#define CFLAG_T0                    kClass_TypeVar|kClass_UnboxType|kClass_Singleton|kClass_Final
//#define TY_T0                       CLASS_T0
//#define TY_0                        CLASS_T0
////
////#define CFLAG_Tdynamic              kClass_Final
////#define OFLAG_Tdynamic              MAGICFLAG(0)
////#define TY_dynamic                  CLASS_Tdynamic
////#define CLASS_RawPtr                CLASS_Tdynamic
////#define T_RawPtr                    CLASS_Tdynamic
////
//////typedef struct kObject {
//////	kObjectHeader h;
//////	void         *rawptr;
//////	kArray       *gcbuf;
//////	void         (*rawfree)(void *);
//////} kObject ;
//
////#define new_ReturnRawPtr(_ctx, sfp, p)  new_ReturnCppObject(_ctx, sfp, p, NULL)
//
//#define K_CALLDELTA   4
//#define K_RTNIDX    (-4)
//#define K_SHIFTIDX  (-3)
//#define K_PCIDX     (-2)
//#define K_MTDIDX    (-1)
//#define K_TMRIDX    (0)
//#define K_SELFIDX   0
//
////#define K_NEXTIDX    2
//#define K_ULINEIDX2  (-7)
//#define K_SHIFTIDX2  (-5)
//#define K_PCIDX2     (-3)
//#define K_MTDIDX2    (-1)
//
//#define klr_setesp(_ctx, newesp)  ((kcontext_t*)_ctx)->esp = (newesp)
//#define klr_setmtdNC(sfpA, mtdO)   sfpA.mtdNC = mtdO
//
////#define Method_isKonohaCode(mtd) ((mtd)->fcall_1 == Fmethod_runVM)
//#define Method_isKonohaCode(mtd) (0)
//
//#define BEGIN_LOCAL(V,N) \
//	ksfp_t *V = _ctx->esp, *esp_ = _ctx->esp; (void)V;((kcontext_t*)_ctx)->esp = esp_+N;\
//
//#define END_LOCAL() ((kcontext_t*)_ctx)->esp = esp_;
//
//#define KCALL(LSFP, RIX, MTD, ARGC, DEFVAL) { \
//		ksfp_t *tsfp = LSFP + RIX + K_CALLDELTA;\
//		tsfp[K_MTDIDX].mtdNC = MTD;\
//		tsfp[K_PCIDX].fname = __FILE__;\
//		tsfp[K_SHIFTIDX].shift = 0;\
//		KSETv(tsfp[K_RTNIDX].o, DEFVAL);\
//		tsfp[K_RTNIDX].uline = __LINE__;\
//		klr_setesp(_ctx, tsfp + ARGC + 1);\
//		(MTD)->fastcall_1(_ctx, tsfp K_RIXPARAM);\
//		tsfp[K_MTDIDX].mtdNC = NULL;\
//	} \
//
//
///* ----------------------------------------------------------------------- */
//// klib2
//
//struct _kKonohaSpace;
//struct klogconf_t;
//
//typedef const struct _klib2  klib2_t;
//struct _klib2 {
//	void* (*Kmalloc)(CTX, size_t);
//	void* (*Kzmalloc)(CTX, size_t);
//	void  (*Kfree)(CTX, void *, size_t);
//
//	void  (*Karray_init)(CTX, karray_t *, size_t);
//	void  (*Karray_resize)(CTX, karray_t *, size_t);
//	void  (*Karray_expand)(CTX, karray_t *, size_t);
//	void  (*Karray_free)(CTX, karray_t *);
//
//	void (*Kwb_init)(karray_t *, kwb_t *);
//	void (*Kwb_write)(CTX, kwb_t *, const char *, size_t);
//	void (*Kwb_putc)(CTX, kwb_t *, ...);
//	void (*Kwb_vprintf)(CTX, kwb_t *, const char *fmt, va_list ap);
//	void (*Kwb_printf)(CTX, kwb_t *, const char *fmt, ...);
//	const char* (*Kwb_top)(CTX, kwb_t *, int);
//	void (*Kwb_free)(kwb_t *);
//
//	kmap_t*  (*Kmap_init)(CTX, size_t);
//	kmape_t* (*Kmap_newentry)(CTX, kmap_t *, uintptr_t);
//	kmape_t* (*Kmap_get)(kmap_t *, uintptr_t);
//	void (*Kmap_add)(kmap_t *, kmape_t *);
//	void (*Kmap_remove)(kmap_t *, kmape_t *);
//	void (*Kmap_reftrace)(CTX, kmap_t *, void (*)(CTX, kmape_t*));
//	void (*Kmap_free)(CTX, kmap_t *, void (*)(CTX, void *));
//	ksymbol_t (*Kmap_getcode)(CTX, kmap_t *, kArray *, const char *, size_t, uintptr_t, int, ksymbol_t);
//
//
//	kline_t     (*Kfileid)(CTX, const char *, size_t, int spol, ksymbol_t def);
//	kpack_t     (*Kpack)(CTX, const char *, size_t, int spol, ksymbol_t def);
//	kuname_t    (*Kuname)(CTX, const char*, size_t, int spol, ksymbol_t def);
//	ksymbol_t   (*Ksymbol)(CTX, const char *, size_t, ksymbol_t def, int);
//	const char* (*KTsymbol)(CTX, char *, size_t, ksymbol_t mn);
//
//	kbool_t     (*KimportPackage)(CTX, const struct _kKonohaSpace*, const char *, kline_t);
//	kclass_t*   (*Kclass)(CTX, kcid_t, kline_t);
//	kString*    (*KCT_shortName)(CTX, kclass_t *ct);
//	kclass_t*   (*KCT_Generics)(CTX, kclass_t *ct, int psize, kparam_t *p);
//
//	kObject*    (*Knew_Object)(CTX, kclass_t *, void *);
//	kObject*    (*Knull)(CTX, kclass_t *);
//	kObject*    (*KObject_getObject)(CTX, kObject *, ksymbol_t, kObject *);
//	void        (*KObject_setObject)(CTX, kObject *, ksymbol_t, ktype_t, kObject *);
//	uintptr_t   (*KObject_getUnboxedValue)(CTX, kObject *, ksymbol_t, uintptr_t);
//	void        (*KObject_setUnboxedValue)(CTX, kObject *, ksymbol_t, ktype_t, uintptr_t);
//	void        (*KObject_protoEach)(CTX, kObject *, void *thunk, void (*f)(CTX, void *, kvs_t *d));
//	void        (*KObject_removeKey)(CTX, kObject *, ksymbol_t);
//
//	kString*    (*Knew_String)(CTX, const char *, size_t, int);
//	kString*    (*Knew_Stringf)(CTX, int, const char *, ...);
//	kString*    (*KString)(CTX, int, kString *, kString *);
//
//	void (*KArray_add)(CTX, kArray *, kObject *);
//	void (*KArray_insert)(CTX, kArray *, size_t, kObject *);
//	void (*KArray_clear)(CTX, kArray *, size_t);
//
//	kParam *   (*Knew_Param)(CTX, ktype_t, int, kparam_t *);
//	kMethod *  (*Knew_Method)(CTX, uintptr_t, kcid_t, kmethodn_t, kParam*, knh_Fmethod);
//	void       (*KMethod_setFunc)(CTX, kMethod*, knh_Fmethod);
//	void       (*KMethod_genCode)(CTX, kMethod*, const struct _kBlock *bk);
//	intptr_t   (*KMethod_indexOfField)(kMethod *);
//
//	kbool_t    (*KsetModule)(CTX, int, struct kmodshare_t *, kline_t);
//	kclass_t*  (*KaddClassDef)(CTX, kpack_t, kpack_t, kString *, KDEFINE_CLASS *, kline_t);
//
//	kclass_t*  (*KS_getCT)(CTX, const struct _kKonohaSpace *, kclass_t *, const char *, size_t, kcid_t def);
//	void       (*KS_loadMethodData)(CTX, const struct _kKonohaSpace *, intptr_t *d);
//	void       (*KS_loadConstData)(CTX, const struct _kKonohaSpace *, const char **d, kline_t);
//	kMethod*   (*KS_getMethodNULL)(CTX, const struct _kKonohaSpace *ks, kcid_t cid, kmethodn_t mn);
//	kMethod*   (*KS_getGetterMethodNULL)(CTX, const struct _kKonohaSpace *, ktype_t cid, ksymbol_t sym);
//
//	void       (*KS_syncMethods)(CTX);
//	void       (*KCodeGen)(CTX, kMethod *, const struct _kBlock *);
//	void       (*Kreport)(CTX, int level, const char *msg);
//	void       (*Kreportf)(CTX, int level, kline_t, const char *fmt, ...);
//	void       (*Kraise)(CTX, int isContinue);     // module
//
//	uintptr_t  (*Ktrace)(CTX, struct klogconf_t *logconf, ...);
//	void       (*Kp)(const char *file, const char *func, int line, const char *fmt, ...) __PRINT_FMT(4, 5);
//};
//
//#define K_NULL            (_ctx->share->constNull)
//#define K_TRUE            (_ctx->share->constTrue)
//#define K_FALSE           (_ctx->share->constFalse)
//#define K_NULLPARAM       (_ctx->share->nullParam)
//#define K_DEFPARAM        (_ctx->share->defParam)
//#define K_EMPTYARRAY      (_ctx->share->emptyArray)
//#define TS_EMPTY          (_ctx->share->emptyString)
//
//#define UPCAST(o)         ((kObject*)o)
//#define W(T, V)           struct _##T*const W##V = (struct _##T*const)(V); int _check##V
//#define WASSERT(V)        DBG_ASSERT((void*)V == (void*)W##V); (void)_check##V
//
//#define KPI                     (_ctx->lib2)
//
//#define KMALLOC(size)          (KPI)->Kmalloc(_ctx, size)
//#define KCALLOC(size, item)    (KPI)->Kzmalloc(_ctx, ((size) * (item)))
//#define KFREE(p, size)         (KPI)->Kfree(_ctx, p, size)
//
//#define KARRAY_INIT(VAR, init)           (KPI)->Karray_init(_ctx, VAR, (init))
//#define KARRAY_RESIZE(VAR, newsize)      (KPI)->Karray_resize(_ctx, VAR, (newsize))
//#define KARRAY_EXPAND(VAR, min)          (KPI)->Karray_expand(_ctx, VAR, (min))
//#define KARRAY_FREE(VAR)                 (KPI)->Karray_free(_ctx, VAR)
//
//#define kwb_init(M,W)            (KPI)->Kwb_init(M,W)
//#define kwb_write(W,B,S)         (KPI)->Kwb_write(_ctx,W,B,S)
//#define kwb_putc(W,...)          (KPI)->Kwb_putc(_ctx,W, ## __VA_ARGS__, EOF)
//#define kwb_vprintf(W,FMT,ARG)   (KPI)->Kwb_vprintf(_ctx,W, FMT, ARG)
//#define kwb_printf(W,FMT,...)    (KPI)->Kwb_printf(_ctx, W, FMT, ## __VA_ARGS__)
//
//#define kwb_top(W,IS)            (KPI)->Kwb_top(_ctx, W, IS)
//#define kwb_bytesize(W)          (((W)->m)->bytesize - (W)->pos)
//#define kwb_free(W)              (KPI)->Kwb_free(W)
//
//#define kmap_init(INIT)           (KPI)->Kmap_init(_ctx, INIT)
//#define kmap_newentry(M, H)       (KPI)->Kmap_newentry(_ctx, M, H)
//#define kmap_get(M, K)            (KPI)->Kmap_get(M, K)
//#define kmap_add(M, E)            (KPI)->Kmap_add(M, E)
//#define kmap_remove(M, E)         (KPI)->Kmap_remove(_ctx, M, E)
//#define kmap_reftrace(M, F)       (KPI)->Kmap_reftrace(_ctx, M, F)
//#define kmap_free(M, F)           (KPI)->Kmap_free(_ctx, M, F)
//#define kmap_getcode(M,L,N,NL,H,POL,DEF)  (KPI)->Kmap_getcode(_ctx, M, L, N, NL, H, POL, DEF)
//
//#define kclass(CID, UL)           (KPI)->Kclass(_ctx, CID, UL)
//#define SYMPOL_RAW                0
//#define SYMPOL_NAME               1
//#define SYMPOL_METHOD             2
//#define ksymbol(T,L,D,P)          (KPI)->Ksymbol(_ctx, T, L, D, P)
//#define KSYMBOL(T)                (KPI)->Ksymbol(_ctx, T, sizeof(T)-1, FN_NEWID, SYMPOL_RAW)
//#define FN_(T)                    ksymbol(T, (sizeof(T)-1), FN_NEWID, SYMPOL_NAME)
//#define MN_(T)                    ksymbol(T, (sizeof(T)-1), FN_NEWID, SYMPOL_METHOD)
//#define MN_new                    1  /* @see */
//#define T_mn(B, X)                (KPI)->KTsymbol(_ctx, B, sizeof(B), X)
//
//#define FILEID_NATIVE             0
//#define FILEID_(T)                (KPI)->Kfileid(_ctx, T, sizeof(T)-1, SPOL_TEXT|SPOL_ASCII, _NEWID)
//#define kfileid(T,L,SPOL,DEF)          (KPI)->Kfileid(_ctx, T, L, SPOL, DEF)
//#define PN_konoha                 0
//#define PN_sugar                  1
//#define PN_(T)                    (KPI)->Kpack(_ctx, T, sizeof(T)-1, SPOL_TEXT|SPOL_ASCII|SPOL_POOL, _NEWID)
//#define kpack(T,L,SPOL,DEF)       (KPI)->Kpack(_ctx, T, L, SPOL, DEF)
//#define UN_(T)                    (KPI)->Kuname(_ctx, T, sizeof(T)-1, SPOL_TEXT|SPOL_ASCII|SPOL_POOL, _NEWID)
//#define kuname(T, L, SPOL,DEF)    (KPI)->Kuname(_ctx, T, L, SPOL, DEF)
//
//#define new_kObject(C, A)         (KPI)->Knew_Object(_ctx, C, (void*)(A))
//#define new_(C, A)                (k##C*)(KPI)->Knew_Object(_ctx, CT_##C, (void*)(A))
//#define new_W(C, A)               (struct _k##C*)(KPI)->Knew_Object(_ctx, CT_##C, (void*)(A))
//#define knull(C)                  (KPI)->Knull(_ctx, C)
//#define KNULL(C)                  (k##C*)(KPI)->Knull(_ctx, CT_##C)
//
//#define kObject_getObjectNULL(O, K)            (KPI)->KObject_getObject(_ctx, UPCAST(O), K, NULL)
//#define kObject_getObject(O, K, DEF)           (KPI)->KObject_getObject(_ctx, UPCAST(O), K, DEF)
//#define kObject_setObject(O, K, V)             (KPI)->KObject_setObject(_ctx, UPCAST(O), K, O_cid(V), UPCAST(V))
//#define kObject_getUnboxedValue(O, K, DEF)     (KPI)->KObject_getUnboxedValue(_ctx, UPCAST(O), K, DEF)
//#define kObject_setUnboxedValue(O, K, T, V)    (KPI)->KObject_setUnboxedValue(_ctx, UPCAST(O), K, T, V)
//#define kObject_removeKey(O, K)                (KPI)->KObject_removeKey(_ctx, UPCAST(O), K)
//#define kObject_protoEach(O, THUNK, F)         (KPI)->KObject_protoEach(_ctx, UPCAST(O), THUNK, F)
//
//
//#define new_kString(T,S,P)        (KPI)->Knew_String(_ctx, T, S, P)
//#define new_kStringf(P, FMT, ...) (KPI)->Knew_Stringf(_ctx, P, FMT, ## __VA_ARGS__)
//
//#define kArray_size(A)            (((A)->bytesize)/sizeof(void*))
//#define kArray_add(A, V)          (KPI)->KArray_add(_ctx, A, UPCAST(V))
//#define kArray_insert(A, N, V)    (KPI)->KArray_insert(_ctx, A, N, UPCAST(V))
//#define kArray_clear(A, S)        (KPI)->KArray_clear(_ctx, A, S)
//
//#define new_kParam(R,S,P)        (KPI)->Knew_Param(_ctx, R, S, P)
//#define new_kMethod(F,C,M,P,FF)  (KPI)->Knew_Method(_ctx, F, C, M, P, FF)
//#define kMethod_setFunc(M,F)     (KPI)->KMethod_setFunc(_ctx, M, F)
//#define kMethod_genCode(M, BLOCK) (KPI)->KMethod_genCode(_ctx, M, BLOCK)
//
//#define KREQUIRE_PACKAGE(NAME, UL)                   (KPI)->KimportPackage(_ctx, NULL, NAME, UL)
//#define KEXPORT_PACKAGE(NAME, KS, UL)                (KPI)->KimportPackage(_ctx, KS, NAME, UL)
//
//#define KCLASS(cid)                          S_text(CT(cid)->name)
//#define kClassTable_Generics(CT, PSIZE, P)    (KPI)->KCT_Generics(_ctx, CT, PSIZE, P)
//#define Konoha_setModule(N,D,P)              (KPI)->KsetModule(_ctx, N, D, P)
//#define Konoha_addClassDef(PAC, DOM, NAME, DEF, UL)    (KPI)->KaddClassDef(_ctx, PAC, DOM, NAME, DEF, UL)
//#define kKonohaSpace_getCT(NS, THIS, S, L, C)      (KPI)->KS_getCT(_ctx, NS, THIS, S, L, C)
//#define kKonohaSpace_loadMethodData(NS, DEF)       (KPI)->KS_loadMethodData(_ctx, NS, DEF)
//#define kKonohaSpace_loadConstData(KS, DEF, UL)    (KPI)->KS_loadConstData(_ctx, KS, (const char**)&(DEF), UL)
//#define kKonohaSpace_getMethodNULL(KS, CID, MN)    (KPI)->KS_getMethodNULL(_ctx, KS, CID, MN)
//#define kKonohaSpace_syncMethods()    (KPI)->KS_syncMethods(_ctx)
//
//typedef struct {
//	const char *key;
//	uintptr_t ty;
//	kint_t value;
//} KDEFINE_INT_CONST;
//
//typedef struct {
//	const char *key;
//	uintptr_t ty;
//	const char* value;
//} KDEFINE_TEXT_CONST;
//
//typedef struct {
//	const char *key;
//	uintptr_t ty;
//	kfloat_t value;
//} KDEFINE_FLOAT_CONST;
//
konoha.kreportlevel_t = new konoha.Enum (
	"CRIT_",     // raise(0)
	"ERR_",
	"WARN_",
	"INFO_",
	"DEBUG_",
	"PRINT_"
);

////#define CRIT_  0
////#define ERR_   1
////#define WARN_  2
////#define INFO_  3
////#define PRINT_ 4
////#define DEBUG_ 5
//
//#define kreport(LEVEL, MSG)            (KPI)->Kreport(_ctx, LEVEL, MSG)
//#define kreportf(LEVEL, UL, fmt, ...)  (KPI)->Kreportf(_ctx, LEVEL, UL, fmt, ## __VA_ARGS__)
//#define kraise(PARAM)                  (KPI)->Kraise(_ctx, PARAM)
//
//#define KSET_KLIB(T, UL)   do {\
//		void *func = _ctx->lib2->K##T;\
//		((struct _klib2*)_ctx->lib2)->K##T = K##T;\
//		if(func != NULL) {\
//			kreportf(DEBUG_, UL, "override of klib2->" #T ", file=%s, line=%d", __FILE__, __LINE__);\
//		}\
//	}while(0)\
//
//#define KSET_KLIB2(T, F, UL)   do {\
//		void *func = _ctx->lib2->K##T;\
//		((struct _klib2*)_ctx->lib2)->K##T = F;\
//		if(func != NULL) {\
//			kreportf(DEBUG_, UL, "override of klib2->" #T ", file=%s, line=%d", __FILE__, __LINE__);\
//		}\
//	}while(0)\
//
//#define KSET_CLASSFUNC(ct, T, PREFIX, UL)   do {\
//		void *func = ct->T;\
//		((struct _kclass*)ct)->T = PREFIX##_##T;\
//		if(func != NULL) {\
//			kreportf(DEBUG_, UL, "override of %s->" #T ", file=%s, line=%d", T_CT(ct), __FILE__, __LINE__);\
//		}\
//	}while(0)\
//
//// gc
//
//#define KTODO(MSG) do { fprintf(stderr, "TODO: %s\n", MSG);abort(); } while (0)
//
//#if defined(_MSC_VER)
//#define OBJECT_SET(var, val) do {\
//	kObject **var_ = (kObject**)&val; \
//	var_[0] = (val_); \
//} while (0)
//#else
//#define OBJECT_SET(var, val) var = (typeof(var))(val)
//#endif /* defined(_MSC_VER) */
//
//
//#define INIT_GCSTACK()         size_t gcstack_ = kArray_size(_ctx->stack->gcstack)
//#define PUSH_GCSTACK(o)        kArray_add(_ctx->stack->gcstack, o)
//#define RESET_GCSTACK()        kArray_clear(_ctx->stack->gcstack, gcstack_)
//
//#define KINITv(VAR, VAL)   OBJECT_SET(VAR, VAL)
//#define KSETv(VAR, VAL)    OBJECT_SET(VAR, VAL)
konoha.KSETv = function(VAR, VAL) {
	VAR = VAL;
}
//#define KINITp(parent, v, o) KINITv(v, o)
//#define KSETp(parent,  v, o) KSETv(v, o)
//#define KUNUSEv(V)  (V)->h.ct->free(_ctx, (V))
//
//#define BEGIN_REFTRACE(SIZE)  int _ref_ = (SIZE); struct _kObject** _tail = KONOHA_reftail(_ctx, (SIZE));
//#define END_REFTRACE()        (void)_ref_; _ctx->stack->reftail = _tail;
//
//#define KREFTRACEv(p)  do {\
//	DBG_ASSERT(p != NULL);\
//	_tail[0] = (struct _kObject*)p;\
//	_tail++;\
//} while (0)
//
//#define KREFTRACEn(p) do {\
//	if(p != NULL) {\
//		_tail[0] = (struct _kObject*)p;\
//		_tail++;\
//	}\
//} while (0)
//
//// method macro
//
//#define KNH_SAFEPOINT(_ctx, sfp)
//
//#define RETURN_(vv) do {\
//	KSETv(sfp[K_RIX].o, vv);\
//	KNH_SAFEPOINT(_ctx, sfp);\
//	return; \
//} while (0)
//
//#define RETURNd_(d) do {\
//	sfp[K_RIX].ndata = d; \
//	return; \
//} while (0)
//
//#define RETURNb_(c) do {\
//	sfp[K_RIX].bvalue = c; \
//	return; \
//} while(0)
//
//#define RETURNi_(c) do {\
//	sfp[K_RIX].ivalue = c; \
//	return; \
//} while (0)
//
//#define RETURNf_(c) do {\
//	sfp[K_RIX].fvalue = c; \
//	return; \
//} while (0)
//
//#define RETURNvoid_() do {\
//	(void)_rix;\
//	return; \
//} while (0)
//
////#ifndef K_NODEBUG
//#define KNH_ASSERT(a)    assert(a)
//#define DBG_ASSERT(a)    assert(a)
//#define TODO_ASSERT(a)   assert(a)
//#define DBG_P(fmt, ...)     _ctx->lib2->Kp(__FILE__, __FUNCTION__, __LINE__, fmt, ## __VA_ARGS__)
//#define DBG_ABORT(fmt, ...) _ctx->lib2->Kp(__FILE__, __FUNCTION__, __LINE__, fmt, ## __VA_ARGS__); abort()
//#define DUMP_P(fmt, ...)    fprintf(stderr, fmt, ## __VA_ARGS__)
////#else
////#define KNH_ASSERT(a)
////#define DBG_ASSERT(a)
////#define TODO_ASSERT(a)
////#define DBG_P(fmt, ...)
////#define DBG_ABORT(fmt, ...)
////#define DUMP_P(fmt, ...)
////#endif
//
//#ifndef unlikely
//#define unlikely(x)   __builtin_expect(!!(x), 0)
//#define likely(x)     __builtin_expect(!!(x), 1)
//
//#endif /*unlikely*/
//
/////* Konoha API */
//extern konoha_t konoha_open(void);
//extern void konoha_close(konoha_t konoha);
//extern kbool_t konoha_load(konoha_t konoha, const char *scriptfile);
//extern kbool_t konoha_eval(konoha_t konoha, const char *script, kline_t uline);
//extern kbool_t konoha_run(konoha_t konoha);  // TODO
//
////extern void MODSUGAR_init(CTX, kcontext_t *ctx);
////extern void kvproto_free(CTX, struct karray_t *p);
////extern void kvproto_reftrace(CTX, struct karray_t *p);
//
//
//#ifdef USE_BUILTINTEST
//typedef int (*Ftest)(CTX);
//typedef struct DEFINE_TESTFUNC {
//	const char *name;
//	Ftest f;
//} DEFINE_TESTFUNC ;
//#endif
//
//#include "logger.h"
//
//#endif /* KONOHA2_H_ */
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
	this.list = null; //kArray*
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
	this.syntaxRuleNULL = null;	//kArray *
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
	this.h = null;				//	kObjectHeader
	this.packid = null;		//	kpack_t
	this.pakdom = null;		//kpack_t
	this.parentNULL = null;	//const struct _kKonohaSpace *
	this.fmat = null;			//const Ftokenizer *
	this.syntaxMapNN = null;	//struct kmap_t *
	this.gluehdr = null;		//void *
	this.scrNUL = null;		//kObject *
	this.static_cid = null;	//kcid_t
	this.function_cid = null;	//kcid_t
	this.methods = null;		//kArray *
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
	this.h = null;				//kObjectHeader
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
	this.h = null;				//kObjectHeader
	this.ty = null;			//ktype_t
	this.build = null;			//kexpr_t
	this.tk = null;			//kToken
	//	union {
	this.data = null;		//kObject*
	this.cons = null;		//kArray *
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
	this.h = null;				//	kObjectHeader;
	this.uline = null;			//	kline_t;
	this.syn = null;			//	ksyntax_t *;
	this.parentNULL = null	//	const struct _kBlock *;
	this.build = null;			//	kushort_t;
};

konoha.kBlock = function() {
	this.h = null;				//kObjectHeader
	this.ks = null;			//kKonohaSpace *
	this.parentNULL = null;	//kStmt *
	this.blocks = null;		//kArray *
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
///****************************************************************************
// * copyright (c) 2012, the Konoha project authors. All rights reserved.
//
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

konoha.Token_toERR = function(_ctx, tk, errref)
{
    tk.tt = konoha.ktoken_t.TK_ERR;
	tk.text = ctxsugar.errors.strings[errref]; //TODO ERROR
}

konoha.lpos = function(tenv, s) //Number : tenv_t, Number
{
	return (tenv.bol == null) ? -1 : s - tenv.bol;
}

konoha.parseINDENT = function(_ctx, tk, tenv, pos, thunk)
{
	var ch, c = 0;
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '\t') {
			c += tenv.indent_tab;
		}
		else if(ch == ' ') {
			c += 1;
		}
		break;
	}
	//	if(IS_NOTNULL(tk)) { //TODO : Is this necessary?
	tk.tt = konoha.ktoken_t.TK_INDENT;
	tk.lpos = 0;
	//	}
	return pos - 1;
}

konoha.parseNL = function(_ctx, tk, tenv, pos, thunk)
{
	tenv.uline += 1;
	tenv.bol = pos + 1;
	return konoha.parseINDENT(_ctx, tk, tenv, pos + 1, thunk);
}

konoha.parseNUM = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start, dot = 0;
//	var ts = tenv.source;
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '_') continue;
		if(ch == '.') {
			if(isNaN(Number(tenv.source[pos]))) {
				break;
			}
			dot++;
			continue;
		}
		if((ch == 'e' || ch == 'E') && (tenv.source[pos] == '+' || tenv.source[pos] =='-')) {
			pos++;
			continue;
		}
		if(isNaN(Number(ch))) break;
	}
	//	if(IS_NOTNULL(tk)) {
	tk.text = new konoha.kString();
	tk.text.text = tenv.source.substr(tok_start, (pos-1)-tok_start);
//	tk.text = new kString(_ctx, ts + tok_start, (pos-1)-tok_start, konoha.SPOL_ASCII);
	tk.tt = (dot == 0) ? konoha.ktoken_t.TK_INT : konoha.ktoken_t.TK_FLOAT;
	//	}
	return pos - 1;
}

konoha.parseSYMBOL = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	var ts = tenv.source;
	while ((ch = ts[pos++]) != 0) {
		if (ch == '_' || konoha.isalnum(ch)) continue;
		break;
	}
	//	if(IS_NOTNULL(tk)) {
	tk.text = new konoha.kString();
	tk.text.text = ts.substr(tok_start, (pos-1)-tok_start);
	tk.tt = konoha.ktoken_t.TK_SYMBOL;
	//	}
	return pos - 1;
}

konoha.parseUSYMBOL = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	var ts = tenv.source;
	while((ch = ts[pos++]) != 0) {
		if (ch == '_' || konoha.isalnum(ch)) continue;
		break;
	}
	//	if(IS_NOTNULL(tk)) {
	tk.text = new konoha.kString();
	tk.text.text = ts.substr(tok_start, (pos-1)-tok_start);
	tk.tt = konoha.ktoken_t.TK_USYMBOL;
	//	}
	return pos - 1;
}

konoha.parseMSYMBOL = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	var ts = tenv.source;
	while((ch = ts.charCodeAt(pos++)) != 0) {
		if(!(ch < 0)) break;
	}
	//	if((tk.h.magicflag & (1<<0)) != (1<<0)) {
	tk.text = new konoha.kString();
	tk.text.text = ts.substr(tok_start, (pos-1)-tok_start);
	tk.tt = konoha.ktoken_t.TK_MSYMBOL;
	//	}
	return pos - 1;
}

konoha.parseOP1 = function(_ctx, tk, tenv, tok_start, thunk)
{
	//	if(IS_NOTNULL(tk)) {
//	var s = tenv.source + tok_start;
	tk.text = new konoha.kString();
	tk.text.text = tenv.source[tok_start];
	tk.tt = konoha.ktoken_t.TK_OPERATOR;
	tk.topch = s[0];
	//	}
	return tok_start+1;
}

konoha.parseOP = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	while((ch = tenv.source[pos++]) != 0) {
		if (konoha.isalnum(ch)) break;
		switch(ch) {
		case '<': case '>': case '@': case '$': case '#':
		case '+': case '-': case '*': case '%': case '/':
		case '=': case '&': case '?': case ':': case '.':
		case '^': case '!': case '~': case '|':
			continue;
		}
		break;
	}
	//	if(IS_NOTNULL(tk)) {
//	var s = tenv.source[tok_start];
	tk.text = new konoha.kString();
	tk.text.text = tenv.source.substr(tok_start, (pos-1)-tok_start);
	tk.tt = konoha.ktoken_t.TK_OPERATOR;
	if(tk.text.length == 1) {
		tk.topch = tk.text;
	}
	//	}
	return pos-1;
}

konoha.parseLINE = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '\n') break;
	}
	return pos-1;/*EOF*/
}

konoha.parseCOMMENT = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, prev = 0, level = 1, pos = tok_start + 2;
	/*@#nnnn is line number */
	if(tenv.source[pos] == '@' && tenv.source[pos+1] == '#' && isdigit(tenv.source[pos+2])) {
		tenv.uline >>= (sizeof(kshort_t)*8);
		tenv.uline = (tenv.uline<<(sizeof(kshort_t)*8))  | strtoll(tenv.source + pos + 2, null, 10);
	}
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '\n') {
			tenv.uline += 1;
		}
		if(prev == '*' && ch == '/') {
			level--;
			if(level == 0) return pos;
		}else if(prev == '/' && ch == '*') {
			level++;
		}
		prev = ch;
	}
	//	if(IS_NOTNULL(tk)) {
//	var errref = konoha.sugar_p(konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "must close with */");
//	konoha.Token_toERR(_ctx, tk, errref);
	//	}
	return pos-1;/*EOF*/
}

konoha.parseSLASH = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ts = tenv.source + tok_start;
	if(ts[1] == '/') {
		return konoha.parseLINE(_ctx, tk, tenv, tok_start, thunk);
	}
	if(ts[1] == '*') {
		return konoha.parseCOMMENT(_ctx, tk, tenv, tok_start, thunk);
	}
	return konoha.parseOP(_ctx, tk, tenv, tok_start, thunk);
}

konoha.parseDQUOTE = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, prev = '"', pos = tok_start + 1;
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '\n') {
			break;
		}
		if(ch == '"' && prev != '\\') {
			//			if(IS_NOTNULL(tk)) {
			tk.text = konoha.Knew_String(tenv.source + tok_start + 1, (pos-1)- (tok_start+1), 0);
			tk.tt = konoha.ktoken_t.TK_TEXT;
			//			}
			return pos;
		}
		prev = ch;
	}
	//	if(is_NOTNULL(tk)) {
//	var errref = konoha.sugar_p(konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "must close with \"");
//	konoha.token_toERR(_ctx, tk, errref);
	//	}
	return pos-1;
}

konoha.parseSKIP = function(_ctx, tk, tenv, tok_start, thunk)
{
	return tok_start+1;
}

konoha.parseUNDEF = function(_ctx, tk, tenv, tok_start, thunk)
{
	//	if(is_NOTNULL(tk)) {
//	var errref = konoha.sugar_p(konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "undefined token character: %c", tenv.source[tok_start]);
//	konoha.token_toERR(_ctx, tk, errref);
	//	}
	while(tenv.source[++tok_start] != 0);
	return tok_start;
}

//konoha.parseBLOCK = function(_ctx, tk, tenv, tok_start, thunk);

konoha.MiniKonohaTokenMatrix = new Array(
	//konoha._NULL    = 0
	konoha.parseSKIP,
	//konoha._DIGIT   = 2
	konoha.parseNUM,
	//konoha._UALPHA  = 3
	konoha.parseUSYMBOL,
	//konoha._LALPHA  = 4
	konoha.parseSYMBOL,
	//konoha._MULTI   = 5
	konoha.parseMSYMBOL,
	//konoha._NL      = 6
	konoha.parseNL,
	//konoha._TAB     = 7
	konoha.parseSKIP,
	//konoha._SP      = 8
	konoha.parseSKIP,
	//konoha._LPAR    = 9
	konoha.parseOP1,
	//konoha._RPAR    = 10
	konoha.parseOP1,
	//konoha._LSQ     = 11
	konoha.parseOP1,
	//konoha._RSQ     = 12
	konoha.parseOP1,
	//konoha._LBR     = 13
	konoha.parseBLOCK,
	//konoha._RBR     = 14
	konoha.parseOP1,
	//konoha._LT      = 15
	konoha.parseOP,
	//konoha._GT      = 16
	konoha.parseOP,
	//konoha._QUOTE   = 17
	konoha.parseUNDEF,
	//konoha._DQUOTE  = 18
	konoha.parseDQUOTE,
	//konoha._BKQUOTE = 19
	konoha.parseUNDEF,
	//konoha._OKIDOKI = 20
	konoha.parseOP,
	//konoha._SHARP   = 21
	konoha.parseOP,
	//konoha._DOLLAR  = 22
	konoha.parseOP,
	//konoha._PER     = 23
	konoha.parseOP,
	//konoha._AND     = 24
	konoha.parseOP,
	//konoha._STAR    = 25
	konoha.parseOP,
	//konoha._PLUS    = 26
	konoha.parseOP,
	//konoha._COMMA   = 27
	konoha.parseOP1,
	//konoha._MINUS   = 28
	konoha.parseOP,
	//konoha._DOT     = 29
	konoha.parseOP,
	//konoha._SLASH   = 30
	konoha.parseSLASH,
	//konoha._COLON   = 31
	konoha.parseOP,
	//konoha._SEMICOLON = 32
	konoha.parseOP1,
	//konoha._EQ      = 33
	konoha.parseOP,
	//konoha._QUESTION= 34
	konoha.parseOP,
	//konoha._AT      = 35
	konoha.parseOP1,
	//konoha._VAR     = 36
	konoha.parseOP,
	//konoha._CHILDER = 37
	konoha.parseOP,
	//konoha._BKSLASH = 38
	konoha.parseUNDEF,
	//konoha._HAT     = 39
	konoha.parseOP,
	//konoha._UNDER   = 40
	konoha.parseSYMBOL
	//konoha.KCHAR_MAX= 41
);


konoha.MKTM_type = new konoha.Enum(
	"_NULL",
	"_UNDEF",
	"_DIGIT",
	"_UALPHA",
	"_LALPHA",
	"_MULTI",
	"_NL",
	"_TAB",
	"_SP",
	"_LPAR",
	"_RPAR",
	"_LSQ",
	"_RSQ",
	"_LBR",
	"_RBR",
	"_LT",
	"_GT",
	"_QUOTE",
	"_DQUOTE",
	"_BKQUOTE",
	"_OKIDOKI",
	"_SHARP",
	"_DOLLAR",
	"_PER",
	"_AND",
	"_STAR",
	"_PLUS",
	"_COMMA",
	"_MINUS",
	"_DOT",
	"_SLASH",
	"_COLON",
	"_SEMICOLON",
	"_EQ",
	"_QUESTION",
	"_AT",
	"_CHILDER",
	"_BKSLASH",
	"_HAT",
	"_UNDER",
	"KCHAR_MAX"
);

konoha.cMatrix = new Array(
	0/*nul*/, 1/*soh*/, 1/*stx*/, 1/*etx*/, 1/*eot*/, 1/*enq*/, 1/*ack*/, 1/*bel*/,
	1/*bs*/, konoha.MKTM_type._TAB/*ht*/, konoha.MKTM_type._NL/*nl*/, 1/*vt*/, 1/*np*/, 1/*cr*/, 1/*so*/, 1/*si*/,
	//	/*	020 dle  021 dc1  022 dc2  023 dc3  024 dc4  025 nak  026 syn  027 etb*/
	1, 1, 1, 1,     1, 1, 1, 1,
	//	/*	030 can  031 em   032 sub  033 esc  034 fs   035 gs   036 rs   037 us*/
	1, 1, 1, 1,     1, 1, 1, 1,
	//	/*040 sp   041  !   042  "   043  #   044  $   045  %   046  &   047  '*/
	konoha.MKTM_type._SP, konoha.MKTM_type._OKIDOKI, konoha.MKTM_type._DQUOTE, konoha.MKTM_type._SHARP, konoha.MKTM_type._DOLLAR, konoha.MKTM_type._PER, konoha.MKTM_type._AND, konoha.MKTM_type._QUOTE,
	//	/*050  (   051  )   052  *   053  +   054  ,   055  -   056  .   057  /*/
	konoha.MKTM_type._LPAR, konoha.MKTM_type._RPAR, konoha.MKTM_type._STAR, konoha.MKTM_type._PLUS, konoha.MKTM_type._COMMA, konoha.MKTM_type._MINUS, konoha.MKTM_type._DOT, konoha.MKTM_type._SLASH,
	//	/*060  0   061  1   062  2   063  3   064  4   065  5   066  6   067  7 */
	konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT,  konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT,
	/*	070  8   071  9   072  :   073  ;   074  <   075  =   076  >   077  ? */
	konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._COLON, konoha.MKTM_type._SEMICOLON, konoha.MKTM_type._LT, konoha.MKTM_type._EQ, konoha.MKTM_type._GT, konoha.MKTM_type._QUESTION,
	//	/*100  @   101  A   102  B   103  C   104  D   105  E   106  F   107  G */
	konoha.MKTM_type._AT, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA,
	//	/*110  H   111  I   112  J   113  K   114  L   115  M   116  N   117  O */
	konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA,
	//	/*120  P   121  Q   122  R   123  S   124  T   125  U   126  V   127  W*/
	konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA,
	//	/*130  X   131  Y   132  Z   133  [   134  \   135  ]   136  ^   137  _*/
	konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._LSQ, konoha.MKTM_type._BKSLASH, konoha.MKTM_type._RSQ, konoha.MKTM_type._HAT, konoha.MKTM_type._UNDER,
	//	/*140  `   141  a   142  b   143  c   144  d   145  e   146  f   147  g*/
	konoha.MKTM_type._BKQUOTE, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA,
	//	/*150  h   151  i   152  j   153  k   154  l   155  m   156  n   157  o*/
	konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA,
	//	/*160  p   161  q   162  r   163  s   164  t   165  u   166  v   167  w*/
	konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA,
	//	/*170  x   171  y   172  z   173  {   174  |   175  }   176  ~   177 del*/
	konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LBR, konoha.MKTM_type._VAR, konoha.MKTM_type._RBR, konoha.MKTM_type._CHILDER, 1
);

konoha.kchar = function(t, pos)
{
	var ch = t.charCodeAt(pos);
	return konoha.cMatrix[ch]; //TODO : Multi-byte char
}

// konoha.parseBLOCK = function(_ctx, tk, tenv, tok_start, thunk)
// {
// 	var ch, level = 1, pos = tok_start + 1;
// 	var fmat = tenv.fmat;
// 	tk.lpos += 1;
// 	while((ch = kchar(tenv.source, pos)) != 0) {
// 		if(ch == _RBR/*}*/) {
// 			level--;
// 			if(level == 0) {
// 				if(IS_NOTNULL(tk)) {
// 					KSETv(tk.text, new_kString(tenv.source + tok_start + 1, ((pos-2)-(tok_start)+1), 0));
// 					tk.tt = TK_CODE;
// 				}
// 				return pos + 1;
// 			}
// 			pos++;
// 		}
// 		else if(ch == _LBR/*'{'*/) {
// 			level++; pos++;
// 		}
// 		else {
// 			pos = fmat[ch](_ctx, K_NULLTOKEN, tenv, pos, NULL);
// 		}
// 	}
// 	if(IS_NOTNULL(tk)) {
// 		size_t errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "must close with }");
// 		Token_toERR(_ctx, tk, errref);
// 	}
// 	return pos-1;
// }

konoha.tokenize = function(_ctx, tenv)
{
	var ch, pos = 0;
	var fmat = tenv.fmat;
	var tk = new konoha.kToken();
	//	konoha.assert(tk.tt == 0); //TODO : Is this necessary?
	tk.uline = tenv.uline;
	tk.lpos  = konoha.lpos(tenv, 0);
	pos = konoha.parseINDENT(_ctx, tk, tenv, pos, null);
	while ((ch = konoha.kchar(tenv.source, pos)) != 0) {
		if(tk.tt != 0) {
			tenv.list.data.push(tk);
			tk = new konoha.kToken();
			tk.uline = tenv.uline;
			tk.lpos  = konoha.lpos(tenv, pos);
		}
		var pos2 = fmat[ch](_ctx, tk, tenv, pos, null);
		konoha.assert(pos2 > pos);
		pos = pos2;
	}
	if(tk.tt != 0) {
		tenv.list.data.push(tk);
	}
}

konoha.KonohaSpace_tokenizerMatrix = function(_ctx, ks)
{
	if(ks.fmat == null) {
		//		DBG_ASSERT(KCHAR_MAX * sizeof(Ftokenizer) == sizeof(MiniKonohaTokenMatrix));
		var fmat;// = KMALLOC(sizeof(MiniKonohaTokenMatrix));
		if(ks.parentNULL != null && ks.parentNULL.fmat != null) {
			fmat = ks.parentNULL.fmat;
		}
		else {
			fmat = konoha.MiniKonohaTokenMatrix;
		}
		ks.fmat = fmat;
	}
	return ks.fmat;
}

konoha.KonohaSpace_setTokenizer = function(_ctx, ks, ch, f, mtd/*future extension*/)
{
	var kchar = (ch < 0) ? konoha._MULTI : cMatrix[ch];
	var fmat = konoha.KonohaSpace_tokenizerMatrix(_ctx, ks);
	fmat[kchar] = f;
}

konoha.KonohaSpace_tokenize = function(_ctx, ks, source, uline, a)
{
	var i, pos = a.length;
	var tenv = new konoha.tenv_t();
	tenv.source = source,
	tenv.uline  = uline,
	tenv.list   = a,
	tenv.bol    = source,
	tenv.indent_tab = 4,
	tenv.fmat   = ks == null ? konoha.MiniKonohaTokenMatrix : konoha.KonohaSpace_tokenizerMatrix(ks)

	konoha.tokenize(_ctx, tenv);
	if(uline == 0) {
		for(i = pos; i < a.length; i++) {
			a.Wtoks[i].uline = 0;
		}
	}
}

konoha.findTopCh = function(_ctx, tls, s, e, tt, closech)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(tk.tt == tt && (tk.text)[0] == closech) return i;
	}
	//	DBG_ASSERT(i != e);
	return e;
}

//konoha.makeSyntaxRule = function(_ctx, tls, s, e, adst);

konoha.checkNestedSyntax = function(_ctx, tls, s, e, tt, opench, closech)
{
	var i = s;
	var tk = tls.Wtoks[i];
	var t = tk.text;
	if(t[0] == opench && t[1] == 0) {
		var ne = konoha.findTopCh(_ctx, tls, i+1, e, tk.tt, closech);
		tk.tt = tt; tk.kw = tt;
		//		tk.sub = new_(TokenArray, 0);
		tk.sub = _ctx.lib2.konoha.new_Object(_ctx, CT_TokenArray, 0);
		tk.topch = opench; 
		tk.closech = closech;
		konoha.makeSyntaxRule(_ctx, tls, i+1, ne, tk.sub);
		s = ne;
		return 1;
	}
	return 0;
}

konoha.makeSyntaxRule = function(_ctx, tls, s, e, adst)
{
	var i;
	var nbuf = new Array[80];
	var nameid = 0;
	//	dumpTokenArray(_ctx, 0, tls, s, e);
	for(i = s; i < e; i++) {
		var tk = tls.Wtoks[i];
		if(tk.tt == konoha.ktoken_t.TK_INDENT) continue;
		if(tk.tt == konoha.ktoken_t.TK_TEXT /*|| tk.tt == TK_STEXT*/) {
			if(konoha.checkNestedSyntax(_ctx, tls, i, e, konoha.ktoken_t.AST_PARENTHESIS, '(', ')') ||
			   konoha.checkNestedSyntax(_ctx, tls, i, e, konoha.ktoken_t.AST_BRANCET, '[', ']') ||
			   konoha.checkNestedSyntax(_ctx, tls, i, e, konoha.ktoken_t.AST_BRACE, '{', '}')) {
			}
			else {
				tk.tt = konoha.ktoken_t.TK_CODE;
				tk.kw = konoha.keyword(_ctx, tk.text, tk.text.length, konoha.FN_NEWID);
			}
			konoha.Array_add(_ctx, adst, tk);
			continue;
		}
		if(tk.tt == konoha.TK_SYMBOL || tk.tt == konoha.TK_USYMBOL) {
			if(i > 0 && tls.toks[i-1].topch == '$') {
				//				snprintf(nbuf, sizeof(nbuf), "$%s", tk.text);
				tk.kw = konoha.keyword(_ctx, nbuf, nbuf.length, konoha.FN_NEWID);
				tk.tt = konoha.TK_METANAME;
				if(nameid == 0) nameid = tk.kw;
				tk.nameid = nameid;
				nameid = 0;
				konoha.Array_add(_ctx, adst, tk); continue;
			}
			if(i + 1 < e && tls.toks[i+1].topch == ':') {
				var tk = tls.toks[i];
				nameid = konoha.keyword(_ctx, tk.text, tk.text.length, konoha.FN_NEWID);
				i++;
				continue;
			}
		}
		if(tk.tt == konoha.ktoken_t.TK_OPERATOR) {
			if(konoha.checkNestedSyntax(_ctx, tls, i, e, konoha.ktoken_t.AST_OPTIONAL, '[', ']')) {
				konoha.Array_add(_ctx, adst, tk);
				continue;
			}
			if(tls.toks[i].topch == '$') continue;
		}
//		konoha.sugar_p(konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "illegal sugar syntax: %s", kToken_s(tk));
		return false;
	}
	return true;
}

konoha.parseSyntaxRule = function(_ctx, rule, uline, a)
{
	var tls = ctxsugar.tokens;
	pos = tls.length;
	konoha.KonohaSpace_tokenize(_ctx, null, rule, uline, tls);
	konoha.makeSyntaxRule(_ctx, tls, pos, tls.length, a);
	tls.length = 0;
}
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
	var bk = new konoha.kBlock();
	if(prt != null) {
		bk.parentNULL = prt;
	}
	var i = s, indent = 0, atop = tls.data.length;
	while(i < e) {
		var tkERR = null;
		i =  konoha.selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tls, tkERR);
		var asize = tls.data.length;
		if(asize > atop) {
			konoha.Block_addStmtline(_ctx, bk, tls, atop, asize, tkERR);
			tls.data.length = 0;
		}
	}
	return bk;
}

konoha.Token_resolved = function(_ctx, ks, tk) {//
	var kw = konoha.keyword(_ctx, tk.text, tk.text.length, konoha.FN_NONAME);
	if(kw != konoha.FN_NONAME) {
		syn = konoha.KonohaSpace_syntax(_ctx, ks, kw, 0);
		if(syn != null) {
			if(syn.ty != konoha.TY_unknown) {
				tk.kw = konoha.KW_Type;
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
		var i = 0, psize = 0, size = tkP.sub.data.length;
		var p = new konoha.Array(size);
		for(i = 0; i < size; i++) {
			var tkT = (tkP.sub.toks[i]);
			if((tkT).kw == konoha.KW_Type) {
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
				konoha.sugar_p(_ctx, ERR_, tk.uline, tk.lpos, "not generic type: %s", konoha.S_ty(tk.ty));
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
		if(!konoha.Token_resolved(_ctx, ks, tk)) {
			var ct = new konoha.kKonohaSpace_getCT(ks, null/*FIXME*/, tk.text, tk.text.length, konoha.TY_unknown);
			if(ct != null) {
				tk.kw = konoha.KW_Type;
				tk.ty = ct.cid;
			}
		}
	}
	else if(tk.tt == konoha.ktoken_t.TK_OPERATOR) {
		if(!konoha.Token_resolved(_ctx, ks, tk)) {
			var errref = konoha.sugar_p(_ctx, konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "undefined token: %s", konoha.kToken_s(tk));
			konoha.Token_toERR(_ctx, tk, errref);
			tkERR[0] = tk;
			return e;
		}
	}
	else if(tk.tt == konoha.ktoken_t.TK_CODE) {
		tk.kw = KW_Brace;
	}
	if((tk).kw == konoha.KW_Type) { 
		dst.data.push(tk);
		while(next + 1 < e) {
			var tkB = tls.toks[next + 1];
			if(tkB.topch != '[') break;
			var abuf = new konoha.kArray();
			var atop = abuf.data.length;
			next = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_BRANCET, tls,  next+1, e, ']', abuf, tkERR);
			if(!((abuf.data.length) > atop)) return next;

			tkB = abuf.toks[atop];
			tk = TokenType_resolveGenerics(_ctx, ks, tk, tkB);
			if(tk == null) {
				if(abuf != dst) {
					dst.data.push(tk);
					abuf.data.length = 0;
				}
				return next;
			}
			abuf.length = 0;
		}
	}
	else if(tk.kw > konoha.KW_Expr) {
		dst.data.push(tk);
	}
	return next;
}

konoha.Token_toBRACE = function(_ctx, tk, ks)
{
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

konoha.makeTree = function(_ctx, ks, tt, tls, s, e, closech, tlsdst, tkERRRef)

{
	var i, probablyCloseBefore = e - 1;
	var tk = tls.toks[s];
	var tkP = new konoha.kBlock();
	tlsdst.data.push;
	tkP.tt = tt;
	tkP.kw = tt;
	tkP.uline = tk.uline;
	tkP.topch = tk.topch;
	tkP.lpos = closech;
	tkP.sub = new konoha.kArray();
	for(i = s + 1; i < e; i++) {
		tk = tls.toks[i];
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
		var errref = konoha.suger_p(ERR_, tk.uline, tk.lpos, "'%c' is expected (probably before %s)", closech, konoha.kToken_s(tls.toks[probablyCloseBefore]));
		konoha.Token_toERR(_ctx, tkP, errref);
	}
	else {
		tkP.tt = konoha.ktoken_t.TK_ERR;
		tkP.text = tk.text;
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


konoha.Stmt_addAnnotation = function(_ctx, stmt, tls, s, e)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(tk.tt != konoha.ktoken_t.TK_METANAME) break;
		if(i+1 < e) {
			var buf = "@".concat(tk.text);
			var kw = konoha.keyword(_ctx, buf, S_size(tk.text)+1, FN_NEWID);
			var tk1 = tls.toks[i+1];
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

konoha.WARN_Ignored = function(_ctx, tls, s, e)
{
	if(s < e) {
		var i = s;
		var wb;
		kwb_printf(wb, "%s", konoha.kToken_s(tls.toks[i])); i++;
		while(i < e) {
			kwb_printf(wb, " %s", konoha.kToken_s(tls.toks[i])); i++;
		}
		konoha.sugar_p(WARN_, tls.toks[s].uline, tls.toks[s].lpos, "ignored tokens: %s", kwb_top(wb, 1));
	}
}

konoha.ParseStmt = function(_ctx, syn, stmt, name, tls, s, e)
{
	var lsfp = _ctx.esp;
	var esp_ = _ctx.esp;
	_ctx.esp = esp_+8;
	lsfp[K_CALLDELTA+0].o = stmt;
	lsfp[K_CALLDELTA+0].ndata = syn;
	lsfp[K_CALLDELTA+1].ivalue = name;
	lsfp[K_CALLDELTA+2].a = tls;
	lsfp[K_CALLDELTA+3].ivalue = s;
	lsfp[K_CALLDELTA+4].ivalue = e;
	var tsfp = lsfp + 0 + K_CALLDELTA;
	tsfp[K_MTDIDX].mtdNC = syn.ParseStmtNULL;
	//	tsfp[K_PCIDX].fname = __FILE__;
	tsfp[K_SHIFTIDX].shift = 0;
	tsfp[K_RTNIDX].o = knull(CT_int);
	//	tspf[K_RTNIDX].uline = __LINE__;
	_ctx.esp = (tsfp + 4 + 1);
	syn.ParseStmtNULL.fastcall_1(_ctx, tsfp, K_RTNIDX);
	tsfp[K_MTDIDX].mtdNC = null;
	_ctx.esp = exp_;
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
	var ri, ti, rule_size = rules.data.length;
	ti = s;
	for(ri = 0; ri < rule_size && ti < e; ri++) {
		var rule = rules.toks[ri];
		var tk = tls.toks[ti];
		uline = tk.uline;
		if(rule.tt == konoha.ktoken_t.TK_CODE) {
			if(rule.kw != tk.kw) {
				if(optional) return s;
				konoha.Token_p(tk, konoha.ERR_, "%s needs '%s'", konoha.T_statement_(_ctx, stmt.syn.kw), konoha.T_kw_(_ctx, rule.kw));
				return -1;
			}
			ti++;
			continue;
		}
		else if(rule.tt == konoha.ktoken_t.TK_METANAME) {
			var syn = KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), rule.kw, 0);
			if(syn == null || syn.ParseStmtNULL == null) {
				konoha.Token_p(tk, konoha.ERR_, "unknown syntax pattern: %s", konoha.T_kw_(_ctx, rule.kw));
				return -1;
			}
			var c = e;
			if(ri + 1 < rule_size && rules.toks[ri+1].tt == konoha.ktoken_t.TK_CODE) {
				c = lookAheadKeyword(tls, ti+1, e, rules.toks[ri+1]);
				if(c == -1) {
					if(optional) return s;
					konoha.Token_p(tk, konoha.ERR_, "%s needs '%s'", konoha.T_statement_(_ctx, stmt.syn.kw), konoha.T_kw_(_ctx, rule.kw));
					return -1;
				}
				ri++;
			}
			var err_count = ctxsugar.err_count;
			var next =  konoha.ParseStmt(_ctx, syn, stmt, rule.nameid, tls, ti, c);
			if(next == -1) {
				if(optional) return s;
				if(err_count == ctxsugar.err_count) {
					konoha.Token_p(tk, konoha.ERR_, "%s needs syntax pattern %s, not %s ..", konoha.T_statement_(_ctx, stmt.syn.kw), konoha.T_kw_(_ctx, rule.kw), konoha.kToken_s(tk));
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
				konoha.Token_p(tk, konoha.ERR_, "%s needs '%c'", konoha.T_statement_(_ctx, stmt.syn.kw), rule.topch);
				return -1;
			}
		}
	}
	if(!optional) {
		for(; ri < rules.data.length; ri++) {
			var rule = rules.toks[ri];
			if(rule.tt != konoha.ktoken_t.AST_OPTIONAL) {
				konoha.sugar_p(konoha.ERR_, uline, -1, "%s needs syntax pattern: %s", konoha.T_statement_(_ctx, stmt.syn.kw), konoha.T_kw_(_ctx, rule.kw));
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
	if((tk).kw == KW_Type) {
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
	if(syn.syntaxRuleNULL == null) {
		var i;
		for(i = s + 1; i < e; i++) {
			tk = tls.toks[i];
			syn = konoha.KonohaSpace_syntax(_ctx, ks, tk.kw, 0);
			if(syn.syntaxRuleNULL != null && syn.priority > 0) {
				konoha.sugar_p(DEBUG_, tk.uline, tk.lpos, "binary operator syntax kw='%s'", konoha.T_kw_(_ctx, syn.kw));
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
	var syn = konoha.KonohaSpace_getSyntaxRule(_ctx, konoha.Stmt_ks(stmt), tls, s, e);
	if(syn.syntaxRuleNULL != null) {
		stmt.syn = syn;
		ret = (konoha.matchSyntaxRule(_ctx, stmt, syn.syntaxRuleNULL, stmt.uline, tls, s, e, 0) != -1);
	}
	else {
		konoha.sugar_p(ERR_, stmt.uline, 0, "undefined syntax rule for '%s'", konoha.T_kw_(_ctx, syn.kw));
	}
	return ret;
}

konoha.Block_addStmtLine = function(_ctx, bk, tls, s, e, tkERR)
{
	var stmt = new konoha.kBlock();
	bk.blocks.data.push(stmt);
	stmt.parentNULL = bk;
	if(tkERR != null) {
		stmt.syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), konoha.KW_Err, 0);
		stmt.build = TSTMT_ERR;
		konoha.kObject_setObject(stmt, konoha.KW_Err, tkERR.text);
	}
	else {
		var estart = kerrno;
		s = konoha.Stmt_addAnnotation(_ctx, stmt, tls, s, e);
		if(!Stmt_parseSyntaxRule(_ctx, stmt, tls, s, e)) {
			konoha.kStmt_toERR(stmt, estart);
		}
	}
}

konoha.UndefinedParseExpr = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   	
	var syn = sfp[0].ndata;	
	var tls = sfp[1].o;    	
	var s = sfp[2].ivalue; 	
	var c = sfp[3].ivalue; 	
	var e = sfp[4].ivalue; 	
	tk = tls.toks[c];
	konoha.sugar_p(ERR_, tk.uline, tk.lpos, "undefined expression parser for '%s'", konoha.kToken_s(tk));
}

konoha.Stmt_isUnaryOp = function(_ctx, stmt, tk)
{
	var syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), tk.kw, 0);
	return (syn.op1 != konoha.MN_NONAME);
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
		var syn = konoha.KonohaSpace_syntax(konoha.Stmt_ks(stmt), tk.kw);
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
		if(tk.kw == konoha.KW_COMMA) {
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
		var syn = null;
		var idx = konoha.Stmt_findBinaryOp(_ctx, stmt, tls, s, e, syn);
		if(idx != -1) {
			return konoha.ParseExpr(_ctx, syn, stmt, tls, s, idx, e);
		}
		var c = s;
		syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), (tls.toks[c]).kw, 0);
		return konoha.ParseExpr(_ctx, syn, stmt, tls, c, c, e);
	}
	else {
		if (0 < s - 1) {
			konoha.sugar_p(konoha.ERR_, stmt.uline, -1, "expected expression after %s", konoha.kToken_s(tls.toks[s-1]));
		}
		else if(e < tls.length) {
			konoha.sugar_p(konoha.ERR_, stmt.uline, -1, "expected expression before %s", konoha.kToken_s(tls.toks[e]));
		}
		else {
			konoha.sugar_p(konoha.ERR_, stmt.uline, 0, "expected expression");
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
	var stmt = sfp[0].o;   	
	var syn = sfp[0].ndata;	
	var tls = sfp[1].o;    	
	var s = sfp[2].ivalue; 	
	var c = sfp[3].ivalue; 	
	var e = sfp[4].ivalue; 	
	var tk = tls.toks[c];
	var expr = new konoha.kBlock(Expr, konoha.KonohaSpace_syntax(konoha.Stmt_ks(stmt), tk.kw));
	Expr_setTerm(expr, 1);
	expr.tk = tk;
	sfp[_rix].o = konoha.kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e);
	//KNH_SAFEPOINT(_ctx, sfp);
}

konoha.ParseExpr_Op = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   	
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	var tk = tls.toks[c];
	var expr, rexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, c+1, e);
	var mn = (s == c) ? syn.op1 : syn.op2;
	if(mn != konoha.MN_NONAME && syn.ExprTyCheck == kmodsugar.UndefinedExprTyCheck) {
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
	sfp[_rix].o = expr;
	//RETURN_(expr);
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
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue; 	
	var e = sfp[4].ivalue;
	if(isFieldName(tls, c, e)) {
		var expr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
		expr = konoha.new_ConsExpr(_ctx, syn, 2, tls.toks[c+1], expr);
		sfp[_rix].o = konoha.kExpr_rightJoin(expr, stmt, tls, c+2, c+2, e);
		//RETURN_(kExpr_rightJoin
	}
	if(c + 1 < e) c++;
	sfp[_rix].o = konoha.kToken_p(tls.toks[c], ERR_, "expected field name: not %s", konoha.kToken_s(tls.toks[c]));
	//RETURN_(
}

konoha.ParseExpr_Parenthesis = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   	
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	var tk = tls.toks[c];
	if(s == c) {
		var expr = konoha.Stmt_newExpr2(_ctx, stmt, tk.sub, 0, kArray_size(tk.sub));
		sfp[_rix].o = konoha.kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e);
		//RETURN_(
	}
	else {
		var lexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
		if(lexpr == K_NULLEXPR) {
			sfp[_rix].o = lexpr;
			//RETURN_(lexpr);
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
		//RETURN_(
	}
}

konoha.ParseExpr_COMMA = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	var expr = konoha.new_ConsExpr(_ctx, syn, 1, tls.toks[c]);
	expr = konoha.Stmt_addExprParams(_ctx, stmt, expr, tls, s, e, 0/*allowEmpty*/);
	sfp[_rix].o = expr;
	//RETURN_(expr);
}

konoha.ParseExpr_DOLLAR = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	if(s == c && c + 1 < e) {
		var tk = tls.toks[c+1];
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
	sfp[_rix].o = konoha.kToken_p(tls.toks[c], konoha.ERR_, "unknown %s parser", konoha.kToken_s(tls.toks[c]));
	//RETURN_(
}

konoha.ParseStmt_Expr = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	var r = -1;
	konoha.dumpTokenArray(_ctx, 0, tls, s, e);
	var expr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, e);
	if(expr != konoha.K_NULLEXPR) {
		konoha.dumpExpr(_ctx, 0, 0, expr);
		konoha.kObject_setObject(stmt, name, expr);
		r = e;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Type = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	var r = -1;
	var tk = tls.toks[s];
	if((tk).kw == konoha.KW_Type) {
		konoha.kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Usymbol = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	var r = -1;
	var tk = tls.toks[s];
	if(tk.tt == konoha.ktoken_t.TK_USYMBOL) {
		konoha.kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Symbol = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	var r = -1;
	var tk = tls.toks[s];
	if(tk.tt == konoha.ktoken_t.TK_SYMBOL) {
		konoha.kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Params = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	var r = -1;
	var tk = tls.toks[s];
	if(tk.tt == konoha.ktoken_t.AST_PARENTHESIS) {
		var tls = tk.sub;
		var ss = 0, ee = tls.data.length;
		if(0 < ee && tls.toks[0].kw == KW_void) ss = 1;
		var bk = konoha.new_Block(_ctx, konoha.kStmt_ks(stmt), stmt, tls, ss, ee, ',');
		konoha.kObject_setObject(stmt, name, bk);
		r = s + 1;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Block = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	var tk = tls.toks[s];
	if(tk.tt == konoha.ktoken_t.TK_CODE) {
		konoha.kObject_setObject(stmt, name, tk);
		sfp[_rix].ivalue = s+1;
		//RETURNi_(s+1);
	}
	else if(tk.tt == konoha.ktoken_t.AST_BRACE) {
		var bk = konoha.new_Block(_ctx, konoha.Stmt_ks(stmt), stmt, tk.sub, 0, tk.sub.data.length, ';');
		konoha.kObject_setObject(stmt, name, bk);
		sfp[_rix].ivalue = s+1;
		//RETURNi_(s+1);
	}
	else {
		var bk = konoha.new_Block(_ctx, konoha.Stmt_ks(stmt), stmt, tls, s, e, ';');
		konoha.kObject_setObject(stmt, name, bk);
		sfp[_rix].ivalue = e;
		//RETURNi_(e);
	}
	sfp[_rix].ivalue = -1;
	//RETURNi_(-1);
}

konoha.ParseStmt_Toks = function(_ctx, sfp, _rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	if(s < e) {
		var a = new konoha.kArray();
		while(s < e) {
			a.data.push(tls.toks[s]);
			s++;
		}
		konoha.kObject_setObject(stmt, name, a);
		sfp[_rix].ivalue = e;
		//RETURNi_(e);
	}
	sfp[_rix].ivalue = -1;
	//RETURNi_(-1);
}
