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
/* ------------------------------------------------------------------------ */

konoha = {};

konoha.Token_toERR = function(_ctx, tk, errref)
{
	tk.tt = TK_ERR;
	KSETv(tk.text, ctxsugar.errors.strings[errref]);
}

konoha.lpos = function(tenv, s)
{
	return (tenv.bol == NULL) ? -1 : s - tenv.bol;
}

konoha.parseINDENT = function(_ctx, tk, tenv, pos, thunk)
{
	var ch, c = 0;
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '\t') { c += tenv.indent_tab; }
		else if(ch == ' ') { c += 1; }
		break;
	}
	if(IS_NOTNULL(tk)) {
		tk.tt = TK_INDENT;
		tk.lpos = 0;
	}
	return pos-1;
}

konoha.parseNL(_ctx, tk, tenv, pos, thunk)
{
	tenv.uline += 1;
	tenv.bol = tenv.source + pos + 1;
	return parseINDENT(_ctx, tk, tenv, pos+1, thunk);
}

konoha.parseNUM = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start, dot = 0;
	var ts = tenv.source;
	while((ch = ts[pos++]) != 0) {
		if(ch == '_') continue;
		if(ch == '.') {
			if(!isdigit(ts[pos])) {
				break;
			}
			dot++;
			continue;
		}
		if((ch == 'e' || ch == 'E') && (ts[pos] == '+' || ts[pos] =='-')) {
			pos++;
			continue;
		}
		if(!isalnum(ch)) break;
	}
	if(IS_NOTNULL(tk)) {
		KSETv(tk.text, new_kString(ts + tok_start, (pos-1)-tok_start, SPOL_ASCII));
		tk.tt = (dot == 0) ? TK_INT : TK_FLOAT;
	}
	return pos - 1;
}

konoha.parseSYMBOL = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	var ts = tenv.source;
	while((ch = ts[pos++]) != 0) {
		if(ch == '_' || isalnum(ch)) continue;
		break;
	}
	if(IS_NOTNULL(tk)) {
		KSETv(tk.text, new_kString(ts + tok_start, (pos-1)-tok_start, SPOL_ASCII));
		tk.tt = TK_SYMBOL;
	}
	return pos - 1;
}

konoha.parseUSYMBOL = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	var ts = tenv.source;
	while((ch = ts[pos++]) != 0) {
		if(ch == '_' || isalnum(ch)) continue;
		break;
	}
	if(IS_NOTNULL(tk)) {
		KSETv(tk.text, new_kString(ts + tok_start, (pos-1)-tok_start, SPOL_ASCII));
		tk.tt = TK_USYMBOL;
	}
	return pos - 1;
}

konoha.parseMSYMBOL(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	var ts = tenv.source;
	while((ch = ts[pos++]) != 0) {
		if(!(ch < 0)) break;
	}
	if(IS_NOTNULL(tk)) {
		KSETv(tk.text, new_kString(ts + tok_start, (pos-1)-tok_start, SPOL_UTF8));
		tk.tt = TK_MSYMBOL;
	}
	return pos - 1;
}

konoha.parseOP1 = function(_ctx, tk, tenv, tok_start, thunk)
{
	if(IS_NOTNULL(tk)) {
		const char *s = tenv.source + tok_start;
		KSETv(tk.text, new_kString(s, 1, SPOL_ASCII|SPOL_POOL));
		tk.tt = TK_OPERATOR;
		tk.topch = s[0];
	}
	return tok_start+1;
}

konoha.parseOP = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	while((ch = tenv.source[pos++]) != 0) {
		if(isalnum(ch)) break;
		switch(ch) {
			case '<': case '>': case '@': case '$': case '#':
			case '+': case '-': case '*': case '%': case '/':
			case '=': case '&': case '?': case ':': case '.':
			case '^': case '!': case '~': case '|':
			continue;
		}
		break;
	}
	if(IS_NOTNULL(tk)) {
		var s = tenv.source + tok_start;
		KSETv(tk.text, new_kString(s, (pos-1)-tok_start, SPOL_ASCII|SPOL_POOL));
		tk.tt = TK_OPERATOR;
		if(S_size(tk.text) == 1) {
			tk.topch = S_text(tk.text)[0];
		}
	}
	return pos-1;
}

konoha.parseLINE = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '\n') break;
	}
	return pos-1;/*EOF*/
}

konoha.parseCOMMENT = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, prev = 0, level = 1, pos = tok_start + 2;
	/*@#nnnn is line number */
	if(tenv.source[pos] == '@' && tenv.source[pos+1] == '#' && isdigit(tenv.source[pos+2])) {
		tenv.uline >>= (sizeof(kshort_t)*8);
		tenv.uline = (tenv.uline<<(sizeof(kshort_t)*8))  | strtoll(tenv.source + pos + 2, NULL, 10);
	}
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '\n') {
			tenv.uline += 1;
		}
		if(prev == '*' && ch == '/') {
			level--;
			if(level == 0) return pos;
		}else if(prev == '/' && ch == '*') {
			level++;
		}
		prev = ch;
	}
	if(IS_NOTNULL(tk)) {
		size_t errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "must close with */");
		Token_toERR(_ctx, tk, errref);
	}
	return pos-1;/*EOF*/
}

konoha.parseSLASH = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ts = tenv.source + tok_start;
	if(ts[1] == '/') {
		return parseLINE(_ctx, tk, tenv, tok_start, thunk);
	}
	if(ts[1] == '*') {
		return parseCOMMENT(_ctx, tk, tenv, tok_start, thunk);
	}
	return parseOP(_ctx, tk, tenv, tok_start, thunk);
}

konoha.parseDQUOTE = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, prev = '"', pos = tok_start + 1;
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '\n') {
			break;
		}
		if(ch == '"' && prev != '\\') {
			if(IS_NOTNULL(tk)) {
				KSETv(tk.text, new_kString(tenv.source + tok_start + 1, (pos-1)- (tok_start+1), 0));
				tk.tt = TK_TEXT;
			}
			return pos;
		}
		prev = ch;
	}
	if(IS_NOTNULL(tk)) {
		var errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "must close with \"");
		Token_toERR(_ctx, tk, errref);
	}
	return pos-1;
}

konoha.parseSKIP(_ctx, tk, tenv, tok_start, thunk)
{
	return tok_start+1;
}

