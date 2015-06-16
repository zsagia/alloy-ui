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
_yuitest_coverage["/build/aui-tree-data/aui-tree-data.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-tree-data/aui-tree-data.js",
    code: []
};
_yuitest_coverage["/build/aui-tree-data/aui-tree-data.js"].code=["AUI.add('aui-tree-data', function(A) {","/**"," * The TreeData Utility"," *"," * @module aui-tree"," * @submodule aui-tree-data"," */","","var L = A.Lang,","	isArray = L.isArray,","	isBoolean = L.isBoolean,","	isObject = L.isObject,","	isUndefined = L.isUndefined,","","	BOUNDING_BOX = 'boundingBox',","	CHILDREN = 'children',","	CONTAINER = 'container',","	DOT = '.',","	ID = 'id',","	INDEX = 'index',","	LAZY_LOAD = 'lazyLoad',","	LEAF = 'leaf',","	NEXT_SIBLING = 'nextSibling',","	NODE = 'node',","	OWNER_TREE = 'ownerTree',","	PARENT_NODE = 'parentNode',","	PREV_SIBLING = 'prevSibling',","	PREVIOUS_SIBLING = 'previousSibling',","	TREE = 'tree',","	TREE_NODE = 'tree-node',","	TREE_DATA = 'tree-data',","","	isTreeNode = function(v) {","		return ( v instanceof A.TreeNode );","	},","","	isTreeView = function(v) {","		return ( v instanceof A.TreeView );","	},","","	getCN = A.getClassName,","","	CSS_TREE_NODE = getCN(TREE, NODE);","","/**"," * A base class for TreeData, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>Handle the data of the tree</li>"," *    <li>Basic DOM implementation (append/remove/insert)</li>"," *    <li>Indexing management to handle the children nodes</li>"," * </ul>"," *"," * Check the list of <a href=\"TreeData.html#configattributes\">Configuration Attributes</a> available for"," * TreeData."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeData"," * @constructor"," * @extends Base"," */","","var TreeData = function () {};","","TreeData.ATTRS = {","	/**","	 * Container to nest children nodes. If has cntainer it's not a leaf.","	 *","	 * @attribute container","	 * @default null","	 * @type Node | String","	 */","	container: {","		setter: A.one","	},","","	/**","	 * Array of children (i.e. could be a JSON metadata object or a TreeNode instance).","	 *","	 * @attribute children","	 * @default []","	 * @type Array","	 */","	children: {","		value: [],","		validator: isArray,","		setter: '_setChildren'","	},","","	/**","	 * Index the nodes.","	 *","	 * @attribute index","	 * @default {}","	 * @type Object","	 */","	index: {","		value: {}","	}","};","","A.mix(TreeData.prototype, {","	childrenLength: 0,","","	/**","	 * Construction logic executed during TreeData instantiation. Lifecycle.","	 *","	 * @method initializer","	 * @protected","	 */","	initTreeData: function() {","		var instance = this;","","		// binding on initializer, needed before .render() phase","		instance.publish('move');","		instance.publish('append', { defaultFn: instance._appendChild });","		instance.publish('remove', { defaultFn: instance._removeChild });","	},","","	/**","	 * Descructor lifecycle implementation for the TreeData class.","	 * Purges events attached to the node (and all child nodes).","	 *","	 * @method destructor","	 * @protected","	 */","	destructor: function() {","		var instance = this;","","		instance.eachChildren(function(node) {","			node.destroy();","		}, true);","	},","","	/**","	 * Get a TreeNode by id.","	 *","	 * @method getNodeById","	 * @param {String} uid","	 * @return {TreeNode}","	 */","	getNodeById: function(uid) {","		var instance = this;","","		return instance.get(INDEX)[uid];","	},","","	/**","	 * Whether the TreeNode is registered on this TreeData.","	 *","	 * @method isRegistered","	 * @param {TreeNode} node","	 * @return {boolean}","	 */","	isRegistered: function(node) {","		var instance = this;","","		return !!(instance.get(INDEX)[ node.get(ID) ]);","	},","","	/**","	 * Update the references of the passed TreeNode.","	 *","	 * @method updateReferences","	 * @param {node} TreeNode","	 * @param {parentNode} TreeNode","	 * @param {ownerTree} TreeView","	 */","	updateReferences: function(node, parentNode, ownerTree) {","		var instance = this;","		var oldParent = node.get(PARENT_NODE);","		var oldOwnerTree = node.get(OWNER_TREE);","		var moved = oldParent && (oldParent !== parentNode);","","		if (oldParent) {","			if (moved) {","				// when moved update the oldParent children","				var children = oldParent.get(CHILDREN);","","				A.Array.removeItem(children, node);","","				oldParent.set(CHILDREN, children);","			}","","			oldParent.unregisterNode(node);","		}","","		if (oldOwnerTree) {","			oldOwnerTree.unregisterNode(node);","		}","","		// update parent reference when registered","		node.set(PARENT_NODE, parentNode);","","		// update the ownerTree of the node","		node.set(OWNER_TREE, ownerTree);","","		if (parentNode) {","			// register the new node on the parentNode index","			parentNode.registerNode(node);","		}","","		if (ownerTree) {","			// register the new node to the ownerTree index","			ownerTree.registerNode(node);","		}","","		if (oldOwnerTree != ownerTree) {","			// when change the OWNER_TREE update the children references also","			node.eachChildren(function(child) {","				instance.updateReferences(child, child.get(PARENT_NODE), ownerTree);","			});","		}","","		// trigger move event","		if (moved) {","			var output = instance.getEventOutputMap(node);","","			if (!oldParent.get('children').length) {","				oldParent.collapse();","				oldParent.hideHitArea();","			}","","			output.tree.oldParent = oldParent;","			output.tree.oldOwnerTree = oldOwnerTree;","","			instance.bubbleEvent('move', output);","		}","	},","","	/**","	 * Refresh the index (i.e. re-index all nodes).","	 *","	 * @method refreshIndex","	 */","	refreshIndex: function() {","		var instance = this;","","		// reset index","		instance.updateIndex({});","","		// get all descendent children - deep","		instance.eachChildren(function(node) {","			instance.registerNode(node);","		}, true);","	},","","	/**","	 * Register the passed TreeNode on this TreeData.","	 *","	 * @method registerNode","	 * @param {TreeNode} node","	 */","	registerNode: function(node) {","		var instance = this;","		var uid = node.get(ID);","		var index = instance.get(INDEX);","","		if (uid) {","			index[uid] = node;","		}","","		if (isTreeView(instance)) {","			node.addTarget(instance);","","			// when the node is appended to the TreeView set the OWNER_TREE","			node.set(OWNER_TREE, instance);","		}","","		node._inheritOwnerTreeAttrs();","","		instance.updateIndex(index);","	},","","	/**","	 * Update the <a href=\"TreeData.html#config_index\">index</a> attribute value.","	 *","	 * @method updateIndex","	 * @param {Object} index","	 */","	updateIndex: function(index) {","		var instance = this;","","		if (index) {","			instance.set(INDEX, index);","		}","	},","","	/**","	 * Unregister the passed TreeNode from this TreeData.","	 *","	 * @method unregisterNode","	 * @param {TreeNode} node","	 */","	unregisterNode: function(node) {","		var instance = this;","		var index = instance.get(INDEX);","","		delete index[ node.get(ID) ];","","		if (isTreeView(instance)) {","			node.removeTarget(instance);","		}","","		instance.updateIndex(index);","	},","","	/**","	 * Collapse all children of the TreeData.","	 *","	 * @method collapseAll","	 */","	collapseAll: function() {","		var instance = this;","","		instance.eachChildren(function(node) {","			node.collapse();","		}, true);","	},","","	/**","	 * Expand all children of the TreeData.","	 *","	 * @method expandAll","	 */","	expandAll: function() {","		var instance = this;","","		instance.eachChildren(function(node) {","			node.expand();","		}, true);","	},","","	/**","	 * Select all children of the TreeData.","	 *","	 * @method selectAll","	 */","	selectAll: function() {","		var instance = this;","","		instance.eachChildren(function(child) {","			child.select();","		}, true);","	},","","	/**","	 * Unselect all children of the TreeData.","	 *","	 * @method selectAll","	 */","	unselectAll: function() {","		var instance = this;","","		instance.eachChildren(function(child) {","			child.unselect();","		}, true);","	},","","	/**","	 * Loop each children and execute the <code>fn</code> callback.","	 *","	 * @method eachChildren","	 * @param {function} fn callback","	 * @param {boolean} fn recursive","	 */","	eachChildren: function(fn, deep) {","		var instance = this;","		var children = instance.getChildren(deep);","","		A.Array.each(children, function(node) {","			if (node) {","				fn.apply(instance, arguments);","			}","		});","	},","","	/**","	 * Loop each parent node and execute the <code>fn</code> callback.","	 *","	 * @method eachChildren","	 * @param {function} fn callback","	 */","	eachParent: function(fn) {","		var instance = this;","		var parentNode = instance.get(PARENT_NODE);","","		while (parentNode) {","			if (parentNode) {","				fn.call(instance, parentNode);","			}","			parentNode = parentNode.get(PARENT_NODE);","		}","	},","","	/**","	 * Bubble event to all parent nodes.","	 *","	 * @method bubbleEvent","	 * @param {String} eventType","	 * @param {Array} args","	 * @param {boolean} cancelBubbling","	 * @param {boolean} stopActionPropagation","	 */","	bubbleEvent: function(eventType, args, cancelBubbling, stopActionPropagation) {","		var instance = this;","","		// event.stopActionPropagation === undefined, invoke the event native action","		instance.fire(eventType, args);","","		if (!cancelBubbling) {","			var parentNode = instance.get(PARENT_NODE);","","			// Avoid execution of the native action (private methods) while propagate","			// for example: private _appendChild() is invoked only on the first level of the bubbling","			// the intention is only invoke the user callback on parent nodes.","			args = args || {};","","			if (isUndefined(stopActionPropagation)) {","				stopActionPropagation = true;","			}","","			args.stopActionPropagation = stopActionPropagation;","","			while(parentNode) {","				parentNode.fire(eventType, args);","				parentNode = parentNode.get(PARENT_NODE);","			}","		}","	},","","	/**","	 * Create a TreeNode instance.","	 *","	 * @method createNode","	 * @param {Object} options","	 * @return {TreeNode}","	 */","	createNode: function(options) {","		var instance = this;","		var classType = A.TreeNode.nodeTypes[ isObject(options) ? options.type : options ] || A.TreeNode;","","		return new classType(","			isObject(options) ? options : {}","		);","	},","","	/**","	 * Append a child node to the TreeData.","	 *","	 * @method appendChild","	 * @param {TreeNode} node","	 * @param {boolean} cancelBubbling","	 */","	appendChild: function(node, cancelBubbling) {","		var instance = this;","		var output = instance.getEventOutputMap(node);","","		instance.bubbleEvent('append', output, cancelBubbling);","	},","","	/**","	 * Append a child node to the TreeData.","	 *","	 * @method _appendChild","	 * @param {TreeNode} node","	 * @param {boolean} cancelBubbling","	 * @protected","	 */","	_appendChild: function(event) {","		// stopActionPropagation while bubbling","		if (event.stopActionPropagation) {","			return false;","		}","","		var instance = this;","		var node = event.tree.node;","		var ownerTree = instance.get(OWNER_TREE);","		var children = instance.get(CHILDREN);","","		// updateReferences first","		instance.updateReferences(node, instance, ownerTree);","		// and then set the children, to have the appendChild propagation","		// the PARENT_NODE references should be updated","		var length = children.push(node);","		instance.set(CHILDREN, children);","","		// updating prev/nextSibling attributes","		var prevIndex = length - 2;","		var prevSibling = instance.item(prevIndex);","","		node.set(NEXT_SIBLING, null);","		node.set(PREV_SIBLING, prevSibling);","","		// render node","		node.render(instance.get(CONTAINER));","	},","","	/**","	 * Get a TreeNode children by index.","	 *","	 * @method item","	 * @param {Number} index","	 * @return {TreeNode}","	 */","	item: function(index) {","		var instance = this;","","		return instance.get(CHILDREN)[index];","	},","","	/**","	 * Index of the passed TreeNode on the <a","     * href=\"TreeData.html#config_children\">children</a> attribute.","	 *","	 * @method indexOf","	 * @param {TreeNode} node","	 * @return {Number}","	 */","	indexOf: function(node) {","		var instance = this;","","		return A.Array.indexOf( instance.get(CHILDREN), node );","	},","","	/**","	 * Whether the TreeData contains children or not.","	 *","	 * @method hasChildNodes","	 * @return {boolean}","	 */","	hasChildNodes: function() {","		var instance = this;","","		return (instance.getChildrenLength() > 0);","	},","","	/**","	 * Get an Array of the children nodes of the current TreeData.","	 *","	 * @method getChildren","	 * @param {boolean} deep","	 * @return {Array}","	 */","	getChildren: function(deep) {","		var instance = this;","		var cNodes = [];","		var children = instance.get(CHILDREN);","","		cNodes = cNodes.concat(children);","","		if (deep) {","			instance.eachChildren(function(child) {","				cNodes = cNodes.concat( child.getChildren(deep) );","			});","		}","","		return cNodes;","	},","","	getChildrenLength: function() {","		var instance = this;","","		return (instance.childrenLength || instance.get(CHILDREN).length);","	},","","	/**","	 * Get an object containing metadata for the custom events.","	 *","	 * @method getEventOutputMap","	 * @param {TreeData} node","	 * @return {Object}","	 */","	getEventOutputMap: function(node) {","		var instance = this;","","		return {","			tree: {","				instance: instance,","				node: node || instance","			}","		};","	},","","	/**","	 * Remove the passed <code>node</code> from the current TreeData.","	 *","	 * @method removeChild","	 * @param {TreeData} node","	 */","	removeChild: function(node) {","		var instance = this;","		var output = instance.getEventOutputMap(node);","","		instance.bubbleEvent('remove', output);","	},","","	/**","	 * Remove the passed <code>node</code> from the current TreeData.","	 *","	 * @method _removeChild","	 * @param {TreeData} node","	 */","	_removeChild: function(event) {","		// stopActionPropagation while bubbling","		if (event.stopActionPropagation) {","			return false;","		}","","		var instance = this;","		var node = event.tree.node;","		var ownerTree = instance.get(OWNER_TREE);","","		if (instance.isRegistered(node)) {","			// update parent reference when removed","			node.set(PARENT_NODE, null);","","			// unregister the node","			instance.unregisterNode(node);","","			// no parent, no ownerTree","			node.set(OWNER_TREE, null);","","			if (ownerTree) {","				// unregister the removed node from the tree index","				ownerTree.unregisterNode(node);","			}","","			// remove child from the container","			node.get(BOUNDING_BOX).remove();","","			var children = instance.get(CHILDREN);","","			A.Array.removeItem(children, node);","			instance.set(CHILDREN, children);","		}","	},","","	/**","	 * Delete all children of the current TreeData.","	 *","	 * @method empty","	 */","	empty: function() {","		var instance = this;","","		instance.eachChildren(function(node) {","			var parentNode = node.get(PARENT_NODE);","","			if (parentNode) {","				parentNode.removeChild(node);","			}","		});","	},","","	/**","	 * Insert <code>treeNode</code> before or after the <code>refTreeNode</code>.","	 *","	 * @method insert","	 * @param {TreeNode} treeNode","	 * @param {TreeNode} refTreeNode","	 * @param {TreeNode} where 'before' or 'after'","	 */","	insert: function(treeNode, refTreeNode, where) {","		var instance = this;","		refTreeNode = refTreeNode || this;","","		if (refTreeNode === treeNode) {","			return false; // NOTE: return","		}","","		var refParentTreeNode = refTreeNode.get(PARENT_NODE);","","		if (treeNode && refParentTreeNode) {","			var nodeBoundingBox = treeNode.get(BOUNDING_BOX);","			var refBoundingBox = refTreeNode.get(BOUNDING_BOX);","			var ownerTree = refTreeNode.get(OWNER_TREE);","","			if (where === 'before') {","				refBoundingBox.placeBefore(nodeBoundingBox);","			}","			else if (where === 'after') {","				refBoundingBox.placeAfter(nodeBoundingBox);","			}","","			var refSiblings = [];","			// using the YUI selector to regenerate the index based on the real dom","			// this avoid misscalculations on the nodes index number","			var DOMChildren = refParentTreeNode.get(BOUNDING_BOX).all('> ul > li');","","			DOMChildren.each(function(child) {","				refSiblings.push( child.getData(TREE_NODE) );","			});","","			// updating prev/nextSibling attributes","			var nextSiblingNode = nodeBoundingBox.get(NEXT_SIBLING);","","			treeNode.set(NEXT_SIBLING, nextSiblingNode && nextSiblingNode.getData(TREE_NODE));","","			var prevSiblingNode = nodeBoundingBox.get(PREVIOUS_SIBLING);","","			treeNode.set(PREV_SIBLING, prevSiblingNode && prevSiblingNode.getData(TREE_NODE));","","			// update all references","			refTreeNode.updateReferences(treeNode, refParentTreeNode, ownerTree);","","			// updating refParentTreeNode childTreeNodes","			refParentTreeNode.set(CHILDREN, refSiblings);","		}","","		// render treeNode after it's inserted","		treeNode.render();","","		// invoking insert event","		var output = refTreeNode.getEventOutputMap(treeNode);","","		output.tree.refTreeNode = refTreeNode;","","		refTreeNode.bubbleEvent('insert', output);","	},","","	/**","	 * Insert <code>treeNode</code> after the <code>refTreeNode</code>.","	 *","	 * @method insertAfter","	 * @param {TreeNode} treeNode","	 * @param {TreeNode} refTreeNode","	 */","	insertAfter: function(treeNode, refTreeNode) {","		var instance = this;","","		instance.insert(treeNode, refTreeNode, 'after');","	},","","	/**","	 * Insert <code>treeNode</code> before the <code>refTreeNode</code>.","	 *","	 * @method insertBefore","	 * @param {TreeNode} treeNode","	 * @param {TreeNode} refTreeNode","	 */","	insertBefore: function(treeNode, refTreeNode) {","		var instance = this;","","		instance.insert(treeNode, refTreeNode, 'before');","	},","","	/**","	 * Get a TreeNode instance by a child DOM Node.","	 *","	 * @method getNodeByChild","	 * @param {Node} child","	 * @return {TreeNode}","	 */","	getNodeByChild: function(child) {","		var instance = this;","		var treeNodeEl = child.ancestor(DOT+CSS_TREE_NODE);","","		if (treeNodeEl) {","			return treeNodeEl.getData(TREE_NODE);","		}","","		return null;","	},","","	_inheritOwnerTreeAttrs: L.emptyFn,","","	/**","	 * Setter for <a href=\"TreeData.html#config_children\">children</a>.","	 *","	 * @method _setChildren","	 * @protected","	 * @param {Array} v","	 * @return {Array}","	 */","	_setChildren: function(v) {","		var instance = this;","		var childNodes = [];","		var container = instance.get(CONTAINER);","","		if (!container) {","			container = instance._createNodeContainer();","		}","","		instance.childrenLength = v.length;","","		// before render the node, make sure the PARENT_NODE and OWNER_TREE references are updated","		// this is required on the render phase of the TreeNode (_createNodeContainer)","		// to propagate the events callback (appendChild/expand)","		var ownerTree = instance;","","		if (isTreeNode(instance)) {","			ownerTree = instance.get(OWNER_TREE);","		}","","		var hasOwnerTree = isTreeView(ownerTree);","		var lazyLoad = true;","","		if (hasOwnerTree) {","			lazyLoad = ownerTree.get(LAZY_LOAD);","		}","","		instance.updateIndex({});","","		if (instance.childrenLength > 0) {","			instance.set(LEAF, false);","		}","","		A.Array.each(v, function(node, index) {","			if (node) {","				if (!isTreeNode(node) && isObject(node)) {","					// cache and remove children to lazy add them later for","					// performance reasons","					var children = node[CHILDREN];","					var hasChildren = children && children.length;","","					node[OWNER_TREE] = ownerTree;","					node[PARENT_NODE] = instance;","","					if (hasChildren && lazyLoad) {","						delete node[CHILDREN];","					}","","					// creating node from json","					node = instance.createNode(node);","","					if (hasChildren && lazyLoad) {","						node.childrenLength = children.length;","","						A.setTimeout(function() {","							node.set(CHILDREN, children);","						}, 50);","					}","				}","","				if (hasOwnerTree) {","					ownerTree.registerNode(node);","				}","","				node._inheritOwnerTreeAttrs();","				node.render(instance.get(CONTAINER));","","				// avoid duplicated children on the childNodes list","				if (A.Array.indexOf(childNodes, node) === -1) {","					childNodes.push(node);","				}","			}","		});","","		return childNodes;","	}","});","","A.TreeData = TreeData;","","}, '@VERSION@' ,{requires:['aui-base','aui-task-manager'], skinnable:false});"];
_yuitest_coverage["/build/aui-tree-data/aui-tree-data.js"].lines = {"1":0,"9":0,"34":0,"38":0,"64":0,"66":0,"103":0,"113":0,"116":0,"117":0,"118":0,"129":0,"131":0,"132":0,"144":0,"146":0,"157":0,"159":0,"171":0,"172":0,"173":0,"174":0,"176":0,"177":0,"179":0,"181":0,"183":0,"186":0,"189":0,"190":0,"194":0,"197":0,"199":0,"201":0,"204":0,"206":0,"209":0,"211":0,"212":0,"217":0,"218":0,"220":0,"221":0,"222":0,"225":0,"226":0,"228":0,"238":0,"241":0,"244":0,"245":0,"256":0,"257":0,"258":0,"260":0,"261":0,"264":0,"265":0,"268":0,"271":0,"273":0,"283":0,"285":0,"286":0,"297":0,"298":0,"300":0,"302":0,"303":0,"306":0,"315":0,"317":0,"318":0,"328":0,"330":0,"331":0,"341":0,"343":0,"344":0,"354":0,"356":0,"357":0,"369":0,"370":0,"372":0,"373":0,"374":0,"386":0,"387":0,"389":0,"390":0,"391":0,"393":0,"407":0,"410":0,"412":0,"413":0,"418":0,"420":0,"421":0,"424":0,"426":0,"427":0,"428":0,"441":0,"442":0,"444":0,"457":0,"458":0,"460":0,"473":0,"474":0,"477":0,"478":0,"479":0,"480":0,"483":0,"486":0,"487":0,"490":0,"491":0,"493":0,"494":0,"497":0,"508":0,"510":0,"522":0,"524":0,"534":0,"536":0,"547":0,"548":0,"549":0,"551":0,"553":0,"554":0,"555":0,"559":0,"563":0,"565":0,"576":0,"578":0,"593":0,"594":0,"596":0,"607":0,"608":0,"611":0,"612":0,"613":0,"615":0,"617":0,"620":0,"623":0,"625":0,"627":0,"631":0,"633":0,"635":0,"636":0,"646":0,"648":0,"649":0,"651":0,"652":0,"666":0,"667":0,"669":0,"670":0,"673":0,"675":0,"676":0,"677":0,"678":0,"680":0,"681":0,"683":0,"684":0,"687":0,"690":0,"692":0,"693":0,"697":0,"699":0,"701":0,"703":0,"706":0,"709":0,"713":0,"716":0,"718":0,"720":0,"731":0,"733":0,"744":0,"746":0,"757":0,"758":0,"760":0,"761":0,"764":0,"778":0,"779":0,"780":0,"782":0,"783":0,"786":0,"791":0,"793":0,"794":0,"797":0,"798":0,"800":0,"801":0,"804":0,"806":0,"807":0,"810":0,"811":0,"812":0,"815":0,"816":0,"818":0,"819":0,"821":0,"822":0,"826":0,"828":0,"829":0,"831":0,"832":0,"837":0,"838":0,"841":0,"842":0,"845":0,"846":0,"851":0,"855":0};
_yuitest_coverage["/build/aui-tree-data/aui-tree-data.js"].functions = {"isTreeNode:33":0,"isTreeView:37":0,"initTreeData:112":0,"(anonymous 2):131":0,"destructor:128":0,"getNodeById:143":0,"isRegistered:156":0,"(anonymous 3):211":0,"updateReferences:170":0,"(anonymous 4):244":0,"refreshIndex:237":0,"registerNode:255":0,"updateIndex:282":0,"unregisterNode:296":0,"(anonymous 5):317":0,"collapseAll:314":0,"(anonymous 6):330":0,"expandAll:327":0,"(anonymous 7):343":0,"selectAll:340":0,"(anonymous 8):356":0,"unselectAll:353":0,"(anonymous 9):372":0,"eachChildren:368":0,"eachParent:385":0,"bubbleEvent:406":0,"createNode:440":0,"appendChild:456":0,"_appendChild:471":0,"item:507":0,"indexOf:521":0,"hasChildNodes:533":0,"(anonymous 10):554":0,"getChildren:546":0,"getChildrenLength:562":0,"getEventOutputMap:575":0,"removeChild:592":0,"_removeChild:605":0,"(anonymous 11):648":0,"empty:645":0,"(anonymous 12):692":0,"insert:665":0,"insertAfter:730":0,"insertBefore:743":0,"getNodeByChild:756":0,"(anonymous 14):831":0,"(anonymous 13):810":0,"_setChildren:777":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-tree-data/aui-tree-data.js"].coveredLines = 239;
_yuitest_coverage["/build/aui-tree-data/aui-tree-data.js"].coveredFunctions = 49;
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 1);
AUI.add('aui-tree-data', function(A) {
/**
 * The TreeData Utility
 *
 * @module aui-tree
 * @submodule aui-tree-data
 */

_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 9);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "isTreeNode", 33);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 34);
return ( v instanceof A.TreeNode );
	},

	isTreeView = function(v) {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "isTreeView", 37);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 38);
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

_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 64);
var TreeData = function () {};

