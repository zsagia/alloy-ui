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
_yuitest_coverage["/build/aui-tree-paginator/aui-tree-paginator.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-tree-paginator/aui-tree-paginator.js",
    code: []
};
_yuitest_coverage["/build/aui-tree-paginator/aui-tree-paginator.js"].code=["AUI.add('aui-tree-paginator', function(A) {","var Lang = A.Lang,","	isObject = Lang.isObject,","	isValue = Lang.isValue,","","	getCN = A.getClassName,","","	CHILDREN = 'children',","	CONTAINER = 'container',","	END = 'end',","	IO = 'io',","	LIMIT = 'limit',","	MORE_RESULTS_LABEL = 'Load more results',","	NODE = 'node',","	OWNER_TREE = 'ownerTree',","	PAGINATOR = 'paginator',","	START = 'start',","	TREE = 'tree',","	TREE_NODE_IO = 'tree-node-io',","","	EV_TREE_NODE_PAGINATOR_CLICK = 'paginatorClick',","","	CSS_TREE_NODE_PAGINATOR = getCN(TREE, NODE, PAGINATOR),","","	TPL_PAGINATOR = '<a class=\"' + CSS_TREE_NODE_PAGINATOR + '\" href=\"javascript:void(0);\">{moreResultsLabel}</a>';","","function TreeViewPaginator(config) {","	var instance = this;","","	A.after(instance._bindPaginatorUI, this, 'bindUI');","","	A.after(instance._syncPaginatorUI, this, 'syncUI');","}","","TreeViewPaginator.ATTRS = {","	paginator: {","		setter: function(value) {","			var instance = this;","","			var paginatorNode = A.Node.create(","				Lang.sub(","					TPL_PAGINATOR,","					{","						moreResultsLabel: value.moreResultsLabel || MORE_RESULTS_LABEL","					}","				)","			);","","			return A.merge(","				{","					alwaysVisible: false,","					autoFocus: true,","					element: paginatorNode,","					endParam: END,","					limitParam: LIMIT,","					start: 0,","					startParam: START","				},","				value","			);","		},","		validator: isObject","	}","};","","","TreeViewPaginator.prototype = {","	/**","	 * Bind events to the paginator \"show more\" link.","	 *","	 * @method _bindPaginatorUI","	 * @protected","	 */","	_bindPaginatorUI: function() {","		var instance = this;","","		var paginator = instance.get(PAGINATOR);","","		if (paginator) {","			paginator.element.on('click', A.bind(instance._handlePaginatorClickEvent, instance));","		}","","		instance._createEvents();","	},","","	/**","	 * Create custom events.","	 *","	 * @method _createEvents","	 * @private","	 */","	_createEvents: function() {","		var instance = this;","","		instance.publish(","			EV_TREE_NODE_PAGINATOR_CLICK,","			{","				defaultFn: instance._defPaginatorClickFn,","				prefix: TREE_NODE_IO","			}","		);","	},","","	/**","	 * Default paginatorClick event handler. Increment the","	 * <code>paginator.start</code> to the next <code>paginator.limit</code>.","	 *","	 * @method _defPaginatorClickFn","	 * @param {EventFacade} event The Event object","	 * @protected","	 */","	_defPaginatorClickFn: function(event) {","		var instance = this;","","		var paginator = instance.get(PAGINATOR);","","		if (isValue(paginator.limit)) {","			paginator.start = instance.getChildrenLength();","		}","","		if (instance.get(IO)) {","			instance.initIO();","		}","	},","","	/**","	 * Fires the paginatorClick event.","	 *","	 * @method _handlePaginatorClickEvent","	 * @param {EventFacade} event paginatorClick event facade","	 * @protected","	 */","	_handlePaginatorClickEvent: function(event) {","		var instance = this;","","		var output = instance.getEventOutputMap(instance);","","		instance.fire(EV_TREE_NODE_PAGINATOR_CLICK, output);","","		event.halt();","	},","","	/**","	 * Adds two extra IO data parameter to the request to handle the","	 * paginator. By default these parameters are <code>limit</code> and","	 * <code>start</code>.","	 *","	 * @method _syncPaginatorIOData","	 * @protected","	 */","	_syncPaginatorIOData: function(io) {","		var instance = this;","","		var paginator = instance.get(PAGINATOR);","","		if (paginator && isValue(paginator.limit)) {","			var data = io.cfg.data || {};","","			data[ paginator.limitParam ] = paginator.limit;","			data[ paginator.startParam ] = paginator.start;","			data[ paginator.endParam ] = (paginator.start + paginator.limit);","","			io.cfg.data = data;","		}","	},","","	/**","	 * Sync the paginator link UI.","	 *","	 * @method _syncPaginatorUI","	 * @protected","	 */","	_syncPaginatorUI: function(newNodes) {","		var instance = this;","","		var paginator = instance.get(PAGINATOR);","","		if (paginator) {","			var hasMoreData = true;","","			if (newNodes) {","				hasMoreData = (newNodes.length > 0);","			}","","			var childrenLength = instance.getChildrenLength();","			var start = paginator.start;","			var total = paginator.total || childrenLength;","","			var showPaginator = childrenLength && hasMoreData && (total > childrenLength);","","			if (paginator.alwaysVisible || showPaginator) {","				instance.get(CONTAINER).append(","					paginator.element.show()","				);","","				if (paginator.autoFocus) {","					try {","						paginator.element.focus();","					}","					catch(e) {}","				}","			}","			else {","				paginator.element.hide();","			}","		}","	}","};","","A.TreeViewPaginator = TreeViewPaginator;","","}, '@VERSION@' ,{requires:['aui-base'], skinnable:false});"];
_yuitest_coverage["/build/aui-tree-paginator/aui-tree-paginator.js"].lines = {"1":0,"2":0,"27":0,"28":0,"30":0,"32":0,"35":0,"38":0,"40":0,"49":0,"67":0,"75":0,"77":0,"79":0,"80":0,"83":0,"93":0,"95":0,"113":0,"115":0,"117":0,"118":0,"121":0,"122":0,"134":0,"136":0,"138":0,"140":0,"152":0,"154":0,"156":0,"157":0,"159":0,"160":0,"161":0,"163":0,"174":0,"176":0,"178":0,"179":0,"181":0,"182":0,"185":0,"186":0,"187":0,"189":0,"191":0,"192":0,"196":0,"197":0,"198":0,"204":0,"210":0};
_yuitest_coverage["/build/aui-tree-paginator/aui-tree-paginator.js"].functions = {"TreeViewPaginator:27":0,"setter:37":0,"_bindPaginatorUI:74":0,"_createEvents:92":0,"_defPaginatorClickFn:112":0,"_handlePaginatorClickEvent:133":0,"_syncPaginatorIOData:151":0,"_syncPaginatorUI:173":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-tree-paginator/aui-tree-paginator.js"].coveredLines = 53;
_yuitest_coverage["/build/aui-tree-paginator/aui-tree-paginator.js"].coveredFunctions = 9;
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 1);
AUI.add('aui-tree-paginator', function(A) {
_yuitest_coverfunc("/build/aui-tree-paginator/aui-tree-paginator.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 2);
var Lang = A.Lang,
	isObject = Lang.isObject,
	isValue = Lang.isValue,

	getCN = A.getClassName,

	CHILDREN = 'children',
	CONTAINER = 'container',
	END = 'end',
	IO = 'io',
	LIMIT = 'limit',
	MORE_RESULTS_LABEL = 'Load more results',
	NODE = 'node',
	OWNER_TREE = 'ownerTree',
	PAGINATOR = 'paginator',
	START = 'start',
	TREE = 'tree',
	TREE_NODE_IO = 'tree-node-io',

	EV_TREE_NODE_PAGINATOR_CLICK = 'paginatorClick',

	CSS_TREE_NODE_PAGINATOR = getCN(TREE, NODE, PAGINATOR),

	TPL_PAGINATOR = '<a class="' + CSS_TREE_NODE_PAGINATOR + '" href="javascript:void(0);">{moreResultsLabel}</a>';

_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 27);
function TreeViewPaginator(config) {
	_yuitest_coverfunc("/build/aui-tree-paginator/aui-tree-paginator.js", "TreeViewPaginator", 27);
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 28);
var instance = this;

	_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 30);
A.after(instance._bindPaginatorUI, this, 'bindUI');

	_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 32);
