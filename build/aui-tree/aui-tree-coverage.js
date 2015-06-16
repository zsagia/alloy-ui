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
_yuitest_coverage["/build/aui-tree/aui-tree.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-tree/aui-tree.js",
    code: []
};
_yuitest_coverage["/build/aui-tree/aui-tree.js"].code=["AUI.add('aui-tree-data', function(A) {","/**"," * The TreeData Utility"," *"," * @module aui-tree"," * @submodule aui-tree-data"," */","","var L = A.Lang,","	isArray = L.isArray,","	isBoolean = L.isBoolean,","	isObject = L.isObject,","	isUndefined = L.isUndefined,","","	BOUNDING_BOX = 'boundingBox',","	CHILDREN = 'children',","	CONTAINER = 'container',","	DOT = '.',","	ID = 'id',","	INDEX = 'index',","	LAZY_LOAD = 'lazyLoad',","	LEAF = 'leaf',","	NEXT_SIBLING = 'nextSibling',","	NODE = 'node',","	OWNER_TREE = 'ownerTree',","	PARENT_NODE = 'parentNode',","	PREV_SIBLING = 'prevSibling',","	PREVIOUS_SIBLING = 'previousSibling',","	TREE = 'tree',","	TREE_NODE = 'tree-node',","	TREE_DATA = 'tree-data',","","	isTreeNode = function(v) {","		return ( v instanceof A.TreeNode );","	},","","	isTreeView = function(v) {","		return ( v instanceof A.TreeView );","	},","","	getCN = A.getClassName,","","	CSS_TREE_NODE = getCN(TREE, NODE);","","/**"," * A base class for TreeData, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Handle the data of the tree</li>"," *    <li>Basic DOM implementation (append/remove/insert)</li>"," *    <li>Indexing management to handle the children nodes</li>"," * </ul>"," *"," * Check the list of <a href=\"TreeData.html#configattributes\">Configuration Attributes</a> available for"," * TreeData."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeData"," * @constructor"," * @extends Base"," */","","var TreeData = function () {};","","TreeData.ATTRS = {","	/**","	 * Container to nest children nodes. If has cntainer it's not a leaf.","	 *","	 * @attribute container","	 * @default null","	 * @type Node | String","	 */","	container: {","		setter: A.one","	},","","	/**","	 * Array of children (i.e. could be a JSON metadata object or a TreeNode instance).","	 *","	 * @attribute children","	 * @default []","	 * @type Array","	 */","	children: {","		value: [],","		validator: isArray,","		setter: '_setChildren'","	},","","	/**","	 * Index the nodes.","	 *","	 * @attribute index","	 * @default {}","	 * @type Object","	 */","	index: {","		value: {}","	}","};","","A.mix(TreeData.prototype, {","	childrenLength: 0,","","	/**","	 * Construction logic executed during TreeData instantiation. Lifecycle.","	 *","	 * @method initializer","	 * @protected","	 */","	initTreeData: function() {","		var instance = this;","","		// binding on initializer, needed before .render() phase","		instance.publish('move');","		instance.publish('append', { defaultFn: instance._appendChild });","		instance.publish('remove', { defaultFn: instance._removeChild });","	},","","	/**","	 * Descructor lifecycle implementation for the TreeData class.","	 * Purges events attached to the node (and all child nodes).","	 *","	 * @method destructor","	 * @protected","	 */","	destructor: function() {","		var instance = this;","","		instance.eachChildren(function(node) {","			node.destroy();","		}, true);","	},","","	/**","	 * Get a TreeNode by id.","	 *","	 * @method getNodeById","	 * @param {String} uid","	 * @return {TreeNode}","	 */","	getNodeById: function(uid) {","		var instance = this;","","		return instance.get(INDEX)[uid];","	},","","	/**","	 * Whether the TreeNode is registered on this TreeData.","	 *","	 * @method isRegistered","	 * @param {TreeNode} node","	 * @return {boolean}","	 */","	isRegistered: function(node) {","		var instance = this;","","		return !!(instance.get(INDEX)[ node.get(ID) ]);","	},","","	/**","	 * Update the references of the passed TreeNode.","	 *","	 * @method updateReferences","	 * @param {node} TreeNode","	 * @param {parentNode} TreeNode","	 * @param {ownerTree} TreeView","	 */","	updateReferences: function(node, parentNode, ownerTree) {","		var instance = this;","		var oldParent = node.get(PARENT_NODE);","		var oldOwnerTree = node.get(OWNER_TREE);","		var moved = oldParent && (oldParent !== parentNode);","","		if (oldParent) {","			if (moved) {","				// when moved update the oldParent children","				var children = oldParent.get(CHILDREN);","","				A.Array.removeItem(children, node);","","				oldParent.set(CHILDREN, children);","			}","","			oldParent.unregisterNode(node);","		}","","		if (oldOwnerTree) {","			oldOwnerTree.unregisterNode(node);","		}","","		// update parent reference when registered","		node.set(PARENT_NODE, parentNode);","","		// update the ownerTree of the node","		node.set(OWNER_TREE, ownerTree);","","		if (parentNode) {","			// register the new node on the parentNode index","			parentNode.registerNode(node);","		}","","		if (ownerTree) {","			// register the new node to the ownerTree index","			ownerTree.registerNode(node);","		}","","		if (oldOwnerTree != ownerTree) {","			// when change the OWNER_TREE update the children references also","			node.eachChildren(function(child) {","				instance.updateReferences(child, child.get(PARENT_NODE), ownerTree);","			});","		}","","		// trigger move event","		if (moved) {","			var output = instance.getEventOutputMap(node);","","			if (!oldParent.get('children').length) {","				oldParent.collapse();","				oldParent.hideHitArea();","			}","","			output.tree.oldParent = oldParent;","			output.tree.oldOwnerTree = oldOwnerTree;","","			instance.bubbleEvent('move', output);","		}","	},","","	/**","	 * Refresh the index (i.e. re-index all nodes).","	 *","	 * @method refreshIndex","	 */","	refreshIndex: function() {","		var instance = this;","","		// reset index","		instance.updateIndex({});","","		// get all descendent children - deep","		instance.eachChildren(function(node) {","			instance.registerNode(node);","		}, true);","	},","","	/**","	 * Register the passed TreeNode on this TreeData.","	 *","	 * @method registerNode","	 * @param {TreeNode} node","	 */","	registerNode: function(node) {","		var instance = this;","		var uid = node.get(ID);","		var index = instance.get(INDEX);","","		if (uid) {","			index[uid] = node;","		}","","		if (isTreeView(instance)) {","			node.addTarget(instance);","","			// when the node is appended to the TreeView set the OWNER_TREE","			node.set(OWNER_TREE, instance);","		}","","		node._inheritOwnerTreeAttrs();","","		instance.updateIndex(index);","	},","","	/**","	 * Update the <a href=\"TreeData.html#config_index\">index</a> attribute value.","	 *","	 * @method updateIndex","	 * @param {Object} index","	 */","	updateIndex: function(index) {","		var instance = this;","","		if (index) {","			instance.set(INDEX, index);","		}","	},","","	/**","	 * Unregister the passed TreeNode from this TreeData.","	 *","	 * @method unregisterNode","	 * @param {TreeNode} node","	 */","	unregisterNode: function(node) {","		var instance = this;","		var index = instance.get(INDEX);","","		delete index[ node.get(ID) ];","","		if (isTreeView(instance)) {","			node.removeTarget(instance);","		}","","		instance.updateIndex(index);","	},","","	/**","	 * Collapse all children of the TreeData.","	 *","	 * @method collapseAll","	 */","	collapseAll: function() {","		var instance = this;","","		instance.eachChildren(function(node) {","			node.collapse();","		}, true);","	},","","	/**","	 * Expand all children of the TreeData.","	 *","	 * @method expandAll","	 */","	expandAll: function() {","		var instance = this;","","		instance.eachChildren(function(node) {","			node.expand();","		}, true);","	},","","	/**","	 * Select all children of the TreeData.","	 *","	 * @method selectAll","	 */","	selectAll: function() {","		var instance = this;","","		instance.eachChildren(function(child) {","			child.select();","		}, true);","	},","","	/**","	 * Unselect all children of the TreeData.","	 *","	 * @method selectAll","	 */","	unselectAll: function() {","		var instance = this;","","		instance.eachChildren(function(child) {","			child.unselect();","		}, true);","	},","","	/**","	 * Loop each children and execute the <code>fn</code> callback.","	 *","	 * @method eachChildren","	 * @param {function} fn callback","	 * @param {boolean} fn recursive","	 */","	eachChildren: function(fn, deep) {","		var instance = this;","		var children = instance.getChildren(deep);","","		A.Array.each(children, function(node) {","			if (node) {","				fn.apply(instance, arguments);","			}","		});","	},","","	/**","	 * Loop each parent node and execute the <code>fn</code> callback.","	 *","	 * @method eachChildren","	 * @param {function} fn callback","	 */","	eachParent: function(fn) {","		var instance = this;","		var parentNode = instance.get(PARENT_NODE);","","		while (parentNode) {","			if (parentNode) {","				fn.call(instance, parentNode);","			}","			parentNode = parentNode.get(PARENT_NODE);","		}","	},","","	/**","	 * Bubble event to all parent nodes.","	 *","	 * @method bubbleEvent","	 * @param {String} eventType","	 * @param {Array} args","	 * @param {boolean} cancelBubbling","	 * @param {boolean} stopActionPropagation","	 */","	bubbleEvent: function(eventType, args, cancelBubbling, stopActionPropagation) {","		var instance = this;","","		// event.stopActionPropagation === undefined, invoke the event native action","		instance.fire(eventType, args);","","		if (!cancelBubbling) {","			var parentNode = instance.get(PARENT_NODE);","","			// Avoid execution of the native action (private methods) while propagate","			// for example: private _appendChild() is invoked only on the first level of the bubbling","			// the intention is only invoke the user callback on parent nodes.","			args = args || {};","","			if (isUndefined(stopActionPropagation)) {","				stopActionPropagation = true;","			}","","			args.stopActionPropagation = stopActionPropagation;","","			while(parentNode) {","				parentNode.fire(eventType, args);","				parentNode = parentNode.get(PARENT_NODE);","			}","		}","	},","","	/**","	 * Create a TreeNode instance.","	 *","	 * @method createNode","	 * @param {Object} options","	 * @return {TreeNode}","	 */","	createNode: function(options) {","		var instance = this;","		var classType = A.TreeNode.nodeTypes[ isObject(options) ? options.type : options ] || A.TreeNode;","","		return new classType(","			isObject(options) ? options : {}","		);","	},","","	/**","	 * Append a child node to the TreeData.","	 *","	 * @method appendChild","	 * @param {TreeNode} node","	 * @param {boolean} cancelBubbling","	 */","	appendChild: function(node, cancelBubbling) {","		var instance = this;","		var output = instance.getEventOutputMap(node);","","		instance.bubbleEvent('append', output, cancelBubbling);","	},","","	/**","	 * Append a child node to the TreeData.","	 *","	 * @method _appendChild","	 * @param {TreeNode} node","	 * @param {boolean} cancelBubbling","	 * @protected","	 */","	_appendChild: function(event) {","		// stopActionPropagation while bubbling","		if (event.stopActionPropagation) {","			return false;","		}","","		var instance = this;","		var node = event.tree.node;","		var ownerTree = instance.get(OWNER_TREE);","		var children = instance.get(CHILDREN);","","		// updateReferences first","		instance.updateReferences(node, instance, ownerTree);","		// and then set the children, to have the appendChild propagation","		// the PARENT_NODE references should be updated","		var length = children.push(node);","		instance.set(CHILDREN, children);","","		// updating prev/nextSibling attributes","		var prevIndex = length - 2;","		var prevSibling = instance.item(prevIndex);","","		node.set(NEXT_SIBLING, null);","		node.set(PREV_SIBLING, prevSibling);","","		// render node","		node.render(instance.get(CONTAINER));","	},","","	/**","	 * Get a TreeNode children by index.","	 *","	 * @method item","	 * @param {Number} index","	 * @return {TreeNode}","	 */","	item: function(index) {","		var instance = this;","","		return instance.get(CHILDREN)[index];","	},","","	/**","	 * Index of the passed TreeNode on the <a","     * href=\"TreeData.html#config_children\">children</a> attribute.","	 *","	 * @method indexOf","	 * @param {TreeNode} node","	 * @return {Number}","	 */","	indexOf: function(node) {","		var instance = this;","","		return A.Array.indexOf( instance.get(CHILDREN), node );","	},","","	/**","	 * Whether the TreeData contains children or not.","	 *","	 * @method hasChildNodes","	 * @return {boolean}","	 */","	hasChildNodes: function() {","		var instance = this;","","		return (instance.getChildrenLength() > 0);","	},","","	/**","	 * Get an Array of the children nodes of the current TreeData.","	 *","	 * @method getChildren","	 * @param {boolean} deep","	 * @return {Array}","	 */","	getChildren: function(deep) {","		var instance = this;","		var cNodes = [];","		var children = instance.get(CHILDREN);","","		cNodes = cNodes.concat(children);","","		if (deep) {","			instance.eachChildren(function(child) {","				cNodes = cNodes.concat( child.getChildren(deep) );","			});","		}","","		return cNodes;","	},","","	getChildrenLength: function() {","		var instance = this;","","		return (instance.childrenLength || instance.get(CHILDREN).length);","	},","","	/**","	 * Get an object containing metadata for the custom events.","	 *","	 * @method getEventOutputMap","	 * @param {TreeData} node","	 * @return {Object}","	 */","	getEventOutputMap: function(node) {","		var instance = this;","","		return {","			tree: {","				instance: instance,","				node: node || instance","			}","		};","	},","","	/**","	 * Remove the passed <code>node</code> from the current TreeData.","	 *","	 * @method removeChild","	 * @param {TreeData} node","	 */","	removeChild: function(node) {","		var instance = this;","		var output = instance.getEventOutputMap(node);","","		instance.bubbleEvent('remove', output);","	},","","	/**","	 * Remove the passed <code>node</code> from the current TreeData.","	 *","	 * @method _removeChild","	 * @param {TreeData} node","	 */","	_removeChild: function(event) {","		// stopActionPropagation while bubbling","		if (event.stopActionPropagation) {","			return false;","		}","","		var instance = this;","		var node = event.tree.node;","		var ownerTree = instance.get(OWNER_TREE);","","		if (instance.isRegistered(node)) {","			// update parent reference when removed","			node.set(PARENT_NODE, null);","","			// unregister the node","			instance.unregisterNode(node);","","			// no parent, no ownerTree","			node.set(OWNER_TREE, null);","","			if (ownerTree) {","				// unregister the removed node from the tree index","				ownerTree.unregisterNode(node);","			}","","			// remove child from the container","			node.get(BOUNDING_BOX).remove();","","			var children = instance.get(CHILDREN);","","			A.Array.removeItem(children, node);","			instance.set(CHILDREN, children);","		}","	},","","	/**","	 * Delete all children of the current TreeData.","	 *","	 * @method empty","	 */","	empty: function() {","		var instance = this;","","		instance.eachChildren(function(node) {","			var parentNode = node.get(PARENT_NODE);","","			if (parentNode) {","				parentNode.removeChild(node);","			}","		});","	},","","	/**","	 * Insert <code>treeNode</code> before or after the <code>refTreeNode</code>.","	 *","	 * @method insert","	 * @param {TreeNode} treeNode","	 * @param {TreeNode} refTreeNode","	 * @param {TreeNode} where 'before' or 'after'","	 */","	insert: function(treeNode, refTreeNode, where) {","		var instance = this;","		refTreeNode = refTreeNode || this;","","		if (refTreeNode === treeNode) {","			return false; // NOTE: return","		}","","		var refParentTreeNode = refTreeNode.get(PARENT_NODE);","","		if (treeNode && refParentTreeNode) {","			var nodeBoundingBox = treeNode.get(BOUNDING_BOX);","			var refBoundingBox = refTreeNode.get(BOUNDING_BOX);","			var ownerTree = refTreeNode.get(OWNER_TREE);","","			if (where === 'before') {","				refBoundingBox.placeBefore(nodeBoundingBox);","			}","			else if (where === 'after') {","				refBoundingBox.placeAfter(nodeBoundingBox);","			}","","			var refSiblings = [];","			// using the YUI selector to regenerate the index based on the real dom","			// this avoid misscalculations on the nodes index number","			var DOMChildren = refParentTreeNode.get(BOUNDING_BOX).all('> ul > li');","","			DOMChildren.each(function(child) {","				refSiblings.push( child.getData(TREE_NODE) );","			});","","			// updating prev/nextSibling attributes","			var nextSiblingNode = nodeBoundingBox.get(NEXT_SIBLING);","","			treeNode.set(NEXT_SIBLING, nextSiblingNode && nextSiblingNode.getData(TREE_NODE));","","			var prevSiblingNode = nodeBoundingBox.get(PREVIOUS_SIBLING);","","			treeNode.set(PREV_SIBLING, prevSiblingNode && prevSiblingNode.getData(TREE_NODE));","","			// update all references","			refTreeNode.updateReferences(treeNode, refParentTreeNode, ownerTree);","","			// updating refParentTreeNode childTreeNodes","			refParentTreeNode.set(CHILDREN, refSiblings);","		}","","		// render treeNode after it's inserted","		treeNode.render();","","		// invoking insert event","		var output = refTreeNode.getEventOutputMap(treeNode);","","		output.tree.refTreeNode = refTreeNode;","","		refTreeNode.bubbleEvent('insert', output);","	},","","	/**","	 * Insert <code>treeNode</code> after the <code>refTreeNode</code>.","	 *","	 * @method insertAfter","	 * @param {TreeNode} treeNode","	 * @param {TreeNode} refTreeNode","	 */","	insertAfter: function(treeNode, refTreeNode) {","		var instance = this;","","		instance.insert(treeNode, refTreeNode, 'after');","	},","","	/**","	 * Insert <code>treeNode</code> before the <code>refTreeNode</code>.","	 *","	 * @method insertBefore","	 * @param {TreeNode} treeNode","	 * @param {TreeNode} refTreeNode","	 */","	insertBefore: function(treeNode, refTreeNode) {","		var instance = this;","","		instance.insert(treeNode, refTreeNode, 'before');","	},","","	/**","	 * Get a TreeNode instance by a child DOM Node.","	 *","	 * @method getNodeByChild","	 * @param {Node} child","	 * @return {TreeNode}","	 */","	getNodeByChild: function(child) {","		var instance = this;","		var treeNodeEl = child.ancestor(DOT+CSS_TREE_NODE);","","		if (treeNodeEl) {","			return treeNodeEl.getData(TREE_NODE);","		}","","		return null;","	},","","	_inheritOwnerTreeAttrs: L.emptyFn,","","	/**","	 * Setter for <a href=\"TreeData.html#config_children\">children</a>.","	 *","	 * @method _setChildren","	 * @protected","	 * @param {Array} v","	 * @return {Array}","	 */","	_setChildren: function(v) {","		var instance = this;","		var childNodes = [];","		var container = instance.get(CONTAINER);","","		if (!container) {","			container = instance._createNodeContainer();","		}","","		instance.childrenLength = v.length;","","		// before render the node, make sure the PARENT_NODE and OWNER_TREE references are updated","		// this is required on the render phase of the TreeNode (_createNodeContainer)","		// to propagate the events callback (appendChild/expand)","		var ownerTree = instance;","","		if (isTreeNode(instance)) {","			ownerTree = instance.get(OWNER_TREE);","		}","","		var hasOwnerTree = isTreeView(ownerTree);","		var lazyLoad = true;","","		if (hasOwnerTree) {","			lazyLoad = ownerTree.get(LAZY_LOAD);","		}","","		instance.updateIndex({});","","		if (instance.childrenLength > 0) {","			instance.set(LEAF, false);","		}","","		A.Array.each(v, function(node, index) {","			if (node) {","				if (!isTreeNode(node) && isObject(node)) {","					// cache and remove children to lazy add them later for","					// performance reasons","					var children = node[CHILDREN];","					var hasChildren = children && children.length;","","					node[OWNER_TREE] = ownerTree;","					node[PARENT_NODE] = instance;","","					if (hasChildren && lazyLoad) {","						delete node[CHILDREN];","					}","","					// creating node from json","					node = instance.createNode(node);","","					if (hasChildren && lazyLoad) {","						node.childrenLength = children.length;","","						A.setTimeout(function() {","							node.set(CHILDREN, children);","						}, 50);","					}","				}","","				if (hasOwnerTree) {","					ownerTree.registerNode(node);","				}","","				node._inheritOwnerTreeAttrs();","				node.render(instance.get(CONTAINER));","","				// avoid duplicated children on the childNodes list","				if (A.Array.indexOf(childNodes, node) === -1) {","					childNodes.push(node);","				}","			}","		});","","		return childNodes;","	}","});","","A.TreeData = TreeData;","","}, '@VERSION@' ,{requires:['aui-base','aui-task-manager'], skinnable:false});","AUI.add('aui-tree-node', function(A) {","/**"," * The TreeNode Utility"," *"," * @module aui-tree"," * @submodule aui-tree-node"," */","","var Lang = A.Lang,","	isString = Lang.isString,","	isBoolean = Lang.isBoolean,","","	ALWAYS_SHOW_HITAREA = 'alwaysShowHitArea',","	BLANK = '',","	BOUNDING_BOX = 'boundingBox',","	CHILDREN = 'children',","	CLEARFIX = 'clearfix',","	COLLAPSED = 'collapsed',","	CONTAINER = 'container',","	CONTENT = 'content',","	CONTENT_BOX = 'contentBox',","	EXPANDED = 'expanded',","	HELPER = 'helper',","	HIDDEN = 'hidden',","	HIT_AREA_EL = 'hitAreaEl',","	HITAREA = 'hitarea',","	ICON = 'icon',","	ICON_EL = 'iconEl',","	ID = 'id',","	LABEL = 'label',","	LABEL_EL = 'labelEl',","	LAST_SELECTED = 'lastSelected',","	LEAF = 'leaf',","	NODE = 'node',","	OVER = 'over',","	OWNER_TREE = 'ownerTree',","	PARENT_NODE = 'parentNode',","	RADIO = 'radio',","	RENDERED = 'rendered',","	SELECTED = 'selected',","	SPACE = ' ',","	TREE = 'tree',","	TREE_NODE = 'tree-node',","","	concat = function() {","		return Array.prototype.slice.call(arguments).join(SPACE);","	},","","	isTreeNode = function(v) {","		return (v instanceof A.TreeNode);","	},","","	isTreeView = function(v) {","		return (v instanceof A.TreeView);","	},","","	getCN = A.getClassName,","","	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),","	CSS_TREE_COLLAPSED = getCN(TREE, COLLAPSED),","	CSS_TREE_CONTAINER = getCN(TREE, CONTAINER),","	CSS_TREE_CONTENT_BOX = getCN(TREE, CONTENT_BOX),","	CSS_TREE_EXPANDED = getCN(TREE, EXPANDED),","	CSS_TREE_HIDDEN = getCN(TREE, HIDDEN),","	CSS_TREE_HITAREA = getCN(TREE, HITAREA),","	CSS_TREE_ICON = getCN(TREE, ICON),","	CSS_TREE_LABEL = getCN(TREE, LABEL),","	CSS_TREE_NODE = getCN(TREE, NODE),","	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),","	CSS_TREE_NODE_HIDDEN_HITAREA = getCN(TREE, NODE, HIDDEN, HITAREA),","	CSS_TREE_NODE_LEAF = getCN(TREE, NODE, LEAF),","	CSS_TREE_NODE_OVER = getCN(TREE, NODE, OVER),","	CSS_TREE_NODE_SELECTED = getCN(TREE, NODE, SELECTED),","","	HIT_AREA_TPL = '<div class=\"' + CSS_TREE_HITAREA + '\"></div>',","	ICON_TPL = '<div class=\"' + CSS_TREE_ICON + '\"></div>',","	LABEL_TPL = '<div class=\"' + CSS_TREE_LABEL + '\"></div>',","	NODE_CONTAINER_TPL = '<ul></ul>',","","	NODE_BOUNDING_TEMPLATE = '<li class=\"' + CSS_TREE_NODE + '\"></li>',","	NODE_CONTENT_TEMPLATE = '<div class=\"' + concat(CSS_HELPER_CLEARFIX, CSS_TREE_NODE_CONTENT) + '\"></div>';","","/**"," * A base class for TreeNode, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>The node for the TreeView component</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new A.TreeNode({","	boundingBox: ''","}).render();"," * </code></pre>"," *"," * Check the list of <a href=\"TreeNode.html#configattributes\">Configuration Attributes</a> available for"," * TreeNode."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNode"," * @constructor"," * @extends TreeData"," */","var TreeNode = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeNode.","		 *","		 * @property TreeNode.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Always show the hitarea icon.","			 *","			 * @attribute alwaysShowHitArea","			 * @default true","			 * @type boolean","			 */","			alwaysShowHitArea: {","				validator: isBoolean,","				value: true","			},","","			boundingBox: {","				valueFn: function() {","					return A.Node.create(NODE_BOUNDING_TEMPLATE);","				}","			},","","			contentBox: {","				valueFn: function() {","					return A.Node.create(NODE_CONTENT_TEMPLATE);","				}","			},","","			/**","			 * If true the TreeNode is draggable.","			 *","			 * @attribute draggable","			 * @default true","			 * @type boolean","			 */","			draggable: {","				validator: isBoolean,","				value: true","			},","","			/**","			 * Whether the TreeNode is expanded by default.","			 *","			 * @attribute expanded","			 * @default false","			 * @type boolean","			 */","			expanded: {","				validator: isBoolean,","				value: false","			},","","			/**","			 * Hitarea element.","			 *","			 * @attribute hitAreaEl","			 * @default Generated DOM element.","			 * @type Node | String","			 */","			hitAreaEl: {","				setter: A.one,","				valueFn: function() {","					return A.Node.create(HIT_AREA_TPL);","				}","			},","","			/**","			 * Icon element.","			 *","			 * @attribute iconEl","			 * @type Node | String","			 */","			iconEl: {","				setter: A.one,","				valueFn: function() {","					return A.Node.create(ICON_TPL);","				}","			},","","			/**","			 * Id of the TreeNode.","			 *","			 * @attribute id","			 * @default null","			 * @type String","			 */","			id: {","				validator: isString,","				valueFn: function() {","					return A.guid();","				}","			},","","			/**","			 * Label of the TreeNode.","			 *","			 * @attribute label","			 * @default ''","			 * @type String","			 */","			label: {","				validator: isString,","				value: BLANK","			},","","			/**","			 * Label element to house the <code>label</code> attribute.","			 *","			 * @attribute labelEl","			 * @default Generated DOM element.","			 * @type Node | String","			 */","			labelEl: {","				setter: A.one,","				valueFn: function() {","					var instance = this;","","					var label = instance.get(LABEL);","","					return A.Node.create(LABEL_TPL).html(label).unselectable();","				}","			},","","			/**","			 * Whether the TreeNode could have children or not (i.e. if any","			 * children is present the TreeNode is a leaf).","			 *","			 * @attribute leaf","			 * @default true","			 * @type boolean","			 */","			leaf: {","				setter: function(v) {","					var instance = this;","","					// if has children it's not a leaf","					if (v && instance.get(CHILDREN).length) {","						return false;","					}","","					return v;","				},","				validator: isBoolean,","				value: true","			},","","			/**","			 * Next sibling of the current TreeNode.","			 *","			 * @attribute nextSibling","			 * @default null","			 * @type TreeNode","			 */","			nextSibling: {","				getter: '_getSibling',","				validator: isTreeNode,","				value: null","			},","","			/**","			 * TreeView which contains the current TreeNode.","			 *","			 * @attribute ownerTree","			 * @default null","			 * @type TreeView","			 */","			ownerTree: {","				value: null","			},","","			/**","			 * Parent node of the current TreeNode.","			 *","			 * @attribute parentNode","			 * @default null","			 * @type TreeNode","			 */","			parentNode: {","				validator: function(val) {","					return isTreeNode(val) || isTreeView(val);","				},","				value: null","			},","","			/**","			 * Previous sibling of the current TreeNode.","			 *","			 * @attribute prevSibling","			 * @default null","			 * @type TreeNode","			 */","			prevSibling: {","				getter: '_getSibling',","				validator: isTreeNode,","				value: null","			},","","			rendered: {","				validator: isBoolean,","				value: false","			},","","			tabIndex: {","				value: null","			}","		},","","		AUGMENTS: [A.TreeData],","","		EXTENDS: A.Base,","","		prototype: {","			/**","			 * Replaced BOUNDING_TEMPLATE with NODE_BOUNDING_TEMPLATE.","			 *","			 * @property BOUNDING_TEMPLATE","			 * @type String","			 * @protected","			 */","			BOUNDING_TEMPLATE: NODE_BOUNDING_TEMPLATE,","			/**","			 * Replaced CONTENT_TEMPLATE with NODE_CONTENT_TEMPLATE.","			 *","			 * @property CONTENT_TEMPLATE","			 * @type String","			 * @protected","			 */","			CONTENT_TEMPLATE: NODE_CONTENT_TEMPLATE,","","			/**","			 * Construction logic executed during TreeNode instantiation. Lifecycle.","			 *","			 * @method initializer","			 * @protected","			 */","			initializer: function() {","				var instance = this;","","				instance.get(BOUNDING_BOX).setData(TREE_NODE, instance);","","				// Sync the Widget TreeNode id with the BOUNDING_BOX id","				instance._syncTreeNodeBBId();","","				instance._uiSetExpanded(instance.get(EXPANDED));","","				instance._uiSetLeaf(instance.get(LEAF));","","				instance.initTreeData();","			},","","			/**","			 * Bind the events on the TreeNode UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));","				instance.after('expandedChange', A.bind(instance._afterExpandedChange, instance));","				instance.after('idChange', instance._afterSetId, instance);","			},","","			render: function(container) {","				var instance = this;","","				if (!instance.get(RENDERED)) {","					instance.renderUI();","					instance.bindUI();","					instance.syncUI();","","					instance.set(RENDERED, true);","				}","","				if (container) {","					var boundingBox = instance.get(BOUNDING_BOX);","					var parentNode = instance.get(PARENT_NODE);","","					boundingBox.appendTo(container);","","					if (parentNode) {","						var paginator = parentNode.get(PAGINATOR);","","						if (paginator) {","							boundingBox.insertBefore(paginator.element, null);","						}","					}","				}","			},","","			/**","			 * Create the DOM structure for the TreeNode. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				instance._renderBoundingBox();","				instance._renderContentBox();","			},","","			/**","			 * Sync the TreeNode UI. Lifecycle.","			 *","			 * @method syncUI","			 * @protected","			 */","			syncUI: function() {","				var instance = this;","","				instance._syncIconUI();","			},","","			/*","			* Methods","			*/","			appendChild: function() {","				var instance = this;","","				if (!instance.isLeaf()) {","					A.TreeNode.superclass.appendChild.apply(instance, arguments);","				}","			},","","			/**","			 * Collapse the current TreeNode.","			 *","			 * @method collapse","			 */","			collapse: function() {","				var instance = this;","","				instance.set(EXPANDED, false);","			},","","			collapseAll: function() {","				var instance = this;","","				A.TreeNode.superclass.collapseAll.apply(instance, arguments);","","				// instance is also a node, so collapse itself","				instance.collapse();","			},","","			/**","			 * Check if the current TreeNode contains the passed <code>node</code>.","			 *","			 * @method contains","			 * @param {TreeNode} node","			 * @return {boolean}","			 */","			contains: function(node) {","				var instance = this;","","				return node.isAncestor(instance);","			},","","			/**","			 * Expand the current TreeNode.","			 *","			 * @method expand","			 */","			expand: function() {","				var instance = this;","","				instance.set(EXPANDED, true);","			},","","			expandAll: function() {","				var instance = this;","","				A.TreeNode.superclass.expandAll.apply(instance, arguments);","","				// instance is also a node, so expand itself","				instance.expand();","			},","","			/**","			 * Get the depth of the current TreeNode.","			 *","			 * @method getDepth","			 * @return {Number}","			 */","			getDepth: function() {","				var instance = this;","","				var depth = 0;","","				var parentNode = instance.get(PARENT_NODE);","","				while (parentNode) {","					++depth;","","					parentNode = parentNode.get(PARENT_NODE);","				}","","				return depth;","			},","","			hasChildNodes: function() {","				var instance = this;","","				return (!instance.isLeaf() && A.TreeNode.superclass.hasChildNodes.apply(instance, arguments));","			},","","			/*","			* Hide hitarea icon.","			*","			* @method hideHitArea","			*/","			hideHitArea: function() {","				var instance = this;","","				instance.get(HIT_AREA_EL).addClass(CSS_TREE_NODE_HIDDEN_HITAREA);","			},","","			/**","			 * Whether the current TreeNode is ancestor of the passed <code>node</code> or not.","			 *","			 * @method isLeaf","			 * @return {boolean}","			 */","			isAncestor: function(node) {","				var instance = this;","","				var parentNode = instance.get(PARENT_NODE);","","				while (parentNode) {","					if (parentNode === node) {","						return true;","					}","					parentNode = parentNode.get(PARENT_NODE);","				}","","				return false;","			},","","			/**","			 * Whether the current TreeNode is a leaf or not.","			 *","			 * @method isLeaf","			 * @return {boolean}","			 */","			isLeaf: function() {","				var instance = this;","","				return instance.get(LEAF);","			},","","			/**","			 * Whether the current TreeNode is selected or not.","			 *","			 * @method isSelected","			 * @return {boolean}","			 */","			isSelected: function() {","				var instance = this;","","				return instance.get(CONTENT_BOX).hasClass(CSS_TREE_NODE_SELECTED);","			},","","			/*","			* Fires when <code>mouseout</code> the current TreeNode.","			*","			* @method over","			*/","			out: function() {","				var instance = this;","","				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_OVER);","			},","","			/*","			* Fires when <code>mouseover</code> the current TreeNode.","			*","			* @method over","			*/","			over: function() {","				var instance = this;","","				instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_OVER);","			},","","			/*","			* Select the current TreeNode.","			*","			* @method select","			*/","			select: function() {","				var instance = this;","","				var ownerTree = instance.get(OWNER_TREE);","","				if (ownerTree) {","					ownerTree.set(LAST_SELECTED, instance);","				}","","				instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_SELECTED);","","				instance.fire('select');","			},","","			/*","			* Show hitarea icon.","			*","			* @method showHitArea","			*/","			showHitArea: function() {","				var instance = this;","","				instance.get(HIT_AREA_EL).removeClass(CSS_TREE_NODE_HIDDEN_HITAREA);","			},","","			insertAfter: function(node, refNode) {","				var instance = this;","","				A.TreeNode.superclass.insertAfter.apply(this, [node, instance]);","			},","","			insertBefore: function(node) {","				var instance = this;","","				A.TreeNode.superclass.insertBefore.apply(this, [node, instance]);","			},","","			removeChild: function(node) {","				var instance = this;","","				if (!instance.isLeaf()) {","					A.TreeNode.superclass.removeChild.apply(instance, arguments);","				}","			},","","			/**","			 * Toggle the current TreeNode, <code>collapsed</code> or <code>expanded</code>.","			 *","			 * @method toggle","			 */","			toggle: function() {","				var instance = this;","","				if (instance.get(EXPANDED)) {","					instance.collapse();","				}","				else {","					instance.expand();","				}","			},","","			/*","			* Unselect the current TreeNode.","			*","			* @method unselect","			*/","			unselect: function() {","				var instance = this;","","				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_SELECTED);","","				instance.fire('unselect');","			},","","			/**","			 * Fire after draggable change.","			 *","			 * @method _afterDraggableChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterDraggableChange: function(event) {","				var instance = this;","","				instance._uiSetDraggable(event.newVal);","				instance._syncIconUI();","			},","","			/**","			 * Fire after expanded change.","			 *","			 * @method _afterExpandedChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterExpandedChange: function(event) {","				var instance = this;","","				instance._uiSetExpanded(event.newVal);","				instance._syncIconUI();","			},","","			/**","			 * Fire after leaf change.","			 *","			 * @method _afterLeafChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterLeafChange: function(event) {","				var instance = this;","","				instance._uiSetLeaf(event.newVal);","				instance._syncIconUI();","			},","","			/**","			 * Fire after loading change.","			 *","			 * @method _afterLoadingChange","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterLoadingChange: function(event) {","				var instance = this;","","				instance._syncIconUI();","			},","","			/**","			 * Fire after set children.","			 *","			 * @method _afterSetChildren","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterSetChildren: function(event) {","				var instance = this;","","				instance._syncIconUI();","			},","","			/**","			 * Render the node container.","			 *","			 * @method _createNodeContainer","			 * @protected","			 * @return {Node}","			 */","			_createNodeContainer: function() {","				var instance = this;","","				// creating <ul class=\"aui-tree-container\">","				var nodeContainer = instance.get(CONTAINER) || A.Node.create(NODE_CONTAINER_TPL);","","				nodeContainer.addClass(CSS_TREE_CONTAINER);","","				// when it's not a leaf it has a <ul> container","				instance.set(CONTAINER, nodeContainer);","","				return nodeContainer;","			},","","			_getSibling: function(value, attrName) {","				var instance = this;","","				var propName = '_' + attrName;","				var sibling = instance[propName];","","				if (sibling !== null && !isTreeNode(sibling)) {","					sibling = null;","","					instance[propName] = sibling;","				}","","				return sibling;","			},","","			/**","			 * Render the <code>boundingBox</code> node.","			 *","			 * @method _renderBoundingBox","			 * @protected","			 * @return {Node}","			 */","			_renderBoundingBox: function() {","				var instance = this;","","				var boundingBox = instance.get(BOUNDING_BOX);","				var contentBox = instance.get(CONTENT_BOX);","","				contentBox.append(instance.get(ICON_EL));","				contentBox.append(instance.get(LABEL_EL));","","				boundingBox.append(contentBox);","","				var nodeContainer = instance.get(CONTAINER);","","				if (nodeContainer) {","					if (!instance.get(EXPANDED)) {","						nodeContainer.addClass(CSS_TREE_HIDDEN);","					}","","					boundingBox.append(nodeContainer);","				}","","				return boundingBox;","			},","","			/**","			 * Render the <code>contentBox</code> node.","			 *","			 * @method _renderContentBox","			 * @protected","			 * @return {Node}","			 */","			_renderContentBox: function(v) {","				var instance = this;","","				var contentBox = instance.get(CONTENT_BOX);","","				if (!instance.isLeaf()) {","					var expanded = instance.get(EXPANDED);","","					// add folder css classes state","					contentBox.addClass(","						expanded ? CSS_TREE_EXPANDED : CSS_TREE_COLLAPSED","					);","","					if (expanded) {","						instance.expand();","					}","				}","","				return contentBox;","			},","","			/**","			 * Sync the hitarea UI.","			 *","			 * @method _syncHitArea","			 * @protected","			 */","			_syncHitArea: function() {","				var instance = this;","","				if (instance.get(ALWAYS_SHOW_HITAREA) || instance.getChildrenLength()) {","					instance.showHitArea();","				}","				else {","					instance.hideHitArea();","","					instance.collapse();","				}","			},","","			/**","			 * Sync the hitarea UI.","			 *","			 * @method _syncIconUI","			 * @param {Array} children","			 * @protected","			 */","			_syncIconUI: function() {","				var instance = this,","					ownerTree = instance.get(OWNER_TREE);","","				if (ownerTree) {","					var type = ownerTree.get('type'),","						cssClasses = instance.get('cssClasses.' + type);","","					if (!cssClasses) {","						return;","					}","","					var expanded = instance.get(EXPANDED),","						iconEl = instance.get(ICON_EL),","						hitAreaEl = instance.get(HIT_AREA_EL),","						icon = instance.isLeaf() ?","								cssClasses.iconLeaf :","								(expanded ? cssClasses.iconExpanded : cssClasses.iconCollapsed),","						iconHitArea = expanded ?","										cssClasses.iconHitAreaExpanded :","										cssClasses.iconHitAreaCollapsed;","","					if (instance.get(LOADING)) {","						icon = cssClasses.iconLoading;","					}","","					iconEl.setAttribute('className', icon || BLANK);","					hitAreaEl.setAttribute('className', iconHitArea || BLANK);","				}","","				instance._syncHitArea();","			},","","			/**","			 * Set the <code>boundingBox</code> id.","			 *","			 * @method _syncTreeNodeBBId","			 * @param {String} id","			 * @protected","			 */","			_syncTreeNodeBBId: function(id) {","				var instance = this;","","				instance.get(BOUNDING_BOX).attr(","					ID,","					instance.get(ID)","				);","			},","","			_uiSetExpanded: function(val) {","				var instance = this;","","				if (!instance.isLeaf()) {","					var container = instance.get(CONTAINER);","					var contentBox = instance.get(CONTENT_BOX);","","					if (val) {","						contentBox.replaceClass(CSS_TREE_COLLAPSED, CSS_TREE_EXPANDED);","","						if (container) {","							container.removeClass(CSS_TREE_HIDDEN);","						}","					}","					else {","						contentBox.replaceClass(CSS_TREE_EXPANDED, CSS_TREE_COLLAPSED);","","						if (container) {","							container.addClass(CSS_TREE_HIDDEN);","						}","					}","				}","			},","","			_uiSetLeaf: function(val) {","				var instance = this;","","				var contentBox = instance.get(CONTENT_BOX);","","				if (val) {","					instance.get(CONTAINER).remove();","					instance.get(HIT_AREA_EL).remove();","				}","				else {","					// append hitarea element","					contentBox.prepend( instance.get(HIT_AREA_EL) );","","					// if has children append them to this model","					instance._createNodeContainer();","","					instance._uiSetExpanded(instance.get(EXPANDED));","				}","","				// add leaf css classes","				contentBox.toggleClass(CSS_TREE_NODE_LEAF, val);","			}","		}","	}",");","","A.TreeNode = TreeNode;","","/*","* TreeNodeIO","*/","var isFunction = Lang.isFunction,","","	CACHE = 'cache',","	IO = 'io',","	LOADED = 'loaded',","	LOADING = 'loading',","	PAGINATOR = 'paginator',","	TREE_NODE_IO = 'tree-node-io',","","	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);","","/**"," * A base class for TreeNodeIO, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>Ajax support to load the children of the current TreeNode</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var treeNodeIO = new A.TreeNodeIO({"," *  	label: 'TreeNodeIO',"," *  	cache: false,"," *  	io: {"," *  		url: 'assets/content.html'"," *  	}"," *  });"," * </code></pre>"," *"," * Check the list of <a href=\"TreeNodeIO.html#configattributes\">Configuration Attributes</a> available for"," * TreeNodeIO."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNodeIO"," * @constructor"," * @extends TreeNode"," */","var TreeNodeIO = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE_IO,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeNode.","		 *","		 * @property TreeNode.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Whether the current TreeNode should cache the loaded content or not.","			 *","			 * @attribute cache","			 * @default true","			 * @type boolean","			 */","			cache: {","				validator: isBoolean,","				value: true","			},","","			leaf: {","				validator: isBoolean,","				value: false","			},","","			/**","			 * Whether the current TreeNode has loaded the content.","			 *","			 * @attribute loaded","			 * @default false","			 * @type boolean","			 */","			loaded: {","				validator: isBoolean,","				value: false","			},","","			/**","			 * Whether the current TreeNode IO transaction is loading.","			 *","			 * @attribute loading","			 * @default false","			 * @type boolean","			 */","			loading: {","				validator: isBoolean,","				value: false","			}","		},","","		AUGMENTS: [A.TreeViewPaginator, A.TreeViewIO],","","		EXTENDS: A.TreeNode,","","		prototype: {","			/**","			 * Bind the events on the TreeNodeIO UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				A.TreeNodeIO.superclass.bindUI.apply(instance, arguments);","","				instance.on('ioRequestSuccess', instance._onIOSuccess, instance);","			},","","			syncUI: function() {","				var instance = this;","","				A.TreeNodeIO.superclass.syncUI.apply(instance, arguments);","			},","","			/*","			* Methods","			*/","			createNodes: function(nodes) {","				var instance = this;","","				A.Array.each(","					A.Array(nodes),","					function(node) {","						instance.appendChild(instance.createNode(node));","					}","				);","","				instance._syncPaginatorUI(nodes);","			},","","			expand: function() {","				var instance = this;","","				var cache = instance.get(CACHE);","				var io = instance.get(IO);","				var loaded = instance.get(LOADED);","				var loading = instance.get(LOADING);","","				if (!cache) {","					// if cache is false on expand, always set LOADED to false","					instance.set(LOADED, false);","				}","","				if (io && !loaded && !loading && !instance.hasChildNodes()) {","					if (!cache) {","						// remove all children to reload","						instance.empty();","					}","","					instance.initIO();","				}","				else {","					A.TreeNodeIO.superclass.expand.apply(instance, arguments);","				}","			},","","			/**","			 * If not specified on the TreeNode some attributes are inherited from the","			 * ownerTree by this method.","			 *","			 * @method _inheritOwnerTreeAttrs","			 * @protected","			 */","			_inheritOwnerTreeAttrs: function() {","				var instance = this;","","				var ownerTree = instance.get(OWNER_TREE);","","				if (ownerTree) {","					if (!instance.get(IO)) {","						var io = A.clone(","							ownerTree.get(IO),","							true,","							function(value, key) {","								if (isFunction(value) && (value.defaultFn || value.wrappedFn)) {","									return false;","								}","","								return true;","							}","						);","","						instance.set(IO, io);","					}","","					if (!instance.get(PAGINATOR)) {","						var ownerTreePaginator = ownerTree.get(PAGINATOR);","","						var paginator = A.clone(ownerTreePaginator);","","						// make sure we are not using the same element passed to the ownerTree on the TreeNode","						if (paginator && paginator.element) {","							paginator.element = ownerTreePaginator.element.clone();","						}","","						instance.set(PAGINATOR, paginator);","					}","				}","			},","","			_onIOSuccess: function(event) {","				var instance = this;","","				instance.expand();","			}","		}","	}",");","","A.TreeNodeIO = TreeNodeIO;","","/*","* TreeNodeCheck","*/","var	CHECKBOX = 'checkbox',","	CHECKED = 'checked',","	CHECK_CONTAINER_EL = 'checkContainerEl',","	CHECK_EL = 'checkEl',","	CHECK_NAME = 'checkName',","	DOT = '.',","	NAME = 'name',","	TREE_NODE_CHECK = 'tree-node-check',","","	CSS_TREE_NODE_CHECKBOX = getCN(TREE, NODE, CHECKBOX),","	CSS_TREE_NODE_CHECKBOX_CONTAINER = getCN(TREE, NODE, CHECKBOX, CONTAINER),","	CSS_TREE_NODE_CHECKED = getCN(TREE, NODE, CHECKED),","","	CHECKBOX_CONTAINER_TPL = '<div class=\"' + CSS_TREE_NODE_CHECKBOX_CONTAINER + '\"></div>',","	CHECKBOX_TPL = '<input class=\"' + CSS_TREE_NODE_CHECKBOX + '\" type=\"checkbox\" />';","","/**"," * <p><img src=\"assets/images/aui-tree-nod-check/main.png\"/></p>"," *"," * A base class for TreeNodeCheck, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>Checkbox support for the TreeNode</li>"," * </ul>"," *"," * Check the list of <a href=\"TreeNodeCheck.html#configattributes\">Configuration Attributes</a> available for"," * TreeNodeCheck."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNodeCheck"," * @constructor"," * @extends TreeNodeIO"," */","var TreeNodeCheck = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE_CHECK,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeNode.","		 *","		 * @property TreeNode.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Whether the TreeNode is checked or not.","			 *","			 * @attribute checked","			 * @default false","			 * @type boolean","			 */","			checked: {","				validator: isBoolean,","				value: false","			},","","			/**","			 * Container element for the checkbox.","			 *","			 * @attribute checkContainerEl","			 * @default Generated DOM element.","			 * @type Node | String","			 */","			checkContainerEl: {","				setter: A.one,","				valueFn: function() {","					return A.Node.create(CHECKBOX_CONTAINER_TPL);","				}","			},","","			/**","			 * Checkbox element.","			 *","			 * @attribute checkEl","			 * @default Generated DOM element.","			 * @type Node | String","			 */","			checkEl: {","				setter: A.one,","				valueFn: function() {","					var instance = this;","","					var checkBoxId = instance.get(ID) + 'Checkbox';","","					var attributes = {","						ID: checkBoxId,","						NAME: instance.get(CHECK_NAME)","					};","","					return A.Node.create(CHECKBOX_TPL).attr(attributes);","				}","			},","","			/**","			 * Name of the checkbox element used on the current TreeNode.","			 *","			 * @attribute checkName","			 * @default 'tree-node-check'","			 * @type String","			 */","			checkName: {","				value: TREE_NODE_CHECK,","				validator: isString","			}","		},","","		EXTENDS: A.TreeNodeIO,","","		prototype: {","","			initializer: function() {","				var instance = this;","","				instance._uiSetChecked(instance.get(CHECKED));","			},","","			/*","			* Lifecycle","			*/","			renderUI: function() {","				var instance = this;","","				A.TreeNodeCheck.superclass.renderUI.apply(instance, arguments);","","				var checkEl = instance.get(CHECK_EL);","				var checkContainerEl = instance.get(CHECK_CONTAINER_EL);","","				checkEl.hide();","","				checkContainerEl.append(checkEl);","","				instance.get(LABEL_EL).placeBefore(checkContainerEl);","","				if (instance.isChecked()) {","					instance.check();","				}","			},","","			bindUI: function() {","				var instance = this;","","				var contentBox = instance.get(CONTENT_BOX);","","				A.TreeNodeCheck.superclass.bindUI.apply(instance, arguments);","","				instance.after('checkedChange', A.bind(instance._afterCheckedChange, instance));","","				contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_NODE_CHECKBOX_CONTAINER);","				contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_LABEL);","","				// cancel dblclick because of the check","				instance.get(LABEL_EL).swallowEvent('dblclick');","			},","","			/**","			 * Check the current TreeNode.","			 *","			 * @method check","			 */","			check: function(originalTarget) {","				var instance = this;","","				instance.set(","					CHECKED,","					true,","					{","						originalTarget: originalTarget","					}","				);","			},","","			/*","			* Whether the current TreeNodeCheck is checked.","			*","			* @method isChecked","			* @return boolean","			*/","			isChecked: function() {","				var instance = this;","","				return instance.get(CHECKED);","			},","","			/**","			 * Toggle the check status of the current TreeNode.","			 *","			 * @method toggleCheck","			 */","			toggleCheck: function() {","				var instance = this;","","				var checkEl = instance.get(CHECK_EL);","","				var checked = checkEl.attr(CHECKED);","","				if (!checked) {","					instance.check();","				}","				else {","					instance.uncheck();","				}","			},","","			/**","			 * Uncheck the current TreeNode.","			 *","			 * @method uncheck","			 */","			uncheck: function(originalTarget) {","				var instance = this;","","				instance.set(","					CHECKED,","					false,","					{","						originalTarget: originalTarget","					}","				);","			},","","			_afterCheckedChange: function(event) {","				var instance = this;","","				instance._uiSetChecked(event.newVal);","			},","","			_uiSetChecked: function(val) {","				var instance = this;","","				var checkEl = instance.get(CHECK_EL);","				var contentBox = instance.get(CONTENT_BOX);","","				if (val) {","					contentBox.addClass(CSS_TREE_NODE_CHECKED);","					checkEl.attr(CHECKED, CHECKED);","				}","				else {","					contentBox.removeClass(CSS_TREE_NODE_CHECKED);","					checkEl.attr(CHECKED, BLANK);","				}","			}","		}","	}",");","","A.TreeNodeCheck = TreeNodeCheck;","","/*","* TreeNodeTask","*/","var	CHILD = 'child',","	TREE_NODE_TASK = 'tree-node-task',","	UNCHECKED = 'unchecked',","","	isTreeNodeTask = function(node) {","		return node instanceof A.TreeNodeCheck;","	},","","	CSS_TREE_NODE_CHILD_UNCHECKED = getCN(TREE, NODE, CHILD, UNCHECKED);","","/**"," * <p><img src=\"assets/images/aui-treeNodeTask/main.png\"/></p>"," *"," * A base class for TreeNodeTask, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>3 states checkbox support</li>"," *	<li>Automatic check/uncheck the parent status based on the children checked status</li>"," * </ul>"," *"," * Check the list of <a href=\"TreeNodeTask.html#configattributes\">Configuration Attributes</a> available for"," * TreeNodeTask."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNodeTask"," * @constructor"," * @extends TreeNodeCheck"," */","var TreeNodeTask = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE_TASK,","","		EXTENDS: A.TreeNodeCheck,","","		prototype: {","			/*","			* Methods","			*/","			check: function(originalTarget) {","				var instance = this;","","				originalTarget = originalTarget || instance;","","				if (!instance.isLeaf()) {","					instance.eachChildren(","						function(child) {","							if (isTreeNodeTask(child)) {","								child.check(originalTarget);","							}","						}","					);","				}","","				instance.eachParent(","					function(parentNode) {","						if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {","							parentNode.get(CONTENT_BOX).addClass(CSS_TREE_NODE_CHILD_UNCHECKED);","						}","					}","				);","","				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);","","				// invoke default check logic","				A.TreeNodeTask.superclass.check.call(instance, originalTarget);","			},","","			uncheck: function(originalTarget) {","				var instance = this;","","				originalTarget = originalTarget || instance;","","				if (!instance.isLeaf()) {","					instance.eachChildren(","						function(child) {","							if (child instanceof A.TreeNodeCheck) {","								child.uncheck(originalTarget);","							}","						}","					);","				}","","				instance.eachParent(","					function(parentNode) {","						if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {","							parentNode.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);","						}","					}","				);","","				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);","","				// invoke default uncheck logic","				A.TreeNodeTask.superclass.uncheck.call(instance, originalTarget);","			}","		}","	}",");","","A.TreeNodeTask = TreeNodeTask;","","/*","* TreeNodeRadio","*/","","var	TREE_NODE_RADIO = 'tree-node-radio',","","	isTreeNodeRadio = function(node) {","		return node instanceof A.TreeNodeRadio;","	},","","	CSS_NODE_RADIO = getCN(TREE, NODE, RADIO),","	CSS_NODE_RADIO_CHECKED = getCN(TREE, NODE, RADIO, CHECKED);","","/**"," * <p><img src=\"assets/images/aui-treeNodeRadio/main.png\"/></p>"," *"," * A base class for TreeNodeRadio, providing:"," * <ul>"," *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *	<li>3 states checkbox support</li>"," *	<li>Automatic check/uncheck the parent status based on the children checked status</li>"," * </ul>"," *"," * Check the list of <a href=\"TreeNodeRadio.html#configattributes\">Configuration Attributes</a> available for"," * TreeNodeRadio."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeNodeRadio"," * @constructor"," * @extends TreeNodeTask"," */","var TreeNodeRadio = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeNode.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_NODE_RADIO,","","		EXTENDS: A.TreeNodeTask,","","		prototype: {","			/*","			* Methods","			*/","			renderUI: function() {","				var instance = this;","","				A.TreeNodeRadio.superclass.renderUI.apply(instance, arguments);","","				instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO);","			},","","			_uncheckNodesRadio: function(node) {","				var instance = this;","","				var children;","","				if (node) {","					children = node.get(CHILDREN);","				}","				else {","					var ownerTree = instance.get(OWNER_TREE);","","					if (ownerTree) {","						children = ownerTree.get(CHILDREN);","					}","					else {","						return;","					}","				}","","				A.Array.each(","					children,","					function(value, index, collection) {","						if (!value.isLeaf()) {","							instance._uncheckNodesRadio(value);","						}","","						if (isTreeNodeRadio(value)) {","							value.uncheck();","						}","					}","				);","			},","","			_uiSetChecked: function(val) {","				var instance = this;","","				if (val) {","					instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO_CHECKED);","					instance.get(CHECK_EL).attr(CHECKED, CHECKED);","				}","				else {","					instance.get(CONTENT_BOX).removeClass(CSS_NODE_RADIO_CHECKED);","					instance.get(CHECK_EL).attr(CHECKED, BLANK);","				}","			},","","			check: function() {","				var instance = this;","","				instance._uncheckNodesRadio();","","				A.TreeNodeRadio.superclass.check.apply(instance, arguments);","			}","		}","	}",");","","A.TreeNodeRadio = TreeNodeRadio;","","/**"," * TreeNode types hash map."," *"," * <pre><code>A.TreeNode.nodeTypes = {"," *  check: A.TreeNodeCheck,"," *  io: A.TreeNodeIO,"," *  node: A.TreeNode,"," *  radio: A.TreeNodeRadio,"," *  task: A.TreeNodeTask"," *};</code></pre>"," *"," * @for TreeNode"," * @property A.TreeNode.nodeTypes"," * @type Object"," */","A.TreeNode.nodeTypes = {","	check: A.TreeNodeCheck,","	io: A.TreeNodeIO,","	node: A.TreeNode,","	radio: A.TreeNodeRadio,","	task: A.TreeNodeTask","};","","}, '@VERSION@' ,{requires:['aui-tree-data','aui-tree-io','aui-tree-paginator','json','querystring-stringify'], skinnable:false});","AUI.add('aui-tree-paginator', function(A) {","var Lang = A.Lang,","	isObject = Lang.isObject,","	isValue = Lang.isValue,","","	getCN = A.getClassName,","","	CHILDREN = 'children',","	CONTAINER = 'container',","	END = 'end',","	IO = 'io',","	LIMIT = 'limit',","	MORE_RESULTS_LABEL = 'Load more results',","	NODE = 'node',","	OWNER_TREE = 'ownerTree',","	PAGINATOR = 'paginator',","	START = 'start',","	TREE = 'tree',","	TREE_NODE_IO = 'tree-node-io',","","	EV_TREE_NODE_PAGINATOR_CLICK = 'paginatorClick',","","	CSS_TREE_NODE_PAGINATOR = getCN(TREE, NODE, PAGINATOR),","","	TPL_PAGINATOR = '<a class=\"' + CSS_TREE_NODE_PAGINATOR + '\" href=\"javascript:void(0);\">{moreResultsLabel}</a>';","","function TreeViewPaginator(config) {","	var instance = this;","","	A.after(instance._bindPaginatorUI, this, 'bindUI');","","	A.after(instance._syncPaginatorUI, this, 'syncUI');","}","","TreeViewPaginator.ATTRS = {","	paginator: {","		setter: function(value) {","			var instance = this;","","			var paginatorNode = A.Node.create(","				Lang.sub(","					TPL_PAGINATOR,","					{","						moreResultsLabel: value.moreResultsLabel || MORE_RESULTS_LABEL","					}","				)","			);","","			return A.merge(","				{","					alwaysVisible: false,","					autoFocus: true,","					element: paginatorNode,","					endParam: END,","					limitParam: LIMIT,","					start: 0,","					startParam: START","				},","				value","			);","		},","		validator: isObject","	}","};","","","TreeViewPaginator.prototype = {","	/**","	 * Bind events to the paginator \"show more\" link.","	 *","	 * @method _bindPaginatorUI","	 * @protected","	 */","	_bindPaginatorUI: function() {","		var instance = this;","","		var paginator = instance.get(PAGINATOR);","","		if (paginator) {","			paginator.element.on('click', A.bind(instance._handlePaginatorClickEvent, instance));","		}","","		instance._createEvents();","	},","","	/**","	 * Create custom events.","	 *","	 * @method _createEvents","	 * @private","	 */","	_createEvents: function() {","		var instance = this;","","		instance.publish(","			EV_TREE_NODE_PAGINATOR_CLICK,","			{","				defaultFn: instance._defPaginatorClickFn,","				prefix: TREE_NODE_IO","			}","		);","	},","","	/**","	 * Default paginatorClick event handler. Increment the","	 * <code>paginator.start</code> to the next <code>paginator.limit</code>.","	 *","	 * @method _defPaginatorClickFn","	 * @param {EventFacade} event The Event object","	 * @protected","	 */","	_defPaginatorClickFn: function(event) {","		var instance = this;","","		var paginator = instance.get(PAGINATOR);","","		if (isValue(paginator.limit)) {","			paginator.start = instance.getChildrenLength();","		}","","		if (instance.get(IO)) {","			instance.initIO();","		}","	},","","	/**","	 * Fires the paginatorClick event.","	 *","	 * @method _handlePaginatorClickEvent","	 * @param {EventFacade} event paginatorClick event facade","	 * @protected","	 */","	_handlePaginatorClickEvent: function(event) {","		var instance = this;","","		var output = instance.getEventOutputMap(instance);","","		instance.fire(EV_TREE_NODE_PAGINATOR_CLICK, output);","","		event.halt();","	},","","	/**","	 * Adds two extra IO data parameter to the request to handle the","	 * paginator. By default these parameters are <code>limit</code> and","	 * <code>start</code>.","	 *","	 * @method _syncPaginatorIOData","	 * @protected","	 */","	_syncPaginatorIOData: function(io) {","		var instance = this;","","		var paginator = instance.get(PAGINATOR);","","		if (paginator && isValue(paginator.limit)) {","			var data = io.cfg.data || {};","","			data[ paginator.limitParam ] = paginator.limit;","			data[ paginator.startParam ] = paginator.start;","			data[ paginator.endParam ] = (paginator.start + paginator.limit);","","			io.cfg.data = data;","		}","	},","","	/**","	 * Sync the paginator link UI.","	 *","	 * @method _syncPaginatorUI","	 * @protected","	 */","	_syncPaginatorUI: function(newNodes) {","		var instance = this;","","		var paginator = instance.get(PAGINATOR);","","		if (paginator) {","			var hasMoreData = true;","","			if (newNodes) {","				hasMoreData = (newNodes.length > 0);","			}","","			var childrenLength = instance.getChildrenLength();","			var start = paginator.start;","			var total = paginator.total || childrenLength;","","			var showPaginator = childrenLength && hasMoreData && (total > childrenLength);","","			if (paginator.alwaysVisible || showPaginator) {","				instance.get(CONTAINER).append(","					paginator.element.show()","				);","","				if (paginator.autoFocus) {","					try {","						paginator.element.focus();","					}","					catch(e) {}","				}","			}","			else {","				paginator.element.hide();","			}","		}","	}","};","","A.TreeViewPaginator = TreeViewPaginator;","","}, '@VERSION@' ,{requires:['aui-base'], skinnable:false});","AUI.add('aui-tree-view', function(A) {","/**"," * The TreeView Utility"," *"," * @module aui-tree"," * @submodule aui-tree-view"," */","","var L = A.Lang,","	isBoolean = L.isBoolean,","	isString = L.isString,","","	UA = A.UA,","","	BOUNDING_BOX = 'boundingBox',","	CHILDREN = 'children',","	CONTAINER = 'container',","	CONTENT = 'content',","	CONTENT_BOX = 'contentBox',","	DOT = '.',","	FILE = 'file',","	HITAREA = 'hitarea',","	ICON = 'icon',","	LABEL = 'label',","	LAST_SELECTED = 'lastSelected',","	LEAF = 'leaf',","	NODE = 'node',","	OWNER_TREE = 'ownerTree',","	ROOT = 'root',","	SELECT_ON_TOGGLE = 'selectOnToggle',","	SPACE = ' ',","	TREE = 'tree',","	TREE_NODE = 'tree-node',","	TREE_VIEW = 'tree-view',","	TYPE = 'type',","	VIEW = 'view',","","	concat = function() {","		return Array.prototype.slice.call(arguments).join(SPACE);","	},","","	isTreeNode = function(v) {","		return ( v instanceof A.TreeNode );","	},","","	getCN = A.getClassName,","","	CSS_TREE_HITAREA = getCN(TREE, HITAREA),","	CSS_TREE_ICON = getCN(TREE, ICON),","	CSS_TREE_LABEL = getCN(TREE, LABEL),","	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),","	CSS_TREE_ROOT_CONTAINER = getCN(TREE, ROOT, CONTAINER),","	CSS_TREE_VIEW_CONTENT = getCN(TREE, VIEW, CONTENT);","","/**"," * <p><img src=\"assets/images/aui-tree-view/main.png\"/></p>"," *"," * A base class for TreeView, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var tree2 = new A.TreeView({"," *  	width: 200,"," *  	type: 'normal',"," *  	boundingBox: '#tree',"," *  	children: ["," *  		{ label: 'Folder 1', children: [ { label: 'file' }, { label: 'file' }, { label: 'file' } ] },"," *  		{ label: 'Folder 2', expanded: true, children: [ { label: 'file' }, { label: 'file' } ] },"," *  		{ label: 'Folder 3', children: [ { label: 'file' } ] },"," *  		{ label: 'Folder 4', expanded: true, children: [ { label: 'Folder 4-1', expanded: true, children: [ { label: 'file' } ] } ] }"," *  	]"," *  })"," *  .render();"," * </code></pre>"," *"," * Check the list of <a href=\"TreeView.html#configattributes\">Configuration Attributes</a> available for"," * TreeView."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeView"," * @constructor"," * @extends TreeData"," */","var TreeView = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeView.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_VIEW,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeView.","		 *","		 * @property TreeView.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Type of the treeview (i.e. could be 'file' or 'normal').","			 *","			 * @attribute type","			 * @default 'file'","			 * @type String","			 */","			type: {","				value: FILE,","				validator: isString","			},","","			/**","			 * Last selected TreeNode.","			 *","			 * @attribute lastSelected","			 * @default null","			 * @type TreeNode","			 */","			lastSelected: {","				value: null,","				validator: isTreeNode","			},","","			lazyLoad: {","				validator: isBoolean,","				value: true","			},","","			selectOnToggle: {","				validator: isBoolean,","				value: false","			}","		},","","		AUGMENTS: [A.TreeData, A.TreeViewPaginator, A.TreeViewIO],","","		prototype: {","			CONTENT_TEMPLATE: '<ul></ul>',","","			initializer: function() {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","				var contentBox = instance.get(CONTENT_BOX);","","				instance.set(CONTAINER, contentBox);","","				boundingBox.setData(TREE_VIEW, instance);","","				instance.initTreeData();","			},","","			/**","			 * Bind the events on the TreeView UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));","","				instance._delegateDOM();","			},","","			createNodes: function(nodes) {","				var instance = this;","","				A.Array.each(A.Array(nodes), function(node) {","					var newNode = instance.createNode(node);","","					instance.appendChild(newNode);","				});","","				instance._syncPaginatorUI(nodes);","			},","","			/**","			 * Create the DOM structure for the TreeView. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				instance._renderElements();","			},","","			/**","			 * Fires after set children.","			 *","			 * @method _afterSetChildren","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterSetChildren: function(event) {","				var instance = this;","","				instance._syncPaginatorUI();","			},","","			/**","			 * Create TreeNode from HTML markup.","			 *","			 * @method _createFromHTMLMarkup","			 * @param {Node} container","			 * @protected","			 */","			_createFromHTMLMarkup: function(container) {","				var instance = this;","","				container.all('> li').each(function(node) {","					// use firstChild as label","					var labelEl = node.one('> *').remove();","					var label = labelEl.outerHTML();","","					var treeNode = new A.TreeNode({","						boundingBox: node,","						label: label","					});","","					var deepContainer = node.one('> ul');","","					if (deepContainer) {","						// if has deepContainer it's not a leaf","						treeNode.set(LEAF, false);","						treeNode.set(CONTAINER, deepContainer);","","						// render node before invoke the recursion","						treeNode.render();","","						// propagating markup recursion","						instance._createFromHTMLMarkup(deepContainer);","					}","					else {","						treeNode.render();","					}","","					// find the parent TreeNode...","					var parentNode = node.get(PARENT_NODE).get(PARENT_NODE);","					var parentInstance = parentNode.getData(TREE_NODE);","","					if (!A.instanceOf(parentInstance, A.TreeNode)) {","						parentInstance = parentNode.getData(TREE_VIEW);","					}","","					// and simulate the appendChild.","					parentInstance.appendChild(treeNode);","				});","			},","","			/**","			 * Render elements.","			 *","			 * @method _renderElements","			 * @protected","			 */","			_renderElements: function() {","				var instance = this;","				var contentBox = instance.get(CONTENT_BOX);","				var children = instance.get(CHILDREN);","				var type = instance.get(TYPE);","				var CSS_TREE_TYPE = getCN(TREE, type);","","				contentBox.addClass(CSS_TREE_VIEW_CONTENT);","","				contentBox.addClass(","					concat(CSS_TREE_TYPE, CSS_TREE_ROOT_CONTAINER)","				);","","				if (!children.length) {","					// if children not specified try to create from markup","					instance._createFromHTMLMarkup(contentBox);","				}","			},","","			/**","			 * Delegate events.","			 *","			 * @method _delegateDOM","			 * @protected","			 */","			_delegateDOM: function() {","				var instance = this;","","				var boundingBox = instance.get(BOUNDING_BOX);","","				// expand/collapse delegations","				boundingBox.delegate('click', A.bind(instance._onClickNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);","				boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_ICON);","				boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_LABEL);","				// other delegations","				boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);","				boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);","			},","","			/**","			 * Fires on click the TreeView (i.e. set the select/unselect state).","			 *","			 * @method _onClickNodeEl","			 * @param {EventFacade} event","			 * @protected","			 */","			_onClickNodeEl: function(event) {","				var instance = this;","","				var treeNode = instance.getNodeByChild( event.currentTarget );","","				if (treeNode) {","					if (event.target.test(DOT+CSS_TREE_HITAREA)) {","						treeNode.toggle();","","						if (!instance.get(SELECT_ON_TOGGLE)) {","							return;","						}","					}","","					if (!treeNode.isSelected()) {","						var lastSelected = instance.get(LAST_SELECTED);","","						// select drag node","						if (lastSelected) {","							lastSelected.unselect();","						}","","						treeNode.select();","					}","				}","			},","","			/**","			 * Fires on <code>mouseeneter</code> the TreeNode.","			 *","			 * @method _onMouseEnterNodeEl","			 * @param {EventFacade} event","			 * @protected","			 */","			_onMouseEnterNodeEl: function(event) {","				var instance = this;","				var treeNode = instance.getNodeByChild( event.currentTarget );","","				if (treeNode) {","					treeNode.over();","				}","			},","","			/**","			 * Fires on <code>mouseleave</code> the TreeNode.","			 *","			 * @method _onMouseLeaveNodeEl","			 * @param {EventFacade} event","			 * @protected","			 */","			_onMouseLeaveNodeEl: function(event) {","				var instance = this;","				var treeNode = instance.getNodeByChild( event.currentTarget );","","				if (treeNode) {","					treeNode.out();","				}","			},","","			/**","			 * Fires on <code>click</code> the TreeNode hitarea.","			 *","			 * @method _onClickHitArea","			 * @param {EventFacade} event","			 * @protected","			 */","			_onClickHitArea: function(event) {","				var instance = this;","				var treeNode = instance.getNodeByChild( event.currentTarget );","","				if (treeNode) {","					treeNode.toggle();","				}","			}","		}","	}",");","","A.TreeView = TreeView;","","/*","* TreeViewDD - Drag & Drop","*/","var isNumber = L.isNumber,","","	ABOVE = 'above',","	APPEND = 'append',","	BELOW = 'below',","	BLOCK = 'block',","	BODY = 'body',","	CLEARFIX = 'clearfix',","	DEFAULT = 'default',","	DISPLAY = 'display',","	DOWN = 'down',","	DRAG = 'drag',","	DRAGGABLE = 'draggable',","	DRAG_CURSOR = 'dragCursor',","	DRAG_NODE = 'dragNode',","	EXPANDED = 'expanded',","	HELPER = 'helper',","	INSERT = 'insert',","	OFFSET_HEIGHT = 'offsetHeight',","	PARENT_NODE = 'parentNode',","	SCROLL_DELAY = 'scrollDelay',","	STATE = 'state',","	TREE_DRAG_DROP = 'tree-drag-drop',","	UP = 'up',","","	DDM = A.DD.DDM,","","	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),","	CSS_ICON = getCN(ICON),","	CSS_TREE_DRAG_HELPER = getCN(TREE, DRAG, HELPER),","	CSS_TREE_DRAG_HELPER_CONTENT = getCN(TREE, DRAG, HELPER, CONTENT),","	CSS_TREE_DRAG_HELPER_LABEL = getCN(TREE, DRAG, HELPER, LABEL),","	CSS_TREE_DRAG_INSERT_ABOVE = getCN(TREE, DRAG, INSERT, ABOVE),","	CSS_TREE_DRAG_INSERT_APPEND = getCN(TREE, DRAG, INSERT, APPEND),","	CSS_TREE_DRAG_INSERT_BELOW = getCN(TREE, DRAG, INSERT, BELOW),","	CSS_TREE_DRAG_STATE_APPEND = getCN(TREE, DRAG, STATE, APPEND),","	CSS_TREE_DRAG_STATE_INSERT_ABOVE = getCN(TREE, DRAG, STATE, INSERT, ABOVE),","	CSS_TREE_DRAG_STATE_INSERT_BELOW = getCN(TREE, DRAG, STATE, INSERT, BELOW),","","	HELPER_TPL = '<div class=\"'+CSS_TREE_DRAG_HELPER+'\">'+","					'<div class=\"'+[CSS_TREE_DRAG_HELPER_CONTENT, CSS_HELPER_CLEARFIX].join(SPACE)+'\">'+","						'<span class=\"'+CSS_ICON+'\"></span>'+","						'<span class=\"'+CSS_TREE_DRAG_HELPER_LABEL+'\"></span>'+","					'</div>'+","				'</div>';","","/**"," * A base class for TreeViewDD, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>DragDrop support for the TreeNodes</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * Check the list of <a href=\"TreeViewDD.html#configattributes\">Configuration Attributes</a> available for"," * TreeViewDD."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeViewDD"," * @constructor"," * @extends TreeView"," */","var TreeViewDD = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeViewDD.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_DRAG_DROP,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeViewDD.","		 *","		 * @property TreeViewDD.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Dragdrop helper element.","			 *","			 * @attribute helper","			 * @default null","			 * @type Node | String","			 */","			helper: {","				value: null","			},","","			/**","			 * Delay of the scroll while dragging the TreeNodes.","			 *","			 * @attribute scrollDelay","			 * @default 100","			 * @type Number","			 */","			scrollDelay: {","				value: 100,","				validator: isNumber","			}","		},","","		EXTENDS: A.TreeView,","","		prototype: {","			/**","			 * Direction of the drag (i.e. could be 'up' or 'down').","			 *","			 * @property direction","			 * @type String","			 * @protected","			 */","			direction: BELOW,","","			/**","			 * Drop action (i.e. could be 'append', 'below' or 'above').","			 *","			 * @attribute dropAction","			 * @default null","			 * @type String","			 */","			dropAction: null,","","			/**","			 * Last Y.","			 *","			 * @attribute lastY","			 * @default 0","			 * @type Number","			 */","			lastY: 0,","","			node: null,","","			/**","			 * Reference for the current drop node.","			 *","			 * @attribute nodeContent","			 * @default null","			 * @type Node","			 */","			nodeContent: null,","","			/**","			 * Descructor lifecycle implementation for the TreeViewDD class.","			 * Purges events attached to the node (and all child nodes).","			 *","			 * @method destructor","			 * @protected","			 */","			destructor: function() {","				var instance = this;","				var helper = instance.get(HELPER);","","				if (helper) {","					helper.remove(true);","				}","","				if (instance.ddDelegate) {","					instance.ddDelegate.destroy();","				}","			},","","			/**","			 * Bind the events on the TreeViewDD UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				A.TreeViewDD.superclass.bindUI.apply(this, arguments);","","				instance._bindDragDrop();","			},","","			/**","			 * Create the DOM structure for the TreeViewDD. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				A.TreeViewDD.superclass.renderUI.apply(this, arguments);","","				// creating drag helper and hiding it","				var helper = A.Node.create(HELPER_TPL).hide();","","				// append helper to the body","				A.one(BODY).append(helper);","","				instance.set(HELPER, helper);","","				// set DRAG_CURSOR to the default arrow","				DDM.set(DRAG_CURSOR, DEFAULT);","			},","","			/**","			 * Setup DragDrop on the TreeNodes.","			 *","			 * @method _createDrag","			 * @param {Node} node","			 * @protected","			 */","			_createDrag: function(node) {","				var instance = this;","","				if (!instance.dragTimers) {","					instance.dragTimers = [];","				}","","				if (!DDM.getDrag(node)) {","					var dragTimers = instance.dragTimers;","					// dragDelay is a incremental delay for create the drag instances","					var dragDelay = 50 * dragTimers.length;","","					// wrapping the _createDrag on a setTimeout for performance reasons","					var timer = setTimeout(","						function() {","							if (!DDM.getDrag(node)) {","								// creating delayed drag instance","								var drag = new A.DD.Drag({","									bubbleTargets: instance,","									node: node,","									target: true","								})","								.plug(A.Plugin.DDProxy, {","									moveOnEnd: false,","									positionProxy: false,","									borderStyle: null","								})","								.plug(A.Plugin.DDNodeScroll, {","									scrollDelay: instance.get(SCROLL_DELAY),","									node: instance.get(BOUNDING_BOX)","								});","","								drag.removeInvalid('a');","							}","","							A.Array.removeItem(dragTimers, timer);","						},","						dragDelay","					);","","					dragTimers.push(timer);","				}","			},","","			/**","			 * Bind DragDrop events.","			 *","			 * @method _bindDragDrop","			 * @protected","			 */","			_bindDragDrop: function() {","				var instance = this;","","				var	boundingBox = instance.get(BOUNDING_BOX);","","				var	dragInitHandle = null;","","				instance._createDragInitHandler = function() {","					instance.ddDelegate = new A.DD.Delegate(","						{","							bubbleTargets: instance,","							container: boundingBox,","							nodes: DOT+CSS_TREE_NODE_CONTENT,","							target: true","						}","					);","","					var dd = instance.ddDelegate.dd;","","					dd.plug(A.Plugin.DDProxy, {","						moveOnEnd: false,","						positionProxy: false,","						borderStyle: null","					})","					.plug(A.Plugin.DDNodeScroll, {","						scrollDelay: instance.get(SCROLL_DELAY),","						node: boundingBox","					});","","					dd.removeInvalid('a');","","					if (dragInitHandle) {","						dragInitHandle.detach();","					}","","				};","","				// Check for mobile devices and execute _createDragInitHandler before events","				if (!UA.touch) {","					// only create the drag on the init elements if the user mouseover the boundingBox for init performance reasons","					dragInitHandle = boundingBox.on(['focus', 'mousedown', 'mousemove'], instance._createDragInitHandler);","				}","				else {","					instance._createDragInitHandler();","				}","","				// drag & drop listeners","				instance.on('drag:align', instance._onDragAlign);","				instance.on('drag:start', instance._onDragStart);","				instance.on('drop:exit', instance._onDropExit);","				instance.after('drop:hit', instance._afterDropHit);","				instance.on('drop:hit', instance._onDropHit);","				instance.on('drop:over', instance._onDropOver);","			},","","			/**","			 * Set the append CSS state on the passed <code>nodeContent</code>.","			 *","			 * @method _appendState","			 * @param {Node} nodeContent","			 * @protected","			 */","			_appendState: function(nodeContent) {","				var instance = this;","","				instance.dropAction = APPEND;","","				instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_APPEND);","","				nodeContent.addClass(CSS_TREE_DRAG_INSERT_APPEND);","			},","","			/**","			 * Set the going down CSS state on the passed <code>nodeContent</code>.","			 *","			 * @method _goingDownState","			 * @param {Node} nodeContent","			 * @protected","			 */","			_goingDownState: function(nodeContent) {","				var instance = this;","","				instance.dropAction = BELOW;","","				instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);","","				nodeContent.addClass(CSS_TREE_DRAG_INSERT_BELOW);","			},","","			/**","			 * Set the going up CSS state on the passed <code>nodeContent</code>.","			 *","			 * @method _goingUpState","			 * @param {Node} nodeContent","			 * @protected","			 */","			_goingUpState: function(nodeContent) {","				var instance = this;","","				instance.dropAction = ABOVE;","","				instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);","","				nodeContent.addClass(CSS_TREE_DRAG_INSERT_ABOVE);","			},","","			/**","			 * Set the reset CSS state on the passed <code>nodeContent</code>.","			 *","			 * @method _resetState","			 * @param {Node} nodeContent","			 * @protected","			 */","			_resetState: function(nodeContent) {","				var instance = this;","				var helper = instance.get(HELPER);","","				helper.removeClass(CSS_TREE_DRAG_STATE_APPEND);","				helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);","				helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);","","				if (nodeContent) {","					nodeContent.removeClass(CSS_TREE_DRAG_INSERT_ABOVE);","					nodeContent.removeClass(CSS_TREE_DRAG_INSERT_APPEND);","					nodeContent.removeClass(CSS_TREE_DRAG_INSERT_BELOW);","				}","			},","","			/**","			 * Update the CSS node state (i.e. going down, going up, append etc).","			 *","			 * @method _updateNodeState","			 * @param {EventFacade} event","			 * @protected","			 */","			_updateNodeState: function(event) {","				var instance = this;","				var drag = event.drag;","				var drop = event.drop;","				var nodeContent = drop.get(NODE);","				var dropNode = nodeContent.get(PARENT_NODE);","				var dragNode = drag.get(NODE).get(PARENT_NODE);","				var dropTreeNode = dropNode.getData(TREE_NODE);","","				// reset the classNames from the last nodeContent","				instance._resetState(instance.nodeContent);","","				// cannot drop the dragged element into any of its children","				// using DOM contains method for performance reason","				if ( !dragNode.contains(dropNode) ) {","					// nArea splits the height in 3 areas top/center/bottom","					// these areas are responsible for defining the state when the mouse is over any of them","					var nArea = nodeContent.get(OFFSET_HEIGHT) / 3;","					var yTop = nodeContent.getY();","					var yCenter = yTop + nArea;","					var yBottom = yTop + nArea*2;","					var mouseY = drag.mouseXY[1];","","					// UP: mouse on the top area of the node","					if ((mouseY > yTop) && (mouseY < yCenter)) {","						instance._goingUpState(nodeContent);","					}","					// DOWN: mouse on the bottom area of the node","					else if (mouseY > yBottom) {","						instance._goingDownState(nodeContent);","					}","					// APPEND: mouse on the center area of the node","					else if ((mouseY > yCenter) && (mouseY < yBottom)) {","						// if it's a folder set the state to append","						if (dropTreeNode && !dropTreeNode.isLeaf()) {","							instance._appendState(nodeContent);","						}","						// if it's a leaf we need to set the ABOVE or BELOW state instead of append","						else {","							if (instance.direction === UP) {","								instance._goingUpState(nodeContent);","							}","							else {","								instance._goingDownState(nodeContent);","							}","						}","					}","				}","","				instance.nodeContent = nodeContent;","			},","","			/**","			 * Fires after the append event.","			 *","			 * @method _handleEvent","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_afterAppend: function(event) {","				var instance = this;","				var treeNode = event.tree.node;","","				if (treeNode.get(DRAGGABLE)) {","					instance._createDrag( treeNode.get(CONTENT_BOX) );","				}","			},","","			/**","			 * Fires after the drop hit event.","			 *","			 * @method _afterDropHit","			 * @param {EventFacade} event drop hit event facade","			 * @protected","			 */","			_afterDropHit: function(event) {","				var instance = this;","				var dropAction = instance.dropAction;","				var dragNode = event.drag.get(NODE).get(PARENT_NODE);","				var dropNode = event.drop.get(NODE).get(PARENT_NODE);","","				var dropTreeNode = dropNode.getData(TREE_NODE);","				var dragTreeNode = dragNode.getData(TREE_NODE);","","				var output = instance.getEventOutputMap(instance);","","				output.tree.dropNode = dropTreeNode;","				output.tree.dragNode = dragTreeNode;","","				if (dropAction === ABOVE) {","					dropTreeNode.insertBefore(dragTreeNode);","","					instance.bubbleEvent('dropInsert', output);","				}","				else if (dropAction === BELOW) {","					dropTreeNode.insertAfter(dragTreeNode);","","					instance.bubbleEvent('dropInsert', output);","				}","				else if (dropAction === APPEND) {","					if (dropTreeNode && !dropTreeNode.isLeaf()) {","						dropTreeNode.appendChild(dragTreeNode);","","						if (!dropTreeNode.get(EXPANDED)) {","							// expand node when drop a child on it","							dropTreeNode.expand();","						}","","						instance.bubbleEvent('dropAppend', output);","					}","				}","","				instance._resetState(instance.nodeContent);","","				// bubbling drop event","				instance.bubbleEvent('drop', output);","","				instance.dropAction = null;","			},","","			/**","			 * Fires on drag align event.","			 *","			 * @method _onDragAlign","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDragAlign: function(event) {","				var instance = this;","				var lastY = instance.lastY;","				var y = event.target.lastXY[1];","","				// if the y change","				if (y !== lastY) {","					// set the drag direction","					instance.direction = (y < lastY) ? UP : DOWN;","				}","","				instance.lastY = y;","			},","","			/**","			 * Fires on drag start event.","			 *","			 * @method _onDragStart","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDragStart: function(event) {","				var instance = this;","				var drag = event.target;","				var dragNode = drag.get(NODE).get(PARENT_NODE);","				var dragTreeNode = dragNode.getData(TREE_NODE);","				var lastSelected = instance.get(LAST_SELECTED);","","				// select drag node","				if (lastSelected) {","					lastSelected.unselect();","				}","","				dragTreeNode.select();","","				// initialize drag helper","				var helper = instance.get(HELPER);","				var helperLabel = helper.one(DOT+CSS_TREE_DRAG_HELPER_LABEL);","","				// show helper, we need display block here, yui dd hide it with display none","				helper.setStyle(DISPLAY, BLOCK).show();","","				// set the CSS_TREE_DRAG_HELPER_LABEL html with the label of the dragged node","				helperLabel.html( dragTreeNode.get(LABEL) );","","				// update the DRAG_NODE with the new helper","				drag.set(DRAG_NODE, helper);","			},","","			/**","			 * Fires on drop over event.","			 *","			 * @method _onDropOver","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDropOver: function(event) {","				var instance = this;","","				instance._updateNodeState(event);","			},","","			/**","			 * Fires on drop hit event.","			 *","			 * @method _onDropHit","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDropHit: function(event) {","				var dropNode = event.drop.get(NODE).get(PARENT_NODE);","				var dropTreeNode = dropNode.getData(TREE_NODE);","","				if (!isTreeNode(dropTreeNode)) {","					event.preventDefault();","				}","			},","","			/**","			 * Fires on drop exit event.","			 *","			 * @method _onDropExit","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDropExit: function() {","				var instance = this;","","				instance.dropAction = null;","","				instance._resetState(instance.nodeContent);","			}","		}","	}",");","","A.TreeViewDD = TreeViewDD;","","}, '@VERSION@' ,{requires:['aui-tree-node','aui-tree-paginator','dd-drag','dd-drop','dd-proxy'], skinnable:true});","AUI.add('aui-tree-io', function(A) {","var Lang = A.Lang,","	isFunction = Lang.isFunction,","	isString = Lang.isString,","","	EVENT_IO_REQUEST_SUCCESS = 'ioRequestSuccess',","","	CONTENT_BOX = 'contentBox',","	IO = 'io',","	OWNER_TREE = 'ownerTree',","	LOADED = 'loaded',","	LOADING = 'loading',","	NODE = 'node',","	TREE = 'tree',","","	getCN = A.getClassName,","","	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);","","function TreeViewIO(config) {","	var instance = this;","","	instance.publish(","		EVENT_IO_REQUEST_SUCCESS,","		{","			defaultFn: instance._onIOSuccessDefault","		}","	);","}","","","TreeViewIO.ATTRS = {","	/**","	 * IO options for the current TreeNode load the children.","	 *","	 * @attribute io","	 * @default Default IO Configuration.","	 * @type Object","	 */","	io: {","		lazyAdd: false,","		value: null,","		setter: function(v) {","			return this._setIO(v);","		}","	}","};","","TreeViewIO.prototype = {","	initializer: function() {","		var instance = this;","","		instance.publish(","","		);","	},","","	/**","	 * Initialize the IO transaction setup on the <a","	 * href=\"TreeNode.html#config_io\">io</a> attribute.","	 *","	 * @method initIO","	 */","	initIO: function() {","		var instance = this;","","		var io = instance.get(IO);","","		if (isFunction(io.cfg.data)) {","			io.cfg.data = io.cfg.data.call(instance, instance);","		}","","		instance._syncPaginatorIOData(io);","","		if (isFunction(io.loader)) {","			var loader = A.bind(io.loader, instance);","","			// apply loader in the TreeNodeIO scope","			loader(io.url, io.cfg, instance);","		}","		else {","			A.io.request(io.url, io.cfg);","		}","	},","","	/**","	 * IO Start handler.","	 *","	 * @method ioStartHandler","	 */","	ioStartHandler: function() {","		var instance = this;","","		var contentBox = instance.get(CONTENT_BOX);","","		instance.set(LOADING, true);","","		contentBox.addClass(CSS_TREE_NODE_IO_LOADING);","	},","","	/**","	 * IO Complete handler.","	 *","	 * @method ioCompleteHandler","	 */","	ioCompleteHandler: function() {","		var instance = this;","","		var contentBox = instance.get(CONTENT_BOX);","","		instance.set(LOADING, false);","		instance.set(LOADED, true);","","		contentBox.removeClass(CSS_TREE_NODE_IO_LOADING);","	},","","	/**","	 * IO Success handler.","	 *","	 * @method ioSuccessHandler","	 */","	ioSuccessHandler: function() {","		var instance = this;","","		var io = instance.get(IO);","","		var args = Array.prototype.slice.call(arguments);","		var length = args.length;","","		// if using the first argument as the JSON object","		var nodes = args[1];","","		// if using (event, id, o) yui callback syntax","		if (length >= 3) {","			var o = args[2];","			// try to convert responseText to JSON","			try {","				nodes = A.JSON.parse(o.responseText);","			}","			catch(e) {}","		}","","		var formatter = io.formatter;","","		if (formatter) {","			nodes = formatter(nodes);","		}","","		instance.createNodes(nodes);","","		instance.fire(EVENT_IO_REQUEST_SUCCESS, nodes);","	},","","	/**","	 * IO Failure handler.","	 *","	 * @method ioFailureHandler","	 */","	ioFailureHandler: function() {","		var instance = this;","","		instance.fire('ioRequestFailure');","","		instance.set(LOADING, false);","		instance.set(LOADED, false);","	},","","	_onIOSuccessDefault: function(event) {","		var instance = this;","","		var ownerTree = instance.get(OWNER_TREE);","","		if (ownerTree && ownerTree.ddDelegate) {","			ownerTree.ddDelegate.syncTargets();","		}","	},","","	/**","	 * Setter for <a href=\"TreeNodeIO.html#config_io\">io</a>.","	 *","	 * @method _setIO","	 * @protected","	 * @param {Object} v","	 * @return {Object}","	 */","	_setIO: function(v) {","		var instance = this;","","		if (!v) {","			return null;","		}","		else if (isString(v)) {","			v = { url: v };","		}","","		v = v || {};","		v.cfg = v.cfg || {};","		v.cfg.on = v.cfg.on || {};","","		var defCallbacks = {","			start: A.bind(instance.ioStartHandler, instance),","			complete: A.bind(instance.ioCompleteHandler, instance),","			success: A.bind(instance.ioSuccessHandler, instance),","			failure: A.bind(instance.ioFailureHandler, instance)","		};","","		A.each(defCallbacks, function(fn, name) {","			var userFn = v.cfg.on[name];","","			fn.defaultFn = true;","","			if (isFunction(userFn)) {","				// wrapping user callback and default callback, invoking both handlers","				var wrappedFn = A.bind(","					function() {","						fn.apply(instance, arguments);","						userFn.apply(instance, arguments);","					},","					instance","				);","","				wrappedFn.wrappedFn = true;","","				v.cfg.on[name] = wrappedFn;","			}","			else {","				// get from defCallbacks map","				v.cfg.on[name] = fn;","			}","","		});","","		return v;","	}","};","","A.TreeViewIO = TreeViewIO;","","}, '@VERSION@' ,{requires:['aui-io','json'], skinnable:false});","","","AUI.add('aui-tree', function(A){}, '@VERSION@' ,{use:['aui-tree-data', 'aui-tree-node', 'aui-tree-io', 'aui-tree-paginator', 'aui-tree-view'], skinnable:true});",""];
_yuitest_coverage["/build/aui-tree/aui-tree.js"].lines = {"1":0,"9":0,"34":0,"38":0,"64":0,"66":0,"103":0,"113":0,"116":0,"117":0,"118":0,"129":0,"131":0,"132":0,"144":0,"146":0,"157":0,"159":0,"171":0,"172":0,"173":0,"174":0,"176":0,"177":0,"179":0,"181":0,"183":0,"186":0,"189":0,"190":0,"194":0,"197":0,"199":0,"201":0,"204":0,"206":0,"209":0,"211":0,"212":0,"217":0,"218":0,"220":0,"221":0,"222":0,"225":0,"226":0,"228":0,"238":0,"241":0,"244":0,"245":0,"256":0,"257":0,"258":0,"260":0,"261":0,"264":0,"265":0,"268":0,"271":0,"273":0,"283":0,"285":0,"286":0,"297":0,"298":0,"300":0,"302":0,"303":0,"306":0,"315":0,"317":0,"318":0,"328":0,"330":0,"331":0,"341":0,"343":0,"344":0,"354":0,"356":0,"357":0,"369":0,"370":0,"372":0,"373":0,"374":0,"386":0,"387":0,"389":0,"390":0,"391":0,"393":0,"407":0,"410":0,"412":0,"413":0,"418":0,"420":0,"421":0,"424":0,"426":0,"427":0,"428":0,"441":0,"442":0,"444":0,"457":0,"458":0,"460":0,"473":0,"474":0,"477":0,"478":0,"479":0,"480":0,"483":0,"486":0,"487":0,"490":0,"491":0,"493":0,"494":0,"497":0,"508":0,"510":0,"522":0,"524":0,"534":0,"536":0,"547":0,"548":0,"549":0,"551":0,"553":0,"554":0,"555":0,"559":0,"563":0,"565":0,"576":0,"578":0,"593":0,"594":0,"596":0,"607":0,"608":0,"611":0,"612":0,"613":0,"615":0,"617":0,"620":0,"623":0,"625":0,"627":0,"631":0,"633":0,"635":0,"636":0,"646":0,"648":0,"649":0,"651":0,"652":0,"666":0,"667":0,"669":0,"670":0,"673":0,"675":0,"676":0,"677":0,"678":0,"680":0,"681":0,"683":0,"684":0,"687":0,"690":0,"692":0,"693":0,"697":0,"699":0,"701":0,"703":0,"706":0,"709":0,"713":0,"716":0,"718":0,"720":0,"731":0,"733":0,"744":0,"746":0,"757":0,"758":0,"760":0,"761":0,"764":0,"778":0,"779":0,"780":0,"782":0,"783":0,"786":0,"791":0,"793":0,"794":0,"797":0,"798":0,"800":0,"801":0,"804":0,"806":0,"807":0,"810":0,"811":0,"812":0,"815":0,"816":0,"818":0,"819":0,"821":0,"822":0,"826":0,"828":0,"829":0,"831":0,"832":0,"837":0,"838":0,"841":0,"842":0,"845":0,"846":0,"851":0,"855":0,"858":0,"866":0,"903":0,"907":0,"911":0,"963":0,"997":0,"1003":0,"1041":0,"1054":0,"1068":0,"1094":0,"1096":0,"1098":0,"1112":0,"1115":0,"1116":0,"1119":0,"1158":0,"1215":0,"1217":0,"1220":0,"1222":0,"1224":0,"1226":0,"1236":0,"1238":0,"1239":0,"1240":0,"1244":0,"1246":0,"1247":0,"1248":0,"1249":0,"1251":0,"1254":0,"1255":0,"1256":0,"1258":0,"1260":0,"1261":0,"1263":0,"1264":0,"1277":0,"1279":0,"1280":0,"1290":0,"1292":0,"1299":0,"1301":0,"1302":0,"1312":0,"1314":0,"1318":0,"1320":0,"1323":0,"1334":0,"1336":0,"1345":0,"1347":0,"1351":0,"1353":0,"1356":0,"1366":0,"1368":0,"1370":0,"1372":0,"1373":0,"1375":0,"1378":0,"1382":0,"1384":0,"1393":0,"1395":0,"1405":0,"1407":0,"1409":0,"1410":0,"1411":0,"1413":0,"1416":0,"1426":0,"1428":0,"1438":0,"1440":0,"1449":0,"1451":0,"1460":0,"1462":0,"1471":0,"1473":0,"1475":0,"1476":0,"1479":0,"1481":0,"1490":0,"1492":0,"1496":0,"1498":0,"1502":0,"1504":0,"1508":0,"1510":0,"1511":0,"1521":0,"1523":0,"1524":0,"1527":0,"1537":0,"1539":0,"1541":0,"1552":0,"1554":0,"1555":0,"1566":0,"1568":0,"1569":0,"1580":0,"1582":0,"1583":0,"1594":0,"1596":0,"1607":0,"1609":0,"1620":0,"1623":0,"1625":0,"1628":0,"1630":0,"1634":0,"1636":0,"1637":0,"1639":0,"1640":0,"1642":0,"1645":0,"1656":0,"1658":0,"1659":0,"1661":0,"1662":0,"1664":0,"1666":0,"1668":0,"1669":0,"1670":0,"1673":0,"1676":0,"1687":0,"1689":0,"1691":0,"1692":0,"1695":0,"1699":0,"1700":0,"1704":0,"1714":0,"1716":0,"1717":0,"1720":0,"1722":0,"1734":0,"1737":0,"1738":0,"1741":0,"1742":0,"1745":0,"1755":0,"1756":0,"1759":0,"1760":0,"1763":0,"1774":0,"1776":0,"1783":0,"1785":0,"1786":0,"1787":0,"1789":0,"1790":0,"1792":0,"1793":0,"1797":0,"1799":0,"1800":0,"1807":0,"1809":0,"1811":0,"1812":0,"1813":0,"1817":0,"1820":0,"1822":0,"1826":0,"1832":0,"1837":0,"1875":0,"1949":0,"1951":0,"1953":0,"1957":0,"1959":0,"1966":0,"1968":0,"1971":0,"1975":0,"1979":0,"1981":0,"1982":0,"1983":0,"1984":0,"1986":0,"1988":0,"1991":0,"1992":0,"1994":0,"1997":0,"2000":0,"2012":0,"2014":0,"2016":0,"2017":0,"2018":0,"2022":0,"2023":0,"2026":0,"2030":0,"2033":0,"2034":0,"2036":0,"2039":0,"2040":0,"2043":0,"2049":0,"2051":0,"2057":0,"2062":0,"2096":0,"2138":0,"2152":0,"2154":0,"2156":0,"2161":0,"2183":0,"2185":0,"2192":0,"2194":0,"2196":0,"2197":0,"2199":0,"2201":0,"2203":0,"2205":0,"2206":0,"2211":0,"2213":0,"2215":0,"2217":0,"2219":0,"2220":0,"2223":0,"2232":0,"2234":0,"2250":0,"2252":0,"2261":0,"2263":0,"2265":0,"2267":0,"2268":0,"2271":0,"2281":0,"2283":0,"2293":0,"2295":0,"2299":0,"2301":0,"2302":0,"2304":0,"2305":0,"2306":0,"2309":0,"2310":0,"2317":0,"2322":0,"2327":0,"2351":0,"2369":0,"2371":0,"2373":0,"2374":0,"2376":0,"2377":0,"2383":0,"2385":0,"2386":0,"2391":0,"2394":0,"2398":0,"2400":0,"2402":0,"2403":0,"2405":0,"2406":0,"2412":0,"2414":0,"2415":0,"2420":0,"2423":0,"2429":0,"2435":0,"2438":0,"2463":0,"2481":0,"2483":0,"2485":0,"2489":0,"2491":0,"2493":0,"2494":0,"2497":0,"2499":0,"2500":0,"2503":0,"2507":0,"2510":0,"2511":0,"2514":0,"2515":0,"2522":0,"2524":0,"2525":0,"2526":0,"2529":0,"2530":0,"2535":0,"2537":0,"2539":0,"2545":0,"2562":0,"2571":0,"2572":0,"2597":0,"2598":0,"2600":0,"2602":0,"2605":0,"2608":0,"2610":0,"2619":0,"2637":0,"2645":0,"2647":0,"2649":0,"2650":0,"2653":0,"2663":0,"2665":0,"2683":0,"2685":0,"2687":0,"2688":0,"2691":0,"2692":0,"2704":0,"2706":0,"2708":0,"2710":0,"2722":0,"2724":0,"2726":0,"2727":0,"2729":0,"2730":0,"2731":0,"2733":0,"2744":0,"2746":0,"2748":0,"2749":0,"2751":0,"2752":0,"2755":0,"2756":0,"2757":0,"2759":0,"2761":0,"2762":0,"2766":0,"2767":0,"2768":0,"2774":0,"2780":0,"2783":0,"2791":0,"2821":0,"2825":0,"2870":0,"2931":0,"2932":0,"2933":0,"2935":0,"2937":0,"2939":0,"2949":0,"2951":0,"2953":0,"2957":0,"2959":0,"2960":0,"2962":0,"2965":0,"2975":0,"2977":0,"2988":0,"2990":0,"3001":0,"3003":0,"3005":0,"3006":0,"3008":0,"3013":0,"3015":0,"3017":0,"3018":0,"3021":0,"3024":0,"3027":0,"3031":0,"3032":0,"3034":0,"3035":0,"3039":0,"3050":0,"3051":0,"3052":0,"3053":0,"3054":0,"3056":0,"3058":0,"3062":0,"3064":0,"3075":0,"3077":0,"3080":0,"3081":0,"3082":0,"3084":0,"3085":0,"3096":0,"3098":0,"3100":0,"3101":0,"3102":0,"3104":0,"3105":0,"3109":0,"3110":0,"3113":0,"3114":0,"3117":0,"3130":0,"3131":0,"3133":0,"3134":0,"3146":0,"3147":0,"3149":0,"3150":0,"3162":0,"3163":0,"3165":0,"3166":0,"3173":0,"3178":0,"3242":0,"3335":0,"3336":0,"3338":0,"3339":0,"3342":0,"3343":0,"3354":0,"3356":0,"3358":0,"3368":0,"3370":0,"3373":0,"3376":0,"3378":0,"3381":0,"3392":0,"3394":0,"3395":0,"3398":0,"3399":0,"3401":0,"3404":0,"3406":0,"3408":0,"3423":0,"3426":0,"3431":0,"3442":0,"3444":0,"3446":0,"3448":0,"3449":0,"3458":0,"3460":0,"3470":0,"3472":0,"3473":0,"3479":0,"3481":0,"3484":0,"3488":0,"3489":0,"3490":0,"3491":0,"3492":0,"3493":0,"3504":0,"3506":0,"3508":0,"3510":0,"3521":0,"3523":0,"3525":0,"3527":0,"3538":0,"3540":0,"3542":0,"3544":0,"3555":0,"3556":0,"3558":0,"3559":0,"3560":0,"3562":0,"3563":0,"3564":0,"3565":0,"3577":0,"3578":0,"3579":0,"3580":0,"3581":0,"3582":0,"3583":0,"3586":0,"3590":0,"3593":0,"3594":0,"3595":0,"3596":0,"3597":0,"3600":0,"3601":0,"3604":0,"3605":0,"3608":0,"3610":0,"3611":0,"3615":0,"3616":0,"3619":0,"3625":0,"3636":0,"3637":0,"3639":0,"3640":0,"3652":0,"3653":0,"3654":0,"3655":0,"3657":0,"3658":0,"3660":0,"3662":0,"3663":0,"3665":0,"3666":0,"3668":0,"3670":0,"3671":0,"3673":0,"3675":0,"3676":0,"3677":0,"3679":0,"3681":0,"3684":0,"3688":0,"3691":0,"3693":0,"3704":0,"3705":0,"3706":0,"3709":0,"3711":0,"3714":0,"3725":0,"3726":0,"3727":0,"3728":0,"3729":0,"3732":0,"3733":0,"3736":0,"3739":0,"3740":0,"3743":0,"3746":0,"3749":0,"3760":0,"3762":0,"3773":0,"3774":0,"3776":0,"3777":0,"3789":0,"3791":0,"3793":0,"3799":0,"3802":0,"3803":0,"3821":0,"3822":0,"3824":0,"3833":0,"3845":0,"3850":0,"3852":0,"3854":0,"3866":0,"3868":0,"3870":0,"3871":0,"3874":0,"3876":0,"3877":0,"3880":0,"3883":0,"3893":0,"3895":0,"3897":0,"3899":0,"3908":0,"3910":0,"3912":0,"3913":0,"3915":0,"3924":0,"3926":0,"3928":0,"3929":0,"3932":0,"3935":0,"3936":0,"3938":0,"3939":0,"3944":0,"3946":0,"3947":0,"3950":0,"3952":0,"3961":0,"3963":0,"3965":0,"3966":0,"3970":0,"3972":0,"3974":0,"3975":0,"3988":0,"3990":0,"3991":0,"3993":0,"3994":0,"3997":0,"3998":0,"3999":0,"4001":0,"4008":0,"4009":0,"4011":0,"4013":0,"4015":0,"4017":0,"4018":0,"4023":0,"4025":0,"4029":0,"4034":0,"4038":0,"4043":0};
_yuitest_coverage["/build/aui-tree/aui-tree.js"].functions = {"isTreeNode:33":0,"isTreeView:37":0,"initTreeData:112":0,"(anonymous 2):131":0,"destructor:128":0,"getNodeById:143":0,"isRegistered:156":0,"(anonymous 3):211":0,"updateReferences:170":0,"(anonymous 4):244":0,"refreshIndex:237":0,"registerNode:255":0,"updateIndex:282":0,"unregisterNode:296":0,"(anonymous 5):317":0,"collapseAll:314":0,"(anonymous 6):330":0,"expandAll:327":0,"(anonymous 7):343":0,"selectAll:340":0,"(anonymous 8):356":0,"unselectAll:353":0,"(anonymous 9):372":0,"eachChildren:368":0,"eachParent:385":0,"bubbleEvent:406":0,"createNode:440":0,"appendChild:456":0,"_appendChild:471":0,"item:507":0,"indexOf:521":0,"hasChildNodes:533":0,"(anonymous 10):554":0,"getChildren:546":0,"getChildrenLength:562":0,"getEventOutputMap:575":0,"removeChild:592":0,"_removeChild:605":0,"(anonymous 11):648":0,"empty:645":0,"(anonymous 12):692":0,"insert:665":0,"insertAfter:730":0,"insertBefore:743":0,"getNodeByChild:756":0,"(anonymous 14):831":0,"(anonymous 13):810":0,"_setChildren:777":0,"(anonymous 1):1":0,"concat:902":0,"isTreeNode:906":0,"isTreeView:910":0,"valueFn:996":0,"valueFn:1002":0,"valueFn:1040":0,"valueFn:1053":0,"valueFn:1067":0,"valueFn:1093":0,"setter:1111":0,"validator:1157":0,"initializer:1214":0,"bindUI:1235":0,"render:1243":0,"renderUI:1276":0,"syncUI:1289":0,"appendChild:1298":0,"collapse:1311":0,"collapseAll:1317":0,"contains:1333":0,"expand:1344":0,"expandAll:1350":0,"getDepth:1365":0,"hasChildNodes:1381":0,"hideHitArea:1392":0,"isAncestor:1404":0,"isLeaf:1425":0,"isSelected:1437":0,"out:1448":0,"over:1459":0,"select:1470":0,"showHitArea:1489":0,"insertAfter:1495":0,"insertBefore:1501":0,"removeChild:1507":0,"toggle:1520":0,"unselect:1536":0,"_afterDraggableChange:1551":0,"_afterExpandedChange:1565":0,"_afterLeafChange:1579":0,"_afterLoadingChange:1593":0,"_afterSetChildren:1606":0,"_createNodeContainer:1619":0,"_getSibling:1633":0,"_renderBoundingBox:1655":0,"_renderContentBox:1686":0,"_syncHitArea:1713":0,"_syncIconUI:1733":0,"_syncTreeNodeBBId:1773":0,"_uiSetExpanded:1782":0,"_uiSetLeaf:1806":0,"bindUI:1948":0,"syncUI:1956":0,"(anonymous 16):1970":0,"createNodes:1965":0,"expand:1978":0,"(anonymous 17):2021":0,"_inheritOwnerTreeAttrs:2011":0,"_onIOSuccess:2048":0,"valueFn:2137":0,"valueFn:2151":0,"initializer:2182":0,"renderUI:2191":0,"bindUI:2210":0,"check:2231":0,"isChecked:2249":0,"toggleCheck:2260":0,"uncheck:2280":0,"_afterCheckedChange:2292":0,"_uiSetChecked:2298":0,"isTreeNodeTask:2326":0,"(anonymous 18):2375":0,"(anonymous 19):2384":0,"check:2368":0,"(anonymous 20):2404":0,"(anonymous 21):2413":0,"uncheck:2397":0,"isTreeNodeRadio:2437":0,"renderUI:2480":0,"(anonymous 22):2509":0,"_uncheckNodesRadio:2488":0,"_uiSetChecked:2521":0,"check:2534":0,"(anonymous 15):858":0,"TreeViewPaginator:2597":0,"setter:2607":0,"_bindPaginatorUI:2644":0,"_createEvents:2662":0,"_defPaginatorClickFn:2682":0,"_handlePaginatorClickEvent:2703":0,"_syncPaginatorIOData:2721":0,"_syncPaginatorUI:2743":0,"(anonymous 23):2571":0,"concat:2820":0,"isTreeNode:2824":0,"initializer:2930":0,"bindUI:2948":0,"(anonymous 25):2959":0,"createNodes:2956":0,"renderUI:2974":0,"_afterSetChildren:2987":0,"(anonymous 26):3003":0,"_createFromHTMLMarkup:3000":0,"_renderElements:3049":0,"_delegateDOM:3074":0,"_onClickNodeEl:3095":0,"_onMouseEnterNodeEl:3129":0,"_onMouseLeaveNodeEl:3145":0,"_onClickHitArea:3161":0,"destructor:3334":0,"bindUI:3353":0,"renderUI:3367":0,"(anonymous 27):3405":0,"_createDrag:3391":0,"_createDragInitHandler:3448":0,"_bindDragDrop:3441":0,"_appendState:3503":0,"_goingDownState:3520":0,"_goingUpState:3537":0,"_resetState:3554":0,"_updateNodeState:3576":0,"_afterAppend:3635":0,"_afterDropHit:3651":0,"_onDragAlign:3703":0,"_onDragStart:3724":0,"_onDropOver:3759":0,"_onDropHit:3772":0,"_onDropExit:3788":0,"(anonymous 24):2783":0,"TreeViewIO:3821":0,"setter:3844":0,"initializer:3851":0,"initIO:3865":0,"ioStartHandler:3892":0,"ioCompleteHandler:3907":0,"ioSuccessHandler:3923":0,"ioFailureHandler:3960":0,"_onIOSuccessDefault:3969":0,"(anonymous 30):4016":0,"(anonymous 29):4008":0,"_setIO:3987":0,"(anonymous 28):3802":0};
_yuitest_coverage["/build/aui-tree/aui-tree.js"].coveredLines = 936;
_yuitest_coverage["/build/aui-tree/aui-tree.js"].coveredFunctions = 191;
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1);
AUI.add('aui-tree-data', function(A) {
/**
 * The TreeData Utility
 *
 * @module aui-tree
 * @submodule aui-tree-data
 */

_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 9);
var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isObject = L.isObject,
	isUndefined = L.isUndefined,

	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CONTAINER = 'container',
	DOT = '.',
	ID = 'id',
	INDEX = 'index',
	LAZY_LOAD = 'lazyLoad',
	LEAF = 'leaf',
	NEXT_SIBLING = 'nextSibling',
	NODE = 'node',
	OWNER_TREE = 'ownerTree',
	PARENT_NODE = 'parentNode',
	PREV_SIBLING = 'prevSibling',
	PREVIOUS_SIBLING = 'previousSibling',
	TREE = 'tree',
	TREE_NODE = 'tree-node',
	TREE_DATA = 'tree-data',

	isTreeNode = function(v) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isTreeNode", 33);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 34);
return ( v instanceof A.TreeNode );
	},

	isTreeView = function(v) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isTreeView", 37);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 38);
return ( v instanceof A.TreeView );
	},

	getCN = A.getClassName,

	CSS_TREE_NODE = getCN(TREE, NODE);

/**
 * A base class for TreeData, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Handle the data of the tree</li>
 *    <li>Basic DOM implementation (append/remove/insert)</li>
 *    <li>Indexing management to handle the children nodes</li>
 * </ul>
 *
 * Check the list of <a href="TreeData.html#configattributes">Configuration Attributes</a> available for
 * TreeData.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeData
 * @constructor
 * @extends Base
 */

_yuitest_coverline("/build/aui-tree/aui-tree.js", 64);
var TreeData = function () {};

_yuitest_coverline("/build/aui-tree/aui-tree.js", 66);
TreeData.ATTRS = {
	/**
	 * Container to nest children nodes. If has cntainer it's not a leaf.
	 *
	 * @attribute container
	 * @default null
	 * @type Node | String
	 */
	container: {
		setter: A.one
	},

	/**
	 * Array of children (i.e. could be a JSON metadata object or a TreeNode instance).
	 *
	 * @attribute children
	 * @default []
	 * @type Array
	 */
	children: {
		value: [],
		validator: isArray,
		setter: '_setChildren'
	},

	/**
	 * Index the nodes.
	 *
	 * @attribute index
	 * @default {}
	 * @type Object
	 */
	index: {
		value: {}
	}
};

_yuitest_coverline("/build/aui-tree/aui-tree.js", 103);
A.mix(TreeData.prototype, {
	childrenLength: 0,

	/**
	 * Construction logic executed during TreeData instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initTreeData: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "initTreeData", 112);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 113);
var instance = this;

		// binding on initializer, needed before .render() phase
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 116);
instance.publish('move');
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 117);
instance.publish('append', { defaultFn: instance._appendChild });
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 118);
instance.publish('remove', { defaultFn: instance._removeChild });
	},

	/**
	 * Descructor lifecycle implementation for the TreeData class.
	 * Purges events attached to the node (and all child nodes).
	 *
	 * @method destructor
	 * @protected
	 */
	destructor: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "destructor", 128);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 129);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 131);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 2)", 131);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 132);