_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 66);
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

_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 103);
A.mix(TreeData.prototype, {
	childrenLength: 0,

	/**
	 * Construction logic executed during TreeData instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initTreeData: function() {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "initTreeData", 112);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 113);
var instance = this;

		// binding on initializer, needed before .render() phase
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 116);
instance.publish('move');
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 117);
instance.publish('append', { defaultFn: instance._appendChild });
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 118);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "destructor", 128);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 129);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 131);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 2)", 131);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 132);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "getNodeById", 143);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 144);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 146);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "isRegistered", 156);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 157);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 159);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "updateReferences", 170);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 171);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 172);
var oldParent = node.get(PARENT_NODE);
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 173);
var oldOwnerTree = node.get(OWNER_TREE);
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 174);
var moved = oldParent && (oldParent !== parentNode);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 176);
if (oldParent) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 177);
if (moved) {
				// when moved update the oldParent children
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 179);
var children = oldParent.get(CHILDREN);

				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 181);
A.Array.removeItem(children, node);

				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 183);
oldParent.set(CHILDREN, children);
			}

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 186);
oldParent.unregisterNode(node);
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 189);
if (oldOwnerTree) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 190);
oldOwnerTree.unregisterNode(node);
		}

		// update parent reference when registered
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 194);
node.set(PARENT_NODE, parentNode);

		// update the ownerTree of the node
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 197);
node.set(OWNER_TREE, ownerTree);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 199);
if (parentNode) {
			// register the new node on the parentNode index
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 201);
parentNode.registerNode(node);
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 204);
if (ownerTree) {
			// register the new node to the ownerTree index
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 206);
ownerTree.registerNode(node);
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 209);
if (oldOwnerTree != ownerTree) {
			// when change the OWNER_TREE update the children references also
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 211);
node.eachChildren(function(child) {
				_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 3)", 211);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 212);
instance.updateReferences(child, child.get(PARENT_NODE), ownerTree);
			});
		}

		// trigger move event
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 217);
if (moved) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 218);
var output = instance.getEventOutputMap(node);

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 220);
if (!oldParent.get('children').length) {
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 221);
oldParent.collapse();
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 222);
oldParent.hideHitArea();
			}

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 225);
output.tree.oldParent = oldParent;
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 226);
output.tree.oldOwnerTree = oldOwnerTree;

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 228);
instance.bubbleEvent('move', output);
		}
	},

	/**
	 * Refresh the index (i.e. re-index all nodes).
	 *
	 * @method refreshIndex
	 */
	refreshIndex: function() {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "refreshIndex", 237);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 238);
var instance = this;

		// reset index
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 241);
instance.updateIndex({});

		// get all descendent children - deep
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 244);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 4)", 244);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 245);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "registerNode", 255);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 256);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 257);
var uid = node.get(ID);
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 258);
var index = instance.get(INDEX);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 260);
if (uid) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 261);
index[uid] = node;
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 264);
if (isTreeView(instance)) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 265);
node.addTarget(instance);

			// when the node is appended to the TreeView set the OWNER_TREE
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 268);
node.set(OWNER_TREE, instance);
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 271);
node._inheritOwnerTreeAttrs();

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 273);
instance.updateIndex(index);
	},

	/**
	 * Update the <a href="TreeData.html#config_index">index</a> attribute value.
	 *
	 * @method updateIndex
	 * @param {Object} index
	 */
	updateIndex: function(index) {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "updateIndex", 282);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 283);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 285);
