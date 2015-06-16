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
_yuitest_coverage["/build/aui-base/aui-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-base/aui-base.js",
    code: []
};
_yuitest_coverage["/build/aui-base/aui-base.js"].code=[";(function() {","	/*","	 * Alloy JavaScript Library v@VERSION@","	 * http://alloy.liferay.com/","	 *","	 * Copyright (c) 2010 Liferay Inc.","	 * http://alloy.liferay.com/LICENSE.txt","	 *","	 * Nate Cavanaugh (nathan.cavanaugh@liferay.com)","	 * Eduardo Lundgren (eduardo.lundgren@liferay.com)","	 *","	 * Attribution/Third-party licenses","	 * http://alloy.liferay.com/ATTRIBUTION.txt","	 *","	 * Date: @DATE@","	 * Revision: @REVISION@","	 */","","	YUI.AUI_config = YUI.AUI_config || {};","","	var defaults = YUI.AUI_config;","","	YUI.prototype.ready = function() {","		var instance = this;","","		var slice = Array.prototype.slice;","		var args = slice.call(arguments, 0), index = args.length - 1;","","		var fn = args[index];","","		var modules = slice.call(arguments, 0, index);","","		modules.push('event');","","		modules.push(","			function(instance) {","				var args = arguments;","","				instance.on(","					'domready',","					function() {","						fn.apply(this, args);","					}","				);","			}","		);","","		instance.use.apply(instance, modules);","	};","","	var ALLOY;","","	if (typeof A != 'undefined') {","		ALLOY = A;","	}","	else {","		ALLOY = YUI(defaults);","	}","","	var guidExtensions = function(A) {","		A.Env._guidp = ['aui', A.version, A.Env._yidx].join('_').replace(/\\./g, '_');","	};","","	guidExtensions(ALLOY);","","	var originalConfig = ALLOY.config;","","	ALLOY.config = ALLOY.merge(originalConfig, YUI.AUI_config);","","	YUI.AUI = function(o) {","		var instance = this;","","		// Need the current window, not A.config.win","		var alloyInstance = window.Alloy;","","		if (o || instance instanceof AUI) {","			var args = ALLOY.Array(arguments);","","			args.unshift(ALLOY.config);","","			var newInstance = YUI.apply(null, args);","","			AUI._uaExtensions(newInstance);","			AUI._miscExtensions(newInstance);","			AUI._guidExtensions(newInstance);","","			var WIN = newInstance.config.win;","","			if (!WIN.YUI) {","				WIN.YUI = YUI;","			}","","			if (!WIN.AUI) {","				WIN.AUI = AUI;","			}","","			if (!WIN.Alloy) {","				WIN.Alloy = newInstance;","			}","","			alloyInstance = newInstance;","		}","","		return alloyInstance;","	};","","	var AUI = YUI.AUI;","","	AUI._guidExtensions = guidExtensions;","","	var WIN = ALLOY.config.win;","","	WIN.AUI = AUI;","	WIN.Alloy = ALLOY;","","	var UA = ALLOY.UA;","","	ALLOY.mix(AUI, YUI, true, null, 2);","","	ALLOY.mix(","		AUI,","		{","			__version: '@VERSION',","","			defaults: defaults,","","			html5shiv: function(frag) {","				var instance = this;","","				var DOC = frag || ALLOY.config.doc;","","				if (UA.ie && DOC && DOC.createElement) {","					var elements = AUI.HTML5_ELEMENTS, length = elements.length;","","					while (length--) {","						DOC.createElement(elements[length]);","					}","				}","","				return frag;","			},","","			setDefaults: function(defaults) {","				var instance = this;","","				ALLOY.mix(AUI.defaults, defaults, true, null, 0, true);","				ALLOY.mix(ALLOY.config, defaults, true, null, 0, true);","			},","","			_miscExtensions: function(A) {","				var instance = this;","","				var DOC = A.config.doc;","","				/*","				* HTML5 Compatability for IE","				*/","","				AUI.html5shiv(DOC);","","				/*","				* Disable background image flickering in IE6","				*/","","				var IE = A.UA.ie;","","				if (IE && IE <= 6) {","					try {","						DOC.execCommand('BackgroundImageCache', false, true);","					}","					catch (e) {","					}","				}","			},","","			HTML5_ELEMENTS: 'abbr,article,aside,audio,canvas,command,datalist,details,figure,figcaption,footer,header,hgroup,keygen,mark,meter,nav,output,progress,section,source,summary,time,video'.split(',')","		},","		true","	);","","	AUI._miscExtensions(ALLOY);","","	/*","		UA extensions","	*/","","	(function() {","		var REGEX_VERSION_DOT = /\\./g;","","		var parseVersionNumber = function(str) {","			var count = 0;","","			return parseFloat(","				str.replace(","					REGEX_VERSION_DOT,","					function() {","						return (count++ == 1) ? '' : '.';","					}","				)","			);","		};","","		var DEFAULTS_VERSION = ['0','0'];","","		var getVersion = function(regex, userAgent) {","			var version = (userAgent.match(regex) || DEFAULTS_VERSION)[1];","","			return parseVersionNumber(version);","		};","","		var MAP_OS_SELECTORS = {","			windows: 'win',","			macintosh: 'mac'","		};","","		var BROWSERS = [","			'ie',","			'opera',","			'chrome',","			'aol',","			'camino',","			'firefox',","			'flock',","			'mozilla',","			'netscape',","			'icab',","			'konqueror',","			'safari'","		];","","		AUI._uaExtensions = function(A) {","			var nav = navigator;","","			var userAgent = nav.userAgent;","","			var UA = A.UA;","			var OS = UA.os;","","			var UAX = {","				aol: 0,","","				camino: 0,","				firefox: 0,","				flock: 0,","				mozilla: 0,","				netscape: 0,","","				icab: 0,","				konqueror: 0,","","				safari: 0,","","				browser: 0,","","				win: OS == 'windows',","				mac: OS == 'macintosh',","				rhino: OS == 'rhino',","","				agent: userAgent","			};","","			if (UA.ie) {","				UAX.aol = getVersion(/America Online Browser ([^\\s]*);/, userAgent);","			}","			else if (UA.gecko) {","				UAX.netscape = getVersion(/(Netscape|Navigator)\\/([^\\s]*)/, userAgent);","				UAX.flock = getVersion(/Flock\\/([^\\s]*)/, userAgent);","				UAX.camino = getVersion(/Camino\\/([^\\s]*)/, userAgent);","				UAX.firefox = getVersion(/Firefox\\/([^\\s]*)/, userAgent);","			}","			else if (UA.webkit) {","				UAX.safari = getVersion(/Version\\/([^\\s]*) Safari/, userAgent);","			}","			else {","				UAX.icab = getVersion(/iCab(?:\\/|\\s)?([^\\s]*)/, userAgent);","				UAX.konqueror = getVersion(/Konqueror\\/([^\\s]*)/, userAgent);","			}","","			if (!UAX.win && !UAX.mac) {","				var linux = /Linux/.test(userAgent);","				var sun = /Solaris|SunOS/.test(userAgent);","","				if (linux) {","					UA.os = 'linux';","					UAX.linux = linux;","				}","				else if (sun) {","					UA.os = 'sun';","					UAX.sun = sun;","				}","			}","","			var CONFIG = A.config,","				DOC = CONFIG.doc;","","			UAX.touch = ('ontouchstart' in DOC);","","			A.mix(UA, UAX);","","			var browserList = [];","			var versionMajor = 0;","","			var browser;","			var version;","			var uaVersionMajor;","			var uaVersionMinor;","","			var versionObj = {","				string: '',","				major: versionMajor","			};","","			var i = BROWSERS.length;","","			while (i--) {","				browser = BROWSERS[i];","				version = UA[browser];","","				if (version > 0) {","					versionMajor = parseInt(version, 10);","					uaVersionMajor = browser + versionMajor;","","					uaVersionMinor = (browser + version);","","					if (String(version).indexOf('.') > -1) {","						uaVersionMinor = uaVersionMinor.replace(/\\.(\\d).*/, '-$1');","					}","					else {","						uaVersionMinor += '-0';","					}","","					browserList.push(browser, uaVersionMajor, uaVersionMinor);","","					versionObj.string = browser + '';","					versionObj.major = versionMajor;","				}","			}","","			UA.version = versionObj;","","			UA.renderer = '';","","			var documentElement = DOC.documentElement;","","			UA.dir = documentElement.getAttribute('dir') || 'ltr';","","			if (UA.ie) {","				UA.renderer = 'trident';","			}","			else if (UA.gecko) {","				UA.renderer = 'gecko';","			}","			else if (UA.webkit) {","				UA.renderer = 'webkit';","			}","			else if (UA.opera) {","				UA.renderer = 'presto';","			}","","			A.UA = UA;","","			/*","			* Browser selectors","			*/","","			var selectors = [","				UA.renderer,","				UA.dir,","				'js'","			].concat(browserList);","","			var osSelector = MAP_OS_SELECTORS[UA.os] || UA.os;","","			selectors.push(osSelector);","","			if (UA.mobile) {","				selectors.push('mobile');","			}","","			if (UA.secure) {","				selectors.push('secure');","			}","","			if (UA.touch) {","				selectors.push('touch');","			}","","			UA.selectors = selectors.join(' ');","","			// The methods in this if block only run once across all instances","			if (!documentElement._yuid) {","				documentElement.className += ' ' + UA.selectors;","","				var vml,","					svg;","","				vml = !(svg = !!(CONFIG.win.SVGAngle || DOC.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')));","","				if (vml) {","					var div = DOC.createElement('div');","					var behaviorObj;","","					div.innerHTML = '<v:shape adj=\"1\"/>';","","					behaviorObj = div.firstChild;","","					behaviorObj.style.behavior = 'url(#default#VML)';","","					if (!(behaviorObj && typeof behaviorObj.adj == 'object')) {","						vml = false;","					}","","					div = null;","				}","","				AUI._VML = vml;","				AUI._SVG = svg;","","				A.stamp(documentElement);","			}","","			UA.vml = AUI._VML;","			UA.svg = AUI._SVG;","		};","	})();","","	AUI._uaExtensions(ALLOY);","})();","AUI.add('aui-base-core', function(A) {","var Lang = A.Lang,","	isNumber = Lang.isNumber,","	isString = Lang.isString,","","	AArray = A.Array,","	arrayIndexOf = AArray.indexOf;","","A.mix(","	AArray,","	{","		remove: function(a, from, to) {","			var rest = a.slice((to || from) + 1 || a.length);","			a.length = (from < 0) ? (a.length + from) : from;","","			return a.push.apply(a, rest);","		},","","		removeItem: function(a, item) {","			var index = arrayIndexOf(a, item);","","			return AArray.remove(a, index);","		}","	}",");","","A.fn = function(fn, context, args) {","	var wrappedFn;","	var dynamicLookup;","","	// Explicitly set function arguments","	if (!isNumber(fn)) {","		var xargs = arguments;","","		if (xargs.length > 2) {","			xargs = AArray(xargs, 2, true);","		}","","		dynamicLookup = (isString(fn) && context);","","		wrappedFn = function() {","			var method = (!dynamicLookup) ? fn : context[fn];","","			return method.apply(context || fn, xargs);","		};","	}","	else {","		// Set function arity","		var argLength = fn;","","		fn = context;","		context = args;","","		dynamicLookup = (isString(fn) && context);","","		wrappedFn = function() {","			var method = (!dynamicLookup) ? fn : context[fn];","			context = context || method;","","			var returnValue;","","			if (argLength > 0) {","				returnValue = method.apply(context, AArray(arguments, 0, true).slice(0, argLength));","			}","			else {","				returnValue = method.call(context);","			}","","			return returnValue;","		};","	}","","	return wrappedFn;","};","","}, '@VERSION@' ,{skinnable:false, requires:['aui-classnamemanager','aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop','yui-throttle']});","AUI.add('aui-base-lang', function(A) {","var Lang = A.Lang,","	AArray = A.Array,","	AObject = A.Object,","	isArray = Lang.isArray,","	isNumber = Lang.isNumber,","	isUndefined = Lang.isUndefined,","","	owns = AObject.owns,","","	LString = A.namespace('Lang.String'),","","	STR_BLANK = '',","","	DOC = A.config.doc,","	INNER_HTML = 'innerHTML',","	REGEX_DASH = /-([a-z])/gi,","	REGEX_ESCAPE_REGEX = /([.*+?^$(){}|[\\]\\/\\\\])/g,","	REGEX_NL2BR = /\\r?\\n/g,","	REGEX_STRIP_SCRIPTS = /(?:<script.*?>)((\\n|\\r|.)*?)(?:<\\/script>)/gi,","	REGEX_STRIP_TAGS = /<\\/?[^>]+>/gi,","	REGEX_UNCAMELIZE = /([a-zA-Z][a-zA-Z])([A-Z])([a-z])/g,","	REGEX_UNCAMELIZE_REPLACE_SEPARATOR = /([a-zA-Z][a-zA-Z])([A-Z])([a-z])/g,","","	STR_AMP = '&',","	STR_CHEVRON_LEFT = '<',","	STR_ELLIPSIS = '...',","	STR_END = 'end',","	STR_HASH = '#',","	STR_MIDDLE = 'middle',","	STR_START = 'start',","	STR_ZERO = '0',","","	STR_G = 'g',","	STR_S = 's',","","	mathBuffer = ['return value ', null, ';'],","	htmlUnescapedValues = [],","","	cachedMathFn = A.cached(","		function(mathArgs) {","			mathBuffer[1] = mathArgs;","","			return new Function('value', mathBuffer.join(STR_BLANK));","		}","	),","","	MAP_HTML_CHARS_ESCAPED = {","		'&': '&amp;',","		'<': '&lt;',","		'>': '&gt;',","		'\"': '&#034;',","		'\\'': '&#039;',","		'/': '&#047;',","		'`': '&#096;'","	},","	MAP_HTML_CHARS_UNESCAPED = {};","","	for (var i in MAP_HTML_CHARS_ESCAPED) {","		if (MAP_HTML_CHARS_ESCAPED.hasOwnProperty(i)) {","			var escapedValue = MAP_HTML_CHARS_ESCAPED[i];","","			MAP_HTML_CHARS_UNESCAPED[escapedValue] = i;","","			htmlUnescapedValues.push(i);","		}","	}","","var REGEX_HTML_ESCAPE = new RegExp('[' + htmlUnescapedValues.join(STR_BLANK) + ']', 'g'),","	REGEX_HTML_UNESCAPE = /&([^;]+);/g;","","A.mix(","	LString,","	{","		camelize: A.cached(","			function(str, separator) {","				var regex = REGEX_DASH;","","				str = String(str);","","				if (separator) {","					regex = new RegExp(separator + '([a-z])', 'gi');","				}","","				return str.replace(regex, LString._camelize);","			}","		),","","		capitalize: A.cached(","			function(str) {","				if (str) {","					str = String(str);","","					str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();","				}","","				return str;","			}","		),","","		contains: function(str, searchString) {","			return str.indexOf(searchString) != -1;","		},","","		defaultValue: function(str, defaultValue) {","			if (isUndefined(str) || str == STR_BLANK) {","				if (isUndefined(defaultValue)) {","					defaultValue = STR_BLANK;","				}","","				str = defaultValue;","			}","","			return str;","		},","","		endsWith: function(str, suffix) {","			var length = (str.length - suffix.length);","","			return ((length >= 0) && (str.indexOf(suffix, length) == length));","		},","","		escapeHTML: function(str) {","			return str.replace(REGEX_HTML_ESCAPE, LString._escapeHTML);","		},","","		// Courtesy of: http://simonwillison.net/2006/Jan/20/escape/","		escapeRegEx: function(str) {","			return str.replace(REGEX_ESCAPE_REGEX, '\\\\$1');","		},","","		math: function(value, mathArgs) {","			return cachedMathFn(mathArgs)(value);","		},","","		nl2br: function(str) {","			var instance = this;","","			return String(str).replace(REGEX_NL2BR, '<br />');","		},","","		padNumber: function(num, length, precision) {","			var str = precision ? Number(num).toFixed(precision) : String(num);","			var index = str.indexOf('.');","","			if (index == -1) {","				index = str.length;","			}","","			return LString.repeat(STR_ZERO, Math.max(0, length - index)) + str;","		},","","		pluralize: function(count, singularVersion, pluralVersion) {","			var suffix;","","			if (count == 1) {","				suffix = singularVersion;","			}","			else {","				suffix = pluralVersion || singularVersion + STR_S;","			}","","			return count + ' ' + suffix;","		},","","		prefix: function(prefix, str) {","			str = String(str);","","			if (str.indexOf(prefix) !== 0) {","				str = prefix + str;","			}","","			return str;","		},","","		remove: function(str, substitute, all) {","			var re = new RegExp(LString.escapeRegEx(substitute), all ? STR_G : STR_BLANK);","","			return str.replace(re, STR_BLANK);","		},","","		removeAll: function(str, substitute) {","			return LString.remove(str, substitute, true);","		},","","		repeat: function(str, length) {","			return new Array(length + 1).join(str);","		},","","		round: function(value, precision) {","			value = Number(value);","","			if (isNumber(precision)) {","				precision = Math.pow(10, precision);","				value = Math.round(value * precision) / precision;","			}","","			return value;","		},","","		startsWith: function(str, prefix) {","			return (str.lastIndexOf(prefix, 0) === 0);","		},","","		stripScripts: function(str) {","			if (str) {","				str = String(str).replace(REGEX_STRIP_SCRIPTS, STR_BLANK);","			}","","			return str;","		},","","		stripTags: function(str) {","			var instance = this;","","			if (str) {","				str = String(str).replace(REGEX_STRIP_TAGS, STR_BLANK);","			}","","			return str;","		},","","		substr: function(str, start, length) {","			return String(str).substr(start, length);","		},","","		uncamelize: A.cached(","			function(str, separator) {","				separator = separator || ' ';","","				str = String(str);","","				str = str.replace(REGEX_UNCAMELIZE, '$1' + separator + '$2$3');","				str = str.replace(REGEX_UNCAMELIZE_REPLACE_SEPARATOR, '$1' + separator + '$2');","","				return str;","			}","		),","","		toLowerCase: function(str) {","			return String(str).toLowerCase();","		},","","		toUpperCase: function(str) {","			return String(str).toUpperCase();","		},","","		trim: Lang.trim,","","		truncate: function(str, length, where) {","			str = String(str);","","			var strLength = str.length;","","			if (str && strLength > length) {","				where = where || STR_END;","","				if (where == STR_END) {","					str = str.substr(0, length - STR_ELLIPSIS.length) + STR_ELLIPSIS;","				}","				else if (where == STR_MIDDLE) {","					var middlePoint = Math.floor(length / 2);","","					str = str.substr(0, middlePoint) + STR_ELLIPSIS + str.substr(strLength - middlePoint);","				}","				else if (where == STR_START) {","					str = STR_ELLIPSIS + str.substr(strLength - length);","				}","			}","","			return str;","		},","","		undef: function(str) {","			if (isUndefined(str)) {","				str = STR_BLANK;","			}","","			return str;","		},","","		// inspired from Google unescape entities","		unescapeEntities: function(str) {","			if (LString.contains(str, STR_AMP)) {","				if (DOC && !LString.contains(str, STR_CHEVRON_LEFT)) {","					str = LString._unescapeEntitiesUsingDom(str);","				}","				else {","					str = LString.unescapeHTML(str);","				}","			}","","			return str;","		},","","		unescapeHTML: function(str) {","			return str.replace(REGEX_HTML_UNESCAPE, LString._unescapeHTML);","		},","","		_camelize: function(match0, match1) {","			return match1.toUpperCase();","		},","","		_escapeHTML: function(match) {","			return MAP_HTML_CHARS_ESCAPED[match];","		},","","		_unescapeHTML: function(match) {","			var value = MAP_HTML_CHARS_UNESCAPED[match];","","			if (!value && entity.charAt(0) == STR_HASH) {","				var charCode = Number(STR_ZERO + entity.substr(1));","","				if (!isNaN(charCode)) {","					value = String.fromCharCode(charCode);","				}","			}","","			return value;","		},","","		_unescapeEntitiesUsingDom: function(str) {","			var el = LString._unescapeNode;","","			el[INNER_HTML] = str;","","			if (el[NORMALIZE]) {","				el[NORMALIZE]();","			}","","			str = el.firstChild.nodeValue;","","			el[INNER_HTML] = STR_BLANK;","","			return str;","		},","","		_unescapeNode: DOC.createElement('a')","	}",");","","A.mix(","	AArray,","	{","		/**","		 * Sorts an object array keeping the order of equal items. ECMA script","		 * standard does not specify the behaviour when the compare function","		 * returns the value 0;","		 */","		stableSort: function(array, sorter) {","			var i, len = array.length;","","			for (i = 0; i < len; i++) {","				array[i] = { index: i, value: array[i] };","			}","","			array.sort(","				function(a, b) {","					var result = sorter.call(array, a.value, b.value);","","					return (result === 0) ? (a.index - b.index) : result;","				}","			);","","			for (i = 0; i < len; i++) {","				array[i] = array[i].value;","			}","		}","	}",");","","A.mix(","	Lang,","	{","		emptyFn: function() {},","","		emptyFnFalse: function() {","			return false;","		},","","		emptyFnTrue: function() {","			return true;","		},","","		isGuid: function(id) {","			return String(id).indexOf(A.Env._guidp) === 0;","		},","","		toFloat: function(value, defaultValue) {","			return parseFloat(value) || defaultValue || 0;","		},","","		toInt: function(value, radix, defaultValue) {","			return parseInt(value, radix || 10) || defaultValue || 0;","		}","	}",");","","/**"," * Maps an object to an array, using the"," * return value of fn as the values for the new array."," */","","AObject.map = function(obj, fn, context) {","	var map = [];","","	for (var i in obj) {","		if (owns(obj, i)) {","			map[map.length] = fn.call(context, obj[i], i, obj);","		}","	}","","	return map;","};","","/**"," * Maps an array or object to a resulting array, using the"," * return value of fn as the values for the new array."," * Like A.each, this function can accept an object or an array."," */","","A.map = function(obj, fn, context) {","	var module = AObject;","","	if (isArray(obj)) {","		module = AArray;","	}","","	return module.map.apply(this, arguments);","};","","}, '@VERSION@' ,{skinnable:false});","","","AUI.add('aui-base', function(A){}, '@VERSION@' ,{use:['aui-base-core','aui-base-lang'], skinnable:false});",""];
_yuitest_coverage["/build/aui-base/aui-base.js"].lines = {"1":0,"19":0,"21":0,"23":0,"24":0,"26":0,"27":0,"29":0,"31":0,"33":0,"35":0,"37":0,"39":0,"42":0,"48":0,"51":0,"53":0,"54":0,"57":0,"60":0,"61":0,"64":0,"66":0,"68":0,"70":0,"71":0,"74":0,"76":0,"77":0,"79":0,"81":0,"83":0,"84":0,"85":0,"87":0,"89":0,"90":0,"93":0,"94":0,"97":0,"98":0,"101":0,"104":0,"107":0,"109":0,"111":0,"113":0,"114":0,"116":0,"118":0,"120":0,"128":0,"130":0,"132":0,"133":0,"135":0,"136":0,"140":0,"144":0,"146":0,"147":0,"151":0,"153":0,"159":0,"165":0,"167":0,"168":0,"169":0,"181":0,"187":0,"188":0,"190":0,"191":0,"193":0,"197":0,"203":0,"205":0,"206":0,"208":0,"211":0,"216":0,"231":0,"232":0,"234":0,"236":0,"237":0,"239":0,"262":0,"263":0,"265":0,"266":0,"267":0,"268":0,"269":0,"271":0,"272":0,"275":0,"276":0,"279":0,"280":0,"281":0,"283":0,"284":0,"285":0,"287":0,"288":0,"289":0,"293":0,"296":0,"298":0,"300":0,"301":0,"303":0,"304":0,"305":0,"306":0,"308":0,"313":0,"315":0,"316":0,"317":0,"319":0,"320":0,"321":0,"323":0,"325":0,"326":0,"329":0,"332":0,"334":0,"335":0,"339":0,"341":0,"343":0,"345":0,"347":0,"348":0,"350":0,"351":0,"353":0,"354":0,"356":0,"357":0,"360":0,"366":0,"372":0,"374":0,"376":0,"377":0,"380":0,"381":0,"384":0,"385":0,"388":0,"391":0,"392":0,"394":0,"397":0,"399":0,"400":0,"401":0,"403":0,"405":0,"407":0,"409":0,"410":0,"413":0,"416":0,"417":0,"419":0,"422":0,"423":0,"427":0,"429":0,"430":0,"437":0,"441":0,"442":0,"444":0,"448":0,"450":0,"455":0,"456":0,"457":0,"460":0,"461":0,"463":0,"464":0,"467":0,"469":0,"470":0,"472":0,"477":0,"479":0,"480":0,"482":0,"484":0,"485":0,"486":0,"488":0,"490":0,"491":0,"494":0,"497":0,"501":0,"505":0,"506":0,"546":0,"548":0,"563":0,"564":0,"565":0,"567":0,"569":0,"573":0,"576":0,"581":0,"583":0,"585":0,"586":0,"589":0,"595":0,"596":0,"598":0,"601":0,"606":0,"610":0,"611":0,"612":0,"615":0,"618":0,"622":0,"624":0,"628":0,"633":0,"637":0,"641":0,"643":0,"647":0,"648":0,"650":0,"651":0,"654":0,"658":0,"660":0,"661":0,"664":0,"667":0,"671":0,"673":0,"674":0,"677":0,"681":0,"683":0,"687":0,"691":0,"695":0,"697":0,"698":0,"699":0,"702":0,"706":0,"710":0,"711":0,"714":0,"718":0,"720":0,"721":0,"724":0,"728":0,"733":0,"735":0,"737":0,"738":0,"740":0,"745":0,"749":0,"755":0,"757":0,"759":0,"760":0,"762":0,"763":0,"765":0,"766":0,"768":0,"770":0,"771":0,"775":0,"779":0,"780":0,"783":0,"788":0,"789":0,"790":0,"793":0,"797":0,"801":0,"805":0,"809":0,"813":0,"815":0,"816":0,"818":0,"819":0,"823":0,"827":0,"829":0,"831":0,"832":0,"835":0,"837":0,"839":0,"846":0,"855":0,"857":0,"858":0,"861":0,"863":0,"865":0,"869":0,"870":0,"876":0,"882":0,"886":0,"890":0,"894":0,"898":0,"908":0,"909":0,"911":0,"912":0,"913":0,"917":0,"926":0,"927":0,"929":0,"930":0,"933":0,"939":0};
_yuitest_coverage["/build/aui-base/aui-base.js"].functions = {"(anonymous 3):41":0,"(anonymous 2):36":0,"ready:23":0,"guidExtensions:60":0,"AUI:70":0,"html5shiv:127":0,"setDefaults:143":0,"_miscExtensions:150":0,"(anonymous 5):196":0,"parseVersionNumber:190":0,"getVersion:205":0,"_uaExtensions:231":0,"(anonymous 4):187":0,"(anonymous 1):1":0,"remove:440":0,"removeItem:447":0,"wrappedFn:469":0,"wrappedFn:484":0,"fn:455":0,"(anonymous 6):429":0,"(anonymous 8):545":0,"(anonymous 9):580":0,"(anonymous 10):594":0,"contains:605":0,"defaultValue:609":0,"endsWith:621":0,"escapeHTML:627":0,"escapeRegEx:632":0,"math:636":0,"nl2br:640":0,"padNumber:646":0,"pluralize:657":0,"prefix:670":0,"remove:680":0,"removeAll:686":0,"repeat:690":0,"round:694":0,"startsWith:705":0,"stripScripts:709":0,"stripTags:717":0,"substr:727":0,"(anonymous 11):732":0,"toLowerCase:744":0,"toUpperCase:748":0,"truncate:754":0,"undef:778":0,"unescapeEntities:787":0,"unescapeHTML:800":0,"_camelize:804":0,"_escapeHTML:808":0,"_unescapeHTML:812":0,"_unescapeEntitiesUsingDom:826":0,"(anonymous 12):862":0,"stableSort:854":0,"emptyFnFalse:881":0,"emptyFnTrue:885":0,"isGuid:889":0,"toFloat:893":0,"toInt:897":0,"map:908":0,"map:926":0,"(anonymous 7):505":0};
_yuitest_coverage["/build/aui-base/aui-base.js"].coveredLines = 340;
_yuitest_coverage["/build/aui-base/aui-base.js"].coveredFunctions = 62;
_yuitest_coverline("/build/aui-base/aui-base.js", 1);
;(function() {
	/*
	 * Alloy JavaScript Library v@VERSION@
	 * http://alloy.liferay.com/
	 *
	 * Copyright (c) 2010 Liferay Inc.
	 * http://alloy.liferay.com/LICENSE.txt
	 *
	 * Nate Cavanaugh (nathan.cavanaugh@liferay.com)
	 * Eduardo Lundgren (eduardo.lundgren@liferay.com)
	 *
	 * Attribution/Third-party licenses
	 * http://alloy.liferay.com/ATTRIBUTION.txt
	 *
	 * Date: @DATE@
	 * Revision: @REVISION@
	 */

	_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-base/aui-base.js", 19);
YUI.AUI_config = YUI.AUI_config || {};

	_yuitest_coverline("/build/aui-base/aui-base.js", 21);
var defaults = YUI.AUI_config;

	_yuitest_coverline("/build/aui-base/aui-base.js", 23);
YUI.prototype.ready = function() {
		_yuitest_coverfunc("/build/aui-base/aui-base.js", "ready", 23);
_yuitest_coverline("/build/aui-base/aui-base.js", 24);
var instance = this;

		_yuitest_coverline("/build/aui-base/aui-base.js", 26);
var slice = Array.prototype.slice;
		_yuitest_coverline("/build/aui-base/aui-base.js", 27);
var args = slice.call(arguments, 0), index = args.length - 1;

		_yuitest_coverline("/build/aui-base/aui-base.js", 29);
var fn = args[index];

		_yuitest_coverline("/build/aui-base/aui-base.js", 31);
var modules = slice.call(arguments, 0, index);

		_yuitest_coverline("/build/aui-base/aui-base.js", 33);
modules.push('event');

		_yuitest_coverline("/build/aui-base/aui-base.js", 35);
modules.push(
			function(instance) {
				_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 2)", 36);
_yuitest_coverline("/build/aui-base/aui-base.js", 37);
var args = arguments;

				_yuitest_coverline("/build/aui-base/aui-base.js", 39);
instance.on(
					'domready',
					function() {
						_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 3)", 41);
_yuitest_coverline("/build/aui-base/aui-base.js", 42);
fn.apply(this, args);
					}
				);
			}
		);

		_yuitest_coverline("/build/aui-base/aui-base.js", 48);
instance.use.apply(instance, modules);
	};

	_yuitest_coverline("/build/aui-base/aui-base.js", 51);
