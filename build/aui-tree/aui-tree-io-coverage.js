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
_yuitest_coverage["/build/aui-tree-io/aui-tree-io.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-tree-io/aui-tree-io.js",
    code: []
};
_yuitest_coverage["/build/aui-tree-io/aui-tree-io.js"].code=["AUI.add('aui-tree-io', function(A) {","var Lang = A.Lang,","	isFunction = Lang.isFunction,","	isString = Lang.isString,","","	EVENT_IO_REQUEST_SUCCESS = 'ioRequestSuccess',","","	CONTENT_BOX = 'contentBox',","	IO = 'io',","	OWNER_TREE = 'ownerTree',","	LOADED = 'loaded',","	LOADING = 'loading',","	NODE = 'node',","	TREE = 'tree',","","	getCN = A.getClassName,","","	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);","","function TreeViewIO(config) {","	var instance = this;","","	instance.publish(","		EVENT_IO_REQUEST_SUCCESS,","		{","			defaultFn: instance._onIOSuccessDefault","		}","	);","}","","","TreeViewIO.ATTRS = {","	/**","	 * IO options for the current TreeNode load the children.","	 *","	 * @attribute io","	 * @default Default IO Configuration.","	 * @type Object","	 */","	io: {","		lazyAdd: false,","		value: null,","		setter: function(v) {","			return this._setIO(v);","		}","	}","};","","TreeViewIO.prototype = {","	initializer: function() {","		var instance = this;","","		instance.publish(","","		);","	},","","	/**","	 * Initialize the IO transaction setup on the <a","	 * href=\"TreeNode.html#config_io\">io</a> attribute.","	 *","	 * @method initIO","	 */","	initIO: function() {","		var instance = this;","","		var io = instance.get(IO);","","		if (isFunction(io.cfg.data)) {","			io.cfg.data = io.cfg.data.call(instance, instance);","		}","","		instance._syncPaginatorIOData(io);","","		if (isFunction(io.loader)) {","			var loader = A.bind(io.loader, instance);","","			// apply loader in the TreeNodeIO scope","			loader(io.url, io.cfg, instance);","		}","		else {","			A.io.request(io.url, io.cfg);","		}","	},","","	/**","	 * IO Start handler.","	 *","	 * @method ioStartHandler","	 */","	ioStartHandler: function() {","		var instance = this;","","		var contentBox = instance.get(CONTENT_BOX);","","		instance.set(LOADING, true);","","		contentBox.addClass(CSS_TREE_NODE_IO_LOADING);","	},","","	/**","	 * IO Complete handler.","	 *","	 * @method ioCompleteHandler","	 */","	ioCompleteHandler: function() {","		var instance = this;","","		var contentBox = instance.get(CONTENT_BOX);","","		instance.set(LOADING, false);","		instance.set(LOADED, true);","","		contentBox.removeClass(CSS_TREE_NODE_IO_LOADING);","	},","","	/**","	 * IO Success handler.","	 *","	 * @method ioSuccessHandler","	 */","	ioSuccessHandler: function() {","		var instance = this;","","		var io = instance.get(IO);","","		var args = Array.prototype.slice.call(arguments);","		var length = args.length;","","		// if using the first argument as the JSON object","		var nodes = args[1];","","		// if using (event, id, o) yui callback syntax","		if (length >= 3) {","			var o = args[2];","			// try to convert responseText to JSON","			try {","				nodes = A.JSON.parse(o.responseText);","			}","			catch(e) {}","		}","","		var formatter = io.formatter;","","		if (formatter) {","			nodes = formatter(nodes);","		}","","		instance.createNodes(nodes);","","		instance.fire(EVENT_IO_REQUEST_SUCCESS, nodes);","	},","","	/**","	 * IO Failure handler.","	 *","	 * @method ioFailureHandler","	 */","	ioFailureHandler: function() {","		var instance = this;","","		instance.fire('ioRequestFailure');","","		instance.set(LOADING, false);","		instance.set(LOADED, false);","	},","","	_onIOSuccessDefault: function(event) {","		var instance = this;","","		var ownerTree = instance.get(OWNER_TREE);","","		if (ownerTree && ownerTree.ddDelegate) {","			ownerTree.ddDelegate.syncTargets();","		}","	},","","	/**","	 * Setter for <a href=\"TreeNodeIO.html#config_io\">io</a>.","	 *","	 * @method _setIO","	 * @protected","	 * @param {Object} v","	 * @return {Object}","	 */","	_setIO: function(v) {","		var instance = this;","","		if (!v) {","			return null;","		}","		else if (isString(v)) {","			v = { url: v };","		}","","		v = v || {};","		v.cfg = v.cfg || {};","		v.cfg.on = v.cfg.on || {};","","		var defCallbacks = {","			start: A.bind(instance.ioStartHandler, instance),","			complete: A.bind(instance.ioCompleteHandler, instance),","			success: A.bind(instance.ioSuccessHandler, instance),","			failure: A.bind(instance.ioFailureHandler, instance)","		};","","		A.each(defCallbacks, function(fn, name) {","			var userFn = v.cfg.on[name];","","			fn.defaultFn = true;","","			if (isFunction(userFn)) {","				// wrapping user callback and default callback, invoking both handlers","				var wrappedFn = A.bind(","					function() {","						fn.apply(instance, arguments);","						userFn.apply(instance, arguments);","					},","					instance","				);","","				wrappedFn.wrappedFn = true;","","				v.cfg.on[name] = wrappedFn;","			}","			else {","				// get from defCallbacks map","				v.cfg.on[name] = fn;","			}","","		});","","		return v;","	}","};","","A.TreeViewIO = TreeViewIO;","","}, '@VERSION@' ,{requires:['aui-io','json'], skinnable:false});"];
_yuitest_coverage["/build/aui-tree-io/aui-tree-io.js"].lines = {"1":0,"2":0,"20":0,"21":0,"23":0,"32":0,"44":0,"49":0,"51":0,"53":0,"65":0,"67":0,"69":0,"70":0,"73":0,"75":0,"76":0,"79":0,"82":0,"92":0,"94":0,"96":0,"98":0,"107":0,"109":0,"111":0,"112":0,"114":0,"123":0,"125":0,"127":0,"128":0,"131":0,"134":0,"135":0,"137":0,"138":0,"143":0,"145":0,"146":0,"149":0,"151":0,"160":0,"162":0,"164":0,"165":0,"169":0,"171":0,"173":0,"174":0,"187":0,"189":0,"190":0,"192":0,"193":0,"196":0,"197":0,"198":0,"200":0,"207":0,"208":0,"210":0,"212":0,"214":0,"216":0,"217":0,"222":0,"224":0,"228":0,"233":0,"237":0};
_yuitest_coverage["/build/aui-tree-io/aui-tree-io.js"].functions = {"TreeViewIO:20":0,"setter:43":0,"initializer:50":0,"initIO:64":0,"ioStartHandler:91":0,"ioCompleteHandler:106":0,"ioSuccessHandler:122":0,"ioFailureHandler:159":0,"_onIOSuccessDefault:168":0,"(anonymous 3):215":0,"(anonymous 2):207":0,"_setIO:186":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-tree-io/aui-tree-io.js"].coveredLines = 71;
_yuitest_coverage["/build/aui-tree-io/aui-tree-io.js"].coveredFunctions = 13;
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 1);
AUI.add('aui-tree-io', function(A) {
_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 2);
var Lang = A.Lang,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	EVENT_IO_REQUEST_SUCCESS = 'ioRequestSuccess',

	CONTENT_BOX = 'contentBox',
	IO = 'io',
	OWNER_TREE = 'ownerTree',
	LOADED = 'loaded',
	LOADING = 'loading',
	NODE = 'node',
	TREE = 'tree',

	getCN = A.getClassName,

	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);