node.destroy();
		}, true);
	},

	/**
	 * Get a TreeNode by id.
	 *
	 * @method getNodeById
	 * @param {String} uid
	 * @return {TreeNode}
	 */
	getNodeById: function(uid) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "getNodeById", 143);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 144);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 146);
return instance.get(INDEX)[uid];
	},

	/**
	 * Whether the TreeNode is registered on this TreeData.
	 *
	 * @method isRegistered
	 * @param {TreeNode} node
	 * @return {boolean}
	 */
	isRegistered: function(node) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isRegistered", 156);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 157);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 159);
return !!(instance.get(INDEX)[ node.get(ID) ]);
	},

	/**
	 * Update the references of the passed TreeNode.
	 *
	 * @method updateReferences
	 * @param {node} TreeNode
	 * @param {parentNode} TreeNode
	 * @param {ownerTree} TreeView
	 */
	updateReferences: function(node, parentNode, ownerTree) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "updateReferences", 170);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 171);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 172);
var oldParent = node.get(PARENT_NODE);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 173);
var oldOwnerTree = node.get(OWNER_TREE);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 174);
var moved = oldParent && (oldParent !== parentNode);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 176);
if (oldParent) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 177);
if (moved) {
				// when moved update the oldParent children
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 179);
var children = oldParent.get(CHILDREN);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 181);
A.Array.removeItem(children, node);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 183);
oldParent.set(CHILDREN, children);
			}

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 186);
oldParent.unregisterNode(node);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 189);
if (oldOwnerTree) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 190);
oldOwnerTree.unregisterNode(node);
		}

		// update parent reference when registered
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 194);
node.set(PARENT_NODE, parentNode);

		// update the ownerTree of the node
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 197);
node.set(OWNER_TREE, ownerTree);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 199);
if (parentNode) {
			// register the new node on the parentNode index
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 201);
parentNode.registerNode(node);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 204);
if (ownerTree) {
			// register the new node to the ownerTree index
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 206);
ownerTree.registerNode(node);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 209);
if (oldOwnerTree != ownerTree) {
			// when change the OWNER_TREE update the children references also
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 211);
node.eachChildren(function(child) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 3)", 211);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 212);
instance.updateReferences(child, child.get(PARENT_NODE), ownerTree);
			});
		}

		// trigger move event
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 217);
if (moved) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 218);
var output = instance.getEventOutputMap(node);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 220);
if (!oldParent.get('children').length) {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 221);
oldParent.collapse();
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 222);
oldParent.hideHitArea();
			}

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 225);
output.tree.oldParent = oldParent;
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 226);
output.tree.oldOwnerTree = oldOwnerTree;

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 228);
instance.bubbleEvent('move', output);
		}
	},

	/**
	 * Refresh the index (i.e. re-index all nodes).
	 *
	 * @method refreshIndex
	 */
	refreshIndex: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "refreshIndex", 237);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 238);
