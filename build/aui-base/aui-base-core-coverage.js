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
_yuitest_coverage["/build/aui-base-core/aui-base-core.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-base-core/aui-base-core.js",
    code: []
};
_yuitest_coverage["/build/aui-base-core/aui-base-core.js"].code=[";(function() {","	/*","	 * Alloy JavaScript Library v@VERSION@","	 * http://alloy.liferay.com/","	 *","	 * Copyright (c) 2010 Liferay Inc.","	 * http://alloy.liferay.com/LICENSE.txt","	 *","	 * Nate Cavanaugh (nathan.cavanaugh@liferay.com)","	 * Eduardo Lundgren (eduardo.lundgren@liferay.com)","	 *","	 * Attribution/Third-party licenses","	 * http://alloy.liferay.com/ATTRIBUTION.txt","	 *","	 * Date: @DATE@","	 * Revision: @REVISION@","	 */","","	YUI.AUI_config = YUI.AUI_config || {};","","	var defaults = YUI.AUI_config;","","	YUI.prototype.ready = function() {","		var instance = this;","","		var slice = Array.prototype.slice;","		var args = slice.call(arguments, 0), index = args.length - 1;","","		var fn = args[index];","","		var modules = slice.call(arguments, 0, index);","","		modules.push('event');","","		modules.push(","			function(instance) {","				var args = arguments;","","				instance.on(","					'domready',","					function() {","						fn.apply(this, args);","					}","				);","			}","		);","","		instance.use.apply(instance, modules);","	};","","	var ALLOY;","","	if (typeof A != 'undefined') {","		ALLOY = A;","	}","	else {","		ALLOY = YUI(defaults);","	}","","	var guidExtensions = function(A) {","		A.Env._guidp = ['aui', A.version, A.Env._yidx].join('_').replace(/\\./g, '_');","	};","","	guidExtensions(ALLOY);","","	var originalConfig = ALLOY.config;","","	ALLOY.config = ALLOY.merge(originalConfig, YUI.AUI_config);","","	YUI.AUI = function(o) {","		var instance = this;","","		// Need the current window, not A.config.win","		var alloyInstance = window.Alloy;","","		if (o || instance instanceof AUI) {","			var args = ALLOY.Array(arguments);","","			args.unshift(ALLOY.config);","","			var newInstance = YUI.apply(null, args);","","			AUI._uaExtensions(newInstance);","			AUI._miscExtensions(newInstance);","			AUI._guidExtensions(newInstance);","","			var WIN = newInstance.config.win;","","			if (!WIN.YUI) {","				WIN.YUI = YUI;","			}","","			if (!WIN.AUI) {","				WIN.AUI = AUI;","			}","","			if (!WIN.Alloy) {","				WIN.Alloy = newInstance;","			}","","			alloyInstance = newInstance;","		}","","		return alloyInstance;","	};","","	var AUI = YUI.AUI;","","	AUI._guidExtensions = guidExtensions;","","	var WIN = ALLOY.config.win;","","	WIN.AUI = AUI;","	WIN.Alloy = ALLOY;","","	var UA = ALLOY.UA;","","	ALLOY.mix(AUI, YUI, true, null, 2);","","	ALLOY.mix(","		AUI,","		{","			__version: '@VERSION',","","			defaults: defaults,","","			html5shiv: function(frag) {","				var instance = this;","","				var DOC = frag || ALLOY.config.doc;","","				if (UA.ie && DOC && DOC.createElement) {","					var elements = AUI.HTML5_ELEMENTS, length = elements.length;","","					while (length--) {","						DOC.createElement(elements[length]);","					}","				}","","				return frag;","			},","","			setDefaults: function(defaults) {","				var instance = this;","","				ALLOY.mix(AUI.defaults, defaults, true, null, 0, true);","				ALLOY.mix(ALLOY.config, defaults, true, null, 0, true);","			},","","			_miscExtensions: function(A) {","				var instance = this;","","				var DOC = A.config.doc;","","				/*","				* HTML5 Compatability for IE","				*/","","				AUI.html5shiv(DOC);","","				/*","				* Disable background image flickering in IE6","				*/","","				var IE = A.UA.ie;","","				if (IE && IE <= 6) {","					try {","						DOC.execCommand('BackgroundImageCache', false, true);","					}","					catch (e) {","					}","				}","			},","","			HTML5_ELEMENTS: 'abbr,article,aside,audio,canvas,command,datalist,details,figure,figcaption,footer,header,hgroup,keygen,mark,meter,nav,output,progress,section,source,summary,time,video'.split(',')","		},","		true","	);","","	AUI._miscExtensions(ALLOY);","","	/*","		UA extensions","	*/","","	(function() {","		var REGEX_VERSION_DOT = /\\./g;","","		var parseVersionNumber = function(str) {","			var count = 0;","","			return parseFloat(","				str.replace(","					REGEX_VERSION_DOT,","					function() {","						return (count++ == 1) ? '' : '.';","					}","				)","			);","		};","","		var DEFAULTS_VERSION = ['0','0'];","","		var getVersion = function(regex, userAgent) {","			var version = (userAgent.match(regex) || DEFAULTS_VERSION)[1];","","			return parseVersionNumber(version);","		};","","		var MAP_OS_SELECTORS = {","			windows: 'win',","			macintosh: 'mac'","		};","","		var BROWSERS = [","			'ie',","			'opera',","			'chrome',","			'aol',","			'camino',","			'firefox',","			'flock',","			'mozilla',","			'netscape',","			'icab',","			'konqueror',","			'safari'","		];","","		AUI._uaExtensions = function(A) {","			var nav = navigator;","","			var userAgent = nav.userAgent;","","			var UA = A.UA;","			var OS = UA.os;","","			var UAX = {","				aol: 0,","","				camino: 0,","				firefox: 0,","				flock: 0,","				mozilla: 0,","				netscape: 0,","","				icab: 0,","				konqueror: 0,","","				safari: 0,","","				browser: 0,","","				win: OS == 'windows',","				mac: OS == 'macintosh',","				rhino: OS == 'rhino',","","				agent: userAgent","			};","","			if (UA.ie) {","				UAX.aol = getVersion(/America Online Browser ([^\\s]*);/, userAgent);","			}","			else if (UA.gecko) {","				UAX.netscape = getVersion(/(Netscape|Navigator)\\/([^\\s]*)/, userAgent);","				UAX.flock = getVersion(/Flock\\/([^\\s]*)/, userAgent);","				UAX.camino = getVersion(/Camino\\/([^\\s]*)/, userAgent);","				UAX.firefox = getVersion(/Firefox\\/([^\\s]*)/, userAgent);","			}","			else if (UA.webkit) {","				UAX.safari = getVersion(/Version\\/([^\\s]*) Safari/, userAgent);","			}","			else {","				UAX.icab = getVersion(/iCab(?:\\/|\\s)?([^\\s]*)/, userAgent);","				UAX.konqueror = getVersion(/Konqueror\\/([^\\s]*)/, userAgent);","			}","","			if (!UAX.win && !UAX.mac) {","				var linux = /Linux/.test(userAgent);","				var sun = /Solaris|SunOS/.test(userAgent);","","				if (linux) {","					UA.os = 'linux';","					UAX.linux = linux;","				}","				else if (sun) {","					UA.os = 'sun';","					UAX.sun = sun;","				}","			}","","			var CONFIG = A.config,","				DOC = CONFIG.doc;","","			UAX.touch = ('ontouchstart' in DOC);","","			A.mix(UA, UAX);","","			var browserList = [];","			var versionMajor = 0;","","			var browser;","			var version;","			var uaVersionMajor;","			var uaVersionMinor;","","			var versionObj = {","				string: '',","				major: versionMajor","			};","","			var i = BROWSERS.length;","","			while (i--) {","				browser = BROWSERS[i];","				version = UA[browser];","","				if (version > 0) {","					versionMajor = parseInt(version, 10);","					uaVersionMajor = browser + versionMajor;","","					uaVersionMinor = (browser + version);","","					if (String(version).indexOf('.') > -1) {","						uaVersionMinor = uaVersionMinor.replace(/\\.(\\d).*/, '-$1');","					}","					else {","						uaVersionMinor += '-0';","					}","","					browserList.push(browser, uaVersionMajor, uaVersionMinor);","","					versionObj.string = browser + '';","					versionObj.major = versionMajor;","				}","			}","","			UA.version = versionObj;","","			UA.renderer = '';","","			var documentElement = DOC.documentElement;","","			UA.dir = documentElement.getAttribute('dir') || 'ltr';","","			if (UA.ie) {","				UA.renderer = 'trident';","			}","			else if (UA.gecko) {","				UA.renderer = 'gecko';","			}","			else if (UA.webkit) {","				UA.renderer = 'webkit';","			}","			else if (UA.opera) {","				UA.renderer = 'presto';","			}","","			A.UA = UA;","","			/*","			* Browser selectors","			*/","","			var selectors = [","				UA.renderer,","				UA.dir,","				'js'","			].concat(browserList);","","			var osSelector = MAP_OS_SELECTORS[UA.os] || UA.os;","","			selectors.push(osSelector);","","			if (UA.mobile) {","				selectors.push('mobile');","			}","","			if (UA.secure) {","				selectors.push('secure');","			}","","			if (UA.touch) {","				selectors.push('touch');","			}","","			UA.selectors = selectors.join(' ');","","			// The methods in this if block only run once across all instances","			if (!documentElement._yuid) {","				documentElement.className += ' ' + UA.selectors;","","				var vml,","					svg;","","				vml = !(svg = !!(CONFIG.win.SVGAngle || DOC.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')));","","				if (vml) {","					var div = DOC.createElement('div');","					var behaviorObj;","","					div.innerHTML = '<v:shape adj=\"1\"/>';","","					behaviorObj = div.firstChild;","","					behaviorObj.style.behavior = 'url(#default#VML)';","","					if (!(behaviorObj && typeof behaviorObj.adj == 'object')) {","						vml = false;","					}","","					div = null;","				}","","				AUI._VML = vml;","				AUI._SVG = svg;","","				A.stamp(documentElement);","			}","","			UA.vml = AUI._VML;","			UA.svg = AUI._SVG;","		};","	})();","","	AUI._uaExtensions(ALLOY);","})();","AUI.add('aui-base-core', function(A) {","var Lang = A.Lang,","	isNumber = Lang.isNumber,","	isString = Lang.isString,","","	AArray = A.Array,","	arrayIndexOf = AArray.indexOf;","","A.mix(","	AArray,","	{","		remove: function(a, from, to) {","			var rest = a.slice((to || from) + 1 || a.length);","			a.length = (from < 0) ? (a.length + from) : from;","","			return a.push.apply(a, rest);","		},","","		removeItem: function(a, item) {","			var index = arrayIndexOf(a, item);","","			return AArray.remove(a, index);","		}","	}",");","","A.fn = function(fn, context, args) {","	var wrappedFn;","	var dynamicLookup;","","	// Explicitly set function arguments","	if (!isNumber(fn)) {","		var xargs = arguments;","","		if (xargs.length > 2) {","			xargs = AArray(xargs, 2, true);","		}","","		dynamicLookup = (isString(fn) && context);","","		wrappedFn = function() {","			var method = (!dynamicLookup) ? fn : context[fn];","","			return method.apply(context || fn, xargs);","		};","	}","	else {","		// Set function arity","		var argLength = fn;","","		fn = context;","		context = args;","","		dynamicLookup = (isString(fn) && context);","","		wrappedFn = function() {","			var method = (!dynamicLookup) ? fn : context[fn];","			context = context || method;","","			var returnValue;","","			if (argLength > 0) {","				returnValue = method.apply(context, AArray(arguments, 0, true).slice(0, argLength));","			}","			else {","				returnValue = method.call(context);","			}","","			return returnValue;","		};","	}","","	return wrappedFn;","};","","}, '@VERSION@' ,{requires:['aui-classnamemanager','aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop','yui-throttle'], skinnable:false});"];
_yuitest_coverage["/build/aui-base-core/aui-base-core.js"].lines = {"1":0,"19":0,"21":0,"23":0,"24":0,"26":0,"27":0,"29":0,"31":0,"33":0,"35":0,"37":0,"39":0,"42":0,"48":0,"51":0,"53":0,"54":0,"57":0,"60":0,"61":0,"64":0,"66":0,"68":0,"70":0,"71":0,"74":0,"76":0,"77":0,"79":0,"81":0,"83":0,"84":0,"85":0,"87":0,"89":0,"90":0,"93":0,"94":0,"97":0,"98":0,"101":0,"104":0,"107":0,"109":0,"111":0,"113":0,"114":0,"116":0,"118":0,"120":0,"128":0,"130":0,"132":0,"133":0,"135":0,"136":0,"140":0,"144":0,"146":0,"147":0,"151":0,"153":0,"159":0,"165":0,"167":0,"168":0,"169":0,"181":0,"187":0,"188":0,"190":0,"191":0,"193":0,"197":0,"203":0,"205":0,"206":0,"208":0,"211":0,"216":0,"231":0,"232":0,"234":0,"236":0,"237":0,"239":0,"262":0,"263":0,"265":0,"266":0,"267":0,"268":0,"269":0,"271":0,"272":0,"275":0,"276":0,"279":0,"280":0,"281":0,"283":0,"284":0,"285":0,"287":0,"288":0,"289":0,"293":0,"296":0,"298":0,"300":0,"301":0,"303":0,"304":0,"305":0,"306":0,"308":0,"313":0,"315":0,"316":0,"317":0,"319":0,"320":0,"321":0,"323":0,"325":0,"326":0,"329":0,"332":0,"334":0,"335":0,"339":0,"341":0,"343":0,"345":0,"347":0,"348":0,"350":0,"351":0,"353":0,"354":0,"356":0,"357":0,"360":0,"366":0,"372":0,"374":0,"376":0,"377":0,"380":0,"381":0,"384":0,"385":0,"388":0,"391":0,"392":0,"394":0,"397":0,"399":0,"400":0,"401":0,"403":0,"405":0,"407":0,"409":0,"410":0,"413":0,"416":0,"417":0,"419":0,"422":0,"423":0,"427":0,"429":0,"430":0,"437":0,"441":0,"442":0,"444":0,"448":0,"450":0,"455":0,"456":0,"457":0,"460":0,"461":0,"463":0,"464":0,"467":0,"469":0,"470":0,"472":0,"477":0,"479":0,"480":0,"482":0,"484":0,"485":0,"486":0,"488":0,"490":0,"491":0,"494":0,"497":0,"501":0};
_yuitest_coverage["/build/aui-base-core/aui-base-core.js"].functions = {"(anonymous 3):41":0,"(anonymous 2):36":0,"ready:23":0,"guidExtensions:60":0,"AUI:70":0,"html5shiv:127":0,"setDefaults:143":0,"_miscExtensions:150":0,"(anonymous 5):196":0,"parseVersionNumber:190":0,"getVersion:205":0,"_uaExtensions:231":0,"(anonymous 4):187":0,"(anonymous 1):1":0,"remove:440":0,"removeItem:447":0,"wrappedFn:469":0,"wrappedFn:484":0,"fn:455":0,"(anonymous 6):429":0};
_yuitest_coverage["/build/aui-base-core/aui-base-core.js"].coveredLines = 205;
_yuitest_coverage["/build/aui-base-core/aui-base-core.js"].coveredFunctions = 20;
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 1);
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

	_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 19);