_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 20);
function TreeViewIO(config) {
	_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "TreeViewIO", 20);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 21);
var instance = this;

	_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 23);
instance.publish(
		EVENT_IO_REQUEST_SUCCESS,
		{
			defaultFn: instance._onIOSuccessDefault
		}
	);
}


_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 32);
TreeViewIO.ATTRS = {
	/**
	 * IO options for the current TreeNode load the children.
	 *
	 * @attribute io
	 * @default Default IO Configuration.
	 * @type Object
	 */
	io: {
		lazyAdd: false,
		value: null,
		setter: function(v) {
			_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "setter", 43);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 44);
return this._setIO(v);
		}
	}
};

_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 49);
TreeViewIO.prototype = {
	initializer: function() {
		_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "initializer", 50);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 51);
var instance = this;

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 53);
instance.publish(

		);
	},

	/**
	 * Initialize the IO transaction setup on the <a
	 * href="TreeNode.html#config_io">io</a> attribute.
	 *
	 * @method initIO
	 */
	initIO: function() {
		_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "initIO", 64);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 65);
var instance = this;

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 67);
var io = instance.get(IO);

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 69);
if (isFunction(io.cfg.data)) {
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 70);
io.cfg.data = io.cfg.data.call(instance, instance);
		}

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 73);
instance._syncPaginatorIOData(io);

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 75);
if (isFunction(io.loader)) {
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 76);
var loader = A.bind(io.loader, instance);

			// apply loader in the TreeNodeIO scope
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 79);
loader(io.url, io.cfg, instance);
		}
		else {
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 82);
A.io.request(io.url, io.cfg);
		}
	},

	/**
	 * IO Start handler.
	 *
	 * @method ioStartHandler
	 */
	ioStartHandler: function() {
		_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "ioStartHandler", 91);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 92);
