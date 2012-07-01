/* TODO */
/* kObject_getObjectNULL(O, KEY) have been converted to O[KEY]. */
/* expr.isUnbox */
/* _ctx.konoha_setModule */
/* distinguish beteween bool and number */
/* KW_Block */

konoha.kBasicBlock = function() {
	this.h = new konoha.kObjectHeader();
	this.id = null;
	this.incoming = null;
	this.op = null;
//	union {
	this.nextNC = null;
//	struct _kBasicBlock *WnextNC;
//	};
//	union {
	this.jumpNC = null;
//		struct _kBasicBlock *WjumpNC;
//	};
	this.code = null;
	this.opjmp = null;
};

konoha.MODCODE_init = function(_ctx)
{
	konoha.modcode = new (function() {
		this.output = "";
		this.indent_i = 0;
		this.indent_s = "";
		this.indent_stack = new Array();
		this.tab = '\t';
		this.ASM = function(str) {
			this.output += this.indent_s + str;
		}
		this.indentInc = function() {
			this.indent_i++;
			this.indent_s += "\t";
		}
		this.indentDec = function() {
			this.indent_i--;
//			this.indent_s = this.indent_s.substr(0, -1);
			var tmp = "";
			for (var i = 0; i < this.indent_i; i++) {
				tmp += "\t";
			}
			this.indent_s = tmp;
		}
		this.indentStash = function() {
			this.indent_stack.push(this.indent_s);
			this.indent_s = "";
		}
		this.indentPop = function() {
			this.indent_s = this.indent_stack.pop();
		}
		this.ASM_NEWLINE = function() {
			this.output += '\n';
		}
	})();
}

konoha.new_BasicBlockLABEL = function(_ctx)
{
	if (this.insts == null) {
		this.insts = new Array();
	}
	var bb = new konoha.kBasicBlock();
	bb.id = this.insts.length;
	this.insts.push(bb);
	return bb;
}

konoha.ASM_NMOV = function(a, b, ty)
{
	konoha.modcode.ASM('var sfp' + a + ' = sfp' + b + ';');
	konoha.modcode.ASM_NEWLINE();
}

konoha.NMOV_asm = function(_ctx, a, ty, b)
{
	konoha.ASM_NMOV(a, b, ty);
}

konoha.ASM_NSET = function(a, data)
{
	konoha.modcode.ASM('var sfp' + a + ' = ' + data + ';');
	konoha.modcode.ASM_NEWLINE();
}

konoha.ASM_OSET = function(a, data)
{
	console.log('TODO asm_oset');
}

konoha.ASM_CALL = function(_ctx, thisidx, espidx, argc, mtd) {
//	var rtype = konoha.kMethod_rtype(mtd); // TODO
//	if (rtype != konoha.CLASS_Tvoid) {
	konoha.modcode.ASM('var sfp' + (thisidx+konoha.K_RTNIDX) + ' = ');
//	}
	var mtdName = mtd.mtdname;
	konoha.modcode.ASM(mtdName + '(_ctx, ');
	konoha.modcode.indentStash();
	for (var i = 0; i < argc; i++) {
		konoha.modcode.ASM('sfp' + (thisidx+i));
		if (i != argc-1) {
			konoha.modcode.ASM(', ');
		}
	}
	konoha.modcode.ASM(');');
	konoha.modcode.ASM_NEWLINE();
	konoha.modcode.indentPop();
}

konoha.CALL_asm = function(_ctx, a, expr, shift, espidx)
{
	var mtd = expr.cons.data[0]; // TODO unuse methods field, is it OK?
//	console.log(expr.cons.data[0]);
	var s = konoha.kMethod_isStatic(mtd) ? 2 : 1;
	var thisidx = espidx + konoha.K_CALLDELTA;
	for (var i = s; i < expr.cons.data.length; i++) {
		var exprN = expr.cons.data[i];
		konoha.EXPR_asm(_ctx, thisidx + i - s, exprN, shift, thisidx + i - s);
	}
	var argc = expr.cons.data.length - s;
	/* don't care wheather method is static or not */
	konoha.ASM_CALL(_ctx, thisidx, espidx, argc, mtd);
}

