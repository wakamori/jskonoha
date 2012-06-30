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

konoha.defineDefaultSyntax = function(_ctx, ks)
{
	var SYNTAX = [
		{name: '$ERR', flag: konoha.SYNFLAG_StmtBreakExec },
		{name: '$expr', rule: '$expr', ParseStmt: konoha.ParseStmt_Expr, TopStmtTyCheck: konoha.StmtTyCheck_Expr, StmtTyCheck: konoha.StmtTyCheck_Expr, },
		{name: '$SYMBOL', flag: konoha.SYNFLAG_ExprTerm, ParseStmt: konoha.ParseStmt_Symbol, ExprTyCheck: konoha.ExprTyCheck_Symbol, },
		{name: '$USYMBOL', flag: konoha.SYNFLAG_ExprTerm, ParseStmt: konoha.ParseStmt_Usymbol, TopStmtTyCheck: konoha.StmtTyCheck_ConstDecl, ExprTyCheck: konoha.ExprTyCheck_Usymbol, },
		{name: '$TEXT', flag: konoha.SYNFLAG_ExprTerm, ExprTyCheck: konoha.ExprTyCheck_Text, },
		{name: '$INT', flag: konoha.SYNFLAG_ExprTerm, ExprTyCheck: konoha.ExprTyCheck_Int, },
		{name: '$FLOAT', flag: konoha.SYNFLAG_ExprTerm, },
		{name: '$type', flag: konoha.SYNFLAG_ExprTerm, ParseStmt: konoha.ParseStmt_Type, rule: '$type $expr', StmtTyCheck: konoha.StmtTyCheck_TypeDecl, ExprTyCheck: konoha.ExprTyCheck_Type, },
		{name: '()', flag: konoha.SYNFLAG_ExprPostfixOp2, ParseExpr: konoha.ParseExpr_Parenthesis, priority_op2: 16, ExprTyCheck: konoha.ExprTyCheck_FuncStyleCall, },
		{name: '[]', },
		{name: '{}', },
		{name: '$block', ParseStmt: konoha.ParseStmt_Block, ExprTyCheck: konoha.ExprTyCheck_Block, },
		{name: '$params', ParseStmt: konoha.ParseStmt_Params, TopStmtTyCheck: konoha.StmtTyCheck_ParamsDecl, ExprTyCheck: konoha.ExprTyCheck_MethodCall, },
		{name: '$toks', ParseStmt: konoha.ParseStmt_Toks, },
		{name: '.', ParseExpr: konoha.ParseExpr_DOT, priority_op2: 16, },
		{name: '/', flag: konoha.SYNFLAG_ExprOp, op2: 'opDIV', priority_op2: 32, },
		{name: '%', flag: konoha.SYNFLAG_ExprOp, op2: 'opMOD', priority_op2: 32, },
		{name: '*', flag: konoha.SYNFLAG_ExprOp, op2: 'opMUL', priority_op2: 32, },
		{name: '+', flag: konoha.SYNFLAG_ExprOp, op1: 'opPLUS', op2: 'opADD', priority_op2: 64, },
		{name: '-', flag: konoha.SYNFLAG_ExprOp, op1: 'opMINUS', op2: 'opSUB', priority_op2: 64, },
		{name: '<', flag: konoha.SYNFLAG_ExprOp, op2: 'opLT', priority_op2: 256, },
		{name: '<=', flag: konoha.SYNFLAG_ExprOp, op2: 'opLTE', priority_op2: 256, },
		{name: '>', flag: konoha.SYNFLAG_ExprOp, op2: 'opGT', priority_op2: 256, },
		{name: '>=', flag: konoha.SYNFLAG_ExprOp, op2: 'opGTE', priority_op2: 256, },
		{name: '==', flag: konoha.SYNFLAG_ExprOp, op2: 'opEQ', priority_op2: 512, },
		{name: '!=', flag: konoha.SYNFLAG_ExprOp, op2: 'opNEQ', priority_op2: 512, },
		{name: '&&', flag: konoha.SYNFLAG_ExprOp, priority_op2: 1024, ExprTyCheck: konoha.ExprTyCheck_AND, },
		{name: '||', flag: konoha.SYNFLAG_ExprOp, priority_op2: 2048, ExprTyCheck: konoha.ExprTyCheck_OR, },
		{name: '!', flag: konoha.SYNFLAG_ExprOp, op1: 'opNOT', },
		{name: '=', flag: konoha.SYMFLAG_ExprOp|konoha.SYNFLAG_ExprLeftJoinOp2, priority_op2: 4096, },
		{name: ',', ParseExpr: konoha.ParseExpr_COMMA, op2: '*', priority_op2: 8192, },
		{name: '$', ParseExpr: konoha.ParseExpr_DOLLAR, },
		{name: 'void', type: konoha.TY_void, rule: '$type [$USYMBOL \".\"] $SYMBOL $params [$block]', TopStmtTyCheck: konoha.StmtTyCheck_MethodDecl, },
		{name: 'boolean', type: konoha.TY_Boolean, },
		{name: 'int', type: konoha.TY_Int, },
		{name: 'true', flag: konoha.SYNFLAG_ExprTerm, ExprTyCheck: konoha.ExprTyCheck_true, },
		{name: 'false', flag: konoha.SYNFLAG_ExprTerm, ExprTyCheck: konoha.ExprTyCheck_false, },
		{name: 'if', rule: '\"if\" \"(\" $expr \")\" $block [\"else\" else: $block]', TopStmtTyCheck: konoha.StmtTyCheck_if, StmtTyCheck: konoha.StmtTyCheck_if, },

		{name: 'else', rule: '\"else\" $block', TopStmtTyCheck: konoha.StmtTyCheck_else, StmtTyCheck: konoha.StmtTyCheck_else, },
		{name: 'return', rule: '\"return\" [$expr]', flag: konoha.SYNFLAG_StmtBreakExec, StmtTyCheck: konoha.StmtTyCheck_return, },

		{name: 'new', ParseExpr: konoha.ParseExpr_new, },
		{name: 'class', rule: "\"class\" $USYMBOL [ \"extends\" $type ] $block", StmtTyCheck: konoha.StmtTyCheck_class, },

/* ---------------------------------------------------------------- */
/* Added by Yoan */
		{name: '=', ExprTyCheck: konoha.ExprTyCheck_true, TopStmtTyCheck: konoha.TopStmtTyCheck_dummy, StmtTyCheck: konoha.StmtTyCheck_dummy, },
/* ---------------------------------------------------------------- */

		{name: 'while', rule: "\"while\" \"(\" $expr \")\" $block", StmtTyCheck: konoha.StmtTyCheck_while , },
		{name: 'break', rule: "\"break\" [ $USYMBOL ]", StmtTyCheck: konoha.StmtTyCheck_break, },
		{name: 'continue', rule: "\"continue\" [ $USYMBOL ]", StmtTyCheck:  konoha.StmtTyCheck_continue, },
		{name: 'for', rule: "\"for\" \"(\" var: $block \";\" $expr \";\" each: $block \")\" $block", StmtTyCheck: konoha.StmtTyCheck_for, },

		{name: null}, ];
 	konoha.KonohaSpace_defineSyntax(_ctx, ks, SYNTAX);
 	syn = konoha.KonohaSpace_syntax(_ctx, ks, "void"/*IS THIS OK?*/, 0);
 	syn.ty = konoha.TY_void; // it's not cool, but necessary
 	syn = konoha.KonohaSpace_syntax(_ctx, ks, "$USYMBOL", 0);
 	syn.syntaxRuleNULL = new Array();
 	konoha.parseSyntaxRule(_ctx, "$USYMBOL \"=\" $expr", 0, syn.syntaxRuleNULL);
}