if (index) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 286);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "unregisterNode", 296);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 297);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 298);
var index = instance.get(INDEX);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 300);
delete index[ node.get(ID) ];

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 302);
if (isTreeView(instance)) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 303);
node.removeTarget(instance);
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 306);
instance.updateIndex(index);
	},

	/**
	 * Collapse all children of the TreeData.
	 *
	 * @method collapseAll
	 */
	collapseAll: function() {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "collapseAll", 314);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 315);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 317);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 5)", 317);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 318);
node.collapse();
		}, true);
	},

	/**
	 * Expand all children of the TreeData.
	 *
	 * @method expandAll
	 */
	expandAll: function() {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "expandAll", 327);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 328);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 330);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 6)", 330);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 331);
node.expand();
		}, true);
	},

	/**
	 * Select all children of the TreeData.
	 *
	 * @method selectAll
	 */
	selectAll: function() {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "selectAll", 340);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 341);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 343);
instance.eachChildren(function(child) {
			_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 7)", 343);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 344);
child.select();
		}, true);
	},

	/**
	 * Unselect all children of the TreeData.
	 *
	 * @method selectAll
	 */
	unselectAll: function() {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "unselectAll", 353);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 354);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 356);
instance.eachChildren(function(child) {
			_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 8)", 356);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 357);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "eachChildren", 368);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 369);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 370);
var children = instance.getChildren(deep);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 372);
A.Array.each(children, function(node) {
			_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 9)", 372);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 373);
if (node) {
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 374);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "eachParent", 385);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 386);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 387);
var parentNode = instance.get(PARENT_NODE);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 389);
while (parentNode) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 390);
if (parentNode) {
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 391);
fn.call(instance, parentNode);
			}
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 393);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "bubbleEvent", 406);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 407);
var instance = this;

		// event.stopActionPropagation === undefined, invoke the event native action
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 410);
instance.fire(eventType, args);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 412);
if (!cancelBubbling) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 413);
var parentNode = instance.get(PARENT_NODE);

			// Avoid execution of the native action (private methods) while propagate
			// for example: private _appendChild() is invoked only on the first level of the bubbling
			// the intention is only invoke the user callback on parent nodes.
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 418);
args = args || {};

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 420);
if (isUndefined(stopActionPropagation)) {
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 421);
stopActionPropagation = true;
			}

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 424);
args.stopActionPropagation = stopActionPropagation;

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 426);
while(parentNode) {
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 427);
parentNode.fire(eventType, args);
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 428);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "createNode", 440);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 441);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 442);
var classType = A.TreeNode.nodeTypes[ isObject(options) ? options.type : options ] || A.TreeNode;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 444);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "appendChild", 456);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 457);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 458);
var output = instance.getEventOutputMap(node);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 460);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "_appendChild", 471);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 473);
if (event.stopActionPropagation) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 474);
return false;
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 477);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 478);
var node = event.tree.node;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 479);
var ownerTree = instance.get(OWNER_TREE);
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 480);
var children = instance.get(CHILDREN);

		// updateReferences first
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 483);
instance.updateReferences(node, instance, ownerTree);
		// and then set the children, to have the appendChild propagation
		// the PARENT_NODE references should be updated
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 486);
var length = children.push(node);
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 487);
instance.set(CHILDREN, children);

		// updating prev/nextSibling attributes
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 490);
var prevIndex = length - 2;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 491);
var prevSibling = instance.item(prevIndex);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 493);
node.set(NEXT_SIBLING, null);
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 494);
node.set(PREV_SIBLING, prevSibling);

		// render node
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 497);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "item", 507);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 508);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 510);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "indexOf", 521);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 522);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 524);
return A.Array.indexOf( instance.get(CHILDREN), node );
	},

	/**
	 * Whether the TreeData contains children or not.
	 *
	 * @method hasChildNodes
	 * @return {boolean}
	 */
	hasChildNodes: function() {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "hasChildNodes", 533);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 534);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 536);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "getChildren", 546);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 547);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 548);
