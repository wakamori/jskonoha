////****************************************************************************
// * copyright (c) 2012, the Konoha project authors. All rights reserved.
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
	//	tk.text = ctxsugar.errors.strings[errref]; //TODO ERROR
}

konoha.lpos = function(tenv, s) //Number : tenv_t, Number
{
	return (tenv.bol == null) ? -1 : s - tenv.bol;
}

konoha.parseINDENT = function(_ctx, tk, tenv, pos, thunk)
{
	var ch, c = 0;
	while((ch = tenv.source[pos++]) != undefined) {
		if(ch == '\t') {
			c += tenv.indent_tab;
		}
		else if(ch == ' ') {
			c += 1;
		}
		break;
	}
	if(tk != null) {
		tk.tt = konoha.ktoken_t.TK_INDENT;
		tk.lpos = 0;
	}
	return pos - 1;
}

konoha.parseNL = function(_ctx, tk, tenv, pos, thunk)
{
	tenv.uline += 1;
	tenv.bol = pos + 1;
	return konoha.parseINDENT(_ctx, tk, tenv, pos + 1, thunk);
}

konoha.parseNUM = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start, dot = 0;
	//	var ts = tenv.source;
	while((ch = tenv.source[pos++]) != undefined) {
		if(ch == '_') continue;
		if(ch == '.') {
			if(konoha.isdigit(tenv.source[pos])) {
				break;
			}
			dot++;
			continue;
		}
		if((ch == 'e' || ch == 'E') && (tenv.source[pos] == '+' || tenv.source[pos] =='-')) {
			pos++;
			continue;
		}
		if(!konoha.isalnum(ch)) break;
	}
	if (tk != null) {
		tk.text = new konoha.kString();
		tk.text.text = tenv.source.substr(tok_start, (pos-1)-tok_start);
		tk.tt = (dot == 0) ? konoha.ktoken_t.TK_INT : konoha.ktoken_t.TK_FLOAT;
	}
	return pos - 1;
}

konoha.parseSYMBOL = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	var ts = tenv.source;
	while ((ch = ts[pos++]) != undefined) {
		if (ch == '_' || konoha.isalnum(ch)) {
			continue;
		}
		break;
	}
	if(tk != null) {
		tk.text = new konoha.kString();
		tk.text.text = ts.substr(tok_start, (pos-1)-tok_start);
		tk.tt = konoha.ktoken_t.TK_SYMBOL;
	}
	return pos - 1;
}

konoha.parseUSYMBOL = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	var ts = tenv.source;
	while((ch = ts[pos++]) != undefined) {
		if (ch == '_' || konoha.isalnum(ch)) continue;
		break;
	}
	if (tk != null) {
		tk.text = new konoha.kString();
		tk.text.text = ts.substr(tok_start, (pos-1)-tok_start);
		tk.tt = konoha.ktoken_t.TK_USYMBOL;
	}
	return pos - 1;
}

konoha.parseMSYMBOL = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	var ts = tenv.source;
	while((ch = ts.charCodeAt(pos++)) != undefined) {
		if(!(ch < 0)) break;
	}
	if (tk != null) {
		tk.text = new konoha.kString();
		tk.text.text = ts.substr(tok_start, (pos-1)-tok_start);
		tk.tt = konoha.ktoken_t.TK_MSYMBOL;
	}
	return pos - 1;
}

konoha.parseOP1 = function(_ctx, tk, tenv, tok_start, thunk)
{
	if (tk != null) {
	//	var s = tenv.source + tok_start;
		tk.text = new konoha.kString();
		tk.text.text = tenv.source[tok_start];
		tk.tt = konoha.ktoken_t.TK_OPERATOR;
		tk.topch = tenv.source[tok_start];
	}
	return tok_start+1;
}