var ALLOY;

	_yuitest_coverline("/build/aui-base/aui-base.js", 53);
if (typeof A != 'undefined') {
		_yuitest_coverline("/build/aui-base/aui-base.js", 54);
ALLOY = A;
	}
	else {
		_yuitest_coverline("/build/aui-base/aui-base.js", 57);
ALLOY = YUI(defaults);
	}

	_yuitest_coverline("/build/aui-base/aui-base.js", 60);
var guidExtensions = function(A) {
		_yuitest_coverfunc("/build/aui-base/aui-base.js", "guidExtensions", 60);
_yuitest_coverline("/build/aui-base/aui-base.js", 61);
A.Env._guidp = ['aui', A.version, A.Env._yidx].join('_').replace(/\./g, '_');
	};

	_yuitest_coverline("/build/aui-base/aui-base.js", 64);
guidExtensions(ALLOY);

	_yuitest_coverline("/build/aui-base/aui-base.js", 66);
var originalConfig = ALLOY.config;

	_yuitest_coverline("/build/aui-base/aui-base.js", 68);
ALLOY.config = ALLOY.merge(originalConfig, YUI.AUI_config);

	_yuitest_coverline("/build/aui-base/aui-base.js", 70);
YUI.AUI = function(o) {
		_yuitest_coverfunc("/build/aui-base/aui-base.js", "AUI", 70);
_yuitest_coverline("/build/aui-base/aui-base.js", 71);
var instance = this;

		// Need the current window, not A.config.win
		_yuitest_coverline("/build/aui-base/aui-base.js", 74);
var alloyInstance = window.Alloy;

		_yuitest_coverline("/build/aui-base/aui-base.js", 76);
if (o || instance instanceof AUI) {
			_yuitest_coverline("/build/aui-base/aui-base.js", 77);
var args = ALLOY.Array(arguments);

			_yuitest_coverline("/build/aui-base/aui-base.js", 79);
args.unshift(ALLOY.config);

			_yuitest_coverline("/build/aui-base/aui-base.js", 81);
var newInstance = YUI.apply(null, args);

			_yuitest_coverline("/build/aui-base/aui-base.js", 83);
AUI._uaExtensions(newInstance);
			_yuitest_coverline("/build/aui-base/aui-base.js", 84);
AUI._miscExtensions(newInstance);
			_yuitest_coverline("/build/aui-base/aui-base.js", 85);
AUI._guidExtensions(newInstance);

			_yuitest_coverline("/build/aui-base/aui-base.js", 87);
var WIN = newInstance.config.win;

			_yuitest_coverline("/build/aui-base/aui-base.js", 89);
if (!WIN.YUI) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 90);
WIN.YUI = YUI;
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 93);
if (!WIN.AUI) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 94);
WIN.AUI = AUI;
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 97);
if (!WIN.Alloy) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 98);
WIN.Alloy = newInstance;
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 101);
alloyInstance = newInstance;
		}

		_yuitest_coverline("/build/aui-base/aui-base.js", 104);