var cNodes = [];
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 549);
var children = instance.get(CHILDREN);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 551);
cNodes = cNodes.concat(children);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 553);
if (deep) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 554);
instance.eachChildren(function(child) {
				_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 10)", 554);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 555);
cNodes = cNodes.concat( child.getChildren(deep) );
			});
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 559);
return cNodes;
	},

	getChildrenLength: function() {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "getChildrenLength", 562);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 563);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 565);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "getEventOutputMap", 575);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 576);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 578);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "removeChild", 592);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 593);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 594);
var output = instance.getEventOutputMap(node);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 596);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "_removeChild", 605);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 607);
if (event.stopActionPropagation) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 608);
return false;
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 611);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 612);
var node = event.tree.node;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 613);
var ownerTree = instance.get(OWNER_TREE);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 615);
if (instance.isRegistered(node)) {
			// update parent reference when removed
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 617);
node.set(PARENT_NODE, null);

			// unregister the node
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 620);
instance.unregisterNode(node);

			// no parent, no ownerTree
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 623);
node.set(OWNER_TREE, null);

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 625);
if (ownerTree) {
				// unregister the removed node from the tree index
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 627);
ownerTree.unregisterNode(node);
			}

			// remove child from the container
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 631);
node.get(BOUNDING_BOX).remove();

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 633);
var children = instance.get(CHILDREN);

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 635);
A.Array.removeItem(children, node);
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 636);
instance.set(CHILDREN, children);
		}
	},

	/**
	 * Delete all children of the current TreeData.
	 *
	 * @method empty
	 */
	empty: function() {
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "empty", 645);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 646);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 648);
instance.eachChildren(function(node) {
			_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 11)", 648);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 649);
var parentNode = node.get(PARENT_NODE);

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 651);
if (parentNode) {
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 652);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "insert", 665);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 666);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 667);
refTreeNode = refTreeNode || this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 669);
if (refTreeNode === treeNode) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 670);
return false; // NOTE: return
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 673);
var refParentTreeNode = refTreeNode.get(PARENT_NODE);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 675);
if (treeNode && refParentTreeNode) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 676);
var nodeBoundingBox = treeNode.get(BOUNDING_BOX);
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 677);
var refBoundingBox = refTreeNode.get(BOUNDING_BOX);
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 678);
var ownerTree = refTreeNode.get(OWNER_TREE);

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 680);
if (where === 'before') {
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 681);
refBoundingBox.placeBefore(nodeBoundingBox);
			}
			else {_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 683);
