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
_yuitest_coverage["/build/aui-tree-node/aui-tree-node.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-tree-node/aui-tree-node.js",
    code: []
};
_yuitest_coverage["/build/aui-tree-node/aui-tree-node.js"].code=["AUI.add('aui-tree-node', function(A) {","/**"," * The TreeNode Utility"," *"," * @module aui-tree"," * @submodule aui-tree-node"," */","","var Lang = A.Lang,","	isString = Lang.isString,","	isBoolean = Lang.isBoolean,","","	ALWAYS_SHOW_HITAREA = 'alwaysShowHitArea',","	BLANK = '',","	BOUNDING_BOX = 'boundingBox',","	CHILDREN = 'children',","	CLEARFIX = 'clearfix',","	COLLAPSED = 'collapsed',","	CONTAINER = 'container',","	CONTENT = 'content',","	CONTENT_BOX = 'contentBox',","	EXPANDED = 'expanded',","	HELPER = 'helper',","	HIDDEN = 'hidden',","	HIT_AREA_EL = 'hitAreaEl',","	HITAREA = 'hitarea',","	ICON = 'icon',","	ICON_EL = 'iconEl',","	ID = 'id',","	LABEL = 'label',","	LABEL_EL = 'labelEl',","	LAST_SELECTED = 'lastSelected',","	LEAF = 'leaf',","	NODE = 'node',","	OVER = 'over',","	OWNER_TREE = 'ownerTree',","	PARENT_NODE = 'parentNode',","	RADIO = 'radio',","	RENDERED = 'rendered',","	SELECTED = 'selected',","	SPACE = ' ',","	TREE = 'tree',","	TREE_NODE = 'tree-node',","","	concat = function() {","		return Array.prototype.slice.call(arguments).join(SPACE);","	},","","	isTreeNode = function(v) {","		return (v instanceof A.TreeNode);","	},","","	isTreeView = function(v) {","		return (v instanceof A.TreeView);","	},","","	getCN = A.getClassName,","","	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),","	CSS_TREE_COLLAPSED = getCN(TREE, COLLAPSED),","	CSS_TREE_CONTAINER = getCN(TREE, CONTAINER),","	CSS_TREE_CONTENT_BOX = getCN(TREE, CONTENT_BOX),","	CSS_TREE_EXPANDED = getCN(TREE, EXPANDED),","	CSS_TREE_HIDDEN = getCN(TREE, HIDDEN),","	CSS_TREE_HITAREA = getCN(TREE, HITAREA),","	CSS_TREE_ICON = getCN(TREE, ICON),","	CSS_TREE_LABEL = getCN(TREE, LABEL),","	CSS_TREE_NODE = getCN(TREE, NODE),","	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),","	CSS_TREE_NODE_HIDDEN_HITAREA = getCN(TREE, NODE, HIDDEN, HITAREA),","	CSS_TREE_NODE_LEAF = getCN(TREE, NODE, LEAF),","	CSS_TREE_NODE_OVER = getCN(TREE, NODE, OVER),","	CSS_TREE_NODE_SELECTED = getCN(TREE, NODE, SELECTED),","","	HIT_AREA_TPL = '<div class=\"' + CSS_TREE_HITAREA + '\"></div>',","	ICON_TPL = '<div class=\"' + CSS_TREE_ICON + '\"></div>',","	LABEL_TPL = '<div class=\"' + CSS_TREE_LABEL + '\"></div>',","	NODE_CONTAINER_TPL = '<ul></ul>',","","	NODE_BOUNDING_TEMPLATE = '<li class=\"' + CSS_TREE_NODE + '\"></li>',","	NODE_CONTENT_TEMPLATE = '<div class=\"' + concat(CSS_HELPER_CLEARFIX, CSS_TREE_NODE_CONTENT) + '\"></div>';","","/**"," * A base class for TreeNode, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>The node for the TreeView component</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.TreeNode({","	boundingBox: ''","}).render();"," * </code></pre>"," *"," * Check the list of <a href=\"TreeNode.html#configattributes\">Configuration Attributes</a> available for"," * TreeNode."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNode"," * @constructor"," * @extends TreeData"," */","var TreeNode = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeNode.","		 *","		 * @property TreeNode.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Always show the hitarea icon.","			 *","			 * @attribute alwaysShowHitArea","			 * @default true","			 * @type boolean","			 */","			alwaysShowHitArea: {","				validator: isBoolean,","				value: true","			},","","			boundingBox: {","				valueFn: function() {","					return A.Node.create(NODE_BOUNDING_TEMPLATE);","				}","			},","","			contentBox: {","				valueFn: function() {","					return A.Node.create(NODE_CONTENT_TEMPLATE);","				}","			},","","			/**","			 * If true the TreeNode is draggable.","			 *","			 * @attribute draggable","			 * @default true","			 * @type boolean","			 */","			draggable: {","				validator: isBoolean,","				value: true","			},","","			/**","			 * Whether the TreeNode is expanded by default.","			 *","			 * @attribute expanded","			 * @default false","			 * @type boolean","			 */","			expanded: {","				validator: isBoolean,","				value: false","			},","","			/**","			 * Hitarea element.","			 *","			 * @attribute hitAreaEl","			 * @default Generated DOM element.","			 * @type Node | String","			 */","			hitAreaEl: {","				setter: A.one,","				valueFn: function() {","					return A.Node.create(HIT_AREA_TPL);","				}","			},","","			/**","			 * Icon element.","			 *","			 * @attribute iconEl","			 * @type Node | String","			 */","			iconEl: {","				setter: A.one,","				valueFn: function() {","					return A.Node.create(ICON_TPL);","				}","			},","","			/**","			 * Id of the TreeNode.","			 *","			 * @attribute id","			 * @default null","			 * @type String","			 */","			id: {","				validator: isString,","				valueFn: function() {","					return A.guid();","				}","			},","","			/**","			 * Label of the TreeNode.","			 *","			 * @attribute label","			 * @default ''","			 * @type String","			 */","			label: {","				validator: isString,","				value: BLANK","			},","","			/**","			 * Label element to house the <code>label</code> attribute.","			 *","			 * @attribute labelEl","			 * @default Generated DOM element.","			 * @type Node | String","			 */","			labelEl: {","				setter: A.one,","				valueFn: function() {","					var instance = this;","","					var label = instance.get(LABEL);","","					return A.Node.create(LABEL_TPL).html(label).unselectable();","				}","			},","","			/**","			 * Whether the TreeNode could have children or not (i.e. if any","			 * children is present the TreeNode is a leaf).","			 *","			 * @attribute leaf","			 * @default true","			 * @type boolean","			 */","			leaf: {","				setter: function(v) {","					var instance = this;","","					// if has children it's not a leaf","					if (v && instance.get(CHILDREN).length) {","						return false;","					}","","					return v;","				},","				validator: isBoolean,","				value: true","			},","","			/**","			 * Next sibling of the current TreeNode.","			 *","			 * @attribute nextSibling","			 * @default null","			 * @type TreeNode","			 */","			nextSibling: {","				getter: '_getSibling',","				validator: isTreeNode,","				value: null","			},","","			/**","			 * TreeView which contains the current TreeNode.","			 *","			 * @attribute ownerTree","			 * @default null","			 * @type TreeView","			 */","			ownerTree: {","				value: null","			},","","			/**","			 * Parent node of the current TreeNode.","			 *","			 * @attribute parentNode","			 * @default null","			 * @type TreeNode","			 */","			parentNode: {","				validator: function(val) {","					return isTreeNode(val) || isTreeView(val);","				},","				value: null","			},","","			/**","			 * Previous sibling of the current TreeNode.","			 *","			 * @attribute prevSibling","			 * @default null","			 * @type TreeNode","			 */","			prevSibling: {","				getter: '_getSibling',","				validator: isTreeNode,","				value: null","			},","","			rendered: {","				validator: isBoolean,","				value: false","			},","","			tabIndex: {","				value: null","			}","		},","","		AUGMENTS: [A.TreeData],","","		EXTENDS: A.Base,","","		prototype: {","			/**","			 * Replaced BOUNDING_TEMPLATE with NODE_BOUNDING_TEMPLATE.","			 *","			 * @property BOUNDING_TEMPLATE","			 * @type String","			 * @protected","			 */","			BOUNDING_TEMPLATE: NODE_BOUNDING_TEMPLATE,","			/**","			 * Replaced CONTENT_TEMPLATE with NODE_CONTENT_TEMPLATE.","			 *","			 * @property CONTENT_TEMPLATE","			 * @type String","			 * @protected","			 */","			CONTENT_TEMPLATE: NODE_CONTENT_TEMPLATE,","","			/**","			 * Construction logic executed during TreeNode instantiation. Lifecycle.","			 *","			 * @method initializer","			 * @protected","			 */","			initializer: function() {","				var instance = this;","","				instance.get(BOUNDING_BOX).setData(TREE_NODE, instance);","","				// Sync the Widget TreeNode id with the BOUNDING_BOX id","				instance._syncTreeNodeBBId();","","				instance._uiSetExpanded(instance.get(EXPANDED));","","				instance._uiSetLeaf(instance.get(LEAF));","","				instance.initTreeData();","			},","","			/**","			 * Bind the events on the TreeNode UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));","				instance.after('expandedChange', A.bind(instance._afterExpandedChange, instance));","				instance.after('idChange', instance._afterSetId, instance);","			},","","			render: function(container) {","				var instance = this;","","				if (!instance.get(RENDERED)) {","					instance.renderUI();","					instance.bindUI();","					instance.syncUI();","","					instance.set(RENDERED, true);","				}","","				if (container) {","					var boundingBox = instance.get(BOUNDING_BOX);","					var parentNode = instance.get(PARENT_NODE);","","					boundingBox.appendTo(container);","","					if (parentNode) {","						var paginator = parentNode.get(PAGINATOR);","","						if (paginator) {","							boundingBox.insertBefore(paginator.element, null);","						}","					}","				}","			},","","			/**","			 * Create the DOM structure for the TreeNode. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				instance._renderBoundingBox();","				instance._renderContentBox();","			},","","			/**","			 * Sync the TreeNode UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				instance._syncIconUI();","			},","","			/*","			* Methods","			*/","			appendChild: function() {","				var instance = this;","","				if (!instance.isLeaf()) {","					A.TreeNode.superclass.appendChild.apply(instance, arguments);","				}","			},","","			/**","			 * Collapse the current TreeNode.","			 *","			 * @method collapse","			 */","			collapse: function() {","				var instance = this;","","				instance.set(EXPANDED, false);","			},","","			collapseAll: function() {","				var instance = this;","","				A.TreeNode.superclass.collapseAll.apply(instance, arguments);","","				// instance is also a node, so collapse itself","				instance.collapse();","			},","","			/**","			 * Check if the current TreeNode contains the passed <code>node</code>.","			 *","			 * @method contains","			 * @param {TreeNode} node","			 * @return {boolean}","			 */","			contains: function(node) {","				var instance = this;","","				return node.isAncestor(instance);","			},","","			/**","			 * Expand the current TreeNode.","			 *","			 * @method expand","			 */","			expand: function() {","				var instance = this;","","				instance.set(EXPANDED, true);","			},","","			expandAll: function() {","				var instance = this;","","				A.TreeNode.superclass.expandAll.apply(instance, arguments);","","				// instance is also a node, so expand itself","				instance.expand();","			},","","			/**","			 * Get the depth of the current TreeNode.","			 *","			 * @method getDepth","			 * @return {Number}","			 */","			getDepth: function() {","				var instance = this;","","				var depth = 0;","","				var parentNode = instance.get(PARENT_NODE);","","				while (parentNode) {","					++depth;","","					parentNode = parentNode.get(PARENT_NODE);","				}","","				return depth;","			},","","			hasChildNodes: function() {","				var instance = this;","","				return (!instance.isLeaf() && A.TreeNode.superclass.hasChildNodes.apply(instance, arguments));","			},","","			/*","			* Hide hitarea icon.","			*","			* @method hideHitArea","			*/","			hideHitArea: function() {","				var instance = this;","","				instance.get(HIT_AREA_EL).addClass(CSS_TREE_NODE_HIDDEN_HITAREA);","			},","","			/**","			 * Whether the current TreeNode is ancestor of the passed <code>node</code> or not.","			 *","			 * @method isLeaf","			 * @return {boolean}","			 */","			isAncestor: function(node) {","				var instance = this;","","				var parentNode = instance.get(PARENT_NODE);","","				while (parentNode) {","					if (parentNode === node) {","						return true;","					}","					parentNode = parentNode.get(PARENT_NODE);","				}","","				return false;","			},","","			/**","			 * Whether the current TreeNode is a leaf or not.","			 *","			 * @method isLeaf","			 * @return {boolean}","			 */","			isLeaf: function() {","				var instance = this;","","				return instance.get(LEAF);","			},","","			/**","			 * Whether the current TreeNode is selected or not.","			 *","			 * @method isSelected","			 * @return {boolean}","			 */","			isSelected: function() {","				var instance = this;","","				return instance.get(CONTENT_BOX).hasClass(CSS_TREE_NODE_SELECTED);","			},","","			/*","			* Fires when <code>mouseout</code> the current TreeNode.","			*","			* @method over","			*/","			out: function() {","				var instance = this;","","				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_OVER);","			},","","			/*","			* Fires when <code>mouseover</code> the current TreeNode.","			*","			* @method over","			*/","			over: function() {","				var instance = this;","","				instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_OVER);","			},","","			/*","			* Select the current TreeNode.","			*","			* @method select","			*/","			select: function() {","				var instance = this;","","				var ownerTree = instance.get(OWNER_TREE);","","				if (ownerTree) {","					ownerTree.set(LAST_SELECTED, instance);","				}","","				instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_SELECTED);","","				instance.fire('select');","			},","","			/*","			* Show hitarea icon.","			*","			* @method showHitArea","			*/","			showHitArea: function() {","				var instance = this;","","				instance.get(HIT_AREA_EL).removeClass(CSS_TREE_NODE_HIDDEN_HITAREA);","			},","","			insertAfter: function(node, refNode) {","				var instance = this;","","				A.TreeNode.superclass.insertAfter.apply(this, [node, instance]);","			},","","			insertBefore: function(node) {","				var instance = this;","","				A.TreeNode.superclass.insertBefore.apply(this, [node, instance]);","			},","","			removeChild: function(node) {","				var instance = this;","","				if (!instance.isLeaf()) {","					A.TreeNode.superclass.removeChild.apply(instance, arguments);","				}","			},","","			/**","			 * Toggle the current TreeNode, <code>collapsed</code> or <code>expanded</code>.","			 *","			 * @method toggle","			 */","			toggle: function() {","				var instance = this;","","				if (instance.get(EXPANDED)) {","					instance.collapse();","				}","				else {","					instance.expand();","				}","			},","","			/*","			* Unselect the current TreeNode.","			*","			* @method unselect","			*/","			unselect: function() {","				var instance = this;","","				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_SELECTED);","","				instance.fire('unselect');","			},","","			/**","			 * Fire after draggable change.","			 *","			 * @method _afterDraggableChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterDraggableChange: function(event) {","				var instance = this;","","				instance._uiSetDraggable(event.newVal);","				instance._syncIconUI();","			},","","			/**","			 * Fire after expanded change.","			 *","			 * @method _afterExpandedChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterExpandedChange: function(event) {","				var instance = this;","","				instance._uiSetExpanded(event.newVal);","				instance._syncIconUI();","			},","","			/**","			 * Fire after leaf change.","			 *","			 * @method _afterLeafChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterLeafChange: function(event) {","				var instance = this;","","				instance._uiSetLeaf(event.newVal);","				instance._syncIconUI();","			},","","			/**","			 * Fire after loading change.","			 *","			 * @method _afterLoadingChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterLoadingChange: function(event) {","				var instance = this;","","				instance._syncIconUI();","			},","","			/**","			 * Fire after set children.","			 *","			 * @method _afterSetChildren","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterSetChildren: function(event) {","				var instance = this;","","				instance._syncIconUI();","			},","","			/**","			 * Render the node container.","			 *","			 * @method _createNodeContainer","			 * @protected","			 * @return {Node}","			 */","			_createNodeContainer: function() {","				var instance = this;","","				// creating <ul class=\"aui-tree-container\">","				var nodeContainer = instance.get(CONTAINER) || A.Node.create(NODE_CONTAINER_TPL);","","				nodeContainer.addClass(CSS_TREE_CONTAINER);","","				// when it's not a leaf it has a <ul> container","				instance.set(CONTAINER, nodeContainer);","","				return nodeContainer;","			},","","			_getSibling: function(value, attrName) {","				var instance = this;","","				var propName = '_' + attrName;","				var sibling = instance[propName];","","				if (sibling !== null && !isTreeNode(sibling)) {","					sibling = null;","","					instance[propName] = sibling;","				}","","				return sibling;","			},","","			/**","			 * Render the <code>boundingBox</code> node.","			 *","			 * @method _renderBoundingBox","			 * @protected","			 * @return {Node}","			 */","			_renderBoundingBox: function() {","				var instance = this;","","				var boundingBox = instance.get(BOUNDING_BOX);","				var contentBox = instance.get(CONTENT_BOX);","","				contentBox.append(instance.get(ICON_EL));","				contentBox.append(instance.get(LABEL_EL));","","				boundingBox.append(contentBox);","","				var nodeContainer = instance.get(CONTAINER);","","				if (nodeContainer) {","					if (!instance.get(EXPANDED)) {","						nodeContainer.addClass(CSS_TREE_HIDDEN);","					}","","					boundingBox.append(nodeContainer);","				}","","				return boundingBox;","			},","","			/**","			 * Render the <code>contentBox</code> node.","			 *","			 * @method _renderContentBox","			 * @protected","			 * @return {Node}","			 */","			_renderContentBox: function(v) {","				var instance = this;","","				var contentBox = instance.get(CONTENT_BOX);","","				if (!instance.isLeaf()) {","					var expanded = instance.get(EXPANDED);","","					// add folder css classes state","					contentBox.addClass(","						expanded ? CSS_TREE_EXPANDED : CSS_TREE_COLLAPSED","					);","","					if (expanded) {","						instance.expand();","					}","				}","","				return contentBox;","			},","","			/**","			 * Sync the hitarea UI.","			 *","			 * @method _syncHitArea","			 * @protected","			 */","			_syncHitArea: function() {","				var instance = this;","","				if (instance.get(ALWAYS_SHOW_HITAREA) || instance.getChildrenLength()) {","					instance.showHitArea();","				}","				else {","					instance.hideHitArea();","","					instance.collapse();","				}","			},","","			/**","			 * Sync the hitarea UI.","			 *","			 * @method _syncIconUI","			 * @param {Array} children","			 * @protected","			 */","			_syncIconUI: function() {","				var instance = this,","					ownerTree = instance.get(OWNER_TREE);","","				if (ownerTree) {","					var type = ownerTree.get('type'),","						cssClasses = instance.get('cssClasses.' + type);","","					if (!cssClasses) {","						return;","					}","","					var expanded = instance.get(EXPANDED),","						iconEl = instance.get(ICON_EL),","						hitAreaEl = instance.get(HIT_AREA_EL),","						icon = instance.isLeaf() ?","								cssClasses.iconLeaf :","								(expanded ? cssClasses.iconExpanded : cssClasses.iconCollapsed),","						iconHitArea = expanded ?","										cssClasses.iconHitAreaExpanded :","										cssClasses.iconHitAreaCollapsed;","","					if (instance.get(LOADING)) {","						icon = cssClasses.iconLoading;","					}","","					iconEl.setAttribute('className', icon || BLANK);","					hitAreaEl.setAttribute('className', iconHitArea || BLANK);","				}","","				instance._syncHitArea();","			},","","			/**","			 * Set the <code>boundingBox</code> id.","			 *","			 * @method _syncTreeNodeBBId","			 * @param {String} id","			 * @protected","			 */","			_syncTreeNodeBBId: function(id) {","				var instance = this;","","				instance.get(BOUNDING_BOX).attr(","					ID,","					instance.get(ID)","				);","			},","","			_uiSetExpanded: function(val) {","				var instance = this;","","				if (!instance.isLeaf()) {","					var container = instance.get(CONTAINER);","					var contentBox = instance.get(CONTENT_BOX);","","					if (val) {","						contentBox.replaceClass(CSS_TREE_COLLAPSED, CSS_TREE_EXPANDED);","","						if (container) {","							container.removeClass(CSS_TREE_HIDDEN);","						}","					}","					else {","						contentBox.replaceClass(CSS_TREE_EXPANDED, CSS_TREE_COLLAPSED);","","						if (container) {","							container.addClass(CSS_TREE_HIDDEN);","						}","					}","				}","			},","","			_uiSetLeaf: function(val) {","				var instance = this;","","				var contentBox = instance.get(CONTENT_BOX);","","				if (val) {","					instance.get(CONTAINER).remove();","					instance.get(HIT_AREA_EL).remove();","				}","				else {","					// append hitarea element","					contentBox.prepend( instance.get(HIT_AREA_EL) );","","					// if has children append them to this model","					instance._createNodeContainer();","","					instance._uiSetExpanded(instance.get(EXPANDED));","				}","","				// add leaf css classes","				contentBox.toggleClass(CSS_TREE_NODE_LEAF, val);","			}","		}","	}",");","","A.TreeNode = TreeNode;","","/*","* TreeNodeIO","*/","var isFunction = Lang.isFunction,","","	CACHE = 'cache',","	IO = 'io',","	LOADED = 'loaded',","	LOADING = 'loading',","	PAGINATOR = 'paginator',","	TREE_NODE_IO = 'tree-node-io',","","	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);","","/**"," * A base class for TreeNodeIO, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>Ajax support to load the children of the current TreeNode</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var treeNodeIO = new A.TreeNodeIO({"," *  	label: 'TreeNodeIO',"," *  	cache: false,"," *  	io: {"," *  		url: 'assets/content.html'"," *  	}"," *  });"," * </code></pre>"," *"," * Check the list of <a href=\"TreeNodeIO.html#configattributes\">Configuration Attributes</a> available for"," * TreeNodeIO."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNodeIO"," * @constructor"," * @extends TreeNode"," */","var TreeNodeIO = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE_IO,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeNode.","		 *","		 * @property TreeNode.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Whether the current TreeNode should cache the loaded content or not.","			 *","			 * @attribute cache","			 * @default true","			 * @type boolean","			 */","			cache: {","				validator: isBoolean,","				value: true","			},","","			leaf: {","				validator: isBoolean,","				value: false","			},","","			/**","			 * Whether the current TreeNode has loaded the content.","			 *","			 * @attribute loaded","			 * @default false","			 * @type boolean","			 */","			loaded: {","				validator: isBoolean,","				value: false","			},","","			/**","			 * Whether the current TreeNode IO transaction is loading.","			 *","			 * @attribute loading","			 * @default false","			 * @type boolean","			 */","			loading: {","				validator: isBoolean,","				value: false","			}","		},","","		AUGMENTS: [A.TreeViewPaginator, A.TreeViewIO],","","		EXTENDS: A.TreeNode,","","		prototype: {","			/**","			 * Bind the events on the TreeNodeIO UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				A.TreeNodeIO.superclass.bindUI.apply(instance, arguments);","","				instance.on('ioRequestSuccess', instance._onIOSuccess, instance);","			},","","			syncUI: function() {","				var instance = this;","","				A.TreeNodeIO.superclass.syncUI.apply(instance, arguments);","			},","","			/*","			* Methods","			*/","			createNodes: function(nodes) {","				var instance = this;","","				A.Array.each(","					A.Array(nodes),","					function(node) {","						instance.appendChild(instance.createNode(node));","					}","				);","","				instance._syncPaginatorUI(nodes);","			},","","			expand: function() {","				var instance = this;","","				var cache = instance.get(CACHE);","				var io = instance.get(IO);","				var loaded = instance.get(LOADED);","				var loading = instance.get(LOADING);","","				if (!cache) {","					// if cache is false on expand, always set LOADED to false","					instance.set(LOADED, false);","				}","","				if (io && !loaded && !loading && !instance.hasChildNodes()) {","					if (!cache) {","						// remove all children to reload","						instance.empty();","					}","","					instance.initIO();","				}","				else {","					A.TreeNodeIO.superclass.expand.apply(instance, arguments);","				}","			},","","			/**","			 * If not specified on the TreeNode some attributes are inherited from the","			 * ownerTree by this method.","			 *","			 * @method _inheritOwnerTreeAttrs","			 * @protected","			 */","			_inheritOwnerTreeAttrs: function() {","				var instance = this;","","				var ownerTree = instance.get(OWNER_TREE);","","				if (ownerTree) {","					if (!instance.get(IO)) {","						var io = A.clone(","							ownerTree.get(IO),","							true,","							function(value, key) {","								if (isFunction(value) && (value.defaultFn || value.wrappedFn)) {","									return false;","								}","","								return true;","							}","						);","","						instance.set(IO, io);","					}","","					if (!instance.get(PAGINATOR)) {","						var ownerTreePaginator = ownerTree.get(PAGINATOR);","","						var paginator = A.clone(ownerTreePaginator);","","						// make sure we are not using the same element passed to the ownerTree on the TreeNode","						if (paginator && paginator.element) {","							paginator.element = ownerTreePaginator.element.clone();","						}","","						instance.set(PAGINATOR, paginator);","					}","				}","			},","","			_onIOSuccess: function(event) {","				var instance = this;","","				instance.expand();","			}","		}","	}",");","","A.TreeNodeIO = TreeNodeIO;","","/*","* TreeNodeCheck","*/","var	CHECKBOX = 'checkbox',","	CHECKED = 'checked',","	CHECK_CONTAINER_EL = 'checkContainerEl',","	CHECK_EL = 'checkEl',","	CHECK_NAME = 'checkName',","	DOT = '.',","	NAME = 'name',","	TREE_NODE_CHECK = 'tree-node-check',","","	CSS_TREE_NODE_CHECKBOX = getCN(TREE, NODE, CHECKBOX),","	CSS_TREE_NODE_CHECKBOX_CONTAINER = getCN(TREE, NODE, CHECKBOX, CONTAINER),","	CSS_TREE_NODE_CHECKED = getCN(TREE, NODE, CHECKED),","","	CHECKBOX_CONTAINER_TPL = '<div class=\"' + CSS_TREE_NODE_CHECKBOX_CONTAINER + '\"></div>',","	CHECKBOX_TPL = '<input class=\"' + CSS_TREE_NODE_CHECKBOX + '\" type=\"checkbox\" />';","","/**"," * <p><img src=\"assets/images/aui-tree-nod-check/main.png\"/></p>"," *"," * A base class for TreeNodeCheck, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>Checkbox support for the TreeNode</li>"," * </ul>"," *"," * Check the list of <a href=\"TreeNodeCheck.html#configattributes\">Configuration Attributes</a> available for"," * TreeNodeCheck."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNodeCheck"," * @constructor"," * @extends TreeNodeIO"," */","var TreeNodeCheck = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE_CHECK,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeNode.","		 *","		 * @property TreeNode.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Whether the TreeNode is checked or not.","			 *","			 * @attribute checked","			 * @default false","			 * @type boolean","			 */","			checked: {","				validator: isBoolean,","				value: false","			},","","			/**","			 * Container element for the checkbox.","			 *","			 * @attribute checkContainerEl","			 * @default Generated DOM element.","			 * @type Node | String","			 */","			checkContainerEl: {","				setter: A.one,","				valueFn: function() {","					return A.Node.create(CHECKBOX_CONTAINER_TPL);","				}","			},","","			/**","			 * Checkbox element.","			 *","			 * @attribute checkEl","			 * @default Generated DOM element.","			 * @type Node | String","			 */","			checkEl: {","				setter: A.one,","				valueFn: function() {","					var instance = this;","","					var checkBoxId = instance.get(ID) + 'Checkbox';","","					var attributes = {","						ID: checkBoxId,","						NAME: instance.get(CHECK_NAME)","					};","","					return A.Node.create(CHECKBOX_TPL).attr(attributes);","				}","			},","","			/**","			 * Name of the checkbox element used on the current TreeNode.","			 *","			 * @attribute checkName","			 * @default 'tree-node-check'","			 * @type String","			 */","			checkName: {","				value: TREE_NODE_CHECK,","				validator: isString","			}","		},","","		EXTENDS: A.TreeNodeIO,","","		prototype: {","","			initializer: function() {","				var instance = this;","","				instance._uiSetChecked(instance.get(CHECKED));","			},","","			/*","			* Lifecycle","			*/","			renderUI: function() {","				var instance = this;","","				A.TreeNodeCheck.superclass.renderUI.apply(instance, arguments);","","				var checkEl = instance.get(CHECK_EL);","				var checkContainerEl = instance.get(CHECK_CONTAINER_EL);","","				checkEl.hide();","","				checkContainerEl.append(checkEl);","","				instance.get(LABEL_EL).placeBefore(checkContainerEl);","","				if (instance.isChecked()) {","					instance.check();","				}","			},","","			bindUI: function() {","				var instance = this;","","				var contentBox = instance.get(CONTENT_BOX);","","				A.TreeNodeCheck.superclass.bindUI.apply(instance, arguments);","","				instance.after('checkedChange', A.bind(instance._afterCheckedChange, instance));","","				contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_NODE_CHECKBOX_CONTAINER);","				contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_LABEL);","","				// cancel dblclick because of the check","				instance.get(LABEL_EL).swallowEvent('dblclick');","			},","","			/**","			 * Check the current TreeNode.","			 *","			 * @method check","			 */","			check: function(originalTarget) {","				var instance = this;","","				instance.set(","					CHECKED,","					true,","					{","						originalTarget: originalTarget","					}","				);","			},","","			/*","			* Whether the current TreeNodeCheck is checked.","			*","			* @method isChecked","			* @return boolean","			*/","			isChecked: function() {","				var instance = this;","","				return instance.get(CHECKED);","			},","","			/**","			 * Toggle the check status of the current TreeNode.","			 *","			 * @method toggleCheck","			 */","			toggleCheck: function() {","				var instance = this;","","				var checkEl = instance.get(CHECK_EL);","","				var checked = checkEl.attr(CHECKED);","","				if (!checked) {","					instance.check();","				}","				else {","					instance.uncheck();","				}","			},","","			/**","			 * Uncheck the current TreeNode.","			 *","			 * @method uncheck","			 */","			uncheck: function(originalTarget) {","				var instance = this;","","				instance.set(","					CHECKED,","					false,","					{","						originalTarget: originalTarget","					}","				);","			},","","			_afterCheckedChange: function(event) {","				var instance = this;","","				instance._uiSetChecked(event.newVal);","			},","","			_uiSetChecked: function(val) {","				var instance = this;","","				var checkEl = instance.get(CHECK_EL);","				var contentBox = instance.get(CONTENT_BOX);","","				if (val) {","					contentBox.addClass(CSS_TREE_NODE_CHECKED);","					checkEl.attr(CHECKED, CHECKED);","				}","				else {","					contentBox.removeClass(CSS_TREE_NODE_CHECKED);","					checkEl.attr(CHECKED, BLANK);","				}","			}","		}","	}",");","","A.TreeNodeCheck = TreeNodeCheck;","","/*","* TreeNodeTask","*/","var	CHILD = 'child',","	TREE_NODE_TASK = 'tree-node-task',","	UNCHECKED = 'unchecked',","","	isTreeNodeTask = function(node) {","		return node instanceof A.TreeNodeCheck;","	},","","	CSS_TREE_NODE_CHILD_UNCHECKED = getCN(TREE, NODE, CHILD, UNCHECKED);","","/**"," * <p><img src=\"assets/images/aui-treeNodeTask/main.png\"/></p>"," *"," * A base class for TreeNodeTask, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>3 states checkbox support</li>"," *	<li>Automatic check/uncheck the parent status based on the children checked status</li>"," * </ul>"," *"," * Check the list of <a href=\"TreeNodeTask.html#configattributes\">Configuration Attributes</a> available for"," * TreeNodeTask."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNodeTask"," * @constructor"," * @extends TreeNodeCheck"," */","var TreeNodeTask = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE_TASK,","","		EXTENDS: A.TreeNodeCheck,","","		prototype: {","			/*","			* Methods","			*/","			check: function(originalTarget) {","				var instance = this;","","				originalTarget = originalTarget || instance;","","				if (!instance.isLeaf()) {","					instance.eachChildren(","						function(child) {","							if (isTreeNodeTask(child)) {","								child.check(originalTarget);","							}","						}","					);","				}","","				instance.eachParent(","					function(parentNode) {","						if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {","							parentNode.get(CONTENT_BOX).addClass(CSS_TREE_NODE_CHILD_UNCHECKED);","						}","					}","				);","","				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);","","				// invoke default check logic","				A.TreeNodeTask.superclass.check.call(instance, originalTarget);","			},","","			uncheck: function(originalTarget) {","				var instance = this;","","				originalTarget = originalTarget || instance;","","				if (!instance.isLeaf()) {","					instance.eachChildren(","						function(child) {","							if (child instanceof A.TreeNodeCheck) {","								child.uncheck(originalTarget);","							}","						}","					);","				}","","				instance.eachParent(","					function(parentNode) {","						if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {","							parentNode.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);","						}","					}","				);","","				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);","","				// invoke default uncheck logic","				A.TreeNodeTask.superclass.uncheck.call(instance, originalTarget);","			}","		}","	}",");","","A.TreeNodeTask = TreeNodeTask;","","/*","* TreeNodeRadio","*/","","var	TREE_NODE_RADIO = 'tree-node-radio',","","	isTreeNodeRadio = function(node) {","		return node instanceof A.TreeNodeRadio;","	},","","	CSS_NODE_RADIO = getCN(TREE, NODE, RADIO),","	CSS_NODE_RADIO_CHECKED = getCN(TREE, NODE, RADIO, CHECKED);","","/**"," * <p><img src=\"assets/images/aui-treeNodeRadio/main.png\"/></p>"," *"," * A base class for TreeNodeRadio, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>3 states checkbox support</li>"," *	<li>Automatic check/uncheck the parent status based on the children checked status</li>"," * </ul>"," *"," * Check the list of <a href=\"TreeNodeRadio.html#configattributes\">Configuration Attributes</a> available for"," * TreeNodeRadio."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNodeRadio"," * @constructor"," * @extends TreeNodeTask"," */","var TreeNodeRadio = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE_RADIO,","","		EXTENDS: A.TreeNodeTask,","","		prototype: {","			/*","			* Methods","			*/","			renderUI: function() {","				var instance = this;","","				A.TreeNodeRadio.superclass.renderUI.apply(instance, arguments);","","				instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO);","			},","","			_uncheckNodesRadio: function(node) {","				var instance = this;","","				var children;","","				if (node) {","					children = node.get(CHILDREN);","				}","				else {","					var ownerTree = instance.get(OWNER_TREE);","","					if (ownerTree) {","						children = ownerTree.get(CHILDREN);","					}","					else {","						return;","					}","				}","","				A.Array.each(","					children,","					function(value, index, collection) {","						if (!value.isLeaf()) {","							instance._uncheckNodesRadio(value);","						}","","						if (isTreeNodeRadio(value)) {","							value.uncheck();","						}","					}","				);","			},","","			_uiSetChecked: function(val) {","				var instance = this;","","				if (val) {","					instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO_CHECKED);","					instance.get(CHECK_EL).attr(CHECKED, CHECKED);","				}","				else {","					instance.get(CONTENT_BOX).removeClass(CSS_NODE_RADIO_CHECKED);","					instance.get(CHECK_EL).attr(CHECKED, BLANK);","				}","			},","","			check: function() {","				var instance = this;","","				instance._uncheckNodesRadio();","","				A.TreeNodeRadio.superclass.check.apply(instance, arguments);","			}","		}","	}",");","","A.TreeNodeRadio = TreeNodeRadio;","","/**"," * TreeNode types hash map."," *"," * <pre><code>A.TreeNode.nodeTypes = {"," *  check: A.TreeNodeCheck,"," *  io: A.TreeNodeIO,"," *  node: A.TreeNode,"," *  radio: A.TreeNodeRadio,"," *  task: A.TreeNodeTask"," *};</code></pre>"," *"," * @for TreeNode"," * @property A.TreeNode.nodeTypes"," * @type Object"," */","A.TreeNode.nodeTypes = {","	check: A.TreeNodeCheck,","	io: A.TreeNodeIO,","	node: A.TreeNode,","	radio: A.TreeNodeRadio,","	task: A.TreeNodeTask","};","","}, '@VERSION@' ,{requires:['aui-tree-data','aui-tree-io','aui-tree-paginator','json','querystring-stringify'], skinnable:false});"];
_yuitest_coverage["/build/aui-tree-node/aui-tree-node.js"].lines = {"1":0,"9":0,"46":0,"50":0,"54":0,"106":0,"140":0,"146":0,"184":0,"197":0,"211":0,"237":0,"239":0,"241":0,"255":0,"258":0,"259":0,"262":0,"301":0,"358":0,"360":0,"363":0,"365":0,"367":0,"369":0,"379":0,"381":0,"382":0,"383":0,"387":0,"389":0,"390":0,"391":0,"392":0,"394":0,"397":0,"398":0,"399":0,"401":0,"403":0,"404":0,"406":0,"407":0,"420":0,"422":0,"423":0,"433":0,"435":0,"442":0,"444":0,"445":0,"455":0,"457":0,"461":0,"463":0,"466":0,"477":0,"479":0,"488":0,"490":0,"494":0,"496":0,"499":0,"509":0,"511":0,"513":0,"515":0,"516":0,"518":0,"521":0,"525":0,"527":0,"536":0,"538":0,"548":0,"550":0,"552":0,"553":0,"554":0,"556":0,"559":0,"569":0,"571":0,"581":0,"583":0,"592":0,"594":0,"603":0,"605":0,"614":0,"616":0,"618":0,"619":0,"622":0,"624":0,"633":0,"635":0,"639":0,"641":0,"645":0,"647":0,"651":0,"653":0,"654":0,"664":0,"666":0,"667":0,"670":0,"680":0,"682":0,"684":0,"695":0,"697":0,"698":0,"709":0,"711":0,"712":0,"723":0,"725":0,"726":0,"737":0,"739":0,"750":0,"752":0,"763":0,"766":0,"768":0,"771":0,"773":0,"777":0,"779":0,"780":0,"782":0,"783":0,"785":0,"788":0,"799":0,"801":0,"802":0,"804":0,"805":0,"807":0,"809":0,"811":0,"812":0,"813":0,"816":0,"819":0,"830":0,"832":0,"834":0,"835":0,"838":0,"842":0,"843":0,"847":0,"857":0,"859":0,"860":0,"863":0,"865":0,"877":0,"880":0,"881":0,"884":0,"885":0,"888":0,"898":0,"899":0,"902":0,"903":0,"906":0,"917":0,"919":0,"926":0,"928":0,"929":0,"930":0,"932":0,"933":0,"935":0,"936":0,"940":0,"942":0,"943":0,"950":0,"952":0,"954":0,"955":0,"956":0,"960":0,"963":0,"965":0,"969":0,"975":0,"980":0,"1018":0,"1092":0,"1094":0,"1096":0,"1100":0,"1102":0,"1109":0,"1111":0,"1114":0,"1118":0,"1122":0,"1124":0,"1125":0,"1126":0,"1127":0,"1129":0,"1131":0,"1134":0,"1135":0,"1137":0,"1140":0,"1143":0,"1155":0,"1157":0,"1159":0,"1160":0,"1161":0,"1165":0,"1166":0,"1169":0,"1173":0,"1176":0,"1177":0,"1179":0,"1182":0,"1183":0,"1186":0,"1192":0,"1194":0,"1200":0,"1205":0,"1239":0,"1281":0,"1295":0,"1297":0,"1299":0,"1304":0,"1326":0,"1328":0,"1335":0,"1337":0,"1339":0,"1340":0,"1342":0,"1344":0,"1346":0,"1348":0,"1349":0,"1354":0,"1356":0,"1358":0,"1360":0,"1362":0,"1363":0,"1366":0,"1375":0,"1377":0,"1393":0,"1395":0,"1404":0,"1406":0,"1408":0,"1410":0,"1411":0,"1414":0,"1424":0,"1426":0,"1436":0,"1438":0,"1442":0,"1444":0,"1445":0,"1447":0,"1448":0,"1449":0,"1452":0,"1453":0,"1460":0,"1465":0,"1470":0,"1494":0,"1512":0,"1514":0,"1516":0,"1517":0,"1519":0,"1520":0,"1526":0,"1528":0,"1529":0,"1534":0,"1537":0,"1541":0,"1543":0,"1545":0,"1546":0,"1548":0,"1549":0,"1555":0,"1557":0,"1558":0,"1563":0,"1566":0,"1572":0,"1578":0,"1581":0,"1606":0,"1624":0,"1626":0,"1628":0,"1632":0,"1634":0,"1636":0,"1637":0,"1640":0,"1642":0,"1643":0,"1646":0,"1650":0,"1653":0,"1654":0,"1657":0,"1658":0,"1665":0,"1667":0,"1668":0,"1669":0,"1672":0,"1673":0,"1678":0,"1680":0,"1682":0,"1688":0,"1705":0};
_yuitest_coverage["/build/aui-tree-node/aui-tree-node.js"].functions = {"concat:45":0,"isTreeNode:49":0,"isTreeView:53":0,"valueFn:139":0,"valueFn:145":0,"valueFn:183":0,"valueFn:196":0,"valueFn:210":0,"valueFn:236":0,"setter:254":0,"validator:300":0,"initializer:357":0,"bindUI:378":0,"render:386":0,"renderUI:419":0,"syncUI:432":0,"appendChild:441":0,"collapse:454":0,"collapseAll:460":0,"contains:476":0,"expand:487":0,"expandAll:493":0,"getDepth:508":0,"hasChildNodes:524":0,"hideHitArea:535":0,"isAncestor:547":0,"isLeaf:568":0,"isSelected:580":0,"out:591":0,"over:602":0,"select:613":0,"showHitArea:632":0,"insertAfter:638":0,"insertBefore:644":0,"removeChild:650":0,"toggle:663":0,"unselect:679":0,"_afterDraggableChange:694":0,"_afterExpandedChange:708":0,"_afterLeafChange:722":0,"_afterLoadingChange:736":0,"_afterSetChildren:749":0,"_createNodeContainer:762":0,"_getSibling:776":0,"_renderBoundingBox:798":0,"_renderContentBox:829":0,"_syncHitArea:856":0,"_syncIconUI:876":0,"_syncTreeNodeBBId:916":0,"_uiSetExpanded:925":0,"_uiSetLeaf:949":0,"bindUI:1091":0,"syncUI:1099":0,"(anonymous 2):1113":0,"createNodes:1108":0,"expand:1121":0,"(anonymous 3):1164":0,"_inheritOwnerTreeAttrs:1154":0,"_onIOSuccess:1191":0,"valueFn:1280":0,"valueFn:1294":0,"initializer:1325":0,"renderUI:1334":0,"bindUI:1353":0,"check:1374":0,"isChecked:1392":0,"toggleCheck:1403":0,"uncheck:1423":0,"_afterCheckedChange:1435":0,"_uiSetChecked:1441":0,"isTreeNodeTask:1469":0,"(anonymous 4):1518":0,"(anonymous 5):1527":0,"check:1511":0,"(anonymous 6):1547":0,"(anonymous 7):1556":0,"uncheck:1540":0,"isTreeNodeRadio:1580":0,"renderUI:1623":0,"(anonymous 8):1652":0,"_uncheckNodesRadio:1631":0,"_uiSetChecked:1664":0,"check:1677":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-tree-node/aui-tree-node.js"].coveredLines = 340;
_yuitest_coverage["/build/aui-tree-node/aui-tree-node.js"].coveredFunctions = 84;
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1);
AUI.add('aui-tree-node', function(A) {
/**
 * The TreeNode Utility
 *
 * @module aui-tree
 * @submodule aui-tree-node
 */

_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 9);
var Lang = A.Lang,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,

	ALWAYS_SHOW_HITAREA = 'alwaysShowHitArea',
	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CLEARFIX = 'clearfix',
	COLLAPSED = 'collapsed',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	EXPANDED = 'expanded',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	HIT_AREA_EL = 'hitAreaEl',
	HITAREA = 'hitarea',
	ICON = 'icon',
	ICON_EL = 'iconEl',
	ID = 'id',
	LABEL = 'label',
	LABEL_EL = 'labelEl',
	LAST_SELECTED = 'lastSelected',
	LEAF = 'leaf',
	NODE = 'node',
	OVER = 'over',
	OWNER_TREE = 'ownerTree',
	PARENT_NODE = 'parentNode',
	RADIO = 'radio',
	RENDERED = 'rendered',
	SELECTED = 'selected',
	SPACE = ' ',
	TREE = 'tree',
	TREE_NODE = 'tree-node',

	concat = function() {
		_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "concat", 45);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 46);
return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isTreeNode = function(v) {
		_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "isTreeNode", 49);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 50);
return (v instanceof A.TreeNode);
	},

	isTreeView = function(v) {
		_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "isTreeView", 53);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 54);