var instance = this;

		// reset index
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 241);
instance.updateIndex({});

		// get all descendent children - deep
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 244);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 4)", 244);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 245);
instance.registerNode(node);
		}, true);
	},

	/**
	 * Register the passed TreeNode on this TreeData.
	 *
	 * @method registerNode
	 * @param {TreeNode} node
	 */
	registerNode: function(node) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "registerNode", 255);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 256);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 257);
var uid = node.get(ID);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 258);
var index = instance.get(INDEX);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 260);
if (uid) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 261);
index[uid] = node;
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 264);
if (isTreeView(instance)) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 265);
node.addTarget(instance);

			// when the node is appended to the TreeView set the OWNER_TREE
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 268);
node.set(OWNER_TREE, instance);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 271);
node._inheritOwnerTreeAttrs();

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 273);
instance.updateIndex(index);
	},

	/**
	 * Update the <a href="TreeData.html#config_index">index</a> attribute value.
	 *
	 * @method updateIndex
	 * @param {Object} index
	 */
	updateIndex: function(index) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "updateIndex", 282);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 283);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 285);
if (index) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 286);
instance.set(INDEX, index);
		}
	},

	/**
	 * Unregister the passed TreeNode from this TreeData.
	 *
	 * @method unregisterNode
	 * @param {TreeNode} node
	 */
	unregisterNode: function(node) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "unregisterNode", 296);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 297);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 298);
