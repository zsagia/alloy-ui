if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/aui-base-lang/aui-base-lang.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-base-lang/aui-base-lang.js",
    code: []
};
_yuitest_coverage["/build/aui-base-lang/aui-base-lang.js"].code=["AUI.add('aui-base-lang', function(A) {","var Lang = A.Lang,","	AArray = A.Array,","	AObject = A.Object,","	isArray = Lang.isArray,","	isNumber = Lang.isNumber,","	isUndefined = Lang.isUndefined,","","	owns = AObject.owns,","","	LString = A.namespace('Lang.String'),","","	STR_BLANK = '',","","	DOC = A.config.doc,","	INNER_HTML = 'innerHTML',","	REGEX_DASH = /-([a-z])/gi,","	REGEX_ESCAPE_REGEX = /([.*+?^$(){}|[\\]\\/\\\\])/g,","	REGEX_NL2BR = /\\r?\\n/g,","	REGEX_STRIP_SCRIPTS = /(?:<script.*?>)((\\n|\\r|.)*?)(?:<\\/script>)/gi,","	REGEX_STRIP_TAGS = /<\\/?[^>]+>/gi,","	REGEX_UNCAMELIZE = /([a-zA-Z][a-zA-Z])([A-Z])([a-z])/g,","	REGEX_UNCAMELIZE_REPLACE_SEPARATOR = /([a-zA-Z][a-zA-Z])([A-Z])([a-z])/g,","","	STR_AMP = '&',","	STR_CHEVRON_LEFT = '<',","	STR_ELLIPSIS = '...',","	STR_END = 'end',","	STR_HASH = '#',","	STR_MIDDLE = 'middle',","	STR_START = 'start',","	STR_ZERO = '0',","","	STR_G = 'g',","	STR_S = 's',","","	mathBuffer = ['return value ', null, ';'],","	htmlUnescapedValues = [],","","	cachedMathFn = A.cached(","		function(mathArgs) {","			mathBuffer[1] = mathArgs;","","			return new Function('value', mathBuffer.join(STR_BLANK));","		}","	),","","	MAP_HTML_CHARS_ESCAPED = {","		'&': '&amp;',","		'<': '&lt;',","		'>': '&gt;',","		'\"': '&#034;',","		'\\'': '&#039;',","		'/': '&#047;',","		'`': '&#096;'","	},","	MAP_HTML_CHARS_UNESCAPED = {};","","	for (var i in MAP_HTML_CHARS_ESCAPED) {","		if (MAP_HTML_CHARS_ESCAPED.hasOwnProperty(i)) {","			var escapedValue = MAP_HTML_CHARS_ESCAPED[i];","","			MAP_HTML_CHARS_UNESCAPED[escapedValue] = i;","","			htmlUnescapedValues.push(i);","		}","	}","","var REGEX_HTML_ESCAPE = new RegExp('[' + htmlUnescapedValues.join(STR_BLANK) + ']', 'g'),","	REGEX_HTML_UNESCAPE = /&([^;]+);/g;","","A.mix(","	LString,","	{","		camelize: A.cached(","			function(str, separator) {","				var regex = REGEX_DASH;","","				str = String(str);","","				if (separator) {","					regex = new RegExp(separator + '([a-z])', 'gi');","				}","","				return str.replace(regex, LString._camelize);","			}","		),","","		capitalize: A.cached(","			function(str) {","				if (str) {","					str = String(str);","","					str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();","				}","","				return str;","			}","		),","","		contains: function(str, searchString) {","			return str.indexOf(searchString) != -1;","		},","","		defaultValue: function(str, defaultValue) {","			if (isUndefined(str) || str == STR_BLANK) {","				if (isUndefined(defaultValue)) {","					defaultValue = STR_BLANK;","				}","","				str = defaultValue;","			}","","			return str;","		},","","		endsWith: function(str, suffix) {","			var length = (str.length - suffix.length);","","			return ((length >= 0) && (str.indexOf(suffix, length) == length));","		},","","		escapeHTML: function(str) {","			return str.replace(REGEX_HTML_ESCAPE, LString._escapeHTML);","		},","","		// Courtesy of: http://simonwillison.net/2006/Jan/20/escape/","		escapeRegEx: function(str) {","			return str.replace(REGEX_ESCAPE_REGEX, '\\\\$1');","		},","","		math: function(value, mathArgs) {","			return cachedMathFn(mathArgs)(value);","		},","","		nl2br: function(str) {","			var instance = this;","","			return String(str).replace(REGEX_NL2BR, '<br />');","		},","","		padNumber: function(num, length, precision) {","			var str = precision ? Number(num).toFixed(precision) : String(num);","			var index = str.indexOf('.');","","			if (index == -1) {","				index = str.length;","			}","","			return LString.repeat(STR_ZERO, Math.max(0, length - index)) + str;","		},","","		pluralize: function(count, singularVersion, pluralVersion) {","			var suffix;","","			if (count == 1) {","				suffix = singularVersion;","			}","			else {","				suffix = pluralVersion || singularVersion + STR_S;","			}","","			return count + ' ' + suffix;","		},","","		prefix: function(prefix, str) {","			str = String(str);","","			if (str.indexOf(prefix) !== 0) {","				str = prefix + str;","			}","","			return str;","		},","","		remove: function(str, substitute, all) {","			var re = new RegExp(LString.escapeRegEx(substitute), all ? STR_G : STR_BLANK);","","			return str.replace(re, STR_BLANK);","		},","","		removeAll: function(str, substitute) {","			return LString.remove(str, substitute, true);","		},","","		repeat: function(str, length) {","			return new Array(length + 1).join(str);","		},","","		round: function(value, precision) {","			value = Number(value);","","			if (isNumber(precision)) {","				precision = Math.pow(10, precision);","				value = Math.round(value * precision) / precision;","			}","","			return value;","		},","","		startsWith: function(str, prefix) {","			return (str.lastIndexOf(prefix, 0) === 0);","		},","","		stripScripts: function(str) {","			if (str) {","				str = String(str).replace(REGEX_STRIP_SCRIPTS, STR_BLANK);","			}","","			return str;","		},","","		stripTags: function(str) {","			var instance = this;","","			if (str) {","				str = String(str).replace(REGEX_STRIP_TAGS, STR_BLANK);","			}","","			return str;","		},","","		substr: function(str, start, length) {","			return String(str).substr(start, length);","		},","","		uncamelize: A.cached(","			function(str, separator) {","				separator = separator || ' ';","","				str = String(str);","","				str = str.replace(REGEX_UNCAMELIZE, '$1' + separator + '$2$3');","				str = str.replace(REGEX_UNCAMELIZE_REPLACE_SEPARATOR, '$1' + separator + '$2');","","				return str;","			}","		),","","		toLowerCase: function(str) {","			return String(str).toLowerCase();","		},","","		toUpperCase: function(str) {","			return String(str).toUpperCase();","		},","","		trim: Lang.trim,","","		truncate: function(str, length, where) {","			str = String(str);","","			var strLength = str.length;","","			if (str && strLength > length) {","				where = where || STR_END;","","				if (where == STR_END) {","					str = str.substr(0, length - STR_ELLIPSIS.length) + STR_ELLIPSIS;","				}","				else if (where == STR_MIDDLE) {","					var middlePoint = Math.floor(length / 2);","","					str = str.substr(0, middlePoint) + STR_ELLIPSIS + str.substr(strLength - middlePoint);","				}","				else if (where == STR_START) {","					str = STR_ELLIPSIS + str.substr(strLength - length);","				}","			}","","			return str;","		},","","		undef: function(str) {","			if (isUndefined(str)) {","				str = STR_BLANK;","			}","","			return str;","		},","","		// inspired from Google unescape entities","		unescapeEntities: function(str) {","			if (LString.contains(str, STR_AMP)) {","				if (DOC && !LString.contains(str, STR_CHEVRON_LEFT)) {","					str = LString._unescapeEntitiesUsingDom(str);","				}","				else {","					str = LString.unescapeHTML(str);","				}","			}","","			return str;","		},","","		unescapeHTML: function(str) {","			return str.replace(REGEX_HTML_UNESCAPE, LString._unescapeHTML);","		},","","		_camelize: function(match0, match1) {","			return match1.toUpperCase();","		},","","		_escapeHTML: function(match) {","			return MAP_HTML_CHARS_ESCAPED[match];","		},","","		_unescapeHTML: function(match) {","			var value = MAP_HTML_CHARS_UNESCAPED[match];","","			if (!value && entity.charAt(0) == STR_HASH) {","				var charCode = Number(STR_ZERO + entity.substr(1));","","				if (!isNaN(charCode)) {","					value = String.fromCharCode(charCode);","				}","			}","","			return value;","		},","","		_unescapeEntitiesUsingDom: function(str) {","			var el = LString._unescapeNode;","","			el[INNER_HTML] = str;","","			if (el[NORMALIZE]) {","				el[NORMALIZE]();","			}","","			str = el.firstChild.nodeValue;","","			el[INNER_HTML] = STR_BLANK;","","			return str;","		},","","		_unescapeNode: DOC.createElement('a')","	}",");","","A.mix(","	AArray,","	{","		/**","		 * Sorts an object array keeping the order of equal items. ECMA script","		 * standard does not specify the behaviour when the compare function","		 * returns the value 0;","		 */","		stableSort: function(array, sorter) {","			var i, len = array.length;","","			for (i = 0; i < len; i++) {","				array[i] = { index: i, value: array[i] };","			}","","			array.sort(","				function(a, b) {","					var result = sorter.call(array, a.value, b.value);","","					return (result === 0) ? (a.index - b.index) : result;","				}","			);","","			for (i = 0; i < len; i++) {","				array[i] = array[i].value;","			}","		}","	}",");","","A.mix(","	Lang,","	{","		emptyFn: function() {},","","		emptyFnFalse: function() {","			return false;","		},","","		emptyFnTrue: function() {","			return true;","		},","","		isGuid: function(id) {","			return String(id).indexOf(A.Env._guidp) === 0;","		},","","		toFloat: function(value, defaultValue) {","			return parseFloat(value) || defaultValue || 0;","		},","","		toInt: function(value, radix, defaultValue) {","			return parseInt(value, radix || 10) || defaultValue || 0;","		}","	}",");","","/**"," * Maps an object to an array, using the"," * return value of fn as the values for the new array."," */","","AObject.map = function(obj, fn, context) {","	var map = [];","","	for (var i in obj) {","		if (owns(obj, i)) {","			map[map.length] = fn.call(context, obj[i], i, obj);","		}","	}","","	return map;","};","","/**"," * Maps an array or object to a resulting array, using the"," * return value of fn as the values for the new array."," * Like A.each, this function can accept an object or an array."," */","","A.map = function(obj, fn, context) {","	var module = AObject;","","	if (isArray(obj)) {","		module = AArray;","	}","","	return module.map.apply(this, arguments);","};","","}, '@VERSION@' ,{skinnable:false});"];
_yuitest_coverage["/build/aui-base-lang/aui-base-lang.js"].lines = {"1":0,"2":0,"42":0,"44":0,"59":0,"60":0,"61":0,"63":0,"65":0,"69":0,"72":0,"77":0,"79":0,"81":0,"82":0,"85":0,"91":0,"92":0,"94":0,"97":0,"102":0,"106":0,"107":0,"108":0,"111":0,"114":0,"118":0,"120":0,"124":0,"129":0,"133":0,"137":0,"139":0,"143":0,"144":0,"146":0,"147":0,"150":0,"154":0,"156":0,"157":0,"160":0,"163":0,"167":0,"169":0,"170":0,"173":0,"177":0,"179":0,"183":0,"187":0,"191":0,"193":0,"194":0,"195":0,"198":0,"202":0,"206":0,"207":0,"210":0,"214":0,"216":0,"217":0,"220":0,"224":0,"229":0,"231":0,"233":0,"234":0,"236":0,"241":0,"245":0,"251":0,"253":0,"255":0,"256":0,"258":0,"259":0,"261":0,"262":0,"264":0,"266":0,"267":0,"271":0,"275":0,"276":0,"279":0,"284":0,"285":0,"286":0,"289":0,"293":0,"297":0,"301":0,"305":0,"309":0,"311":0,"312":0,"314":0,"315":0,"319":0,"323":0,"325":0,"327":0,"328":0,"331":0,"333":0,"335":0,"342":0,"351":0,"353":0,"354":0,"357":0,"359":0,"361":0,"365":0,"366":0,"372":0,"378":0,"382":0,"386":0,"390":0,"394":0,"404":0,"405":0,"407":0,"408":0,"409":0,"413":0,"422":0,"423":0,"425":0,"426":0,"429":0};
_yuitest_coverage["/build/aui-base-lang/aui-base-lang.js"].functions = {"(anonymous 2):41":0,"(anonymous 3):76":0,"(anonymous 4):90":0,"contains:101":0,"defaultValue:105":0,"endsWith:117":0,"escapeHTML:123":0,"escapeRegEx:128":0,"math:132":0,"nl2br:136":0,"padNumber:142":0,"pluralize:153":0,"prefix:166":0,"remove:176":0,"removeAll:182":0,"repeat:186":0,"round:190":0,"startsWith:201":0,"stripScripts:205":0,"stripTags:213":0,"substr:223":0,"(anonymous 5):228":0,"toLowerCase:240":0,"toUpperCase:244":0,"truncate:250":0,"undef:274":0,"unescapeEntities:283":0,"unescapeHTML:296":0,"_camelize:300":0,"_escapeHTML:304":0,"_unescapeHTML:308":0,"_unescapeEntitiesUsingDom:322":0,"(anonymous 6):358":0,"stableSort:350":0,"emptyFnFalse:377":0,"emptyFnTrue:381":0,"isGuid:385":0,"toFloat:389":0,"toInt:393":0,"map:404":0,"map:422":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-base-lang/aui-base-lang.js"].coveredLines = 134;
_yuitest_coverage["/build/aui-base-lang/aui-base-lang.js"].coveredFunctions = 42;
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 1);
AUI.add('aui-base-lang', function(A) {
_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 2);
var Lang = A.Lang,
	AArray = A.Array,
	AObject = A.Object,
	isArray = Lang.isArray,
	isNumber = Lang.isNumber,
	isUndefined = Lang.isUndefined,

	owns = AObject.owns,

	LString = A.namespace('Lang.String'),

	STR_BLANK = '',

	DOC = A.config.doc,
	INNER_HTML = 'innerHTML',
	REGEX_DASH = /-([a-z])/gi,
	REGEX_ESCAPE_REGEX = /([.*+?^$(){}|[\]\/\\])/g,
	REGEX_NL2BR = /\r?\n/g,
	REGEX_STRIP_SCRIPTS = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/gi,
	REGEX_STRIP_TAGS = /<\/?[^>]+>/gi,
	REGEX_UNCAMELIZE = /([a-zA-Z][a-zA-Z])([A-Z])([a-z])/g,
	REGEX_UNCAMELIZE_REPLACE_SEPARATOR = /([a-zA-Z][a-zA-Z])([A-Z])([a-z])/g,

	STR_AMP = '&',
	STR_CHEVRON_LEFT = '<',
	STR_ELLIPSIS = '...',
	STR_END = 'end',
	STR_HASH = '#',
	STR_MIDDLE = 'middle',
	STR_START = 'start',
	STR_ZERO = '0',

	STR_G = 'g',
	STR_S = 's',

	mathBuffer = ['return value ', null, ';'],
	htmlUnescapedValues = [],

	cachedMathFn = A.cached(
		function(mathArgs) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "(anonymous 2)", 41);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 42);
