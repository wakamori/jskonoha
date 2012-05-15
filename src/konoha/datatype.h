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
//static kObject* DEFAULT_fnull(CTX, kclass_t *ct);
//
//static void Object_init(CTX, kObject *o, void *conf)
//{
//	struct _kObject *of = (struct _kObject*)o;
//	of->ndata[0] = 0;
//	of->ndata[1] = 0;
//}
//
//static void Object_reftrace(CTX, kObject *o)
//{
//	kObject *of = (kObject*)o;
//	kclass_t *ct = O_ct(of);
//	BEGIN_REFTRACE(ct->fsize);
//	size_t i;
//	for(i = 0; i < ct->fsize; i++) {
//		if(ct->fields[i].isobj) {
//			KREFTRACEv(of->fields[i]);
//		}
//	}
//	END_REFTRACE();
//}
//
//static void ObjectX_init(CTX, kObject *o, void *conf)
//{
//	struct _kObject *of = (struct _kObject*)o;
//	kclass_t *ct = O_ct(of);
//	assert(CT_isDefined(ct));
//	assert(ct->nulvalNUL != NULL);
//	memcpy(of->fields, ct->nulvalNUL->fields, ct->cstruct_size - sizeof(kObjectHeader));
//}
//
//static void Object_initdef(CTX, struct _kclass *ct, kline_t pline)
//{
//	if(ct->cid == TY_Object) return;
//	DBG_P("new object initialization ct->cstruct_size=%d", ct->cstruct_size);
//	KSETv(ct->nulvalNUL, new_kObject(ct, NULL));
//	if(ct->fsize > 0) {  // this is size of super class
//		kclass_t *supct = CT_(ct->supcid);
//		assert(ct->fsize == supct->fsize);
//		memcpy(ct->WnulvalNUL->fields, supct->nulvalNUL->fields, sizeof(kObject*) * ct->fsize);
//	}
//	if(ct->fallocsize > 0) {
//		ct->init = ObjectX_init;
//	}
//	ct->fnull = DEFAULT_fnull;
//}
//
//static kObject *new_Object(CTX, kclass_t *ct, void *conf)
//{
//	DBG_ASSERT(ct->cstruct_size > 0);
//	struct _kObject *o = (struct _kObject*) MODGC_omalloc(_ctx, ct->cstruct_size);
//	o->h.magicflag = ct->magicflag;
//	o->h.ct = ct;
//	o->h.kvproto = kvproto_null();
//	ct->init(_ctx, (kObject*)o, conf);
//	return (kObject*)o;
//}
//
//static uintptr_t Number_unbox(CTX, kObject *o)
//{
//	kNumber *n = (kNumber*)o;
//	return (uintptr_t) n->ndata;
//}
//
//// Boolean
//static void Number_init(CTX, kObject *o, void *conf)
//{
//	struct _kNumber *n = (struct _kNumber*)o;
//	n->ndata = (uintptr_t)conf;
//}
//
//static void Boolean_p(CTX, ksfp_t *sfp, int pos, kwb_t *wb, int level)
//{
//	kwb_printf(wb, sfp[pos].bvalue ? "true" : "false");
//}
//
//static kObject* Boolean_fnull(CTX, kclass_t *ct)
//{
//	return (kObject*)K_FALSE;
//}
//
//static void Int_p(CTX, ksfp_t *sfp, int pos, kwb_t *wb, int level)
//{
//	kwb_printf(wb, KINT_FMT, sfp[pos].ivalue);
//}
//
//// String
//static void String_init(CTX, kObject *o, void *conf)
//{
//	struct _kString *s = (struct _kString*)o;
//	s->text = "";
//	s->bytesize = 0;
//	S_setTextSgm(s, 1);
//}
//
//static void String_free(CTX, kObject *o)
//{
//	kString *s = (kString*)o;
//	if(S_isMallocText(s)) {
//		KFREE(s->buf, S_size(s) + 1);
//	}
//}
//
//static void String_p(CTX, ksfp_t *sfp, int pos, kwb_t *wb, int level)
//{
//	if(level == 0) {
//		kwb_printf(wb, "%s", S_text(sfp[pos].o));
//	}
//	else {
//		kwb_printf(wb, "\"%s\"", S_text(sfp[pos].o));
//	}
//}
//
//static uintptr_t String_unbox(CTX, kObject *o)
//{
//	kString *s = (kString*)o;
//	return (uintptr_t) s->text;
//}
//
////static int String_compareTo(kObject *o, kObject *o2)
////{
////	return knh_bytes_strcmp(S_tobytes((kString*)o) ,S_tobytes((kString*)o2));
////}
//
//
//static void String_checkASCII(CTX, kString *s)
//{
//	unsigned char ch = 0;
//	long len = S_size(s), n = (len + 3) / 4;
//	const unsigned char*p = (const unsigned char *)S_text(s);
//	switch(len % 4) { /* Duff's device written by ide */
//		case 0: do{ ch |= *p++;
//		case 3:     ch |= *p++;
//		case 2:     ch |= *p++;
//		case 1:     ch |= *p++;
//		} while(--n>0);
//	}
//	S_setASCII(s, (ch < 128));
//}
//
//static kString* new_String(CTX, const char *text, size_t len, int spol)
//{
//	kclass_t *ct = CT_(CLASS_String);
//	struct _kString *s = NULL; //knh_PtrMap_getS(_ctx, ct->constPoolMapNULL, text, len);
//	if(s != NULL) return s;
//	if(TFLAG_is(int, spol, SPOL_TEXT)) {
//		s = (struct _kString*)new_Object(_ctx, ct, NULL);
//		s->text = text;
//		s->bytesize = len;
//		S_setTextSgm(s, 1);
//	}
//	else if(len + 1 < sizeof(void*) * 2) {
//		s = (struct _kString*)new_Object(_ctx, ct, NULL);
//		s->text = s->inline_text;
//		s->bytesize = len;
//		S_setTextSgm(s, 1);
//		if(text != NULL) {
//			DBG_ASSERT(!TFLAG_is(int, spol, SPOL_NOCOPY));
//			memcpy(s->ubuf, text, len);
//		}
//		s->buf[len] = '\0';
//	}
//	else {
//		s = (struct _kString*)new_Object(_ctx, ct, NULL);
//		s->bytesize = len;
//		s->buf = (char*)KMALLOC(len+1);
//		S_setTextSgm(s, 0);
//		S_setMallocText(s, 1);
//		if(text != NULL) {
//			DBG_ASSERT(!TFLAG_is(int, spol, SPOL_NOCOPY));
//			memcpy(s->ubuf, text, len);
//		}
//		s->buf[len] = '\0';
//	}
//	if(TFLAG_is(int, spol, SPOL_ASCII)) {
//		S_setASCII(s, 1);
//	}
//	else if(TFLAG_is(int, spol, SPOL_UTF8)) {
//		S_setASCII(s, 0);
//	}
//	else {
//		String_checkASCII(_ctx, s);
//	}
////	if(TFLAG_is(int, policy, SPOL_POOL)) {
////		kmapSN_add(_ctx, ct->constPoolMapNO, s);
////		S_setPooled(s, 1);
////	}
//	return s;
//}
//
//static kString* new_Stringf(CTX, int spol, const char *fmt, ...)
//{
//	kwb_t wb;
//	Kwb_init(&(_ctx->stack->cwb), &wb);
//	va_list ap;
//	va_start(ap, fmt);
//	Kwb_vprintf(_ctx, &wb, fmt, ap);
//	va_end(ap);
//	const char *text = Kwb_top(_ctx, &wb, 1);
//	kString *s = new_String(_ctx, text, kwb_bytesize(&wb), spol);
//	kwb_free(&wb);
//	return s;
//}
//
//// Bytes
//
////#include <iconv.h>
////#define K_BYTES_BUFSIZE 256
////static kBytes* conv(CTX, const char* from, const char* to, const char *text, size_t len, kwb_t *wb)
////{
////	iconv_t c;
////	size_t olen = K_BYTES_BUFSIZE - 1;
////	char tmp[K_BYTES_BUFSIZE] = {'\0'};
////	kBytes *bytes;
////	char *tmpp = tmp;
////
////	bytes = (kBytes*)malloc(sizeof(kBytes));
////	c = iconv_open(from, to);
////	if (c == (iconv_t)(-1)) {
////		perror("ERROR: iconv open");
////		return NULL;
////	}
////	olen = iconv(c, (char**)&text, &len, &tmpp, &olen);
////	if (olen == (size_t)-1) {
////		perror("ERROR: iconv");
////		return NULL;
////	}
////	iconv_close(c);
////	strncpy(bytes->text, tmp, K_BYTES_BUFSIZE);
////	return bytes;
////}
////#undef K_BYTES_BUFSIZE
//
//// Array
//
//struct _kAbstractArray {
//	kObjectHeader h;
//	karray_t a;
//} ;
//
//static void Array_init(CTX, kObject *o, void *conf)
//{
//	struct _kAbstractArray *a = (struct _kAbstractArray*)o;
//	a->a.bytebuf     = NULL;
//	a->a.bytesize    = 0;
//	a->a.bytemax = ((size_t)conf * sizeof(void*));
//	if(a->a.bytemax > 0) {
//		KARRAY_INIT(&a->a, a->a.bytemax);
//	}
//	if(TY_isUnbox(O_p0(a))) {
//		kArray_setUnboxData(a, 1);
//	}
//}
//
//static void Array_reftrace(CTX, kObject *o)
//{
//	kArray *a = (kArray*)o;
//	if(!kArray_isUnboxData(a)) {
//		size_t i;
//		BEGIN_REFTRACE(kArray_size(a));
//		for(i = 0; i < kArray_size(a); i++) {
//			KREFTRACEv(a->list[i]);
//		}
//		END_REFTRACE();
//	}
//}
//
//static void Array_free(CTX, kObject *o)
//{
//	struct _kAbstractArray *a = (struct _kAbstractArray*)o;
//	KARRAY_FREE(&a->a);
//}
//
//static void Array_ensureMinimumSize(CTX, struct _kAbstractArray *a, size_t min)
//{
//	if(!((min * sizeof(void*)) < a->a.bytemax)) {
//		if(min < sizeof(kObject)) min = sizeof(kObject);
//		KARRAY_EXPAND(&a->a, min);
//	}
//}
//
////#define Array_setsize(A, N)  ((struct _kArray*)A)->size = N
//
//static void Array_add(CTX, kArray *o, kObject *value)
//{
//	size_t asize = kArray_size(o);
//	struct _kAbstractArray *a = (struct _kAbstractArray*)o;
//	Array_ensureMinimumSize(_ctx, a, asize+1);
//	DBG_ASSERT(a->a.objects[asize] == NULL);
//	KINITv(a->a.objects[asize], value);
//	a->a.bytesize = (asize+1) * sizeof(void*);
//}
//
//static void Array_insert(CTX, kArray *o, size_t n, kObject *v)
//{
//	size_t asize = kArray_size(o);
//	struct _kAbstractArray *a = (struct _kAbstractArray*)o;
//	if(!(n < asize)) {
//		Array_add(_ctx, o, v);
//	}
//	else {
//		Array_ensureMinimumSize(_ctx, a, asize+1);
//		memmove(a->a.objects+(n+1), a->a.objects+n, sizeof(kObject*) * (asize - n));
//		KINITv(a->a.objects[n], v);
//		a->a.bytesize = (asize+1) * sizeof(void*);
//	}
//}
//
////KNHAPI2(void) kArray_remove_(CTX, kArray *a, size_t n)
////{
////	DBG_ASSERT(n < a->size);
////	if (kArray_isUnboxData(a)) {
////		knh_memmove(a->nlist+n, a->nlist+(n+1), sizeof(kunbox_t) * (a->size - n - 1));
////	} else {
////		KNH_FINALv(_ctx, a->list[n]);
////		knh_memmove(a->list+n, a->list+(n+1), sizeof(kObject*) * (a->size - n - 1));
////	}
////	a->size--;
////}
//
//static void Array_clear(CTX, kArray *o, size_t n)
//{
//	DBG_ASSERT(IS_Array(o));
//	size_t asize = kArray_size(o);
//	struct _kAbstractArray *a = (struct _kAbstractArray*)o;
//	if(asize > n) {
//		bzero(a->a.objects + n, sizeof(void*) * (asize - n));  // RCGC
//	}
//	a->a.bytesize = (n) * sizeof(void*);
//}
//
//// ---------------
//// Param
//
//static kclass_t *CT_body(CTX, kclass_t *ct, size_t head, size_t body);
//
//static void Param_init(CTX, kObject *o, void *conf)
//{
//	struct _kParam *pa = (struct _kParam*)o;
//	pa->psize = 0;
//	pa->rtype = TY_void;
//}
//
//static kParam *new_Param(CTX, ktype_t rtype, int psize, kparam_t *p)
//{
//	kclass_t *ct = CT_(CLASS_Param);
//	ct = CT_body(_ctx, ct, sizeof(void*), psize * sizeof(kparam_t));
//	struct _kParam *pa = (struct _kParam*)new_Object(_ctx, ct, (void*)0);
//	pa->rtype = rtype;
//	pa->psize = psize;
//	if(psize > 0) {
//		memcpy(pa->p, p, sizeof(kparam_t) * psize);
//	}
//	return pa;
//}
//
///* --------------- */
///* Method */
//
//static void Method_init(CTX, kObject *o, void *conf)
//{
//	struct _kMethod *mtd = (struct _kMethod*)o;
//	kParam *pa = (conf == NULL) ? K_NULLPARAM : (kParam*)conf;
//	KINITv(mtd->pa, pa);
//	KINITv(mtd->tcode, (struct kToken*)K_NULL);
//	KINITv(mtd->kcode, K_NULL);
//	mtd->proceedNUL = NULL;
////	mtd->paramsNULL = NULL;
//}
//
//static void Method_reftrace(CTX, kObject *o)
//{
//	BEGIN_REFTRACE(4);
//	kMethod *mtd = (kMethod*)o;
//	KREFTRACEv(mtd->pa);
//	KREFTRACEv(mtd->tcode);
//	KREFTRACEv(mtd->kcode);
//	KREFTRACEn(mtd->proceedNUL);
//	END_REFTRACE();
//}
//
//static kMethod* new_Method(CTX, uintptr_t flag, kcid_t cid, kmethodn_t mn, kParam *paN, knh_Fmethod func)
//{
//	struct _kMethod* mtd = new_W(Method, paN);
//	mtd->flag  = flag;
//	mtd->cid     = cid;
//	mtd->mn      = mn;
//	kMethod_setFunc(mtd, func);
//	return mtd;
//}
//
//static intptr_t STUB_Method_indexOfField(kMethod *mtd)
//{
//	return -1;
//}
//
//// ---------------
//// System
//
//#define CT_System               CT_(CLASS_System)
//
//// ---------------
//
//static kclass_t *T_realtype(CTX, kclass_t *ct, kclass_t *self)
//{
//	DBG_ASSERT(ct->optvalue < self->cparam->psize);
//	kclass_t *pct = CT_(self->cparam->p[ct->optvalue].ty);
//	return pct->realtype(_ctx, pct, self);
//}
//
//// ---------------
//
//static kclass_t* Kclass(CTX, kcid_t cid, kline_t pline)
//{
//	kshare_t *share = _ctx->share;
//	if(cid < (share->ca.bytesize/sizeof(struct _kclass*))) {
//		return share->ca.cts[cid];
//	}
//	kreportf(CRIT_, pline, "invalid cid=%d", (int)cid);
//	return share->ca.cts[0];
//}
//
//static void DEFAULT_init(CTX, kObject *o, void *conf)
//{
//	(void)_ctx;(void)o;(void)conf;
//}
//
//static void DEFAULT_reftrace(CTX, kObject *o)
//{
//	(void)_ctx;(void)o;
//}
//
//static void DEFAULT_free(CTX, kObject *o)
//{
//	(void)_ctx;(void)o;
//}
//
//static void DEFAULT_p(CTX, ksfp_t *sfp, int pos, kwb_t *wb, int level)
//{
//	kwb_printf(wb, "&%p(:%s)", sfp[pos].o, T_cid(O_cid(sfp[pos].o)));
//}
//
//static uintptr_t DEFAULT_unbox(CTX, kObject *o)
//{
//	return 0;
//}
//
//static kbool_t DEFAULT_issubtype(CTX, kclass_t* c, kclass_t *t)
//{
//	return 0;
//}
//
//static kclass_t* DEFAULT_realtype(CTX, kclass_t* c, kclass_t *self)
//{
//	return c;
//}
//
//static kObject* DEFAULT_fnull(CTX, kclass_t *ct)
//{
//	DBG_ASSERT(ct->nulvalNUL != NULL);
//	return ct->nulvalNUL;
//}
//
//static kObject* DEFAULT_fnullinit(CTX, kclass_t *ct)
//{
//	assert(ct->nulvalNUL == NULL);
//	DBG_P("creating new nulval for %s", T_CT(ct));
//	KINITv(((struct _kclass*)ct)->nulvalNUL, new_kObject(ct, 0));
//	kObject_setNullObject(ct->nulvalNUL, 1);
//	((struct _kclass*)ct)->fnull = DEFAULT_fnull;
//	return ct->nulvalNUL;
//}
//
//static kObject *CT_null(CTX, kclass_t *ct)
//{
//	return ct->fnull(_ctx, ct);
//}
//
//static struct _kclass* new_CT(CTX, kclass_t *bct, KDEFINE_CLASS *s, kline_t pline)
//{
//	kshare_t *share = _ctx->share;
//	kcid_t newid = share->ca.bytesize / sizeof(struct _kclass*);
//	if(share->ca.bytesize == share->ca.bytemax) {
//		KARRAY_EXPAND(&share->ca, share->ca.bytemax * 2);
//	}
//	share->ca.bytesize += sizeof(struct _kclass*);
//	struct _kclass *ct = (struct _kclass*)KCALLOC(sizeof(kclass_t), 1);
//	share->ca.cts[newid] = (kclass_t*)ct;
//	if(bct != NULL) {
//		DBG_ASSERT(s == NULL);
//		memcpy(ct, bct, offsetof(kclass_t, cparam));
//		ct->cid = newid;
//		if(ct->fnull == DEFAULT_fnull) ct->fnull =  DEFAULT_fnullinit;
//	}
//	else {
//		DBG_ASSERT(s != NULL);
//		ct->cflag   = s->cflag;
//		ct->cid     = newid;
//		ct->bcid    = newid;
//		ct->supcid  = (s->supcid == 0) ? CLASS_Object : s->supcid;
//		ct->fields = s->fields;
//		ct->fsize  = s->fsize;
//		ct->fallocsize = s->fallocsize;
//		ct->cstruct_size = size64(s->cstruct_size);
//		DBG_ASSERT(ct->cstruct_size <= 128);
//		ct->DBG_NAME = (s->structname != NULL) ? s->structname : "N/A";
//		if(s->cparams != NULL) {
//			DBG_P("params");
//			KINITv(ct->cparam, new_kParam(s->rtype, s->psize, s->cparams));
//		}
//		// function
//		ct->init = (s->init != NULL) ? s->init : DEFAULT_init;
//		ct->reftrace = (s->reftrace != NULL) ? s->reftrace : DEFAULT_reftrace;
//		ct->p     = (s->p != NULL) ? s->p : DEFAULT_p;
//		ct->unbox = (s->unbox != NULL) ? s->unbox : DEFAULT_unbox;
//		ct->free = (s->free != NULL) ? s->free : DEFAULT_free;
//		ct->fnull = (s->fnull != NULL) ? s->fnull : DEFAULT_fnullinit;
//		ct->realtype = (s->realtype != NULL) ? s->realtype : DEFAULT_realtype;
//		ct->issubtype = (s->issubtype != NULL) ? s->issubtype : DEFAULT_issubtype;
//		ct->initdef = s->initdef;
//	}
//	if(ct->initdef != NULL) {
//		ct->initdef(_ctx, ct, pline);
//	}
//	return ct;
//}
//
//static kclass_t *CT_body(CTX, kclass_t *ct, size_t head, size_t body)
//{
//	kclass_t *bct = ct;
//	while(ct->cstruct_size < sizeof(kObjectHeader) + head + body) {
//		//DBG_P("ct->cstruct_size =%d, request_size = %d", ct->cstruct_size, head+body);
//		if(ct->searchSimilarClassNULL == NULL) {
//			struct _kclass *newct = new_CT(_ctx, bct, NULL, NOPLINE);
//			newct->cflag |= kClass_Private;
//			newct->cstruct_size = ct->cstruct_size * 2;
//			KINITv(newct->cparam, ct->cparam);
//			KINITv(newct->methods, ct->methods);
//			((struct _kclass*)ct)->searchSimilarClassNULL = (kclass_t*)newct;
//		}
//		ct = ct->searchSimilarClassNULL;
//	}
//	return ct;
//}
//
//static kbool_t CParam_equals(kParam *cpa, int psize, kparam_t *p)
//{
//	int i;
//	for(i = 0; i < psize; i++) {
//		if(cpa->p[i].ty != p[i].ty) return false;
//	}
//	return true;
//}
//
//static kParam *new_CParam(CTX, kclass_t *ct, int psize, kparam_t *p)
//{
//	int i;
//	for( i = 0; i < psize; i++) {
//		p[i].fn = ct->cparam->p[i].fn;
//	}
//	return new_kParam(TY_void, psize, p);
//}
//
//static kclass_t *CT_Generics(CTX, kclass_t *ct, int psize, kparam_t *p)
//{
//	kclass_t *ct0 = ct;
//	while(ct != NULL) {
//		kParam *cpa = ct->cparam;
//		if(cpa->psize ==  psize && CParam_equals(cpa, psize, p)) {
//			return ct;
//		}
//		if(ct->searchSimilarClassNULL == NULL) break;
//		ct = ct->searchSimilarClassNULL;
//	}
//	struct _kclass *newct = new_CT(_ctx, ct, NULL, NOPLINE);
//	KINITv(newct->cparam, new_CParam(_ctx, ct, psize, p));
//	KINITv(newct->methods, K_EMPTYARRAY);
//	if(newct->searchSuperMethodClassNULL == NULL) {
//		newct->searchSuperMethodClassNULL = ct0;
//	}
//	((struct _kclass*)ct)->searchSimilarClassNULL = (kclass_t*)newct;
//	return ct->searchSimilarClassNULL;
//}
//static kString* CT_shortName(CTX, kclass_t *ct)
//{
//	if(ct->shortNameNULL == NULL) {
//		if(ct->cparam == K_NULLPARAM) {
//			KINITv(((struct _kclass*)ct)->shortNameNULL, S_UN(ct->nameid));
//		}
//		else {
//			size_t i;
//			kString *s;
//			for(i=0; i < ct->cparam->psize; i++) {
//				CT_shortName(_ctx, CT_(ct->cparam->p[i].ty));
//			}
//			kwb_t wb;
//			Kwb_init(&(_ctx->stack->cwb), &wb);
//			s = S_UN(ct->nameid);
//			kwb_write(&wb, S_text(s), S_size(s));
//			kwb_putc(&wb, '[');
//			for(i=0; i < ct->cparam->psize; i++) {
//				if(i>0)	kwb_putc(&wb, ',');
//				s = CT_shortName(_ctx, CT_(ct->cparam->p[i].ty));
//				kwb_write(&wb, S_text(s), S_size(s));
//			}
//			if(ct->cparam->rtype != TY_void) {
//				if(i>0)	kwb_putc(&wb, '-', '>');
//				s = CT_shortName(_ctx, CT_(ct->cparam->rtype));
//				kwb_write(&wb, S_text(s), S_size(s));
//			}
//			kwb_putc(&wb, ']');
//			const char *text = Kwb_top(_ctx, &wb, 1);
//			KINITv(((struct _kclass*)ct)->shortNameNULL, new_String(_ctx, text, kwb_bytesize(&wb), SPOL_ASCII));
//			kwb_free(&wb);
//		}
//	}
//	return ct->shortNameNULL;
//}
//static void CT_setName(CTX, struct _kclass *ct, kline_t pline)
//{
//	uintptr_t lname = longid(ct->packdom, ct->nameid);
//	kreportf(DEBUG_, pline, "new class domain=%s, name='%s.%s'", T_PN(ct->packdom), T_PN(ct->packid), T_UN(ct->nameid));
//	kclass_t *ct2 = (kclass_t*)map_getu(_ctx, _ctx->share->lcnameMapNN, lname, (uintptr_t)NULL);
//	if(ct2 == NULL) {
//		map_addu(_ctx, _ctx->share->lcnameMapNN, lname, (uintptr_t)ct);
//	}
//	if(ct->methods == NULL) {
//		KINITv(ct->methods, K_EMPTYARRAY);
//		if(ct->cid > CLASS_Object) {
//			ct->searchSuperMethodClassNULL = CT_(ct->supcid);
//		}
//	}
//	if(ct->cparam == NULL) {
//		KINITv(ct->cparam, K_NULLPARAM);
//	}
//}
//
//static kclass_t *addClassDef(CTX, kpack_t packid, kpack_t packdom, kString *name, KDEFINE_CLASS *cdef, kline_t pline)
//{
//	struct _kclass *ct = new_CT(_ctx, NULL, cdef, pline);
//	ct->packid  = packid;
//	ct->packdom = packdom;
//	if(name == NULL) {
//		const char *n = cdef->structname;
//		assert(n != NULL); // structname must be set;
//		ct->nameid = kuname(n, strlen(n), SPOL_ASCII|SPOL_POOL|SPOL_TEXT, _NEWID);
//	}
//	else {
//		ct->nameid = kuname(S_text(name), S_size(name), 0, _NEWID);
//	}
//	CT_setName(_ctx, ct, pline);
//	return (kclass_t*)ct;
//}
//
//#define TYPENAME(C) \
//	.structname = #C,\
//	.cid = CLASS_T##C,\
//	.cflag = CFLAG_T##C\
//
//#define CLASSNAME(C) \
//	.structname = #C,\
//	.cid = CLASS_##C,\
//	.cflag = CFLAG_##C,\
//	.cstruct_size = sizeof(k##C)\
//
//static void loadInitStructData(CTX)
//{
//	KDEFINE_CLASS defTvoid = {
//		TYPENAME(void),
//	};
//	KDEFINE_CLASS defTvar = {
//		TYPENAME(var),
//	};
//	KDEFINE_CLASS defObject = {
//		CLASSNAME(Object),
//		.init = Object_init,
//		.reftrace = Object_reftrace,
//		.initdef = Object_initdef,
//	};
//	KDEFINE_CLASS defBoolean = {
//		CLASSNAME(Boolean),
//		.init = Number_init,
//		.unbox = Number_unbox,
//		.p    = Boolean_p,
//		.fnull = Boolean_fnull,
//	};
//	KDEFINE_CLASS defInt = {
//		CLASSNAME(Int),
//		.init  = Number_init,
//		.unbox = Number_unbox,
//		.p     = Int_p,
//	};
//	KDEFINE_CLASS defString = {
//		CLASSNAME(String),
//		.init = String_init,
//		.free = String_free,
//		.p    = String_p,
//		.unbox = String_unbox
//	};
//	KDEFINE_CLASS defParam = {
//		CLASSNAME(Param),
//		.init = Param_init,
//	};
//	KDEFINE_CLASS defMethod = {
//		CLASSNAME(Method),
//		.init = Method_init,
//		.reftrace = Method_reftrace,
//	};
//	kparam_t ArrayCparam = {TY_Object, 1};
//	KDEFINE_CLASS defArray = {
//		CLASSNAME(Array),
//		.init = Array_init,
//		.reftrace = Array_reftrace,
//		.free = Array_free,
//		.psize = 1, .cparams = &ArrayCparam,
//	};
//	KDEFINE_CLASS defSystem = {
//		CLASSNAME(System),
//		.init = DEFAULT_init,
//	};
//	KDEFINE_CLASS defT0 = {
//		TYPENAME(0),
//		.init = DEFAULT_init,
//		.realtype = T_realtype,
//	};
//	KDEFINE_CLASS *DATATYPES[] = {
//		&defTvoid,
//		&defTvar,
//		&defObject,
//		&defBoolean,
//		&defInt,
//		&defString,
//		&defParam,
//		&defMethod,
//		&defArray,
//		&defSystem,
//		&defT0,
//		NULL,
//	};
//	KDEFINE_CLASS **dd = DATATYPES;
//	while(dd[0] != NULL) {
//		new_CT(_ctx, NULL, dd[0], 0);
//		dd++;
//	}
//}
//
//static void initStructData(CTX)
//{
//	kclass_t **ctt = (kclass_t**)_ctx->share->ca.cts;
//	size_t i;//, size = _ctx->share->ca.bytesize/sizeof(struct _kclass*);
//	for(i = 0; i <= CLASS_T0; i++) {
//		struct _kclass *ct = (struct _kclass *)ctt[i];
//		const char *name = ct->DBG_NAME;
//		ct->nameid = kuname(name, strlen(name), SPOL_ASCII|SPOL_POOL|SPOL_TEXT, _NEWID);
//		CT_setName(_ctx, ct, 0);
//	}
//}
//
//static void KCLASSTABLE_initklib2(struct _klib2 *l)
//{
//	l->Kclass   = Kclass;
//	l->Knew_Object = new_Object;
//	l->Knew_String   = new_String;
//	l->Knew_Stringf  = new_Stringf;
//	//l->Kconv  = conv;
//	l->KArray_add    = Array_add;
//	l->KArray_insert = Array_insert;
//	l->KArray_clear  = Array_clear;
//	l->Knew_Param    = new_Param;
//	l->Knew_Method   = new_Method;
//	l->KMethod_indexOfField = STUB_Method_indexOfField;
//	l->KaddClassDef  = addClassDef;
//	l->Knull = CT_null;
//	l->KCT_shortName = CT_shortName;
//	l->KCT_Generics = CT_Generics;
//}
//
//static void KCLASSTABLE_init(CTX, kcontext_t *ctx)
//{
//	kshare_t *share = (kshare_t*)KCALLOC(sizeof(kshare_t), 1);
//	ctx->share = share;
//	KCLASSTABLE_initklib2((struct _klib2*)_ctx->lib2);
//	KARRAY_INIT(&share->ca, K_CLASSTABLE_INIT * sizeof(kclass_t));
//	loadInitStructData(_ctx);
////	share->cStringArray = CT_p0(_ctx, CT_Array, TY_String);
//	share->lcnameMapNN = kmap_init(0);
//	KINITv(share->fileidList, new_(StringArray, 8));
//	share->fileidMapNN = kmap_init(0);
//	KINITv(share->packList, new_(StringArray, 8));
//	share->packMapNN = kmap_init(0);
//	KINITv(share->symbolList, new_(StringArray, 32));
//	share->symbolMapNN = kmap_init(0);
//	KINITv(share->unameList, new_(StringArray, 32));
//	share->unameMapNN = kmap_init(0);
//	//
//	KINITv(share->constNull, new_(Object, NULL));
//	kObject_setNullObject(share->constNull, 1);
//	KINITv(share->constTrue,   new_(Boolean, 1));
//	KINITv(share->constFalse,  new_(Boolean, 0));
//	KINITv(share->nullParam,   new_(Param, NULL));
//	KINITv(share->defParam,   new_kParam(CLASS_Object, 0, NULL));
//	KINITv(share->emptyString, new_(String, NULL));
//	KINITv(share->emptyArray,  new_(Array, 0));
//	FILEID_("(konoha.c)");
//	PN_("konoha");    // PN_konoha
//	PN_("sugar");     // PKG_sugar
//	UN_("T");         // UN_T
//	FN_("");          // MN_
//	FN_("new");       // MN_new
//	initStructData(_ctx);
//}
//
//static void val_reftrace(CTX, kmape_t *p)
//{
//	BEGIN_REFTRACE(1);
//	KREFTRACEv(p->ovalue);
//	END_REFTRACE();
//}
//
//static void kshare_reftrace(CTX, kcontext_t *ctx)
//{
//	kshare_t *share = ctx->share;
//	kclass_t **cts = (kclass_t**)_ctx->share->ca.cts;
//	size_t i, size = _ctx->share->ca.bytesize/sizeof(struct _kclass*);
//	for(i = 0; i < size; i++) {
//		kclass_t *ct = cts[i];
//		{
//			BEGIN_REFTRACE(4);
//			KREFTRACEv(ct->cparam);
//			KREFTRACEv(ct->methods);
//			KREFTRACEn(ct->shortNameNULL);
//			KREFTRACEn(ct->nulvalNUL);
//			END_REFTRACE();
//		}
////		if (ct->constNameMapSO) kmap_reftrace(ct->constNameMapSO, keyval_reftrace);
//		if (ct->constPoolMapNO) kmap_reftrace(ct->constPoolMapNO, val_reftrace);
//	}
//
//	BEGIN_REFTRACE(10);
//	KREFTRACEv(share->constNull);
//	KREFTRACEv(share->constTrue);
//	KREFTRACEv(share->constFalse);
//	KREFTRACEv(share->emptyString);
//	KREFTRACEv(share->emptyArray);
//	KREFTRACEv(share->nullParam);
//	KREFTRACEv(share->defParam);
//
//	KREFTRACEv(share->fileidList);
//	KREFTRACEv(share->packList);
//	KREFTRACEv(share->symbolList);
//	KREFTRACEv(share->unameList);
//	END_REFTRACE();
//}
//
//static void CLASSTABLE_freeCT(CTX)
//{
//	struct _kclass **cts = (struct _kclass**)_ctx->share->ca.cts;
//	size_t i, size = _ctx->share->ca.bytesize/sizeof(struct _kclass*);
//	for(i = 0; i < size; i++) {
//		if(cts[i]->fallocsize > 0) {
//			KFREE(cts[i]->fields, cts[i]->fallocsize * sizeof(kfield_t));
//		}
//		KFREE(cts[i], sizeof(kclass_t));
//	}
//}
//
//static void CLASSTABLE_free(CTX, kcontext_t *ctx)
//{
//	kshare_t *share = ctx->share;
//	kmap_free(share->lcnameMapNN, NULL);
//	kmap_free(share->fileidMapNN, NULL);
//	kmap_free(share->packMapNN, NULL);
//	kmap_free(share->symbolMapNN, NULL);
//	kmap_free(share->unameMapNN, NULL);
//	CLASSTABLE_freeCT(_ctx);
//	KARRAY_FREE(&share->ca);
//	KFREE(share, sizeof(kshare_t));
//}
//
///* operator */
//#include "methods.h"
//
//#define _Public    kMethod_Public
//#define _Const     kMethod_Const
//#define _Immutable kMethod_Immutable
//#define _F(F)      (intptr_t)(F)
//
//static void KCLASSTABLE_loadMethod(CTX)
//{
//	int FN_x = FN_("x");
//	intptr_t MethodData[] = {
//		_Public|_Immutable|_Const, _F(Object_toString), TY_String, TY_Object, MN_to(TY_String), 0,
//		_Public|_Immutable|_Const, _F(Boolean_opNOT), TY_Boolean, TY_Boolean, MN_("opNOT"), 0,
//		_Public|_Immutable|_Const, _F(Int_opMINUS), TY_Int, TY_Int, MN_("opMINUS"), 0,
//		_Public|_Immutable|_Const, _F(Int_opADD), TY_Int, TY_Int, MN_("opADD"), 1, TY_Int, FN_x,
//		_Public|_Immutable|_Const, _F(Int_opSUB), TY_Int, TY_Int, MN_("opSUB"), 1, TY_Int, FN_x,
//		_Public|_Immutable|_Const, _F(Int_opMUL), TY_Int, TY_Int, MN_("opMUL"), 1, TY_Int, FN_x,
//		/* opDIV and opMOD raise zero divided exception. Don't set _Const */
//		_Public|_Immutable, _F(Int_opDIV), TY_Int, TY_Int, MN_("opDIV"), 1, TY_Int, FN_x,
//		_Public|_Immutable, _F(Int_opMOD), TY_Int, TY_Int, MN_("opMOD"), 1, TY_Int, FN_x,
//		_Public|_Immutable|_Const, _F(Int_opEQ),  TY_Boolean, TY_Int, MN_("opEQ"),  1, TY_Int, FN_x,
//		_Public|_Immutable|_Const, _F(Int_opNEQ), TY_Boolean, TY_Int, MN_("opNEQ"), 1, TY_Int, FN_x,
//		_Public|_Immutable|_Const, _F(Int_opLT),  TY_Boolean, TY_Int, MN_("opLT"),  1, TY_Int, FN_x,
//		_Public|_Immutable|_Const, _F(Int_opLTE), TY_Boolean, TY_Int, MN_("opLTE"), 1, TY_Int, FN_x,
//		_Public|_Immutable|_Const, _F(Int_opGT),  TY_Boolean, TY_Int, MN_("opGT"),  1, TY_Int, FN_x,
//		_Public|_Immutable|_Const, _F(Int_opGTE), TY_Boolean, TY_Int, MN_("opGTE"), 1, TY_Int, FN_x,
//		_Public|_Immutable|_Const, _F(Int_toString), TY_String, TY_Int, MN_to(TY_String), 0,
//		_Public|_Immutable|_Const, _F(String_toInt), TY_Int, TY_String, MN_to(TY_Int), 0,
//		_Public|_Immutable|_Const, _F(String_opADD), TY_String, TY_String, MN_("opADD"), 1, TY_String, FN_x | FN_COERCION,
//		_Public|_Immutable, _F(System_assert), TY_void, TY_System, MN_("assert"), 1, TY_Boolean, FN_x,
//		_Public|_Immutable, _F(System_p), TY_void, TY_System, MN_("p"), 1, TY_String, FN_("s") | FN_COERCION,
//		_Public|_Immutable, _F(System_gc), TY_void, TY_System, MN_("gc"), 0,
//		DEND,
//	};
//	kKonohaSpace_loadMethodData(NULL, MethodData);
//}
