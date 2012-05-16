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
///* ************************************************************************ */
//
//#ifdef __cplusplus
//extern "C" {
//#endif
//
///* ------------------------------------------------------------------------ */
///* [perror] */
//
//static const char* T_emsg(CTX, int pe)
//{
//	switch(pe) {
//		case CRIT_:
//		case ERR_: return "(error)";
//		case WARN_: return "(warning)";
//		case INFO_:
//			if(CTX_isInteractive() || CTX_isCompileOnly() || verbose_sugar) {
//				return "(info)";
//			}
//			return NULL;
//		case DEBUG_:
//			if(verbose_sugar) {
//				return "(debug)";
//			}
//			return NULL;
//	}
//	return "(unknown)";
//}
//
//static size_t vperrorf(CTX, int pe, kline_t uline, int lpos, const char *fmt, va_list ap)
//{
//	const char *msg = T_emsg(_ctx, pe);
//	size_t errref = ((size_t)-1);
//	if(msg != NULL) {
//		ctxsugar_t *base = ctxsugar;
//		kwb_t wb;
//		kwb_init(&base->cwb, &wb);
//		if(uline > 0) {
//			const char *file = T_file(uline);
////			if(lpos != -1) {
////				kwb_printf(&wb, "%s (%s:%d+%d) " , msg, shortname(file), (kushort_t)uline, (int)lpos+1);
////			}
////			else {
//				kwb_printf(&wb, "%s (%s:%d) " , msg, shortname(file), (kushort_t)uline);
////			}
//		}
//		else {
//			kwb_printf(&wb, "%s " , msg);
//		}
//		kwb_vprintf(&wb, fmt, ap);
//		msg = kwb_top(&wb, 1);
//		kString *emsg = new_kString(msg, strlen(msg), 0);
//		errref = kArray_size(base->errors);
//		kArray_add(base->errors, emsg);
//		if(pe == ERR_ || pe == CRIT_) {
//			base->err_count ++;
//		}
//		kreport(pe, S_text(emsg));
//	}
//	return errref;
//}
//
//#define SUGAR_P(PE, UL, POS, FMT, ...)  sugar_p(_ctx, PE, UL, POS, FMT,  ## __VA_ARGS__)
//#define ERR_SyntaxError(UL)  SUGAR_P(ERR_, UL, -1, "syntax sugar error at %s:%d", __FUNCTION__, __LINE__)
//
//static size_t sugar_p(CTX, int pe, kline_t uline, int lpos, const char *fmt, ...)
//{
//	va_list ap;
//	va_start(ap, fmt);
//	size_t errref = vperrorf(_ctx, pe, uline, lpos, fmt, ap);
//	va_end(ap);
//	return errref;
//}
//
//#define kToken_p(TK, PE, FMT, ...)   Token_p(_ctx, TK, PE, FMT, ## __VA_ARGS__)
//#define kExpr_p(E, PE, FMT, ...)     Expr_p(_ctx, E, PE, FMT, ## __VA_ARGS__)
//static kExpr* Token_p(CTX, kToken *tk, int pe, const char *fmt, ...)
//{
//	va_list ap;
//	va_start(ap, fmt);
//	vperrorf(_ctx, pe, tk->uline, tk->lpos, fmt, ap);
//	va_end(ap);
//	return K_NULLEXPR;
//}
//
//#define kerrno   Kerrno(_ctx)
//#define kstrerror(ENO)  Kstrerror(_ctx, ENO)
//
//static int Kerrno(CTX)
//{
//	return kArray_size(ctxsugar->errors);
//}
//
//static kString* Kstrerror(CTX, int eno)
//{
//	ctxsugar_t *base = ctxsugar;
//	size_t i;
//	for(i = eno; i < kArray_size(base->errors); i++) {
//		kString *emsg = base->errors->strings[i];
//		if(strstr(S_text(emsg), "(error)") != NULL) {
//			return emsg;
//		}
//	}
//	DBG_ABORT("kerrno=%d, |errmsgs|=%d", kerrno, kArray_size(base->errors));
//	return TS_EMPTY;
//}
//
////static void WARN_MustCloseWith(CTX, kline_t uline, int ch)
////{
////	SUGAR_P(WARN_, uline, 0, "must close with %c", ch);
////}
//
//#ifdef __cplusplus
//}
//#endif
