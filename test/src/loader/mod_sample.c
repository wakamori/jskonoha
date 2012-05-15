/****************************************************************************
 * Copyright (c) 2012, the Konoha project authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ***************************************************************************/

#include "mod_sample.h"

void ksamplemod_reftrace(CTX, struct kmodlocal_t *mod_)
{
	ksamplemod_t *mod = (ksamplemod_t*)mod_;
	BEGIN_REFTRACE(2);
	KREFTRACEv(mod->array);
	END_REFTRACE();
}

void ksamplemod_free(CTX, struct kmodlocal_t *mod_)
{
	ksamplemod_t *mod = (ksamplemod_t*)mod_;
	KFREE(mod, sizeof(ksamplemod_t));
}

void ksampleshare_setup(CTX, struct kmodshare_t *def)
{
	if(_ctx->mod[MOD_SAMPLE] == NULL) {
		ksamplemod_t *mod = (ksamplemod_t *) KCALLOC(sizeof(ksamplemod_t));
		mod->h.reftrace = ksamplemod_reftrace;
		mod->h.free     = ksamplemod_free;
		KINITv(mod->array, new_(Array, 8));
		_ctx->mod[MOD_SAMPLE] = (kmodlocal_t*)mod;
	}
}

void ksampleshare_reftrace(CTX, struct kmodshare_t *mod_)
{
}

void ksampleshare_free(CTX, struct kmodshare_t *mod_)
{
	ksampleshare_t *mod = (ksampleshare_t*)mod_;
	KFREE(mod, sizeof(ksampleshare_t));
}

void ksampleshare_init(CTX, kcontext_t *ctx)
{
	ksampleshare_t *mod = (ksampleshare_t *) KCALLOC(sizeof(ksampleshare_t));
	mod->h.name     = "sample";
	mod->h.setup    = ksampleshare_setup;
	mod->h.reftrace = ksampleshare_reftrace;
	mod->h.free     = ksampleshare_free;
	Konoha_setModule(MOD_SAMPLE, (kmodshare_t*)mod, 0);
}