mathBuffer[1] = mathArgs;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 44);
return new Function('value', mathBuffer.join(STR_BLANK));
		}
	),

	MAP_HTML_CHARS_ESCAPED = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&#034;',
		'\'': '&#039;',
		'/': '&#047;',
		'`': '&#096;'
	},
	MAP_HTML_CHARS_UNESCAPED = {};

	_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 59);
for (var i in MAP_HTML_CHARS_ESCAPED) {
		_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 60);
if (MAP_HTML_CHARS_ESCAPED.hasOwnProperty(i)) {
			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 61);
var escapedValue = MAP_HTML_CHARS_ESCAPED[i];

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 63);
MAP_HTML_CHARS_UNESCAPED[escapedValue] = i;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 65);
htmlUnescapedValues.push(i);
		}
	}

_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 69);
var REGEX_HTML_ESCAPE = new RegExp('[' + htmlUnescapedValues.join(STR_BLANK) + ']', 'g'),
	REGEX_HTML_UNESCAPE = /&([^;]+);/g;

_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 72);
A.mix(
	LString,
	{
		camelize: A.cached(
			function(str, separator) {
				_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "(anonymous 3)", 76);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 77);
var regex = REGEX_DASH;

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 79);
str = String(str);

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 81);
if (separator) {
					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 82);
