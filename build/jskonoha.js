konoha = {};

konoha.Enum = function() {
	for (var i in arguments) {
		this[arguments[i]] = i;
	}
};

konoha.assert = function(cond, msg) {
	if (!cond) {
		var e = "Assersion!! " + msg;
		console.log(e);
		throw e;
	}
}
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
			if(isNaN(Number(ts[pos]))) {
				break;
			}
			dot++;
			continue;
		}
		if((ch == 'e' || ch == 'E') && (ts[pos] == '+' || ts[pos] =='-')) {
			pos++;
			continue;
		}
		if(isNaN(Number(ch))) break;
	}
//	if(IS_NOTNULL(tk)) {
	konoha.KSETv(tk.text, new_kString(ts + tok_start, (pos-1)-tok_start, SPOL_ASCII));
	tk.tt = (dot == 0) ? TK_INT : TK_FLOAT;
//	}
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

konoha ={};

konoha.new_Block = function(_ctx, ks, prt, tls, s, e, delim) {
	var bk = new kBlock();
	if(prt != null) {
		bk.parentNULL = prt;
	}
	var i = s, indent = 0, atop = tls.data.length;
	while(i < e) {
		var tkERR = null;
		i =  konoha.selectStmtLine(_ctx, ks, indent, tls, i, e, delim, tls, tkERR);
		var asize = tls.data.length;
		if(asize > atop) {
			konoha.Block_addStmtline(_ctx, bk, tls, atop, asize, tkERR);
			tls.data.length = 0;
		}
	}
	return bk;
}

