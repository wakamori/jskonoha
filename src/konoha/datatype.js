
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

konoha.loadInitStructMethodData = function(_ctx) {
	konoha.ct.Object.toString = function(_ctx, string){
		return string;
	}
	konoha.ct.Object.toString.ty = [konoha.TY_Object];
	konoha.ct.Object.toString.rtype = konoha.TY_String;

	konoha.ct.Int.opMINUS = function(_ctx, a){
		return -a;
	}
	konoha.ct.Int.opMINUS.ty = [konoha.TY_Int];
	konoha.ct.Int.opMINUS.rtype = konoha.TY_Int;

	konoha.ct.Float.opMINUS = function(_ctx, f){
		return -f;
	}
	konoha.ct.Float.opMINUS.ty = [konoha.TY_Float];
	konoha.ct.Float.opMINUS.rtype = konoha.TY_Float;

	konoha.ct.Int.opADD = function(_ctx, a, b) {
		return a + b;
	}
	konoha.ct.Int.opADD.ty = [konoha.TY_Int];
	konoha.ct.Int.opADD.rtype = konoha.TY_Int;

	konoha.ct.Float.opADD = function(_ctx, a, b) {
		return a + b;
	}
	konoha.ct.Float.opADD.ty = [konoha.TY_Float];
	konoha.ct.Float.opADD.rtype = konoha.TY_Float;

	konoha.ct.Int.opSUB = function(_ctx, a, b) {
		return a - b;
	}
	konoha.ct.Int.opSUB.ty = [konoha.TY_Int];
	konoha.ct.Int.opSUB.rtype = konoha.TY_Int;

	konoha.ct.Float.opSUB = function(_ctx, a, b) {
		return a - b;
	}
	konoha.ct.Float.opSUB.ty = [konoha.TY_Float];
	konoha.ct.Float.opSUB.rtype = konoha.TY_Float;

	konoha.ct.Int.opMUL = function(_ctx, a, b) {
		return a * b;
	}
	konoha.ct.Int.opMUL.ty = [konoha.TY_Int];
	konoha.ct.Int.opMUL.rtype = konoha.TY_Int;

	konoha.ct.Float.opMUL = function(_ctx, a, b) {
		return a * b;
	}
	konoha.ct.Float.opMUL.ty = [konoha.TY_Float];
	konoha.ct.Float.opMUL.rtype = konoha.TY_Float;

	konoha.ct.Int.opDIV = function(_ctx, a, b) {
		return a / b;
	}
	konoha.ct.Int.opDIV.ty = [konoha.TY_Int];
	konoha.ct.Int.opDIV.rtype = konoha.TY_Int;

	konoha.ct.Float.opDIV = function(_ctx, a, b) {
		return a / b;
	}
	konoha.ct.Float.opDIV.ty = [konoha.TY_Float];
	konoha.ct.Float.opDIV.rtype = konoha.TY_Float;

	konoha.ct.Int.opMOD = function(_ctx, a ,b) {
		return a % b;
	}
	konoha.ct.Int.opMOD.ty = [konoha.TY_Int];
	konoha.ct.Int.opMOD.rtype = konoha.TY_Int;

	konoha.ct.Float.opMOD = function(_ctx, a, b) {
		return a % b;
	}
	konoha.ct.Float.opMOD.ty = [konoha.TY_Float];
	konoha.ct.Float.opMOD.rtype = konoha.TY_Float;

	konoha.ct.Int.opEQ = function(_ctx, a, b) {
		return (a == b);
	}
	konoha.ct.Int.opEQ.ty = [konoha.TY_Int];
	konoha.ct.Int.opEQ.rtype = konoha.TY_Boolean;

	konoha.ct.Float.opEQ = function(_ctx, a, b) {
		return (a == b);
	}
	konoha.ct.Float.opEQ.ty = [konoha.TY_Float];
	konoha.ct.Float.opEQ.rtype = konoha.TY_Boolean;

	konoha.ct.String.opEQ = function(_ctx, str1, str2) {
		return (str1 == str2);
	}
	konoha.ct.String.opEQ.ty = [konoha.TY_String];
	konoha.ct.String.opEQ.rtype = konoha.TY_Boolean;

	konoha.ct.Int.opNEQ = function(_ctx, a ,b) {
		return (a != b);
	}
	konoha.ct.Int.opNEQ.ty = [konoha.TY_Int];
	konoha.ct.Int.opNEQ.rtype = konoha.TY_Boolean;

	konoha.ct.Float.opNEQ = function(_ctx, a, b) {
		return (a != b);
	}
	konoha.ct.Float.opNEQ.ty = [konoha.TY_Float];
	konoha.ct.Float.opNEQ.rtype = konoha.TY_Boolean;

	konoha.ct.String.opNEQ = function(_ctx, str1, str2) {
		return (str1 != str2);
	}
	konoha.ct.String.opNEQ.ty = [konoha.TY_String];
	konoha.ct.String.opNEQ.rtype = konoha.TY_Boolean;

	konoha.ct.Int.opLT = function(_ctx, a, b) {
		return (a < b);
	}
	konoha.ct.Int.opLT.ty = [konoha.TY_Int];
	konoha.ct.Int.opLT.rtype = konoha.TY_Boolean;

	konoha.ct.Float.opLT = function(_ctx, a, b) {
		return (a < b);
	}
	konoha.ct.Float.opLT.ty = [konoha.TY_Float];
	konoha.ct.Float.opLT.rtype = konoha.TY_Boolean;

	konoha.ct.Int.opLTE = function(_ctx, a, b) {
		return (a <= b);
	}
	konoha.ct.Int.opLTE.ty = [konoha.TY_Int];
	konoha.ct.Int.opLTE.rtype = konoha.TY_Boolean;

	konoha.ct.Float.opLTE = function(_ctx, a, b) {
		return (a <= b);
	}
	konoha.ct.Float.opLTE.ty = [konoha.TY_Float];
	konoha.ct.Float.opLTE.rtype = konoha.TY_Boolean;

	konoha.ct.Int.opGT = function(_ctx, a, b) {
		return (a > b);
	}
	konoha.ct.Int.opGT.ty = [konoha.TY_Int];
	konoha.ct.Int.opGT.rtype = konoha.TY_Boolean;

	konoha.ct.Float.opGT = function(_ctx, a, b) {
		return (a > b);
	}
	konoha.ct.Float.opGT.ty = [konoha.TY_Float];
	konoha.ct.Float.opGT.rtype = konoha.TY_Boolean;

	konoha.ct.Int.opGTE = function(_ctx, a, b) {
		return (a >= b);
	}
	konoha.ct.Int.opGTE.ty = [konoha.TY_Int];
	konoha.ct.Int.opGTE.rtype = konoha.TY_Boolean;

	konoha.ct.Float.opGTE = function(_ctx, a, b) {
		return (a >= b);
	}
	konoha.ct.Float.opGTE.ty = [konoha.TY_Float];
	konoha.ct.Float.opGTE.rtype = konoha.TY_Boolean;

	konoha.ct.String.toInt = function(_ctx, str) {
		return parseInt(str);
	}
	konoha.ct.String.toInt.ty = [konoha.TY_String];
	konoha.ct.String.toInt.rtype = konoha.TY_Int;

	konoha.ct.String.toFloat = function(_ctx, str) {
		return parseFloat(str);
	}
	konoha.ct.String.toFloat.ty = [konoha.TY_String];
	konoha.ct.String.toFloat.rtype = konoha.TY_Float;

	konoha.ct.String.opADD = function(_ctx, str1, str2) {
		return (str1 + str2);
	}
	konoha.ct.String.opADD.ty = [konoha.TY_String];
	konoha.ct.String.opADD.rtype = konoha.TY_String;

	konoha.ct.Boolean.opNOT = function(_ctx, expr) {
		return !expr;
	}

	konoha.ct.String.opHAS = function(_ctx, str) {
		if(this.data == str) {
			return true;
		}else{
			return false;
		}
	}
	konoha.ct.String.trim = function(_ctx, str) {
		return str.replace(/^[\s¡¡]+|[\s¡¡]+$/g, '');
	}

	konoha.ct.String.get = function(_ctx ,i) {
		return this.data.substr(i, 1);
	}

	konoha.ct.String.startsWith = function(_ctx ,str) {
		if(this.data[0] == str.data[0]) {
			return true;
		}else{
			return false;
		}
	}

	konoha.ct.String.endsWith = function(_ctx ,str) {
		if(this.data.substr(-1,1) == str.data.substr(-1,1)) {
			return true;
		}else{
			return false;
		}
	}

	konoha.ct.String.getSize = function(_ctx, str) {
		return str.length;
	}

	konoha.ct.String.indexOf = function(_ctx, str) {
		return this.data.indexOf(str);
	}

	konoha.ct.String.lastindexOf = function(_ctx, str) {
		return this.data.lastindexOf(str.data);
	}

	konoha.ct.String.toUpper = function(_ctx, str) {
		return str.toUpperCase();
	}

	konoha.ct.String.toLower = function(_ctx, str) {
		return str.toLowerCase();
	}

	konoha.ct.String.substring = function(_ctx, str, offset, length) {
		return str.substr(offset, length);
	}

	konoha.ct.Array.get = function(_ctx, array, index) {
		return array[index];
	}

	konoha.ct.Array.set = function(_ctx, array, index, value) {
		array[index] = value;
	}

	konoha.ct.Array.newArray = function(_ctx, size) {
		return new Array(size);
	}

	konoha.ct.Array.add = function(_ctx, array, value) {
		return array.push(value);
	}

	konoha.ct.System.p = function(_ctx, val) {
		console.log(val);
	}
	konoha.ct.System.p.ty = [konoha.TY_Object];
	konoha.ct.System.p.rtype = konoha.TY_void;
	konoha.ct.System.p.static_flag = true;
}

