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
konoha.T_emsg = function(_ctx, pe)
{
	switch(pe) {
	case konoha.kreportlevel_t.CRIT_:
	case konoha.kreportlevel_t.ERR_: return "(error)";
	case konoha.kreportlevel_t.WARN_: return "(warning)";
	case konoha.kreportlevel_t.INFO_:
		if(konoha.CTX_isInteractive() || konoha.CTX_isCompileOnly() || verbose_sugar) {
			return "(info)";
		}
		return null;
	case konoha.kreportlevel_t.DEBUG_:
		if(verbose_sugar) {
			return "(debug)";
		}
		return null;
	}
	return "(unknown)";
}

konoha.vperrorf = function(_ctx, pe, uline, lpos, fmt, ap)
{
	var msg = new konoha.kString();
	msg =  konoha.T_emsg(_ctx, pe);
	if(msg != null) {
		var base = _ctx.ctxsugar;
		if(uline > 0) {
			var file = konoha.T_file(uline);
			konoha.DBG_P(msg);
			konoha.DBG_P(uline);
		}
		else {
			konoha.DBG_P(msg);
		}
		konoha.DBG_P(fmt);
		konoha.DBG_P(ap);
		if(pe == konoha.kreportlevel_t.ERR_ || pe == konoha.CRIT_) {
			base.err_count = base.err_count + 1;
		}
	}
}
//
//#define SUGAR_P(PE, UL, POS, FMT, ...)  sugar_p(_ctx, PE, UL, POS, FMT,  ## __VA_ARGS__)
//#define ERR_SyntaxError(UL)  SUGAR_P(ERR_, UL, -1, "syntax sugar error at %s:%d", __FUNCTION__, __LINE__)
//
// konoha.sugar_p = function(_ctx, pe, uline, lpos, fmt)
// {
// 	va_list ap;
// 	va_start(ap, fmt);
// 	size_t errref = vperrorf(_ctx, pe, uline, lpos, fmt, ap);
// 	va_end(ap);
// 	return errref;
// }
//
//#define kToken_p(TK, PE, FMT, ...)   Token_p(_ctx, TK, PE, FMT, ## __VA_ARGS__)
//#define kExpr_p(E, PE, FMT, ...)     Expr_p(_ctx, E, PE, FMT, ## __VA_ARGS__)
konoha.Token_p = function(_ctx, tk, pe, fmt)
{
//	va_list ap;
//	va_start(ap, fmt);
	konoha.vperrorf(_ctx, pe, tk.uline, tk.lpos, fmt);
//	va_end(ap);
//	return K_NULLEXPR;

}

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