var index = instance.get(INDEX);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 300);
delete index[ node.get(ID) ];

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 302);
if (isTreeView(instance)) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 303);
node.removeTarget(instance);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 306);
instance.updateIndex(index);
	},

	/**
	 * Collapse all children of the TreeData.
	 *
	 * @method collapseAll
	 */
	collapseAll: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "collapseAll", 314);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 315);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 317);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 5)", 317);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 318);
node.collapse();
		}, true);
	},

	/**
	 * Expand all children of the TreeData.
	 *
	 * @method expandAll
	 */
	expandAll: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "expandAll", 327);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 328);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 330);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 6)", 330);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 331);
node.expand();
		}, true);
	},

	/**
	 * Select all children of the TreeData.
	 *
	 * @method selectAll
	 */
	selectAll: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "selectAll", 340);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 341);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 343);
instance.eachChildren(function(child) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 7)", 343);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 344);
child.select();
		}, true);
	},

	/**
	 * Unselect all children of the TreeData.
	 *
	 * @method selectAll
	 */
	unselectAll: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "unselectAll", 353);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 354);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 356);
instance.eachChildren(function(child) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 8)", 356);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 357);
child.unselect();
		}, true);
	},

	/**
	 * Loop each children and execute the <code>fn</code> callback.
	 *
	 * @method eachChildren
	 * @param {function} fn callback
	 * @param {boolean} fn recursive
	 */
	eachChildren: function(fn, deep) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "eachChildren", 368);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 369);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 370);