if (where === 'after') {
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 684);
refBoundingBox.placeAfter(nodeBoundingBox);
			}}

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 687);
var refSiblings = [];
			// using the YUI selector to regenerate the index based on the real dom
			// this avoid misscalculations on the nodes index number
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 690);
var DOMChildren = refParentTreeNode.get(BOUNDING_BOX).all('> ul > li');

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 692);
DOMChildren.each(function(child) {
				_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 12)", 692);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 693);
refSiblings.push( child.getData(TREE_NODE) );
			});

			// updating prev/nextSibling attributes
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 697);
var nextSiblingNode = nodeBoundingBox.get(NEXT_SIBLING);

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 699);
treeNode.set(NEXT_SIBLING, nextSiblingNode && nextSiblingNode.getData(TREE_NODE));

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 701);
var prevSiblingNode = nodeBoundingBox.get(PREVIOUS_SIBLING);

			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 703);
treeNode.set(PREV_SIBLING, prevSiblingNode && prevSiblingNode.getData(TREE_NODE));

			// update all references
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 706);
refTreeNode.updateReferences(treeNode, refParentTreeNode, ownerTree);

			// updating refParentTreeNode childTreeNodes
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 709);
refParentTreeNode.set(CHILDREN, refSiblings);
		}

		// render treeNode after it's inserted
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 713);
treeNode.render();

		// invoking insert event
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 716);
var output = refTreeNode.getEventOutputMap(treeNode);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 718);
output.tree.refTreeNode = refTreeNode;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 720);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "insertAfter", 730);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 731);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 733);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "insertBefore", 743);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 744);
var instance = this;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 746);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "getNodeByChild", 756);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 757);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 758);
var treeNodeEl = child.ancestor(DOT+CSS_TREE_NODE);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 760);
if (treeNodeEl) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 761);
return treeNodeEl.getData(TREE_NODE);
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 764);
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
		_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "_setChildren", 777);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 778);
