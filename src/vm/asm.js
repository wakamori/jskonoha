/* TODO */
/* kObject_getObjectNULL(O, KEY) have been converted to O[KEY]. */
/* expr.isUnbox */
/* _ctx.konoha_setModule */
/* distinguish beteween bool and number */
/* KW_Block */

konoha.MODCODE_init = function (_ctx)
{
	_ctx.modcode = this;
	this.name = 'minivm';
	this.output = ''; // source code to evaluated
	this.indent = 0; // depth of indent
	this.tab = '\t';

	this.setup = function(_ctx)
	{
		/* kmodcode_setup */
		var base = {};
		base.insts = [];
		base.constPools = [];
		_ctx.ctxcode = base;
		//_ctx.modlocal[konoha.MOD_code] = base;
	}

	this.reftrace = function()
	{
		/* do nothing */
	}

	this.free = function()
	{
		/* do nothing */
	}
	
	//_ctx.Konoha_setModule(konoha.MOD_code, this);

	this.setup(_ctx);
	_ctx.lib2.KMethod_genCode = function(_ctx, mtd, bk)
	{
		/* mtd: kMethod, bk: kBlock */

		/* prepare code generate */
		console.log('START CODE GENERATION..');
		if (_ctx.ctxcode == null) {
			_ctx.modcode.setup(_ctx);
		}
		//if (_ctx.modlocal[konoha.MOD_code] == null) {
		//	_ctx.modshare[konoha.MOD_code].setup(_ctx);
		//}
		
		/* start code generation */

		konoha.BLOCK_asm(_ctx, bk, 0);
	}
}

konoha.MODCODE_init.prototype.ASM = function(str)
{
	console.log("str=\"", str, "\"");
	this.output += str;
}

konoha.MODCODE_init.prototype.ASM_NEWLINE = function() {
	this.output += '\n';
	for (var i = 0; i < this.indent; i++) {
		this.output += this.tab;
	}
}

konoha.MODCODE_init.prototype.ASM_NMOV = function(a, b, ty)
{
	konoha.MODCODE_init.prototype.ASM('var sfp' + a + ' = sfp' + b + ';');
	konoha.MODCODE_init.prototype.ASM_NEWLINE();
}

konoha.MODCODE_init.prototype.NMOV_asm = function(_ctx, a, ty, b)
{
	konoha.MODCODE_init.prototype.ASM_NMOV(a, b, ty);
}

konoha.MODCODE_init.prototype.ASM_NSET = function(a, data)
{
	konoha.MODCODE_init.prototype.ASM('var sfp' + a + ' = ' + data + ';');
	konoha.MODCODE_init.prototype.ASM_NEWLINE();
}

konoha.MODCODE_init.prototype.ASM_OSET = function(a, data)
{
	console.log('TODO asm_oset');
}

konoha.MODCODE_init.prototype.ASM_CALL = function(_ctx, thisidx, espidx, argc, mtd) {
//	var rtype = konoha.kMethod_rtype(mtd); // TODO
//	if (rtype != konoha.CLASS_Tvoid) {
//		konoha.MODCODE_init.prototype.ASM('var sfp' + (thisidx+konoha.K_RTNIDX) + ' = ');
//	}
//	var mtdName = T_fn(mtd.mn); // TODO get method name
//	konoha.MODCODE_init.prototype.ASM(mtdName + '(');
	for (var i = 0; i < argc; i++) {
		konoha.MODCODE_init.prototype.ASM('sfp' + (thisidx+1+i));
		if (i != argc-1) {
			konoha.MODCODE_init.prototype.ASM(', ');
		}
	}
	konoha.MODCODE_init.prototype.ASM(');');
}

