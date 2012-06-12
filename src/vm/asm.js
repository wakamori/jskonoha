/* TODO */
/* kObject_getObjectNULL(O, KEY) have been converted to O[KEY]. */
/* expr.isUnbox */
/* _ctx.konoha_setModule */
/* distinguish beteween bool and number */
/* KW_Block */

MODCODE_init = function (_ctx)
{
	_ctx.modshare[konoha.MOD_code] = this;
	this.name = 'minivm';
	this.output = ''; // source code to evaluated
	this.indent = 0; // depth of indent
	this.tab = '\t';

	this.setup = function(_ctx)
	{
		/* kmodcode_setup */
		/* create modlocal */
		var base = {};
		base.insts = [];
		base.constPools = [];
		_ctx.modlocal[konoha.MOD_code] = base;
	}

	this.reftrace = function()
	{
		/* do nothing */
	}

	this.free = function()
	{
		/* do nothing */
	}
	
	_ctx.Konoha_setModule(konoha.MOD_code, this);
	this.setup(_ctx);
	_ctx.lib2.KMethod_genCode = function(_ctx, mtd, bk)
	{
		/* mtd: kMethod, bk: kBlock */

		/* prepare code generate */
		console.log('START CODE GENERATION..');
		if (_ctx.modlocal[konoha.MOD_code] == null) {
			_ctx.modshare[konoha.MOD_code].setup(_ctx);
		}
		
		/* start code generation */
		BLOCK_asm(_ctx, bk, 0);
	}
}

MODCODE_init.prototype.ASM = function(str)
{
	this.output += str;
}

MODCODE_init.prototype.ASM_NEWLINE = function() {
	this.output += '\n';
	for (var i = 0; i < this.indent; i++) {
		this.output += this.tab;
	}
}

MODCODE_init.prototype.ASM_NMOV = function(a, b, ty)
{
	ASM('var sfp' + a + ' = sfp' + b + ';');
	ASM_NEWLINE();
}

MODCODE_init.prototype.NMOV_asm = function(_ctx, a, ty, index)
{
	ASM_NMOV(a, b, ty);
}

MODCODE_init.prototype.ASM_NSET = function(a, data)
{
	ASM('var sfp' + a + ' = ' + v.data + ';');
	ASM_NEWLINE();
}

MODCODE_init.prototype.ASM_OSET = function(a, data)
{
	console.log('TODO asm_oset');
}

MODCODE_init.prototype.ASM_CALL = function(_ctx, thisidx, espidx, argc, mtd) {
	var rtype = kMethod_rtype(mtd); // TODO
	if (rtype != konoha.CLASS_Tvoid) {
		ASM('var sfp' + (thisidx+konoha.K_RTNIDX) + ' = ');
	}
	var mtdName = T_fn(mtd.mn); // TODO get method name
	ASM(mtdName + '(');
	for (var i = 0; i < argc; i++) {
		ASM('sfp' + (thisidx+1+i));
		if (i != argc-1) {
			ASM(', ');
		}
	}
	ASM(');');
}

MODCODE_init.prototype.CALL_asm = function(_ctx, a, expr, shift, espidx)
{
	var mtd = expr.cons[0]; // TODO unuse methods field, is it OK?
	var s = mtd.isStatic() ? 2 : 1, thisidx = espidx + K_CALLDELTA;
	for (var i = s; i < expr.cons.length; i++) {
		var exprN = expr.cons[i];
		EXPR_asm(_ctx, thisidx + i - 1, exprN, shift, thisidx + i - 1);
	}
	var argc = expr.cons.lenght - 2;
	/* don't care wheather method is static or not */
	ASM_CALL(_ctx, thisidx, espidx, argc, mtd);
}

MODCODE_init.prototype.EXPR_asm = function(_ctx, a, expr, shift, espidx)
{
	/* a: number, expr: kExpr, shift: number, espidx: number */
	switch (expr.build) {
	case konoha.TEXPR_CONST : {
		var v = expr.data;
		if (expr.isUnbox()) {
			ASM_NSET(a, v.data); // TODO data
		} else {
			ASM_OSET(a, v);
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
		ASM_NSET(a, expr.data); // TODO data
		break;
	}
	case konoha.TEXPR_LOCAL : {
		NMOV_asm(_ctx, a, expr.ty, expr.index);
		break;
	}
	case konoha.TEXPR_BLOCK : {
		BLOCK_asm(_ctx, expr.block, espidx);
		NMOV_asm(_ctx, a, expr.ty, espidx);
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
		CALL_asm(_ctx, a, expr, shift, espidx);
		if (a != espidx) {
			NMOV_asm(_ctx, a, expr.ty, espidx);
		}
		break;
	}
	case konoha.TEXPR_AND : {
		AND_asm(_ctx, a, expr.ty, espidx);
		break;
	}
	case konoha.TEXPR_OR : {
		OR_asm(_ctx, a, expr.ty, espidx);
		break;
	}
	case konoha.TEXPR_LET : {
		console.log('TODO let');
		break;
	}
	case konoha.TEXPR_STACKTOP : {
		NMOV_asm(_ctx, a, expr.ty, expr.index + shift);
		break;
	}
	default:
		console.log('unknown expr=' + expr.build);
	}
}

MODCODE_init.prototype.ExprStmt_asm = function(_ctx, stmt, shift, espidx)
{
	var expr = stmt[1];
	if (expr.isExpr()) {
		EXPR_asm(_ctx, espidx, expr, shift, espidx);
	}
}

MODCODE_init.prototype.LoopStmt_asm = function(_ctx, stmt, shift, espidx)
{
	ASM('while (');
	EXPR_asm(_ctx, espidx, stmt[1] /* kstmt_expr(stmt, 1, NULL) */, shift, espidx);
	ASM(') {;');
	this.indent++;
	ASM_NEWLINE();
	BLOCK_asm(_ctx, kStmt_block(stmt, konoha.KW_Block), shift);
	ASM('}');
	ASM_NEWLINE();
}

MODCODE_init.prototype.BLOCK_asm = function(_ctx, bk, shift)
{
	/* bk: kBlock, shift: int */
	var espidx = (bk.esp.build == konoha.TEXPR_STACKTOP) ? shift + bk.esp.index : bk.esp.index;
	console.log("shift = "+ shift + ", espidx = " + espidx + ", build = " + bk.esp.build);
	/* TODO Is blocks' type Array? */
	for (var i = 0; i < bk.blocks.length; i++) {
		var stmt = bk.blocks.stmts[i];
		if (stmt.syn == NULL) continue;
		_ctx.modlocal[konoha.MOD_code].uline = stmt.uline;
		switch(stmt.build) {
			case konoha.TSTMT_ERR:
				ErrStmt_asm(_ctx, stmt, shift, espidx); return;
			case konoha.TSTMT_EXPR:
				ExprStmt_asm(_ctx, stmt, shift, espidx); break;
			case konoha.TSTMT_BLOCK:
				BlockStmt_asm(_ctx, stmt, shift, espidx); break;
			case TSTMT_RETURN:
				ReturnStmt_asm(_ctx, stmt, shift, espidx); return;
			case TSTMT_IF:
				IfStmt_asm(_ctx, stmt, shift, espidx); break;
			case TSTMT_LOOP:
				LoopStmt_asm(_ctx, stmt, shift, espidx); break;
			case TSTMT_JUMP:
				JumpStmt_asm(_ctx, stmt, shift, espidx); break;
			default:
				UndefinedStmt_asm(_ctx, stmt, shift, espidx); break;
		}
	}
}