var instance = this;
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 779);
var childNodes = [];
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 780);
var container = instance.get(CONTAINER);

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 782);
if (!container) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 783);
container = instance._createNodeContainer();
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 786);
instance.childrenLength = v.length;

		// before render the node, make sure the PARENT_NODE and OWNER_TREE references are updated
		// this is required on the render phase of the TreeNode (_createNodeContainer)
		// to propagate the events callback (appendChild/expand)
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 791);
var ownerTree = instance;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 793);
if (isTreeNode(instance)) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 794);
ownerTree = instance.get(OWNER_TREE);
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 797);
var hasOwnerTree = isTreeView(ownerTree);
		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 798);
var lazyLoad = true;

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 800);
if (hasOwnerTree) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 801);
lazyLoad = ownerTree.get(LAZY_LOAD);
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 804);
instance.updateIndex({});

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 806);
if (instance.childrenLength > 0) {
			_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 807);
instance.set(LEAF, false);
		}

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 810);
A.Array.each(v, function(node, index) {
			_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 13)", 810);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 811);
if (node) {
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 812);
if (!isTreeNode(node) && isObject(node)) {
					// cache and remove children to lazy add them later for
					// performance reasons
					_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 815);
var children = node[CHILDREN];
					_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 816);
var hasChildren = children && children.length;

					_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 818);
