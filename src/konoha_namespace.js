konoha = {};
konoha.Enum = function() {
	for (var i in arguments) {
		this[arguments[i]] = i;
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