konoha.parseOP = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	while((ch = tenv.source[pos++]) != undefined) {
		if (konoha.isalnum(ch)) break;
		switch(ch) {
		case '<': case '>': case '@': case '$': case '#':
		case '+': case '-': case '*': case '%': case '/':
		case '=': case '&': case '?': case ':': case '.':
		case '^': case '!': case '~': case '|':
			continue;
		}
		break;
	}
	if(tk != null) {
	//	var s = tenv.source[tok_start];
		tk.text = new konoha.kString();
		tk.text.text = tenv.source.substr(tok_start, (pos-1)-tok_start);
		tk.tt = konoha.ktoken_t.TK_OPERATOR;
		if(tk.text.text.length == 1) {
			tk.topch = tk.text.text;
		}
	}
	return pos-1;
}

konoha.parseLINE = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, pos = tok_start;
	while((ch = tenv.source[pos++]) != undefined) {
		if(ch == '\n') break;
	}
	return pos-1;/*EOF*/
}

konoha.parseCOMMENT = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, prev = 0, level = 1, pos = tok_start + 2;
	/*@#nnnn is line number */
	if(tenv.source[pos] == '@' && tenv.source[pos+1] == '#' && isdigit(tenv.source[pos+2])) {
		//TODO
		// 		tenv.uline >>= (sizeof(kshort_t)*8);
		// 		tenv.uline = (tenv.uline<<(sizeof(kshort_t)*8))  | strtoll(tenv.source + pos + 2, null, 10);
	}
	while((ch = tenv.source[pos++]) != undefined) {
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
	if (tk != null) {
		var errref = konoha.sugar_p(konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "must close with */");
		konoha.Token_toERR(_ctx, tk, errref);
	}
	return pos-1;/*EOF*/
}

konoha.parseSLASH = function(_ctx, tk, tenv, tok_start, thunk)
{
	//	var ts = tenv.source + tok_start;
	if(tenv.source[tok_start + 1] == '/') {
		return konoha.parseLINE(_ctx, tk, tenv, tok_start, thunk);
	}
	if(tenv.source[tok_start + 1] == '*') {
		return konoha.parseCOMMENT(_ctx, tk, tenv, tok_start, thunk);
	}
	return konoha.parseOP(_ctx, tk, tenv, tok_start, thunk);
}

konoha.parseDQUOTE = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, prev = '"', pos = tok_start + 1;
	while((ch = tenv.source[pos++]) != undefined) {
		if(ch == '\n') {
			break;
		}
		if(ch == '"' && prev != '\\') {
			if(tk != null) {
				tk.text = new konoha.kString();
				tk.text.text = tenv.source.substr(tok_start + 1, (pos-1)-(tok_start+1));
				tk.tt = konoha.ktoken_t.TK_TEXT;
			}
			return pos;
		}
		prev = ch;
	}
	if(tk != null) {
		var errref = konoha.sugar_p(konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "must close with \"");
		konoha.token_toERR(_ctx, tk, errref);
	}
	return pos-1;
}

konoha.parseSKIP = function(_ctx, tk, tenv, tok_start, thunk)
{
	tk.tt = 0;
	return tok_start+1;
}

konoha.parseUNDEF = function(_ctx, tk, tenv, tok_start, thunk)
{
	if(tk != null) {
//		var errref = konoha.sugar_p(konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "undefined token character: %c", tenv.source[tok_start]);
		var errref = 0; //FIX ME!!
		konoha.Token_toERR(_ctx, tk, errref);
	}
	while(tenv.source[++tok_start] != undefined);
	return tok_start;
}

konoha.parseBLOCK = function(_ctx, tk, tenv, tok_start, thunk)
{
	var ch, level = 1, pos = tok_start + 1;
	var fmat = tenv.fmat;
	tk.lpos += 1;
	while((ch = konoha.kchar(tenv.source, pos)) != 0) {
		if(ch == konoha.MKTM_type._RBR/*}*/) {
			level--;
			if(level == 0) {
				if(tk != null) {
					tk.text = new konoha.kString();
					tk.text.text = tenv.source.substr(tok_start + 1, (pos-2)-(tok_start)+1);
					tk.tt = konoha.ktoken_t.TK_CODE;
				}
				return pos + 1;
			}
			pos++;
		}
		else if(ch == konoha.MKTM_type._LBR/*'{'*/) {
			level++; pos++;
		}
		else {
			pos = fmat[ch](_ctx, null, tenv, pos, null);
		}
	}
	if(tk != null) {
		var errref = konoha.sugar_p(konoha.ERR_, tk.uline, tk.lpos, "must close with }");
		konoha.Token_toERR(_ctx, tk, errref);
	}
	return pos-1;
}