konoha.EXPR_asm = function(_ctx, a, expr, shift, espidx)
{
	/* a: number, expr: kExpr, shift: number, espidx: number */
	switch (expr.build) {
	case konoha.TEXPR_CONST : {
		var v = expr.tk.text.text;
		if (expr.isUnbox()) {
			konoha.ASM_NSET(a, v); // TODO data
		} else {
			konoha.ASM_OSET(a, v);
		}
		break;
	}
	case konoha.TEXPR_NEW : {
		console.log('TODO new');
		break;
	}
	case konoha.TEXPR_NULL : {
		console.log('TODO null');
		break;
	}
	case konoha.TEXPR_NCONST : {
		konoha.ASM_NSET(a, expr.tk.text.text);
		break;
	}
	case konoha.TEXPR_LOCAL : {
		konoha.NMOV_asm(_ctx, a, expr.ty, expr.index);
		break;
	}
	case konoha.TEXPR_BLOCK : {
		konoha.BLOCK_asm(_ctx, expr.block, shift, espidx);
		konoha.NMOV_asm(_ctx, a, expr.ty, espidx);
		break;
	}
	case konoha.TEXPR_FIELD : {
		console.log('TODO field');
		break;
	}
	case konoha.TEXPR_BOX : {
		console.log('TODO box');
		break;
	}
	case konoha.TEXPR_UNBOX : {
		console.log('TODO unbox');
		break;
	}
	case konoha.TEXPR_CALL : {
		konoha.CALL_asm(_ctx, a, expr, shift, espidx);
		if (a != espidx) {
			konoha.modcode.ASM_NEWLINE();
			konoha.NMOV_asm(_ctx, a, expr.ty, espidx);
		}
		break;
	}
	case konoha.TEXPR_AND : {
		konoha.AND_asm(_ctx, a, expr.ty, espidx);
		break;
	}
	case konoha.TEXPR_OR : {
		konoha.OR_asm(_ctx, a, expr.ty, espidx);
		break;
	}
	case konoha.TEXPR_LET : {
		console.log('TODO let');
		break;
	}
	case konoha.TEXPR_STACKTOP : {
		konoha.NMOV_asm(_ctx, a, expr.ty, expr.index + shift);
		break;
	}
	default:
		console.log('unknown expr=' + expr.build);
		if (a != espidx) {
			konoha.NMOV_asm(_ctx, a, expr.ty, espidx);
		}
	}
}

konoha.ASM_MTDDEF = function(_ctx, mn, param_name, block, shift, espidx)
{
	konoha.modcode.ASM("konoha.ct.Script." + mn + " = function(_ctx, sfp1)");
	konoha.modcode.ASM_NEWLINE();
	konoha.modcode.ASM("{");
	konoha.modcode.indentInc();
	konoha.modcode.ASM_NEWLINE();
	konoha.BLOCK_asm(_ctx, block, shift, espidx + 1/*argsize*/ + 1);
	konoha.modcode.indentDec();
	konoha.modcode.ASM("}");
	konoha.modcode.ASM_NEWLINE();
}

konoha.MethodDefStmt_asm = function(_ctx, stmt, shift, espidx)
{
	var mn = (konoha.KObject_getObjectNULL(_ctx, stmt, konoha.kw.Symbol, null)).text.text;
	var params = (konoha.KObject_getObjectNULL(_ctx, stmt, konoha.kw.Params, null)).blocks.data[0];
	var param_name = (konoha.KObject_getObjectNULL(_ctx, params, konoha.kw.Expr, null)).tk.text.text;
	var block = konoha.Stmt_block(_ctx, stmt, konoha.kw.Block);

	var newgma = new (function() {
		this.mtd = konoha.ct.Script[mn];
//		this.ks = ks;
//		this.this_cid = mtd.cid;
		this.f = new Array();
		this.l = new Array();
	})();
	konoha.Gamma_initParam(_ctx, newgma, params); //TODO!! multiple arguments
	var gma = _ctx.ctxsugar.gma;
	var oldbuf_ = konoha.Gamma_push(_ctx, gma, newgma);
	konoha.Block_tyCheckAll(_ctx, block, gma);
	konoha.Gamma_shiftBlockIndex(_ctx, newgma);
	konoha.Gamma_pop(_ctx, gma, oldbuf_, newgma);
	konoha.ASM_MTDDEF(_ctx, mn, param_name, block, shift, espidx);
}

konoha.ExprStmt_asm = function(_ctx, stmt, shift, espidx)
{
//var expr = stmt[1];
	var expr = konoha.KObject_getObjectNULL(_ctx, stmt, "$expr", null);
//	if (expr.isExpr()) {
	konoha.EXPR_asm(_ctx, espidx, expr, shift, espidx);
//	}
}

konoha.BlockStmt_asm = function(_ctx, stmt, shift, espidx)
{
	konoha.BLOCK_asm(_ctx, kStmt_block(stmt, KW_Block, konoha.K_NULLBLOCK));
}

// konoha.ASM_JMPF = (_ctx, flocal, lbJUMP) = function() {
// 	var bb = this.WcurbbNC;
// 	var lbNEXT = konoha.new_BasicBlockLABEL(_ctx);
// //	var op = {TADDR, OPCODE_JMPF, ASMLINE, NULL, NC_(flocal)};
// 	if(BUILD_asmJMPF(_ctx, &op)) {
// 		bb->jumpNC = lbNEXT;
// 		bb->nextNC = lbJUMP;
// 	}
// 	else {
// 		bb->jumpNC = lbJUMP;
// 		bb->nextNC = lbNEXT;
// 	}
// 	lbNEXT->incoming += 1;
// 	ctxcode->WcurbbNC = lbNEXT;
// 	W(kBasicBlock, lbJUMP);
// 	WlbJUMP->incoming += 1;
// 	WASSERT(lbJUMP);
// 	return lbJUMP;
// }