return (v instanceof A.TreeView);
	},

	getCN = A.getClassName,

	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_TREE_COLLAPSED = getCN(TREE, COLLAPSED),
	CSS_TREE_CONTAINER = getCN(TREE, CONTAINER),
	CSS_TREE_CONTENT_BOX = getCN(TREE, CONTENT_BOX),
	CSS_TREE_EXPANDED = getCN(TREE, EXPANDED),
	CSS_TREE_HIDDEN = getCN(TREE, HIDDEN),
	CSS_TREE_HITAREA = getCN(TREE, HITAREA),
	CSS_TREE_ICON = getCN(TREE, ICON),
	CSS_TREE_LABEL = getCN(TREE, LABEL),
	CSS_TREE_NODE = getCN(TREE, NODE),
	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),
	CSS_TREE_NODE_HIDDEN_HITAREA = getCN(TREE, NODE, HIDDEN, HITAREA),
	CSS_TREE_NODE_LEAF = getCN(TREE, NODE, LEAF),
	CSS_TREE_NODE_OVER = getCN(TREE, NODE, OVER),
	CSS_TREE_NODE_SELECTED = getCN(TREE, NODE, SELECTED),

	HIT_AREA_TPL = '<div class="' + CSS_TREE_HITAREA + '"></div>',
	ICON_TPL = '<div class="' + CSS_TREE_ICON + '"></div>',
	LABEL_TPL = '<div class="' + CSS_TREE_LABEL + '"></div>',
	NODE_CONTAINER_TPL = '<ul></ul>',

	NODE_BOUNDING_TEMPLATE = '<li class="' + CSS_TREE_NODE + '"></li>',
	NODE_CONTENT_TEMPLATE = '<div class="' + concat(CSS_HELPER_CLEARFIX, CSS_TREE_NODE_CONTENT) + '"></div>';