return alloyInstance;
	};

	_yuitest_coverline("/build/aui-base/aui-base.js", 107);
var AUI = YUI.AUI;

	_yuitest_coverline("/build/aui-base/aui-base.js", 109);
AUI._guidExtensions = guidExtensions;

	_yuitest_coverline("/build/aui-base/aui-base.js", 111);
var WIN = ALLOY.config.win;

	_yuitest_coverline("/build/aui-base/aui-base.js", 113);
WIN.AUI = AUI;
	_yuitest_coverline("/build/aui-base/aui-base.js", 114);
WIN.Alloy = ALLOY;

	_yuitest_coverline("/build/aui-base/aui-base.js", 116);
var UA = ALLOY.UA;

	_yuitest_coverline("/build/aui-base/aui-base.js", 118);
ALLOY.mix(AUI, YUI, true, null, 2);

	_yuitest_coverline("/build/aui-base/aui-base.js", 120);
ALLOY.mix(
		AUI,
		{
			__version: '@VERSION',

			defaults: defaults,

			html5shiv: function(frag) {
				_yuitest_coverfunc("/build/aui-base/aui-base.js", "html5shiv", 127);
_yuitest_coverline("/build/aui-base/aui-base.js", 128);
var instance = this;

				_yuitest_coverline("/build/aui-base/aui-base.js", 130);
var DOC = frag || ALLOY.config.doc;

				_yuitest_coverline("/build/aui-base/aui-base.js", 132);
if (UA.ie && DOC && DOC.createElement) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 133);
var elements = AUI.HTML5_ELEMENTS, length = elements.length;

					_yuitest_coverline("/build/aui-base/aui-base.js", 135);
while (length--) {
						_yuitest_coverline("/build/aui-base/aui-base.js", 136);
DOC.createElement(elements[length]);
					}
				}

				_yuitest_coverline("/build/aui-base/aui-base.js", 140);
return frag;
			},

			setDefaults: function(defaults) {
				_yuitest_coverfunc("/build/aui-base/aui-base.js", "setDefaults", 143);
_yuitest_coverline("/build/aui-base/aui-base.js", 144);
var instance = this;

				_yuitest_coverline("/build/aui-base/aui-base.js", 146);
ALLOY.mix(AUI.defaults, defaults, true, null, 0, true);
				_yuitest_coverline("/build/aui-base/aui-base.js", 147);
ALLOY.mix(ALLOY.config, defaults, true, null, 0, true);
			},

			_miscExtensions: function(A) {
				_yuitest_coverfunc("/build/aui-base/aui-base.js", "_miscExtensions", 150);
_yuitest_coverline("/build/aui-base/aui-base.js", 151);
var instance = this;

				_yuitest_coverline("/build/aui-base/aui-base.js", 153);
var DOC = A.config.doc;

				/*
				* HTML5 Compatability for IE
				*/

				_yuitest_coverline("/build/aui-base/aui-base.js", 159);
AUI.html5shiv(DOC);

				/*
				* Disable background image flickering in IE6
				*/

				_yuitest_coverline("/build/aui-base/aui-base.js", 165);
var IE = A.UA.ie;

				_yuitest_coverline("/build/aui-base/aui-base.js", 167);
if (IE && IE <= 6) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 168);
try {
						_yuitest_coverline("/build/aui-base/aui-base.js", 169);
DOC.execCommand('BackgroundImageCache', false, true);
					}
					catch (e) {
					}
				}
			},

			HTML5_ELEMENTS: 'abbr,article,aside,audio,canvas,command,datalist,details,figure,figcaption,footer,header,hgroup,keygen,mark,meter,nav,output,progress,section,source,summary,time,video'.split(',')
		},
		true
	);

	_yuitest_coverline("/build/aui-base/aui-base.js", 181);
