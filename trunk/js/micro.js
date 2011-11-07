var µ = (function() {
	function micro(selector) {
		return init(selector);
	};

	var NULL_TYPE = 'Null',
    	UNDEFINED_TYPE = 'undefined',
    	BOOLEAN_TYPE = 'Boolean',
    	NUMBER_TYPE = 'number',
    	STRING_TYPE = 'string',
    	OBJECT_TYPE = 'Object',
    	FUNCTION_CLASS = '[object Function]',
    	BOOLEAN_CLASS = '[object Boolean]',
     	NUMBER_CLASS = '[object Number]',
    	STRING_CLASS = '[object String]',
    	ARRAY_CLASS = '[object Array]',
     	DATE_CLASS = '[object Date]',
		els,
		_toString = Object.prototype.toString;



	function extend(destination, source) {
		for (var property in source)
			destination[property] = source[property];
		//return destination;
	}

	/*function µObject (argument) {
		this.obj = argument;

	}*/
	micro.µObject = (function() {
		var hasNativeIsArray = (typeof Array.isArray == 'function')
    		&& Array.isArray([]) && !Array.isArray({});

		function isArray() {
	   		return _toString.call(this.obj) === ARRAY_CLASS;
	  	}

	  	function isNumber() {
	   		return _toString.call(this.obj) === NUMBER_TYPE;
	  	}


	  	/*if(hasNativeIsArray) {
	  		this.isArray = Array.isArray;
	  	}*/

	  	function valueOf () {
	  		return this.obj.valueOf();
	  		//return Object.prototype.valueOf.call(this.obj);
	  	}

		function toString () {
	  		return this.obj.toString();
	  	}
	  	function clone(object) {
	    	return extend({ }, object);
		}
		return {
			isNumber: isNumber,
			isArray: isArray,
			valueOf: valueOf,
			toString: toString,
			clone: clone
		};
	})();
	

	var µCommon = {
		valueOf: function valueOf() {
			return this.obj.valueOf();
		},
		toString: function toString () {
	  		return this.obj.toString();
	  	}
	}
	
	micro.µArray = function µArray (argument) {
		this.obj = argument;
	}
	extend(micro.µArray.prototype, µCommon);

	//extend(µArray.prototype, Array.prototype);
	//extend(Object.prototype, µObject.prototype);
	//µObject.µsuper(µArray);



	micro.µElement = function µElement (argument) {
		this.obj = argument;
		this.tag = this.obj.tagName;
		extend(micro.µElement.prototype, argument);
		extend(micro.µElement.prototype, µCommon);
	}

	
	micro.µNumber = (function() {
		function µNumber (argument) {
			this.obj = argument;
			/*this.valueOf = function valueOf () {
		  		return this.obj.valueOf();
		  	}*/
		}
		µNumber.prototype = new Number;
		extend(µNumber.prototype, µCommon);
		extend(µNumber.prototype, {
			next: function next() {
				return µ(this + 1);
			},
			times: function times (iterator, context) {
				for (var i = 0; i < this; i++) {
					iterator.call(context, i, this);
				};
			},
			abs: function abs(){
				return µ(Math.abs(this));
			},
			ceil: function ceil(){
				return µ(Math.ceil(this));
			},
			floor: function floor(){
				return µ(Math.floor(this));
			},
			round: function round(){
				return µ(Math.round(this));
			}
		})
		return µNumber;
	})();
	
	
	(function() {
		
		//extend(µNumber.prototype, new µObject);
	})();

	function init (selector) {
		var args = arguments;

		switch(typeof selector) {
			case STRING_TYPE:
				els = Sizzle(args[0]);
				return els.length === 0 ? 
					null : 
					els.length === 1 ? 
						new micro.µElement(els[0]) : 
						new micro.µArray(els);
			case NUMBER_TYPE:
				return new micro.µNumber(args[0]);
			default:
				return els;
		}
	}

	

	//console.log(arguments);
	//micro.element = els;
	return micro;
})();