konoha.DEFAULT_fnull = function(_ctx, ct)
{
	return ct.nulvalNUL;
}

konoha.DEFAULT_fnullinit = function(_ctx, ct)
{
	var obj = konoha.new_kObject(ct, 0);
	ct.nulvaNUL = obj;
	obj.h.magicflag.null_flag = true;
	ct.fnull = DEFAULT_fnull;
	return ct.nulvalNUL;
}

konoha.new_CT = function(_ctx, bct, cdef)
{
	if (bct != null) {
		throw ('Generics');
	}
	konoha.ct[cdef.classname] = {
		DBG_NAME: cdef.classname,
		cid: _ctx.share.ca.length,
		bcid: (cdef.bcid == 0) ? _ctx.share.ca.length : cdef.bcid,
		supcid: (cdef.supcid == 0) ? konoha.CLASS_Object : cdef.supcid,
		superclass: (_ctx.share.ca.length > konoha.CLASS_Object) ? _ctx.share.ca[cdef.supcid] : null,
		fnull: konoha.DEFAULT_fnullinit,
		fsize: cdef.fsize,
	};
	_ctx.share.ca.push(konoha.ct[cdef.classname]);
	return konoha.ct[cdef.classname];
}


konoha.addClassDef = function(_ctx, classname, cdef)
{
	cdef.classname = classname;
	return konoha.new_CT(_ctx, null, cdef);
//	_ctx.share.lcnameMapNN[classname] = konoha.ct[classname];
}

