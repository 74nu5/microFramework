µ.TestSuite = {
	testFunction: function testFunction(description, test, collapsed) {
		console[(collapsed) ? 'groupCollapsed' : 'group'](description);
		test.call(this);
		console.groupEnd(description);
	}
}


var guys = µ (['Sam', 'Justin', 'Andrew', 'Dan']);


/*
var tab = µ("*");
console.dir(tab);
var body = µ("BODY");
console.dir(body);

var id = µ("#toto");
console.dir(id);

var n = µ(23);
console.dir(n);

var n = µ(53);
console.dir(n);
console.dir(µ);

var tabCh = body.collect(function(item) {
	return item+1;
});

console.log(tabCh);

tabCh = tabCh.invoke('toLowerCase');
console.log(tabCh);


var elBody = µ$('body');
console.log(elBody);
*/





