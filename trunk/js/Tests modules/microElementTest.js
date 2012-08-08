/*

//
µ.TestSuite.testFunction('', function() {

}, true);


*/
/***************************** Tests fonctions Element *****************************************/
console.group('***************************** Tests fonctions Element *****************************************');

// µ$(cssRule...) → [Element…]
µ.TestSuite.testFunction('µ$(cssRule...) → [Element…]', function() {
	var allA = µ$('li a');
	console.log(allA);
}, true);

// Element#hasClassName(className) → Boolean
µ.TestSuite.testFunction('Element#hasClassName(className) → Boolean', function() {
	console.log(µ$('#toto').hasClassName('test'));
	console.log(µ$('#elList1').hasClassName('test'));
}, true);

// Element#addClassName(className) → Element
µ.TestSuite.testFunction('Element#addClassName(className) → Element', function() {
	console.log(µ$('#toto').addClassName('test'));
	console.log(µ$('#toto').hasClassName('test'));
}, true);


console.groupEnd('***************************** Tests fonctions Element *****************************************');


console.log(µ$('#lien1'));
console.log(µ$('#elList1'));
