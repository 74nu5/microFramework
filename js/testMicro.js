µ.testFunction = function testFunction (description, test, collapsed) {
	console[(collapsed)?'groupCollapsed':'group'](description);
	test.call(this);
	console.groupEnd(description);
}


var guys = µ(['Sam', 'Justin', 'Andrew', 'Dan']);


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

//		TESTS FONCTIONS ENUMERABLE

// Enumerable#all([iterator = µ.__[, context]]) → Boolean
console.log(
	µ([]).all(), // -> true (empty arrays have no elements that could be falsy)
	µR(1, 5).all(), // -> true (all values in [1..5] are truthy)
	µ([0, 1, 2]).all(), // -> false (with only one loop cycle: 0 is falsy)
	µ([9, 10, 15]).all(function(n) { return n >= 10; }) // -> false (the iterator returns false on 9)
);


// Enumerable#inspect() → String
console.log(
	µR(1, 5).inspect()
);

// Enumerable#invoke(methodName[, arg...]) → Array
console.log(
	µ(['hello', 'world']).invoke('toUpperCase'), // -> ['HELLO', 'WORLD']
	µ(['hello', 'world']).invoke('substring', 0, 3) // -> ['hel', 'wor']
	//µ$('input').invoke('stopObserving', 'change')
 		// -> Stops observing the 'change' event on all input elements,
 		// returns an array of the element references.
);

// Enumerable#max([iterator = µ.__[, context]]) → maxValue
console.log(
	µ(['c', 'b', 'a']).max(),
// -> 'c'
 µ([1, 3, '3', 2]).max(),
// -> '3' (because both 3 and '3' are "max", and '3' was later)
 µ(['zero', 'one', 'two']).max(function(item) { return item.length; })
// -> 4
);

// Enumerable#min([iterator = Prototype.K[, context]]) → minValue
console.log(
	µ(['c', 'b', 'a']).min(),
	// -> 'a'
	µ([3, 1, '1', 2]).min(),
	// -> 1 (because both 1 and '1' are "min", and 1 was earlier)
	µ(['un', 'deux', 'trois']).min(function(item) { return item.length; })
	// -> 2
);

// Enumerable#partition([iterator = Prototype.K[, context]]) → [TrueArray, FalseArray]
console.log(
	µ(['hello', null, 42, false, true, , 17]).partition(),
	// -> [['hello', 42, true, 17], [null, false, undefined]]
	µR(1, 10).partition(function(n) {
	  return 0 == n % 2;
	})
	// -> [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]]
);

// Enumerable#pluck(property) → Array
console.log(
	µ(['hello', 'world', 'this', 'is', 'nice']).pluck('length')
	// -> [5, 5, 4, 2, 4]
);

// Enumerable#reject(iterator[, context]) → Array
console.log(
	µ([1, "two", 3, "four", 5]).reject(µ.Object.isString)
	// -> [1, 3, 5]
);

// Enumerable#size() → Number
console.log(
	µR(1, 10).size()
	// -> 10
);

// Enumerable#sortBy(iterator[, context]) → Array
console.log(
	µ(['hello', 'world', 'this', 'is', 'nice']).sortBy(function(s) {
	  return s.length;
	})
	// -> ['is', 'nice', 'this', 'world', 'hello']
);



/***************************** Tests fonctions Array *****************************************/

//Array#clear() → Array
µ.testFunction('Array#clear() → Array', function() {
	var guys = µ(['Sam', 'Justin', 'Andrew', 'Dan']);
	console.log(
		guys.clear(),
		// -> []
		guys
		// -> []
	)
}, true);

// Array#compact() → Array
µ.testFunction('Array#compact() → Array', function() {
	var orig = µ([undefined, 'A', undefined, 'B', null, 'C']);
	var copy = orig.compact();
	// orig -> [undefined, 'A', undefined, 'B', null, 'C'];
	// copy -> ['A', 'B', 'C'];
	console.log(
		orig,
		copy
	);
}, true)

// Array#first() → ?
µ.testFunction('Array#first() → ?', function() {
	var guys = µ(['Sam', 'Justin', 'Andrew', 'Dan']);
	console.log(guys.first());
}, true)

// Array#flatten() → Array
µ.testFunction('Array#flatten() → Array' , function() {
	var a = µ(['frank', ['bob', 'lisa'], ['jill', ['tom', 'sally']]]);
	var b = a.flatten();
	// a -> ['frank', ['bob', 'lisa'], ['jill', ['tom', 'sally']]]
	// b -> ['frank', 'bob', 'lisa', 'jill', 'tom', 'sally']
	console.log(
		a,
		b
	);
}, true);

// >Array#indexOf(item[, offset = 0]) → Number
µ.testFunction('Array#indexOf(item[, offset = 0]) → Number', function() {
	console.log(
		µ([3, 5, 6, 1, 20]).indexOf(1),
		// -> 3
		µ([3, 5, 6, 1, 20]).indexOf(90),
		// -> -1 (not found)
		µ(['1', '2', '3']).indexOf(1)
		// -> -1 (not found, 1 !== '1')
	)
}, true);

µ.testFunction('Array#inspect() → String', function() {
	console.log(µ(['Apples', {good: 'yes', bad: 'no'}, 3, 34]).inspect());
	// -> "['Apples', [object Object], 3, 34]"
}, true);

// Array#intersect(array) → Array
µ.testFunction('Array#intersect(array) → Array', function() {
	var a = µ(['Sam', 'Justin', 'Andrew', 'Dan']);
	var b = µ(['Sam', 'Thomas', 'Dan', 'Carlos']);
	console.log(a.intersect(b));
}, true);

// Array#last() → ?
µ.testFunction('Array#last() → ?', function() {
	var guys = µ(['Sam', 'Justin', 'Andrew', 'Dan']);
	console.log(guys.last());
}, true);

// >Array#lastIndexOf(item[, offset = 0]) → Number
µ.testFunction('Array#lastIndexOf(item[, offset = 0]) → Number', function() {
	console.log(
		µ([3, 5, 6, 1, 1]).lastIndexOf(1),
		// -> 3
		µ([3, 5, 6, 3, 20]).lastIndexOf(3),
		// -> -1 (not found)
		µ(['1', '2', '3']).lastIndexOf(1)
		// -> -1 (not found, 1 !== '1')
	)
}, true);

// Array#reverse([inline = true]) → Array
µ.testFunction('Array#reverse([inline = true]) → Array', function() {
	// Making a copy
	var nums = µ([3, 5, 6, 1, 20]);
	var rev = nums.reverse(false);
	// nums -> [3, 5, 6, 1, 20]
	// rev -> [20, 1, 6, 5, 3]
	console.log(
		nums,
		rev
	);

	 // Working inline
	var nums = µ([3, 5, 6, 1, 20]);
	nums.reverse();
	// nums -> [20, 1, 6, 5, 3]
	console.log(nums);
}, true);

// Array#uniq([sorted = false]) → Array
µ.testFunction('Array#uniq([sorted = false]) → Array', function() {
	console.log(
		µ([1, 3, 2, 1]).uniq(),
		// -> [1, 2, 3]
	 	µ(['A', 'a']).uniq()
		// -> ['A', 'a'] (because String comparison is case-sensitive)
	);
});