konoha.MiniKonohaTokenMatrix = new Array(
	//konoha.MKTM_type._NULL    = 0
	konoha.parseSKIP,
	//konoha.MKTM_type._UNDEF   = 1
	konoha.parseSKIP,
	//konoha.MKTM_type._DIGIT   = 2
	konoha.parseNUM,
	//konoha.MKTM_type._UALPHA  = 3
	konoha.parseUSYMBOL,
	//konoha.MKTM_type._LALPHA  = 4
	konoha.parseSYMBOL,
	//konoha.MKTM_type._MULTI   = 5
	konoha.parseMSYMBOL,
	//konoha.MKTM_type._NL      = 6
	konoha.parseNL,
	//konoha.MKTM_type._TAB     = 7
	konoha.parseSKIP,
	//konoha.MKTM_type._SP      = 8
	konoha.parseSKIP,
	//konoha.MKTM_type._LPAR    = 9
	konoha.parseOP1,
	//konoha.MKTM_type._RPAR    = 10
	konoha.parseOP1,
	//konoha.MKTM_type._LSQ     = 11
	konoha.parseOP1,
	//konoha.MKTM_type._RSQ     = 12
	konoha.parseOP1,
	//konoha.MKTM_type._LBR     = 13
	konoha.parseBLOCK,
	//konoha.MKTM_type._RBR     = 14
	konoha.parseOP1,
	//konoha.MKTM_type._LT      = 15
	konoha.parseOP,
	//konoha.MKTM_type._GT      = 16
	konoha.parseOP,
	//konoha.MKTM_type._QUOTE   = 17
	konoha.parseUNDEF,
	//konoha.MKTM_type._DQUOTE  = 18
	konoha.parseDQUOTE,
	//konoha.MKTM_type._BKQUOTE = 19
	konoha.parseUNDEF,
	//konoha.MKTM_type._OKIDOKI = 20
	konoha.parseOP,
	//konoha.MKTM_type._SHARP   = 21
	konoha.parseOP,
	//konoha.MKTM_type._DOLLAR  = 22
	konoha.parseOP,
	//konoha.MKTM_type._PER     = 23
	konoha.parseOP,
	//konoha.MKTM_type._AND     = 24
	konoha.parseOP,
	//konoha.MKTM_type._STAR    = 25
	konoha.parseOP,
	//konoha.MKTM_type._PLUS    = 26
	konoha.parseOP,
	//konoha.MKTM_type._COMMA   = 27
	konoha.parseOP1,
	//konoha.MKTM_type._MINUS   = 28
	konoha.parseOP,
	//konoha.MKTM_type._DOT     = 29
	konoha.parseOP,
	//konoha.MKTM_type._SLASH   = 30
	konoha.parseSLASH,
	//konoha.MKTM_type._COLON   = 31
	konoha.parseOP,
	//konoha.MKTM_type._SEMICOLON = 32
	konoha.parseOP1,
	//konoha.MKTM_type._EQ      = 33
	konoha.parseOP,
	//konoha.MKTM_type._QUESTION= 34
	konoha.parseOP,
	//konoha.MKTM_type._AT      = 35
	konoha.parseOP1,
	//konoha.MKTM_type._VAR     = 36
	konoha.parseOP,
	//konoha.MKTM_type._CHILDER = 37
	konoha.parseOP,
	//konoha.MKTM_type._BKSLASH = 38
	konoha.parseUNDEF,
	//konoha.MKTM_type._HAT     = 39
	konoha.parseOP,
	//konoha.MKTM_type._UNDER   = 40
	konoha.parseSYMBOL
	//konoha.KCHAR_MAX= 41
);


