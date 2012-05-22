///****************************************************************************
// * Copyright (c) 2012, the Konoha project authors. All rights reserved.
//
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

konoha.Token_toERR = function(_ctx, tk, errref)
{
	tk.tt = konoha.ktoken_t.TK_ERR;
	konoha.KSETv(tk.text, ctxsugar.errors.strings[errref]); //TODO ERROR
}

konoha.lpos = function(tenv, s) //Number : tenv_t, Number
{
	return (tenv.bol == null) ? -1 : s - tenv.bol;
}

konoha.parseINDENT = function(_ctx, tk, tenv, pos, thunk)
{
	var ch, c = 0;
	while((ch = tenv.source[pos++]) != 0) {
		if(ch == '\t') {
			c += tenv.indent_tab;
		}
		else if(ch == ' ') {
			c += 1;
		}
		break;
	}
//	if(IS_NOTNULL(tk)) { //TODO : Is this necessary?
	tk.tt = konoha.ktoken_t.TK_INDENT;
	tk.lpos = 0;
//	}
	return pos - 1;
}

konoha.parseNL = function(_ctx, tk, tenv, pos, thunk)
{
	tenv.uline += 1;
	tenv.bol = pos + 1;
	return parseINDENT(_ctx, tk, tenv, pos + 1, thunk);
}

//until
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

konoha.parseMSYMBOL = function(_ctx, tk, tenv, tok_start, thunk)
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
		var s = tenv.source + tok_start;
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
		var errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "must close with */");
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
	if(is_NOTNULL(tk)) {
		var errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "must close with \"");
		token_toERR(_ctx, tk, errref);
	}
	return pos-1;
}

konoha.parseSKIP = function(_ctx, tk, tenv, tok_start, thunk)
{
	return tok_start+1;
}

konoha.parseUNDEF = function(_ctx, tk, tenv, tok_start, thunk)
{
	if(is_NOTNULL(tk)) {
		var errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "undefined token character: %c", tenv.source[tok_start]);
		token_toERR(_ctx, tk, errref);
	}
	while(tenv.source[++tok_start] != 0);
	return tok_start;
}

<<<<<<< HEAD
konoha.parseBLOCK = function(_ctx, tk, tenv, tok_start, thunk);

static const Ftokenizer MiniKonohaTokenMatrix[] = {
//#define _NULL      0
	konoha.parseSKIP,
//#define _DIGIT     2
	konoha.parseNUM,
//#define _UALPHA    3
	konoha.parseUSYMBOL,
//#define _LALPHA    4
	konoha.parseSYMBOL,
//#define _MULTI     5
	konoha.parseMSYMBOL,
//#define _NL        6
	konoha.parseNL,
//#define _TAB       7
	konoha.parseSKIP,
//#define _SP        8
	konoha.parseSKIP,
//#define _LPAR      9
	konoha.parseOP1,
//#define _RPAR      10
	konoha.parseOP1,
//#define _LSQ       11
	konoha.parseOP1,
//#define _RSQ       12
	konoha.parseOP1,
//#define _LBR       13
	konoha.parseBLOCK,
//#define _RBR       14
	konoha.parseOP1,
//#define _LT        15
	konoha.parseOP,
//#define _GT        16
	konoha.parseOP,
//#define _QUOTE     17
	konoha.parseUNDEF,
//#define _DQUOTE    18
	konoha.parseDQUOTE,
//#define _BKQUOTE   19
	konoha.parseUNDEF,
//#define _OKIDOKI   20
	konoha.parseOP,
//#define _SHARP     21
	konoha.parseOP,
//#define _DOLLAR    22
	konoha.parseOP,
//#define _PER       23
	konoha.parseOP,
//#define _AND       24
	konoha.parseOP,
//#define _STAR      25
	konoha.parseOP,
//#define _PLUS      26
	konoha.parseOP,
//#define _COMMA     27
	konoha.parseOP1,
//#define _MINUS     28
	konoha.parseOP,
//#define _DOT       29
	konoha.parseOP,
//#define _SLASH     30
	konoha.parseSLASH,
//#define _COLON     31
	konoha.parseOP,
//#define _SEMICOLON 32
	konoha.parseOP1,
//#define _EQ        33
	konoha.parseOP,
//#define _QUESTION  34
	konoha.parseOP,
//#define _AT        35
	konoha.parseOP1,
//#define _VAR       36
	konoha.parseOP,
//#define _CHILDER   37
	konoha.parseOP,
//#define _BKSLASH   38
	konoha.parseUNDEF,
//#define _HAT       39
	konoha.parseOP,
//#define _UNDER     40
	konoha.parseSYMBOL
//#define KCHAR_MAX  41
};


