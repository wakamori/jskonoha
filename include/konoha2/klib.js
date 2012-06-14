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
//#ifndef KONOHA2_INLINELIBS_H_
//#define KONOHA2_INLINELIBS_H_
//
//static inline size_t size64(size_t s)
//{
//	size_t base = sizeof(struct _kObject);
//	while(base < s) {
//		base *= 2;
//	}
//	return base;
//}
//
// konoha.strhash = function(name, len)
// {
// 	uintptr_t i, hcode = 0;
// 	for(i = 0; i < len; i++) {
// 		hcode = name[i] + (31 * hcode);
// 	}
// 	return hcode;
// }

//static inline uintptr_t casehash(const char *name, size_t len)
//{
//	uintptr_t i, hcode = 0;
//	for(i = 0; i < len; i++) {
//		hcode = tolower(name[i]) + (31 * hcode);
//	}
//	return hcode;
//}
//
//// --------------------------------------------------------------------------
//
//static inline const char* shortname(const char *str)
//{
//	/*XXX g++ 4.4.5 need char* cast to compile it. */
//	char *p = (char *) strrchr(str, '/');
//	return (p == NULL) ? str : (const char*)p+1;
//}
//
//#define S_file(X)  S_fileid(_ctx, X)
//#define T_file(X)  S_text(S_fileid(_ctx, X))
//static inline kString* S_fileid(CTX, kline_t fileid)
//{
//	kline_t n = (fileid >> (sizeof(kshort_t) * 8));
//	DBG_ASSERT(n < kArray_size(_ctx->share->fileidList));
//	return _ctx->share->fileidList->strings[n];
//}
//
//#define S_PN(X)    Spack_(_ctx, X)
//#define T_PN(X)    S_text(Spack_(_ctx, X))
//static inline kString* Spack_(CTX, kpack_t packid)
//{
//	DBG_ASSERT(packid < kArray_size(_ctx->share->packList));
//	return _ctx->share->packList->strings[packid];
//}
//
//#define S_UN(X)  S_UN_(_ctx, X)
//#define T_UN(X)  S_text(S_UN_(_ctx, X))
//static inline kString* S_UN_(CTX, kuname_t un)
//{
//	DBG_ASSERT(un < kArray_size(_ctx->share->unameList));
//	return _ctx->share->unameList->strings[un];
//}
//
//#define S_CT(X)   S_CT_(_ctx, X)
//#define T_CT(X)   S_text(S_CT_(_ctx, X))
//#define CT_isGenerics(ct)  (ct->cparam != K_NULLPARAM)
//
//static inline kString* S_CT_(CTX, kclass_t *ct)
//{
//	return _ctx->lib2->KCT_shortName(_ctx, ct);
//}
//
//#define S_cid(X)  S_ty_(_ctx, X)
//#define T_cid(X)  S_text(S_ty(X))
//#define S_ty(X)   S_ty_(_ctx, X)
//#define T_ty(X)   S_text(S_ty(X))
//
//static inline kString* S_ty_(CTX, ktype_t ty)
//{
//	DBG_ASSERT(ty < KARRAYSIZE(_ctx->share->ca.bytemax, intptr));
//	return S_CT_(_ctx, CT_(ty));
//}
//
//#define S_fn(fn)   S_fn_(_ctx, fn)
//#define T_fn(fn)   S_text(S_fn_(_ctx, fn))
//static inline kString* S_fn_(CTX, ksymbol_t sym)
//{
//	size_t index = (size_t) MN_UNMASK(sym);
//	DBG_ASSERT(index < kArray_size(_ctx->share->symbolList));
//	return _ctx->share->symbolList->strings[index];
//}
//
//static inline uintptr_t longid(kushort_t packdom, kushort_t un)
//{
//	uintptr_t hcode = packdom;
//	return (hcode << (sizeof(kshort_t)*8)) | un;
//}
//
//static inline kclass_t *CT_p0(CTX, kclass_t *ct, ktype_t ty)
//{
//	kparam_t p = {ty, 0};
//	return kClassTable_Generics(ct, 1, &p);
//}
//
//#define uNULL   ((uintptr_t)NULL)
//static inline void map_addu(CTX, kmap_t *kmp, uintptr_t hcode, uintptr_t uvalue)
//{
//	kmape_t *e = kmap_newentry(kmp, hcode);
//	e->uvalue = uvalue;
//	kmap_add(kmp, e);
//}
//
//static inline uintptr_t map_getu(CTX, kmap_t *kmp, uintptr_t hcode, uintptr_t def)
//{
//	kmape_t *e = kmap_get(kmp, hcode);
//	while(e != NULL) {
//		if(e->hcode == hcode) return e->uvalue;
//	}
//	return def;
//}
//
//static inline size_t check_index(CTX, kint_t n, size_t max, kline_t pline)
//{
//	size_t n1 = (size_t)n;
//	if(unlikely(!(n1 < max))) {
//		kreportf(CRIT_, pline, "Script!!: out of array index %ld < %lu", n, max);
//	}
//	return n1;
//}
//
//
//#ifdef USE_STRINGLIB
//
//#define utf8len(c)    _utf8len[(int)c]
//
//static const char _utf8len[] = {
//		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//		0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
//		2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
//		3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
//		4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 0, 0,
//};
//
//#endif
//
//
//static inline void Method_setProceedMethod(CTX, kMethod *mtd, kMethod *mtd2)
//{
//	DBG_ASSERT(mtd != mtd2);
//	DBG_ASSERT(mtd->proceedNUL == NULL);
//	KINITv(((struct _kMethod*)mtd)->proceedNUL, mtd2);
//}
//
//#endif /* KONOHA2_INLINELIBS_H_ */