YUI.AUI_config = YUI.AUI_config || {};

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 21);
var defaults = YUI.AUI_config;

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 23);
YUI.prototype.ready = function() {
		_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "ready", 23);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 24);
var instance = this;

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 26);
var slice = Array.prototype.slice;
		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 27);
var args = slice.call(arguments, 0), index = args.length - 1;

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 29);
var fn = args[index];

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 31);
var modules = slice.call(arguments, 0, index);

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 33);
modules.push('event');

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 35);
modules.push(
			function(instance) {
				_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "(anonymous 2)", 36);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 37);
var args = arguments;

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 39);
instance.on(
					'domready',
					function() {
						_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "(anonymous 3)", 41);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 42);
fn.apply(this, args);
					}
				);
			}
		);

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 48);
instance.use.apply(instance, modules);
	};

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 51);
var ALLOY;

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 53);
if (typeof A != 'undefined') {
		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 54);
ALLOY = A;
	}
	else {
		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 57);
ALLOY = YUI(defaults);
	}

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 60);
var guidExtensions = function(A) {
		_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "guidExtensions", 60);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 61);
A.Env._guidp = ['aui', A.version, A.Env._yidx].join('_').replace(/\./g, '_');
	};

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 64);
guidExtensions(ALLOY);

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 66);
var originalConfig = ALLOY.config;

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 68);
ALLOY.config = ALLOY.merge(originalConfig, YUI.AUI_config);

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 70);
YUI.AUI = function(o) {
		_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "AUI", 70);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 71);
