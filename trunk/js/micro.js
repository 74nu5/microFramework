(function(global, undef) {
	function micro(selector) {
		return init(selector);
	};

	function microElement (selector) {
		return initElement(selector);
	}
	var NULL_TYPE = 'Null',
    	UNDEFINED_TYPE = 'undefined',
    	BOOLEAN_TYPE = 'Boolean',
    	NUMBER_TYPE = 'number',
    	STRING_TYPE = 'string',
    	OBJECT_TYPE = 'object',
    	FUNCTION_CLASS = '[object Function]',
    	BOOLEAN_CLASS = '[object Boolean]',
     	NUMBER_CLASS = '[object Number]',
    	STRING_CLASS = '[object String]',
    	ARRAY_CLASS = '[object Array]',
     	DATE_CLASS = '[object Date]',
		els,
		_toString = Object.prototype.toString,
		testSelectorId = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

	var f = {
		etendre: function etendre(destination, source) {
			for (var property in source)
				destination[property] = source[property];
		}
	}

	micro.Global = {
		Navigateur : (function(){
		    var ua = navigator.userAgent;
		    var isOpera = _toString.call(window.opera) == '[object Opera]';
		    return {
		      IE:             !!window.attachEvent && !isOpera,
		      Opera:          isOpera,
		      WebKit:         ua.indexOf('AppleWebKit/') > -1,
		      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
		      MobileSafari:   /Apple.*Mobile/.test(ua)
		    }
		  })(),
		fonctionVide : function() {},
		__: function (x) { return x; }
	}

	micro.Object = (function() {
		var hasNativeIsArray = (typeof Array.isArray == 'function')
    		&& Array.isArray([]) && !Array.isArray({});

		function isArray(obj) {
	   		return _toString.call(obj) === ARRAY_CLASS;
	  	}

	  	function isNumber(obj) {
	   		return typeof obj === NUMBER_TYPE;
	  	}

	  	function isString (obj) {
	  		return typeof obj === STRING_TYPE;
	  	}

	  	function isHTMLElement (obj) {
	  		return obj instanceof HTMLElement
	  	}

	  	function isUndefined(object) {
			return typeof object === "undefined";
		}

	  	/*if(hasNativeIsArray) {
	  		this.isArray = Array.isArray;
	  	}*/

	  	function clone(object) {
	    	return f.etendre({ }, object);
		}
		return {
			isNumber: isNumber,
			isArray: isArray,
			isString: isString,
			isHTMLElement: isHTMLElement, 
			valueOf: valueOf,
			toString: toString,
			clone: clone,
			isUndefined: isUndefined
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
	var $break = { };
	micro.Interfaces = {
		Enumerable: (function(){
			function each(iterator, context) {
			    var index = 0;
			    try {
			    	this._each(function(value) {
			    		iterator.call(context, value, index++);
			    	});
			    } catch (e) {
			    	if (e != $break) throw e;
			    }
			    return this;
			}

			function invoke (methodName, args) {
				var args = Array.prototype.slice.call(arguments, 1);
				return this.collecter(function(value) {
				   	return value[methodName].apply(value, args);
				});
			}

			function collect (iterator, context) {
				iterator = iterator || micro.__;
				var results = [];
				this.chaque(function(item, index) {
					results.push(iterator.call(context, item));
				})
				return µ(results);
			}

			return {
				chaque: each,
				collecter: collect,
				invoquer: invoke
			}			
		})()
	}

	micro.Classes = {};

	/**
	* Classe µArray
	**/
	micro.Classes.Array = (function() {
		function µArray (argument) {
			this.obj = argument || [];
			var i;
			for (i = 0; i < this.obj.length; i++) {
				this[i] = µ(this.obj[i]);
			};
			this.length = this.__proto__.length = i;
		}
		µArray.prototype =  [];
		f.etendre(µArray.prototype, micro.Interfaces.Enumerable);
		f.etendre(µArray.prototype, (function() {
			if (typeof Array.prototype.forEach === 'function') {
				return {_each : Array.prototype.forEach}
			} else {
				return {_each : function(iterator, context) {
					for (var i = 0, length = this.length >>> 0; i < length; i++) {
				    	if (i in this) iterator.call(context, this[i], i, this);
					}
				}}
			}
		})());
		return µArray;	
	})();

	/**
	* Classe µNumber
	**/
	micro.Classes.Number = (function() {
		function µNumber (argument) {
			this.obj = argument;
			/*this.valueOf = function valueOf () {
		  		return this.obj.valueOf();
		  	}*/
		}
		µNumber.prototype = new Number;
		f.etendre(µNumber.prototype, {
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
		});
		f.etendre(µNumber.prototype, µCommon);
		return µNumber;
	})();

	/**
	* Classe µString
	**/
	micro.Classes.String = (function() {
		function µString (argument) {
			if (argument) {
				this.obj = argument;
				for (var i = 0; i < this.obj.length; i++) {
					this[i] = this.obj[i];
				};
				this.length = this.obj.length;
			};
		}
		µString.prototype = new String;
		f.etendre(µString.prototype, micro.Interfaces.Enumerable);
		f.etendre(µString.prototype, {
			_each : function(iterator, context) {
				for (var i = 0, length = this.length >>> 0; i < length; i++) {
					if (i in this) iterator.call(context, this[i], i, this);
				}
			},

			toPaddedString: function toPaddedString(length, radix) {
				var string = this.toString(radix || 10);
				return '0'.times(length - string.length) + string;
			},
			times: function times(count) {
				return count < 1 ? '' : new Array(count + 1).join(this);
			}
		});
		f.etendre(µString.prototype, µCommon);
		return µString
	})();

	/**
	* Classe µElement
	**/
	micro.Classes.Element = (function() {
		function µElement (argument) {
			if (argument) { 
				this.obj = argument;
				this.tag = this.obj.tagName;
				this.__proto__ = argument;
			};
		}
		f.etendre(µElement.prototype, µCommon);
		return µElement;
	})();
		
	/**
	* Classe µDate
	**/
	micro.Classes.Date = (function() {
		function µDate (argument) {
			this.obj = argument || new Date;
		}
		µDate.prototype = new Date;
		f.etendre(µDate.prototype, {
			toISOString: function toISOString() {
				return this.getUTCFullYear() + '-' +
					(this.getUTCMonth() + 1).toPaddedString(2) + '-' +
				this.getUTCDate().toPaddedString(2) + 'T' +
				this.getUTCHours().toPaddedString(2) + ':' +
				this.getUTCMinutes().toPaddedString(2) + ':' +
				this.getUTCSeconds().toPaddedString(2) + 'Z';
			},
			toJSON: function toJSON() {
				return this.toISOString();
			}
		});
		f.etendre(µDate.prototype, µCommon);
		return µDate;
	})();
	
	function initElement (selector) {
		if(!selector) return this;

		if(selector.nodeType) {
			return new micro.Classes.Element(selector);
		}

		if ( selector === "body" && document.body ) {
			return new micro.Classes.Element(document.body);
		}

		if (micro.Object.isString(selector)) {
			if (testSelectorId.test(selector)) {
				return new micro.Classes.Element(document.getElementById(selector.match(testSelectorId)[2]));
			} else{
				els = Sizzle(selector);
				if(els.length > 0) {
					if (els.length === 1) {
						return new micro.Classes.Element(els[0]);
					} else {
						return new micro.Classes.Array(els);
					}
				} else {
					return null;	
				};	
			};
		};
	}

	function init (selector) {
		var args = arguments,
			els;		
		if (micro.Object.isNumber(selector)) {
			return new micro.Classes.Number(selector);
		};
		if (micro.Object.isArray(selector)) {
			return new micro.Classes.Array(selector);
		};
		if (micro.Object.isString(selector)) {
			return new micro.Classes.String(selector);
		};
		return null;
	}

	micro.toString = function toString () {
		return "Micro Framework v1.0 - T@nu$ © 2011-2012"
	};

	micro.f = f;
	micro.__ = micro.Global.__;
	global.µ = micro;
	global.µ$ = microElement;
})(window);
