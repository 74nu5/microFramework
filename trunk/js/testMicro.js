$.TestSuite = {
    testFunction: function testFunction(description, test, collapsed) {
        console[(collapsed) ? 'groupCollapsed' : 'group'](description);
        test.call(this);
        console.groupEnd(description);
    }
}



/*var n = $(23);
var n2 = $(23);
console.debug(n);

var s = $('23 ');
var s2 = $('25');
console.debug(s);
console.debug(s.trim() + s2);

var tab1 = $(['Sam', 'Justin', 'Andrew', 'Dan']);
console.log(tab1);
console.log(new Array(['Sam', 'Justin', 'Andrew', 'Dan']));*/

var tab2 = $('Sam', 'Justin', 'Andrew', 'Dan');
console.log(new $.Classes.Array('Sam', 'Justin', 'Andrew', 'Dan'));
console.log(tab2);
/*
var tab = $("*");
console.dir(tab);
var body = $("BODY");
console.dir(body);

var id = $("#toto");
console.dir(id);



var n = $(53);
console.dir(n);
console.dir($);

var tabCh = body.collect(function(item) {
	return item+1;
});

console.log(tabCh);

tabCh = tabCh.invoke('toLowerCase');
console.log(tabCh);


var elBody = $$('body');
console.log(elBody);
*/