var children = instance.getChildren(deep);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 372);
A.Array.each(children, function(node) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 9)", 372);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 373);
if (node) {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 374);
fn.apply(instance, arguments);
			}
		});
	},

	/**
	 * Loop each parent node and execute the <code>fn</code> callback.
	 *
	 * @method eachChildren
	 * @param {function} fn callback
	 */
	eachParent: function(fn) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "eachParent", 385);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 386);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 387);
var parentNode = instance.get(PARENT_NODE);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 389);
while (parentNode) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 390);
if (parentNode) {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 391);
fn.call(instance, parentNode);
			}
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 393);
parentNode = parentNode.get(PARENT_NODE);
		}
	},

	/**
	 * Bubble event to all parent nodes.
	 *
	 * @method bubbleEvent
	 * @param {String} eventType
	 * @param {Array} args
	 * @param {boolean} cancelBubbling
	 * @param {boolean} stopActionPropagation
	 */
	bubbleEvent: function(eventType, args, cancelBubbling, stopActionPropagation) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "bubbleEvent", 406);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 407);
var instance = this;

		// event.stopActionPropagation === undefined, invoke the event native action
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 410);
instance.fire(eventType, args);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 412);
if (!cancelBubbling) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 413);
var parentNode = instance.get(PARENT_NODE);

			// Avoid execution of the native action (private methods) while propagate
			// for example: private _appendChild() is invoked only on the first level of the bubbling
			// the intention is only invoke the user callback on parent nodes.
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 418);
args = args || {};

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 420);
if (isUndefined(stopActionPropagation)) {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 421);
stopActionPropagation = true;
			}

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 424);
args.stopActionPropagation = stopActionPropagation;

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 426);
while(parentNode) {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 427);
parentNode.fire(eventType, args);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 428);
parentNode = parentNode.get(PARENT_NODE);
			}
		}
	},

	/**
	 * Create a TreeNode instance.
	 *
	 * @method createNode
	 * @param {Object} options
	 * @return {TreeNode}
	 */
	createNode: function(options) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "createNode", 440);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 441);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 442);