/**
 * A base class for TreeNode, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>The node for the TreeView component</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.TreeNode({
	boundingBox: ''
}).render();
 * </code></pre>
 *
 * Check the list of <a href="TreeNode.html#configattributes">Configuration Attributes</a> available for
 * TreeNode.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNode
 * @constructor
 * @extends TreeData
 */
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 106);
var TreeNode = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeNode.
		 *
		 * @property TreeNode.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Always show the hitarea icon.
			 *
			 * @attribute alwaysShowHitArea
			 * @default true
			 * @type boolean
			 */
			alwaysShowHitArea: {
				validator: isBoolean,
				value: true
			},

			boundingBox: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "valueFn", 139);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 140);
return A.Node.create(NODE_BOUNDING_TEMPLATE);
				}
			},

			contentBox: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "valueFn", 145);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 146);
return A.Node.create(NODE_CONTENT_TEMPLATE);
				}
			},

			/**
			 * If true the TreeNode is draggable.
			 *
			 * @attribute draggable
			 * @default true
			 * @type boolean
			 */
			draggable: {
				validator: isBoolean,
				value: true
			},

			/**
			 * Whether the TreeNode is expanded by default.
			 *
			 * @attribute expanded
			 * @default false
			 * @type boolean
			 */
			expanded: {
				validator: isBoolean,
				value: false
			},

			/**
			 * Hitarea element.
			 *
			 * @attribute hitAreaEl
			 * @default Generated DOM element.
			 * @type Node | String
			 */
			hitAreaEl: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "valueFn", 183);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 184);