konoha.IfStmt_asm = function(_ctx, stmt, shift, espidx)
{
	konoha.EXPR_asm(_ctx, espidx, konoha.KObject_getObjectNULL(_ctx, stmt, konoha.kw.Expr, null), shift, espidx);
	konoha.modcode.ASM_NEWLINE();
	konoha.modcode.ASM("if (sfp" + espidx + ") {");
	konoha.modcode.indentInc();
	konoha.modcode.ASM_NEWLINE();
	konoha.BLOCK_asm(_ctx, konoha.Stmt_block(_ctx, stmt, konoha.kw.Block), shift, espidx + 1);
	konoha.modcode.indentDec();
	konoha.modcode.ASM_NEWLINE();
	konoha.modcode.ASM("}");
	konoha.modcode.ASM_NEWLINE();
	var else_block = konoha.Stmt_block(_ctx, stmt, konoha.kw._else)
	if (else_block != null) {
		konoha.modcode.ASM("else {");
		konoha.modcode.indentInc();
		konoha.modcode.ASM_NEWLINE();
		konoha.BLOCK_asm(_ctx, else_block, shift, espidx + 1);
		konoha.modcode.indentDec();
		konoha.modcode.ASM_NEWLINE();
		konoha.modcode.ASM("}");
		konoha.modcode.ASM_NEWLINE();
	}
// 	var lbELSE = konoha.new_BasicBlockLABEL(_ctx);
// 	var lbEND  = konoha.new_BasicBlockLABEL(_ctx);
// 	/* if */
// 	lbELSE = EXPR_asmJMPIF(_ctx, espidx, konoha.Stmt_expr(_ctx, stmt, 1, null), 0/*FALSE*/, lbELSE, espidx);
// 	/* then */
// 	BLOCK_asm(_ctx, konoha.Stmt_block(_ctx, stmt, KW_Block, null));
// 	konoha.ASM_JMP(_ctx, lbEND);
// 	/* else */
// 	konoha.ASM_LABEL(_ctx, lbELSE);
// 	BLOCK_asm(_ctx, kStmt_block(stmt, KW_else, K_NULLBLOCK));
// 	/* endif */
// 	konoha.ASM_LABEL(_ctx, lbEND);
}


konoha.ReturnStmt_asm = function(_ctx, stmt, shift, espidx)
{
	var expr = konoha.KObject_getObjectNULL(_ctx, stmt, konoha.kw.Expr, null);
//	expr.build = konoha.TEXPR_CALL;
	if(expr != null && konoha.IS_Expr(_ctx, expr) && expr.ty != konoha.TY_void) {
		konoha.EXPR_asm(_ctx, espidx, expr, shift, espidx+1);
		konoha.modcode.ASM("return sfp" + espidx + ";");
	}
	konoha.modcode.ASM_NEWLINE();
//	konoha.ASM_JMP(_ctx, ctxcode.lbEND);  // RET
}

konoha.LoopStmt_asm = function(_ctx, stmt, shift, espidx)
{
	konoha.EXPR_asm(_ctx, espidx, konoha.KObject_getObjectNULL(_ctx, stmt, konoha.kw.Expr, null), shift, espidx);
	konoha.modcode.ASM_NEWLINE();
	konoha.modcode.ASM('while (' + espidx + ") {");
	konoha.modcode.indentInc();
	konoha.modcode.ASM_NEWLINE();
	konoha.BLOCK_asm(_ctx, konoha.Stmt_block(_ctx, stmt, konoha.kw.Block), shift, espidx + 1);
	konoha.modcode.indentDec();
	konoha.modcode.ASM_NEWLINE();
	konoha.modcode.ASM('}');
	konoha.modcode.ASM_NEWLINE();
}

konoha.UndefinedStmt_asm = function(_ctx, stmt, shift, espidx)
{
	//throw('undefined');
}

konoha.BLOCK_asm = function(_ctx, bk, shift, espidx)
{
	/* bk: kBlock, shift: int */
//TODO!!	var espidx = (bk.esp.build == konoha.TEXPR_STACKTOP) ? shift + bk.esp.index : bk.esp.index;
	console.log("knoha.BLOCK_asm");
	console.log("shift = " + shift + ", espidx = " + espidx + ", build = " + bk.esp.build);
	/* TODO Is blocks' type Array? */
	for (var i = 0; i < bk.blocks.data.length; i++) {
		var stmt = bk.blocks.data[i];
		if (stmt.syn == null) continue;
//		_ctx.ctxsugar[konoha.MOD_code].uline = stmt.uline;
		console.log("stmt.build", stmt.build);
		switch(stmt.build) {
			case konoha.TSTMT_ERR:
				konoha.ErrStmt_asm(_ctx, stmt, shift, espidx); return;
			case konoha.TSTMT_EXPR:
				konoha.ExprStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_BLOCK:
				konoha.BlockStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_RETURN:
				konoha.ReturnStmt_asm(_ctx, stmt, shift, espidx); return;
			case konoha.TSTMT_IF:
				konoha.IfStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_LOOP:
				konoha.LoopStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_JUMP:
				konoha.JumpStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_MTDDEF:
				konoha.MethodDefStmt_asm(_ctx, stmt, shift, espidx); break;
			default:
				konoha.UndefinedStmt_asm(_ctx, stmt, shift, espidx); break;
		}
	}
}

