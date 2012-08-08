/***************************** Tests fonctions Enumerable *****************************************/
console.groupCollapsed('***************************** Tests fonctions Enumerable *****************************************');


// Enumerable#all([iterator = µ.__[, context]]) → Boolean
µ.TestSuite.testFunction('Enumerable#all([iterator = µ.__[, context]]) → Boolean', function() {
	console.log(µ ([]).all(), // -> true (empty arrays have no elements that could be falsy)
	µR(1, 5).all(), // -> true (all values in [1..5] are truthy)
	µ ([0, 1, 2]).all(), // -> false (with only one loop cycle: 0 is falsy)
	µ ([9, 10, 15]).all(function(n) {
		return n >= 10;
	}) // -> false (the iterator returns false on 9)
	);
}, true);


// Enumerable#inspect() → String
µ.TestSuite.testFunction('Enumerable#inspect() → String', function() {
	console.log(µR(1, 5).inspect());
}, true);

// Enumerable#invoke(methodName[, arg...]) → Array
µ.TestSuite.testFunction('Enumerable#invoke(methodName[, arg...]) → Array', function() {
	console.log(µ (['hello', 'world']).invoke('toUpperCase'), // -> ['HELLO', 'WORLD']
	µ (['hello', 'world']).invoke('substring', 0, 3) // -> ['hel', 'wor']
	//µ$('input').invoke('stopObserving', 'change')
	// -> Stops observing the 'change' event on all input elements,
	// returns an array of the element references.
	);
}, true);

// Enumerable#max([iterator = µ.__[, context]]) → maxValue
µ.TestSuite.testFunction('Enumerable#max([iterator = µ.__[, context]]) → maxValue', function() {
	console.log(µ (['c', 'b', 'a']).max(),
	// -> 'c'
	µ ([1, 3, '3', 2]).max(),
	// -> '3' (because both 3 and '3' are "max", and '3' was later)
	µ (['zero', 'one', 'two']).max(function(item) {
		return item.length;
	})
	// -> 4
	);
}, true);

// Enumerable#min([iterator = Prototype.K[, context]]) → minValue
µ.TestSuite.testFunction('Enumerable#min([iterator = Prototype.K[, context]]) → minValue', function() {
	console.log(µ (['c', 'b', 'a']).min(),
	// -> 'a'
	µ ([3, 1, '1', 2]).min(),
	// -> 1 (because both 1 and '1' are "min", and 1 was earlier)
	µ (['un', 'deux', 'trois']).min(function(item) {
		return item.length;
	})
	// -> 2
	);
}, true);

// Enumerable#partition([iterator = Prototype.K[, context]]) → [TrueArray, FalseArray]
µ.TestSuite.testFunction('Enumerable#partition([iterator = Prototype.K[, context]]) → [TrueArray, FalseArray]', function() {
	console.log(µ (['hello', null, 42, false, true, , 17]).partition(),
	// -> [['hello', 42, true, 17], [null, false, undefined]]
	µR(1, 10).partition(function(n) {
		return 0 == n % 2;
	})
	// -> [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]]
	);
}, true);


// Enumerable#pluck(property) → Array
µ.TestSuite.testFunction('Enumerable#pluck(property) → Array', function() {
	console.log(µ (['hello', 'world', 'this', 'is', 'nice']).pluck('length')
	// -> [5, 5, 4, 2, 4]
	);
}, true);

// Enumerable#reject(iterator[, context]) → Array
µ.TestSuite.testFunction('Enumerable#reject(iterator[, context]) → Array', function() {
	console.log(µ ([1, "two", 3, "four", 5]).reject(µ.Object.isString)
	// -> [1, 3, 5]
	);
}, true);

// Enumerable#size() → Number
µ.TestSuite.testFunction('Enumerable#size() → Number', function() {
	console.log(µR(1, 10).size()
	// -> 10
	);
}, true);

// Enumerable#sortBy(iterator[, context]) → Array
µ.TestSuite.testFunction('Enumerable#sortBy(iterator[, context]) → Array', function() {
	console.log(µ (['hello', 'world', 'this', 'is', 'nice']).sortBy(function(s) {
		return s.length;
	})
	// -> ['is', 'nice', 'this', 'world', 'hello']
	);
}, true);

console.groupEnd('***************************** Tests fonctions Enumerable *****************************************');
