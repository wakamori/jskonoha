konoha = {};
konoha.DBG_P = function(msg) {
	console.log(msg);
}

konoha.Enum = function() {
	for (var i in arguments) {
		this[arguments[i]] = parseInt(i);
	}
};

konoha.isalpha = function(c) { //only use string which is single letter
	var cc = c.charCodeAt(0);
	if ((65 <= cc && cc <= 90) ||
		(97 <= cc && cc <= 122)) {
		return true;
	}
	else {
		return false;
	}
}

konoha.isnum = function(c) { //only use string which is single letter
	var cc = c.charCodeAt(0);
	if (48 <= cc && cc <= 57) {
		return true;
	}
	else {
		return false;
	}
}

konoha.isalnum = function(c) {
	if (konoha.isalpha(c) ||
		konoha.isnum(c)) {
		return true;
	}
	else {
		return false;
	}
}

konoha.assert = function(cond, msg) {
	if (!cond) {
		var e = "Assersion!! " + msg;
//		console.log(e);
		throw e;
	}
}

konoha.abort = function(msg) {
	if (msg != null) {
//		console.log(e);
	}
	var e = "Abort!! " + msg;
	throw e;
}

//keywords
konoha.kw = {};
konoha.kw.Err         = "$ERR";
konoha.kw.Expr        = "$expr";
konoha.kw.Symbol      = "$SYMBOL";
konoha.kw.Usymbol     = "$USYMBOL";
konoha.kw.Text        = "$TEXT";
konoha.kw.Int         = "$INT";
konoha.kw.Float       = "$Float";
konoha.kw.Type        = "$type";
konoha.kw.Parenthesis = '()';
konoha.kw.Brancet     = '[]';
konoha.kw.Brace       = '{}';
konoha.kw.Block       = '$block';
konoha.kw.Params      = '$params';
konoha.kw.Toks        = '$toks';
konoha.kw.New         = '$new';

konoha.kw.array = [
	konoha.kw.Err,
	konoha.kw.Expr,
	konoha.kw.Symbol,
	konoha.kw.Usymbol,
	konoha.kw.Text,
	konoha.kw.Int,
	konoha.kw.Float,
	konoha.kw.Type,
	konoha.kw.Parenthesis,
	konoha.kw.Brancet,
	konoha.kw.Brace,
	konoha.kw.Block,
	konoha.kw.Params,
	konoha.kw.ExprMethodCall,
	konoha.kw.Toks,
	konoha.kw.New
];

konoha.kw.DOT         = '.';
konoha.kw.DIV         = '/';
konoha.kw.MOD         = '%';
konoha.kw.MUL         = '*';
konoha.kw.ADD         = '+';
konoha.kw.SUB         = '-';
konoha.kw.LT          = '<';
konoha.kw.LTE         = '<=';
konoha.kw.GT          = '>';
konoha.kw.GTE         = '>=';
konoha.kw.EQ          = '==';
konoha.kw.NEQ         = '!=';
konoha.kw.AND         = '&&';
konoha.kw.OR          = '||';
konoha.kw.NOT         = '!';
konoha.kw.LET         = '=';
konoha.kw.COMMA       = ',';
konoha.kw.DOLLAR      = '$';

konoha.kw._void       = 'void';
konoha.kw._boolean    = 'boolean';
konoha.kw._int        = 'int';
konoha.kw._true       = 'true';
konoha.kw._false      = 'false';
konoha.kw._if         = 'if';
konoha.kw._else       = 'else';
konoha.kw._return     = 'return';
konoha.kw.KW_StmtMethodDecl = konoha.kw._void;
konoha.kw.KW_StmtTypeDecl =  konoha.kw.Type;
