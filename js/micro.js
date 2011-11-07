var µ = (function() {
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
		return destination;
	}

	function µObject (argument) {
		this.obj = argument;

	}
	(function() {
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
		extend(µObject.prototype, {
			isNumber: isNumber,
			isArray: isArray,
			valueOf: valueOf,
			toString: toString
		});
	})();
	

	

	µObject.µsuper = function µsuper(klass) {
		for(var prop in this.prototype) {
			klass.prototype[prop] = this.prototype[prop];
		}
	}
	
	function µArray (argument) {
		this.obj = argument;
	}

	//extend(µArray.prototype, Array.prototype);
	//extend(Object.prototype, µObject.prototype);
	//µObject.µsuper(µArray);

	function µElement (argument) {
		this.obj = argument;
		this.tag = this.obj.tagName;
	}
	µElement.prototype = new µObject;

	function µNumber (argument) {
		this.obj = argument;
	}
	(function() {
		function next () {
			return this + 1;
		}
		extend(µNumber.prototype, {
			next: next
		})
		//extend(µNumber.prototype, new µObject);
	})();
	µNumber.constructor = µObject;

	function micro() {
		var args = arguments;

		switch(typeof args[0]) {
			case STRING_TYPE:
				els = Sizzle(args[0]);
				els = els.length === 0 ? 
					null : 
					els.length === 1 ? 
						new µElement(els[0]) : 
						new µArray(els);
				break;
			case NUMBER_TYPE:
				els = new µNumber(args[0]);
				break;
			default:
				els = new µObject(args[0]);
				break;
		}
		return els;
	};

	//console.log(arguments);
	micro.element = els;
	return micro;
})();
