// written by kimio kuramitsu

int add(int a, int b) {
	System.p("a="+a);
	System.p("b="+b);
	return a+b;
}

int f(int x, int y) {
	return add(${int a = x; a+1;}, ${int b = y; b+1;});
}

System.p(f(1,2));
assert(f(1,1)==4);

