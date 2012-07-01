konoha.ExprTyCheck_Float = function(_ctx, stmt, expr, gma, reqty)
{
	var tk = expr.tk;
	var f = Number(tk.text.text);
	return konoha.Expr_setNConstValue(_ctx, expr, konoha.TY_Float, f);
}