return A.Node.create(HIT_AREA_TPL);
				}
			},

			/**
			 * Icon element.
			 *
			 * @attribute iconEl
			 * @type Node | String
			 */
			iconEl: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "valueFn", 196);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 197);
return A.Node.create(ICON_TPL);
				}
			},

			/**
			 * Id of the TreeNode.
			 *
			 * @attribute id
			 * @default null
			 * @type String
			 */
			id: {
				validator: isString,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "valueFn", 210);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 211);
return A.guid();
				}
			},

			/**
			 * Label of the TreeNode.
			 *
			 * @attribute label
			 * @default ''
			 * @type String
			 */
			label: {
				validator: isString,
				value: BLANK
			},

			/**
			 * Label element to house the <code>label</code> attribute.
			 *
			 * @attribute labelEl
			 * @default Generated DOM element.
			 * @type Node | String
			 */
			labelEl: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "valueFn", 236);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 237);
var instance = this;

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 239);
var label = instance.get(LABEL);

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 241);
return A.Node.create(LABEL_TPL).html(label).unselectable();
				}
			},

			/**
			 * Whether the TreeNode could have children or not (i.e. if any
			 * children is present the TreeNode is a leaf).
			 *
			 * @attribute leaf
			 * @default true
			 * @type boolean
			 */
			leaf: {
				setter: function(v) {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "setter", 254);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 255);