konoha.Token_resolved = function(_ctx, ks, tk) {//
	var kw = konoha.keyword(_ctx, tk.text, tk.text.length, konoha.FN_NONAME);
	if(kw != konoha.FN_NONAME) {
		syn = konoha.KonohaSpace_syntax(_ctx, ks, kw, 0);
		if(syn != null) {
			if(syn.ty != TY_unknown) {
				tk.kw = konoha.KW_Type;
				tk.ty = syn.ty;
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
	if(tkP.tt == konoha.ktoken_t.AST_BRANCET) {
		var i = 0, psize = 0, size = tkP.sub.data.length;
		var p = new Array(size);
		for(i = 0; i < size; i++) {
			var tkT = (tkP.sub.toks[i]);
			if((tkT).kw == konoha.KW_Type) {
				p[psize].ty = tkT.ty;
				psize++;
				continue;
			}
			if(tkT.topch == ',') continue;
			return null;
		}
		var ct;
		if(psize > 0) {
			ct = _ctx.share.ca.cts[tk.ty];
			if(ct.cparam == konoha.K_NULLPARAM) {
				konoha.sugar_p(_ctx, ERR_, tk.uline, tk.lpos, "not generic type: %s", konoha.S_ty(tk.ty));
				return tk;
			}
			ct = new konoha.CT_Generics(_ctx, ct, psize, p);
		}
		else {
			ct = konoha.CT_p0(_ctx, CT_Array, tk.ty);
		}
		tk.ty = ct.cid;
		return tk;
	}
	return null;
}

konoha.appendKeyword = function(_ctx, ks, tls, s, e, dst, tkERR)
{
	var ext = s;
	var tk = tls.Wtoks[s];
	if(tk.tt < konoha.ktoken_t.TK_OPERATOR) {
		tk.kw = tk.tt;
	}
	if(tk.tt == konoha.ktoken_t.TK_SYMBOL) {
		konoha.Token_resolved(_ctx, ks, tk);
	}
	else if(tk.tt == konoha.ktoken_t.TK_USYMBOL) {
		if(!konoha.Token_resolved(_ctx, ks, tk)) {
			var ct = new konoha.kKonohaSpace_getCT(ks, null/*FIXME*/, tk.text, tk.text.length, TY_unknown);
			if(ct != null) {
				tk.kw = konoha.KW_Type;
				tk.ty = ct.cid;
			}
		}
	}
	else if(tk.tt == konoha.ktoken_t.TK_OPERATOR) {
		if(!konoha.Token_resolved(_ctx, ks, tk)) {
			var errref = konoha.sugar_p(_ctx, ERR_, tk.uline, tk.lpos, "undefined token: %s", konoha.kToken_s(tk));
			konoha.Token_toERR(_ctx, tk, errref);
			tkERR[0] = tk;
			return e;
		}
	}
	else if(tk.tt == konoha.ktoken_t.TK_CODE) {
		tk.kw = KW_Brace;
	}
	if((tk).kw == KW_Type) { 
		dst.data.push(tk);
		while(next + 1 < e) {
			var tkB = tls.toks[next + 1];
			if(tkB.topch != '[') break;
			var abuf = new kArray();
			var atop = abuf.data.length;
			next = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_BRANCET, tls,  next+1, e, ']', abuf, tkERR);
			if(!((abuf.data.length) > atop)) return next;

			tkB = abuf.toks[atop];
			tk = TokenType_resolveGenerics(_ctx, ks, tk, tkB);
			if(tk == null) {
				if(abuf != dst) {
					dst.data.push(tk);
					abuf.data.length = 0;
				}
				return next;
			}
			abuf.length = 0;
		}
	}
	else if(tk.kw > KW_Expr) {
		dst.data.push(tk);
	}
	return next;
}

konoha.Token_toBRACE = function(_ctx, tk, ks)
{
	if(tk.tt == konoha.ktoken_t.TK_CODE) {
		var a = new kArray();
		KonohaSpace_tokenize(_ctx, ks, tk.text, tk.uline, a);
		tk.tt = konoha.ktoken_t.AST_BRACE;
		tk.topch = '{';
		tk.closech = '}';
		tk.sub =  a;
		return 1;
	}
	return 0;
}

konoha.makeTree = function(_ctx, ks, tt, tls, s, e, closech, tlsdst, tkERRRef)

{
	var i, probablyCloseBefore = e - 1;
	var tk = tls.toks[s];
	var tkP = new kBlock();
	tlsdst.data.push;
	tkP.tt = tt;
	tkP.kw = tt;
	tkP.uline = tk.uline;
	tkP.topch = tk.topch;
	tkP.lpos = closech;
	tkP.sub = new kArray();
	for(i = s + 1; i < e; i++) {
		tk = tls.toks[i];
		if(tk.tt == konoha.ktoken_t.TK_ERR) break;
		if(tk.topch == '(') {
			i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_PARENTHESIS, tls, i, e, ')', tkP.sub, tkERRRef);
			continue;
		}
		if(tk.topch == '[') {
			i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_BRANCET, tls, i, e, ']', tkP.sub, tkERRRef);
			continue;
		}
		if(tk.topch == closech) {
			return i;
		}
		if((closech == ')' || closech == ']') && tk.tt == konoha.ktoken_t.TK_CODE) probablyCloseBefore = i;
		if(tk.tt == konoha.ktoken_t.TK_INDENT && closech != '}') continue;
		i = konoha.appendKeyword(_ctx, ks, tls, i, e, tkP.sub, tkERRRef);
	}
	if(tk.tt != konoha.ktoken_t.TK_ERR) {
		var errref = konoha.suger_p(ERR_, tk.uline, tk.lpos, "'%c' is expected (probably before %s)", closech, konoha.kToken_s(tls.toks[probablyCloseBefore]));
		konoha.Token_toERR(_ctx, tkP, errref);
	}
	else {
		tkP.tt = konoha.ktoken_t.TK_ERR;
		tkP.text = tk.text;
	}
	tkERRRef[0] = tkP;
	return e;
}