AUI._miscExtensions(ALLOY);

	/*
		UA extensions
	*/

	_yuitest_coverline("/build/aui-base/aui-base.js", 187);
(function() {
		_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 4)", 187);
_yuitest_coverline("/build/aui-base/aui-base.js", 188);
var REGEX_VERSION_DOT = /\./g;

		_yuitest_coverline("/build/aui-base/aui-base.js", 190);
var parseVersionNumber = function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "parseVersionNumber", 190);
_yuitest_coverline("/build/aui-base/aui-base.js", 191);
var count = 0;

			_yuitest_coverline("/build/aui-base/aui-base.js", 193);
return parseFloat(
				str.replace(
					REGEX_VERSION_DOT,
					function() {
						_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 5)", 196);
_yuitest_coverline("/build/aui-base/aui-base.js", 197);
return (count++ == 1) ? '' : '.';
					}
				)
			);
		};

		_yuitest_coverline("/build/aui-base/aui-base.js", 203);
var DEFAULTS_VERSION = ['0','0'];

		_yuitest_coverline("/build/aui-base/aui-base.js", 205);
var getVersion = function(regex, userAgent) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "getVersion", 205);
_yuitest_coverline("/build/aui-base/aui-base.js", 206);
var version = (userAgent.match(regex) || DEFAULTS_VERSION)[1];

			_yuitest_coverline("/build/aui-base/aui-base.js", 208);