node[OWNER_TREE] = ownerTree;
					_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 819);
node[PARENT_NODE] = instance;

					_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 821);
if (hasChildren && lazyLoad) {
						_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 822);
delete node[CHILDREN];
					}

					// creating node from json
					_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 826);
node = instance.createNode(node);

					_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 828);
if (hasChildren && lazyLoad) {
						_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 829);
node.childrenLength = children.length;

						_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 831);
A.setTimeout(function() {
							_yuitest_coverfunc("/build/aui-tree-data/aui-tree-data.js", "(anonymous 14)", 831);
_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 832);
node.set(CHILDREN, children);
						}, 50);
					}
				}

				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 837);
if (hasOwnerTree) {
					_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 838);
ownerTree.registerNode(node);
				}

				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 841);
node._inheritOwnerTreeAttrs();
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 842);
node.render(instance.get(CONTAINER));

				// avoid duplicated children on the childNodes list
				_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 845);
if (A.Array.indexOf(childNodes, node) === -1) {
					_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 846);
childNodes.push(node);
				}
			}
		});

		_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 851);
return childNodes;
	}
});

_yuitest_coverline("/build/aui-tree-data/aui-tree-data.js", 855);
A.TreeData = TreeData;

}, '@VERSION@' ,{requires:['aui-base','aui-task-manager'], skinnable:false});