A.after(instance._syncPaginatorUI, this, 'syncUI');
}

_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 35);
TreeViewPaginator.ATTRS = {
	paginator: {
		setter: function(value) {
			_yuitest_coverfunc("/build/aui-tree-paginator/aui-tree-paginator.js", "setter", 37);
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 38);
var instance = this;

			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 40);
var paginatorNode = A.Node.create(
				Lang.sub(
					TPL_PAGINATOR,
					{
						moreResultsLabel: value.moreResultsLabel || MORE_RESULTS_LABEL
					}
				)
			);

			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 49);
return A.merge(
				{
					alwaysVisible: false,
					autoFocus: true,
					element: paginatorNode,
					endParam: END,
					limitParam: LIMIT,
					start: 0,
					startParam: START
				},
				value
			);
		},
		validator: isObject
	}
};


_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 67);
TreeViewPaginator.prototype = {
	/**
	 * Bind events to the paginator "show more" link.
	 *
	 * @method _bindPaginatorUI
	 * @protected
	 */
	_bindPaginatorUI: function() {
		_yuitest_coverfunc("/build/aui-tree-paginator/aui-tree-paginator.js", "_bindPaginatorUI", 74);
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 75);
var instance = this;

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 77);
var paginator = instance.get(PAGINATOR);

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 79);
if (paginator) {
			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 80);
