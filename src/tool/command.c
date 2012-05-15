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
//#include "konoha2/gc.h"
//#include <dlfcn.h>
//#include <stdio.h>
//#include <stdlib.h>
//#include <getopt.h>
//#include <konoha2/klib.h>
//
//#ifdef __cplusplus
//extern "C" {
//#endif
//
//kstatus_t MODSUGAR_eval(CTX, const char *script, size_t len, kline_t uline);
//kstatus_t MODSUGAR_loadscript(CTX, const char *path, size_t len, kline_t pline);
//
//// -------------------------------------------------------------------------
//// getopt
//
//static int compileonly_flag = 0;
//static int interactive_flag = 0;
//
//extern int verbose_debug;
//extern int verbose_code;
//extern int verbose_sugar;
//extern int verbose_gc;
//
//static const char* startup_script = NULL;
//static const char* test_script    = NULL;
//static const char* builtin_test   = NULL;
//
//static struct option long_options[] = {
//	/* These options set a flag. */
//	{"verbose", no_argument,       &verbose_debug, 1},
//	{"verbose:gc",    no_argument, &verbose_gc, 1},
//	{"verbose:sugar", no_argument, &verbose_sugar, 1},
//	{"verbose:code",  no_argument, &verbose_code, 1},
//	{"interactive", no_argument,   0, 'i'},
//	{"typecheck",   no_argument,   0, 'c'},
//	{"start-with", required_argument, 0, 'S'},
//	{"test",  required_argument, 0, 'T'},
//	{"test-with",  required_argument, 0, 'T'},
//	{"builtin-test",  required_argument, 0, 'B'},
//	{NULL, 0, 0, 0},
//};
//
//static int konoha_ginit(int argc, char **argv)
//{
//	if(getenv("KONOHA_DEBUG") != NULL) {
//		verbose_debug = 1;
//		verbose_gc = 1;
//		verbose_sugar = 1;
//		verbose_code = 1;
//	}
//	while (1) {
//		int option_index = 0;
//		int c = getopt_long (argc, argv, "icI:S:", long_options, &option_index);
//		if (c == -1) break; /* Detect the end of the options. */
//		switch (c) {
//		case 0:
//			/* If this option set a flag, do nothing else now. */
//			if (long_options[option_index].flag != 0)
//				break;
//			printf ("option %s", long_options[option_index].name);
//			if (optarg)
//				printf (" with arg %s", optarg);
//			printf ("\n");
//			break;
//
//		case 'c':
//			compileonly_flag = 1;
//			break;
//
//		case 'i':
//			interactive_flag = 1;
//			break;
//
//		case 'B':
////			DUMP_P ("option --test-with `%s'\n", optarg);
//			builtin_test = optarg;
//			break;
//
//		case 'S':
////			DUMP_P ("option --start-with `%s'\n", optarg);
//			startup_script = optarg;
//			break;
//
//		case 'T':
////			DUMP_P ("option --test-with `%s'\n", optarg);
//			test_script = optarg;
//			break;
//
//		case '?':
//			/* getopt_long already printed an error message. */
//			break;
//
//		default:
//			abort ();
//		}
//	}
//	if(!(optind < argc)) {
//		interactive_flag = 1;
//	}
//	return optind;
//}
//
//// -------------------------------------------------------------------------
//// startup
//
//void konoha_startup(konoha_t konoha, const char *startup_script)
//{
//	char buf[256];
//	char *path = getenv("KONOHA_SCRIPTPATH"), *local = "";
//	if(path == NULL) {
//		path = getenv("KONOHA_HOME");
//		local = "/script";
//	}
//	if(path == NULL) {
//		path = getenv("HOME");
//		local = "/.konoha2/script";
//	}
//	snprintf(buf, sizeof(buf), "%s%s/%s.k", path, local, startup_script);
//	if(!konoha_load(konoha, (const char*)buf)) {
//		exit(1);
//	}
//}
//
//// -------------------------------------------------------------------------
//// minishell
//
//static char *(*kreadline)(const char *);
//static int  (*kadd_history)(const char *);
//
//static char* readline(const char* prompt)
//{
//	static int checkCTL = 0;
//	int ch, pos = 0;
//	static char linebuf[1024]; // THREAD-UNSAFE
//	fputs(prompt, stdout);
//	while((ch = fgetc(stdin)) != EOF) {
//		if(ch == '\r') continue;
//		if(ch == 27) {
//			/* ^[[A */;
//			fgetc(stdin); fgetc(stdin);
//			if(checkCTL == 0) {
//				fprintf(stdout, " - use readline, it provides better shell experience.\n");
//				checkCTL = 1;
//			}
//			continue;
//		}
//		if(ch == '\n' || pos == sizeof(linebuf) - 1) {
//			linebuf[pos] = 0;
//			break;
//		}
//		linebuf[pos] = ch;
//		pos++;
//	}
//	if(ch == EOF) return NULL;
//	char *p = (char*)malloc(pos+1);
//	memcpy(p, linebuf, pos+1);
//	return p;
//}
//
//static int add_history(const char* line)
//{
//	return 0;
//}
//
//static int checkstmt(const char *t, size_t len)
//{
//	size_t i = 0;
//	int ch, quote = 0, nest = 0;
//	L_NORMAL:
//	for(; i < len; i++) {
//		ch = t[i];
//		if(ch == '{' || ch == '[' || ch == '(') nest++;
//		if(ch == '}' || ch == ']' || ch == ')') nest--;
//		if(ch == '\'' || ch == '"' || ch == '`') {
//			if(t[i+1] == ch && t[i+2] == ch) {
//				quote = ch; i+=2;
//				goto L_TQUOTE;
//			}
//		}
//	}
//	return nest;
//	L_TQUOTE:
//	DBG_ASSERT(i > 0);
//	for(; i < len; i++) {
//		ch = t[i];
//		if(t[i-1] != '\\' && ch == quote) {
//			if(t[i+1] == ch && t[i+2] == ch) {
//				i+=2;
//				goto L_NORMAL;
//			}
//		}
//	}
//	return 1;
//}
//
//static kstatus_t readstmt(CTX, kwb_t *wb, kline_t *uline)
//{
//	int line = 1;
//	kstatus_t status = K_CONTINUE;
////	fputs(TERM_BBOLD(_ctx), stdout);
//	while(1) {
//		int check;
//		char *ln = kreadline(line == 1 ? ">>> " : "    ");
//		if(ln == NULL) {
//			kwb_free(wb);
//			status = K_BREAK;
//			break;
//		}
//		if(line > 1) kwb_putc(wb, '\n');
//		kwb_write(wb, ln, strlen(ln));
//		free(ln);
//		if((check = checkstmt(kwb_top(wb, 0), kwb_bytesize(wb))) > 0) {
//			uline[0]++;
//			line++;
//			continue;
//		}
//		if(check < 0) {
//			fputs("(Cancelled)...\n", stdout);
//			kwb_free(wb);
//		}
//		break;
//	}
//	if(kwb_bytesize(wb) > 0) {
//		kadd_history(kwb_top(wb, 1));
//	}
////	fputs(TERM_EBOLD(_ctx), stdout);
//	fflush(stdout);
//	uline[0]++;
//	return status;
//}
//
//static void dumpEval(CTX, kwb_t *wb)
//{
//	kstack_t *base = _ctx->stack;
//	ktype_t ty = base->evalty;
//	if(ty != TY_void) {
//		ksfp_t *lsfp = base->stack + base->evalidx;
//		CT_(ty)->p(_ctx, lsfp, 0, wb, P_DUMP);
//		fflush(stdout);
//		fprintf(stdout, "TY=%s EVAL=%s\n", T_cid(ty), kwb_top(wb,1));
//	}
//}
//
//static void shell(CTX)
//{
//	kwb_t wb;
//	kwb_init(&(_ctx->stack->cwb), &wb);
//	kline_t uline = FILEID_("(shell)") | 1;
//	while(1) {
//		kline_t inc = 0;
//		kstatus_t status = readstmt(_ctx, &wb, &inc);
//		if(status == K_CONTINUE && kwb_bytesize(&wb) > 0) {
//			status = konoha_eval((konoha_t)_ctx, kwb_top(&wb, 1), uline);
//			uline += inc;
//			kwb_free(&wb);
//			if(status != K_FAILED) {
//				dumpEval(_ctx, &wb);
//				kwb_free(&wb);
//			}
//		}
//		if(status == K_BREAK) {
//			break;
//		}
//	}
//	kwb_free(&wb);
//	fprintf(stdout, "\n");
//	return;
//}
//
//static void show_version(CTX)
//{
//	int i;
//	fprintf(stdout, "Konoha 2.0-alpha (Miyajima) (%d, %s)\n", K_REVISION, __DATE__);
//	fprintf(stdout, "[gcc %s]\n", __VERSION__);
//	fprintf(stdout, "options:");
//	for(i = 0; i < MOD_MAX; i++) {
//		if(_ctx->modshare[i] != NULL) {
//			fprintf(stdout, " %s", _ctx->modshare[i]->name);
//		}
//	}
//	fprintf(stdout, "\n");
//}
//
//int konoha_shell(konoha_t konoha)
//{
//	void *handler = dlopen("libreadline" K_OSDLLEXT, RTLD_LAZY);
//	void *f = (handler != NULL) ? dlsym(handler, "readline") : NULL;
//	kreadline = (f != NULL) ? (char* (*)(const char*))f : readline;
//	f = (handler != NULL) ? dlsym(handler, "add_history") : NULL;
//	kadd_history = (f != NULL) ? (int (*)(const char*))f : add_history;
//	show_version((CTX_t)konoha);
//	shell((CTX_t)konoha);
//	return 1;
//}
//
//// -------------------------------------------------------------------------
//// test
//
//static FILE *stdlog;
//static void Kreport(CTX, int level, const char *msg)
//{
//	fflush(stdlog);
//	fputs(" - ", stdlog);
//	fputs(msg, stdlog);
//	fputs("\n", stdlog);
////	fputs(" - ", stdout);
////	fputs(msg, stdout);
////	fputs("\n", stdout);
//}
//
//static const char *T_ERR(int level)
//{
//	switch(level) {
//	case CRIT_:
//	case ERR_/*ERROR*/: return "(error) ";
//	case WARN_/*WARNING*/: return "(warning) ";
//	case INFO_/*INFO, NOTICE*/: return "(info) ";
//	case PRINT_: return "";
//	default/*DEBUG*/: return "(debug) ";
//	}
//}
//
//static void Kreportf(CTX, int level, kline_t pline, const char *fmt, ...)
//{
//	if(level == DEBUG_ && !verbose_sugar) return;
//	va_list ap;
//	va_start(ap , fmt);
////	va_copy(ap2, ap);
//	fflush(stdlog);
//	if(pline != 0) {
//		const char *file = T_file(pline);
////		fprintf(stdout, " - (%s:%d) %s" , shortname(file), (kushort_t)pline, T_ERR(level));
//		fprintf(stdlog, " - (%s:%d) %s" , shortname(file), (kushort_t)pline, T_ERR(level));
//	}
//	else {
////		fprintf(stdout, " - %s" , T_ERR(level));
//		fprintf(stdlog, " - %s" , T_ERR(level));
//	}
////	vfprintf(stdout, fmt, ap);
////	fprintf(stdout, "\n");
//	vfprintf(stdlog, fmt, ap);
//	fprintf(stdlog, "\n");
//	va_end(ap);
////	va_end(ap2);
//	if(level == CRIT_) {
//		kraise(0);
//	}
//}
//
//static int check_result(FILE *fp0, FILE *fp1)
//{
//	char buf0[128];
//	char buf1[128];
//	while (true) {
//		size_t len0, len1;
//		len0 = fread(buf0, 1, sizeof(buf0), fp0);
//		len1 = fread(buf1, 1, sizeof(buf1), fp1);
//		if (len0 != len1) {
//			return 1;//FAILED
//		}
//		if (len0 == 0) {
//			break;
//		}
//		if (memcmp(buf0, buf1, len0) != 0) {
//			return 1;//FAILED
//		}
//	}
//	return 0; //OK
//}
//
//static int konoha_test(const char *testname)
//{
//	// reduced error message
//	verbose_debug = 0;
//	verbose_sugar = 0;
//	verbose_gc    = 0;
//	verbose_code  = 0;
//	konoha_t konoha = konoha_open();
//	if(startup_script != NULL) {
//		konoha_startup(konoha, startup_script);
//	}
//	int ret = 0;//OK
//	char script_file[256];
//	char correct_file[256];
//	char result_file[256];
//	snprintf(script_file, 256, "%s", testname);
//	snprintf(correct_file, 256, "%s.proof", script_file);
//	snprintf(result_file, 256, "%s.tested", script_file);
//	FILE *fp = fopen(correct_file, "r");
//	if (fp == NULL) {
//		fprintf(stdout, "no proof file: %s\n", testname);
//	}
//	stdlog = fopen(result_file, "w");
//	((struct _klib2*)konoha->lib2)->Kreport  = Kreport;
//	((struct _klib2*)konoha->lib2)->Kreportf = Kreportf;
//	konoha_load(konoha, script_file);
//	fprintf(stdlog, "Q.E.D.\n");   // Q.E.D.
//	fclose(stdlog);
//	if(fp != NULL) {
//		FILE *fp2 = fopen(result_file, "r");
//		ret = check_result(fp, fp2);
//		if(ret == 0) {
//			fprintf(stdout, "[PASS]: %s\n", testname);
//		}
//		fclose(fp);
//		fclose(fp2);
//	}
//	else {
//		ret = 1;
//	}
//	konoha_close(konoha);
//	return ret;
//}
//
//#ifdef USE_BUILTINTEST
//
//extern DEFINE_TESTFUNC KonohaTestSet[];
//
//static Ftest lookupTestFunc(DEFINE_TESTFUNC *d, const char *name)
//{
//	while(d->name != NULL) {
//		if(strcasecmp(name, d->name) == 0) {
//			return d->f;
//		}
//		d++;
//	}
//	return NULL;
//}
//#endif
//
//static int konoha_builtintest(const char* name)
//{
//#ifdef USE_BUILTINTEST
//	Ftest f = lookupTestFunc(KonohaTestSet, name);
//	if(f != NULL) {
//		konoha_t konoha = konoha_open();
//		int ret = f((CTX_t)konoha);
//		konoha_close(konoha);
//		return ret;
//	}
//	fprintf(stderr, "Built-in test is not found: '%s'\n", name);
//#else
//	fprintf(stderr, "Built-in tests are not built; rebuild with -DUSE_BUILTINTEST\n");
//#endif
//	return 1;
//}
//
//// -------------------------------------------------------------------------
//// ** main **
//
//extern int konoha_AssertResult;
//
//int main(int argc, char *argv[])
//{
//	kbool_t ret = 1;
//	int scriptidx = konoha_ginit(argc, argv);
//	if(builtin_test != NULL) {
//		return konoha_builtintest(builtin_test);
//	}
//	if(test_script != NULL) {
//		return konoha_test(test_script);
//	}
//	konoha_t konoha = konoha_open();
//	if(startup_script != NULL) {
//		konoha_startup(konoha, startup_script);
//	}
//	if(scriptidx < argc) {
//		ret = konoha_load(konoha, argv[scriptidx]);
//	}
//	if(ret && interactive_flag) {
//		ret = konoha_shell(konoha);
//	}
//	konoha_close(konoha);
//	MODGC_check_malloced_size();
//	return ret ? konoha_AssertResult: 1;
//}
//
//#ifdef __cplusplus
//}
//#endif