var instance = this;

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 94);
var contentBox = instance.get(CONTENT_BOX);

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 96);
instance.set(LOADING, true);

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 98);
contentBox.addClass(CSS_TREE_NODE_IO_LOADING);
	},

	/**
	 * IO Complete handler.
	 *
	 * @method ioCompleteHandler
	 */
	ioCompleteHandler: function() {
		_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "ioCompleteHandler", 106);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 107);
var instance = this;

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 109);
var contentBox = instance.get(CONTENT_BOX);

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 111);
instance.set(LOADING, false);
		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 112);
instance.set(LOADED, true);

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 114);
contentBox.removeClass(CSS_TREE_NODE_IO_LOADING);
	},

	/**
	 * IO Success handler.
	 *
	 * @method ioSuccessHandler
	 */
	ioSuccessHandler: function() {
		_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "ioSuccessHandler", 122);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 123);
var instance = this;

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 125);
var io = instance.get(IO);

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 127);
var args = Array.prototype.slice.call(arguments);
		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 128);
var length = args.length;

		// if using the first argument as the JSON object
		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 131);
var nodes = args[1];

		// if using (event, id, o) yui callback syntax
		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 134);
if (length >= 3) {
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 135);
var o = args[2];
			// try to convert responseText to JSON
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 137);
try {
				_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 138);
nodes = A.JSON.parse(o.responseText);
			}
			catch(e) {}
		}

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 143);
var formatter = io.formatter;

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 145);
if (formatter) {
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 146);
nodes = formatter(nodes);
		}

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 149);
instance.createNodes(nodes);

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 151);
instance.fire(EVENT_IO_REQUEST_SUCCESS, nodes);
	},

	/**
	 * IO Failure handler.
	 *
	 * @method ioFailureHandler
	 */
	ioFailureHandler: function() {
		_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "ioFailureHandler", 159);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 160);
var instance = this;

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 162);
instance.fire('ioRequestFailure');

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 164);
instance.set(LOADING, false);
		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 165);
instance.set(LOADED, false);
	},

	_onIOSuccessDefault: function(event) {
		_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "_onIOSuccessDefault", 168);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 169);
var instance = this;

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 171);
var ownerTree = instance.get(OWNER_TREE);

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 173);
if (ownerTree && ownerTree.ddDelegate) {
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 174);
ownerTree.ddDelegate.syncTargets();
		}
	},

	/**
	 * Setter for <a href="TreeNodeIO.html#config_io">io</a>.
	 *
	 * @method _setIO
	 * @protected
	 * @param {Object} v
	 * @return {Object}
	 */
	_setIO: function(v) {
		_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "_setIO", 186);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 187);
var instance = this;

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 189);
if (!v) {
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 190);
return null;
		}
		else {_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 192);
if (isString(v)) {
			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 193);
v = { url: v };
		}}

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 196);
v = v || {};
		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 197);
v.cfg = v.cfg || {};
		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 198);
v.cfg.on = v.cfg.on || {};

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 200);
var defCallbacks = {
			start: A.bind(instance.ioStartHandler, instance),
			complete: A.bind(instance.ioCompleteHandler, instance),
			success: A.bind(instance.ioSuccessHandler, instance),
			failure: A.bind(instance.ioFailureHandler, instance)
		};

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 207);
A.each(defCallbacks, function(fn, name) {
			_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "(anonymous 2)", 207);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 208);
var userFn = v.cfg.on[name];

			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 210);
fn.defaultFn = true;

			_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 212);
if (isFunction(userFn)) {
				// wrapping user callback and default callback, invoking both handlers
				_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 214);
var wrappedFn = A.bind(
					function() {
						_yuitest_coverfunc("/build/aui-tree-io/aui-tree-io.js", "(anonymous 3)", 215);
_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 216);
fn.apply(instance, arguments);
						_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 217);
userFn.apply(instance, arguments);
					},
					instance
				);

				_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 222);
wrappedFn.wrappedFn = true;

				_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 224);
v.cfg.on[name] = wrappedFn;
			}
			else {
				// get from defCallbacks map
				_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 228);
v.cfg.on[name] = fn;
			}

		});

		_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 233);
return v;
	}
};

_yuitest_coverline("/build/aui-tree-io/aui-tree-io.js", 237);
A.TreeViewIO = TreeViewIO;

}, '@VERSION@' ,{requires:['aui-io','json'], skinnable:false});