paginator.element.on('click', A.bind(instance._handlePaginatorClickEvent, instance));
		}

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 83);
instance._createEvents();
	},

	/**
	 * Create custom events.
	 *
	 * @method _createEvents
	 * @private
	 */
	_createEvents: function() {
		_yuitest_coverfunc("/build/aui-tree-paginator/aui-tree-paginator.js", "_createEvents", 92);
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 93);
var instance = this;

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 95);
instance.publish(
			EV_TREE_NODE_PAGINATOR_CLICK,
			{
				defaultFn: instance._defPaginatorClickFn,
				prefix: TREE_NODE_IO
			}
		);
	},

	/**
	 * Default paginatorClick event handler. Increment the
	 * <code>paginator.start</code> to the next <code>paginator.limit</code>.
	 *
	 * @method _defPaginatorClickFn
	 * @param {EventFacade} event The Event object
	 * @protected
	 */
	_defPaginatorClickFn: function(event) {
		_yuitest_coverfunc("/build/aui-tree-paginator/aui-tree-paginator.js", "_defPaginatorClickFn", 112);
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 113);
var instance = this;

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 115);
var paginator = instance.get(PAGINATOR);

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 117);
if (isValue(paginator.limit)) {
			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 118);
paginator.start = instance.getChildrenLength();
		}

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 121);
if (instance.get(IO)) {
			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 122);
instance.initIO();
		}
	},

	/**
	 * Fires the paginatorClick event.
	 *
	 * @method _handlePaginatorClickEvent
	 * @param {EventFacade} event paginatorClick event facade
	 * @protected
	 */
	_handlePaginatorClickEvent: function(event) {
		_yuitest_coverfunc("/build/aui-tree-paginator/aui-tree-paginator.js", "_handlePaginatorClickEvent", 133);
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 134);
var instance = this;

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 136);
var output = instance.getEventOutputMap(instance);

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 138);
instance.fire(EV_TREE_NODE_PAGINATOR_CLICK, output);

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 140);
event.halt();
	},

	/**
	 * Adds two extra IO data parameter to the request to handle the
	 * paginator. By default these parameters are <code>limit</code> and
	 * <code>start</code>.
	 *
	 * @method _syncPaginatorIOData
	 * @protected
	 */
	_syncPaginatorIOData: function(io) {
		_yuitest_coverfunc("/build/aui-tree-paginator/aui-tree-paginator.js", "_syncPaginatorIOData", 151);
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 152);
var instance = this;

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 154);
var paginator = instance.get(PAGINATOR);

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 156);
if (paginator && isValue(paginator.limit)) {
			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 157);
var data = io.cfg.data || {};

			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 159);
data[ paginator.limitParam ] = paginator.limit;
			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 160);
data[ paginator.startParam ] = paginator.start;
			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 161);
data[ paginator.endParam ] = (paginator.start + paginator.limit);

			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 163);
io.cfg.data = data;
		}
	},

	/**
	 * Sync the paginator link UI.
	 *
	 * @method _syncPaginatorUI
	 * @protected
	 */
	_syncPaginatorUI: function(newNodes) {
		_yuitest_coverfunc("/build/aui-tree-paginator/aui-tree-paginator.js", "_syncPaginatorUI", 173);
_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 174);
var instance = this;

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 176);
var paginator = instance.get(PAGINATOR);

		_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 178);
if (paginator) {
			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 179);
var hasMoreData = true;

			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 181);
if (newNodes) {
				_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 182);
hasMoreData = (newNodes.length > 0);
			}

			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 185);
var childrenLength = instance.getChildrenLength();
			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 186);
var start = paginator.start;
			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 187);
var total = paginator.total || childrenLength;

			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 189);
var showPaginator = childrenLength && hasMoreData && (total > childrenLength);

			_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 191);
if (paginator.alwaysVisible || showPaginator) {
				_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 192);
instance.get(CONTAINER).append(
					paginator.element.show()
				);

				_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 196);
if (paginator.autoFocus) {
					_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 197);
try {
						_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 198);
paginator.element.focus();
					}
					catch(e) {}
				}
			}
			else {
				_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 204);
paginator.element.hide();
			}
		}
	}
};

_yuitest_coverline("/build/aui-tree-paginator/aui-tree-paginator.js", 210);
A.TreeViewPaginator = TreeViewPaginator;

}, '@VERSION@' ,{requires:['aui-base'], skinnable:false});