konoha.parseUNDEF = function(_ctx, tk, tenv, tok_start, thunk)
{
	if(IS_NOTNULL(tk)) {
		var errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "undefined token character: %c", tenv.source[tok_start]);
		Token_toERR(_ctx, tk, errref);
	}
	while(tenv.source[++tok_start] != 0);
	return tok_start;
}

konoha.parseBLOCK = function(_ctx, tk, tenv, tok_start, thunk);

static const Ftokenizer MiniKonohaTokenMatrix[] = {
//#define _NULL      0
	parseSKIP,
//#define _DIGIT     2
	parseNUM,
//#define _UALPHA    3
	parseUSYMBOL,
//#define _LALPHA    4
	parseSYMBOL,
//#define _MULTI     5
	parseMSYMBOL,
//#define _NL        6
	parseNL,
//#define _TAB       7
	parseSKIP,
//#define _SP        8
	parseSKIP,
//#define _LPAR      9
	parseOP1,
//#define _RPAR      10
	parseOP1,
//#define _LSQ       11
	parseOP1,
//#define _RSQ       12
	parseOP1,
//#define _LBR       13
	parseBLOCK,
//#define _RBR       14
	parseOP1,
//#define _LT        15
	parseOP,
//#define _GT        16
	parseOP,
//#define _QUOTE     17
	parseUNDEF,
//#define _DQUOTE    18
	parseDQUOTE,
//#define _BKQUOTE   19
	parseUNDEF,
//#define _OKIDOKI   20
	parseOP,
//#define _SHARP     21
	parseOP,
//#define _DOLLAR    22
	parseOP,
//#define _PER       23
	parseOP,
//#define _AND       24
	parseOP,
//#define _STAR      25
	parseOP,
//#define _PLUS      26
	parseOP,
//#define _COMMA     27
	parseOP1,
//#define _MINUS     28
	parseOP,
//#define _DOT       29
	parseOP,
//#define _SLASH     30
	parseSLASH,
//#define _COLON     31
	parseOP,
//#define _SEMICOLON 32
	parseOP1,
//#define _EQ        33
	parseOP,
//#define _QUESTION  34
	parseOP,
//#define _AT        35
	parseOP1,
//#define _VAR       36
	parseOP,
//#define _CHILDER   37
	parseOP,
//#define _BKSLASH   38
	parseUNDEF,
//#define _HAT       39
	parseOP,
//#define _UNDER     40
	parseSYMBOL
//#define KCHAR_MAX  41
//};
//
//static const char cMatrix[128] = {
//	0/*nul*/, 1/*soh*/, 1/*stx*/, 1/*etx*/, 1/*eot*/, 1/*enq*/, 1/*ack*/, 1/*bel*/,
//	1/*bs*/,  _TAB/*ht*/, _NL/*nl*/, 1/*vt*/, 1/*np*/, 1/*cr*/, 1/*so*/, 1/*si*/,
//	/*	020 dle  021 dc1  022 dc2  023 dc3  024 dc4  025 nak  026 syn  027 etb*/
//	1, 1, 1, 1,     1, 1, 1, 1,
//	/*	030 can  031 em   032 sub  033 esc  034 fs   035 gs   036 rs   037 us*/
//	1, 1, 1, 1,     1, 1, 1, 1,
//	/*040 sp   041  !   042  "   043  #   044  $   045  %   046  &   047  '*/
//	_SP, _OKIDOKI, _DQUOTE, _SHARP, _DOLLAR, _PER, _AND, _QUOTE,
//	/*050  (   051  )   052  *   053  +   054  ,   055  -   056  .   057  /*/
//	_LPAR, _RPAR, _STAR, _PLUS, _COMMA, _MINUS, _DOT, _SLASH,
//	/*060  0   061  1   062  2   063  3   064  4   065  5   066  6   067  7 */
//	_DIGIT, _DIGIT, _DIGIT, _DIGIT,  _DIGIT, _DIGIT, _DIGIT, _DIGIT,
//	/*	070  8   071  9   072  :   073  ;   074  <   075  =   076  >   077  ? */
//	_DIGIT, _DIGIT, _COLON, _SEMICOLON, _LT, _EQ, _GT, _QUESTION,
//	/*100  @   101  A   102  B   103  C   104  D   105  E   106  F   107  G */
//	_AT, _UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA,
//	/*110  H   111  I   112  J   113  K   114  L   115  M   116  N   117  O */
//	_UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA,
//	/*120  P   121  Q   122  R   123  S   124  T   125  U   126  V   127  W*/
//	_UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA, _UALPHA,
//	/*130  X   131  Y   132  Z   133  [   134  \   135  ]   136  ^   137  _*/
//	_UALPHA, _UALPHA, _UALPHA, _LSQ, _BKSLASH, _RSQ, _HAT, _UNDER,
//	/*140  `   141  a   142  b   143  c   144  d   145  e   146  f   147  g*/
//	_BKQUOTE, _LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA,
//	/*150  h   151  i   152  j   153  k   154  l   155  m   156  n   157  o*/
//	_LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA,
//	/*160  p   161  q   162  r   163  s   164  t   165  u   166  v   167  w*/
//	_LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA, _LALPHA,
//	/*170  x   171  y   172  z   173  {   174  |   175  }   176  ~   177 del*/
//	_LALPHA, _LALPHA, _LALPHA, _LBR, _VAR, _RBR, _CHILDER, 1,
//};
//
konoha.kchar = function(t, pos)
{
	var ch = t[pos];
	return (ch < 0) ? _MULTI : cMatrix[ch];
}

konoha.parseBLOCK = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, level = 1, pos = tok_start + 1;
	var fmat = tenv.fmat;
	tk.lpos += 1;
	while((ch = kchar(tenv.source, pos)) != 0) {
		if(ch == _RBR/*}*/) {
			level--;
			if(level == 0) {
				if(IS_NOTNULL(tk)) {
					KSETv(tk.text, new_kString(tenv.source + tok_start + 1, ((pos-2)-(tok_start)+1), 0));
					tk.tt = TK_CODE;
				}
				return pos + 1;
			}
			pos++;
		}
		else if(ch == _LBR/*'{'*/) {
			level++; pos++;
		}
		else {
			pos = fmat[ch](_ctx, (struct _kToken*)K_NULLTOKEN, tenv, pos, NULL);
		}
	}
	if(IS_NOTNULL(tk)) {
		size_t errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "must close with }");
		Token_toERR(_ctx, tk, errref);
	}
	return pos-1;
}