var classType = A.TreeNode.nodeTypes[ isObject(options) ? options.type : options ] || A.TreeNode;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 444);
return new classType(
			isObject(options) ? options : {}
		);
	},

	/**
	 * Append a child node to the TreeData.
	 *
	 * @method appendChild
	 * @param {TreeNode} node
	 * @param {boolean} cancelBubbling
	 */
	appendChild: function(node, cancelBubbling) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "appendChild", 456);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 457);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 458);
var output = instance.getEventOutputMap(node);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 460);
instance.bubbleEvent('append', output, cancelBubbling);
	},

	/**
	 * Append a child node to the TreeData.
	 *
	 * @method _appendChild
	 * @param {TreeNode} node
	 * @param {boolean} cancelBubbling
	 * @protected
	 */
	_appendChild: function(event) {
		// stopActionPropagation while bubbling
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_appendChild", 471);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 473);
if (event.stopActionPropagation) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 474);
return false;
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 477);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 478);
var node = event.tree.node;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 479);
var ownerTree = instance.get(OWNER_TREE);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 480);
var children = instance.get(CHILDREN);

		// updateReferences first
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 483);
instance.updateReferences(node, instance, ownerTree);
		// and then set the children, to have the appendChild propagation
		// the PARENT_NODE references should be updated
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 486);
var length = children.push(node);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 487);
instance.set(CHILDREN, children);

		// updating prev/nextSibling attributes
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 490);
var prevIndex = length - 2;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 491);
var prevSibling = instance.item(prevIndex);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 493);
node.set(NEXT_SIBLING, null);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 494);
node.set(PREV_SIBLING, prevSibling);

		// render node
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 497);
node.render(instance.get(CONTAINER));
	},

	/**
	 * Get a TreeNode children by index.
	 *
	 * @method item
	 * @param {Number} index
	 * @return {TreeNode}
	 */
	item: function(index) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "item", 507);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 508);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 510);
return instance.get(CHILDREN)[index];
	},

	/**
	 * Index of the passed TreeNode on the <a
     * href="TreeData.html#config_children">children</a> attribute.
	 *
	 * @method indexOf
	 * @param {TreeNode} node
	 * @return {Number}
	 */
	indexOf: function(node) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "indexOf", 521);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 522);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 524);
return A.Array.indexOf( instance.get(CHILDREN), node );
	},

	/**
	 * Whether the TreeData contains children or not.
	 *
	 * @method hasChildNodes
	 * @return {boolean}
	 */
	hasChildNodes: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "hasChildNodes", 533);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 534);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 536);
return (instance.getChildrenLength() > 0);
	},

	/**
	 * Get an Array of the children nodes of the current TreeData.
	 *
	 * @method getChildren
	 * @param {boolean} deep
	 * @return {Array}
	 */
	getChildren: function(deep) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "getChildren", 546);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 547);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 548);
var cNodes = [];
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 549);
var children = instance.get(CHILDREN);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 551);
cNodes = cNodes.concat(children);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 553);
if (deep) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 554);
instance.eachChildren(function(child) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 10)", 554);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 555);
cNodes = cNodes.concat( child.getChildren(deep) );
			});
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 559);
return cNodes;
	},

	getChildrenLength: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "getChildrenLength", 562);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 563);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 565);
return (instance.childrenLength || instance.get(CHILDREN).length);
	},

	/**
	 * Get an object containing metadata for the custom events.
	 *
	 * @method getEventOutputMap
	 * @param {TreeData} node
	 * @return {Object}
	 */
	getEventOutputMap: function(node) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "getEventOutputMap", 575);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 576);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 578);
return {
			tree: {
				instance: instance,
				node: node || instance
			}
		};
	},

	/**
	 * Remove the passed <code>node</code> from the current TreeData.
	 *
	 * @method removeChild
	 * @param {TreeData} node
	 */
	removeChild: function(node) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "removeChild", 592);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 593);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 594);
var output = instance.getEventOutputMap(node);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 596);
instance.bubbleEvent('remove', output);
	},

	/**
	 * Remove the passed <code>node</code> from the current TreeData.
	 *
	 * @method _removeChild
	 * @param {TreeData} node
	 */
	_removeChild: function(event) {
		// stopActionPropagation while bubbling
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_removeChild", 605);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 607);
if (event.stopActionPropagation) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 608);
return false;
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 611);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 612);
var node = event.tree.node;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 613);
var ownerTree = instance.get(OWNER_TREE);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 615);
if (instance.isRegistered(node)) {
			// update parent reference when removed
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 617);
node.set(PARENT_NODE, null);

			// unregister the node
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 620);
instance.unregisterNode(node);

			// no parent, no ownerTree
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 623);
node.set(OWNER_TREE, null);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 625);
if (ownerTree) {
				// unregister the removed node from the tree index
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 627);
ownerTree.unregisterNode(node);
			}

			// remove child from the container
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 631);
node.get(BOUNDING_BOX).remove();

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 633);
var children = instance.get(CHILDREN);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 635);
A.Array.removeItem(children, node);
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 636);
instance.set(CHILDREN, children);
		}
	},

	/**
	 * Delete all children of the current TreeData.
	 *
	 * @method empty
	 */
	empty: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "empty", 645);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 646);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 648);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 11)", 648);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 649);
var parentNode = node.get(PARENT_NODE);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 651);
if (parentNode) {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 652);
parentNode.removeChild(node);
			}
		});
	},

	/**
	 * Insert <code>treeNode</code> before or after the <code>refTreeNode</code>.
	 *
	 * @method insert
	 * @param {TreeNode} treeNode
	 * @param {TreeNode} refTreeNode
	 * @param {TreeNode} where 'before' or 'after'
	 */
	insert: function(treeNode, refTreeNode, where) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "insert", 665);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 666);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 667);
refTreeNode = refTreeNode || this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 669);
if (refTreeNode === treeNode) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 670);
return false; // NOTE: return
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 673);
var refParentTreeNode = refTreeNode.get(PARENT_NODE);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 675);
if (treeNode && refParentTreeNode) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 676);
var nodeBoundingBox = treeNode.get(BOUNDING_BOX);
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 677);
var refBoundingBox = refTreeNode.get(BOUNDING_BOX);
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 678);
var ownerTree = refTreeNode.get(OWNER_TREE);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 680);
if (where === 'before') {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 681);
refBoundingBox.placeBefore(nodeBoundingBox);
			}
			else {_yuitest_coverline("/build/aui-tree/aui-tree.js", 683);
if (where === 'after') {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 684);
refBoundingBox.placeAfter(nodeBoundingBox);
			}}

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 687);
var refSiblings = [];
			// using the YUI selector to regenerate the index based on the real dom
			// this avoid misscalculations on the nodes index number
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 690);
var DOMChildren = refParentTreeNode.get(BOUNDING_BOX).all('> ul > li');

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 692);
DOMChildren.each(function(child) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 12)", 692);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 693);
refSiblings.push( child.getData(TREE_NODE) );
			});

			// updating prev/nextSibling attributes
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 697);
var nextSiblingNode = nodeBoundingBox.get(NEXT_SIBLING);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 699);
treeNode.set(NEXT_SIBLING, nextSiblingNode && nextSiblingNode.getData(TREE_NODE));

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 701);
var prevSiblingNode = nodeBoundingBox.get(PREVIOUS_SIBLING);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 703);
treeNode.set(PREV_SIBLING, prevSiblingNode && prevSiblingNode.getData(TREE_NODE));

			// update all references
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 706);
refTreeNode.updateReferences(treeNode, refParentTreeNode, ownerTree);

			// updating refParentTreeNode childTreeNodes
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 709);
refParentTreeNode.set(CHILDREN, refSiblings);
		}

		// render treeNode after it's inserted
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 713);
treeNode.render();

		// invoking insert event
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 716);
var output = refTreeNode.getEventOutputMap(treeNode);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 718);
output.tree.refTreeNode = refTreeNode;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 720);
refTreeNode.bubbleEvent('insert', output);
	},

	/**
	 * Insert <code>treeNode</code> after the <code>refTreeNode</code>.
	 *
	 * @method insertAfter
	 * @param {TreeNode} treeNode
	 * @param {TreeNode} refTreeNode
	 */
	insertAfter: function(treeNode, refTreeNode) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "insertAfter", 730);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 731);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 733);
instance.insert(treeNode, refTreeNode, 'after');
	},

	/**
	 * Insert <code>treeNode</code> before the <code>refTreeNode</code>.
	 *
	 * @method insertBefore
	 * @param {TreeNode} treeNode
	 * @param {TreeNode} refTreeNode
	 */
	insertBefore: function(treeNode, refTreeNode) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "insertBefore", 743);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 744);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 746);
instance.insert(treeNode, refTreeNode, 'before');
	},

	/**
	 * Get a TreeNode instance by a child DOM Node.
	 *
	 * @method getNodeByChild
	 * @param {Node} child
	 * @return {TreeNode}
	 */
	getNodeByChild: function(child) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "getNodeByChild", 756);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 757);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 758);
var treeNodeEl = child.ancestor(DOT+CSS_TREE_NODE);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 760);
if (treeNodeEl) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 761);
return treeNodeEl.getData(TREE_NODE);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 764);
return null;
	},

	_inheritOwnerTreeAttrs: L.emptyFn,

	/**
	 * Setter for <a href="TreeData.html#config_children">children</a>.
	 *
	 * @method _setChildren
	 * @protected
	 * @param {Array} v
	 * @return {Array}
	 */
	_setChildren: function(v) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_setChildren", 777);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 778);
var instance = this;
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 779);
var childNodes = [];
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 780);
var container = instance.get(CONTAINER);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 782);
if (!container) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 783);
container = instance._createNodeContainer();
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 786);
instance.childrenLength = v.length;

		// before render the node, make sure the PARENT_NODE and OWNER_TREE references are updated
		// this is required on the render phase of the TreeNode (_createNodeContainer)
		// to propagate the events callback (appendChild/expand)
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 791);
var ownerTree = instance;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 793);
if (isTreeNode(instance)) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 794);
ownerTree = instance.get(OWNER_TREE);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 797);
var hasOwnerTree = isTreeView(ownerTree);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 798);
var lazyLoad = true;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 800);
if (hasOwnerTree) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 801);
lazyLoad = ownerTree.get(LAZY_LOAD);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 804);
instance.updateIndex({});

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 806);
if (instance.childrenLength > 0) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 807);
instance.set(LEAF, false);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 810);
A.Array.each(v, function(node, index) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 13)", 810);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 811);
if (node) {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 812);
if (!isTreeNode(node) && isObject(node)) {
					// cache and remove children to lazy add them later for
					// performance reasons
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 815);
var children = node[CHILDREN];
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 816);
var hasChildren = children && children.length;

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 818);
node[OWNER_TREE] = ownerTree;
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 819);
node[PARENT_NODE] = instance;

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 821);
if (hasChildren && lazyLoad) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 822);
delete node[CHILDREN];
					}

					// creating node from json
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 826);
node = instance.createNode(node);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 828);
if (hasChildren && lazyLoad) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 829);
node.childrenLength = children.length;

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 831);
A.setTimeout(function() {
							_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 14)", 831);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 832);
node.set(CHILDREN, children);
						}, 50);
					}
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 837);
if (hasOwnerTree) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 838);
ownerTree.registerNode(node);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 841);
node._inheritOwnerTreeAttrs();
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 842);
node.render(instance.get(CONTAINER));

				// avoid duplicated children on the childNodes list
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 845);
if (A.Array.indexOf(childNodes, node) === -1) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 846);
childNodes.push(node);
				}
			}
		});

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 851);
return childNodes;
	}
});

_yuitest_coverline("/build/aui-tree/aui-tree.js", 855);
A.TreeData = TreeData;

}, '@VERSION@' ,{requires:['aui-base','aui-task-manager'], skinnable:false});
_yuitest_coverline("/build/aui-tree/aui-tree.js", 858);
AUI.add('aui-tree-node', function(A) {
/**
 * The TreeNode Utility
 *
 * @module aui-tree
 * @submodule aui-tree-node
 */

_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 15)", 858);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 866);
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
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "concat", 902);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 903);
return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isTreeNode = function(v) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isTreeNode", 906);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 907);
return (v instanceof A.TreeNode);
	},

	isTreeView = function(v) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isTreeView", 910);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 911);
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
_yuitest_coverline("/build/aui-tree/aui-tree.js", 963);
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
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "valueFn", 996);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 997);
return A.Node.create(NODE_BOUNDING_TEMPLATE);
				}
			},

			contentBox: {
				valueFn: function() {
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "valueFn", 1002);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1003);
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
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "valueFn", 1040);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1041);
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
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "valueFn", 1053);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1054);
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
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "valueFn", 1067);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1068);
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
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "valueFn", 1093);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1094);
var instance = this;

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1096);
var label = instance.get(LABEL);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1098);
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
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "setter", 1111);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1112);
var instance = this;

					// if has children it's not a leaf
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1115);
if (v && instance.get(CHILDREN).length) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1116);
return false;
					}

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1119);
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
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "validator", 1157);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1158);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "initializer", 1214);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1215);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1217);
instance.get(BOUNDING_BOX).setData(TREE_NODE, instance);

				// Sync the Widget TreeNode id with the BOUNDING_BOX id
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1220);
instance._syncTreeNodeBBId();

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1222);
instance._uiSetExpanded(instance.get(EXPANDED));

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1224);
instance._uiSetLeaf(instance.get(LEAF));

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1226);
instance.initTreeData();
			},

			/**
			 * Bind the events on the TreeNode UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "bindUI", 1235);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1236);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1238);
instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1239);
instance.after('expandedChange', A.bind(instance._afterExpandedChange, instance));
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1240);
instance.after('idChange', instance._afterSetId, instance);
			},

			render: function(container) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "render", 1243);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1244);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1246);
if (!instance.get(RENDERED)) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1247);
instance.renderUI();
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1248);
instance.bindUI();
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1249);
instance.syncUI();

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1251);
instance.set(RENDERED, true);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1254);
if (container) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1255);
var boundingBox = instance.get(BOUNDING_BOX);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1256);
var parentNode = instance.get(PARENT_NODE);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1258);
boundingBox.appendTo(container);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1260);
if (parentNode) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1261);
var paginator = parentNode.get(PAGINATOR);

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1263);
if (paginator) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 1264);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "renderUI", 1276);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1277);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1279);
instance._renderBoundingBox();
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1280);
instance._renderContentBox();
			},

			/**
			 * Sync the TreeNode UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "syncUI", 1289);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1290);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1292);
instance._syncIconUI();
			},

			/*
			* Methods
			*/
			appendChild: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "appendChild", 1298);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1299);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1301);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1302);
A.TreeNode.superclass.appendChild.apply(instance, arguments);
				}
			},

			/**
			 * Collapse the current TreeNode.
			 *
			 * @method collapse
			 */
			collapse: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "collapse", 1311);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1312);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1314);
instance.set(EXPANDED, false);
			},

			collapseAll: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "collapseAll", 1317);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1318);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1320);
A.TreeNode.superclass.collapseAll.apply(instance, arguments);

				// instance is also a node, so collapse itself
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1323);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "contains", 1333);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1334);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1336);
return node.isAncestor(instance);
			},

			/**
			 * Expand the current TreeNode.
			 *
			 * @method expand
			 */
			expand: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "expand", 1344);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1345);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1347);
instance.set(EXPANDED, true);
			},

			expandAll: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "expandAll", 1350);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1351);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1353);
A.TreeNode.superclass.expandAll.apply(instance, arguments);

				// instance is also a node, so expand itself
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1356);
instance.expand();
			},

			/**
			 * Get the depth of the current TreeNode.
			 *
			 * @method getDepth
			 * @return {Number}
			 */
			getDepth: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "getDepth", 1365);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1366);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1368);
var depth = 0;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1370);
var parentNode = instance.get(PARENT_NODE);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1372);
while (parentNode) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1373);
++depth;

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1375);
parentNode = parentNode.get(PARENT_NODE);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1378);
return depth;
			},

			hasChildNodes: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "hasChildNodes", 1381);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1382);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1384);
return (!instance.isLeaf() && A.TreeNode.superclass.hasChildNodes.apply(instance, arguments));
			},

			/*
			* Hide hitarea icon.
			*
			* @method hideHitArea
			*/
			hideHitArea: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "hideHitArea", 1392);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1393);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1395);
instance.get(HIT_AREA_EL).addClass(CSS_TREE_NODE_HIDDEN_HITAREA);
			},

			/**
			 * Whether the current TreeNode is ancestor of the passed <code>node</code> or not.
			 *
			 * @method isLeaf
			 * @return {boolean}
			 */
			isAncestor: function(node) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isAncestor", 1404);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1405);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1407);
var parentNode = instance.get(PARENT_NODE);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1409);
while (parentNode) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1410);
if (parentNode === node) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1411);
return true;
					}
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1413);
parentNode = parentNode.get(PARENT_NODE);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1416);
return false;
			},

			/**
			 * Whether the current TreeNode is a leaf or not.
			 *
			 * @method isLeaf
			 * @return {boolean}
			 */
			isLeaf: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isLeaf", 1425);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1426);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1428);
return instance.get(LEAF);
			},

			/**
			 * Whether the current TreeNode is selected or not.
			 *
			 * @method isSelected
			 * @return {boolean}
			 */
			isSelected: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isSelected", 1437);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1438);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1440);
return instance.get(CONTENT_BOX).hasClass(CSS_TREE_NODE_SELECTED);
			},

			/*
			* Fires when <code>mouseout</code> the current TreeNode.
			*
			* @method over
			*/
			out: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "out", 1448);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1449);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1451);
instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_OVER);
			},

			/*
			* Fires when <code>mouseover</code> the current TreeNode.
			*
			* @method over
			*/
			over: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "over", 1459);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1460);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1462);
instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_OVER);
			},

			/*
			* Select the current TreeNode.
			*
			* @method select
			*/
			select: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "select", 1470);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1471);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1473);
var ownerTree = instance.get(OWNER_TREE);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1475);
if (ownerTree) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1476);
ownerTree.set(LAST_SELECTED, instance);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1479);
instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_SELECTED);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1481);
instance.fire('select');
			},

			/*
			* Show hitarea icon.
			*
			* @method showHitArea
			*/
			showHitArea: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "showHitArea", 1489);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1490);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1492);
instance.get(HIT_AREA_EL).removeClass(CSS_TREE_NODE_HIDDEN_HITAREA);
			},

			insertAfter: function(node, refNode) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "insertAfter", 1495);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1496);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1498);
A.TreeNode.superclass.insertAfter.apply(this, [node, instance]);
			},

			insertBefore: function(node) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "insertBefore", 1501);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1502);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1504);
A.TreeNode.superclass.insertBefore.apply(this, [node, instance]);
			},

			removeChild: function(node) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "removeChild", 1507);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1508);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1510);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1511);
A.TreeNode.superclass.removeChild.apply(instance, arguments);
				}
			},

			/**
			 * Toggle the current TreeNode, <code>collapsed</code> or <code>expanded</code>.
			 *
			 * @method toggle
			 */
			toggle: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "toggle", 1520);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1521);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1523);
if (instance.get(EXPANDED)) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1524);
instance.collapse();
				}
				else {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1527);
instance.expand();
				}
			},

			/*
			* Unselect the current TreeNode.
			*
			* @method unselect
			*/
			unselect: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "unselect", 1536);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1537);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1539);
instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_SELECTED);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1541);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_afterDraggableChange", 1551);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1552);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1554);
instance._uiSetDraggable(event.newVal);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1555);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_afterExpandedChange", 1565);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1566);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1568);
instance._uiSetExpanded(event.newVal);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1569);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_afterLeafChange", 1579);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1580);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1582);
instance._uiSetLeaf(event.newVal);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1583);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_afterLoadingChange", 1593);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1594);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1596);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_afterSetChildren", 1606);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1607);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1609);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_createNodeContainer", 1619);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1620);
var instance = this;

				// creating <ul class="aui-tree-container">
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1623);
var nodeContainer = instance.get(CONTAINER) || A.Node.create(NODE_CONTAINER_TPL);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1625);
nodeContainer.addClass(CSS_TREE_CONTAINER);

				// when it's not a leaf it has a <ul> container
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1628);
instance.set(CONTAINER, nodeContainer);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1630);
return nodeContainer;
			},

			_getSibling: function(value, attrName) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_getSibling", 1633);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1634);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1636);
var propName = '_' + attrName;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1637);
var sibling = instance[propName];

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1639);
if (sibling !== null && !isTreeNode(sibling)) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1640);
sibling = null;

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1642);
instance[propName] = sibling;
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1645);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_renderBoundingBox", 1655);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1656);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1658);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1659);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1661);
contentBox.append(instance.get(ICON_EL));
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1662);
contentBox.append(instance.get(LABEL_EL));

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1664);
boundingBox.append(contentBox);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1666);
var nodeContainer = instance.get(CONTAINER);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1668);
if (nodeContainer) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1669);
if (!instance.get(EXPANDED)) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1670);
nodeContainer.addClass(CSS_TREE_HIDDEN);
					}

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1673);
boundingBox.append(nodeContainer);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1676);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_renderContentBox", 1686);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1687);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1689);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1691);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1692);
var expanded = instance.get(EXPANDED);

					// add folder css classes state
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1695);
contentBox.addClass(
						expanded ? CSS_TREE_EXPANDED : CSS_TREE_COLLAPSED
					);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1699);
if (expanded) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1700);
instance.expand();
					}
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1704);
return contentBox;
			},

			/**
			 * Sync the hitarea UI.
			 *
			 * @method _syncHitArea
			 * @protected
			 */
			_syncHitArea: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_syncHitArea", 1713);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1714);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1716);
if (instance.get(ALWAYS_SHOW_HITAREA) || instance.getChildrenLength()) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1717);
instance.showHitArea();
				}
				else {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1720);
instance.hideHitArea();

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1722);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_syncIconUI", 1733);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1734);
var instance = this,
					ownerTree = instance.get(OWNER_TREE);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1737);
if (ownerTree) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1738);
var type = ownerTree.get('type'),
						cssClasses = instance.get('cssClasses.' + type);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1741);