return parseVersionNumber(version);
		};

		_yuitest_coverline("/build/aui-base/aui-base.js", 211);
var MAP_OS_SELECTORS = {
			windows: 'win',
			macintosh: 'mac'
		};

		_yuitest_coverline("/build/aui-base/aui-base.js", 216);
var BROWSERS = [
			'ie',
			'opera',
			'chrome',
			'aol',
			'camino',
			'firefox',
			'flock',
			'mozilla',
			'netscape',
			'icab',
			'konqueror',
			'safari'
		];

		_yuitest_coverline("/build/aui-base/aui-base.js", 231);
AUI._uaExtensions = function(A) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "_uaExtensions", 231);
_yuitest_coverline("/build/aui-base/aui-base.js", 232);
var nav = navigator;

			_yuitest_coverline("/build/aui-base/aui-base.js", 234);
var userAgent = nav.userAgent;

			_yuitest_coverline("/build/aui-base/aui-base.js", 236);
var UA = A.UA;
			_yuitest_coverline("/build/aui-base/aui-base.js", 237);
var OS = UA.os;

			_yuitest_coverline("/build/aui-base/aui-base.js", 239);
var UAX = {
				aol: 0,

				camino: 0,
				firefox: 0,
				flock: 0,
				mozilla: 0,
				netscape: 0,

				icab: 0,
				konqueror: 0,

				safari: 0,

				browser: 0,

				win: OS == 'windows',
				mac: OS == 'macintosh',
				rhino: OS == 'rhino',

				agent: userAgent
			};

			_yuitest_coverline("/build/aui-base/aui-base.js", 262);
if (UA.ie) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 263);
UAX.aol = getVersion(/America Online Browser ([^\s]*);/, userAgent);
			}
			else {_yuitest_coverline("/build/aui-base/aui-base.js", 265);
if (UA.gecko) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 266);
UAX.netscape = getVersion(/(Netscape|Navigator)\/([^\s]*)/, userAgent);
				_yuitest_coverline("/build/aui-base/aui-base.js", 267);
UAX.flock = getVersion(/Flock\/([^\s]*)/, userAgent);
				_yuitest_coverline("/build/aui-base/aui-base.js", 268);
UAX.camino = getVersion(/Camino\/([^\s]*)/, userAgent);
				_yuitest_coverline("/build/aui-base/aui-base.js", 269);
UAX.firefox = getVersion(/Firefox\/([^\s]*)/, userAgent);
			}
			else {_yuitest_coverline("/build/aui-base/aui-base.js", 271);
if (UA.webkit) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 272);
UAX.safari = getVersion(/Version\/([^\s]*) Safari/, userAgent);
			}
			else {
				_yuitest_coverline("/build/aui-base/aui-base.js", 275);
UAX.icab = getVersion(/iCab(?:\/|\s)?([^\s]*)/, userAgent);
				_yuitest_coverline("/build/aui-base/aui-base.js", 276);
UAX.konqueror = getVersion(/Konqueror\/([^\s]*)/, userAgent);
			}}}

			_yuitest_coverline("/build/aui-base/aui-base.js", 279);
if (!UAX.win && !UAX.mac) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 280);
var linux = /Linux/.test(userAgent);
				_yuitest_coverline("/build/aui-base/aui-base.js", 281);
var sun = /Solaris|SunOS/.test(userAgent);

				_yuitest_coverline("/build/aui-base/aui-base.js", 283);
if (linux) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 284);
UA.os = 'linux';
					_yuitest_coverline("/build/aui-base/aui-base.js", 285);
UAX.linux = linux;
				}
				else {_yuitest_coverline("/build/aui-base/aui-base.js", 287);
if (sun) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 288);
UA.os = 'sun';
					_yuitest_coverline("/build/aui-base/aui-base.js", 289);
UAX.sun = sun;
				}}
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 293);
var CONFIG = A.config,
				DOC = CONFIG.doc;

			_yuitest_coverline("/build/aui-base/aui-base.js", 296);
UAX.touch = ('ontouchstart' in DOC);

			_yuitest_coverline("/build/aui-base/aui-base.js", 298);
A.mix(UA, UAX);

			_yuitest_coverline("/build/aui-base/aui-base.js", 300);
var browserList = [];
			_yuitest_coverline("/build/aui-base/aui-base.js", 301);
var versionMajor = 0;

			_yuitest_coverline("/build/aui-base/aui-base.js", 303);
var browser;
			_yuitest_coverline("/build/aui-base/aui-base.js", 304);
var version;
			_yuitest_coverline("/build/aui-base/aui-base.js", 305);
var uaVersionMajor;
			_yuitest_coverline("/build/aui-base/aui-base.js", 306);
var uaVersionMinor;

			_yuitest_coverline("/build/aui-base/aui-base.js", 308);
var versionObj = {
				string: '',
				major: versionMajor
			};

			_yuitest_coverline("/build/aui-base/aui-base.js", 313);