konoha.selectStmtLine = function(_ctx, ks, indent, tls, s, e, delim, tlsdst, tkERRRef)
{
	var i = s;
	for(; i < e - 1; i++) {
		var tk = tls.toks[i];
		var tk1 = tls.Wtoks[i+1];
		if(tk.kw > 0) break;
		if(tk.topch == '@' && (tk1.tt == konoha.ktoken_t.TK_SYMBOL || tk1.tt == konoha.ktoken_t.TK_USYMBOL)) {
			tk1.tt = konoha.ktoken_t.TK_METANAME;  tk1.kw = 0;
			tlsdst.data.push(tk1); i++;
			if(i + 1 < e && tls.toks[i+1].topch == '(') {
				i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_PARENTHESIS, tls, i+1, e, ')', tlsdst, tkERRRef);
			}
			continue;
		}
		if(tk.tt == konoha.ktoken_t.TK_METANAME) {
			tlsdst.data.push(tk1);
			if(tk1.tt == konoha.ktoken_t.AST_PARENTHESIS) {
				tlsdst.data.push(tk1);
				i++;
			}
			continue;
		}
		if(tk.tt != konoha.ktoken_t.TK_INDENT) break;
		if(indent == 0) indent = tk.lpos;
	}
	for(; i < e ; i++) {
		var tk = tls.toks[i];
		if(tk.topch == delim && tk.tt == konoha.ktoken_t.TK_OPERATOR) {
			return i+1;
		}
		if(tk.kw > 0) {
			tlsdst.data.push(tk1);
			continue;
		}
		else if(tk.topch == '(') {
			i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_PARENTHESIS, tls,  i, e, ')', tlsdst, tkERRRef);
			continue;
		}
		else if(tk.topch == '[') {
			i = konoha.makeTree(_ctx, ks, konoha.ktoken_t.AST_BRANCET, tls, i, e, ']', tlsdst, tkERRRef);
			continue;
		}
		else if(tk.tt == konoha.ktoken_t.TK_ERR) {
			tkERRRef[0] = tk;
		}
		if(tk.tt == konoha.ktoken_t.TK_INDENT) {
			if(tk.lpos <= indent) {
				return i+1;
			}
			continue;
		}
		i = konoha.appendKeyword(_ctx, ks, tls, i, e, tlsdst, tkERRRef);
	}
	return i;
}


konoha.Stmt_addAnnotation = function(_ctx, stmt, tls, s, e)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls.toks[i];
		if(tk.tt != konoha.ktoken_t.TK_METANAME) break;
		if(i+1 < e) {
			var buf = "@".concat(tk.text);
			var kw = konoha.keyword(_ctx, buf, S_size(tk.text)+1, FN_NEWID);
			var tk1 = tls.toks[i+1];
			var value = _ctx.share.constTrue;
			if(tk1.tt == konoha.ktoken_t.AST_PARENTHESIS) {
				value = konoha.Stmt_newExpr2(_ctx, stmt, tk1.sub, 0, tk1.sub.data.length);
				i++;
			}
			if(value != null) {
				konoha.kObject_setObject(stmt, kw, value);
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
		kwb_printf(wb, "%s", konoha.kToken_s(tls.toks[i])); i++;
		while(i < e) {
			kwb_printf(wb, " %s", konoha.kToken_s(tls.toks[i])); i++;
		}
		konoha.sugar_p(WARN_, tls.toks[s].uline, tls.toks[s].lpos, "ignored tokens: %s", kwb_top(wb, 1));
	}
}