if (!cssClasses) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1742);
return;
					}

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1745);
var expanded = instance.get(EXPANDED),
						iconEl = instance.get(ICON_EL),
						hitAreaEl = instance.get(HIT_AREA_EL),
						icon = instance.isLeaf() ?
								cssClasses.iconLeaf :
								(expanded ? cssClasses.iconExpanded : cssClasses.iconCollapsed),
						iconHitArea = expanded ?
										cssClasses.iconHitAreaExpanded :
										cssClasses.iconHitAreaCollapsed;

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1755);
if (instance.get(LOADING)) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1756);
icon = cssClasses.iconLoading;
					}

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1759);
iconEl.setAttribute('className', icon || BLANK);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1760);
hitAreaEl.setAttribute('className', iconHitArea || BLANK);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1763);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_syncTreeNodeBBId", 1773);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1774);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1776);
instance.get(BOUNDING_BOX).attr(
					ID,
					instance.get(ID)
				);
			},

			_uiSetExpanded: function(val) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_uiSetExpanded", 1782);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1783);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1785);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1786);
var container = instance.get(CONTAINER);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1787);
var contentBox = instance.get(CONTENT_BOX);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1789);
if (val) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1790);
contentBox.replaceClass(CSS_TREE_COLLAPSED, CSS_TREE_EXPANDED);

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1792);
if (container) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 1793);
container.removeClass(CSS_TREE_HIDDEN);
						}
					}
					else {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1797);
contentBox.replaceClass(CSS_TREE_EXPANDED, CSS_TREE_COLLAPSED);

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1799);
if (container) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 1800);
container.addClass(CSS_TREE_HIDDEN);
						}
					}
				}
			},

			_uiSetLeaf: function(val) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_uiSetLeaf", 1806);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1807);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1809);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1811);
if (val) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1812);
instance.get(CONTAINER).remove();
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1813);
instance.get(HIT_AREA_EL).remove();
				}
				else {
					// append hitarea element
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1817);
contentBox.prepend( instance.get(HIT_AREA_EL) );

					// if has children append them to this model
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1820);
instance._createNodeContainer();

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1822);
instance._uiSetExpanded(instance.get(EXPANDED));
				}

				// add leaf css classes
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1826);
contentBox.toggleClass(CSS_TREE_NODE_LEAF, val);
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree/aui-tree.js", 1832);
A.TreeNode = TreeNode;

/*
* TreeNodeIO
*/
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1837);
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
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1875);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "bindUI", 1948);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1949);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1951);
A.TreeNodeIO.superclass.bindUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1953);
instance.on('ioRequestSuccess', instance._onIOSuccess, instance);
			},

			syncUI: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "syncUI", 1956);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1957);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1959);
A.TreeNodeIO.superclass.syncUI.apply(instance, arguments);
			},

			/*
			* Methods
			*/
			createNodes: function(nodes) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "createNodes", 1965);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1966);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1968);
A.Array.each(
					A.Array(nodes),
					function(node) {
						_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 16)", 1970);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1971);
instance.appendChild(instance.createNode(node));
					}
				);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1975);
instance._syncPaginatorUI(nodes);
			},

			expand: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "expand", 1978);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 1979);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1981);
var cache = instance.get(CACHE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1982);
var io = instance.get(IO);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1983);
var loaded = instance.get(LOADED);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1984);
var loading = instance.get(LOADING);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1986);
if (!cache) {
					// if cache is false on expand, always set LOADED to false
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1988);
instance.set(LOADED, false);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 1991);
if (io && !loaded && !loading && !instance.hasChildNodes()) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1992);
if (!cache) {
						// remove all children to reload
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 1994);
instance.empty();
					}

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 1997);
instance.initIO();
				}
				else {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2000);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_inheritOwnerTreeAttrs", 2011);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2012);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2014);
var ownerTree = instance.get(OWNER_TREE);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2016);
if (ownerTree) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2017);
if (!instance.get(IO)) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2018);
var io = A.clone(
							ownerTree.get(IO),
							true,
							function(value, key) {
								_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 17)", 2021);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2022);
if (isFunction(value) && (value.defaultFn || value.wrappedFn)) {
									_yuitest_coverline("/build/aui-tree/aui-tree.js", 2023);
return false;
								}

								_yuitest_coverline("/build/aui-tree/aui-tree.js", 2026);
return true;
							}
						);

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2030);
instance.set(IO, io);
					}

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2033);
if (!instance.get(PAGINATOR)) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2034);
var ownerTreePaginator = ownerTree.get(PAGINATOR);

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2036);
var paginator = A.clone(ownerTreePaginator);

						// make sure we are not using the same element passed to the ownerTree on the TreeNode
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2039);
if (paginator && paginator.element) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 2040);
paginator.element = ownerTreePaginator.element.clone();
						}

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2043);
instance.set(PAGINATOR, paginator);
					}
				}
			},

			_onIOSuccess: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onIOSuccess", 2048);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2049);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2051);
instance.expand();
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree/aui-tree.js", 2057);
A.TreeNodeIO = TreeNodeIO;

/*
* TreeNodeCheck
*/
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2062);
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
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2096);
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
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "valueFn", 2137);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2138);
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
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "valueFn", 2151);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2152);
var instance = this;

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2154);
var checkBoxId = instance.get(ID) + 'Checkbox';

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2156);
var attributes = {
						ID: checkBoxId,
						NAME: instance.get(CHECK_NAME)
					};

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2161);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "initializer", 2182);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2183);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2185);
instance._uiSetChecked(instance.get(CHECKED));
			},

			/*
			* Lifecycle
			*/
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "renderUI", 2191);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2192);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2194);
A.TreeNodeCheck.superclass.renderUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2196);
var checkEl = instance.get(CHECK_EL);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2197);
var checkContainerEl = instance.get(CHECK_CONTAINER_EL);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2199);
checkEl.hide();

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2201);
checkContainerEl.append(checkEl);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2203);
instance.get(LABEL_EL).placeBefore(checkContainerEl);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2205);
if (instance.isChecked()) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2206);
instance.check();
				}
			},

			bindUI: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "bindUI", 2210);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2211);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2213);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2215);
A.TreeNodeCheck.superclass.bindUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2217);
instance.after('checkedChange', A.bind(instance._afterCheckedChange, instance));

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2219);
contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_NODE_CHECKBOX_CONTAINER);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2220);
contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_LABEL);

				// cancel dblclick because of the check
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2223);
instance.get(LABEL_EL).swallowEvent('dblclick');
			},

			/**
			 * Check the current TreeNode.
			 *
			 * @method check
			 */
			check: function(originalTarget) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "check", 2231);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2232);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2234);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isChecked", 2249);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2250);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2252);
return instance.get(CHECKED);
			},

			/**
			 * Toggle the check status of the current TreeNode.
			 *
			 * @method toggleCheck
			 */
			toggleCheck: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "toggleCheck", 2260);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2261);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2263);
var checkEl = instance.get(CHECK_EL);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2265);
var checked = checkEl.attr(CHECKED);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2267);
if (!checked) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2268);
instance.check();
				}
				else {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2271);
instance.uncheck();
				}
			},

			/**
			 * Uncheck the current TreeNode.
			 *
			 * @method uncheck
			 */
			uncheck: function(originalTarget) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "uncheck", 2280);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2281);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2283);
instance.set(
					CHECKED,
					false,
					{
						originalTarget: originalTarget
					}
				);
			},

			_afterCheckedChange: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_afterCheckedChange", 2292);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2293);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2295);
instance._uiSetChecked(event.newVal);
			},

			_uiSetChecked: function(val) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_uiSetChecked", 2298);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2299);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2301);
var checkEl = instance.get(CHECK_EL);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2302);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2304);
if (val) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2305);
contentBox.addClass(CSS_TREE_NODE_CHECKED);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2306);
checkEl.attr(CHECKED, CHECKED);
				}
				else {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2309);
contentBox.removeClass(CSS_TREE_NODE_CHECKED);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2310);
checkEl.attr(CHECKED, BLANK);
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree/aui-tree.js", 2317);
A.TreeNodeCheck = TreeNodeCheck;

/*
* TreeNodeTask
*/
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2322);
var	CHILD = 'child',
	TREE_NODE_TASK = 'tree-node-task',
	UNCHECKED = 'unchecked',

	isTreeNodeTask = function(node) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isTreeNodeTask", 2326);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2327);
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
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2351);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "check", 2368);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2369);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2371);
originalTarget = originalTarget || instance;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2373);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2374);
instance.eachChildren(
						function(child) {
							_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 18)", 2375);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2376);
if (isTreeNodeTask(child)) {
								_yuitest_coverline("/build/aui-tree/aui-tree.js", 2377);
child.check(originalTarget);
							}
						}
					);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2383);
instance.eachParent(
					function(parentNode) {
						_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 19)", 2384);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2385);
if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 2386);
parentNode.get(CONTENT_BOX).addClass(CSS_TREE_NODE_CHILD_UNCHECKED);
						}
					}
				);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2391);
instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

				// invoke default check logic
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2394);
A.TreeNodeTask.superclass.check.call(instance, originalTarget);
			},

			uncheck: function(originalTarget) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "uncheck", 2397);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2398);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2400);
originalTarget = originalTarget || instance;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2402);
if (!instance.isLeaf()) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2403);
instance.eachChildren(
						function(child) {
							_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 20)", 2404);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2405);
if (child instanceof A.TreeNodeCheck) {
								_yuitest_coverline("/build/aui-tree/aui-tree.js", 2406);
child.uncheck(originalTarget);
							}
						}
					);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2412);
instance.eachParent(
					function(parentNode) {
						_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 21)", 2413);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2414);
if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 2415);
parentNode.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);
						}
					}
				);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2420);
instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

				// invoke default uncheck logic
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2423);
A.TreeNodeTask.superclass.uncheck.call(instance, originalTarget);
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree/aui-tree.js", 2429);
A.TreeNodeTask = TreeNodeTask;

/*
* TreeNodeRadio
*/

_yuitest_coverline("/build/aui-tree/aui-tree.js", 2435);
var	TREE_NODE_RADIO = 'tree-node-radio',

	isTreeNodeRadio = function(node) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isTreeNodeRadio", 2437);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2438);
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
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2463);
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
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "renderUI", 2480);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2481);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2483);
A.TreeNodeRadio.superclass.renderUI.apply(instance, arguments);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2485);
instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO);
			},

			_uncheckNodesRadio: function(node) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_uncheckNodesRadio", 2488);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2489);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2491);
var children;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2493);
if (node) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2494);
children = node.get(CHILDREN);
				}
				else {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2497);
var ownerTree = instance.get(OWNER_TREE);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2499);
if (ownerTree) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2500);
children = ownerTree.get(CHILDREN);
					}
					else {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2503);
return;
					}
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2507);
A.Array.each(
					children,
					function(value, index, collection) {
						_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 22)", 2509);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2510);
if (!value.isLeaf()) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 2511);
instance._uncheckNodesRadio(value);
						}

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2514);
if (isTreeNodeRadio(value)) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 2515);
value.uncheck();
						}
					}
				);
			},

			_uiSetChecked: function(val) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_uiSetChecked", 2521);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2522);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2524);
if (val) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2525);
instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO_CHECKED);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2526);
instance.get(CHECK_EL).attr(CHECKED, CHECKED);
				}
				else {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2529);
instance.get(CONTENT_BOX).removeClass(CSS_NODE_RADIO_CHECKED);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2530);
instance.get(CHECK_EL).attr(CHECKED, BLANK);
				}
			},

			check: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "check", 2534);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2535);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2537);
instance._uncheckNodesRadio();

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2539);
A.TreeNodeRadio.superclass.check.apply(instance, arguments);
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree/aui-tree.js", 2545);
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
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2562);
A.TreeNode.nodeTypes = {
	check: A.TreeNodeCheck,
	io: A.TreeNodeIO,
	node: A.TreeNode,
	radio: A.TreeNodeRadio,
	task: A.TreeNodeTask
};

}, '@VERSION@' ,{requires:['aui-tree-data','aui-tree-io','aui-tree-paginator','json','querystring-stringify'], skinnable:false});
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2571);
AUI.add('aui-tree-paginator', function(A) {
_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 23)", 2571);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2572);
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

_yuitest_coverline("/build/aui-tree/aui-tree.js", 2597);
function TreeViewPaginator(config) {
	_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "TreeViewPaginator", 2597);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2598);
var instance = this;

	_yuitest_coverline("/build/aui-tree/aui-tree.js", 2600);
A.after(instance._bindPaginatorUI, this, 'bindUI');

	_yuitest_coverline("/build/aui-tree/aui-tree.js", 2602);
A.after(instance._syncPaginatorUI, this, 'syncUI');
}

_yuitest_coverline("/build/aui-tree/aui-tree.js", 2605);
TreeViewPaginator.ATTRS = {
	paginator: {
		setter: function(value) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "setter", 2607);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2608);
var instance = this;

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2610);
var paginatorNode = A.Node.create(
				Lang.sub(
					TPL_PAGINATOR,
					{
						moreResultsLabel: value.moreResultsLabel || MORE_RESULTS_LABEL
					}
				)
			);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2619);
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


_yuitest_coverline("/build/aui-tree/aui-tree.js", 2637);
TreeViewPaginator.prototype = {
	/**
	 * Bind events to the paginator "show more" link.
	 *
	 * @method _bindPaginatorUI
	 * @protected
	 */
	_bindPaginatorUI: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_bindPaginatorUI", 2644);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2645);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2647);
var paginator = instance.get(PAGINATOR);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2649);
if (paginator) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2650);
paginator.element.on('click', A.bind(instance._handlePaginatorClickEvent, instance));
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2653);
instance._createEvents();
	},

	/**
	 * Create custom events.
	 *
	 * @method _createEvents
	 * @private
	 */
	_createEvents: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_createEvents", 2662);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2663);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2665);
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
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_defPaginatorClickFn", 2682);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2683);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2685);
var paginator = instance.get(PAGINATOR);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2687);
if (isValue(paginator.limit)) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2688);
paginator.start = instance.getChildrenLength();
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2691);
if (instance.get(IO)) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2692);
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
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_handlePaginatorClickEvent", 2703);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2704);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2706);
var output = instance.getEventOutputMap(instance);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2708);
instance.fire(EV_TREE_NODE_PAGINATOR_CLICK, output);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2710);
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
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_syncPaginatorIOData", 2721);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2722);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2724);
var paginator = instance.get(PAGINATOR);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2726);
if (paginator && isValue(paginator.limit)) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2727);
var data = io.cfg.data || {};

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2729);
data[ paginator.limitParam ] = paginator.limit;
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2730);
data[ paginator.startParam ] = paginator.start;
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2731);
data[ paginator.endParam ] = (paginator.start + paginator.limit);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2733);
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
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_syncPaginatorUI", 2743);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2744);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2746);
var paginator = instance.get(PAGINATOR);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 2748);
if (paginator) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2749);
var hasMoreData = true;

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2751);
if (newNodes) {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2752);
hasMoreData = (newNodes.length > 0);
			}

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2755);
var childrenLength = instance.getChildrenLength();
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2756);
var start = paginator.start;
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2757);
var total = paginator.total || childrenLength;

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2759);
var showPaginator = childrenLength && hasMoreData && (total > childrenLength);

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 2761);
if (paginator.alwaysVisible || showPaginator) {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2762);
instance.get(CONTAINER).append(
					paginator.element.show()
				);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2766);
if (paginator.autoFocus) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2767);
try {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 2768);
paginator.element.focus();
					}
					catch(e) {}
				}
			}
			else {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2774);
paginator.element.hide();
			}
		}
	}
};

_yuitest_coverline("/build/aui-tree/aui-tree.js", 2780);
A.TreeViewPaginator = TreeViewPaginator;

}, '@VERSION@' ,{requires:['aui-base'], skinnable:false});
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2783);
AUI.add('aui-tree-view', function(A) {
/**
 * The TreeView Utility
 *
 * @module aui-tree
 * @submodule aui-tree-view
 */

_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 24)", 2783);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2791);
var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,

	UA = A.UA,

	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	DOT = '.',
	FILE = 'file',
	HITAREA = 'hitarea',
	ICON = 'icon',
	LABEL = 'label',
	LAST_SELECTED = 'lastSelected',
	LEAF = 'leaf',
	NODE = 'node',
	OWNER_TREE = 'ownerTree',
	ROOT = 'root',
	SELECT_ON_TOGGLE = 'selectOnToggle',
	SPACE = ' ',
	TREE = 'tree',
	TREE_NODE = 'tree-node',
	TREE_VIEW = 'tree-view',
	TYPE = 'type',
	VIEW = 'view',

	concat = function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "concat", 2820);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2821);
return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isTreeNode = function(v) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "isTreeNode", 2824);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2825);
return ( v instanceof A.TreeNode );
	},

	getCN = A.getClassName,

	CSS_TREE_HITAREA = getCN(TREE, HITAREA),
	CSS_TREE_ICON = getCN(TREE, ICON),
	CSS_TREE_LABEL = getCN(TREE, LABEL),
	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),
	CSS_TREE_ROOT_CONTAINER = getCN(TREE, ROOT, CONTAINER),
	CSS_TREE_VIEW_CONTENT = getCN(TREE, VIEW, CONTENT);

/**
 * <p><img src="assets/images/aui-tree-view/main.png"/></p>
 *
 * A base class for TreeView, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var tree2 = new A.TreeView({
 *  	width: 200,
 *  	type: 'normal',
 *  	boundingBox: '#tree',
 *  	children: [
 *  		{ label: 'Folder 1', children: [ { label: 'file' }, { label: 'file' }, { label: 'file' } ] },
 *  		{ label: 'Folder 2', expanded: true, children: [ { label: 'file' }, { label: 'file' } ] },
 *  		{ label: 'Folder 3', children: [ { label: 'file' } ] },
 *  		{ label: 'Folder 4', expanded: true, children: [ { label: 'Folder 4-1', expanded: true, children: [ { label: 'file' } ] } ] }
 *  	]
 *  })
 *  .render();
 * </code></pre>
 *
 * Check the list of <a href="TreeView.html#configattributes">Configuration Attributes</a> available for
 * TreeView.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeView
 * @constructor
 * @extends TreeData
 */
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2870);
var TreeView = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeView.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_VIEW,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeView.
		 *
		 * @property TreeView.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Type of the treeview (i.e. could be 'file' or 'normal').
			 *
			 * @attribute type
			 * @default 'file'
			 * @type String
			 */
			type: {
				value: FILE,
				validator: isString
			},

			/**
			 * Last selected TreeNode.
			 *
			 * @attribute lastSelected
			 * @default null
			 * @type TreeNode
			 */
			lastSelected: {
				value: null,
				validator: isTreeNode
			},

			lazyLoad: {
				validator: isBoolean,
				value: true
			},

			selectOnToggle: {
				validator: isBoolean,
				value: false
			}
		},

		AUGMENTS: [A.TreeData, A.TreeViewPaginator, A.TreeViewIO],

		prototype: {
			CONTENT_TEMPLATE: '<ul></ul>',

			initializer: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "initializer", 2930);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2931);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2932);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2933);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2935);
instance.set(CONTAINER, contentBox);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2937);
boundingBox.setData(TREE_VIEW, instance);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2939);
instance.initTreeData();
			},

			/**
			 * Bind the events on the TreeView UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "bindUI", 2948);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2949);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2951);
instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2953);
instance._delegateDOM();
			},

			createNodes: function(nodes) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "createNodes", 2956);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2957);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2959);
A.Array.each(A.Array(nodes), function(node) {
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 25)", 2959);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2960);
var newNode = instance.createNode(node);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 2962);
instance.appendChild(newNode);
				});

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2965);
instance._syncPaginatorUI(nodes);
			},

			/**
			 * Create the DOM structure for the TreeView. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "renderUI", 2974);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2975);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2977);
instance._renderElements();
			},

			/**
			 * Fires after set children.
			 *
			 * @method _afterSetChildren
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterSetChildren: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_afterSetChildren", 2987);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 2988);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 2990);
instance._syncPaginatorUI();
			},

			/**
			 * Create TreeNode from HTML markup.
			 *
			 * @method _createFromHTMLMarkup
			 * @param {Node} container
			 * @protected
			 */
			_createFromHTMLMarkup: function(container) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_createFromHTMLMarkup", 3000);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3001);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3003);
container.all('> li').each(function(node) {
					// use firstChild as label
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 26)", 3003);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3005);
var labelEl = node.one('> *').remove();
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3006);
var label = labelEl.outerHTML();

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3008);
var treeNode = new A.TreeNode({
						boundingBox: node,
						label: label
					});

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3013);
var deepContainer = node.one('> ul');

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3015);
if (deepContainer) {
						// if has deepContainer it's not a leaf
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3017);
treeNode.set(LEAF, false);
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3018);
treeNode.set(CONTAINER, deepContainer);

						// render node before invoke the recursion
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3021);
treeNode.render();

						// propagating markup recursion
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3024);
instance._createFromHTMLMarkup(deepContainer);
					}
					else {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3027);
treeNode.render();
					}

					// find the parent TreeNode...
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3031);
var parentNode = node.get(PARENT_NODE).get(PARENT_NODE);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3032);
var parentInstance = parentNode.getData(TREE_NODE);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3034);
if (!A.instanceOf(parentInstance, A.TreeNode)) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3035);
parentInstance = parentNode.getData(TREE_VIEW);
					}

					// and simulate the appendChild.
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3039);
parentInstance.appendChild(treeNode);
				});
			},

			/**
			 * Render elements.
			 *
			 * @method _renderElements
			 * @protected
			 */
			_renderElements: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_renderElements", 3049);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3050);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3051);
var contentBox = instance.get(CONTENT_BOX);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3052);
var children = instance.get(CHILDREN);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3053);
var type = instance.get(TYPE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3054);
var CSS_TREE_TYPE = getCN(TREE, type);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3056);
contentBox.addClass(CSS_TREE_VIEW_CONTENT);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3058);
contentBox.addClass(
					concat(CSS_TREE_TYPE, CSS_TREE_ROOT_CONTAINER)
				);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3062);
if (!children.length) {
					// if children not specified try to create from markup
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3064);
instance._createFromHTMLMarkup(contentBox);
				}
			},

			/**
			 * Delegate events.
			 *
			 * @method _delegateDOM
			 * @protected
			 */
			_delegateDOM: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_delegateDOM", 3074);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3075);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3077);
var boundingBox = instance.get(BOUNDING_BOX);

				// expand/collapse delegations
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3080);
boundingBox.delegate('click', A.bind(instance._onClickNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3081);
boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_ICON);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3082);
boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_LABEL);
				// other delegations
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3084);
boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3085);
boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
			},

			/**
			 * Fires on click the TreeView (i.e. set the select/unselect state).
			 *
			 * @method _onClickNodeEl
			 * @param {EventFacade} event
			 * @protected
			 */
			_onClickNodeEl: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onClickNodeEl", 3095);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3096);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3098);
var treeNode = instance.getNodeByChild( event.currentTarget );

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3100);
if (treeNode) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3101);
if (event.target.test(DOT+CSS_TREE_HITAREA)) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3102);
treeNode.toggle();

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3104);
if (!instance.get(SELECT_ON_TOGGLE)) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 3105);
return;
						}
					}

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3109);
if (!treeNode.isSelected()) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3110);
var lastSelected = instance.get(LAST_SELECTED);

						// select drag node
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3113);
if (lastSelected) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 3114);
lastSelected.unselect();
						}

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3117);
treeNode.select();
					}
				}
			},

			/**
			 * Fires on <code>mouseeneter</code> the TreeNode.
			 *
			 * @method _onMouseEnterNodeEl
			 * @param {EventFacade} event
			 * @protected
			 */
			_onMouseEnterNodeEl: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onMouseEnterNodeEl", 3129);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3130);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3131);
var treeNode = instance.getNodeByChild( event.currentTarget );

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3133);
if (treeNode) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3134);
treeNode.over();
				}
			},

			/**
			 * Fires on <code>mouseleave</code> the TreeNode.
			 *
			 * @method _onMouseLeaveNodeEl
			 * @param {EventFacade} event
			 * @protected
			 */
			_onMouseLeaveNodeEl: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onMouseLeaveNodeEl", 3145);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3146);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3147);
var treeNode = instance.getNodeByChild( event.currentTarget );

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3149);
if (treeNode) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3150);
treeNode.out();
				}
			},

			/**
			 * Fires on <code>click</code> the TreeNode hitarea.
			 *
			 * @method _onClickHitArea
			 * @param {EventFacade} event
			 * @protected
			 */
			_onClickHitArea: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onClickHitArea", 3161);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3162);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3163);
