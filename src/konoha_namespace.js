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