konoha.mkTM_type = new konoha.Enum(
		"_NULL",
		"_UNDEF",
		"_DIGIT",
		"_UALPHA",
		"_LALPHA",
		"_MULTI",
		"_NL",
		"_TAB",
		"_SP",
		"_LPAR",
		"_RPAR",
		"_LSQ",
		"_RSQ",
		"_LBR",
		"_RBR",
		"_LT",
		"_GT",
		"_QUOTE",
		"_DQUOTE",
		"_BKQUOTE",
		"_OKIDOKI",
		"_SHARP",
		"_DOLLAR",
		"_PER",
		"_AND",
		"_STAR",
		"_PLUS",
		"_COMMA",
		"_MINUS",
		"_DOT",
		"_SLASH",
		"_COLON",
		"_SEMICOLON",
		"_EQ",
		"_QUESTION",
		"_AT",
		"_CHILDER",
		"_BKSLASH",
		"_HAT",
		"_UNDER",
		"KCHAR_MAX"
		);

konoha.cmatrix = new Array{
	0/*nul*/, 1/*soh*/, 1/*stx*/, 1/*etx*/, 1/*eot*/, 1/*enq*/, 1/*ack*/, 1/*bel*/,
	1/*bs*/, konoha.MKTM_type._TAB/*ht*/, konoha.MKTM_type. _NL/*nl*/, 1/*vt*/, 1/*np*/, 1/*cr*/, 1/*so*/, 1/*si*/,
//	/*	020 dle  021 dc1  022 dc2  023 dc3  024 dc4  025 nak  026 syn  027 etb*/
	1, 1, 1, 1,     1, 1, 1, 1,
//	/*	030 can  031 em   032 sub  033 esc  034 fs   035 gs   036 rs   037 us*/
	1, 1, 1, 1,     1, 1, 1, 1,
//	/*040 sp   041  !   042  "   043  #   044  $   045  %   046  &   047  '*/
	konoha.MKTM_type._SP, konoha.MKTM_type._OKIDOKI, konoha.MKTM_type._DQUOTE, konoha.MKTM_type._SHARP, konoha.MKTM_type._DOLLAR, konoha.MKTM_type._PER, konoha.MKTM_type._AND, konoha.MKTM_type._QUOTE
//	/*050  (   051  )   052  *   053  +   054  ,   055  -   056  .   057  /*/
	konoha.MKTM_type._LPAR, konoha.MKTM_type._RPAR, konoha.MKTM_type._STAR, konoha.MKTM_type._PLUS, konoha.MKTM_type._COMMA, konoha.MKTM_type._MINUS, konoha.MKTM_type._DOT, konoha.MKTM_type._SLASH,
//	/*060  0   061  1   062  2   063  3   064  4   065  5   066  6   067  7 */
	konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT,  konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT,
	/*	070  8   071  9   072  :   073  ;   074  <   075  =   076  >   077  ? */
	konoha.MKTM_type._DIGIT, konoha.MKTM_type._DIGIT, konoha.MKTM_type._COLON, konoha.MKTM_type._SEMICOLON, konoha.MKTM_type._LT, konoha.MKTM_type._EQ, konoha.MKTM_type._GT, konoha.MKTM_type._QUESTION,
//	/*100  @   101  A   102  B   103  C   104  D   105  E   106  F   107  G */
	konoha.MKTM_type._AT, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA,
//	/*110  H   111  I   112  J   113  K   114  L   115  M   116  N   117  O */
	konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA,
//	/*120  P   121  Q   122  R   123  S   124  T   125  U   126  V   127  W*/
	konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA,
//	/*130  X   131  Y   132  Z   133  [   134  \   135  ]   136  ^   137  _*/
	konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._UALPHA, konoha.MKTM_type._LSQ, konoha.MKTM_type._BKSLASH, konoha.MKTM_type._RSQ, konoha.MKTM_type._HAT, konoha.MKTM_type._UNDER,
//	/*140  `   141  a   142  b   143  c   144  d   145  e   146  f   147  g*/
	konoha.MKTM_type._BKQUOTE, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA,
//	/*150  h   151  i   152  j   153  k   154  l   155  m   156  n   157  o*/
	konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA,
//	/*160  p   161  q   162  r   163  s   164  t   165  u   166  v   167  w*/
	konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA,
//	/*170  x   171  y   172  z   173  {   174  |   175  }   176  ~   177 del*/
	konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LALPHA, konoha.MKTM_type._LBR, konoha.MKTM_type._VAR, konoha.MKTM_type._RBR, konoha.MKTM_type._CHILDER, 1
};