var instance = this;

					// if has children it's not a leaf
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 258);
if (v && instance.get(CHILDREN).length) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 259);
return false;
					}

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 262);
return v;
				},
				validator: isBoolean,
				value: true
			},

			/**
			 * Next sibling of the current TreeNode.
			 *
			 * @attribute nextSibling
			 * @default null
			 * @type TreeNode
			 */
			nextSibling: {
				getter: '_getSibling',
				validator: isTreeNode,
				value: null
			},

			/**
			 * TreeView which contains the current TreeNode.
			 *
			 * @attribute ownerTree
			 * @default null
			 * @type TreeView
			 */
			ownerTree: {
				value: null
			},

			/**
			 * Parent node of the current TreeNode.
			 *
			 * @attribute parentNode
			 * @default null
			 * @type TreeNode
			 */
			parentNode: {
				validator: function(val) {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "validator", 300);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 301);
return isTreeNode(val) || isTreeView(val);
				},
				value: null
			},

			/**
			 * Previous sibling of the current TreeNode.
			 *
			 * @attribute prevSibling
			 * @default null
			 * @type TreeNode
			 */
			prevSibling: {
				getter: '_getSibling',
				validator: isTreeNode,
				value: null
			},

			rendered: {
				validator: isBoolean,
				value: false
			},

			tabIndex: {
				value: null
			}
		},

		AUGMENTS: [A.TreeData],

		EXTENDS: A.Base,

		prototype: {
			/**
			 * Replaced BOUNDING_TEMPLATE with NODE_BOUNDING_TEMPLATE.
			 *
			 * @property BOUNDING_TEMPLATE
			 * @type String
			 * @protected
			 */
			BOUNDING_TEMPLATE: NODE_BOUNDING_TEMPLATE,
			/**
			 * Replaced CONTENT_TEMPLATE with NODE_CONTENT_TEMPLATE.
			 *
			 * @property CONTENT_TEMPLATE
			 * @type String
			 * @protected
			 */
			CONTENT_TEMPLATE: NODE_CONTENT_TEMPLATE,

			/**
			 * Construction logic executed during TreeNode instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			initializer: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "initializer", 357);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 358);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 360);
instance.get(BOUNDING_BOX).setData(TREE_NODE, instance);

				// Sync the Widget TreeNode id with the BOUNDING_BOX id
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 363);
instance._syncTreeNodeBBId();

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 365);
instance._uiSetExpanded(instance.get(EXPANDED));

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 367);
instance._uiSetLeaf(instance.get(LEAF));

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 369);
instance.initTreeData();
			},

			/**
			 * Bind the events on the TreeNode UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "bindUI", 378);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 379);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 381);
instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 382);
instance.after('expandedChange', A.bind(instance._afterExpandedChange, instance));
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 383);
instance.after('idChange', instance._afterSetId, instance);
			},

			render: function(container) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "render", 386);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 387);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 389);
if (!instance.get(RENDERED)) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 390);
instance.renderUI();
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 391);
instance.bindUI();
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 392);
instance.syncUI();

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 394);
instance.set(RENDERED, true);
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 397);
if (container) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 398);
var boundingBox = instance.get(BOUNDING_BOX);
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 399);
var parentNode = instance.get(PARENT_NODE);

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 401);
boundingBox.appendTo(container);

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 403);
if (parentNode) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 404);
var paginator = parentNode.get(PAGINATOR);

						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 406);
if (paginator) {
							_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 407);
boundingBox.insertBefore(paginator.element, null);
						}
					}
				}
			},

			/**
			 * Create the DOM structure for the TreeNode. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "renderUI", 419);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 420);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 422);
instance._renderBoundingBox();
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 423);
instance._renderContentBox();
			},

			/**
			 * Sync the TreeNode UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "syncUI", 432);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 433);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 435);
instance._syncIconUI();
			},

			/*
			* Methods
			*/
			appendChild: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "appendChild", 441);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 442);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 444);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 445);