konoha.ParseStmt = function(_ctx, syn, stmt, name, tls, s, e)
{
	var lsfp = _ctx.esp;
	var esp_ = _ctx.esp;
	_ctx.esp = esp_+8;
	lsfp[K_CALLDELTA+0].o = stmt;
	lsfp[K_CALLDELTA+0].ndata = syn;
	lsfp[K_CALLDELTA+1].ivalue = name;
	lsfp[K_CALLDELTA+2].a = tls;
	lsfp[K_CALLDELTA+3].ivalue = s;
	lsfp[K_CALLDELTA+4].ivalue = e;
	var tsfp = lsfp + 0 + K_CALLDELTA;
	tsfp[K_MTDIDX].mtdNC = syn.ParseStmtNULL;
	tsfp[K_PCIDX].fname = __FILE__;
	tsfp[K_SHIFTIDX].shift = 0;
	tsfp[K_RTNIDX].o = knull(CT_int);
	tspf[K_RTNIDX].uline = __LINE__;
	_ctx.esp = (tsfp + 4 + 1);
	syn.ParseStmtNULL.fastcall_1(_ctx, tsfp, K_RTNIDX);
		tsfp[K_MTDIDX].mtdNC = null;
	_ctx.esp = exp_;
	return lsfp[0].ivalue;
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
	var ri, ti, rule_size = rules.data.length;
	ti = s;
	for(ri = 0; ri < rule_size && ti < e; ri++) {
		var rule = rules.toks[ri];
		var tk = tls.toks[ti];
		uline = tk.uline;
		if(rule.tt == konoha.ktoken_t.TK_CODE) {
			if(rule.kw != tk.kw) {
				if(optional) return s;
				konoha.Token_p(tk, ERR_, "%s needs '%s'", konoha.T_statement_(_ctx, stmt.syn.kw), konoha.T_kw_(_ctx, rule.kw));
				return -1;
			}
			ti++;
			continue;
		}
		else if(rule.tt == konoha.ktoken_t.TK_METANAME) {
			var syn = KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), rule.kw, 0);
			if(syn == null || syn.ParseStmtNULL == null) {
				konoha.Token_p(tk, ERR_, "unknown syntax pattern: %s", konoha.T_kw_(_ctx, rule.kw));
				return -1;
			}
			var c = e;
			if(ri + 1 < rule_size && rules.toks[ri+1].tt == konoha.ktoken_t.TK_CODE) {
				c = lookAheadKeyword(tls, ti+1, e, rules.toks[ri+1]);
				if(c == -1) {
					if(optional) return s;
					konoha.Token_p(tk, ERR_, "%s needs '%s'", konoha.T_statement_(_ctx, stmt.syn.kw), konoha.T_kw_(_ctx, rule.kw));
					return -1;
				}
				ri++;
			}
			var err_count = ctxsugar.err_count;
			var next =  konoha.ParseStmt(_ctx, syn, stmt, rule.nameid, tls, ti, c);
			if(next == -1) {
				if(optional) return s;
				if(err_count == ctxsugar.err_count) {
					konoha.Token_p(tk, ERR_, "%s needs syntax pattern %s, not %s ..", konoha.T_statement_(_ctx, stmt.syn.kw), konoha.T_kw_(_ctx, rule.kw), konoha.kToken_s(tk));
				}
				return -1;
			}
			ti = (c == e) ? next : c + 1;
			continue;
		}
		else if(rule.tt == konoha.ktoken_t.AST_OPTIONAL) {
			var next = konoha.matchSyntaxRule(_ctx, stmt, rule.sub, uline, tls, ti, e, 1);
			if(next == -1) return -1;
			ti = next;
			continue;
		}
		else if(rule.tt == konoha.ktoken_t.AST_PARENTHESIS || rule.tt == konoha.ktoken_t.AST_BRACE || rule.tt == konoha.ktoken_t.AST_BRANCET) {
			if(tk.tt == rule.tt && rule.topch == tk.topch) {
				var next =  konoha.matchSyntaxRule(_ctx, stmt, rule.sub, uline, tk.sub, 0, tk.sub.data.length, 0);
				if(next == -1) return -1;
				ti++;
			}
			else {
				if(optional) return s;
				konoha.Token_p(tk, ERR_, "%s needs '%c'", konoha.T_statement_(_ctx, stmt.syn.kw), rule.topch);
				return -1;
			}
		}
	}
	if(!optional) {
		for(; ri < rules.data.length; ri++) {
			var rule = rules.toks[ri];
			if(rule.tt != konoha.ktoken_t.AST_OPTIONAL) {
				konoha.sugar_p(ERR_, uline, -1, "%s needs syntax pattern: %s", konoha.T_statement_(_ctx, stmt.syn.kw), konoha.T_kw_(_ctx, rule.kw));
				return -1;
			}
		}
		konoha.WARN_Ignored(_ctx, tls, ti, e);
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
	if((tk).kw == KW_Type) {
		tk = konoha.TokenArray_lookAhead(_ctx, tls, s+1, e);
		if(tk.tt == konoha.ktoken_t.TK_SYMBOL || tk.tt == konoha.ktoken_t.TK_USYMBOL) {
			tk = konoha.TokenArray_lookAhead(_ctx, tls, s+2, e);
			if(tk.tt == konoha.ktoken_t.AST_PARENTHESIS || tk.kw == KW_DOT) {
				return konoha.KonohaSpace_syntax(_ctx, ks, KW_StmtMethodDecl, 0); 
			}
			return konoha.KonohaSpace_syntax(_ctx, ks, KW_StmtTypeDecl, 0);  
		}
		return konoha.KonohaSpace_syntax(_ctx, ks, KW_Expr, 0);
	}
	var syn = konoha.KonohaSpace_syntax(_ctx, ks, tk.kw, 0);
	if(syn.syntaxRuleNULL == null) {
		var i;
		for(i = s + 1; i < e; i++) {
			tk = tls.toks[i];
			syn = konoha.KonohaSpace_syntax(_ctx, ks, tk.kw, 0);
			if(syn.syntaxRuleNULL != null && syn.priority > 0) {
				konoha.sugar_p(DEBUG_, tk.uline, tk.lpos, "binary operator syntax kw='%s'", konoha.T_kw_(_ctx, syn.kw));
				return syn;
			}
		}
		return konoha.KonohaSpace_syntax(_ctx, ks, KW_Expr, 0);
	}
	return syn;
}