var instance = this;

		// Need the current window, not A.config.win
		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 74);
var alloyInstance = window.Alloy;

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 76);
if (o || instance instanceof AUI) {
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 77);
var args = ALLOY.Array(arguments);

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 79);
args.unshift(ALLOY.config);

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 81);
var newInstance = YUI.apply(null, args);

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 83);
AUI._uaExtensions(newInstance);
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 84);
AUI._miscExtensions(newInstance);
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 85);
AUI._guidExtensions(newInstance);

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 87);
var WIN = newInstance.config.win;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 89);
if (!WIN.YUI) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 90);
WIN.YUI = YUI;
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 93);
if (!WIN.AUI) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 94);
WIN.AUI = AUI;
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 97);
if (!WIN.Alloy) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 98);
WIN.Alloy = newInstance;
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 101);
alloyInstance = newInstance;
		}

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 104);
return alloyInstance;
	};

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 107);
var AUI = YUI.AUI;

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 109);
AUI._guidExtensions = guidExtensions;

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 111);
var WIN = ALLOY.config.win;

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 113);
WIN.AUI = AUI;
	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 114);
WIN.Alloy = ALLOY;

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 116);
var UA = ALLOY.UA;

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 118);
ALLOY.mix(AUI, YUI, true, null, 2);

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 120);
ALLOY.mix(
		AUI,
		{
			__version: '@VERSION',

			defaults: defaults,

			html5shiv: function(frag) {
				_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "html5shiv", 127);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 128);
var instance = this;

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 130);
var DOC = frag || ALLOY.config.doc;

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 132);
if (UA.ie && DOC && DOC.createElement) {
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 133);
var elements = AUI.HTML5_ELEMENTS, length = elements.length;

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 135);
while (length--) {
						_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 136);