var i = BROWSERS.length;

			_yuitest_coverline("/build/aui-base/aui-base.js", 315);
while (i--) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 316);
browser = BROWSERS[i];
				_yuitest_coverline("/build/aui-base/aui-base.js", 317);
version = UA[browser];

				_yuitest_coverline("/build/aui-base/aui-base.js", 319);
if (version > 0) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 320);
versionMajor = parseInt(version, 10);
					_yuitest_coverline("/build/aui-base/aui-base.js", 321);
uaVersionMajor = browser + versionMajor;

					_yuitest_coverline("/build/aui-base/aui-base.js", 323);
uaVersionMinor = (browser + version);

					_yuitest_coverline("/build/aui-base/aui-base.js", 325);
if (String(version).indexOf('.') > -1) {
						_yuitest_coverline("/build/aui-base/aui-base.js", 326);
uaVersionMinor = uaVersionMinor.replace(/\.(\d).*/, '-$1');
					}
					else {
						_yuitest_coverline("/build/aui-base/aui-base.js", 329);
uaVersionMinor += '-0';
					}

					_yuitest_coverline("/build/aui-base/aui-base.js", 332);
browserList.push(browser, uaVersionMajor, uaVersionMinor);

					_yuitest_coverline("/build/aui-base/aui-base.js", 334);
versionObj.string = browser + '';
					_yuitest_coverline("/build/aui-base/aui-base.js", 335);
versionObj.major = versionMajor;
				}
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 339);
UA.version = versionObj;

			_yuitest_coverline("/build/aui-base/aui-base.js", 341);
UA.renderer = '';

			_yuitest_coverline("/build/aui-base/aui-base.js", 343);
var documentElement = DOC.documentElement;

			_yuitest_coverline("/build/aui-base/aui-base.js", 345);
UA.dir = documentElement.getAttribute('dir') || 'ltr';

			_yuitest_coverline("/build/aui-base/aui-base.js", 347);
if (UA.ie) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 348);
UA.renderer = 'trident';
			}
			else {_yuitest_coverline("/build/aui-base/aui-base.js", 350);
if (UA.gecko) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 351);
UA.renderer = 'gecko';
			}
			else {_yuitest_coverline("/build/aui-base/aui-base.js", 353);
if (UA.webkit) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 354);
UA.renderer = 'webkit';
			}
			else {_yuitest_coverline("/build/aui-base/aui-base.js", 356);
if (UA.opera) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 357);
UA.renderer = 'presto';
			}}}}

			_yuitest_coverline("/build/aui-base/aui-base.js", 360);
A.UA = UA;

			/*
			* Browser selectors
			*/

			_yuitest_coverline("/build/aui-base/aui-base.js", 366);
var selectors = [
				UA.renderer,
				UA.dir,
				'js'
			].concat(browserList);

			_yuitest_coverline("/build/aui-base/aui-base.js", 372);
var osSelector = MAP_OS_SELECTORS[UA.os] || UA.os;

			_yuitest_coverline("/build/aui-base/aui-base.js", 374);
selectors.push(osSelector);

			_yuitest_coverline("/build/aui-base/aui-base.js", 376);
if (UA.mobile) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 377);
selectors.push('mobile');
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 380);
if (UA.secure) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 381);
selectors.push('secure');
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 384);
if (UA.touch) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 385);
selectors.push('touch');
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 388);
UA.selectors = selectors.join(' ');

			// The methods in this if block only run once across all instances
			_yuitest_coverline("/build/aui-base/aui-base.js", 391);
if (!documentElement._yuid) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 392);
documentElement.className += ' ' + UA.selectors;

				_yuitest_coverline("/build/aui-base/aui-base.js", 394);
var vml,
					svg;

				_yuitest_coverline("/build/aui-base/aui-base.js", 397);
vml = !(svg = !!(CONFIG.win.SVGAngle || DOC.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')));

				_yuitest_coverline("/build/aui-base/aui-base.js", 399);
if (vml) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 400);
var div = DOC.createElement('div');
					_yuitest_coverline("/build/aui-base/aui-base.js", 401);
var behaviorObj;

					_yuitest_coverline("/build/aui-base/aui-base.js", 403);
div.innerHTML = '<v:shape adj="1"/>';

					_yuitest_coverline("/build/aui-base/aui-base.js", 405);
behaviorObj = div.firstChild;

					_yuitest_coverline("/build/aui-base/aui-base.js", 407);
behaviorObj.style.behavior = 'url(#default#VML)';

					_yuitest_coverline("/build/aui-base/aui-base.js", 409);
if (!(behaviorObj && typeof behaviorObj.adj == 'object')) {
						_yuitest_coverline("/build/aui-base/aui-base.js", 410);
vml = false;
					}

					_yuitest_coverline("/build/aui-base/aui-base.js", 413);
div = null;
				}

				_yuitest_coverline("/build/aui-base/aui-base.js", 416);
AUI._VML = vml;
				_yuitest_coverline("/build/aui-base/aui-base.js", 417);
AUI._SVG = svg;

				_yuitest_coverline("/build/aui-base/aui-base.js", 419);
A.stamp(documentElement);
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 422);
UA.vml = AUI._VML;
			_yuitest_coverline("/build/aui-base/aui-base.js", 423);
UA.svg = AUI._SVG;
		};
	})();

	_yuitest_coverline("/build/aui-base/aui-base.js", 427);
AUI._uaExtensions(ALLOY);
})();
_yuitest_coverline("/build/aui-base/aui-base.js", 429);
AUI.add('aui-base-core', function(A) {
_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 6)", 429);
_yuitest_coverline("/build/aui-base/aui-base.js", 430);
var Lang = A.Lang,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	AArray = A.Array,
	arrayIndexOf = AArray.indexOf;

_yuitest_coverline("/build/aui-base/aui-base.js", 437);
A.mix(
	AArray,
	{
		remove: function(a, from, to) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "remove", 440);
_yuitest_coverline("/build/aui-base/aui-base.js", 441);
var rest = a.slice((to || from) + 1 || a.length);
			_yuitest_coverline("/build/aui-base/aui-base.js", 442);
a.length = (from < 0) ? (a.length + from) : from;

			_yuitest_coverline("/build/aui-base/aui-base.js", 444);
return a.push.apply(a, rest);
		},

		removeItem: function(a, item) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "removeItem", 447);
_yuitest_coverline("/build/aui-base/aui-base.js", 448);
var index = arrayIndexOf(a, item);

			_yuitest_coverline("/build/aui-base/aui-base.js", 450);
return AArray.remove(a, index);
		}
	}
);

_yuitest_coverline("/build/aui-base/aui-base.js", 455);
A.fn = function(fn, context, args) {
	_yuitest_coverfunc("/build/aui-base/aui-base.js", "fn", 455);
_yuitest_coverline("/build/aui-base/aui-base.js", 456);
var wrappedFn;
	_yuitest_coverline("/build/aui-base/aui-base.js", 457);
var dynamicLookup;

	// Explicitly set function arguments
	_yuitest_coverline("/build/aui-base/aui-base.js", 460);
if (!isNumber(fn)) {
		_yuitest_coverline("/build/aui-base/aui-base.js", 461);
var xargs = arguments;

		_yuitest_coverline("/build/aui-base/aui-base.js", 463);
if (xargs.length > 2) {
			_yuitest_coverline("/build/aui-base/aui-base.js", 464);
xargs = AArray(xargs, 2, true);
		}

		_yuitest_coverline("/build/aui-base/aui-base.js", 467);
dynamicLookup = (isString(fn) && context);

		_yuitest_coverline("/build/aui-base/aui-base.js", 469);
wrappedFn = function() {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "wrappedFn", 469);
_yuitest_coverline("/build/aui-base/aui-base.js", 470);
var method = (!dynamicLookup) ? fn : context[fn];

			_yuitest_coverline("/build/aui-base/aui-base.js", 472);
return method.apply(context || fn, xargs);
		};
	}
	else {
		// Set function arity
		_yuitest_coverline("/build/aui-base/aui-base.js", 477);
var argLength = fn;

		_yuitest_coverline("/build/aui-base/aui-base.js", 479);
fn = context;
		_yuitest_coverline("/build/aui-base/aui-base.js", 480);
context = args;

		_yuitest_coverline("/build/aui-base/aui-base.js", 482);
dynamicLookup = (isString(fn) && context);

		_yuitest_coverline("/build/aui-base/aui-base.js", 484);
wrappedFn = function() {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "wrappedFn", 484);
_yuitest_coverline("/build/aui-base/aui-base.js", 485);
var method = (!dynamicLookup) ? fn : context[fn];
			_yuitest_coverline("/build/aui-base/aui-base.js", 486);
context = context || method;

			_yuitest_coverline("/build/aui-base/aui-base.js", 488);
var returnValue;

			_yuitest_coverline("/build/aui-base/aui-base.js", 490);
if (argLength > 0) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 491);
returnValue = method.apply(context, AArray(arguments, 0, true).slice(0, argLength));
			}
			else {
				_yuitest_coverline("/build/aui-base/aui-base.js", 494);
returnValue = method.call(context);
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 497);
return returnValue;
		};
	}

	_yuitest_coverline("/build/aui-base/aui-base.js", 501);