A.TreeNode.superclass.appendChild.apply(instance, arguments);
				}
			},

			/**
			 * Collapse the current TreeNode.
			 *
			 * @method collapse
			 */
			collapse: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "collapse", 454);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 455);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 457);
instance.set(EXPANDED, false);
			},

			collapseAll: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "collapseAll", 460);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 461);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 463);
A.TreeNode.superclass.collapseAll.apply(instance, arguments);

				// instance is also a node, so collapse itself
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 466);
instance.collapse();
			},

			/**
			 * Check if the current TreeNode contains the passed <code>node</code>.
			 *
			 * @method contains
			 * @param {TreeNode} node
			 * @return {boolean}
			 */
			contains: function(node) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "contains", 476);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 477);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 479);
return node.isAncestor(instance);
			},

			/**
			 * Expand the current TreeNode.
			 *
			 * @method expand
			 */
			expand: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "expand", 487);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 488);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 490);
instance.set(EXPANDED, true);
			},

			expandAll: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "expandAll", 493);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 494);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 496);
A.TreeNode.superclass.expandAll.apply(instance, arguments);

				// instance is also a node, so expand itself
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 499);
instance.expand();
			},

			/**
			 * Get the depth of the current TreeNode.
			 *
			 * @method getDepth
			 * @return {Number}
			 */
			getDepth: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "getDepth", 508);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 509);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 511);
var depth = 0;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 513);
var parentNode = instance.get(PARENT_NODE);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 515);
while (parentNode) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 516);
++depth;

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 518);
parentNode = parentNode.get(PARENT_NODE);
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 521);
return depth;
			},

			hasChildNodes: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "hasChildNodes", 524);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 525);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 527);
return (!instance.isLeaf() && A.TreeNode.superclass.hasChildNodes.apply(instance, arguments));
			},

			/*
			* Hide hitarea icon.
			*
			* @method hideHitArea
			*/
			hideHitArea: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "hideHitArea", 535);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 536);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 538);
instance.get(HIT_AREA_EL).addClass(CSS_TREE_NODE_HIDDEN_HITAREA);
			},

			/**
			 * Whether the current TreeNode is ancestor of the passed <code>node</code> or not.
			 *
			 * @method isLeaf
			 * @return {boolean}
			 */
			isAncestor: function(node) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "isAncestor", 547);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 548);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 550);
var parentNode = instance.get(PARENT_NODE);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 552);
while (parentNode) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 553);
if (parentNode === node) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 554);
return true;
					}
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 556);
parentNode = parentNode.get(PARENT_NODE);
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 559);
return false;
			},

			/**
			 * Whether the current TreeNode is a leaf or not.
			 *
			 * @method isLeaf
			 * @return {boolean}
			 */
			isLeaf: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "isLeaf", 568);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 569);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 571);
return instance.get(LEAF);
			},

			/**
			 * Whether the current TreeNode is selected or not.
			 *
			 * @method isSelected
			 * @return {boolean}
			 */
			isSelected: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "isSelected", 580);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 581);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 583);
return instance.get(CONTENT_BOX).hasClass(CSS_TREE_NODE_SELECTED);
			},

			/*
			* Fires when <code>mouseout</code> the current TreeNode.
			*
			* @method over
			*/
			out: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "out", 591);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 592);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 594);
instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_OVER);
			},

			/*
			* Fires when <code>mouseover</code> the current TreeNode.
			*
			* @method over
			*/
			over: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "over", 602);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 603);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 605);
instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_OVER);
			},

			/*
			* Select the current TreeNode.
			*
			* @method select
			*/
			select: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "select", 613);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 614);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 616);
var ownerTree = instance.get(OWNER_TREE);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 618);
if (ownerTree) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 619);
ownerTree.set(LAST_SELECTED, instance);
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 622);
instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_SELECTED);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 624);
instance.fire('select');
			},

			/*
			* Show hitarea icon.
			*
			* @method showHitArea
			*/
			showHitArea: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "showHitArea", 632);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 633);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 635);
instance.get(HIT_AREA_EL).removeClass(CSS_TREE_NODE_HIDDEN_HITAREA);
			},

			insertAfter: function(node, refNode) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "insertAfter", 638);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 639);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 641);
A.TreeNode.superclass.insertAfter.apply(this, [node, instance]);
			},

			insertBefore: function(node) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "insertBefore", 644);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 645);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 647);
A.TreeNode.superclass.insertBefore.apply(this, [node, instance]);
			},

			removeChild: function(node) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "removeChild", 650);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 651);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 653);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 654);
A.TreeNode.superclass.removeChild.apply(instance, arguments);
				}
			},

			/**
			 * Toggle the current TreeNode, <code>collapsed</code> or <code>expanded</code>.
			 *
			 * @method toggle
			 */
			toggle: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "toggle", 663);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 664);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 666);
if (instance.get(EXPANDED)) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 667);
instance.collapse();
				}
				else {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 670);
instance.expand();
				}
			},

			/*
			* Unselect the current TreeNode.
			*
			* @method unselect
			*/
			unselect: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "unselect", 679);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 680);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 682);
instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_SELECTED);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 684);
instance.fire('unselect');
			},

			/**
			 * Fire after draggable change.
			 *
			 * @method _afterDraggableChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterDraggableChange: function(event) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_afterDraggableChange", 694);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 695);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 697);
instance._uiSetDraggable(event.newVal);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 698);
instance._syncIconUI();
			},

			/**
			 * Fire after expanded change.
			 *
			 * @method _afterExpandedChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterExpandedChange: function(event) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_afterExpandedChange", 708);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 709);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 711);
instance._uiSetExpanded(event.newVal);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 712);
instance._syncIconUI();
			},

			/**
			 * Fire after leaf change.
			 *
			 * @method _afterLeafChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterLeafChange: function(event) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_afterLeafChange", 722);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 723);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 725);
instance._uiSetLeaf(event.newVal);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 726);
instance._syncIconUI();
			},

			/**
			 * Fire after loading change.
			 *
			 * @method _afterLoadingChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterLoadingChange: function(event) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_afterLoadingChange", 736);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 737);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 739);
instance._syncIconUI();
			},

			/**
			 * Fire after set children.
			 *
			 * @method _afterSetChildren
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterSetChildren: function(event) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_afterSetChildren", 749);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 750);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 752);
instance._syncIconUI();
			},

			/**
			 * Render the node container.
			 *
			 * @method _createNodeContainer
			 * @protected
			 * @return {Node}
			 */
			_createNodeContainer: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_createNodeContainer", 762);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 763);
var instance = this;

				// creating <ul class="aui-tree-container">
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 766);
var nodeContainer = instance.get(CONTAINER) || A.Node.create(NODE_CONTAINER_TPL);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 768);
nodeContainer.addClass(CSS_TREE_CONTAINER);

				// when it's not a leaf it has a <ul> container
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 771);
instance.set(CONTAINER, nodeContainer);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 773);
return nodeContainer;
			},

			_getSibling: function(value, attrName) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_getSibling", 776);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 777);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 779);
var propName = '_' + attrName;
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 780);
var sibling = instance[propName];

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 782);
if (sibling !== null && !isTreeNode(sibling)) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 783);
sibling = null;

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 785);
instance[propName] = sibling;
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 788);
return sibling;
			},

			/**
			 * Render the <code>boundingBox</code> node.
			 *
			 * @method _renderBoundingBox
			 * @protected
			 * @return {Node}
			 */
			_renderBoundingBox: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_renderBoundingBox", 798);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 799);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 801);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 802);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 804);
contentBox.append(instance.get(ICON_EL));
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 805);
contentBox.append(instance.get(LABEL_EL));

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 807);
boundingBox.append(contentBox);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 809);
var nodeContainer = instance.get(CONTAINER);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 811);
if (nodeContainer) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 812);
if (!instance.get(EXPANDED)) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 813);
nodeContainer.addClass(CSS_TREE_HIDDEN);
					}

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 816);
boundingBox.append(nodeContainer);
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 819);
return boundingBox;
			},

			/**
			 * Render the <code>contentBox</code> node.
			 *
			 * @method _renderContentBox
			 * @protected
			 * @return {Node}
			 */
			_renderContentBox: function(v) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_renderContentBox", 829);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 830);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 832);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 834);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 835);
