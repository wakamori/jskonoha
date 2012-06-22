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
konoha.karray_t =  function() {
	var bytesize = null;
	var bytebuf  = null;
	var kvs = new konoha.kvs_t();
//	union {
//		char  *bytebuf;
//		const struct _kclass **cts;
//		struct kvs_t          *kvs;
//		struct kopl_t          *opl;
//		const struct _kObject **objects;
//		struct _kObject       **refhead;  // stack->ref
//	};
	var bytemax = null;
};
///* kcid_t */
konoha.CLASS_newid = -1;      //  ((kcid_t)-1)
konoha.TY_unknown = -2;      //  ((kcid_t)-2)
konoha.FN_NONAME = -1;
konoha.FN_NEWID = -2;
konoha._NEWID = konoha.FN_NEWID
//
konoha.MOD_logger =  0
konoha.MOD_gc     =  1
konoha.MOD_code   =  2
konoha.MOD_sugar  =  3
konoha.MOD_float  = 11
konoha.MOD_iconv  = 13

konoha.CTX_isInteractive = 1
konoha.CTX_isCompileOnly = 0
konoha.CTX_isDebug       = 0

konoha.kcontext_t = function() {
	this.safepoint = null;
	this.esp = null;
	this.lib2 = {};
	/* TODO(imasahiro)
	 * checking modgc performance and remove
	 * memshare/memlocal from context
	 */
	this.memshare = null;
	this.memlocal = null;
	this.share = null;
	this.local = null;
	this.stack = null;
	this.logger = null;
//	this.modshare = null; this.modshare[MOD_sugar] => this.kmodsugar
	this.kmodsugar = new konoha.kmodsugar_t();
//	this.modlocal = null; this.modlocal[MOD_sugar] => this.ctxsugar
	this.ctxsugar = null;
};

konoha.kclass_t = function() {
	//		KCLASSSPI;
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
	this.methods = null;//new konoha.kArray();			//const struct _kArray *
	this.shortNameNULL = null;//new konoha.kArray();		//const struct _kString *
	//	union {   // default value
	this.nulvalNUL = null;//new konoha.kObject();		//const struct _kObject *
	this.WnulvalNUl = null;//new konoha.kObject();	//struct _kObject *
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
konoha.CLASS_Tvoid             = 0;
konoha.CLASS_Tvar              = 1;
konoha.CLASS_Object            = 2;
konoha.CLASS_Boolean           = 3;
konoha.CLASS_Int               = 4;
konoha.CLASS_String            = 5;
konoha.CLASS_Param             = 6;
konoha.CLASS_Method            = 7;
konoha.CLASS_Array             = 8;
konoha.CLASS_System            = 9;
konoha.CLASS_T0                = 10;    /* ParamType*/
//
//konoha.OFLAG_Tvoid   =    konoha.MAGICFLAG(0)
//konoha.CFLAG_Tvoid   =    konoha.kClass_TypeVar|kClass_UnboxType|kClass_Singleton|kClass_Final
konoha.TY_void       =    konoha.CLASS_Tvoid
//konoha.OFLAG_Tvar    =    konoha.MAGICFLAG(0)
//konoha.CFLAG_Tvar    =    konoha.CFLAG_Tvoid
//konoha.TY_var        =    konoha.CLASS_Tvar


konoha.setNullObject = function(obj) {
	this.isNullObject = true;
}
konoha.kObjectHeader = function() {
	this.magicflag = null;				//kmagicflag_t
	this.ct = null;//new konoha.kclass_t();					//kclass_t
	//	union {
	this.refc = null;				//uintptr_t
	this.gcinfo = null;			//void *
	this.hashcode = null;			//uintptr_t
	//	};
	this.kvproto = konoha.kvproto_null();//karray_t *
};


konoha.kObject = function() {
	this.h = new konoha.kObjectHeader();						//kObjectHeader
//	union {
// 	this.fields[4] = null;			//const struct _kObject
// 	this.ndata[4] = null;			//uintptr_t
//	};
};
//
konoha.kvs_t = function() {
	var key = null;   //ksymbol_t
	var ty = null;   //	ktype_t
	var val = null;  //union
//	union {
//		uintptr_t                uval;
//		kObject                 *oval;
//		const struct _kString   *sval;
//	};
};
//typedef const struct _kString kString;
konoha.kString = function()/* extends _Bytes */ {
	this.h = new konoha.kObjectHeader();        // kObjectHeader => kObjectHeader
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
konoha.IS_Array = function(o){
	return (O_bcid(o) == CLASS_Array);
}
//
//#define kArray_isUnboxData(o)    (TFLAG_is(uintptr_t,(o)->h.magicflag,kObject_Local1))
//#define kArray_setUnboxData(o,b) TFLAG_set(uintptr_t,(o)->h.magicflag,kObject_Local1,b)
//
//

konoha.kArray = function() {
	this.h = new konoha.kObjectHeader();;				//ObjectHeader
	//this.bytesize = null;		//size_t => Number
	this.data = new Array();           //union => Array
	//this.btyemax = null;		//size_t => Number
};

//
konoha.kparam_t = function() {
	this.ty = null;			//ktype_t
	this.fn = null;			//ksymbol_t
};
//
konoha.kParam = function() {
	this.h = new konoha.kObjectHeader();;				//kObjectHeader
	this.rtype = null;			//ktype_t
	this.psize = null;			//kushort_t
	this.p[3] = null;			//kparam_t
};
konoha.kreportlevel_t = new konoha.Enum (
	"CRIT_",     // raise(0)
	"ERR_",
	"WARN_",
	"INFO_",
	"DEBUG_",
	"PRINT_"
);

konoha.KSETv = function(VAR, VAL) {
	VAR = VAL;
}

konoha.kGamma = function(conf) {
	this.genv = conf;
}

konoha.FLAG_is = function(f, op) {
	return ((f & op) == op)
}

konoha.kstatus_t = new konoha.Enum (
	"K_FAILED",
	"K_CONTINUE",
	"K_BREAK"
);

// konoha.K_NULL        =    (_ctx.share.constNull)
// konoha.K_TRUE        =    (_ctx.share.constTrue)
// konoha.K_FALSE       =    (_ctx.share.constFalse)
// konoha.K_NULLPARAM   =    (_ctx.share.nullParam)
// konoha.K_DEFPARAM    =    (_ctx.share.defParam)
// konoha.K_EMPTYARRAY  =    (_ctx.share.emptyArray)
// konoha.TS_EMPTY      =    (_ctx.share.emptyString)
