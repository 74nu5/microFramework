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
/*µ(4).times(function(index, that) {
	console.log(index);
	console.log(that);
});*/
console.dir(µ);

var tabCh = body.collecter(function(item) {
	return item+1;
});

console.log(tabCh);

tabCh = tabCh.invoquer('toLowerCase');
console.log(tabCh);


var elBody = µ$('body');
console.log(elBody);

