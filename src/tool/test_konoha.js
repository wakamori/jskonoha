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
//#include <konoha2/konoha2.h>
//#include <konoha2/klib.h>
//#include <konoha2/gc.h>
//#include <konoha2/sugar.h>
//
//#ifdef __cplusplus
//extern "C" {
//#endif
//
////static FILE *stdlog;
////static void Kreport(CTX, int level, const char *msg)
////{
////    fflush(stdlog);
////    fputs(" - ", stdlog);
////    fputs(msg, stdlog);
////    fputs("\n", stdlog);
////}
////
////static const char *T_ERR(int level)
////{
////    switch(level) {
////    case CRIT_:
////    case ERR_/*ERROR*/: return "(error) ";
////    case WARN_/*WARNING*/: return "(warning) ";
////    case INFO_/*INFO, NOTICE*/: return "(info) ";
////    case PRINT_: return "";
////    default/*DEBUG*/: return "(debug) ";
////    }
////}
////
////static void Kreportf(CTX, int level, kline_t pline, const char *fmt, ...)
////{
////    if(level == DEBUG_ && !verbose_sugar) return;
////    va_list ap;
////    va_start(ap , fmt);
////    fflush(stdlog);
////    if(pline != 0) {
////        const char *file = T_file(pline);
////        fprintf(stdlog, " - (%s:%d) %s" , shortname(file), (kushort_t)pline,
////                T_ERR(level));
////    }
////    else {
////        fprintf(stdlog, " - %s" , T_ERR(level));
////    }
////    vfprintf(stdlog, fmt, ap);
////    fprintf(stdlog, "\n");
////    va_end(ap);
////    if(level == CRIT_) {
////        kraise(0);
////    }
////}
////
////static int check_result(char *fname0, char *fname1)
////{
////    int res = 0;
////    FILE *fp0 = fopen(fname0, "r");
////    FILE *fp1 = fopen(fname1, "r");
////    assert(fp0 != NULL && fp1 != NULL);
////    char buf0[128];
////    char buf1[128];
////    while (true) {
////        size_t len0, len1;
////        len0 = fread(buf0, 1, sizeof(buf0), fp0);
////        len1 = fread(buf1, 1, sizeof(buf1), fp1);
////        if (len0 != len1) {
////            res = 1;
////            break;
////        }
////        if (len0 == 0) {
////            break;
////        }
////        if (memcmp(buf0, buf1, len0) != 0) {
////            res = 1;
////            break;
////        }
////    }
////    L_end:;
////    fclose(fp0);
////    fclose(fp1);
////    return res;
////}
//
//int main(int argc, const char *argv[])
//{
//	/* switching to konoha --test-with */
////    char script_file[256];
////    char output_file[256];
////    char result_file[256];
////    if (argc != 4) {
////        fprintf(stderr, "usage: %s TestScriptDir OutputDir TestName\n", argv[0]);
////        return 1;
////    }
////    snprintf(script_file, 256, "%s/%s", argv[1], argv[3]);
////    snprintf(output_file, 256, "%s/%s.output.txt", argv[1], argv[3]);
////    snprintf(result_file, 256, "%s/%s.txt", argv[2], argv[3]);
////    stdlog = fopen(result_file, "w");
////    konoha_ginit(argc, argv);
////    konoha_t konoha = konoha_open();
////    konoha->lib2->Kreport  = Kreport;
////    konoha->lib2->Kreportf = Kreportf;
////    BEGIN_CONTEXT(konoha);
////    MODSUGAR_loadscript((CTX_t)konoha, script_file, strlen(script_file), 0);
////    END_CONTEXT(konoha);
////    konoha_close(konoha);
////    MODGC_check_malloced_size();
////    fclose(stdlog);
////    return check_result(result_file, output_file);
//    return 0;
//}
//
//#ifdef __cplusplus
//}
//#endif