regex = new RegExp(separator + '([a-z])', 'gi');
				}

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 85);
return str.replace(regex, LString._camelize);
			}
		),

		capitalize: A.cached(
			function(str) {
				_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "(anonymous 4)", 90);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 91);
if (str) {
					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 92);
str = String(str);

					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 94);
str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
				}

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 97);
return str;
			}
		),

		contains: function(str, searchString) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "contains", 101);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 102);
return str.indexOf(searchString) != -1;
		},

		defaultValue: function(str, defaultValue) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "defaultValue", 105);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 106);
if (isUndefined(str) || str == STR_BLANK) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 107);
if (isUndefined(defaultValue)) {
					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 108);
defaultValue = STR_BLANK;
				}

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 111);
str = defaultValue;
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 114);
return str;
		},

		endsWith: function(str, suffix) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "endsWith", 117);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 118);
var length = (str.length - suffix.length);

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 120);
return ((length >= 0) && (str.indexOf(suffix, length) == length));
		},

		escapeHTML: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "escapeHTML", 123);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 124);
return str.replace(REGEX_HTML_ESCAPE, LString._escapeHTML);
		},

		// Courtesy of: http://simonwillison.net/2006/Jan/20/escape/
		escapeRegEx: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "escapeRegEx", 128);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 129);