var treeNode = instance.getNodeByChild( event.currentTarget );

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3165);
if (treeNode) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3166);
treeNode.toggle();
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree/aui-tree.js", 3173);
A.TreeView = TreeView;

/*
* TreeViewDD - Drag & Drop
*/
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3178);
var isNumber = L.isNumber,

	ABOVE = 'above',
	APPEND = 'append',
	BELOW = 'below',
	BLOCK = 'block',
	BODY = 'body',
	CLEARFIX = 'clearfix',
	DEFAULT = 'default',
	DISPLAY = 'display',
	DOWN = 'down',
	DRAG = 'drag',
	DRAGGABLE = 'draggable',
	DRAG_CURSOR = 'dragCursor',
	DRAG_NODE = 'dragNode',
	EXPANDED = 'expanded',
	HELPER = 'helper',
	INSERT = 'insert',
	OFFSET_HEIGHT = 'offsetHeight',
	PARENT_NODE = 'parentNode',
	SCROLL_DELAY = 'scrollDelay',
	STATE = 'state',
	TREE_DRAG_DROP = 'tree-drag-drop',
	UP = 'up',

	DDM = A.DD.DDM,

	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_ICON = getCN(ICON),
	CSS_TREE_DRAG_HELPER = getCN(TREE, DRAG, HELPER),
	CSS_TREE_DRAG_HELPER_CONTENT = getCN(TREE, DRAG, HELPER, CONTENT),
	CSS_TREE_DRAG_HELPER_LABEL = getCN(TREE, DRAG, HELPER, LABEL),
	CSS_TREE_DRAG_INSERT_ABOVE = getCN(TREE, DRAG, INSERT, ABOVE),
	CSS_TREE_DRAG_INSERT_APPEND = getCN(TREE, DRAG, INSERT, APPEND),
	CSS_TREE_DRAG_INSERT_BELOW = getCN(TREE, DRAG, INSERT, BELOW),
	CSS_TREE_DRAG_STATE_APPEND = getCN(TREE, DRAG, STATE, APPEND),
	CSS_TREE_DRAG_STATE_INSERT_ABOVE = getCN(TREE, DRAG, STATE, INSERT, ABOVE),
	CSS_TREE_DRAG_STATE_INSERT_BELOW = getCN(TREE, DRAG, STATE, INSERT, BELOW),

	HELPER_TPL = '<div class="'+CSS_TREE_DRAG_HELPER+'">'+
					'<div class="'+[CSS_TREE_DRAG_HELPER_CONTENT, CSS_HELPER_CLEARFIX].join(SPACE)+'">'+
						'<span class="'+CSS_ICON+'"></span>'+
						'<span class="'+CSS_TREE_DRAG_HELPER_LABEL+'"></span>'+
					'</div>'+
				'</div>';

/**
 * A base class for TreeViewDD, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>DragDrop support for the TreeNodes</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * Check the list of <a href="TreeViewDD.html#configattributes">Configuration Attributes</a> available for
 * TreeViewDD.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeViewDD
 * @constructor
 * @extends TreeView
 */
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3242);
var TreeViewDD = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeViewDD.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_DRAG_DROP,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeViewDD.
		 *
		 * @property TreeViewDD.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Dragdrop helper element.
			 *
			 * @attribute helper
			 * @default null
			 * @type Node | String
			 */
			helper: {
				value: null
			},

			/**
			 * Delay of the scroll while dragging the TreeNodes.
			 *
			 * @attribute scrollDelay
			 * @default 100
			 * @type Number
			 */
			scrollDelay: {
				value: 100,
				validator: isNumber
			}
		},

		EXTENDS: A.TreeView,

		prototype: {
			/**
			 * Direction of the drag (i.e. could be 'up' or 'down').
			 *
			 * @property direction
			 * @type String
			 * @protected
			 */
			direction: BELOW,

			/**
			 * Drop action (i.e. could be 'append', 'below' or 'above').
			 *
			 * @attribute dropAction
			 * @default null
			 * @type String
			 */
			dropAction: null,

			/**
			 * Last Y.
			 *
			 * @attribute lastY
			 * @default 0
			 * @type Number
			 */
			lastY: 0,

			node: null,

			/**
			 * Reference for the current drop node.
			 *
			 * @attribute nodeContent
			 * @default null
			 * @type Node
			 */
			nodeContent: null,

			/**
			 * Descructor lifecycle implementation for the TreeViewDD class.
			 * Purges events attached to the node (and all child nodes).
			 *
			 * @method destructor
			 * @protected
			 */
			destructor: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "destructor", 3334);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3335);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3336);
var helper = instance.get(HELPER);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3338);
if (helper) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3339);
helper.remove(true);
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3342);
if (instance.ddDelegate) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3343);
instance.ddDelegate.destroy();
				}
			},

			/**
			 * Bind the events on the TreeViewDD UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "bindUI", 3353);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3354);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3356);
A.TreeViewDD.superclass.bindUI.apply(this, arguments);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3358);
instance._bindDragDrop();
			},

			/**
			 * Create the DOM structure for the TreeViewDD. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "renderUI", 3367);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3368);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3370);
A.TreeViewDD.superclass.renderUI.apply(this, arguments);

				// creating drag helper and hiding it
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3373);
var helper = A.Node.create(HELPER_TPL).hide();

				// append helper to the body
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3376);
A.one(BODY).append(helper);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3378);
instance.set(HELPER, helper);

				// set DRAG_CURSOR to the default arrow
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3381);
DDM.set(DRAG_CURSOR, DEFAULT);
			},

			/**
			 * Setup DragDrop on the TreeNodes.
			 *
			 * @method _createDrag
			 * @param {Node} node
			 * @protected
			 */
			_createDrag: function(node) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_createDrag", 3391);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3392);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3394);
if (!instance.dragTimers) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3395);
instance.dragTimers = [];
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3398);
if (!DDM.getDrag(node)) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3399);
var dragTimers = instance.dragTimers;
					// dragDelay is a incremental delay for create the drag instances
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3401);
var dragDelay = 50 * dragTimers.length;

					// wrapping the _createDrag on a setTimeout for performance reasons
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3404);
var timer = setTimeout(
						function() {
							_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 27)", 3405);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3406);
if (!DDM.getDrag(node)) {
								// creating delayed drag instance
								_yuitest_coverline("/build/aui-tree/aui-tree.js", 3408);
var drag = new A.DD.Drag({
									bubbleTargets: instance,
									node: node,
									target: true
								})
								.plug(A.Plugin.DDProxy, {
									moveOnEnd: false,
									positionProxy: false,
									borderStyle: null
								})
								.plug(A.Plugin.DDNodeScroll, {
									scrollDelay: instance.get(SCROLL_DELAY),
									node: instance.get(BOUNDING_BOX)
								});

								_yuitest_coverline("/build/aui-tree/aui-tree.js", 3423);
drag.removeInvalid('a');
							}

							_yuitest_coverline("/build/aui-tree/aui-tree.js", 3426);
A.Array.removeItem(dragTimers, timer);
						},
						dragDelay
					);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3431);
dragTimers.push(timer);
				}
			},

			/**
			 * Bind DragDrop events.
			 *
			 * @method _bindDragDrop
			 * @protected
			 */
			_bindDragDrop: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_bindDragDrop", 3441);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3442);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3444);
var	boundingBox = instance.get(BOUNDING_BOX);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3446);
var	dragInitHandle = null;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3448);
instance._createDragInitHandler = function() {
					_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_createDragInitHandler", 3448);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3449);
instance.ddDelegate = new A.DD.Delegate(
						{
							bubbleTargets: instance,
							container: boundingBox,
							nodes: DOT+CSS_TREE_NODE_CONTENT,
							target: true
						}
					);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3458);
var dd = instance.ddDelegate.dd;

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3460);
dd.plug(A.Plugin.DDProxy, {
						moveOnEnd: false,
						positionProxy: false,
						borderStyle: null
					})
					.plug(A.Plugin.DDNodeScroll, {
						scrollDelay: instance.get(SCROLL_DELAY),
						node: boundingBox
					});

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3470);
dd.removeInvalid('a');

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3472);
if (dragInitHandle) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3473);
dragInitHandle.detach();
					}

				};

				// Check for mobile devices and execute _createDragInitHandler before events
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3479);
if (!UA.touch) {
					// only create the drag on the init elements if the user mouseover the boundingBox for init performance reasons
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3481);
dragInitHandle = boundingBox.on(['focus', 'mousedown', 'mousemove'], instance._createDragInitHandler);
				}
				else {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3484);
instance._createDragInitHandler();
				}

				// drag & drop listeners
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3488);
instance.on('drag:align', instance._onDragAlign);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3489);
instance.on('drag:start', instance._onDragStart);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3490);
instance.on('drop:exit', instance._onDropExit);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3491);
instance.after('drop:hit', instance._afterDropHit);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3492);
instance.on('drop:hit', instance._onDropHit);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3493);
instance.on('drop:over', instance._onDropOver);
			},

			/**
			 * Set the append CSS state on the passed <code>nodeContent</code>.
			 *
			 * @method _appendState
			 * @param {Node} nodeContent
			 * @protected
			 */
			_appendState: function(nodeContent) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_appendState", 3503);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3504);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3506);
instance.dropAction = APPEND;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3508);
instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_APPEND);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3510);
nodeContent.addClass(CSS_TREE_DRAG_INSERT_APPEND);
			},

			/**
			 * Set the going down CSS state on the passed <code>nodeContent</code>.
			 *
			 * @method _goingDownState
			 * @param {Node} nodeContent
			 * @protected
			 */
			_goingDownState: function(nodeContent) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_goingDownState", 3520);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3521);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3523);
instance.dropAction = BELOW;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3525);
instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3527);
nodeContent.addClass(CSS_TREE_DRAG_INSERT_BELOW);
			},

			/**
			 * Set the going up CSS state on the passed <code>nodeContent</code>.
			 *
			 * @method _goingUpState
			 * @param {Node} nodeContent
			 * @protected
			 */
			_goingUpState: function(nodeContent) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_goingUpState", 3537);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3538);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3540);
instance.dropAction = ABOVE;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3542);
instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3544);
nodeContent.addClass(CSS_TREE_DRAG_INSERT_ABOVE);
			},

			/**
			 * Set the reset CSS state on the passed <code>nodeContent</code>.
			 *
			 * @method _resetState
			 * @param {Node} nodeContent
			 * @protected
			 */
			_resetState: function(nodeContent) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_resetState", 3554);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3555);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3556);
var helper = instance.get(HELPER);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3558);
helper.removeClass(CSS_TREE_DRAG_STATE_APPEND);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3559);
helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3560);
helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3562);
if (nodeContent) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3563);
nodeContent.removeClass(CSS_TREE_DRAG_INSERT_ABOVE);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3564);
nodeContent.removeClass(CSS_TREE_DRAG_INSERT_APPEND);
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3565);
nodeContent.removeClass(CSS_TREE_DRAG_INSERT_BELOW);
				}
			},

			/**
			 * Update the CSS node state (i.e. going down, going up, append etc).
			 *
			 * @method _updateNodeState
			 * @param {EventFacade} event
			 * @protected
			 */
			_updateNodeState: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_updateNodeState", 3576);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3577);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3578);
var drag = event.drag;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3579);
var drop = event.drop;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3580);
var nodeContent = drop.get(NODE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3581);
var dropNode = nodeContent.get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3582);
var dragNode = drag.get(NODE).get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3583);
var dropTreeNode = dropNode.getData(TREE_NODE);

				// reset the classNames from the last nodeContent
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3586);
instance._resetState(instance.nodeContent);

				// cannot drop the dragged element into any of its children
				// using DOM contains method for performance reason
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3590);
if ( !dragNode.contains(dropNode) ) {
					// nArea splits the height in 3 areas top/center/bottom
					// these areas are responsible for defining the state when the mouse is over any of them
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3593);
var nArea = nodeContent.get(OFFSET_HEIGHT) / 3;
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3594);
var yTop = nodeContent.getY();
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3595);
var yCenter = yTop + nArea;
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3596);
var yBottom = yTop + nArea*2;
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3597);
var mouseY = drag.mouseXY[1];

					// UP: mouse on the top area of the node
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3600);
if ((mouseY > yTop) && (mouseY < yCenter)) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3601);
instance._goingUpState(nodeContent);
					}
					// DOWN: mouse on the bottom area of the node
					else {_yuitest_coverline("/build/aui-tree/aui-tree.js", 3604);
if (mouseY > yBottom) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3605);
instance._goingDownState(nodeContent);
					}
					// APPEND: mouse on the center area of the node
					else {_yuitest_coverline("/build/aui-tree/aui-tree.js", 3608);
if ((mouseY > yCenter) && (mouseY < yBottom)) {
						// if it's a folder set the state to append
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3610);
if (dropTreeNode && !dropTreeNode.isLeaf()) {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 3611);
instance._appendState(nodeContent);
						}
						// if it's a leaf we need to set the ABOVE or BELOW state instead of append
						else {
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 3615);
if (instance.direction === UP) {
								_yuitest_coverline("/build/aui-tree/aui-tree.js", 3616);
instance._goingUpState(nodeContent);
							}
							else {
								_yuitest_coverline("/build/aui-tree/aui-tree.js", 3619);
instance._goingDownState(nodeContent);
							}
						}
					}}}
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3625);
instance.nodeContent = nodeContent;
			},

			/**
			 * Fires after the append event.
			 *
			 * @method _handleEvent
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_afterAppend: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_afterAppend", 3635);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3636);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3637);
var treeNode = event.tree.node;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3639);
if (treeNode.get(DRAGGABLE)) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3640);
instance._createDrag( treeNode.get(CONTENT_BOX) );
				}
			},

			/**
			 * Fires after the drop hit event.
			 *
			 * @method _afterDropHit
			 * @param {EventFacade} event drop hit event facade
			 * @protected
			 */
			_afterDropHit: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_afterDropHit", 3651);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3652);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3653);
var dropAction = instance.dropAction;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3654);
var dragNode = event.drag.get(NODE).get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3655);
var dropNode = event.drop.get(NODE).get(PARENT_NODE);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3657);
var dropTreeNode = dropNode.getData(TREE_NODE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3658);
var dragTreeNode = dragNode.getData(TREE_NODE);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3660);
var output = instance.getEventOutputMap(instance);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3662);
output.tree.dropNode = dropTreeNode;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3663);
output.tree.dragNode = dragTreeNode;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3665);
if (dropAction === ABOVE) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3666);
dropTreeNode.insertBefore(dragTreeNode);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3668);
instance.bubbleEvent('dropInsert', output);
				}
				else {_yuitest_coverline("/build/aui-tree/aui-tree.js", 3670);
if (dropAction === BELOW) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3671);
dropTreeNode.insertAfter(dragTreeNode);

					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3673);
instance.bubbleEvent('dropInsert', output);
				}
				else {_yuitest_coverline("/build/aui-tree/aui-tree.js", 3675);
if (dropAction === APPEND) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3676);
if (dropTreeNode && !dropTreeNode.isLeaf()) {
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3677);
dropTreeNode.appendChild(dragTreeNode);

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3679);
if (!dropTreeNode.get(EXPANDED)) {
							// expand node when drop a child on it
							_yuitest_coverline("/build/aui-tree/aui-tree.js", 3681);
dropTreeNode.expand();
						}

						_yuitest_coverline("/build/aui-tree/aui-tree.js", 3684);
instance.bubbleEvent('dropAppend', output);
					}
				}}}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3688);
instance._resetState(instance.nodeContent);

				// bubbling drop event
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3691);
instance.bubbleEvent('drop', output);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3693);
instance.dropAction = null;
			},

			/**
			 * Fires on drag align event.
			 *
			 * @method _onDragAlign
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDragAlign: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onDragAlign", 3703);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3704);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3705);
var lastY = instance.lastY;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3706);
var y = event.target.lastXY[1];

				// if the y change
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3709);
if (y !== lastY) {
					// set the drag direction
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3711);
instance.direction = (y < lastY) ? UP : DOWN;
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3714);
instance.lastY = y;
			},

			/**
			 * Fires on drag start event.
			 *
			 * @method _onDragStart
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDragStart: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onDragStart", 3724);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3725);
var instance = this;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3726);
var drag = event.target;
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3727);
var dragNode = drag.get(NODE).get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3728);
var dragTreeNode = dragNode.getData(TREE_NODE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3729);
var lastSelected = instance.get(LAST_SELECTED);

				// select drag node
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3732);
if (lastSelected) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3733);
lastSelected.unselect();
				}

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3736);
dragTreeNode.select();

				// initialize drag helper
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3739);
var helper = instance.get(HELPER);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3740);
var helperLabel = helper.one(DOT+CSS_TREE_DRAG_HELPER_LABEL);

				// show helper, we need display block here, yui dd hide it with display none
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3743);
helper.setStyle(DISPLAY, BLOCK).show();

				// set the CSS_TREE_DRAG_HELPER_LABEL html with the label of the dragged node
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3746);
helperLabel.html( dragTreeNode.get(LABEL) );

				// update the DRAG_NODE with the new helper
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3749);
drag.set(DRAG_NODE, helper);
			},

			/**
			 * Fires on drop over event.
			 *
			 * @method _onDropOver
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDropOver: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onDropOver", 3759);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3760);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3762);
instance._updateNodeState(event);
			},

			/**
			 * Fires on drop hit event.
			 *
			 * @method _onDropHit
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDropHit: function(event) {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onDropHit", 3772);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3773);
var dropNode = event.drop.get(NODE).get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3774);
var dropTreeNode = dropNode.getData(TREE_NODE);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3776);
if (!isTreeNode(dropTreeNode)) {
					_yuitest_coverline("/build/aui-tree/aui-tree.js", 3777);
event.preventDefault();
				}
			},

			/**
			 * Fires on drop exit event.
			 *
			 * @method _onDropExit
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDropExit: function() {
				_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onDropExit", 3788);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3789);
var instance = this;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3791);
instance.dropAction = null;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3793);
instance._resetState(instance.nodeContent);
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree/aui-tree.js", 3799);
A.TreeViewDD = TreeViewDD;

}, '@VERSION@' ,{requires:['aui-tree-node','aui-tree-paginator','dd-drag','dd-drop','dd-proxy'], skinnable:true});
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3802);
AUI.add('aui-tree-io', function(A) {
_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 28)", 3802);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3803);
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

_yuitest_coverline("/build/aui-tree/aui-tree.js", 3821);
function TreeViewIO(config) {
	_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "TreeViewIO", 3821);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3822);
var instance = this;

	_yuitest_coverline("/build/aui-tree/aui-tree.js", 3824);
instance.publish(
		EVENT_IO_REQUEST_SUCCESS,
		{
			defaultFn: instance._onIOSuccessDefault
		}
	);
}


_yuitest_coverline("/build/aui-tree/aui-tree.js", 3833);
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
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "setter", 3844);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3845);
return this._setIO(v);
		}
	}
};

_yuitest_coverline("/build/aui-tree/aui-tree.js", 3850);
TreeViewIO.prototype = {
	initializer: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "initializer", 3851);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3852);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3854);
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
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "initIO", 3865);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3866);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3868);
var io = instance.get(IO);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3870);
if (isFunction(io.cfg.data)) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3871);
io.cfg.data = io.cfg.data.call(instance, instance);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3874);
instance._syncPaginatorIOData(io);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3876);
if (isFunction(io.loader)) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3877);
var loader = A.bind(io.loader, instance);

			// apply loader in the TreeNodeIO scope
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3880);
loader(io.url, io.cfg, instance);
		}
		else {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3883);
A.io.request(io.url, io.cfg);
		}
	},

	/**
	 * IO Start handler.
	 *
	 * @method ioStartHandler
	 */
	ioStartHandler: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "ioStartHandler", 3892);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3893);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3895);
var contentBox = instance.get(CONTENT_BOX);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3897);
instance.set(LOADING, true);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3899);
contentBox.addClass(CSS_TREE_NODE_IO_LOADING);
	},

	/**
	 * IO Complete handler.
	 *
	 * @method ioCompleteHandler
	 */
	ioCompleteHandler: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "ioCompleteHandler", 3907);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3908);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3910);
var contentBox = instance.get(CONTENT_BOX);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3912);
instance.set(LOADING, false);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3913);
instance.set(LOADED, true);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3915);
contentBox.removeClass(CSS_TREE_NODE_IO_LOADING);
	},

	/**
	 * IO Success handler.
	 *
	 * @method ioSuccessHandler
	 */
	ioSuccessHandler: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "ioSuccessHandler", 3923);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3924);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3926);
var io = instance.get(IO);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3928);
var args = Array.prototype.slice.call(arguments);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3929);
var length = args.length;

		// if using the first argument as the JSON object
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3932);
var nodes = args[1];

		// if using (event, id, o) yui callback syntax
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3935);
if (length >= 3) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3936);
var o = args[2];
			// try to convert responseText to JSON
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3938);
try {
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 3939);
nodes = A.JSON.parse(o.responseText);
			}
			catch(e) {}
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3944);
var formatter = io.formatter;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3946);
if (formatter) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3947);
nodes = formatter(nodes);
		}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3950);
instance.createNodes(nodes);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3952);
instance.fire(EVENT_IO_REQUEST_SUCCESS, nodes);
	},

	/**
	 * IO Failure handler.
	 *
	 * @method ioFailureHandler
	 */
	ioFailureHandler: function() {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "ioFailureHandler", 3960);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3961);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3963);
instance.fire('ioRequestFailure');

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3965);
instance.set(LOADING, false);
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3966);
instance.set(LOADED, false);
	},

	_onIOSuccessDefault: function(event) {
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_onIOSuccessDefault", 3969);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3970);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3972);
var ownerTree = instance.get(OWNER_TREE);

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3974);
if (ownerTree && ownerTree.ddDelegate) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3975);
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
		_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "_setIO", 3987);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 3988);
var instance = this;

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3990);
if (!v) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3991);
return null;
		}
		else {_yuitest_coverline("/build/aui-tree/aui-tree.js", 3993);
if (isString(v)) {
			_yuitest_coverline("/build/aui-tree/aui-tree.js", 3994);
v = { url: v };
		}}

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3997);
v = v || {};
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3998);
v.cfg = v.cfg || {};
		_yuitest_coverline("/build/aui-tree/aui-tree.js", 3999);
v.cfg.on = v.cfg.on || {};

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 4001);
var defCallbacks = {
			start: A.bind(instance.ioStartHandler, instance),
			complete: A.bind(instance.ioCompleteHandler, instance),
			success: A.bind(instance.ioSuccessHandler, instance),
			failure: A.bind(instance.ioFailureHandler, instance)
		};

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 4008);
A.each(defCallbacks, function(fn, name) {
			_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 29)", 4008);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 4009);
var userFn = v.cfg.on[name];

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 4011);
fn.defaultFn = true;

			_yuitest_coverline("/build/aui-tree/aui-tree.js", 4013);
if (isFunction(userFn)) {
				// wrapping user callback and default callback, invoking both handlers
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 4015);
var wrappedFn = A.bind(
					function() {
						_yuitest_coverfunc("/build/aui-tree/aui-tree.js", "(anonymous 30)", 4016);
_yuitest_coverline("/build/aui-tree/aui-tree.js", 4017);
fn.apply(instance, arguments);
						_yuitest_coverline("/build/aui-tree/aui-tree.js", 4018);
userFn.apply(instance, arguments);
					},
					instance
				);

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 4023);
wrappedFn.wrappedFn = true;

				_yuitest_coverline("/build/aui-tree/aui-tree.js", 4025);
v.cfg.on[name] = wrappedFn;
			}
			else {
				// get from defCallbacks map
				_yuitest_coverline("/build/aui-tree/aui-tree.js", 4029);
v.cfg.on[name] = fn;
			}

		});

		_yuitest_coverline("/build/aui-tree/aui-tree.js", 4034);
return v;
	}
};

_yuitest_coverline("/build/aui-tree/aui-tree.js", 4038);
A.TreeViewIO = TreeViewIO;

}, '@VERSION@' ,{requires:['aui-io','json'], skinnable:false});


_yuitest_coverline("/build/aui-tree/aui-tree.js", 4043);
AUI.add('aui-tree', function(A){}, '@VERSION@' ,{use:['aui-tree-data', 'aui-tree-node', 'aui-tree-io', 'aui-tree-paginator', 'aui-tree-view'], skinnable:true});