return wrappedFn;
};

}, '@VERSION@' ,{skinnable:false, requires:['aui-classnamemanager','aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop','yui-throttle']});
_yuitest_coverline("/build/aui-base/aui-base.js", 505);
AUI.add('aui-base-lang', function(A) {
_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 7)", 505);
_yuitest_coverline("/build/aui-base/aui-base.js", 506);
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
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 8)", 545);
_yuitest_coverline("/build/aui-base/aui-base.js", 546);
mathBuffer[1] = mathArgs;

			_yuitest_coverline("/build/aui-base/aui-base.js", 548);
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

	_yuitest_coverline("/build/aui-base/aui-base.js", 563);
for (var i in MAP_HTML_CHARS_ESCAPED) {
		_yuitest_coverline("/build/aui-base/aui-base.js", 564);
if (MAP_HTML_CHARS_ESCAPED.hasOwnProperty(i)) {
			_yuitest_coverline("/build/aui-base/aui-base.js", 565);
var escapedValue = MAP_HTML_CHARS_ESCAPED[i];

			_yuitest_coverline("/build/aui-base/aui-base.js", 567);
MAP_HTML_CHARS_UNESCAPED[escapedValue] = i;

			_yuitest_coverline("/build/aui-base/aui-base.js", 569);
htmlUnescapedValues.push(i);
		}
	}

_yuitest_coverline("/build/aui-base/aui-base.js", 573);
var REGEX_HTML_ESCAPE = new RegExp('[' + htmlUnescapedValues.join(STR_BLANK) + ']', 'g'),
	REGEX_HTML_UNESCAPE = /&([^;]+);/g;

_yuitest_coverline("/build/aui-base/aui-base.js", 576);
A.mix(
	LString,
	{
		camelize: A.cached(
			function(str, separator) {
				_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 9)", 580);
_yuitest_coverline("/build/aui-base/aui-base.js", 581);
var regex = REGEX_DASH;

				_yuitest_coverline("/build/aui-base/aui-base.js", 583);
str = String(str);

				_yuitest_coverline("/build/aui-base/aui-base.js", 585);
if (separator) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 586);
regex = new RegExp(separator + '([a-z])', 'gi');
				}

				_yuitest_coverline("/build/aui-base/aui-base.js", 589);
return str.replace(regex, LString._camelize);
			}
		),

		capitalize: A.cached(
			function(str) {
				_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 10)", 594);
_yuitest_coverline("/build/aui-base/aui-base.js", 595);
if (str) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 596);
str = String(str);

					_yuitest_coverline("/build/aui-base/aui-base.js", 598);
str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
				}

				_yuitest_coverline("/build/aui-base/aui-base.js", 601);
return str;
			}
		),

		contains: function(str, searchString) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "contains", 605);
_yuitest_coverline("/build/aui-base/aui-base.js", 606);
return str.indexOf(searchString) != -1;
		},

		defaultValue: function(str, defaultValue) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "defaultValue", 609);
_yuitest_coverline("/build/aui-base/aui-base.js", 610);
if (isUndefined(str) || str == STR_BLANK) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 611);
if (isUndefined(defaultValue)) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 612);
defaultValue = STR_BLANK;
				}

				_yuitest_coverline("/build/aui-base/aui-base.js", 615);
str = defaultValue;
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 618);
return str;
		},

		endsWith: function(str, suffix) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "endsWith", 621);
_yuitest_coverline("/build/aui-base/aui-base.js", 622);
var length = (str.length - suffix.length);

			_yuitest_coverline("/build/aui-base/aui-base.js", 624);
return ((length >= 0) && (str.indexOf(suffix, length) == length));
		},

		escapeHTML: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "escapeHTML", 627);
_yuitest_coverline("/build/aui-base/aui-base.js", 628);
return str.replace(REGEX_HTML_ESCAPE, LString._escapeHTML);
		},

		// Courtesy of: http://simonwillison.net/2006/Jan/20/escape/
		escapeRegEx: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "escapeRegEx", 632);
_yuitest_coverline("/build/aui-base/aui-base.js", 633);
return str.replace(REGEX_ESCAPE_REGEX, '\\$1');
		},

		math: function(value, mathArgs) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "math", 636);
_yuitest_coverline("/build/aui-base/aui-base.js", 637);
return cachedMathFn(mathArgs)(value);
		},

		nl2br: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "nl2br", 640);
_yuitest_coverline("/build/aui-base/aui-base.js", 641);
var instance = this;

			_yuitest_coverline("/build/aui-base/aui-base.js", 643);
return String(str).replace(REGEX_NL2BR, '<br />');
		},

		padNumber: function(num, length, precision) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "padNumber", 646);
_yuitest_coverline("/build/aui-base/aui-base.js", 647);
var str = precision ? Number(num).toFixed(precision) : String(num);
			_yuitest_coverline("/build/aui-base/aui-base.js", 648);
var index = str.indexOf('.');

			_yuitest_coverline("/build/aui-base/aui-base.js", 650);
if (index == -1) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 651);
index = str.length;
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 654);
return LString.repeat(STR_ZERO, Math.max(0, length - index)) + str;
		},

		pluralize: function(count, singularVersion, pluralVersion) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "pluralize", 657);
_yuitest_coverline("/build/aui-base/aui-base.js", 658);
var suffix;

			_yuitest_coverline("/build/aui-base/aui-base.js", 660);
if (count == 1) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 661);
suffix = singularVersion;
			}
			else {
				_yuitest_coverline("/build/aui-base/aui-base.js", 664);
suffix = pluralVersion || singularVersion + STR_S;
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 667);
return count + ' ' + suffix;
		},

		prefix: function(prefix, str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "prefix", 670);
_yuitest_coverline("/build/aui-base/aui-base.js", 671);
str = String(str);

			_yuitest_coverline("/build/aui-base/aui-base.js", 673);
if (str.indexOf(prefix) !== 0) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 674);
str = prefix + str;
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 677);
return str;
		},

		remove: function(str, substitute, all) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "remove", 680);
_yuitest_coverline("/build/aui-base/aui-base.js", 681);
var re = new RegExp(LString.escapeRegEx(substitute), all ? STR_G : STR_BLANK);

			_yuitest_coverline("/build/aui-base/aui-base.js", 683);
return str.replace(re, STR_BLANK);
		},

		removeAll: function(str, substitute) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "removeAll", 686);
_yuitest_coverline("/build/aui-base/aui-base.js", 687);
return LString.remove(str, substitute, true);
		},

		repeat: function(str, length) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "repeat", 690);
_yuitest_coverline("/build/aui-base/aui-base.js", 691);
return new Array(length + 1).join(str);
		},

		round: function(value, precision) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "round", 694);
_yuitest_coverline("/build/aui-base/aui-base.js", 695);
value = Number(value);

			_yuitest_coverline("/build/aui-base/aui-base.js", 697);
if (isNumber(precision)) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 698);
precision = Math.pow(10, precision);
				_yuitest_coverline("/build/aui-base/aui-base.js", 699);
value = Math.round(value * precision) / precision;
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 702);
return value;
		},

		startsWith: function(str, prefix) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "startsWith", 705);
_yuitest_coverline("/build/aui-base/aui-base.js", 706);
return (str.lastIndexOf(prefix, 0) === 0);
		},

		stripScripts: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "stripScripts", 709);
_yuitest_coverline("/build/aui-base/aui-base.js", 710);
if (str) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 711);
str = String(str).replace(REGEX_STRIP_SCRIPTS, STR_BLANK);
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 714);
return str;
		},

		stripTags: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "stripTags", 717);
_yuitest_coverline("/build/aui-base/aui-base.js", 718);
var instance = this;

			_yuitest_coverline("/build/aui-base/aui-base.js", 720);
if (str) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 721);
str = String(str).replace(REGEX_STRIP_TAGS, STR_BLANK);
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 724);
return str;
		},

		substr: function(str, start, length) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "substr", 727);
_yuitest_coverline("/build/aui-base/aui-base.js", 728);
return String(str).substr(start, length);
		},

		uncamelize: A.cached(
			function(str, separator) {
				_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 11)", 732);
_yuitest_coverline("/build/aui-base/aui-base.js", 733);
separator = separator || ' ';

				_yuitest_coverline("/build/aui-base/aui-base.js", 735);
str = String(str);

				_yuitest_coverline("/build/aui-base/aui-base.js", 737);
str = str.replace(REGEX_UNCAMELIZE, '$1' + separator + '$2$3');
				_yuitest_coverline("/build/aui-base/aui-base.js", 738);
str = str.replace(REGEX_UNCAMELIZE_REPLACE_SEPARATOR, '$1' + separator + '$2');

				_yuitest_coverline("/build/aui-base/aui-base.js", 740);
return str;
			}
		),

		toLowerCase: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "toLowerCase", 744);