konoha.tokenize = function(_ctx, tenv_t *tenv)
{
	var ch, pos = 0;
	var fmat = tenv.fmat;
	var tk = new_W(Token, 0);
	assert(tk.tt == 0);
	tk.uline = tenv.uline;
	tk.lpos  = lpos(tenv, tenv.source);
	pos = parseINDENT(_ctx, tk, tenv, pos, NULL);
	while((ch = kchar(tenv.source, pos)) != 0) {
		if(tk.tt != 0) {
			kArray_add(tenv.list, tk);
			tk = new_W(Token, 0);
			tk.uline = tenv.uline;
			tk.lpos  = lpos(tenv, (tenv.source + pos));
		}
		int pos2 = fmat[ch](_ctx, tk, tenv, pos, NULL);
		assert(pos2 > pos);
		pos = pos2;
	}
	if(tk.tt != 0) {
		kArray_add(tenv.list, tk);
	}
}

konoha.KonohaSpace_tokenizerMatrix = function(_ctx, ks)
{
	if(ks.fmat == NULL) {
		DBG_ASSERT(KCHAR_MAX * sizeof(Ftokenizer) == sizeof(MiniKonohaTokenMatrix));
		var fmat = KMALLOC(sizeof(MiniKonohaTokenMatrix));
		if(ks.parentNULL != NULL && ks.parentNULL.fmat != NULL) {
			memcpy(fmat, ks.parentNULL.fmat, sizeof(MiniKonohaTokenMatrix));
		}
		else {
			memcpy(fmat, MiniKonohaTokenMatrix, sizeof(MiniKonohaTokenMatrix));
		}
		ks.fmat = fmat;
	}
	return ks.fmat;
}

konoha.KonohaSpace_setTokenizer = function(_ctx, ks, ch, f, mtd/*future extension*/)
{
	var kchar = (ch < 0) ? _MULTI : cMatrix[ch];
	var fmat = KonohaSpace_tokenizerMatrix(_ctx, ks);
	fmat[kchar] = f;
}

konoha.KonohaSpace_tokenize = function(_ctx, ks, source, uline, a)
{
	var i, pos = kArray_size(a);
	var tenv = {
		.source = source,
		.uline  = uline,
		.list   = a,
		.bol    = source,
		.indent_tab = 4,
		.fmat   = ks == NULL ? MiniKonohaTokenMatrix : KonohaSpace_tokenizerMatrix(_ctx, ks),
	};
	tokenize(_ctx, &tenv);
	if(uline == 0) {
		for(i = pos; i < kArray_size(a); i++) {
			a.Wtoks[i].uline = 0;
		}
	}
}

 --------------------------------------------------------------------------

konoha.findTopCh = function(_ctx, tls, s, e, tt, closech)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(tk.tt == tt && S_text(tk.text)[0] == closech) return i;
	}
	DBG_ASSERT(i != e);
	return e;
}

konoha.makeSyntaxRule = function(_ctx, tls, s, e, adst);

konoha.checkNestedSyntax = function(_ctx, tls, s, e, tt, opench, closech)
{
	var i = s;
	var tk = tls.Wtoks[i];
	var t = S_text(tk.text);
	if(t[0] == opench && t[1] == 0) {
		int ne = findTopCh(_ctx, tls, i+1, e, tk.tt, closech);
		tk.tt = tt; tk.kw = tt;
		KSETv(tk.sub, new_(TokenArray, 0));
		tk.topch = opench; tk.closech = closech;
		makeSyntaxRule(_ctx, tls, i+1, ne, tk.sub);
		s = ne;
		return 1;
	}
	return 0;
}

konoha.makeSyntaxRule = function(_ctx, tls, s, e, adst)
{
	var i;
	var nbuf[80];
	var nameid = 0;
	dumpTokenArray(_ctx, 0, tls, s, e);
	for(i = s; i < e; i++) {
		var tk = tls.Wtoks[i];
		if(tk.tt == TK_INDENT) continue;
		if(tk.tt == TK_TEXT /*|| tk.tt == TK_STEXT*/) {
			if(checkNestedSyntax(_ctx, tls, &i, e, AST_PARENTHESIS, '(', ')') ||
				checkNestedSyntax(_ctx, tls, &i, e, AST_BRANCET, '[', ']') ||
				checkNestedSyntax(_ctx, tls, &i, e, AST_BRACE, '{', '}')) {
			}
			else {
				tk.tt = TK_CODE;
				tk.kw = keyword(_ctx, S_text(tk.text), S_size(tk.text), FN_NEWID);
			}
			kArray_add(adst, tk);
			continue;
		}
		if(tk.tt == TK_SYMBOL || tk.tt == TK_USYMBOL) {
			if(i > 0 && tls.toks[i-1].topch == '$') {
				snprintf(nbuf, sizeof(nbuf), "$%s", S_text(tk.text));
				tk.kw = keyword(_ctx, (const char*)nbuf, strlen(nbuf), FN_NEWID);
				tk.tt = TK_METANAME;
				if(nameid == 0) nameid = tk.kw;
				tk.nameid = nameid;
				nameid = 0;
				kArray_add(adst, tk); continue;
			}
			if(i + 1 < e && tls.toks[i+1].topch == ':') {
				var tk = tls.toks[i];
				nameid = keyword(_ctx, S_text(tk.text), S_size(tk.text), FN_NEWID);
				i++;
				continue;
			}
		}
		if(tk.tt == TK_OPERATOR) {
			if(checkNestedSyntax(_ctx, tls, &i, e, AST_OPTIONAL, '[', ']')) {
				kArray_add(adst, tk);
				continue;
			}
			if(tls.toks[i].topch == '$') continue;
		}
		SUGAR_P(ERR_, tk.uline, tk.lpos, "illegal sugar syntax: %s", kToken_s(tk));
		return false;
	}
	return true;
}

konoha.parseSyntaxRule = function(_ctx, rule, uline, a)
{
	var tls = ctxsugar.tokens;
	 pos = kArray_size(tls);
	KonohaSpace_tokenize(_ctx, NULL, rule, uline, tls);
	makeSyntaxRule(_ctx, tls, pos, kArray_size(tls), a);
	kArray_clear(tls, pos);
}

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
///* ************************************************************************ */

//#ifdef __cplusplus
//extern "C" {
//#endif

/* ------------------------------------------------------------------------ */
// Block

