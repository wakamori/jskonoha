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


konoha.karray_t =  function() {
	this.bytesize = null;
	this.bytebuf  = null;
	this.kvs = new konoha.kvs_t();
	this.cts = new konoha.kclass_t();//		const struct _kclass **cts;
	this.bytemax = null;
};

konoha.init_class_list = [
	{classname: "void"},
	{classname: "var"},
	{classname: "Object"},
	{classname: "Boolean"},
	{classname: "Int"},
	{classname: "String"},
	{classname: "Param"},
	{classname: "Method"},
	{classname: "Func"},
	{classname: "Array"},
	{classname: "System"},
	{classname: "T0"},
	{classname: "KonohaSpace"},
	{classname: "Token"},
	{classname: "Stmt"},
	{classname: "Block"},
	{classname: "Expr"},
	{classname: "Float"},
	{classname: "Script"}
];

///* kcid_t */
konoha.CLASS_newid    = -1;      //  ((kcid_t)-1)
konoha.TY_unknown     = -2;      //  ((kcid_t)-2)
(function() { // init cid
	var tmp_array = [];
	var tmp_enum;
	for (var i in konoha.init_class_list) {
		tmp_array.push("TY_" + konoha.init_class_list[i].classname);
	}
	tmp_enum = new konoha.Enum(tmp_array);
	for (var s in tmp_enum) {
		konoha[s] = tmp_enum[s];
	}
})();


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

konoha.kshare_t = function() {
	this.ca = new Array();
	this.lcnameMapNN = null; //struct kmap_t
	this.constNull = null; //const struct _kObject *
	this.constTrue = null; //const struct _kBoolean *
	this.constFalse = null; //const struct _kBoolean *
	this.emptyString = null; //const struct _kString *
	this.emptyArray = null;  //const struct _kArray *
	this.nullParam = null;  //const struct _kParam *
	this.defParam = null;  //const struct _kParam *
	this.fileidList = null; //const struct _kArray * 
	this.fileidMapNN = null;   //struct kmap_t
	this.packList = null;   //const struct _kArray *
	this.packMapNN = null; // struct kmap_t *
	this.unameList = null;  //const struct _kArray *
	this.unameMapNN = null;  //struct kmap_t *
	this.symbolList = null;   //const struct _kArray
	this.symbolMapNN = null;  //struct kmap_t *
};

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
	this.share = new konoha.kshare_t();
	this.local = null;
	this.stack = null;
	this.logger = null;
//	this.modshare = null; this.modshare[MOD_sugar] => this.kmodsugar
	this.kmodsugar = new konoha.kmodsugar_t();
//	this.modlocal = null; this.modlocal[MOD_sugar] => this.ctxsugar
	this.ctxsugar = null;
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
konoha.TY_var        =    konoha.CLASS_Tvar


konoha.setNullObject = function(obj) {
	this.isNullObject = true;
}
konoha.kObjectHeader = function(cid) {
	this.magicflag = new konoha.kmagicflag_t();				//kmagicflag_t
	this.ct = new konoha.kclass_t();					//kclass_t
	this.ct.cid = cid;
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
konoha.K_CALLDELTA =   4
konoha.K_RTNIDX    = (-4)
konoha.K_SHIFTIDX  = (-3)
konoha.K_PCIDX     = (-2)
konoha.K_MTDIDX    = (-1)
konoha.K_TMRIDX    = (0)
konoha.K_SELFIDX   = 0
				   
konoha.K_ULINEIDX2 =  (-7)
konoha.K_SHIFTIDX2 =  (-5)
konoha.K_PCIDX2    =  (-3)
konoha.K_MTDIDX2   =  (-1)

konoha.kMethod_isStatic = function(mtd) {
	return mtd.static_flag == true ? true : false;
//	return konoha.TFLAG_is(mtd.flag, 1<<4);
}

konoha.TFLAG_is = function(f, op) {
	return ( (f & op) == op);
}

konoha.TFLAG_set = function(f, op, b) {
	if(b) {
		konoha.TFLAG_set1(f, op);
	} else {
		konoha.TFLAG_set0(f, op);
	}
}

konoha.TFLAG_set1 = function(f, op) {
    f = (f | op);
}

konoha.TFLAG_set0 = function(f, op) {
    f = (f & (~op));
}

konoha.kmagicflag_t = function() {
	this.term_flag = false;
	this.null_flag = false;
}

konoha.kObject_Local6 = 1 << 10;
konoha.kObject_Local5 = 1 << 11;
konoha.kObject_Local4 = 1 << 12;
konoha.kObject_Local3 = 1 << 13;
konoha.kObject_Local2 = 1 << 14;
konoha.kObject_Local1 = 1 << 15;

konoha.KFLAG_H = function(n) {
	return ((8*8)-n);
}
konoha.KFLAG_H0   =              ((1 << konoha.KFLAG_H(1)))
konoha.KFLAG_H1   =              ((1 << konoha.KFLAG_H(2)))
konoha.KFLAG_H2   =              ((1 << konoha.KFLAG_H(3)))
konoha.KFLAG_H3   =              ((1 << konoha.KFLAG_H(4)))
konoha.KFLAG_H4   =              ((1 << konoha.KFLAG_H(5)))
konoha.KFLAG_H5   =              ((1 << konoha.KFLAG_H(6)))
konoha.KFLAG_H6   =              ((1 << konoha.KFLAG_H(7)))
konoha.KFLAG_H7   =              ((1 << konoha.KFLAG_H(8)))

konoha.MN_ISBOOL  =   konoha.KFLAG_H0
konoha.MN_GETTER  =   konoha.KFLAG_H1
konoha.MN_SETTER  =   konoha.KFLAG_H2
konoha.MN_TOCID   =   (konoha.KFLAG_H0|konoha.KFLAG_H1)
konoha.MN_ASCID   =   (konoha.KFLAG_H0|konoha.KFLAG_H1|konoha.KFLAG_H2)

konoha.kMethod_isCoercion = function(mtd) {
	return    (konoha.TFLAG_is(mtd.flag, konoha.kMethod_Coercion));
}

konoha.kMethod_Public       =        ((1<<0))
konoha.kMethod_Virtual      =        ((1<<1))
konoha.kMethod_Hidden       =        ((1<<2))
konoha.kMethod_Const        =        ((1<<3))
konoha.kMethod_Static       =        ((1<<4))
konoha.kMethod_Immutable    =        ((1<<5))
konoha.kMethod_Restricted   =        ((1<<6))
konoha.kMethod_Overloaded   =        ((1<<7))
konoha.kMethod_CALLCC       =        ((1<<8))
konoha.kMethod_FASTCALL     =        ((1<<9))
konoha.kMethod_D            =        ((1<<10))
konoha.kMethod_Abstract     =        ((1<<11))
konoha.kMethod_Coercion     =        ((1<<12))
konoha.kMethod_SmartReturn  =        ((1<<13))

konoha.CT_ = function(_ctx, cid) {
	return _ctx.share.ca[cid];
}