DOC.createElement(elements[length]);
					}
				}

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 140);
return frag;
			},

			setDefaults: function(defaults) {
				_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "setDefaults", 143);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 144);
var instance = this;

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 146);
ALLOY.mix(AUI.defaults, defaults, true, null, 0, true);
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 147);
ALLOY.mix(ALLOY.config, defaults, true, null, 0, true);
			},

			_miscExtensions: function(A) {
				_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "_miscExtensions", 150);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 151);
var instance = this;

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 153);
var DOC = A.config.doc;

				/*
				* HTML5 Compatability for IE
				*/

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 159);
AUI.html5shiv(DOC);

				/*
				* Disable background image flickering in IE6
				*/

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 165);
var IE = A.UA.ie;

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 167);
if (IE && IE <= 6) {
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 168);
try {
						_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 169);
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

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 181);
AUI._miscExtensions(ALLOY);

	/*
		UA extensions
	*/

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 187);
(function() {
		_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "(anonymous 4)", 187);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 188);
var REGEX_VERSION_DOT = /\./g;

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 190);
var parseVersionNumber = function(str) {
			_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "parseVersionNumber", 190);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 191);
var count = 0;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 193);
return parseFloat(
				str.replace(
					REGEX_VERSION_DOT,
					function() {
						_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "(anonymous 5)", 196);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 197);
return (count++ == 1) ? '' : '.';
					}
				)
			);
		};

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 203);
var DEFAULTS_VERSION = ['0','0'];

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 205);
var getVersion = function(regex, userAgent) {
			_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "getVersion", 205);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 206);