var expanded = instance.get(EXPANDED);

					// add folder css classes state
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 838);
contentBox.addClass(
						expanded ? CSS_TREE_EXPANDED : CSS_TREE_COLLAPSED
					);

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 842);
if (expanded) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 843);
instance.expand();
					}
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 847);
return contentBox;
			},

			/**
			 * Sync the hitarea UI.
			 *
			 * @method _syncHitArea
			 * @protected
			 */
			_syncHitArea: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_syncHitArea", 856);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 857);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 859);
if (instance.get(ALWAYS_SHOW_HITAREA) || instance.getChildrenLength()) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 860);
instance.showHitArea();
				}
				else {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 863);
instance.hideHitArea();

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 865);
instance.collapse();
				}
			},

			/**
			 * Sync the hitarea UI.
			 *
			 * @method _syncIconUI
			 * @param {Array} children
			 * @protected
			 */
			_syncIconUI: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_syncIconUI", 876);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 877);
var instance = this,
					ownerTree = instance.get(OWNER_TREE);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 880);
if (ownerTree) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 881);
var type = ownerTree.get('type'),
						cssClasses = instance.get('cssClasses.' + type);

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 884);
if (!cssClasses) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 885);
return;
					}

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 888);
var expanded = instance.get(EXPANDED),
						iconEl = instance.get(ICON_EL),
						hitAreaEl = instance.get(HIT_AREA_EL),
						icon = instance.isLeaf() ?
								cssClasses.iconLeaf :
								(expanded ? cssClasses.iconExpanded : cssClasses.iconCollapsed),
						iconHitArea = expanded ?
										cssClasses.iconHitAreaExpanded :
										cssClasses.iconHitAreaCollapsed;

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 898);
if (instance.get(LOADING)) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 899);
icon = cssClasses.iconLoading;
					}

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 902);
iconEl.setAttribute('className', icon || BLANK);
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 903);
hitAreaEl.setAttribute('className', iconHitArea || BLANK);
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 906);
instance._syncHitArea();
			},

			/**
			 * Set the <code>boundingBox</code> id.
			 *
			 * @method _syncTreeNodeBBId
			 * @param {String} id
			 * @protected
			 */
			_syncTreeNodeBBId: function(id) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_syncTreeNodeBBId", 916);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 917);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 919);
instance.get(BOUNDING_BOX).attr(
					ID,
					instance.get(ID)
				);
			},

			_uiSetExpanded: function(val) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_uiSetExpanded", 925);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 926);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 928);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 929);
var container = instance.get(CONTAINER);
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 930);
var contentBox = instance.get(CONTENT_BOX);

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 932);
if (val) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 933);
contentBox.replaceClass(CSS_TREE_COLLAPSED, CSS_TREE_EXPANDED);

						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 935);
if (container) {
							_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 936);
container.removeClass(CSS_TREE_HIDDEN);
						}
					}
					else {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 940);
contentBox.replaceClass(CSS_TREE_EXPANDED, CSS_TREE_COLLAPSED);

						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 942);
if (container) {
							_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 943);
container.addClass(CSS_TREE_HIDDEN);
						}
					}
				}
			},

			_uiSetLeaf: function(val) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_uiSetLeaf", 949);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 950);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 952);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 954);
if (val) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 955);
instance.get(CONTAINER).remove();
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 956);
instance.get(HIT_AREA_EL).remove();
				}
				else {
					// append hitarea element
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 960);
contentBox.prepend( instance.get(HIT_AREA_EL) );

					// if has children append them to this model
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 963);
instance._createNodeContainer();

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 965);
instance._uiSetExpanded(instance.get(EXPANDED));
				}

				// add leaf css classes
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 969);
contentBox.toggleClass(CSS_TREE_NODE_LEAF, val);
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 975);
A.TreeNode = TreeNode;

/*
* TreeNodeIO
*/
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 980);
var isFunction = Lang.isFunction,

	CACHE = 'cache',
	IO = 'io',
	LOADED = 'loaded',
	LOADING = 'loading',
	PAGINATOR = 'paginator',
	TREE_NODE_IO = 'tree-node-io',

	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);

/**
 * A base class for TreeNodeIO, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>Ajax support to load the children of the current TreeNode</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var treeNodeIO = new A.TreeNodeIO({
 *  	label: 'TreeNodeIO',
 *  	cache: false,
 *  	io: {
 *  		url: 'assets/content.html'
 *  	}
 *  });
 * </code></pre>
 *
 * Check the list of <a href="TreeNodeIO.html#configattributes">Configuration Attributes</a> available for
 * TreeNodeIO.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNodeIO
 * @constructor
 * @extends TreeNode
 */
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1018);
var TreeNodeIO = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE_IO,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeNode.
		 *
		 * @property TreeNode.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Whether the current TreeNode should cache the loaded content or not.
			 *
			 * @attribute cache
			 * @default true
			 * @type boolean
			 */
			cache: {
				validator: isBoolean,
				value: true
			},

			leaf: {
				validator: isBoolean,
				value: false
			},

			/**
			 * Whether the current TreeNode has loaded the content.
			 *
			 * @attribute loaded
			 * @default false
			 * @type boolean
			 */
			loaded: {
				validator: isBoolean,
				value: false
			},

			/**
			 * Whether the current TreeNode IO transaction is loading.
			 *
			 * @attribute loading
			 * @default false
			 * @type boolean
			 */
			loading: {
				validator: isBoolean,
				value: false
			}
		},

		AUGMENTS: [A.TreeViewPaginator, A.TreeViewIO],

		EXTENDS: A.TreeNode,

		prototype: {
			/**
			 * Bind the events on the TreeNodeIO UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "bindUI", 1091);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1092);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1094);
A.TreeNodeIO.superclass.bindUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1096);
instance.on('ioRequestSuccess', instance._onIOSuccess, instance);
			},

			syncUI: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "syncUI", 1099);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1100);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1102);
A.TreeNodeIO.superclass.syncUI.apply(instance, arguments);
			},

			/*
			* Methods
			*/
			createNodes: function(nodes) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "createNodes", 1108);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1109);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1111);
A.Array.each(
					A.Array(nodes),
					function(node) {
						_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "(anonymous 2)", 1113);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1114);
instance.appendChild(instance.createNode(node));
					}
				);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1118);
instance._syncPaginatorUI(nodes);
			},

			expand: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "expand", 1121);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1122);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1124);
var cache = instance.get(CACHE);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1125);
var io = instance.get(IO);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1126);
var loaded = instance.get(LOADED);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1127);
var loading = instance.get(LOADING);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1129);
if (!cache) {
					// if cache is false on expand, always set LOADED to false
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1131);
instance.set(LOADED, false);
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1134);
if (io && !loaded && !loading && !instance.hasChildNodes()) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1135);
if (!cache) {
						// remove all children to reload
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1137);
instance.empty();
					}

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1140);
instance.initIO();
				}
				else {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1143);
A.TreeNodeIO.superclass.expand.apply(instance, arguments);
				}
			},

			/**
			 * If not specified on the TreeNode some attributes are inherited from the
			 * ownerTree by this method.
			 *
			 * @method _inheritOwnerTreeAttrs
			 * @protected
			 */
			_inheritOwnerTreeAttrs: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_inheritOwnerTreeAttrs", 1154);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1155);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1157);
var ownerTree = instance.get(OWNER_TREE);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1159);
if (ownerTree) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1160);
if (!instance.get(IO)) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1161);
var io = A.clone(
							ownerTree.get(IO),
							true,
							function(value, key) {
								_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "(anonymous 3)", 1164);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1165);
if (isFunction(value) && (value.defaultFn || value.wrappedFn)) {
									_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1166);
return false;
								}

								_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1169);
return true;
							}
						);

						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1173);
instance.set(IO, io);
					}

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1176);
if (!instance.get(PAGINATOR)) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1177);
var ownerTreePaginator = ownerTree.get(PAGINATOR);

						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1179);
var paginator = A.clone(ownerTreePaginator);

						// make sure we are not using the same element passed to the ownerTree on the TreeNode
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1182);
if (paginator && paginator.element) {
							_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1183);
paginator.element = ownerTreePaginator.element.clone();
						}

						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1186);
instance.set(PAGINATOR, paginator);
					}
				}
			},

			_onIOSuccess: function(event) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_onIOSuccess", 1191);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1192);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1194);
instance.expand();
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1200);
A.TreeNodeIO = TreeNodeIO;

/*
* TreeNodeCheck
*/
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1205);
var	CHECKBOX = 'checkbox',
	CHECKED = 'checked',
	CHECK_CONTAINER_EL = 'checkContainerEl',
	CHECK_EL = 'checkEl',
	CHECK_NAME = 'checkName',
	DOT = '.',
	NAME = 'name',
	TREE_NODE_CHECK = 'tree-node-check',

	CSS_TREE_NODE_CHECKBOX = getCN(TREE, NODE, CHECKBOX),
	CSS_TREE_NODE_CHECKBOX_CONTAINER = getCN(TREE, NODE, CHECKBOX, CONTAINER),
	CSS_TREE_NODE_CHECKED = getCN(TREE, NODE, CHECKED),

	CHECKBOX_CONTAINER_TPL = '<div class="' + CSS_TREE_NODE_CHECKBOX_CONTAINER + '"></div>',
	CHECKBOX_TPL = '<input class="' + CSS_TREE_NODE_CHECKBOX + '" type="checkbox" />';

/**
 * <p><img src="assets/images/aui-tree-nod-check/main.png"/></p>
 *
 * A base class for TreeNodeCheck, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>Checkbox support for the TreeNode</li>
 * </ul>
 *
 * Check the list of <a href="TreeNodeCheck.html#configattributes">Configuration Attributes</a> available for
 * TreeNodeCheck.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNodeCheck
 * @constructor
 * @extends TreeNodeIO
 */
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1239);
var TreeNodeCheck = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE_CHECK,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeNode.
		 *
		 * @property TreeNode.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Whether the TreeNode is checked or not.
			 *
			 * @attribute checked
			 * @default false
			 * @type boolean
			 */
			checked: {
				validator: isBoolean,
				value: false
			},

			/**
			 * Container element for the checkbox.
			 *
			 * @attribute checkContainerEl
			 * @default Generated DOM element.
			 * @type Node | String
			 */
			checkContainerEl: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "valueFn", 1280);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1281);
