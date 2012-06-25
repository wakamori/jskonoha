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

konoha.kcontext_t.prototype.KCLASSTABLE_init = function() {
	this.share = new function(_ctx){
		//loadInitStructData(); TODO
		this.ca = new konoha.karray_t();
		this.lcnameMapNN = {};
		this.fieldList = [];
		this.fieldMapNN = {};
		this.packList = [];
		this.packMapNN = {};
		this.unameList = [];
		this.unameMapNN = {};

		this.paramMapNN = {};
		this.paramList = [];
		this.paramdomMapNN = {};
		this.paramdomList = [];

		this.constNull = {};
		konoha.setNullObject(this.constNull);
		this.constTrue = true;
		this.constFalse = false;
		this.emptyString = '';
		this.emptyArray = [];
	}(this);
}

konoha.new_Object = function(_ctx, ct, conf)
{
	var o = new konoha.kObject();
	o.h.magicflag = ct.magicflag;
	o.h.ct = ct;
	o.h.kvproto = konoha.kvproto_null();
	ct.init(_ctx, o, conf);
	return o;
}


konoha.new_Method = function(_ctx, flag,  cid,  mn, paN,  func)
{
	var mtd = konoha.new_Object(_ctx, _ctx.share.ca.cts, paN);
	mtd.flag  = flag;
	mtd.cid     = cid;
	mtd.mn      = mn;
	konoha.kMethod_setFunc(mtd, func);
	return mtd;
}