//static int selectStmtLine(_ctx, kKonohaSpace *ks, int *indent, kArray *tls, int s, int e, int delim, kArray *tlsdst, kToken **tkERRRef);
//static void Block_addStmtLine(_ctx, kBlock *bk, kArray *tls, int s, int e, kToken *tkERR);
//static int makeTree(_ctx, kKonohaSpace *ks, ktoken_t tt, kArray *tls, int s, int e, int closech, kArray *tlsdst, kToken **tkERRRef);


konoha.new_Block = function(_ctx, ks, parent, tls, s, e, delim) {
	var bk = new_W(Block, ks)
	PUSH_GCSTACK(bk);
	if(parent != NULL) {
		KINITv(bk.parentNULL, parent);
	}
    var i = s, indent = 0, atop = kArray_size(tls);
    while(i < e) {
    	var tkERR = NULL;
    	DBG_ASSERT(atop == kArray_size(tls));
    	i = selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tls, tkERR);
    	var asize = kArray_size(tls);
    	if(asize > atop) {
    		Block_addStmtline(_ctx, bk, tls, atop, asize, tkERR);
    		kArray_clear(tls, atop);
    		}
    	}
    return bk;
}

konoha.Token_resolved = function(_ctx, ks, tk) {
	var kw = keyword(_ctx, S_text(tk.text), S_size(tk.text), FN_NONAME);
	if(kw != FN_NONAME) {
		syn = SYN_(ks, kw);
	if(syn != NULL) {
			if(syn.ty != TY_unknown) {
				tk.kw = KW_Type; tk.ty = syn.ty;
			}
			else {
				tk.kw = kw;
			}
			return 1;
		}
	}
return 0;
}

konoha.TokenType_resolveGenerics = function(_ctx, ks, tk, tkP) {
	if(tkP.tt == AST_BRANCET) {
		var i, psize = 0, size = kArray_size(tkP.sub);
		var p[size];
		for(i = 0; i < size; i++) {
			var tkT = (tkP.sub.toks[i]);
			if(TK_isType(tkT)) {
				p[psize].ty = TK_type(tkT);
				psize++;
				continue;
			}
			if(tkT.topch == ',') continue;
			return NULL;  new int[10];
		}
	var ct;
		if(psize > 0) {
			ct = CT_(TK_type(tk));
			if(ct.cparam == K_NULLPARAM) {
				SUGAR_P(ERR_, tk.uline, tk.lpos, "not generic type: %s", T_ty(TK_type(tk)));
				return tk;
			}
			ct = kClassTable_Generics(ct, psize, p);
		}
		else {
			ct = CT_p0(_ctx, CT_Array, TK_type(tk));
		}
		tk.ty = ct.cid;
		return tk;
	}
	return NULL;
}

konoha.appendKeyword = function(_ctx, ks, tls, s, e, dst, tkERR)
{
	var ext = s;
	var tk = tls.Wtoks[s];
	if(tk.tt < TK_OPERATOR) {
		tk.kw = tk.tt;
	}
	if(tk.tt == TK_SYMBOL) {
		Token_resolved(_ctx, ks, tk);
	}
	else if(tk.tt == TK_USYMBOL) {
		if(!Token_resolved(_ctx, ks, tk)) {
			var ct = kKonohaSpace_getCT(ks, NULL/*FIXME*/, S_text(tk.text), S_size(tk.text), TY_unknown);
			if(ct != NULL) {
				tk.kw = KW_Type;
				tk.ty = ct.cid;
			}
		}
	}
	else if(tk.tt == TK_OPERATOR) {
		if(!Token_resolved(_ctx, ks, tk)) {
			var errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "undefined token: %s", kToken_s(tk));
			Token_toERR(_ctx, tk, errref);
			tkERR[0] = tk;
			return e;
		}
	}
	else if(tk.tt == TK_CODE) {
		tk.kw = KW_Brace;
	}
	if(TK_isType(tk)) { 
		kArray_add(dst, tk);
		while(next + 1 < e) {
			var tkB = tls.toks[next + 1];
			if(tkB.topch != '[') break;
			var abuf = ctxsugar.tokens;
			var atop = kArray_size(abuf);
			next = makeTree(_ctx, ks, AST_BRANCET, tls,  next+1, e, ']', abuf, tkERR);
			if(!(kArray_size(abuf) > atop)) return next;
			tkB = abuf.toks[atop];
			tk = TokenType_resolveGenerics(_ctx, ks, tk, tkB);
			if(tk == NULL) {
				DBG_P("APPEND tkB.tt=%s", T_tt(tkB.tt));
				if(abuf != dst) {
					kArray_add(dst, tkB);
					kArray_clear(abuf, atop);
				}
				DBG_P("next=%d", next);
				return next;
			}
			kArray_clear(abuf, atop);
		}
	}
	else if(tk.kw > KW_Expr) {
		kArray_add(dst, tk);
	}
	return next;
}

konoha.Token_toBRACE = function(_ctx, tk, ks)
{
	if(tk.tt == TK_CODE) {
		INIT_GCSTACK();
		var a = new_(TokenArray, 0);
		PUSH_GCSTACK(a);
		KonohaSpace_tokenize(_ctx, ks, S_text(tk.text), tk.uline, a);
		tk.tt = AST_BRACE; tk.topch = '{'; tk.closech = '}';
		KSETv(tk.sub, a);
		RESET_GCSTACK();
		return 1;
	}
	return 0;
}

konoha.makeTree = function(_ctx, ks, tt, tls, s, e, closech, tlsdst, tkERRRef)
 
{
	var i, probablyCloseBefore = e - 1;
	var tk = tls.toks[s];
	DBG_ASSERT(tk.kw == 0);
	if(AST_PARENTHESIS <= tk.tt && tk.tt <= AST_BRACE) {
		kArray_add(tlsdst, tk);
		return s;
	}
	var tkP = new_W(Token, 0);
	kArray_add(tlsdst, tkP);
	tkP.tt = tt; tkP.kw = tt; tkP.uline = tk.uline; tkP.topch = tk.topch; tkP.lpos = closech;
	KSETv(tkP.sub, new_(TokenArray, 0));
	for(i = s + 1; i < e; i++) {
		tk = tls.toks[i];
		DBG_ASSERT(tk.kw == 0);
		if(tk.tt == TK_ERR) break;   ERR
		DBG_ASSERT(tk.topch != '{');
		if(tk.topch == '(') {
			i = makeTree(_ctx, ks, AST_PARENTHESIS, tls, i, e, ')', tkP.sub, tkERRRef);
			continue;
		}
		if(tk.topch == '[') {
			i = makeTree(_ctx, ks, AST_BRANCET, tls, i, e, ']', tkP.sub, tkERRRef);
			continue;
		}
		if(tk.topch == closech) {
			return i;
		}
		if((closech == ')' || closech == ']') && tk.tt == TK_CODE) probablyCloseBefore = i;
		if(tk.tt == TK_INDENT && closech != '}') continue;   remove INDENT;
		i = appendKeyword(_ctx, ks, tls, i, e, tkP.sub, tkERRRef);
	}
	if(tk.tt != TK_ERR) {
		var errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "'%c' is expected (probably before %s)", closech, kToken_s(tls.toks[probablyCloseBefore]));
		Token_toERR(_ctx, tkP, errref);
	}
	else {
		tkP.tt = TK_ERR;
		KSETv(tkP.text, tk.text);
	}
	tkERRRef[0] = tkP;
	return e;
}