return str.replace(REGEX_ESCAPE_REGEX, '\\$1');
		},

		math: function(value, mathArgs) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "math", 132);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 133);
return cachedMathFn(mathArgs)(value);
		},

		nl2br: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "nl2br", 136);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 137);
var instance = this;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 139);
return String(str).replace(REGEX_NL2BR, '<br />');
		},

		padNumber: function(num, length, precision) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "padNumber", 142);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 143);
var str = precision ? Number(num).toFixed(precision) : String(num);
			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 144);
var index = str.indexOf('.');

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 146);
if (index == -1) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 147);
index = str.length;
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 150);
return LString.repeat(STR_ZERO, Math.max(0, length - index)) + str;
		},

		pluralize: function(count, singularVersion, pluralVersion) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "pluralize", 153);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 154);
var suffix;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 156);
if (count == 1) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 157);
suffix = singularVersion;
			}
			else {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 160);
suffix = pluralVersion || singularVersion + STR_S;
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 163);
return count + ' ' + suffix;
		},

		prefix: function(prefix, str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "prefix", 166);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 167);
str = String(str);

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 169);
if (str.indexOf(prefix) !== 0) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 170);
str = prefix + str;
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 173);
return str;
		},

		remove: function(str, substitute, all) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "remove", 176);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 177);