var version = (userAgent.match(regex) || DEFAULTS_VERSION)[1];

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 208);
return parseVersionNumber(version);
		};

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 211);
var MAP_OS_SELECTORS = {
			windows: 'win',
			macintosh: 'mac'
		};

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 216);
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

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 231);
AUI._uaExtensions = function(A) {
			_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "_uaExtensions", 231);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 232);
var nav = navigator;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 234);
var userAgent = nav.userAgent;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 236);
var UA = A.UA;
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 237);
var OS = UA.os;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 239);
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

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 262);
if (UA.ie) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 263);
UAX.aol = getVersion(/America Online Browser ([^\s]*);/, userAgent);
			}
			else {_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 265);
if (UA.gecko) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 266);
UAX.netscape = getVersion(/(Netscape|Navigator)\/([^\s]*)/, userAgent);
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 267);
UAX.flock = getVersion(/Flock\/([^\s]*)/, userAgent);
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 268);
UAX.camino = getVersion(/Camino\/([^\s]*)/, userAgent);
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 269);
UAX.firefox = getVersion(/Firefox\/([^\s]*)/, userAgent);
			}
			else {_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 271);
if (UA.webkit) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 272);
UAX.safari = getVersion(/Version\/([^\s]*) Safari/, userAgent);
			}
			else {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 275);