konoha.loadInitStructData = function(_ctx)
{
	for (var i in konoha.init_class_list) {
		var l = konoha.init_class_list[i];
		konoha.addClassDef(_ctx, l.classname, l);
	}
	konoha.addClassDef(_ctx, "Global", {});//for global function. FIX ME!!
	konoha.loadInitStructMethodData(_ctx);
}

konoha.kcontext_t.prototype.KCLASSTABLE_init = function(_ctx) {
	this.share = new konoha.kshare_t();
	konoha.ct = {};
	konoha.loadInitStructData(_ctx);
}

// konoha.new_Object = function(_ctx, ct, conf)
// {
// 	var o = new konoha.kObject();
// 	o.h.magicflag = ct.magicflag;
// 	o.h.ct = ct;
// 	o.h.kvproto = konoha.kvproto_null();
// 	ct.init(_ctx, o, conf);
// 	return o;
// }


// konoha.new_Method = function(_ctx, flag,  cid,  mn, paN,  func)
// {
// 	var mtd = konoha.new_Object(_ctx, _ctx.share.ca.cts, paN);
// 	mtd.flag  = flag;
// 	mtd.cid     = cid;
// 	mtd.mn      = mn;
// 	konoha.kMethod_setFunc(mtd, func);
// 	return mtd;
// }