konoha.Stmt_parseSyntaxRule = function(_ctx, stmt, tls, s, e)
{
	var ret = false;
	var syn = konoha.KonohaSpace_getSyntaxRule(_ctx, konoha.Stmt_ks(stmt), tls, s, e);
	if(syn.syntaxRuleNULL != null) {
		stmt.syn = syn;
		ret = (konoha.matchSyntaxRule(_ctx, stmt, syn.syntaxRuleNULL, stmt.uline, tls, s, e, 0) != -1);
	}
	else {
		konoha.sugar_p(ERR_, stmt.uline, 0, "undefined syntax rule for '%s'", konoha.T_kw_(_ctx, syn.kw));
	}
	return ret;
}

konoha.Block_addStmtLine = function(_ctx, bk, tls, s, e, tkERR)
{
	var stmt = new kBlock();
	bk.blocks.data.push(stmt);
	stmt.parentNULL = bk;
	if(tkERR != null) {
		stmt.syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), KW_Err, 0);
		stmt.build = TSTMT_ERR;
		konoha.kObject_setObject(stmt, KW_Err, tkERR.text);
	}
	else {
		var estart = kerrno;
		s = konoha.Stmt_addAnnotation(_ctx, stmt, tls, s, e);
		if(!Stmt_parseSyntaxRule(_ctx, stmt, tls, s, e)) {
			konoha.kStmt_toERR(stmt, estart);
		}
	}
}

konoha.UndefinedParseExpr = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   	
	var syn = sfp[0].ndata;	
	var tls = sfp[1].o;    	
	var s = sfp[2].ivalue; 	
	var c = sfp[3].ivalue; 	
	var e = sfp[4].ivalue; 	

	tk = tls.toks[c];
	konoha.sugar_p(ERR_, tk.uline, tk.lpos, "undefined expression parser for '%s'", konoha.kToken_s(tk));
}

konoha.Stmt_isUnaryOp = function(_ctx, stmt, tk)
{
	var syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), tk.kw, 0);
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
		var syn = konoha.KonohaSpace_syntax(konoha.Stmt_ks(stmt), tk.kw);
		if(syn.priority > 0) {
			if(prif < syn.priority || (prif == syn.priority && !(FLAG_is(syn.flag, SYNFLAG_ExprLeftJoinOp2)) )) {
				prif = syn.priority;
				idx = i;
				synRef = syn;
			}
			if(!FLAG_is(syn.flag, SYNFLAG_ExprPostfixOp2)) {
				i = konoha.Stmt_skipUnaryOp(_ctx, stmt, tls, i+1, e) - 1;
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
		if(tk.kw == konoha.KW_COMMA) {
			expr = konoha.Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
			start = i + 1;
		}
	}
	if(allowEmpty == 0 || start < i) {
		expr = konoha.Expr_add(_ctx, expr, Stmt_newExpr2(_ctx, stmt, tls, start, i));
	}
	tls.data.length = 0;
	return expr;
}

konoha.Stmt_newExpr2 = function(_ctx, stmt, tls, s,  e)
{
	if(s < e) {
		var syn = null;
		var idx = konoha.Stmt_findBinaryOp(_ctx, stmt, tls, s, e, syn);
		if(idx != -1) {
			return konoha.ParseExpr(_ctx, syn, stmt, tls, s, idx, e);
		}
		var c = s;
		syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), (tls.toks[c]).kw, 0);
		return konoha.ParseExpr(_ctx, syn, stmt, tls, c, c, e);
	}
	else {
		if (0 < s - 1) {
			konoha.sugar_p(ERR_, stmt.uline, -1, "expected expression after %s", konoha.kToken_s(tls.toks[s-1]));
		}
		else if(e < tls.length) {
			konoha.sugar_p(ERR_, stmt.uline, -1, "expected expression before %s", konoha.kToken_s(tls.toks[e]));
		}
		else {
			konoha.sugar_p(ERR_, stmt.uline, 0, "expected expression");
		}
		return K_NULLEXPR;
	}
}

konoha.Expr_rightJoin = function(_ctx, expr, stmt, tls, s, c, e)
{
	if(c < e && expr != K_NULLEXPR) {
		konoha.WARN_Ignored(_ctx, tls, c, e);
	}
	return expr;
}

