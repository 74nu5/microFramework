/***************************** Tests fonctions Array *****************************************/
console.groupCollapsed('***************************** Tests fonctions Array *****************************************');


//Array#clear() → Array
$µ.TestSuite.testFunction('Array#clear() → Array', function() {
	var guys = $µ (['Sam', 'Justin', 'Andrew', 'Dan']);
	console.log(
	guys.clear(),
	// -> []
	guys
	// -> []
	)
}, true);

// Array#compact() → Array
$µ.TestSuite.testFunction('Array#compact() → Array', function() {
	var orig = $µ ([undefined, 'A', undefined, 'B', null, 'C']);
	var copy = orig.compact();
	// orig -> [undefined, 'A', undefined, 'B', null, 'C'];
	// copy -> ['A', 'B', 'C'];
	console.log(
	orig, copy);
}, true)

// Array#first() → ?
$µ.TestSuite.testFunction('Array#first() → ?', function() {
	var guys = $µ (['Sam', 'Justin', 'Andrew', 'Dan']);
	console.log(guys.first());
}, true)

// Array#flatten() → Array
$µ.TestSuite.testFunction('Array#flatten() → Array', function() {
	var a = $µ (['frank', ['bob', 'lisa'],
		['jill', ['tom', 'sally']]
	]);
	var b = a.flatten();
	// a -> ['frank', ['bob', 'lisa'], ['jill', ['tom', 'sally']]]
	// b -> ['frank', 'bob', 'lisa', 'jill', 'tom', 'sally']
	console.log(
	a, b);
}, true);

// >Array#indexOf(item[, offset = 0]) → Number
$µ.TestSuite.testFunction('Array#indexOf(item[, offset = 0]) → Number', function() {
	console.log($µ ([3, 5, 6, 1, 20]).indexOf(1),
	// -> 3
	$µ ([3, 5, 6, 1, 20]).indexOf(90),
	// -> -1 (not found)
	$µ (['1', '2', '3']).indexOf(1)
	// -> -1 (not found, 1 !== '1')
	)
}, true);

$µ.TestSuite.testFunction('Array#inspect() → String', function() {
	console.log($µ (['Apples',
	{
		good: 'yes',
		bad: 'no'
	},
	3, 34]).inspect());
	// -> "['Apples', [object Object], 3, 34]"
}, true);

// Array#intersect(array) → Array
$µ.TestSuite.testFunction('Array#intersect(array) → Array', function() {
	var a = $µ (['Sam', 'Justin', 'Andrew', 'Dan']);
	var b = $µ (['Sam', 'Thomas', 'Dan', 'Carlos']);
	console.log(a.intersect(b));
}, true);

// Array#last() → ?
$µ.TestSuite.testFunction('Array#last() → ?', function() {
	var guys = $µ (['Sam', 'Justin', 'Andrew', 'Dan']);
	console.log(guys.last());
}, true);

// >Array#lastIndexOf(item[, offset = 0]) → Number
$µ.TestSuite.testFunction('Array#lastIndexOf(item[, offset = 0]) → Number', function() {
	console.log($µ ([3, 5, 6, 1, 1]).lastIndexOf(1),
	// -> 3
	$µ ([3, 5, 6, 3, 20]).lastIndexOf(3),
	// -> -1 (not found)
	$µ (['1', '2', '3']).lastIndexOf(1)
	// -> -1 (not found, 1 !== '1')
	)
}, true);

// Array#reverse([inline = true]) → Array
$µ.TestSuite.testFunction('Array#reverse([inline = true]) → Array', function() {
	// Making a copy
	var nums = $µ ([3, 5, 6, 1, 20]);
	var rev = nums.reverse(false);
	// nums -> [3, 5, 6, 1, 20]
	// rev -> [20, 1, 6, 5, 3]
	console.log(
	nums, rev);

	// Working inline
	var nums = $µ ([3, 5, 6, 1, 20]);
	nums.reverse();
	// nums -> [20, 1, 6, 5, 3]
	console.log(nums);
}, true);

// Array#uniq([sorted = false]) → Array
$µ.TestSuite.testFunction('Array#uniq([sorted = false]) → Array', function() {
	console.log($µ ([1, 3, 2, 1]).uniq(),
	// -> [1, 2, 3]
	$µ (['A', 'a']).uniq()
	// -> ['A', 'a'] (because String comparison is case-sensitive)
	);
});

console.groupEnd('***************************** Tests fonctions Array *****************************************');
