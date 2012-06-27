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
	konoha.ct.Object.toString = function(_ctx){
		return this.data;
	}

	konoha.ct.Int.opMINUS = function(_ctx, i){
		return this.data - i.data;
	}

	konoha.ct.Float.opMINUS = function(_ctx, f){
		return this.data  -f.data;
	}

	konoha.ct.Int.opADD = function(_ctx, i) {
		return this.data + i.data;
	}

	konoha.ct.Float.opADD = function(_ctx, i) {
		return this.data + i.data;
	}

	konoha.ct.Int.opSUB = function(_ctx, i) {
		return this.data - i.data;
	}

	konoha.ct.Float.opSUB = function(_ctx, i) {
		return this.data - i.data;
	}

	konoha.ct.Int.opMUL = function(_ctx, i) {
		return this.data * i.data;
	}

	konoha.ct.Float.opMUL = function(_ctx, i) {
		return this.data * i.data;
	}

	konoha.ct.Int.opDIV = function(_ctx, i) {
		return this.data / i.data;
	}

	konoha.ct.Float.opDIV = function(_ctx, i) {
		return this.data / i.data;
	}

	konoha.ct.Int.opMOD = function(_ctx, i) {
		return this.data % i.data;
	}

	konoha.ct.Float.opMOD = function(_ctx, i) {
		return this.data % i.data;
	}

	konoha.ct.Int.opEQ = function(_ctx, i) {
		return (this.data == i.data);
	}

	konoha.ct.Float.opEQ = function(_ctx, i) {
		return (this.data == i.data);
	}

	konoha.ct.String.opEQ = function(_ctx, s) {
		return (this.data == s.data);
	}

	konoha.ct.Int.opNEQ = function(_ctx, i) {
		return (this.data != i.data);
	}

	konoha.ct.Float.opNEQ = function(_ctx, i) {
		return (this.data != i.data);
	}

	konoha.ct.String.opNEQ = function(_ctx, s) {
		return (this.data != s.data);
	}

	konoha.ct.Int.opLT = function(_ctx, i) {
		return (this.data < i.data);
	}

	konoha.ct.Float.opLT = function(_ctx, i) {
		return (this.data < i.data);
	}

	konoha.ct.Int.opLTE = function(_ctx, i) {
		return (this.data <= i.data);
	}

	konoha.ct.Float.opLTE = function(_ctx, i) {
		return (this.data <= i.data);
	}

	konoha.ct.Int.opGT = function(_ctx, i) {
		return (this.data > i.data);
	}

	konoha.ct.Float.opGT = function(_ctx, i) {
		return (this.data > i.data);
	}

	konoha.ct.Int.opGTE = function(_ctx, i) {
		return (this.data >= i.data);
	}

	konoha.ct.Float.opGTE = function(_ctx, i) {
		return (this.data >= i.data);
	}

	konoha.ct.String.toInt = function(_ctx) {
		return parseInt(this.data);
	}

	konoha.ct.String.toFloat = function(_ctx) {
		return parseFloat(this.data);
	}

	konoha.ct.String.opADD = function(_ctx, s) {
		return (this.data + s.data);
	}

	konoha.ct.Boolean.opNOT = function(_ctx) {
		return !this.data;
	}

	konoha.ct.String.opHAS = function(_ctx, s) {
		if(this.data == s.data) {
			return true;
		}else{
			return false;
		}
	}
	konoha.ct.String.trim = function(_ctx) {
		return this.data.replace(/^[\s¡¡]+|[\s¡¡]+$/g, '');
	}

	konoha.ct.String.get = function(_ctx ,i) {
		return this.data.substr(i, 1);
	}

	konoha.ct.String.startsWith = function(_ctx ,s) {
		if(this.data[0] == s.data[0]) {
			return true;
		}else{
			return false;
		}
	}

	konoha.ct.String.endsWith = function(_ctx ,s) {
		if(this.data.substr(-1,1) == s.data.substr(-1,1)) {
			return true;
		}else{
			return false;
		}
	}

	konoha.ct.String.getSize = function(_ctx) {
		return this.data.length;
	}

	konoha.ct.String.indexOf = function(_ctx, s) {
		return this.data.indexOf(s.data);
	}

	konoha.ct.String.lastindexOf = function(_ctx, s) {
		return this.data.lastindexOf(s.data);
	}

	konoha.ct.String.toUpper = function(_ctx) {
		return this.data.toUpperCase();
	}

	konoha.ct.String.toLower = function(_ctx) {
		return this.data.toLowerCase();
	}

	konoha.ct.String.substring = function(_ctx, offset, length) {
		return this.data.substr(offset.data, length.data);
	}

	konoha.ct.Array.get = function(_ctx, index) {
		return this.data[index.data];
	}

	konoha.ct.Array.set = function(_ctx, index, value) {
		this.data[index.data] = value.data;
	}

	konoha.ct.Array.newArray = function(_ctx, size) {
		return new Array(size.data);
	}

	konoha.ct.Array.add = function(_ctx, value) {
		return this.data.push(value.data);
	}

	konoha.ct.System.p = function(_ctx, val) {
		console.log(val);
	}
}

konoha.addClassDef = function(_ctx, classname) {
	konoha.ct[classname] = {};
	konoha.ct[classname].DBG_NAME = classname;
	_ctx.share.ca.push(konoha.ct[classname]);
}

konoha.loadInitStructData = function(_ctx)
{
	konoha.addClassDef(_ctx, "void");
	konoha.addClassDef(_ctx, "Tvar");
	konoha.addClassDef(_ctx, "Object");
	konoha.addClassDef(_ctx, "Boolean");
	konoha.addClassDef(_ctx, "Int");
	konoha.addClassDef(_ctx, "String");
	konoha.addClassDef(_ctx, "Array");
	konoha.addClassDef(_ctx, "Param");
	konoha.addClassDef(_ctx, "Method");
	konoha.addClassDef(_ctx, "Func");
	konoha.addClassDef(_ctx, "System");
	konoha.addClassDef(_ctx, "T0");
	konoha.addClassDef(_ctx, "Float");
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

