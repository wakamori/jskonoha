konoha.Object.toString = function(_ctx){
	return this.data;
}

konoha.Int.opMINUS = function(_ctx, i){
	return this.data - i.data;
}

konoha.Float.opMINUS = function(_ctx, f){
	return this.data  -f.data;
}

konoha.Int.opADD = function(_ctx, i) {
	return this.data + i.data;
}

konoha.Float.opADD = function(_ctx, i) {
	return this.data + i.data;
}

konoha.Int.opSUB = function(_ctx, i) {
	return this.data - i.data;
}

konoha.Float.opSUB = function(_ctx, i) {
	return this.data - i.data;
}

konoha.Int.opMUL = function(_ctx, i) {
	return this.data * i.data;
}

konoha.Float.opMUL = function(_ctx, i) {
	return this.data * i.data;
}

konoha.Int.opDIV = function(_ctx, i) {
	return this.data / i.data;
}

konoha.Float.opDIV = function(_ctx, i) {
	return this.data / i.data;
}

konoha.Int.opMOD = function(_ctx, i) {
	return this.data % i.data;
}

konoha.Float.opMOD = function(_ctx, i) {
	return this.data % i.data;
}

konoha.Int.opEQ = function(_ctx, i) {
	return (this.data == i.data);
}

konoha.Float.opEQ = function(_ctx, i) {
	return (this.data == i.data);
}

konoha.String.opEQ = function(_ctx, s) {
	return (this.data == s.data);
}

konoha.Int.opNEQ = function(_ctx, i) {
	return (this.data != i.data);
}

konoha.Float.opNEQ = function(_ctx, i) {
	return (this.data != i.data);
}

konoha.String.opNEQ = function(_ctx, s) {
	return (this.data != s.data);
}

konoha.Int.opLT = function(_ctx, i) {
	return (this.data < i.data);
}

konoha.Float.opLT = function(_ctx, i) {
	return (this.data < i.data);
}

konoha.Int.opLTE = function(_ctx, i) {
	return (this.data =< i.data);
}

konoha.Float.opLTE = function(_ctx, i) {
	return (this.data =< i.data);
}

konoha.Int.opGT = function(_ctx, i) {
	return (this.data > i.data);
}

konoha.Float.opGT = function(_ctx, i) {
	return (this.data > i.data);
}

konoha.Int.opGTE = function(_ctx, i) {
	return (this.data => i.data);
}

konoha.Float.opGTE = function(_ctx, i) {
	return (this.data => i.data);
}

konoha.String.toInt = function(_ctx) {
	return parseInt(this.data);
}

konoha.String.toFloat = function(_ctx) {
	return parseFloat(this.data);
}

konoha.String.opADD = function(_ctx, s) {
	return (this.data + s.data);
}

konoha.Boolean.opNOT = function(_ctx) {
	return !this.data;
}

konoha.String.opHAS = function(_ctx, s) {
	if(this.data == s.data) {
		return true;
	}else{
		return false;
	}
}
konoha.String.trim = function(_ctx) {
	return this.data.replace(/^[\s　]+|[\s　]+$/g, '');
}

konoha.String.get = function(_ctx ,i) {
	return this.data.substr(i, 1);
}

konoha.String.startsWith = function(_ctx ,s) {
	if(this.data[0] == s.data[0]) {
		return true;
	}else{
		return false;
	}
}

konoha.String.endsWith = function(_ctx ,s) {
	if(this.data.substr(-1,1) == s.data.substr(-1,1)) {
		return true;
	}else{
		return false;
	}
}

konoha.String.getSize = function(_ctx) {
	return this.data.length;
}

konoha.String.indexOf = function(_ctx, s) {
	return this.data.indexOf(s.data);
}

konoha.String.lastindexOf = function(_ctx, s) {
	return this.data.lastindexOf(s.data);
}

konoha.String.toUpper = function(_ctx) {
	return this.data.toUpperCase();
}

konoha.String.toLower = function(_ctx) {
	return this.data.toLowerCase();
}

konoha.String.substring = function(_ctx, offset, length) {
	return this.data.substr(offset.data, length.data);
}