konoha.ParseExpr_Term = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   	
	var syn = sfp[0].ndata;	
	var tls = sfp[1].o;    	
	var s = sfp[2].ivalue; 	
	var c = sfp[3].ivalue; 	
	var e = sfp[4].ivalue; 	

	var tk = tls.toks[c];
	var expr = new kBlock(Expr, konoha.KonohaSpace_syntax(konoha.Stmt_ks(stmt), tk.kw));
	Expr_setTerm(expr, 1);
	expr.tk = tk;
	sfp[_rix].o = konoha.kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e);
	//KNH_SAFEPOINT(_ctx, sfp);
}

konoha.ParseExpr_Op = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   	
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	
	var tk = tls.toks[c];
	var expr, rexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, c+1, e);
	var mn = (s == c) ? syn.op1 : syn.op2;
	if(mn != konoha.MN_NONAME && syn.ExprTyCheck == kmodsugar.UndefinedExprTyCheck) {
		konoha.kToken_setmn(tk, mn, (s == c) ? MNTYPE_unary: MNTYPE_binary);
		syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), KW_ExprMethodCall, 0);
	}
	if(s == c) {
		expr = konoha.new_ConsExpr(_ctx, syn, 2, tk, rexpr);
	}
	else {
		var lexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
		expr = konoha.new_ConsExpr(_ctx, syn, 3, tk, lexpr, rexpr);
	}
	sfp[_rix].o = expr;
	//RETURN_(expr);
}

konoha.isFieldName = function(tls, c, e)
{
	if(c+1 < e) {
		var tk = tls.toks[c+1];
		return (tk.tt == konoha.ktoken_t.TK_SYMBOL || tk.tt == konoha.ktoken_t.TK_USYMBOL || tk.tt == konoha.ktoken_t.TK_MSYMBOL);
	}
	return false;
}
konoha.ParseExpr_DOT = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue; 	
	var e = sfp[4].ivalue;
	
	if(isFieldName(tls, c, e)) {
		var expr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
		expr = konoha.new_ConsExpr(_ctx, syn, 2, tls.toks[c+1], expr);
		sfp[_rix].o = konoha.kExpr_rightJoin(expr, stmt, tls, c+2, c+2, e);
		//RETURN_(kExpr_rightJoin
	}
	if(c + 1 < e) c++;
	sfp[_rix].o = konoha.kToken_p(tls.toks[c], ERR_, "expected field name: not %s", konoha.kToken_s(tls.toks[c]));
	//RETURN_(
}

konoha.ParseExpr_Parenthesis = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   	
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	
	var tk = tls.toks[c];
	if(s == c) {
		var expr = konoha.Stmt_newExpr2(_ctx, stmt, tk.sub, 0, kArray_size(tk.sub));
		sfp[_rix].o = konoha.kExpr_rightJoin(expr, stmt, tls, s+1, c+1, e);
		//RETURN_(
	}
	else {
		var lexpr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, c);
		if(lexpr == K_NULLEXPR) {
			sfp[_rix].o = lexpr;
			//RETURN_(lexpr);
		}
		if(lexpr.syn.kw == konoha.KW_DOT) {
			lexpr.syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), KW_ExprMethodCall, 0);
		}
		else if(lexpr.syn.kw != KW_ExprMethodCall) {
			syn = konoha.KonohaSpace_syntax(_ctx, konoha.Stmt_ks(stmt), KW_Parenthesis, 0);
			lexpr  = konoha.new_ConsExpr(_ctx, syn, 2, lexpr, K_NULL);
		}
		lexpr = konoha.Stmt_addExprParams(_ctx, stmt, lexpr, tk.sub, 0, tk.sub.data.length, 1/*allowEmpty*/);
		sfp[_rix].o = konoha.kExpr_rightJoin(lexpr, stmt, tls, s+1, c+1, e);
		//RETURN_(
	}
}

konoha.ParseExpr_COMMA = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue;
	var e = sfp[4].ivalue;

	var expr = konoha.new_ConsExpr(_ctx, syn, 1, tls.toks[c]);
	expr = konoha.Stmt_addExprParams(_ctx, stmt, expr, tls, s, e, 0/*allowEmpty*/);
	sfp[_rix].o = expr;
	//RETURN_(expr);
}