konoha.selectStmtLine = function(_ctx, ks, indent, tls, s, e, delim, tlsdst, tkERRRef)
{
	var i = s;
	DBG_ASSERT(e <= kArray_size(tls));
	for(; i < e - 1; i++) {
		var tk = tls.toks[i];
		var tk1 = tls.Wtoks[i+1];
		if(tk.kw > 0) break;
		if(tk.topch == '@' && (tk1.tt == TK_SYMBOL || tk1.tt == TK_USYMBOL)) {
			tk1.tt = TK_METANAME;  tk1.kw = 0;
			kArray_add(tlsdst, tk1); i++;
			if(i + 1 < e && tls.toks[i+1].topch == '(') {
				i = makeTree(_ctx, ks, AST_PARENTHESIS, tls, i+1, e, ')', tlsdst, tkERRRef);
			}
			continue;
		}
		if(tk.tt == TK_METANAME) {
			kArray_add(tlsdst, tk);
			if(tk1.tt == AST_PARENTHESIS) {
				kArray_add(tlsdst, tk1);
				i++;
			}
			continue;
		}
		if(tk.tt != TK_INDENT) break;
		if(indent == 0) indent = tk.lpos;
	}
	for(; i < e ; i++) {
		var tk = tls.toks[i];
		if(tk.topch == delim && tk.tt == TK_OPERATOR) {
			return i+1;
		}
		if(tk.kw > 0) {
			kArray_add(tlsdst, tk);
			continue;
		}
		else if(tk.topch == '(') {
			i = makeTree(_ctx, ks, AST_PARENTHESIS, tls,  i, e, ')', tlsdst, tkERRRef);
			continue;
		}
		else if(tk.topch == '[') {
			i = makeTree(_ctx, ks, AST_BRANCET, tls, i, e, ']', tlsdst, tkERRRef);
			continue;
		}
		else if(tk.tt == TK_ERR) {
			tkERRRef[0] = tk;
		}
		if(tk.tt == TK_INDENT) {
			if(tk.lpos <= indent) {
				return i+1;
			}
			continue;
		}
		i = appendKeyword(_ctx, ks, tls, i, e, tlsdst, tkERRRef);
	}
	return i;
}

konoha.Stmt_newExpr2 = function(_ctx, stmt, tls, s, e);

konoha.Stmt_addAnnotation = function(_ctx, stmt, tls, s, e)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(tk.tt != TK_METANAME) break;
		if(i+1 < e) {
			var buf[64];
			snprintf(buf, sizeof(buf), "@%s", S_text(tk.text));
			var kw = keyword(_ctx, buf, S_size(tk.text)+1, FN_NEWID);
			var tk1 = tls.toks[i+1];
			var value = UPCAST(K_TRUE);
			if(tk1.tt == AST_PARENTHESIS) {
				value = Stmt_newExpr2(_ctx, stmt, tk1.sub, 0, kArray_size(tk1.sub));
				i++;
			}
			if(value != NULL) {
				kObject_setObject(stmt, kw, value);
			}
		}
	}
	return i;
}

konoha.WARN_Ignored = function(_ctx, tls, s, e)
{
	if(s < e) {
		var i = s;
		var wb;
		kwb_init(_ctx.stack.cwb, wb);
		kwb_printf(wb, "%s", kToken_s(tls.toks[i])); i++;
		while(i < e) {
			kwb_printf(wb, " %s", kToken_s(tls.toks[i])); i++;
		}
		SUGAR_P(WARN_, tls.toks[s].uline, tls.toks[s].lpos, "ignored tokens: %s", kwb_top(wb, 1));
		kwb_free(wb);
	}
}

konoha.ParseStmt = function(_ctx, syn, stmt, name, tls, s, e)
{
	INIT_GCSTACK();
	BEGIN_LOCAL(lsfp, 8);
	KSETv(lsfp[K_CALLDELTA+0].o, stmt);
	lsfp[K_CALLDELTA+0].ndata = (uintptr_t)syn;
	lsfp[K_CALLDELTA+1].ivalue = name;
	KSETv(lsfp[K_CALLDELTA+2].a, tls);
	lsfp[K_CALLDELTA+3].ivalue = s;
	lsfp[K_CALLDELTA+4].ivalue = e;
	KCALL(lsfp, 0, syn.ParseStmtNULL, 4, knull(CT_Int));
	END_LOCAL();
	RESET_GCSTACK();
	return (int)lsfp[0].ivalue;
}

konoha.lookAheadKeyword = function(tls, s, e, rule)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(rule.kw == tk.kw) return i;
	}
	return -1;
}