UAX.icab = getVersion(/iCab(?:\/|\s)?([^\s]*)/, userAgent);
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 276);
UAX.konqueror = getVersion(/Konqueror\/([^\s]*)/, userAgent);
			}}}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 279);
if (!UAX.win && !UAX.mac) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 280);
var linux = /Linux/.test(userAgent);
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 281);
var sun = /Solaris|SunOS/.test(userAgent);

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 283);
if (linux) {
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 284);
UA.os = 'linux';
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 285);
UAX.linux = linux;
				}
				else {_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 287);
if (sun) {
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 288);
UA.os = 'sun';
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 289);
UAX.sun = sun;
				}}
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 293);
var CONFIG = A.config,
				DOC = CONFIG.doc;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 296);
UAX.touch = ('ontouchstart' in DOC);

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 298);
A.mix(UA, UAX);

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 300);
var browserList = [];
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 301);
var versionMajor = 0;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 303);
var browser;
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 304);
var version;
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 305);
var uaVersionMajor;
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 306);
var uaVersionMinor;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 308);
var versionObj = {
				string: '',
				major: versionMajor
			};

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 313);
var i = BROWSERS.length;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 315);
while (i--) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 316);
browser = BROWSERS[i];
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 317);
version = UA[browser];

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 319);
if (version > 0) {
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 320);
versionMajor = parseInt(version, 10);
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 321);
uaVersionMajor = browser + versionMajor;

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 323);
uaVersionMinor = (browser + version);

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 325);
if (String(version).indexOf('.') > -1) {
						_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 326);
uaVersionMinor = uaVersionMinor.replace(/\.(\d).*/, '-$1');
					}
					else {
						_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 329);
uaVersionMinor += '-0';
					}

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 332);
browserList.push(browser, uaVersionMajor, uaVersionMinor);

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 334);
versionObj.string = browser + '';
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 335);
versionObj.major = versionMajor;
				}
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 339);
UA.version = versionObj;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 341);
UA.renderer = '';

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 343);
var documentElement = DOC.documentElement;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 345);
UA.dir = documentElement.getAttribute('dir') || 'ltr';

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 347);
if (UA.ie) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 348);
UA.renderer = 'trident';
			}
			else {_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 350);
if (UA.gecko) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 351);
UA.renderer = 'gecko';
			}
			else {_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 353);
if (UA.webkit) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 354);
UA.renderer = 'webkit';
			}
			else {_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 356);