_yuitest_coverline("/build/aui-base/aui-base.js", 745);
return String(str).toLowerCase();
		},

		toUpperCase: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "toUpperCase", 748);
_yuitest_coverline("/build/aui-base/aui-base.js", 749);
return String(str).toUpperCase();
		},

		trim: Lang.trim,

		truncate: function(str, length, where) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "truncate", 754);
_yuitest_coverline("/build/aui-base/aui-base.js", 755);
str = String(str);

			_yuitest_coverline("/build/aui-base/aui-base.js", 757);
var strLength = str.length;

			_yuitest_coverline("/build/aui-base/aui-base.js", 759);
if (str && strLength > length) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 760);
where = where || STR_END;

				_yuitest_coverline("/build/aui-base/aui-base.js", 762);
if (where == STR_END) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 763);
str = str.substr(0, length - STR_ELLIPSIS.length) + STR_ELLIPSIS;
				}
				else {_yuitest_coverline("/build/aui-base/aui-base.js", 765);
if (where == STR_MIDDLE) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 766);
var middlePoint = Math.floor(length / 2);

					_yuitest_coverline("/build/aui-base/aui-base.js", 768);
str = str.substr(0, middlePoint) + STR_ELLIPSIS + str.substr(strLength - middlePoint);
				}
				else {_yuitest_coverline("/build/aui-base/aui-base.js", 770);
if (where == STR_START) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 771);
str = STR_ELLIPSIS + str.substr(strLength - length);
				}}}
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 775);
return str;
		},

		undef: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "undef", 778);
_yuitest_coverline("/build/aui-base/aui-base.js", 779);
if (isUndefined(str)) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 780);
str = STR_BLANK;
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 783);
return str;
		},

		// inspired from Google unescape entities
		unescapeEntities: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "unescapeEntities", 787);
_yuitest_coverline("/build/aui-base/aui-base.js", 788);
if (LString.contains(str, STR_AMP)) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 789);
if (DOC && !LString.contains(str, STR_CHEVRON_LEFT)) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 790);
str = LString._unescapeEntitiesUsingDom(str);
				}
				else {
					_yuitest_coverline("/build/aui-base/aui-base.js", 793);
str = LString.unescapeHTML(str);
				}
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 797);
return str;
		},

		unescapeHTML: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "unescapeHTML", 800);
_yuitest_coverline("/build/aui-base/aui-base.js", 801);
return str.replace(REGEX_HTML_UNESCAPE, LString._unescapeHTML);
		},

		_camelize: function(match0, match1) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "_camelize", 804);
_yuitest_coverline("/build/aui-base/aui-base.js", 805);
return match1.toUpperCase();
		},

		_escapeHTML: function(match) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "_escapeHTML", 808);
_yuitest_coverline("/build/aui-base/aui-base.js", 809);
return MAP_HTML_CHARS_ESCAPED[match];
		},

		_unescapeHTML: function(match) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "_unescapeHTML", 812);
_yuitest_coverline("/build/aui-base/aui-base.js", 813);
var value = MAP_HTML_CHARS_UNESCAPED[match];

			_yuitest_coverline("/build/aui-base/aui-base.js", 815);
if (!value && entity.charAt(0) == STR_HASH) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 816);
var charCode = Number(STR_ZERO + entity.substr(1));

				_yuitest_coverline("/build/aui-base/aui-base.js", 818);
if (!isNaN(charCode)) {
					_yuitest_coverline("/build/aui-base/aui-base.js", 819);
value = String.fromCharCode(charCode);
				}
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 823);
return value;
		},

		_unescapeEntitiesUsingDom: function(str) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "_unescapeEntitiesUsingDom", 826);
_yuitest_coverline("/build/aui-base/aui-base.js", 827);
var el = LString._unescapeNode;

			_yuitest_coverline("/build/aui-base/aui-base.js", 829);
el[INNER_HTML] = str;

			_yuitest_coverline("/build/aui-base/aui-base.js", 831);
if (el[NORMALIZE]) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 832);
el[NORMALIZE]();
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 835);
str = el.firstChild.nodeValue;

			_yuitest_coverline("/build/aui-base/aui-base.js", 837);
el[INNER_HTML] = STR_BLANK;

			_yuitest_coverline("/build/aui-base/aui-base.js", 839);
return str;
		},

		_unescapeNode: DOC.createElement('a')
	}
);

_yuitest_coverline("/build/aui-base/aui-base.js", 846);
A.mix(
	AArray,
	{
		/**
		 * Sorts an object array keeping the order of equal items. ECMA script
		 * standard does not specify the behaviour when the compare function
		 * returns the value 0;
		 */
		stableSort: function(array, sorter) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "stableSort", 854);
_yuitest_coverline("/build/aui-base/aui-base.js", 855);
var i, len = array.length;

			_yuitest_coverline("/build/aui-base/aui-base.js", 857);
for (i = 0; i < len; i++) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 858);
array[i] = { index: i, value: array[i] };
			}

			_yuitest_coverline("/build/aui-base/aui-base.js", 861);
array.sort(
				function(a, b) {
					_yuitest_coverfunc("/build/aui-base/aui-base.js", "(anonymous 12)", 862);
_yuitest_coverline("/build/aui-base/aui-base.js", 863);
var result = sorter.call(array, a.value, b.value);

					_yuitest_coverline("/build/aui-base/aui-base.js", 865);
return (result === 0) ? (a.index - b.index) : result;
				}
			);

			_yuitest_coverline("/build/aui-base/aui-base.js", 869);
for (i = 0; i < len; i++) {
				_yuitest_coverline("/build/aui-base/aui-base.js", 870);
array[i] = array[i].value;
			}
		}
	}
);

_yuitest_coverline("/build/aui-base/aui-base.js", 876);
A.mix(
	Lang,
	{
		emptyFn: function() {},

		emptyFnFalse: function() {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "emptyFnFalse", 881);
_yuitest_coverline("/build/aui-base/aui-base.js", 882);
return false;
		},

		emptyFnTrue: function() {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "emptyFnTrue", 885);
_yuitest_coverline("/build/aui-base/aui-base.js", 886);
return true;
		},

		isGuid: function(id) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "isGuid", 889);
_yuitest_coverline("/build/aui-base/aui-base.js", 890);
return String(id).indexOf(A.Env._guidp) === 0;
		},

		toFloat: function(value, defaultValue) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "toFloat", 893);
_yuitest_coverline("/build/aui-base/aui-base.js", 894);
return parseFloat(value) || defaultValue || 0;
		},

		toInt: function(value, radix, defaultValue) {
			_yuitest_coverfunc("/build/aui-base/aui-base.js", "toInt", 897);
_yuitest_coverline("/build/aui-base/aui-base.js", 898);
return parseInt(value, radix || 10) || defaultValue || 0;
		}
	}
);

/**
 * Maps an object to an array, using the
 * return value of fn as the values for the new array.
 */

_yuitest_coverline("/build/aui-base/aui-base.js", 908);
AObject.map = function(obj, fn, context) {
	_yuitest_coverfunc("/build/aui-base/aui-base.js", "map", 908);
_yuitest_coverline("/build/aui-base/aui-base.js", 909);
var map = [];

	_yuitest_coverline("/build/aui-base/aui-base.js", 911);
for (var i in obj) {
		_yuitest_coverline("/build/aui-base/aui-base.js", 912);
if (owns(obj, i)) {
			_yuitest_coverline("/build/aui-base/aui-base.js", 913);
map[map.length] = fn.call(context, obj[i], i, obj);
		}
	}

	_yuitest_coverline("/build/aui-base/aui-base.js", 917);
return map;
};

/**
 * Maps an array or object to a resulting array, using the
 * return value of fn as the values for the new array.
 * Like A.each, this function can accept an object or an array.
 */

_yuitest_coverline("/build/aui-base/aui-base.js", 926);
A.map = function(obj, fn, context) {
	_yuitest_coverfunc("/build/aui-base/aui-base.js", "map", 926);
_yuitest_coverline("/build/aui-base/aui-base.js", 927);
var module = AObject;

	_yuitest_coverline("/build/aui-base/aui-base.js", 929);
if (isArray(obj)) {
		_yuitest_coverline("/build/aui-base/aui-base.js", 930);
module = AArray;
	}

	_yuitest_coverline("/build/aui-base/aui-base.js", 933);
return module.map.apply(this, arguments);
};

}, '@VERSION@' ,{skinnable:false});


_yuitest_coverline("/build/aui-base/aui-base.js", 939);
AUI.add('aui-base', function(A){}, '@VERSION@' ,{use:['aui-base-core','aui-base-lang'], skinnable:false});