konoha.matchSyntaxRule = function(_ctx, stmt, rules, uline, tls, s, e, optional)
{
	var ri, ti, rule_size = kArray_size(rules);
	ti = s;
	for(ri = 0; ri < rule_size && ti < e; ri++) {
		var rule = rules.toks[ri];
		var tk = tls.toks[ti];
		uline = tk.uline;
		DBG_P("matching rule=%d,%s,%s token=%d,%s,%s", ri, T_tt(rule.tt), T_kw(rule.kw), ti-s, T_tt(tk.tt), kToken_s(tk));
		if(rule.tt == TK_CODE) {
			if(rule.kw != tk.kw) {
				if(optional) return s;
				kToken_p(tk, ERR_, "%s needs '%s'", T_statement(stmt.syn.kw), T_kw(rule.kw));
				return -1;
			}
			ti++;
			continue;
		}
		else if(rule.tt == TK_METANAME) {
			var syn = SYN_(kStmt_ks(stmt), rule.kw);
			if(syn == NULL || syn.ParseStmtNULL == NULL) {
				kToken_p(tk, ERR_, "unknown syntax pattern: %s", T_kw(rule.kw));
				return -1;
			}
			int c = e;
			if(ri + 1 < rule_size && rules.toks[ri+1].tt == TK_CODE) {
				c = lookAheadKeyword(tls, ti+1, e, rules.toks[ri+1]);
				if(c == -1) {
					if(optional) return s;
					kToken_p(tk, ERR_, "%s needs '%s'", T_statement(stmt.syn.kw), T_kw(rule.kw));
					return -1;
				}
				ri++;
			}
		    var err_count = ctxsugar.err_count;
			var next = ParseStmt(_ctx, syn, stmt, rule.nameid, tls, ti, c);
			DBG_P("matched '%s' nameid='%s', next=%d=>%d", Pkeyword(rule.kw), Pkeyword(rule.nameid), ti, next);
			if(next == -1) {
				if(optional) return s;
				if(err_count == ctxsugar.err_count) {
					kToken_p(tk, ERR_, "%s needs syntax pattern %s, not %s ..", T_statement(stmt.syn.kw), T_kw(rule.kw), kToken_s(tk));
				}
				return -1;
			}
			optional = 0;
			ti = (c == e) ? next : c + 1;
			continue;
		}
		else if(rule.tt == AST_OPTIONAL) {
			var next = matchSyntaxRule(_ctx, stmt, rule.sub, uline, tls, ti, e, 1);
			if(next == -1) return -1;
			ti = next;
			continue;
		}
		else if(rule.tt == AST_PARENTHESIS || rule.tt == AST_BRACE || rule.tt == AST_BRANCET) {
			if(tk.tt == rule.tt && rule.topch == tk.topch) {
				var next = matchSyntaxRule(_ctx, stmt, rule.sub, uline, tk.sub, 0, kArray_size(tk.sub), 0);
				if(next == -1) return -1;
				ti++;
			}
			else {
				if(optional) return s;
				kToken_p(tk, ERR_, "%s needs '%c'", T_statement(stmt.syn.kw), rule.topch);
				return -1;
			}
		}
	}
	if(!optional) {
		for(; ri < kArray_size(rules); ri++) {
			var rule = rules.toks[ri];
			if(rule.tt != AST_OPTIONAL) {
				SUGAR_P(ERR_, uline, -1, "%s needs syntax pattern: %s", T_statement(stmt.syn.kw), T_kw(rule.kw));
				return -1;
			}
		}
		WARN_Ignored(_ctx, tls, ti, e);
	}
	return ti;
}

konoha.TokenArray_lookAhead = function(_ctx, tls, s, e)
{
	return (s < e) ? tls.toks[s] : K_NULLTOKEN;
}

konoha.KonohaSpace_getSyntaxRule = function(_ctx, ks, tls, s, e)
{
	var tk = tls.toks[s];
	if(TK_isType(tk)) {
		tk = TokenArray_lookAhead(_ctx, tls, s+1, e);
		if(tk.tt == TK_SYMBOL || tk.tt == TK_USYMBOL) {
			tk = TokenArray_lookAhead(_ctx, tls, s+2, e);
			if(tk.tt == AST_PARENTHESIS || tk.kw == KW_DOT) {
				return SYN_(ks, KW_StmtMethodDecl); 
			}
			return SYN_(ks, KW_StmtTypeDecl);  
		}
		return SYN_(ks, KW_Expr);   expression
	}
	var syn = SYN_(ks, tk.kw);
	if(syn.syntaxRuleNULL == NULL) {
		DBG_P("kw='%s', %d, %d", T_kw(syn.kw), syn.ParseExpr == kmodsugar.UndefinedParseExpr, kmodsugar.UndefinedExprTyCheck == syn.ExprTyCheck);
		int i;
		for(i = s + 1; i < e; i++) {
			tk = tls.toks[i];
			syn = SYN_(ks, tk.kw);
			if(syn.syntaxRuleNULL != NULL && syn.priority > 0) {
				SUGAR_P(DEBUG_, tk.uline, tk.lpos, "binary operator syntax kw='%s'", T_kw(syn.kw));
				return syn;
			}
		}
		return SYN_(ks, KW_Expr);
	}
	return syn;
}

konoha.Stmt_parseSyntaxRule = function(_ctx, stmt, tls, s, e)
{
	var ret = false;
	var syn = KonohaSpace_getSyntaxRule(_ctx, kStmt_ks(stmt), tls, s, e);
	DBG_ASSERT(syn != NULL);
	if(syn.syntaxRuleNULL != NULL) {
		stmt.syn = syn;
		ret = (matchSyntaxRule(_ctx, stmt, syn.syntaxRuleNULL, stmt.uline, tls, s, e, 0) != -1);
	}
	else {
		SUGAR_P(ERR_, stmt.uline, 0, "undefined syntax rule for '%s'", T_kw(syn.kw));
	}
	return ret;
}

konoha.Block_addStmtLine = function(_ctx, bk, tls, s, e, tkERR)
{
	var stmt = new_W(Stmt, tls.toks[s].uline);
	kArray_add(bk.blocks, stmt);
	KINITv(stmt.parentNULL, bk);
	if(tkERR != NULL) {
		stmt.syn = SYN_(kStmt_ks(stmt), KW_Err);
		stmt.build = TSTMT_ERR;
		kObject_setObject(stmt, KW_Err, tkERR.text);  
	}
	else {
		var estart = kerrno;
		s = Stmt_addAnnotation(_ctx, stmt, tls, s, e);
		if(!Stmt_parseSyntaxRule(_ctx, stmt, tls, s, e)) {
			kStmt_toERR(stmt, estart);
		}
	}
	DBG_ASSERT(stmt.syn != NULL);
}

/* ------------------------------------------------------------------------ */

konoha.UndefinedParseExpr = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	tk = tls.toks[c];
	SUGAR_P(ERR_, tk.uline, tk.lpos, "undefined expression parser for '%s'", kToken_s(tk));
	RETURN_(K_NULLEXPR);  unnecessary