if (UA.opera) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 357);
UA.renderer = 'presto';
			}}}}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 360);
A.UA = UA;

			/*
			* Browser selectors
			*/

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 366);
var selectors = [
				UA.renderer,
				UA.dir,
				'js'
			].concat(browserList);

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 372);
var osSelector = MAP_OS_SELECTORS[UA.os] || UA.os;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 374);
selectors.push(osSelector);

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 376);
if (UA.mobile) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 377);
selectors.push('mobile');
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 380);
if (UA.secure) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 381);
selectors.push('secure');
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 384);
if (UA.touch) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 385);
selectors.push('touch');
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 388);
UA.selectors = selectors.join(' ');

			// The methods in this if block only run once across all instances
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 391);
if (!documentElement._yuid) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 392);
documentElement.className += ' ' + UA.selectors;

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 394);
var vml,
					svg;

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 397);
vml = !(svg = !!(CONFIG.win.SVGAngle || DOC.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')));

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 399);
if (vml) {
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 400);
var div = DOC.createElement('div');
					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 401);
var behaviorObj;

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 403);
div.innerHTML = '<v:shape adj="1"/>';

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 405);
behaviorObj = div.firstChild;

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 407);
behaviorObj.style.behavior = 'url(#default#VML)';

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 409);
if (!(behaviorObj && typeof behaviorObj.adj == 'object')) {
						_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 410);
vml = false;
					}

					_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 413);
div = null;
				}

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 416);
AUI._VML = vml;
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 417);
AUI._SVG = svg;

				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 419);
A.stamp(documentElement);
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 422);
UA.vml = AUI._VML;
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 423);
UA.svg = AUI._SVG;
		};
	})();

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 427);
AUI._uaExtensions(ALLOY);
})();
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 429);
AUI.add('aui-base-core', function(A) {
_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "(anonymous 6)", 429);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 430);
var Lang = A.Lang,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	AArray = A.Array,
	arrayIndexOf = AArray.indexOf;

_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 437);
A.mix(
	AArray,
	{
		remove: function(a, from, to) {
			_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "remove", 440);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 441);
var rest = a.slice((to || from) + 1 || a.length);
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 442);
a.length = (from < 0) ? (a.length + from) : from;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 444);
return a.push.apply(a, rest);
		},

		removeItem: function(a, item) {
			_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "removeItem", 447);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 448);
var index = arrayIndexOf(a, item);

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 450);
return AArray.remove(a, index);
		}
	}
);

_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 455);
A.fn = function(fn, context, args) {
	_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "fn", 455);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 456);
var wrappedFn;
	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 457);
var dynamicLookup;

	// Explicitly set function arguments
	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 460);
if (!isNumber(fn)) {
		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 461);
var xargs = arguments;

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 463);
if (xargs.length > 2) {
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 464);
xargs = AArray(xargs, 2, true);
		}

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 467);
dynamicLookup = (isString(fn) && context);

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 469);
wrappedFn = function() {
			_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "wrappedFn", 469);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 470);
var method = (!dynamicLookup) ? fn : context[fn];

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 472);
return method.apply(context || fn, xargs);
		};
	}
	else {
		// Set function arity
		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 477);
var argLength = fn;

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 479);
fn = context;
		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 480);
context = args;

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 482);
dynamicLookup = (isString(fn) && context);

		_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 484);
wrappedFn = function() {
			_yuitest_coverfunc("/build/aui-base-core/aui-base-core.js", "wrappedFn", 484);
_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 485);
var method = (!dynamicLookup) ? fn : context[fn];
			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 486);
context = context || method;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 488);
var returnValue;

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 490);
if (argLength > 0) {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 491);
returnValue = method.apply(context, AArray(arguments, 0, true).slice(0, argLength));
			}
			else {
				_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 494);
returnValue = method.call(context);
			}

			_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 497);
return returnValue;
		};
	}

	_yuitest_coverline("/build/aui-base-core/aui-base-core.js", 501);
return wrappedFn;
};

}, '@VERSION@' ,{requires:['aui-classnamemanager','aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop','yui-throttle'], skinnable:false});