konoha.kchar = function(t, pos)
{
	var ch = t.charCodeAt(pos);
	return konoha.cMatrix[ch]; //TODO : Multi-byte char
}

// konoha.parseBLOCK = function(_ctx, tk, tenv, tok_start, thunk)
// {
// 	var ch, level = 1, pos = tok_start + 1;
// 	var fmat = tenv.fmat;
// 	tk.lpos += 1;
// 	while((ch = kchar(tenv.source, pos)) != 0) {
// 		if(ch == _RBR/*}*/) {
// 			level--;
// 			if(level == 0) {
// 				if(IS_NOTNULL(tk)) {
// 					KSETv(tk.text, new_kString(tenv.source + tok_start + 1, ((pos-2)-(tok_start)+1), 0));
// 					tk.tt = TK_CODE;
// 				}
// 				return pos + 1;
// 			}
// 			pos++;
// 		}
// 		else if(ch == _LBR/*'{'*/) {
// 			level++; pos++;
// 		}
// 		else {
// 			pos = fmat[ch](_ctx, K_NULLTOKEN, tenv, pos, NULL);
// 		}
// 	}
// 	if(IS_NOTNULL(tk)) {
// 		size_t errref = SUGAR_P(ERR_, tk.uline, tk.lpos, "must close with }");
// 		Token_toERR(_ctx, tk, errref);
// 	}
// 	return pos-1;
// }

konoha.tokenize = function(_ctx, tenv)
{
	var ch, pos = 0;
	var fmat = tenv.fmat;
	var tk = new kToken();
//	konoha.assert(tk.tt == 0); //TODO : Is this necessary?
	tk.uline = tenv.uline;
	tk.lpos  = lpos(tenv, 0);
	pos = parseINDENT(_ctx, tk, tenv, pos, null);
	while ((ch = konoha.kchar(tenv.source, pos)) != 0) {
		if(tk.tt != 0) {
			tenv.list.data.push(tk);
			tk = new kToken();
			tk.uline = tenv.uline;
			tk.lpos  = lpos(tenv, pos);
		}
		var pos2 = fmat[ch](_ctx, tk, tenv, pos, NULL);
		konoha.assert(pos2 > pos);
		pos = pos2;
	}
	if(tk.tt != 0) {
		tenv.list.data.push(tk);
	}
}

// konoha.KonohaSpace_tokenizerMatrix = function(_ctx, ks)
// {
// 	if(ks.fmat == NULL) {
// 		DBG_ASSERT(KCHAR_MAX * sizeof(Ftokenizer) == sizeof(MiniKonohaTokenMatrix));
// 		var fmat = KMALLOC(sizeof(MiniKonohaTokenMatrix));
// 		if(ks.parentNULL != NULL && ks.parentNULL.fmat != NULL) {
// 			memcpy(fmat, ks.parentNULL.fmat, sizeof(MiniKonohaTokenMatrix));
// 		}
// 		else {
// 			memcpy(fmat, MiniKonohaTokenMatrix, sizeof(MiniKonohaTokenMatrix));
// 		}
// 		ks.fmat = fmat;
// 	}
// 	return ks.fmat;
// }

// konoha.KonohaSpace_setTokenizer = function(_ctx, ks, ch, f, mtd/*future extension*/)
// {
// 	var kchar = (ch < 0) ? _MULTI : cMatrix[ch];
// 	var fmat = KonohaSpace_tokenizerMatrix(_ctx, ks);
// 	fmat[kchar] = f;
// }

// konoha.KonohaSpace_tokenize = function(_ctx, ks, source, uline, a)
// {
// 	var i, pos = kArray_size(a);
// 	var tenv = {
// 		.source = source,
// 		.uline  = uline,
// 		.list   = a,
// 		.bol    = source,
// 		.indent_tab = 4,
// 		.fmat   = ks == NULL ? MiniKonohaTokenMatrix : KonohaSpace_tokenizerMatrix(_ctx, ks)
// 	};
// 	tokenize(_ctx, tenv);
// 	if(uline == 0) {
// 		for(i = pos; i < kArray_size(a); i++) {
// 			a.Wtoks[i].uline = 0;
// 		}
// 	}
// }