konoha.ParseExpr = function(_ctx, syn, stmt, tls, s, c, e)
{
	var mtd = (syn == NULL || syn.ParseExpr == NULL) ? kmodsugar.UndefinedParseExpr : syn.ParseExpr;
	BEGIN_LOCAL(lsfp, 10);
	KSETv(lsfp[K_CALLDELTA+0].o, stmt;
	lsfp[K_CALLDELTA+0].ndata = syn;
	KSETv(lsfp[K_CALLDELTA+1].o, tls);
	lsfp[K_CALLDELTA+2].ivalue = s;
	lsfp[K_CALLDELTA+3].ivalue = c;
	lsfp[K_CALLDELTA+4].ivalue = e;
	KCALL(lsfp, 0, mtd, 4, K_NULLEXPR);
	END_LOCAL();
	DBG_ASSERT(IS_Expr(lsfp[0].o));
	return lsfp[0].expr;
}

/* ------------------------------------------------------------------------ */

konoha.Stmt_isUnaryOp = function(_ctx, stmt, tk)
{
	var syn = SYN_(kStmt_ks(stmt), tk.kw);
	return (syn.op1 != MN_NONAME);
}

konoha.Stmt_skipUnaryOp = function(_ctx, stmt, tls, s, e)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(!Stmt_isUnaryOp(_ctx, stmt, tk)) {
			break;
		}
	}
	return i;
}

konoha.Stmt_findBinaryOp = function(_ctx, stmt, tls, s, e, synRef)
{
	var idx = -1, i, prif = 0;
	for(i = Stmt_skipUnaryOp(_ctx, stmt, tls, s, e) + 1; i < e; i++) {
		var tk = tls.toks[i];
		var syn = SYN_(kStmt_ks(stmt), tk.kw);
		if(syn != NULL && syn.op2 != 0) {
		if(syn.priority > 0) {
			if(prif < syn.priority || (prif == syn.priority && !(FLAG_is(syn.flag, SYNFLAG_ExprLeftJoinOp2)) )) {
				prif = syn.priority;
				idx = i;
				synRef = syn;
			}
			if(!FLAG_is(syn.flag, SYNFLAG_ExprPostfixOp2)) {  /* check if real binary operator to parse f() + 1 */
				i = Stmt_skipUnaryOp(_ctx, stmt, tls, i+1, e) - 1;
			}
		}
	}
	return idx;
}

konoha.Stmt_addExprParams = function(_ctx, stmt, expr, tls, s, e, allowEmpty)
{
	var i, start = s;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(tk.kw == KW_COMMA) {
			expr = Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
			start = i + 1;
		}
	}
	if(allowEmpty == 0 || start < i) {
		expr = Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
	}
	kArray_clear(tls, s);
	return expr;
}

konoha.Stmt_newExpr2 = function(_ctx, stmt, tls, s,  e)
{
	if(s < e) {
		var syn = NULL;
		var idx = Stmt_findBinaryOp(_ctx, stmt, tls, s, e, syn);
		if(idx != -1) {
			DBG_P("** Found BinaryOp: s=%d, idx=%d, e=%d, '%s'**", s, idx, e, kToken_s(tls.toks[idx]));
			return ParseExpr(_ctx, syn, stmt, tls, s, idx, e);
		}
		var c = s;
		syn = SYN_(kStmt_ks(stmt), (tls.toks[c]).kw);
		return ParseExpr(_ctx, syn, stmt, tls, c, c, e);
	}
	else {
		if (0 < s - 1) {
			SUGAR_P(ERR_, stmt.uline, -1, "expected expression after %s", kToken_s(tls.toks[s-1]));
		}
		else if(e < kArray_size(tls)) {
			SUGAR_P(ERR_, stmt.uline, -1, "expected expression before %s", kToken_s(tls.toks[e]));
		}
		else {
			SUGAR_P(ERR_, stmt.uline, 0, "expected expression");
		}
		return K_NULLEXPR;
	}
}


//#define kExpr_rightJoin(EXPR, STMT, TLS, S, C, E)    Expr_rightJoin(_ctx, EXPR, STMT, TLS, S, C, E)

konoha.Expr_rightJoin = function(_ctx, expr, stmt, tls, s, c, e)
{
	if(c < e && expr != K_NULLEXPR) {
		WARN_Ignored(_ctx, tls, c, e);
	}
	return expr;
}

konoha.ParseExpr_Term = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	assert(s == c);
	var tk = tls.toks[c];
	var expr = new_W(Expr, SYN_(kStmt_ks(stmt), tk.kw));
	PUSH_GCSTACK(expr);
	Expr_setTerm(expr, 1);
	KSETv(expr.tk, tk);
	RETURN_(kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e));
}

konoha.ParseExpr_Op = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	var tk = tls.toks[c];
	var expr, rexpr = Stmt_newExpr2(_ctx, stmt, tls, c+1, e);
	kmethodn_t mn = (s == c) ? syn.op1 : syn.op2;
	if(mn != MN_NONAME && syn.ExprTyCheck == kmodsugar.UndefinedExprTyCheck) {
		kToken_setmn(tk, mn, (s == c) ? MNTYPE_unary: MNTYPE_binary);
		syn = SYN_(kStmt_ks(stmt), KW_ExprMethodCall);
	}
	if(s == c) {
		expr = new_ConsExpr(_ctx, syn, 2, tk, rexpr);
	}
	else {
		var lexpr = Stmt_newExpr2(_ctx, stmt, tls, s, c);
		expr = new_ConsExpr(_ctx, syn, 3, tk, lexpr, rexpr);
	}
	RETURN_(expr);
}

konoha.isFieldName = function(tls, c, e)
{
	if(c+1 < e) {
		var tk = tls.toks[c+1];
		return (tk.tt == TK_SYMBOL || tk.tt == TK_USYMBOL || tk.tt == TK_MSYMBOL);
	}
	return false;
}
konoha.ParseExpr_DOT = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	DBG_P("s=%d, c=%d", s, c);
	DBG_ASSERT(s < c);
	if(isFieldName(tls, c, e)) {
		var expr = Stmt_newExpr2(_ctx, stmt, tls, s, c);
		expr = new_ConsExpr(_ctx, syn, 2, tls.toks[c+1], expr);
		RETURN_(kExpr_rightJoin(expr, stmt, tls, c+2, c+2, e));
	}
	if(c + 1 < e) c++;
	RETURN_(kToken_p(tls.toks[c], ERR_, "expected field name: not %s", kToken_s(tls.toks[c])));
}

