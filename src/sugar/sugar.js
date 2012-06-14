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

konoha.KonohaSpace_eval = function(_ctx, ks, script)
{
	_ctx.kmodsugar.h.setup(_ctx, _ctx.kmodsugar, 0);
	var tls = _ctx.ctxsugar.tokens;
	var pos = tls.length;
	konoha.KonohaSpace_tokenize(_ctx, ks, script, 0 /* uline */, tls);
	var bk = konoha.new_Block(_ctx, ks, null, tls, pos, tls.length, ';');
	konoha.kArray_clear(tls, pos); // TODO unimplemented
	var result = Block_eval(_ctx, bk);
	return result;
}

konoha.MODSUGAR_eval = function(_ctx, script)
{
	return konoha.KonohaSpace_eval(_ctx, _ctx.kmodsugar.rootks, script);
}

konoha.KonohaSpace_loadstream = function(_ctx, ks)
{
	var script = 'p("hello");'; // TODO load script
	var _status = konoha.MODSUGAR_eval(_ctx, script);
}

konoha.KonohaSpace_loadscript = function(_ctx, ks)
{
	var _status = konoha.KonohaSpace_loadstream(_ctx, ks);
	return _status;
}

konoha.MODSUGAR_loadscript = function(_ctx)
{
	if (_ctx.ctxsugar == null) {
		_ctx.kmodsugar.h.setup(_ctx, _ctx.kmodsugar, 0);
	}
	var ns = new konoha.kKonohaSpace(_ctx.kmodsugar.rootks);
	var result = konoha.KonohaSpace_loadscript(_ctx, ns);
}

konoha.MODSUGAR_init = function(_ctx)
{
	var modsugar = {};
	modsugar.h = {};
	modsugar.h.name = 'modsugar';
	modsugar.h.setup = function(_ctx, def, newctx) {
		if (!newctx && _ctx.ctxsugar == null) {
			var base = {};
			base.tokens = [];
			base.lvarlst = [];
			base.definedMethods = [];

			base.gma = new konoha.kGamma(null);
			base.singleBlock = new konoha.kBlock(null);
			base.singleBlock.blocks.data.push(null);
			_ctx.ctxsugar = base;
		}
	}
	modsugar.rootks = new konoha.kKonohaSpace(null);
	return modsugar;
}