// konoha.findTopCh = function(_ctx, tls, s, e, tt, closech)
// }
// {
// 	var i;
// 	for(i = s; i < e; i++) {
// 		var tk = tls.toks[i];
// 		if(tk.tt == tt && S_text(tk.text)[0] == closech) return i;
// 	}
// 	DBG_ASSERT(i != e);
// 	return e;
// }

// konoha.makeSyntaxRule = function(_ctx, tls, s, e, adst);

// konoha.checkNestedSyntax = function(_ctx, tls, s, e, tt, opench, closech)
// {
// 	var i = s;
// 	var tk = tls.Wtoks[i];
// 	var t = S_text(tk.text);
// 	if(t[0] == opench && t[1] == 0) {
// 		int ne = findTopCh(_ctx, tls, i+1, e, tk.tt, closech);
// 		tk.tt = tt; tk.kw = tt;
// 		KSETv(tk.sub, new_(TokenArray, 0));
// 		tk.topch = opench; tk.closech = closech;
// 		makeSyntaxRule(_ctx, tls, i+1, ne, tk.sub);
// 		s = ne;
// 		return 1;
// 	}
// 	return 0;
// }

// konoha.makeSyntaxRule = function(_ctx, tls, s, e, adst)
// {
// 	var i;
// 	var nbuf[80];
// 	var nameid = 0;
// 	dumpTokenArray(_ctx, 0, tls, s, e);
// 	for(i = s; i < e; i++) {
// 		var tk = tls.Wtoks[i];
// 		if(tk.tt == TK_INDENT) continue;
// 		if(tk.tt == TK_TEXT /*|| tk.tt == TK_STEXT*/) {
// 			if(checkNestedSyntax(_ctx, tls, &i, e, AST_PARENTHESIS, '(', ')') ||
// 				checkNestedSyntax(_ctx, tls, &i, e, AST_BRANCET, '[', ']') ||
// 				checkNestedSyntax(_ctx, tls, &i, e, AST_BRACE, '{', '}')) {
// 			}
// 			else {
// 				tk.tt = TK_CODE;
// 				tk.kw = keyword(_ctx, S_text(tk.text), S_size(tk.text), FN_NEWID);
// 			}
// 			kArray_add(adst, tk);
// 			continue;
// 		}
// 		if(tk.tt == TK_SYMBOL || tk.tt == TK_USYMBOL) {
// 			if(i > 0 && tls.toks[i-1].topch == '$') {
// 				snprintf(nbuf, sizeof(nbuf), "$%s", S_text(tk.text));
// 				tk.kw = keyword(_ctx, (const char*)nbuf, strlen(nbuf), FN_NEWID);
// 				tk.tt = TK_METANAME;
// 				if(nameid == 0) nameid = tk.kw;
// 				tk.nameid = nameid;
// 				nameid = 0;
// 				kArray_add(adst, tk); continue;
// 			}
// 			if(i + 1 < e && tls.toks[i+1].topch == ':') {
// 				var tk = tls.toks[i];
// 				nameid = keyword(_ctx, S_text(tk.text), S_size(tk.text), FN_NEWID);
// 				i++;
// 				continue;
// 			}
// 		}
// 		if(tk.tt == TK_OPERATOR) {
// 			if(checkNestedSyntax(_ctx, tls, i, e, AST_OPTIONAL, '[', ']')) {
// 				kArray_add(adst, tk);
// 				continue;
// 			}
// 			if(tls.toks[i].topch == '$') continue;
// 		}
// 		SUGAR_P(ERR_, tk.uline, tk.lpos, "illegal sugar syntax: %s", kToken_s(tk));
// 		return false;
// 	}
// 	return true;
// }

// konoha.parseSyntaxRule = function(_ctx, rule, uline, a)
// {
// 	var tls = ctxsugar.tokens;
// 	 pos = kArray_size(tls);
// 	KonohaSpace_tokenize(_ctx, NULL, rule, uline, tls);
// 	makeSyntaxRule(_ctx, tls, pos, kArray_size(tls), a);
// 	kArray_clear(tls, pos);
// }