konoha.ParseExpr_Parenthesis = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	var tk = tls.toks[c];
	if(s == c) {
		var expr = Stmt_newExpr2(_ctx, stmt, tk.sub, 0, kArray_size(tk.sub));
		RETURN_(kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e));
	}
	else {
		var lexpr = Stmt_newExpr2(_ctx, stmt, tls, s, c);
		if(lexpr == K_NULLEXPR) {
			RETURN_(lexpr);
		}
		if(lexpr.syn.kw == KW_DOT) {
			lexpr.syn = SYN_(kStmt_ks(stmt), KW_ExprMethodCall);
		}
		else if(lexpr.syn.kw != KW_ExprMethodCall) {
			DBG_P("function calls  .. ");
			syn = SYN_(kStmt_ks(stmt), KW_Parenthesis);
			lexpr  = new_ConsExpr(_ctx, syn, 2, lexpr, K_NULL);
		}
		lexpr = Stmt_addExprParams(_ctx, stmt, lexpr, tk.sub, 0, kArray_size(tk.sub), 1/*allowEmpty*/);
		RETURN_(kExpr_rightJoin(lexpr, stmt, tls, s+1, c+1, e));
	}
}

konoha.ParseExpr_COMMA = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	var expr = new_ConsExpr(_ctx, syn, 1, tls.toks[c]);
	expr = Stmt_addExprParams(_ctx, stmt, expr, tls, s, e, 0/*allowEmpty*/);
	RETURN_(expr);
}

konoha.ParseExpr_DOLLAR = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	if(s == c && c + 1 < e) {
		var tk = tls.toks[c+1];
		if(tk.tt == TK_CODE) {
			Token_toBRACE(_ctx, tk, kStmt_ks(stmt));
		}
		if(tk.tt == AST_BRACE) {
			var expr = new_W(Expr, SYN_(kStmt_ks(stmt), KW_Block));
			PUSH_GCSTACK(expr);
			Expr_setTerm(expr, 1);
			KSETv(expr.tk, tk);
			KSETv(expr.block, new_Block(_ctx, kStmt_ks(stmt), stmt, tk.sub, 0, kArray_size(tk.sub), ';'));
			RETURN_(expr);
		}
	}
	RETURN_(kToken_p(tls.toks[c], ERR_, "unknown %s parser", kToken_s(tls.toks[c])));
}

konoha.ParseExpr_Type = function(_ctx, sfp ,_rix)
{
	VAR_ParseExpr(stmt, syn, tls, s, c, e);
	if(c + 1 < e) {
		var tkT = tls.toks[c];
		var tk = new_W(Token, TK_OPERATOR);
		tk.kw  = KW_StmtTypeDecl;
		syn = SYN_(kStmt_ks(stmt), KW_StmtTypeDecl);
		RETURN_(new_ConsExpr(_ctx, syn, 3, tk, Stmt_newExpr2(_ctx, stmt, tls, c+1, e), tkT));
	}
	else {
		ParseExpr_Term(_ctx, sfp, K_rix);
	}
}

/* ------------------------------------------------------------------------ */

konoha.ParseStmt_Expr = function(_ctx, sfp ,_rix)
{
	VAR_ParseStmt(stmt, syn, name, tls, s, e);
	INIT_GCSTACK();
	var r = -1;
	dumpTokenArray(_ctx, 0, tls, s, e);
	var expr = Stmt_newExpr2(_ctx, stmt, tls, s, e);
	if(expr != K_NULLEXPR) {
		dumpExpr(_ctx, 0, 0, expr);
		kObject_setObject(stmt, name, expr);
		r = e;
	}
	RESET_GCSTACK();
	RETURNi_(r);
}

konoha.ParseStmt_Type = function(_ctx, sfp ,_rix)
{
	VAR_ParseStmt(stmt, syn, name, tls, s, e);
	var r = -1;
	var tk = tls.toks[s];
	if(TK_isType(tk)) {
		kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
	RETURNi_(r);
}

konoha.ParseStmt_Usymbol = function(_ctx, sfp ,_rix)
{
	VAR_ParseStmt(stmt, syn, name, tls, s, e);
	var r = -1;
	var tk = tls.toks[s];
	if(tk.tt == TK_USYMBOL) {
		kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
	RETURNi_(r);
}

konoha.ParseStmt_Symbol = function(_ctx, sfp ,_rix)
{
	VAR_ParseStmt(stmt, syn, name, tls, s, e);
	var r = -1;
	var tk = tls.toks[s];
	if(tk.tt == TK_SYMBOL) {
		kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
	RETURNi_(r);
}

konoha.ParseStmt_Params = function(_ctx, sfp ,_rix)
{
	VAR_ParseStmt(stmt, syn, name, tls, s, e);
	var r = -1;
	var tk = tls.toks[s];
	if(tk.tt == AST_PARENTHESIS) {
		var tls = tk.sub;
		var ss = 0, ee = kArray_size(tls);
		if(0 < ee && tls.toks[0].kw == KW_void) ss = 1;
		var bk = new_Block(_ctx, kStmt_ks(stmt), stmt, tls, ss, ee, ',');
		kObject_setObject(stmt, name, bk);
		r = s + 1;
	}
	RETURNi_(r);
}

konoha.ParseStmt_Block = function(_ctx, sfp ,_rix)
{
	VAR_ParseStmt(stmt, syn, name, tls, s, e);
	var tk = tls.toks[s];
	if(tk.tt == TK_CODE) {
		kObject_setObject(stmt, name, tk);
		RETURNi_(s+1);
	}
	else if(tk.tt == AST_BRACE) {
		var bk = new_Block(_ctx, kStmt_ks(stmt), stmt, tk.sub, 0, kArray_size(tk.sub), ';');
		kObject_setObject(stmt, name, bk);
		RETURNi_(s+1);
	}
	else {
		var bk = new_Block(_ctx, kStmt_ks(stmt), stmt, tls, s, e, ';');
		kObject_setObject(stmt, name, bk);
		RETURNi_(e);
	}
	RETURNi_(-1);
}

konoha.ParseStmt_Toks = function(_ctx, sfp _rix)
{
	VAR_ParseStmt(stmt, syn, name, tls, s, e);
	if(s < e) {
		var a = new_(TokenArray, (intptr_t)(e - s));
		while(s < e) {
			kArray_add(a, tls.toks[s]);
			s++;
		}
		kObject_setObject(stmt, name, a);
		RETURNi_(e);
	}
	RETURNi_(-1);
}

/* ------------------------------------------------------------------------ */

#ifdef __cplusplus
}
#endif