var re = new RegExp(LString.escapeRegEx(substitute), all ? STR_G : STR_BLANK);

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 179);
return str.replace(re, STR_BLANK);
		},

		removeAll: function(str, substitute) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "removeAll", 182);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 183);
return LString.remove(str, substitute, true);
		},

		repeat: function(str, length) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "repeat", 186);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 187);
return new Array(length + 1).join(str);
		},

		round: function(value, precision) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "round", 190);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 191);
value = Number(value);

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 193);
if (isNumber(precision)) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 194);
precision = Math.pow(10, precision);
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 195);
value = Math.round(value * precision) / precision;
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 198);
return value;
		},

		startsWith: function(str, prefix) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "startsWith", 201);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 202);
return (str.lastIndexOf(prefix, 0) === 0);
		},

		stripScripts: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "stripScripts", 205);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 206);
if (str) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 207);
str = String(str).replace(REGEX_STRIP_SCRIPTS, STR_BLANK);
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 210);
return str;
		},

		stripTags: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "stripTags", 213);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 214);
var instance = this;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 216);
if (str) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 217);
str = String(str).replace(REGEX_STRIP_TAGS, STR_BLANK);
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 220);
return str;
		},

		substr: function(str, start, length) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "substr", 223);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 224);
return String(str).substr(start, length);
		},

		uncamelize: A.cached(
			function(str, separator) {
				_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "(anonymous 5)", 228);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 229);