return A.Node.create(CHECKBOX_CONTAINER_TPL);
				}
			},

			/**
			 * Checkbox element.
			 *
			 * @attribute checkEl
			 * @default Generated DOM element.
			 * @type Node | String
			 */
			checkEl: {
				setter: A.one,
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "valueFn", 1294);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1295);
var instance = this;

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1297);
var checkBoxId = instance.get(ID) + 'Checkbox';

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1299);
var attributes = {
						ID: checkBoxId,
						NAME: instance.get(CHECK_NAME)
					};

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1304);
return A.Node.create(CHECKBOX_TPL).attr(attributes);
				}
			},

			/**
			 * Name of the checkbox element used on the current TreeNode.
			 *
			 * @attribute checkName
			 * @default 'tree-node-check'
			 * @type String
			 */
			checkName: {
				value: TREE_NODE_CHECK,
				validator: isString
			}
		},

		EXTENDS: A.TreeNodeIO,

		prototype: {

			initializer: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "initializer", 1325);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1326);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1328);
instance._uiSetChecked(instance.get(CHECKED));
			},

			/*
			* Lifecycle
			*/
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "renderUI", 1334);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1335);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1337);
A.TreeNodeCheck.superclass.renderUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1339);
var checkEl = instance.get(CHECK_EL);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1340);
var checkContainerEl = instance.get(CHECK_CONTAINER_EL);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1342);
checkEl.hide();

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1344);
checkContainerEl.append(checkEl);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1346);
instance.get(LABEL_EL).placeBefore(checkContainerEl);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1348);
if (instance.isChecked()) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1349);
instance.check();
				}
			},

			bindUI: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "bindUI", 1353);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1354);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1356);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1358);
A.TreeNodeCheck.superclass.bindUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1360);
instance.after('checkedChange', A.bind(instance._afterCheckedChange, instance));

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1362);
contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_NODE_CHECKBOX_CONTAINER);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1363);
contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_LABEL);

				// cancel dblclick because of the check
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1366);
instance.get(LABEL_EL).swallowEvent('dblclick');
			},

			/**
			 * Check the current TreeNode.
			 *
			 * @method check
			 */
			check: function(originalTarget) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "check", 1374);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1375);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1377);
instance.set(
					CHECKED,
					true,
					{
						originalTarget: originalTarget
					}
				);
			},

			/*
			* Whether the current TreeNodeCheck is checked.
			*
			* @method isChecked
			* @return boolean
			*/
			isChecked: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "isChecked", 1392);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1393);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1395);
return instance.get(CHECKED);
			},

			/**
			 * Toggle the check status of the current TreeNode.
			 *
			 * @method toggleCheck
			 */
			toggleCheck: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "toggleCheck", 1403);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1404);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1406);
var checkEl = instance.get(CHECK_EL);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1408);
var checked = checkEl.attr(CHECKED);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1410);
if (!checked) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1411);
instance.check();
				}
				else {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1414);
instance.uncheck();
				}
			},

			/**
			 * Uncheck the current TreeNode.
			 *
			 * @method uncheck
			 */
			uncheck: function(originalTarget) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "uncheck", 1423);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1424);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1426);
instance.set(
					CHECKED,
					false,
					{
						originalTarget: originalTarget
					}
				);
			},

			_afterCheckedChange: function(event) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_afterCheckedChange", 1435);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1436);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1438);
instance._uiSetChecked(event.newVal);
			},

			_uiSetChecked: function(val) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_uiSetChecked", 1441);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1442);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1444);
var checkEl = instance.get(CHECK_EL);
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1445);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1447);
if (val) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1448);
contentBox.addClass(CSS_TREE_NODE_CHECKED);
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1449);
checkEl.attr(CHECKED, CHECKED);
				}
				else {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1452);
contentBox.removeClass(CSS_TREE_NODE_CHECKED);
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1453);
checkEl.attr(CHECKED, BLANK);
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1460);
A.TreeNodeCheck = TreeNodeCheck;

/*
* TreeNodeTask
*/
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1465);
var	CHILD = 'child',
	TREE_NODE_TASK = 'tree-node-task',
	UNCHECKED = 'unchecked',

	isTreeNodeTask = function(node) {
		_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "isTreeNodeTask", 1469);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1470);
return node instanceof A.TreeNodeCheck;
	},

	CSS_TREE_NODE_CHILD_UNCHECKED = getCN(TREE, NODE, CHILD, UNCHECKED);

/**
 * <p><img src="assets/images/aui-treeNodeTask/main.png"/></p>
 *
 * A base class for TreeNodeTask, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>3 states checkbox support</li>
 *	<li>Automatic check/uncheck the parent status based on the children checked status</li>
 * </ul>
 *
 * Check the list of <a href="TreeNodeTask.html#configattributes">Configuration Attributes</a> available for
 * TreeNodeTask.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNodeTask
 * @constructor
 * @extends TreeNodeCheck
 */
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1494);
var TreeNodeTask = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE_TASK,

		EXTENDS: A.TreeNodeCheck,

		prototype: {
			/*
			* Methods
			*/
			check: function(originalTarget) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "check", 1511);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1512);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1514);
originalTarget = originalTarget || instance;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1516);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1517);
instance.eachChildren(
						function(child) {
							_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "(anonymous 4)", 1518);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1519);
if (isTreeNodeTask(child)) {
								_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1520);
child.check(originalTarget);
							}
						}
					);
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1526);
instance.eachParent(
					function(parentNode) {
						_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "(anonymous 5)", 1527);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1528);
if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {
							_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1529);
parentNode.get(CONTENT_BOX).addClass(CSS_TREE_NODE_CHILD_UNCHECKED);
						}
					}
				);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1534);
instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

				// invoke default check logic
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1537);
A.TreeNodeTask.superclass.check.call(instance, originalTarget);
			},

			uncheck: function(originalTarget) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "uncheck", 1540);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1541);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1543);
originalTarget = originalTarget || instance;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1545);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1546);
instance.eachChildren(
						function(child) {
							_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "(anonymous 6)", 1547);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1548);
if (child instanceof A.TreeNodeCheck) {
								_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1549);
child.uncheck(originalTarget);
							}
						}
					);
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1555);
instance.eachParent(
					function(parentNode) {
						_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "(anonymous 7)", 1556);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1557);
if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {
							_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1558);
parentNode.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);
						}
					}
				);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1563);
instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

				// invoke default uncheck logic
				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1566);
A.TreeNodeTask.superclass.uncheck.call(instance, originalTarget);
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1572);
A.TreeNodeTask = TreeNodeTask;

/*
* TreeNodeRadio
*/

_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1578);
var	TREE_NODE_RADIO = 'tree-node-radio',

	isTreeNodeRadio = function(node) {
		_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "isTreeNodeRadio", 1580);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1581);
return node instanceof A.TreeNodeRadio;
	},

	CSS_NODE_RADIO = getCN(TREE, NODE, RADIO),
	CSS_NODE_RADIO_CHECKED = getCN(TREE, NODE, RADIO, CHECKED);

/**
 * <p><img src="assets/images/aui-treeNodeRadio/main.png"/></p>
 *
 * A base class for TreeNodeRadio, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>3 states checkbox support</li>
 *	<li>Automatic check/uncheck the parent status based on the children checked status</li>
 * </ul>
 *
 * Check the list of <a href="TreeNodeRadio.html#configattributes">Configuration Attributes</a> available for
 * TreeNodeRadio.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNodeRadio
 * @constructor
 * @extends TreeNodeTask
 */
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1606);
var TreeNodeRadio = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE_RADIO,

		EXTENDS: A.TreeNodeTask,

		prototype: {
			/*
			* Methods
			*/
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "renderUI", 1623);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1624);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1626);
A.TreeNodeRadio.superclass.renderUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1628);
instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO);
			},

			_uncheckNodesRadio: function(node) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_uncheckNodesRadio", 1631);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1632);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1634);
var children;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1636);
if (node) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1637);
children = node.get(CHILDREN);
				}
				else {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1640);
var ownerTree = instance.get(OWNER_TREE);

					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1642);
if (ownerTree) {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1643);
children = ownerTree.get(CHILDREN);
					}
					else {
						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1646);
return;
					}
				}

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1650);
A.Array.each(
					children,
					function(value, index, collection) {
						_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "(anonymous 8)", 1652);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1653);
if (!value.isLeaf()) {
							_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1654);
instance._uncheckNodesRadio(value);
						}

						_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1657);
if (isTreeNodeRadio(value)) {
							_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1658);
value.uncheck();
						}
					}
				);
			},

			_uiSetChecked: function(val) {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "_uiSetChecked", 1664);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1665);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1667);
if (val) {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1668);
instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO_CHECKED);
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1669);
instance.get(CHECK_EL).attr(CHECKED, CHECKED);
				}
				else {
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1672);
instance.get(CONTENT_BOX).removeClass(CSS_NODE_RADIO_CHECKED);
					_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1673);
instance.get(CHECK_EL).attr(CHECKED, BLANK);
				}
			},

			check: function() {
				_yuitest_coverfunc("/build/aui-tree-node/aui-tree-node.js", "check", 1677);
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1678);
var instance = this;

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1680);
instance._uncheckNodesRadio();

				_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1682);
A.TreeNodeRadio.superclass.check.apply(instance, arguments);
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1688);
A.TreeNodeRadio = TreeNodeRadio;

/**
 * TreeNode types hash map.
 *
 * <pre><code>A.TreeNode.nodeTypes = {
 *  check: A.TreeNodeCheck,
 *  io: A.TreeNodeIO,
 *  node: A.TreeNode,
 *  radio: A.TreeNodeRadio,
 *  task: A.TreeNodeTask
 *};</code></pre>
 *
 * @for TreeNode
 * @property A.TreeNode.nodeTypes
 * @type Object
 */
_yuitest_coverline("/build/aui-tree-node/aui-tree-node.js", 1705);
A.TreeNode.nodeTypes = {
	check: A.TreeNodeCheck,
	io: A.TreeNodeIO,
	node: A.TreeNode,
	radio: A.TreeNodeRadio,
	task: A.TreeNodeTask
};

}, '@VERSION@' ,{requires:['aui-tree-data','aui-tree-io','aui-tree-paginator','json','querystring-stringify'], skinnable:false});
