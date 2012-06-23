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

konoha.klib2_init = function() {
	return {};
}

konoha.KVPROTO_INIT = 8
konoha.KVPROTO_DELTA = 7

konoha.hidden = {};
konoha.hidden.pnull = new konoha.karray_t();

konoha.kvproto_null = function() // for proto_get safe null
{
	return konoha.hidden.pnull;
}

konoha.KObject_getObjectNULL = function(_ctx, data, key, defval)
{

	return  konoha.kvproto_get(data[0].h.kvproto, key | konoha.FN_BOXED);
}

konoha.KObject_setObject = function(_ctx, o, key, ty, val)
{
	var Wo = o;
	var _checko;
	konoha.kvproto_set(_ctx, Wo.h.kvproto, key | konoha.FN_BOXED, ty, val);
//	WASSERT(V);
}

konoha.kvproto_set = function(_ctx, pval, key, ty, uval)
{
	var p = pval;
	if (p.data == null) {
		p.data = new Array();
	}
	var psize = p.data.length;
	p.data[key] = uval;
}

konoha.kvproto_get = function(p, key)
{
//	console.log(key);
//	console.log(p.data[key]);
	return p.data[key];
}
