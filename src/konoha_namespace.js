konoha = {};

konoha.Enum = function() {
	for (var i in arguments) {
		this[arguments[i]] = i;
	}
};
