/**
 * Micro Framework
 */

(function(global, undef) {
    function micro() {
        return init.apply(this, arguments);
    }

    function microElement(selector) {
        return initElement(selector);
    }

    var NULL_TYPE = 'Null',
        UNDEFINED_TYPE = 'undefined',
        BOOLEAN_TYPE = 'Boolean',
        NUMBER_TYPE = 'number',
        STRING_TYPE = 'string',
        OBJECT_TYPE = 'object',
        FUNCTION_TYPE = 'function',
        FUNCTION_CLASS = '[object Function]',
        BOOLEAN_CLASS = '[object Boolean]',
        NUMBER_CLASS = '[object Number]',
        STRING_CLASS = '[object String]',
        ARRAY_CLASS = '[object Array]',
        DATE_CLASS = '[object Date]',
        els, _toString = Object.prototype.toString,
        testSelectorId = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

    var f = {
        etendre: function etendre(destination, source) {
            for (var property in source)
            //if (typeof destination[property] === UNDEFINED_TYPE) {
                destination[property] = source[property];
            //};
        },
        bind: function bind(context) {
            var args = $(arguments).slice(2);
            var that = this;
            return function() {
                that.call(context, args);
            };
        }
    };

    micro.Global = {
        Navigateur: (function() {
            var ua = navigator.userAgent;
            var isOpera = _toString.call(window.opera) == '[object Opera]';
            return {
                IE: !! window.attachEvent && !isOpera,
                Opera: isOpera,
                WebKit: ua.indexOf('AppleWebKit/') > -1,
                Gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
                MobileSafari: /Apple.*Mobile/.test(ua)
            }
        })(),
        fonctionVide: function() {},
        __: function(x) {
            return x;
        }
    };

    micro.Object = (function() {
        var hasNativeIsArray = (typeof Array.isArray == 'function') && Array.isArray([]) && !Array.isArray({});

        function __getClass(object) {
            return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
        }

        function isArray(obj) {
            return _toString.call(obj) === ARRAY_CLASS;
        }

        function isNumber(obj) {
            return _toString.call(obj) === NUMBER_CLASS
        }

        function isString(obj) {
            return _toString.call(obj) === STRING_CLASS;
        }

        function isHTMLElement(obj) {
            return !!(object && object.nodeType == 1);
            // return obj instanceof HTMLElement
        }

        function isUndefined(object) {
            return typeof object === "undefined";
        }

        function isFunction(obj) {
            return _toString.call(obj) === FUNCTION_CLASS;
        }

        /*if(hasNativeIsArray) {
         this.isArray = Array.isArray;
         }*/

        function inspect(object) {
            try {
                if (isUndefined(object)) return 'undefined';
                if (object === null) return 'null';
                return object.inspect ? object.inspect() : String(object);
            } catch (e) {
                if (e instanceof RangeError) return '...';
                throw e;
            }
        }

        function clone(object) {
            return f.etendre({}, object);
        }

        function is(type, obj) {
            var clas = _toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && clas === type;
        }

        return {
            isNumber: isNumber,
            isArray: isArray,
            isString: isString,
            isHTMLElement: isHTMLElement,
            valueOf: valueOf,
            toString: toString,
            clone: clone,
            inspect: inspect,
            isFunction: isFunction,
            isUndefined: isUndefined,
            is: is
        };
    })();


    var $Common = {
        valueOf: function valueOf() {
            return this.obj.valueOf();
        },
        toString: function toString() {
            return this.obj.toString();
        },
        inspect: function inspect() {
            return this.obj.toString();
        }
    }
    var $break = {};
    micro.Interfaces = {
        Enumerable: (function() {
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

            function invoke(methodName) {
                var args = Array.prototype.slice.call(arguments, 1);
                return this.collect(function(value) {
                    return value[methodName].apply(value, args);
                });
            }

            function collect(iterator, context) {
                iterator = iterator || micro.__;
                var __results = [];
                this.each(function(item, index) {
                    __results.push(iterator.call(context, item));
                });
                return $(__results);
            }

            function all(iterator, context) {
                iterator = iterator || micro.__;
                var __result = true;
                this.each(function(item, index) {
                    if (!iterator.call(context, item.valueOf())) __result = false;
                });
                return __result;
            }

            function any(iterator, context) {
                iterator = iterator || micro.__;
                var __result = false;
                this.each(function(item) {
                    if (iterator.call(context, item.valueOf())) __result = true;
                });
                return __result;
            }

            function detect(iterator, context) {
                iterator = iterator || micro.__;
                var __result = undef,
                    find = false;
                this.each(function(item) {
                    if (iterator.call(context, item.valueOf()) && !find) {
                        __result = item;
                        find = true;
                    }
                });
                return __result;
            }

            // TODO : eachSlice

            function findAll(iterator, context) {
                iterator = iterator || micro.__;
                var __result = [];
                this.each(function(item) {
                    if (iterator.call(context, item.valueOf())) __result.push(item);
                });
                return __result;
            }

            function grep(filter, iterator, context) {
                iterator = iterator || micro.__;
                var __result = [];
                this.each(function(item) {
                    if (filter.test(item)) __result.push(iterator.call(context, item));
                });
                return __result;
            }

            function include(object) {
                return this.any(function(item) {
                    return item == object
                });
            }

            // TODO : inGroupsOf

            function inject(accumulator, iterator, context) {
                this.each(function(item, index) {
                    accumulator = iterator.call(context, $(accumulator), item, index);
                });
                return accumulator;
            }

            function inspect(argument) {
                return '#<Enumerable:' + this.toArray().inspect() + '>';
            }

            function toArray() {
                return this.collect();
            }

            // Enumerable#max([iterator = $.__[, context]]) → maxValue


            function max(iterator, context) {
                iterator = iterator || micro.__;
                var __result;
                this.each(function(value, index) {
                    value = iterator.call(context, value, index);
                    if (__result == null || value >= __result) __result = value;
                });
                return __result;
            }

            // Enumerable#min([iterator = Prototype.K[, context]]) → minValue


            function min(iterator, context) {
                iterator = iterator || micro.__;
                var __result;
                this.each(function(value, index) {
                    value = iterator.call(context, value, index);
                    if (__result == null || value < __result) __result = value;
                });
                return __result;
            }

            // Enumerable#partition([iterator = Prototype.K[, context]]) → [TrueArray, FalseArray]


            function partition(iterator, context) {
                iterator = iterator || micro.__;
                var trueArray = [],
                    falseArray = [];
                this.each(function(item, index) {
                    (iterator.call(context, item, index)) ? trueArray.push(item) : falseArray.push(item);
                });
                return [trueArray, falseArray];
            }

            // Enumerable#pluck(property) → Array


            function pluck(property) {
                var __result = [];
                this.each(function(item) {
                    __result.push(item[property]);
                });
                return __result;
            }

            // Enumerable#reject(iterator[, context]) → Array


            function reject(iterator, context) {
                iterator = iterator || micro.__;
                var __result = [];
                this.each(function(item) {
                    if (!iterator.call(context, item.valueOf())) __result.push(item);
                });
                return __result;
            }

            // Enumerable#size() → Number


            function size() {
                return this.toArray().length;
            }

            // Enumerable#sortBy(iterator[, context]) → Array


            function sortBy(iterator, context) {
                return $(this.map(function(value, index) {
                    return {
                        value: value,
                        criteria: iterator.call(context, value, index)
                    };
                }).sort(function(left, right) {
                    var a = left.criteria,
                        b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                })).pluck('value');
            }

            // TODO : Enumerable#zip(sequence...[, iterator = micro.__]) → Array
            return {
                all: all,
                any: any,
                detect: detect,
                findAll: findAll,
                grep: grep,
                include: include,
                inject: inject,
                inspect: inspect,
                toArray: toArray,
                collect: collect,
                invoke: invoke,
                min: min,
                max: max,
                partition: partition,
                pluck: pluck,
                reject: reject,
                size: size,
                sortBy: sortBy,
                each: each
            }
        })()
    };

    micro.Classes = {};

    /**
     * Classe $Array
     **/
    micro.Classes.Array = (function() {
        function $Array() {
            if (arguments.length) {
                this.obj = Array.prototype.slice.call(arguments, 0);
            } else {
                this.obj = [];
            }
            var i;
            for (i = 0; i < this.obj.length; i++) {
                this.push(this.obj[i]);
            }
        }


        $Array.constructor = Array;
        $Array.prototype = [];
        f.etendre($Array.prototype, micro.Interfaces.Enumerable);
        f.etendre($Array.prototype, (function() {
            if (typeof Array.prototype.forEach === 'function') {
                return {
                    _each: Array.prototype.forEach
                }
            } else {
                return {
                    _each: function(iterator, context) {
                        for (var i = 0, length = this.length >>> 0; i < length; i++) {
                            if (i in this) iterator.call(context, this[i], i, this);
                        }
                    }
                }
            }
        })());

        if (!$Array.prototype._reverse) $Array.prototype._reverse = $Array.prototype.reverse;

        f.etendre($Array.prototype, {
            toString: function toString() {
                return '[object Array]';
            },

            // Array#inspect() → String
            inspect: function inspect() {
                return '[' + this.map($.Object.inspect).join(', ') + ']';
            },

            // Array#clear() → Array
            clear: function clear() {
                for (var i = 0, len = this.length; i < len; i++) {
                    this.shift();
                }
                return this;
            },

            // Array#compact() → Array
            compact: function compact() {
                var __result = [];
                this._each(function(item, index) {
                    if (item != null && typeof(item) !== UNDEFINED_TYPE) __result.push(item);
                });
                return __result;
            },

            // Array#first() → ?
            first: function first() {
                return this[0];
            },

            // Array#flatten() → Array
            flatten: function flatten() {
                return this.inject([], function(array, value) {
                    if ($.Object.isArray(value)) return array.concat(value.flatten());
                    array.push(value);
                    return array;
                });
            },

            // Array#indexOf(item[, offset = 0]) → Number
            indexOf: function indexOf(item, offset) {
                for (var i = offset || 0, len = this.length; i < len; i++) {
                    if (typeof(item.obj) !== UNDEFINED_TYPE) {
                        if (this[i].obj === item.obj) return i;
                    }
                    if (this[i].obj === item) return i;
                }
                return -1;
            },

            // Array#intersect(array) → Array
            intersect: function intersect(array) {
                return this.uniq().findAll(function(item) {
                    return array.detect(function(value) {
                        return item === value
                    });
                });
            },

            // Array#last() → ?
            last: function last() {
                return this[this.length - 1];
            },

            // Array#lastIndexOf(item[, offset = 0]) → Number
            lastIndexOf: function lastIndexOf(item, offset) {
                for (var i = offset || (this.length - 1); i > 0; i--) {
                    if (typeof(item.obj) !== UNDEFINED_TYPE) {
                        if (this[i].obj === item.obj) return i;
                    }
                    if (this[i].obj === item) return i;
                }
                return -1;
            },

            // Array#reverse([inline = true]) → Array
            reverse: function reverse(inline) {
                return (inline === false ? this.toArray() : this)._reverse();
            },

            // Array#uniq([sorted = false]) → Array
            uniq: function uniq(sorted) {
                return this.inject([], function(array, value, index) {
                    if (0 == index || (sorted ? array.last() != value : !array.include(value))) array.push(value);
                    return array;
                });
            },

            // Array#concat(arry1, array2, ... , arrayN) → Array
            concat: function concat() {
                micro(arguments).each(function(arg) {
                    if ($.Object.isArray(arg)) {
                        arg.each(function(tabEl) {
                            this.push(tabEl);
                        });
                    }
                });
                /*var args = arguments;
                 for (var i = 0; i < args.length; i++) {
                 var tab = args[i];
                 if ($.Object.isArray(tab)) {
                 var len = tab.length;
                 for (var j = 0; j < len; j++) {
                 var el = tab[j];
                 this.push(el);
                 };
                 };
                 };*/
                return this;
            }
        });
        return $Array;
    })();

    /**
     * Classe $Number
     **/
    micro.Classes.Number = (function() {
        function $Number(argument) {
            this.obj = argument;
            /*this.valueOf = function valueOf () {
                console.dir(this.obj.valueOf());
                return new $Number(this.obj);
             }*/
        }

        $Number.prototype = new Number;
        f.etendre($Number.prototype, {
            next: function next() {
                return $(this + 1);
            },
            times: function times(iterator, context) {
                for (var i = 0; i < this; i++) {
                    iterator.call(context, i, this);
                }
            },
            abs: function abs() {
                return $(Math.abs(this));
            },
            ceil: function ceil() {
                return $(Math.ceil(this));
            },
            floor: function floor() {
                return $(Math.floor(this));
            },
            round: function round() {
                return $(Math.round(this));
            }
        });
        f.etendre($Number.prototype, $Common);
        return $Number;
    })();

    /**
     * Classe $String
     **/
    micro.Classes.String = (function() {
        function $String(argument) {
            if (argument) {
                this.obj = argument;
                for (var i = 0; i < this.obj.length; i++) {
                    this[i] = this.obj[i];
                }
                this.length = this.obj.length;
            }
        }

        $String.prototype = new String;
        f.etendre($String.prototype, micro.Interfaces.Enumerable);
        f.etendre($String.prototype, {
            _each: function(iterator, context) {
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
            },
            equals: function equals(str) {
                return this.obj === ((str.obj) ? str.obj : str);
            }
        });
        f.etendre($String.prototype, $Common);
        return $String
    })();

    /**
     * Classe $Element
     **/
    micro.Classes.Element = (function() {
        function $Element(argument) {
            if (argument) {
                this.obj = argument;
                this.tag = this.obj.tagName;
                this.__proto__.__proto__ = argument;
            }
        }

        // A REFAIRE CECI EST UNE INSTANCE DE CLASSE ON NE PEUT DONC PAS EN HERITER ! ! ! ! ! ! ! ! ! !
        //$Element.prototype = document.cre
        //$Element.prototype
        f.etendre($Element.prototype, $Common);
        f.etendre($Element.prototype, {
            addClassName: function addClassName(className) {
                if (!this.hasClassName(className)) {
                    this.className += (this.className ? ' ' : '') + className;
                }
                return this;
            },

            hasClassName: function hasClassName(className) {
                var elementClassName = this.className;
                return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
            }
        });
        return $Element;
    })();

    /**
     * Classe $Date
     **/
    micro.Classes.Date = (function() {
        function $Date(argument) {
            this.obj = argument || new Date;
        }

        $Date.prototype = new Date;
        f.etendre($Date.prototype, {
            toISOString: function toISOString() {
                return this.getUTCFullYear() + '-' + (this.getUTCMonth() + 1).toPaddedString(2) + '-' + this.getUTCDate().toPaddedString(2) + 'T' + this.getUTCHours().toPaddedString(2) + ':' + this.getUTCMinutes().toPaddedString(2) + ':' + this.getUTCSeconds().toPaddedString(2) + 'Z';
            },
            toJSON: function toJSON() {
                return this.toISOString();
            }
        });
        f.etendre($Date.prototype, $Common);
        return $Date;
    })();

    function initElement(selector) {
        if (!selector) return this;

        if (selector.nodeType) {
            return new micro.Classes.Element(selector);
        }

        if (selector === "body" && document.body) {
            return new micro.Classes.Element(document.body);
        }

        if (micro.Object.isString(selector)) {
            if (testSelectorId.test(selector)) {
                return new micro.Classes.Element(document.getElementById(selector.match(testSelectorId)[2]));
            } else {
                els = Sizzle(selector);
                if (els.length > 0) {
                    /*if (els.length === 1) {
                     return new micro.Classes.Element(els[0]);
                     } else {*/
                    return new micro.Classes.Array(els);
                    /*}*/
                } else {
                    return null;
                }
            }
        }
    }

    function init() {
        var args = Array.prototype.slice.call(arguments, 0),
            els,
            selector = args[0];
        if (selector === null || typeof(selector) === UNDEFINED_TYPE) return selector;

        if (args.length > 1) {
            return new micro.Classes.Array(args);
        }

        if (micro.Object.isNumber(selector)) {
            return new micro.Classes.Number(selector);
        }
        if (micro.Object.isArray(selector)) {
            if (!(selector instanceof micro.Classes.Array)) return new micro.Classes.Array(selector);
        }
        if (micro.Object.isString(selector)) {
            return new micro.Classes.String(selector);
        }
        if (typeof(selector.length) !== UNDEFINED_TYPE) {
            if (!(selector instanceof micro.Classes.Array)) return new micro.Classes.Array(selector);
        }
        return selector;
    }

    micro.toString = function toString() {
        return "Micro Framework v1.0 alpha - T@nu$ © 2011-2013"
    };

    micro.Range = function Range(indexDepart, indexFin) {
        var range = [];
        for (var i = indexDepart; i <= indexFin; i++) {
            range.push(i);
        }
        return $(range);
    };

    micro.f = f;
    micro.__ = micro.Global.__;
    global.$ = micro;
    global.$$ = microElement;
    global.$R = micro.Range;
})(window);