separator = separator || ' ';

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 231);
str = String(str);

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 233);
str = str.replace(REGEX_UNCAMELIZE, '$1' + separator + '$2$3');
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 234);
str = str.replace(REGEX_UNCAMELIZE_REPLACE_SEPARATOR, '$1' + separator + '$2');

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 236);
return str;
			}
		),

		toLowerCase: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "toLowerCase", 240);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 241);
return String(str).toLowerCase();
		},

		toUpperCase: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "toUpperCase", 244);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 245);
return String(str).toUpperCase();
		},

		trim: Lang.trim,

		truncate: function(str, length, where) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "truncate", 250);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 251);
str = String(str);

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 253);
var strLength = str.length;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 255);
if (str && strLength > length) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 256);
where = where || STR_END;

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 258);
if (where == STR_END) {
					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 259);
str = str.substr(0, length - STR_ELLIPSIS.length) + STR_ELLIPSIS;
				}
				else {_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 261);
if (where == STR_MIDDLE) {
					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 262);
var middlePoint = Math.floor(length / 2);

					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 264);
str = str.substr(0, middlePoint) + STR_ELLIPSIS + str.substr(strLength - middlePoint);
				}
				else {_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 266);
if (where == STR_START) {
					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 267);
str = STR_ELLIPSIS + str.substr(strLength - length);
				}}}
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 271);
return str;
		},

		undef: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "undef", 274);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 275);
if (isUndefined(str)) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 276);
str = STR_BLANK;
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 279);
return str;
		},

		// inspired from Google unescape entities
		unescapeEntities: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "unescapeEntities", 283);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 284);
if (LString.contains(str, STR_AMP)) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 285);
if (DOC && !LString.contains(str, STR_CHEVRON_LEFT)) {
					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 286);
str = LString._unescapeEntitiesUsingDom(str);
				}
				else {
					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 289);
str = LString.unescapeHTML(str);
				}
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 293);
return str;
		},

		unescapeHTML: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "unescapeHTML", 296);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 297);