konoha.MKTM_type = new konoha.Enum(
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

konoha.cMatrix = new Array(
	0/*nul*/, 1/*soh*/, 1/*stx*/, 1/*etx*/, 1/*eot*/, 1/*enq*/, 1/*ack*/, 1/*bel*/,
	1/*bs*/, konoha.MKTM_type._TAB/*ht*/, konoha.MKTM_type._NL/*nl*/, 1/*vt*/, 1/*np*/, 1/*cr*/, 1/*so*/, 1/*si*/,
	//	/*	020 dle  021 dc1  022 dc2  023 dc3  024 dc4  025 nak  026 syn  027 etb*/
	1, 1, 1, 1,     1, 1, 1, 1,
	//	/*	030 can  031 em   032 sub  033 esc  034 fs   035 gs   036 rs   037 us*/
	1, 1, 1, 1,     1, 1, 1, 1,
	//	/*040 sp   041  !   042  "   043  #   044  $   045  %   046  &   047  '*/
	konoha.MKTM_type._SP, konoha.MKTM_type._OKIDOKI, konoha.MKTM_type._DQUOTE, konoha.MKTM_type._SHARP, konoha.MKTM_type._DOLLAR, konoha.MKTM_type._PER, konoha.MKTM_type._AND, konoha.MKTM_type._QUOTE,
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
);

konoha.kchar = function(t, pos)
{
	var ch = t.charCodeAt(pos);
	return konoha.cMatrix[ch]; //TODO : Multi-byte char
}

konoha.tokenize = function(_ctx, tenv)
{
	var ch, pos = 0;
	var fmat = tenv.fmat;
	var tk = new konoha.kToken();
	//	konoha.assert(tk.tt == 0); //TODO : Is this necessary?
	tk.uline = tenv.uline;
	tk.lpos  = konoha.lpos(tenv, 0);
	pos = konoha.parseINDENT(_ctx, tk, tenv, pos, null);
	while ((ch = konoha.kchar(tenv.source, pos)) != undefined) {
		if(tk.tt != 0) {
			tenv.list.push(tk);
			tk = new konoha.kToken();
			tk.uline = tenv.uline;
			tk.lpos  = konoha.lpos(tenv, pos);
		}
		var pos2 = fmat[ch](_ctx, tk, tenv, pos, null);
		konoha.assert(pos2 > pos);
		pos = pos2;
	}
	if(tk.tt != 0) {
		tenv.list.push(tk);
	}
}

konoha.KonohaSpace_tokenizerMatrix = function(_ctx, ks)
{
	if(ks.fmat == null) {
		//		DBG_ASSERT(KCHAR_MAX * sizeof(Ftokenizer) == sizeof(MiniKonohaTokenMatrix));
		var fmat;// = KMALLOC(sizeof(MiniKonohaTokenMatrix));
		if(ks.parentNULL != null && ks.parentNULL.fmat != null) {
			fmat = ks.parentNULL.fmat;
		}
		else {
			fmat = konoha.MiniKonohaTokenMatrix;
		}
		ks.fmat = fmat;
	}
	return ks.fmat;
}

konoha.KonohaSpace_setTokenizer = function(_ctx, ks, ch, f, mtd/*future extension*/)
{
	var kchar = (ch < 0) ? konoha._MULTI : cMatrix[ch];
	var fmat = konoha.KonohaSpace_tokenizerMatrix(_ctx, ks);
	fmat[kchar] = f;
}

konoha.KonohaSpace_tokenize = function(_ctx, ks, source, uline, a)
{
	var i, pos = a.length;
	var tenv = new konoha.tenv_t();
	tenv.source = source,
	tenv.uline  = uline,
	tenv.list   = a,
	tenv.bol    = source,
	tenv.indent_tab = 4,
	tenv.fmat   = ks == null ? konoha.MiniKonohaTokenMatrix : konoha.KonohaSpace_tokenizerMatrix(_ctx, ks)

	konoha.tokenize(_ctx, tenv);
	if(uline == 0) {
		for(i = pos; i < a.length; i++) {
			a[i].uline = 0;
		}
	}
}

konoha.findTopCh = function(_ctx, tls, s, e, tt, closech)
{
	var i;
	for(i = s; i < e; i++) {
		var tk = tls[i];
		if(tk.tt == tt && tk.text.text == closech) return i;
	}
	//	DBG_ASSERT(i != e);
	return e;
}

//konoha.makeSyntaxRule = function(_ctx, tls, s, e, adst);

konoha.checkNestedSyntax = function(_ctx, tls, s, e, tt, opench, closech)
{
	var tk = tls[s.ivalue];
	var t = tk.text.text;
	if(t == opench) {
		var ne = konoha.findTopCh(_ctx, tls, s.ivalue+1, e, tk.tt, closech);
		tk.tt = tt; tk.kw = konoha.kw.array[tt]; // TODO!! tt=AST_OPTIONAL
		//		tk.sub = new_(TokenArray, 0);
		tk.sub = new Array();
		tk.topch = opench; 
		tk.closech = closech;
		konoha.makeSyntaxRule(_ctx, tls, s.ivalue+1, ne, tk.sub);
		s.ivalue = ne;
		return 1;
	}
	return 0;
}

konoha.makeSyntaxRule = function(_ctx, tls, s, e, adst)
{
	var i;
	var nbuf = "";
	var nameid = 0;
	//	dumpTokenArray(_ctx, 0, tls, s, e);
	for(i = s; i < e; i++) {
		var tk = tls[i];
		if(tk.tt == konoha.ktoken_t.TK_INDENT) continue;
		if(tk.tt == konoha.ktoken_t.TK_TEXT /*|| tk.tt == TK_STEXT*/) {
			var boxed_i = {};
			boxed_i.ivalue = i;
			if(konoha.checkNestedSyntax(_ctx, tls, boxed_i, e, konoha.ktoken_t.AST_PARENTHESIS, '(', ')') ||
			   konoha.checkNestedSyntax(_ctx, tls, boxed_i, e, konoha.ktoken_t.AST_BRANCET, '[', ']') ||
			   konoha.checkNestedSyntax(_ctx, tls, boxed_i, e, konoha.ktoken_t.AST_BRACE, '{', '}')) {
			}
			else {
				tk.tt = konoha.ktoken_t.TK_CODE;
				tk.kw = konoha.keyword(_ctx, tk.text.text, tk.text.text.length, konoha.FN_NEWID);
			}
			adst.push(tk);
			i = boxed_i.ivalue;
			continue;
		}
		if(tk.tt == konoha.ktoken_t.TK_SYMBOL || tk.tt == konoha.ktoken_t.TK_USYMBOL) {
			if(i > 0 && tls[i-1].topch == '$') {
				nbuf = "$" + tk.text.text
				tk.kw = konoha.keyword(_ctx, nbuf, nbuf.length, konoha.FN_NEWID);
				tk.tt = konoha.ktoken_t.TK_METANAME;
				if(nameid == 0) nameid = tk.kw;
				tk.nameid = nameid;
				nameid = 0;
				adst.push(tk); continue;
			}
			if(i + 1 < e && tls[i+1].topch == ':') {
				var tk = tls[i];
				nameid = konoha.keyword(_ctx, tk.text, tk.text.length, konoha.FN_NEWID);
				i++;
				continue;
			}
		}
		if(tk.tt == konoha.ktoken_t.TK_OPERATOR) {
			var boxed_i = {};
			boxed_i.ivalue = i;
			if(konoha.checkNestedSyntax(_ctx, tls, boxed_i, e, konoha.ktoken_t.AST_OPTIONAL, '[', ']')) {
				adst.push(tk);
				continue;
			}
			i = boxed_i.ivalue;
			if(tls[i].topch == '$') continue;
		}
		//		konoha.sugar_p(konoha.kreportlevel_t.ERR_, tk.uline, tk.lpos, "illegal sugar syntax: %s", kToken_s(tk));
		return false;
	}
	return true;
}

konoha.parseSyntaxRule = function(_ctx, rule, uline, a)
{
	var tls = _ctx.ctxsugar.tokens;
	pos = tls.length;
	konoha.KonohaSpace_tokenize(_ctx, null, rule, uline, tls);
	konoha.makeSyntaxRule(_ctx, tls, pos, tls.length, a);
	tls.length = 0;
}