konoha.MODCODE_init.prototype.CALL_asm = function(_ctx, a, expr, shift, espidx)
{
	var mtd = expr.cons.data[0]; // TODO unuse methods field, is it OK?
//	console.log(expr.cons.data[0]);
	var s = 2;//konoha.kMethod_isStatic(mtd) ? 2 : 1,
	var thisidx = espidx + konoha.K_CALLDELTA;
	console.log("-----expr.cons.data.length----------");
	console.log(expr.cons.data.length);
	console.log("-----expr.cons.data.length----------");
	for (var i = s; i < expr.cons.data.length; i++) {
		var exprN = expr.cons.data[i];
		konoha.MODCODE_init.prototype.EXPR_asm(_ctx, thisidx + i - 1, exprN, shift, thisidx + i - 1);
	}
	var argc = expr.cons.lenght - 2;
	/* don't care wheather method is static or not */
	konoha.MODCODE_init.prototype.ASM_CALL(_ctx, thisidx, espidx, argc, mtd);
}

konoha.MODCODE_init.prototype.EXPR_asm = function(_ctx, a, expr, shift, espidx)
{
	/* a: number, expr: kExpr, shift: number, espidx: number */
	console.log("EXPR_asm start");
	console.log(expr.build);
	switch (expr.build) {
	case konoha.TEXPR_CONST : {
		var v = expr.data;
		if (expr.isUnbox()) {
			konoha.MODCODE_init.prototype.ASM_NSET(a, v.data); // TODO data
		} else {
			konoha.MODCODE_init.prototype.ASM_OSET(a, v);
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
		konoha.MODCODE_init.prototype.ASM_NSET(a, expr.data); // TODO data
		break;
	}
	case konoha.TEXPR_LOCAL : {
		konoha.MODCODE_init.prototype.NMOV_asm(_ctx, a, expr.ty, expr.index);
		break;
	}
	case konoha.TEXPR_BLOCK : {
		konoha.MODCODE_init.prototype.BLOCK_asm(_ctx, expr.block, espidx);
		konoha.MODCODE_init.prototype.NMOV_asm(_ctx, a, expr.ty, espidx);
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
		konoha.MODCODE_init.prototype.CALL_asm(_ctx, a, expr, shift, espidx);
		if (a != espidx) {
			konoha.MODCODE_init.prototype.NMOV_asm(_ctx, a, expr.ty, espidx);
		}
		break;
	}
	case konoha.TEXPR_AND : {
		konoha.MODCODE_init.prototype.AND_asm(_ctx, a, expr.ty, espidx);
		break;
	}
	case konoha.TEXPR_OR : {
		konoha.MODCODE_init.prototype.OR_asm(_ctx, a, expr.ty, espidx);
		break;
	}
	case konoha.TEXPR_LET : {
		console.log('TODO let');
		break;
	}
	case konoha.TEXPR_STACKTOP : {
		konoha.MODCODE_init.prototype.NMOV_asm(_ctx, a, expr.ty, expr.index + shift);
		break;
	}
	default:
		console.log('unknown expr=' + expr.build);
//TODO rm!!
		konoha.MODCODE_init.prototype.CALL_asm(_ctx, a, expr, shift, espidx);
		if (a != espidx) {
			konoha.MODCODE_init.prototype.NMOV_asm(_ctx, a, expr.ty, espidx);
		}
	}
}

konoha.MODCODE_init.prototype.ExprStmt_asm = function(_ctx, stmt, shift, espidx)
{
//var expr = stmt[1];
	var expr = stmt.h.kvproto.data["$expr"];
//	if (expr.isExpr()) {
	konoha.MODCODE_init.prototype.EXPR_asm(_ctx, espidx, expr, shift, espidx);
//	}
}

konoha.MODCODE_init.prototype.BlockStmt_asm = function(_ctx, stmt, shift, espidx)
{
	konoha.BLOCK_asm(_ctx, kStmt_block(stmt, KW_Block, konoha.K_NULLBLOCK));
}

konoha.MODCODE_init.prototype.IfStmt_asm = function(_ctx, stmt, shift, espidx)
{
	var lbELSE = new_BasicBlockLABEL(_ctx);
	var lbEND  = new_BasicBlockLABEL(_ctx);
	/* if */
	lbELSE = EXPR_asmJMPIF(_ctx, espidx, kStmt_expr(stmt, 1, NULL), 0/*FALSE*/, lbELSE, espidx);
	/* then */
	BLOCK_asm(_ctx, kStmt_block(stmt, KW_Block, K_NULLBLOCK));
	konoha.MODCODE_init.prototype.ASM_JMP(_ctx, lbEND);
	/* else */
	konoha.MODCODE_init.prototype.ASM_LABEL(_ctx, lbELSE);
	BLOCK_asm(_ctx, kStmt_block(stmt, KW_else, K_NULLBLOCK));
	/* endif */
	konoha.MODCODE_init.prototype.ASM_LABEL(_ctx, lbEND);
}

konoha.MODCODE_init.prototype.ReturnStmt_asm = function(_ctx, stmt, shift, espidx)
{
	var expr = konoha.KObject_getObjectNULL(_ctx, stmt, 0, null);
	console.log("expr = ", expr.build);
//	expr.build = konoha.TEXPR_CALL;
	if(expr != null && konoha.IS_Expr(_ctx, expr) && expr.ty != konoha.TY_void) {
		konoha.MODCODE_init.prototype.EXPR_asm(_ctx, konoha.K_RTNIDX, expr, espidx);
	}
//	konoha.MODCODE_init.prototype.ASM_JMP(_ctx, ctxcode.lbEND);  // RET
}

konoha.MODCODE_init.prototype.LoopStmt_asm = function(_ctx, stmt, shift, espidx)
{
	konoha.MODCODE_init.prototype.ASM('while (');
	konoha.MODCODE_init.prototype.EXPR_asm(_ctx, espidx, stmt[1] /* kstmt_expr(stmt, 1, NULL) */, shift, espidx);
	konoha.MODCODE_init.prototype.ASM(') {;');
	this.indent++;
	konoha.MODCODE_init.prototype.ASM_NEWLINE();
	BLOCK_asm(_ctx, kStmt_block(stmt, konoha.KW_Block), shift);
	konoha.MODCODE_init.prototype.ASM('}');
	konoha.MODCODE_init.prototype.ASM_NEWLINE();
}

konoha.MODCODE_init.prototype.BLOCK_asm = function(_ctx, bk, shift)
{
//	console.log(bk);
	/* bk: kBlock, shift: int */
	var espidx = (bk.esp.build == konoha.TEXPR_STACKTOP) ? shift + bk.esp.index : bk.esp.index;
	//	var espidx = bk.esp.index;
	console.log("shift = "+ shift + ", espidx = " + espidx + ", build = " + bk.esp.build);
	/* TODO Is blocks' type Array? */
//	console.log(bk.blocks.data);
//	console.log(bk.blocks.data[0]);
	console.log("------bk.blocks.data.length----");
	console.log(bk.blocks.data.length);
	console.log("------bk.blocks.data.length----");
	for (var i = 0; i < bk.blocks.data.length; i++) {
//		console.log("hoge");
		var stmt = bk.blocks.data[i];
//		console.log(stmt.build);
//		console.log(stmt.syn);
		if (stmt.syn == null) continue;
//		console.log(_ctx.ctxsugar[1]);
//		console.log(_ctx.ctxsugar[2]);
//		console.log(_ctx.ctxsugar[3]);
//		_ctx.ctxsugar[konoha.MOD_code].uline = stmt.uline;
		console.log("stmt.build", stmt.build);
//		console.log("hoge");
		switch(stmt.build) {
			case konoha.TSTMT_ERR:
				konoha.MODCODE_init.prototype.ErrStmt_asm(_ctx, stmt, shift, espidx); return;
			case konoha.TSTMT_EXPR:
				konoha.MODCODE_init.prototype.ExprStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_BLOCK:
				konoha.MODCODE_init.prototype.BlockStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_RETURN:
				konoha.MODCODE_init.prototype.ReturnStmt_asm(_ctx, stmt, shift, espidx); return;
			case konoha.TSTMT_IF:
				konoha.MODCODE_init.prototype.IfStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_LOOP:
				konoha.MODCODE_init.prototype.LoopStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_JUMP:
				konoha.MODCODE_init.prototype.JumpStmt_asm(_ctx, stmt, shift, espidx); break;
			default:
				konoha.MODCODE_init.prototype.UndefinedStmt_asm(_ctx, stmt, shift, espidx); break;
		}
	}
}