return str.replace(REGEX_HTML_UNESCAPE, LString._unescapeHTML);
		},

		_camelize: function(match0, match1) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "_camelize", 300);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 301);
return match1.toUpperCase();
		},

		_escapeHTML: function(match) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "_escapeHTML", 304);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 305);
return MAP_HTML_CHARS_ESCAPED[match];
		},

		_unescapeHTML: function(match) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "_unescapeHTML", 308);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 309);
var value = MAP_HTML_CHARS_UNESCAPED[match];

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 311);
if (!value && entity.charAt(0) == STR_HASH) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 312);
var charCode = Number(STR_ZERO + entity.substr(1));

				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 314);
if (!isNaN(charCode)) {
					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 315);
value = String.fromCharCode(charCode);
				}
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 319);
return value;
		},

		_unescapeEntitiesUsingDom: function(str) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "_unescapeEntitiesUsingDom", 322);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 323);
var el = LString._unescapeNode;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 325);
el[INNER_HTML] = str;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 327);
if (el[NORMALIZE]) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 328);
el[NORMALIZE]();
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 331);
str = el.firstChild.nodeValue;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 333);
el[INNER_HTML] = STR_BLANK;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 335);
return str;
		},

		_unescapeNode: DOC.createElement('a')
	}
);

_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 342);
A.mix(
	AArray,
	{
		/**
		 * Sorts an object array keeping the order of equal items. ECMA script
		 * standard does not specify the behaviour when the compare function
		 * returns the value 0;
		 */
		stableSort: function(array, sorter) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "stableSort", 350);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 351);
var i, len = array.length;

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 353);
for (i = 0; i < len; i++) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 354);
array[i] = { index: i, value: array[i] };
			}

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 357);
array.sort(
				function(a, b) {
					_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "(anonymous 6)", 358);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 359);
var result = sorter.call(array, a.value, b.value);

					_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 361);
return (result === 0) ? (a.index - b.index) : result;
				}
			);

			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 365);
for (i = 0; i < len; i++) {
				_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 366);
array[i] = array[i].value;
			}
		}
	}
);

_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 372);
A.mix(
	Lang,
	{
		emptyFn: function() {},

		emptyFnFalse: function() {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "emptyFnFalse", 377);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 378);
return false;
		},

		emptyFnTrue: function() {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "emptyFnTrue", 381);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 382);
return true;
		},

		isGuid: function(id) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "isGuid", 385);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 386);
return String(id).indexOf(A.Env._guidp) === 0;
		},

		toFloat: function(value, defaultValue) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "toFloat", 389);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 390);
return parseFloat(value) || defaultValue || 0;
		},

		toInt: function(value, radix, defaultValue) {
			_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "toInt", 393);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 394);
return parseInt(value, radix || 10) || defaultValue || 0;
		}
	}
);

/**
 * Maps an object to an array, using the
 * return value of fn as the values for the new array.
 */

_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 404);
AObject.map = function(obj, fn, context) {
	_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "map", 404);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 405);
var map = [];

	_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 407);
for (var i in obj) {
		_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 408);
if (owns(obj, i)) {
			_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 409);
map[map.length] = fn.call(context, obj[i], i, obj);
		}
	}

	_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 413);
return map;
};

/**
 * Maps an array or object to a resulting array, using the
 * return value of fn as the values for the new array.
 * Like A.each, this function can accept an object or an array.
 */

_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 422);
A.map = function(obj, fn, context) {
	_yuitest_coverfunc("/build/aui-base-lang/aui-base-lang.js", "map", 422);
_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 423);
var module = AObject;

	_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 425);
if (isArray(obj)) {
		_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 426);
module = AArray;
	}

	_yuitest_coverline("/build/aui-base-lang/aui-base-lang.js", 429);
return module.map.apply(this, arguments);
};

}, '@VERSION@' ,{skinnable:false});