konoha.KonohaSpace_eval = function(_ctx, ks, script)
{
	_ctx.kmodsugar.h.setup(_ctx, _ctx.kmodsugar, 0);
	var tls = _ctx.ctxsugar.tokens;
	var pos = tls.length;
	konoha.KonohaSpace_tokenize(_ctx, ks, script, 0 /* uline */, tls);
//	konoha.DBG_P("################ tokenize ##################");
//	konoha.DBG_P(tls);
//	konoha.DBG_P("############################################");
	var bk = konoha.new_Block(_ctx, ks, null, tls, pos, tls.length, ';');
	console.log("################### ast ####################");
	//console.log(bk);
	//console.log(bk.blocks.data[0].h.kvproto["$expr"]);
	// console.log("=====bk.blocks.data[0].h.kvproto[$expr].cons.data[1]====");
	// console.log(bk.blocks.data[0].h.kvproto["$expr"].cons.data[1]);
	// console.log("=====bk.blocks.data[0].h.kvproto[$expr].cons.data[2]====");
 	// console.log(bk.blocks.data[0].h.kvproto["$expr"].cons.data[2]);

	console.log("############################################");
	tls = tls.slice(0, pos - 1);
	var result = konoha.Block_eval(_ctx, bk); //result is result of evaluating generated code
	konoha.result = result;
	console.log("################### eval ####################");
	console.log(result);
	console.log("############################################");
	return result;
}