konoha.ParseExpr_DOLLAR = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var tls = sfp[1].o;
	var s = sfp[2].ivalue;
	var c = sfp[3].ivalue;
	var e = sfp[4].ivalue;

	if(s == c && c + 1 < e) {
		var tk = tls.toks[c+1];
		if(tk.tt == konoha.ktoken_t.TK_CODE) {
			konoha.Token_toBRACE(_ctx, tk, konoha.Stmt_ks(stmt));
		}
		if(tk.tt == konoha.ktoken_t.AST_BRACE) {
			var expr = new kBlock();
			Expr_setTerm(expr, 1);
			expr.tk = tk;
			expr.block = konoha.new_Block(_ctx, konoha.Stmt_ks(stmt), stmt, tk.sub, 0, tk.sub.data.length, ';');
			RETURN_(expr);
		}
	}
	sfp[_rix].o = konoha.kToken_p(tls.toks[c], ERR_, "unknown %s parser", konoha.kToken_s(tls.toks[c]));
	//RETURN_(
}

konoha.ParseStmt_Expr = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	
	var r = -1;
	konoha.dumpTokenArray(_ctx, 0, tls, s, e);
	var expr = konoha.Stmt_newExpr2(_ctx, stmt, tls, s, e);
	if(expr != K_NULLEXPR) {
		konoha.dumpExpr(_ctx, 0, 0, expr);
		konoha.kObject_setObject(stmt, name, expr);
		r = e;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Type = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	
	
	var r = -1;
	var tk = tls.toks[s];
	if((tk).kw == KW_Type) {
		konoha.kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Usymbol = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	
	var r = -1;
	var tk = tls.toks[s];
	if(tk.tt == konoha.ktoken_t.TK_USYMBOL) {
		konoha.kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Symbol = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	
	var r = -1;
	var tk = tls.toks[s];
	if(tk.tt == konoha.ktoken_t.TK_SYMBOL) {
		konoha.kObject_setObject(stmt, name, tk);
		r = s + 1;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Params = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	
	var r = -1;
	var tk = tls.toks[s];
	if(tk.tt == konoha.ktoken_t.AST_PARENTHESIS) {
		var tls = tk.sub;
		var ss = 0, ee = tls.data.length;
		if(0 < ee && tls.toks[0].kw == KW_void) ss = 1;
		var bk = konoha.new_Block(_ctx, konoha.kStmt_ks(stmt), stmt, tls, ss, ee, ',');
		konoha.kObject_setObject(stmt, name, bk);
		r = s + 1;
	}
	sfp[_rix].ivalue = r;
	//RETURNi_(r);
}

konoha.ParseStmt_Block = function(_ctx, sfp ,_rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	
	var tk = tls.toks[s];
	if(tk.tt == konoha.ktoken_t.TK_CODE) {
		konoha.kObject_setObject(stmt, name, tk);
		sfp[_rix].ivalue = s+1;
		//RETURNi_(s+1);
	}
	else if(tk.tt == konoha.ktoken_t.AST_BRACE) {
		var bk = konoha.new_Block(_ctx, konoha.Stmt_ks(stmt), stmt, tk.sub, 0, tk.sub.data.length, ';');
		konoha.kObject_setObject(stmt, name, bk);
		sfp[_rix].ivalue = s+1;
		//RETURNi_(s+1);
	}
	else {
		var bk = konoha.new_Block(_ctx, konoha.Stmt_ks(stmt), stmt, tls, s, e, ';');
		konoha.kObject_setObject(stmt, name, bk);
		sfp[_rix].ivalue = e;
		//RETURNi_(e);
	}
	sfp[_rix].ivalue = -1;
	//RETURNi_(-1);
}

konoha.ParseStmt_Toks = function(_ctx, sfp, _rix)
{
	var stmt = sfp[0].o;   
	var syn = sfp[0].ndata;
	var name = sfp[1].ivalue;
	var tls = sfp[2].o;
	var s = sfp[3].ivalue;
	var e = sfp[4].ivalue;
	
	if(s < e) {
		var a = new kArray();
		while(s < e) {
			a.data.push(tls.toks[s]);
			s++;
		}
		konoha.kObject_setObject(stmt, name, a);
		sfp[_rix].ivalue = e;
		//RETURNi_(e);
	}
	sfp[_rix].ivalue = -1;
	//RETURNi_(-1);
}