konoha.MODSUGAR_eval = function(_ctx, script)
{
	return konoha.KonohaSpace_eval(_ctx, _ctx.kmodsugar.rootks, script);
}

// //for node
// konoha.KonohaSpace_loadstream = function(_ctx, ks)
// {
// 	//	var script = 'p("hello");'; // TODO load script
// 	var readline = require('readline'),
// 	rl = readline.createInterface(process.stdin, process.stdout),
// 	prefix = '>>> ';
// 	var opts = require("opts");
// 	opts.parse([
// 		{
// 			'short': 's',
// 			'long': 'script',
// 			'description': 'konoha script',
// 			'value': true,
// 			'required': false
// 		},
// 	]);
// 	var script = opts.get("script");
// 	if (script != null) {
// 		var _status = konoha.MODSUGAR_eval(_ctx, script);
// 	}
// 	else {
// 		rl.on('line', function(line) {
// 			switch(line.trim()) {
// 			case 'quit':
// 			case 'exit':
// 			case 'bye':
// 				process.exit(0);
// 				break;
// 			default:
// 				var script = line.trim();
// 				var _status = konoha.MODSUGAR_eval(_ctx, script);
// 				break;
// 			}
// 			rl.setPrompt(prefix, prefix.length);
// 			rl.prompt();
// 		}).on('close', function() {
// 			process.exit(0);
// 		});
// 		rl.setPrompt(prefix, prefix.length);
// 		rl.prompt();
// 	}
// }

//for DEBUG
konoha.KonohaSpace_loadstream = function(_ctx, ks, script)
{
 	konoha.DBG_P("##############script#########################");
	konoha.DBG_P(script);
 	konoha.DBG_P("#############################################");
	var _status = konoha.MODSUGAR_eval(_ctx, script);
}

konoha.KonohaSpace_loadscript = function(_ctx, ks, script)
{
	var _status = konoha.KonohaSpace_loadstream(_ctx, ks, script);
	return _status;
}

konoha.MODSUGAR_loadscript = function(_ctx, script)
{
	if (_ctx.ctxsugar == null) {
		_ctx.kmodsugar.h.setup(_ctx, _ctx.kmodsugar, 0);
	}
	var ns = new konoha.kKonohaSpace(_ctx.kmodsugar.rootks);
	var result = konoha.KonohaSpace_loadscript(_ctx, ns, script);
}

konoha.MODSUGAR_init = function(_ctx)
{
	var modsugar = new konoha.kmodsugar_t();
	modsugar.h = {};
	modsugar.h.name = 'sugar';
	modsugar.h.setup = function(_ctx, def, newctx) {
		if (!newctx && _ctx.ctxsugar == null) {
			var base = {};
			base.tokens = [];
			base.lvarlst = [];
			base.definedMethods = [];

			base.gma = new konoha.kGamma(null);
			base.singleBlock = new konoha.kBlock(_ctx);
//			base.singleBlock.blocks.data.push(null);
			_ctx.ctxsugar = base;
		}
	}
	modsugar.keywordList = new Array(32);
	modsugar.keywordMapNN = new Array(); //Map
	modsugar.packageList = new Array(8);
	modsugar.packageMapNO = new Array(); //Map

	modsugar.rootks = new konoha.kKonohaSpace(null);
	_ctx.kmodsugar = modsugar;
	modsugar.h.setup(_ctx, null/*FIX ME!!*/, 0);

	modsugar.UndefinedParseExpr = konoha.UndefinedParseExpr;
	modsugar.UndefinedStmtTyCheck = konoha.UndefinedStmtTyCheck;
	modsugar.UndefinedExprTyCheck = konoha.UndefinedExprTyCheck;
	modsugar.ParseExpr_Op = konoha.ParseExpr_Op;
	modsugar.ParseExpr_Term = konoha.ParseExpr_Term;

	konoha.defineDefaultSyntax(_ctx, modsugar.rootks);
	return modsugar;
}

konoha.keyword = function(_ctx, text, length, def) {
	return text;
}
