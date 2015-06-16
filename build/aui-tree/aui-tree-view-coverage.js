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
_yuitest_coverage["/build/aui-tree-view/aui-tree-view.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-tree-view/aui-tree-view.js",
    code: []
};
_yuitest_coverage["/build/aui-tree-view/aui-tree-view.js"].code=["AUI.add('aui-tree-view', function(A) {","/**"," * The TreeView Utility"," *"," * @module aui-tree"," * @submodule aui-tree-view"," */","","var L = A.Lang,","	isBoolean = L.isBoolean,","	isString = L.isString,","","	UA = A.UA,","","	BOUNDING_BOX = 'boundingBox',","	CHILDREN = 'children',","	CONTAINER = 'container',","	CONTENT = 'content',","	CONTENT_BOX = 'contentBox',","	DOT = '.',","	FILE = 'file',","	HITAREA = 'hitarea',","	ICON = 'icon',","	LABEL = 'label',","	LAST_SELECTED = 'lastSelected',","	LEAF = 'leaf',","	NODE = 'node',","	OWNER_TREE = 'ownerTree',","	ROOT = 'root',","	SELECT_ON_TOGGLE = 'selectOnToggle',","	SPACE = ' ',","	TREE = 'tree',","	TREE_NODE = 'tree-node',","	TREE_VIEW = 'tree-view',","	TYPE = 'type',","	VIEW = 'view',","","	concat = function() {","		return Array.prototype.slice.call(arguments).join(SPACE);","	},","","	isTreeNode = function(v) {","		return ( v instanceof A.TreeNode );","	},","","	getCN = A.getClassName,","","	CSS_TREE_HITAREA = getCN(TREE, HITAREA),","	CSS_TREE_ICON = getCN(TREE, ICON),","	CSS_TREE_LABEL = getCN(TREE, LABEL),","	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),","	CSS_TREE_ROOT_CONTAINER = getCN(TREE, ROOT, CONTAINER),","	CSS_TREE_VIEW_CONTENT = getCN(TREE, VIEW, CONTENT);","","/**"," * <p><img src=\"assets/images/aui-tree-view/main.png\"/></p>"," *"," * A base class for TreeView, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var tree2 = new A.TreeView({"," *  	width: 200,"," *  	type: 'normal',"," *  	boundingBox: '#tree',"," *  	children: ["," *  		{ label: 'Folder 1', children: [ { label: 'file' }, { label: 'file' }, { label: 'file' } ] },"," *  		{ label: 'Folder 2', expanded: true, children: [ { label: 'file' }, { label: 'file' } ] },"," *  		{ label: 'Folder 3', children: [ { label: 'file' } ] },"," *  		{ label: 'Folder 4', expanded: true, children: [ { label: 'Folder 4-1', expanded: true, children: [ { label: 'file' } ] } ] }"," *  	]"," *  })"," *  .render();"," * </code></pre>"," *"," * Check the list of <a href=\"TreeView.html#configattributes\">Configuration Attributes</a> available for"," * TreeView."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeView"," * @constructor"," * @extends TreeData"," */","var TreeView = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeView.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_VIEW,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeView.","		 *","		 * @property TreeView.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Type of the treeview (i.e. could be 'file' or 'normal').","			 *","			 * @attribute type","			 * @default 'file'","			 * @type String","			 */","			type: {","				value: FILE,","				validator: isString","			},","","			/**","			 * Last selected TreeNode.","			 *","			 * @attribute lastSelected","			 * @default null","			 * @type TreeNode","			 */","			lastSelected: {","				value: null,","				validator: isTreeNode","			},","","			lazyLoad: {","				validator: isBoolean,","				value: true","			},","","			selectOnToggle: {","				validator: isBoolean,","				value: false","			}","		},","","		AUGMENTS: [A.TreeData, A.TreeViewPaginator, A.TreeViewIO],","","		prototype: {","			CONTENT_TEMPLATE: '<ul></ul>',","","			initializer: function() {","				var instance = this;","				var boundingBox = instance.get(BOUNDING_BOX);","				var contentBox = instance.get(CONTENT_BOX);","","				instance.set(CONTAINER, contentBox);","","				boundingBox.setData(TREE_VIEW, instance);","","				instance.initTreeData();","			},","","			/**","			 * Bind the events on the TreeView UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));","","				instance._delegateDOM();","			},","","			createNodes: function(nodes) {","				var instance = this;","","				A.Array.each(A.Array(nodes), function(node) {","					var newNode = instance.createNode(node);","","					instance.appendChild(newNode);","				});","","				instance._syncPaginatorUI(nodes);","			},","","			/**","			 * Create the DOM structure for the TreeView. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				instance._renderElements();","			},","","			/**","			 * Fires after set children.","			 *","			 * @method _afterSetChildren","			 * @param {EventFacade} event","			 * @protected","			 */","			_afterSetChildren: function(event) {","				var instance = this;","","				instance._syncPaginatorUI();","			},","","			/**","			 * Create TreeNode from HTML markup.","			 *","			 * @method _createFromHTMLMarkup","			 * @param {Node} container","			 * @protected","			 */","			_createFromHTMLMarkup: function(container) {","				var instance = this;","","				container.all('> li').each(function(node) {","					// use firstChild as label","					var labelEl = node.one('> *').remove();","					var label = labelEl.outerHTML();","","					var treeNode = new A.TreeNode({","						boundingBox: node,","						label: label","					});","","					var deepContainer = node.one('> ul');","","					if (deepContainer) {","						// if has deepContainer it's not a leaf","						treeNode.set(LEAF, false);","						treeNode.set(CONTAINER, deepContainer);","","						// render node before invoke the recursion","						treeNode.render();","","						// propagating markup recursion","						instance._createFromHTMLMarkup(deepContainer);","					}","					else {","						treeNode.render();","					}","","					// find the parent TreeNode...","					var parentNode = node.get(PARENT_NODE).get(PARENT_NODE);","					var parentInstance = parentNode.getData(TREE_NODE);","","					if (!A.instanceOf(parentInstance, A.TreeNode)) {","						parentInstance = parentNode.getData(TREE_VIEW);","					}","","					// and simulate the appendChild.","					parentInstance.appendChild(treeNode);","				});","			},","","			/**","			 * Render elements.","			 *","			 * @method _renderElements","			 * @protected","			 */","			_renderElements: function() {","				var instance = this;","				var contentBox = instance.get(CONTENT_BOX);","				var children = instance.get(CHILDREN);","				var type = instance.get(TYPE);","				var CSS_TREE_TYPE = getCN(TREE, type);","","				contentBox.addClass(CSS_TREE_VIEW_CONTENT);","","				contentBox.addClass(","					concat(CSS_TREE_TYPE, CSS_TREE_ROOT_CONTAINER)","				);","","				if (!children.length) {","					// if children not specified try to create from markup","					instance._createFromHTMLMarkup(contentBox);","				}","			},","","			/**","			 * Delegate events.","			 *","			 * @method _delegateDOM","			 * @protected","			 */","			_delegateDOM: function() {","				var instance = this;","","				var boundingBox = instance.get(BOUNDING_BOX);","","				// expand/collapse delegations","				boundingBox.delegate('click', A.bind(instance._onClickNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);","				boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_ICON);","				boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_LABEL);","				// other delegations","				boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);","				boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);","			},","","			/**","			 * Fires on click the TreeView (i.e. set the select/unselect state).","			 *","			 * @method _onClickNodeEl","			 * @param {EventFacade} event","			 * @protected","			 */","			_onClickNodeEl: function(event) {","				var instance = this;","","				var treeNode = instance.getNodeByChild( event.currentTarget );","","				if (treeNode) {","					if (event.target.test(DOT+CSS_TREE_HITAREA)) {","						treeNode.toggle();","","						if (!instance.get(SELECT_ON_TOGGLE)) {","							return;","						}","					}","","					if (!treeNode.isSelected()) {","						var lastSelected = instance.get(LAST_SELECTED);","","						// select drag node","						if (lastSelected) {","							lastSelected.unselect();","						}","","						treeNode.select();","					}","				}","			},","","			/**","			 * Fires on <code>mouseeneter</code> the TreeNode.","			 *","			 * @method _onMouseEnterNodeEl","			 * @param {EventFacade} event","			 * @protected","			 */","			_onMouseEnterNodeEl: function(event) {","				var instance = this;","				var treeNode = instance.getNodeByChild( event.currentTarget );","","				if (treeNode) {","					treeNode.over();","				}","			},","","			/**","			 * Fires on <code>mouseleave</code> the TreeNode.","			 *","			 * @method _onMouseLeaveNodeEl","			 * @param {EventFacade} event","			 * @protected","			 */","			_onMouseLeaveNodeEl: function(event) {","				var instance = this;","				var treeNode = instance.getNodeByChild( event.currentTarget );","","				if (treeNode) {","					treeNode.out();","				}","			},","","			/**","			 * Fires on <code>click</code> the TreeNode hitarea.","			 *","			 * @method _onClickHitArea","			 * @param {EventFacade} event","			 * @protected","			 */","			_onClickHitArea: function(event) {","				var instance = this;","				var treeNode = instance.getNodeByChild( event.currentTarget );","","				if (treeNode) {","					treeNode.toggle();","				}","			}","		}","	}",");","","A.TreeView = TreeView;","","/*","* TreeViewDD - Drag & Drop","*/","var isNumber = L.isNumber,","","	ABOVE = 'above',","	APPEND = 'append',","	BELOW = 'below',","	BLOCK = 'block',","	BODY = 'body',","	CLEARFIX = 'clearfix',","	DEFAULT = 'default',","	DISPLAY = 'display',","	DOWN = 'down',","	DRAG = 'drag',","	DRAGGABLE = 'draggable',","	DRAG_CURSOR = 'dragCursor',","	DRAG_NODE = 'dragNode',","	EXPANDED = 'expanded',","	HELPER = 'helper',","	INSERT = 'insert',","	OFFSET_HEIGHT = 'offsetHeight',","	PARENT_NODE = 'parentNode',","	SCROLL_DELAY = 'scrollDelay',","	STATE = 'state',","	TREE_DRAG_DROP = 'tree-drag-drop',","	UP = 'up',","","	DDM = A.DD.DDM,","","	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),","	CSS_ICON = getCN(ICON),","	CSS_TREE_DRAG_HELPER = getCN(TREE, DRAG, HELPER),","	CSS_TREE_DRAG_HELPER_CONTENT = getCN(TREE, DRAG, HELPER, CONTENT),","	CSS_TREE_DRAG_HELPER_LABEL = getCN(TREE, DRAG, HELPER, LABEL),","	CSS_TREE_DRAG_INSERT_ABOVE = getCN(TREE, DRAG, INSERT, ABOVE),","	CSS_TREE_DRAG_INSERT_APPEND = getCN(TREE, DRAG, INSERT, APPEND),","	CSS_TREE_DRAG_INSERT_BELOW = getCN(TREE, DRAG, INSERT, BELOW),","	CSS_TREE_DRAG_STATE_APPEND = getCN(TREE, DRAG, STATE, APPEND),","	CSS_TREE_DRAG_STATE_INSERT_ABOVE = getCN(TREE, DRAG, STATE, INSERT, ABOVE),","	CSS_TREE_DRAG_STATE_INSERT_BELOW = getCN(TREE, DRAG, STATE, INSERT, BELOW),","","	HELPER_TPL = '<div class=\"'+CSS_TREE_DRAG_HELPER+'\">'+","					'<div class=\"'+[CSS_TREE_DRAG_HELPER_CONTENT, CSS_HELPER_CLEARFIX].join(SPACE)+'\">'+","						'<span class=\"'+CSS_ICON+'\"></span>'+","						'<span class=\"'+CSS_TREE_DRAG_HELPER_LABEL+'\"></span>'+","					'</div>'+","				'</div>';","","/**"," * A base class for TreeViewDD, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>DragDrop support for the TreeNodes</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * Check the list of <a href=\"TreeViewDD.html#configattributes\">Configuration Attributes</a> available for"," * TreeViewDD."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class TreeViewDD"," * @constructor"," * @extends TreeView"," */","var TreeViewDD = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property TreeViewDD.NAME","		 * @type String","		 * @static","		 */","		NAME: TREE_DRAG_DROP,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the TreeViewDD.","		 *","		 * @property TreeViewDD.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			/**","			 * Dragdrop helper element.","			 *","			 * @attribute helper","			 * @default null","			 * @type Node | String","			 */","			helper: {","				value: null","			},","","			/**","			 * Delay of the scroll while dragging the TreeNodes.","			 *","			 * @attribute scrollDelay","			 * @default 100","			 * @type Number","			 */","			scrollDelay: {","				value: 100,","				validator: isNumber","			}","		},","","		EXTENDS: A.TreeView,","","		prototype: {","			/**","			 * Direction of the drag (i.e. could be 'up' or 'down').","			 *","			 * @property direction","			 * @type String","			 * @protected","			 */","			direction: BELOW,","","			/**","			 * Drop action (i.e. could be 'append', 'below' or 'above').","			 *","			 * @attribute dropAction","			 * @default null","			 * @type String","			 */","			dropAction: null,","","			/**","			 * Last Y.","			 *","			 * @attribute lastY","			 * @default 0","			 * @type Number","			 */","			lastY: 0,","","			node: null,","","			/**","			 * Reference for the current drop node.","			 *","			 * @attribute nodeContent","			 * @default null","			 * @type Node","			 */","			nodeContent: null,","","			/**","			 * Descructor lifecycle implementation for the TreeViewDD class.","			 * Purges events attached to the node (and all child nodes).","			 *","			 * @method destructor","			 * @protected","			 */","			destructor: function() {","				var instance = this;","				var helper = instance.get(HELPER);","","				if (helper) {","					helper.remove(true);","				}","","				if (instance.ddDelegate) {","					instance.ddDelegate.destroy();","				}","			},","","			/**","			 * Bind the events on the TreeViewDD UI. Lifecycle.","			 *","			 * @method bindUI","			 * @protected","			 */","			bindUI: function() {","				var instance = this;","","				A.TreeViewDD.superclass.bindUI.apply(this, arguments);","","				instance._bindDragDrop();","			},","","			/**","			 * Create the DOM structure for the TreeViewDD. Lifecycle.","			 *","			 * @method renderUI","			 * @protected","			 */","			renderUI: function() {","				var instance = this;","","				A.TreeViewDD.superclass.renderUI.apply(this, arguments);","","				// creating drag helper and hiding it","				var helper = A.Node.create(HELPER_TPL).hide();","","				// append helper to the body","				A.one(BODY).append(helper);","","				instance.set(HELPER, helper);","","				// set DRAG_CURSOR to the default arrow","				DDM.set(DRAG_CURSOR, DEFAULT);","			},","","			/**","			 * Setup DragDrop on the TreeNodes.","			 *","			 * @method _createDrag","			 * @param {Node} node","			 * @protected","			 */","			_createDrag: function(node) {","				var instance = this;","","				if (!instance.dragTimers) {","					instance.dragTimers = [];","				}","","				if (!DDM.getDrag(node)) {","					var dragTimers = instance.dragTimers;","					// dragDelay is a incremental delay for create the drag instances","					var dragDelay = 50 * dragTimers.length;","","					// wrapping the _createDrag on a setTimeout for performance reasons","					var timer = setTimeout(","						function() {","							if (!DDM.getDrag(node)) {","								// creating delayed drag instance","								var drag = new A.DD.Drag({","									bubbleTargets: instance,","									node: node,","									target: true","								})","								.plug(A.Plugin.DDProxy, {","									moveOnEnd: false,","									positionProxy: false,","									borderStyle: null","								})","								.plug(A.Plugin.DDNodeScroll, {","									scrollDelay: instance.get(SCROLL_DELAY),","									node: instance.get(BOUNDING_BOX)","								});","","								drag.removeInvalid('a');","							}","","							A.Array.removeItem(dragTimers, timer);","						},","						dragDelay","					);","","					dragTimers.push(timer);","				}","			},","","			/**","			 * Bind DragDrop events.","			 *","			 * @method _bindDragDrop","			 * @protected","			 */","			_bindDragDrop: function() {","				var instance = this;","","				var	boundingBox = instance.get(BOUNDING_BOX);","","				var	dragInitHandle = null;","","				instance._createDragInitHandler = function() {","					instance.ddDelegate = new A.DD.Delegate(","						{","							bubbleTargets: instance,","							container: boundingBox,","							nodes: DOT+CSS_TREE_NODE_CONTENT,","							target: true","						}","					);","","					var dd = instance.ddDelegate.dd;","","					dd.plug(A.Plugin.DDProxy, {","						moveOnEnd: false,","						positionProxy: false,","						borderStyle: null","					})","					.plug(A.Plugin.DDNodeScroll, {","						scrollDelay: instance.get(SCROLL_DELAY),","						node: boundingBox","					});","","					dd.removeInvalid('a');","","					if (dragInitHandle) {","						dragInitHandle.detach();","					}","","				};","","				// Check for mobile devices and execute _createDragInitHandler before events","				if (!UA.touch) {","					// only create the drag on the init elements if the user mouseover the boundingBox for init performance reasons","					dragInitHandle = boundingBox.on(['focus', 'mousedown', 'mousemove'], instance._createDragInitHandler);","				}","				else {","					instance._createDragInitHandler();","				}","","				// drag & drop listeners","				instance.on('drag:align', instance._onDragAlign);","				instance.on('drag:start', instance._onDragStart);","				instance.on('drop:exit', instance._onDropExit);","				instance.after('drop:hit', instance._afterDropHit);","				instance.on('drop:hit', instance._onDropHit);","				instance.on('drop:over', instance._onDropOver);","			},","","			/**","			 * Set the append CSS state on the passed <code>nodeContent</code>.","			 *","			 * @method _appendState","			 * @param {Node} nodeContent","			 * @protected","			 */","			_appendState: function(nodeContent) {","				var instance = this;","","				instance.dropAction = APPEND;","","				instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_APPEND);","","				nodeContent.addClass(CSS_TREE_DRAG_INSERT_APPEND);","			},","","			/**","			 * Set the going down CSS state on the passed <code>nodeContent</code>.","			 *","			 * @method _goingDownState","			 * @param {Node} nodeContent","			 * @protected","			 */","			_goingDownState: function(nodeContent) {","				var instance = this;","","				instance.dropAction = BELOW;","","				instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);","","				nodeContent.addClass(CSS_TREE_DRAG_INSERT_BELOW);","			},","","			/**","			 * Set the going up CSS state on the passed <code>nodeContent</code>.","			 *","			 * @method _goingUpState","			 * @param {Node} nodeContent","			 * @protected","			 */","			_goingUpState: function(nodeContent) {","				var instance = this;","","				instance.dropAction = ABOVE;","","				instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);","","				nodeContent.addClass(CSS_TREE_DRAG_INSERT_ABOVE);","			},","","			/**","			 * Set the reset CSS state on the passed <code>nodeContent</code>.","			 *","			 * @method _resetState","			 * @param {Node} nodeContent","			 * @protected","			 */","			_resetState: function(nodeContent) {","				var instance = this;","				var helper = instance.get(HELPER);","","				helper.removeClass(CSS_TREE_DRAG_STATE_APPEND);","				helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);","				helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);","","				if (nodeContent) {","					nodeContent.removeClass(CSS_TREE_DRAG_INSERT_ABOVE);","					nodeContent.removeClass(CSS_TREE_DRAG_INSERT_APPEND);","					nodeContent.removeClass(CSS_TREE_DRAG_INSERT_BELOW);","				}","			},","","			/**","			 * Update the CSS node state (i.e. going down, going up, append etc).","			 *","			 * @method _updateNodeState","			 * @param {EventFacade} event","			 * @protected","			 */","			_updateNodeState: function(event) {","				var instance = this;","				var drag = event.drag;","				var drop = event.drop;","				var nodeContent = drop.get(NODE);","				var dropNode = nodeContent.get(PARENT_NODE);","				var dragNode = drag.get(NODE).get(PARENT_NODE);","				var dropTreeNode = dropNode.getData(TREE_NODE);","","				// reset the classNames from the last nodeContent","				instance._resetState(instance.nodeContent);","","				// cannot drop the dragged element into any of its children","				// using DOM contains method for performance reason","				if ( !dragNode.contains(dropNode) ) {","					// nArea splits the height in 3 areas top/center/bottom","					// these areas are responsible for defining the state when the mouse is over any of them","					var nArea = nodeContent.get(OFFSET_HEIGHT) / 3;","					var yTop = nodeContent.getY();","					var yCenter = yTop + nArea;","					var yBottom = yTop + nArea*2;","					var mouseY = drag.mouseXY[1];","","					// UP: mouse on the top area of the node","					if ((mouseY > yTop) && (mouseY < yCenter)) {","						instance._goingUpState(nodeContent);","					}","					// DOWN: mouse on the bottom area of the node","					else if (mouseY > yBottom) {","						instance._goingDownState(nodeContent);","					}","					// APPEND: mouse on the center area of the node","					else if ((mouseY > yCenter) && (mouseY < yBottom)) {","						// if it's a folder set the state to append","						if (dropTreeNode && !dropTreeNode.isLeaf()) {","							instance._appendState(nodeContent);","						}","						// if it's a leaf we need to set the ABOVE or BELOW state instead of append","						else {","							if (instance.direction === UP) {","								instance._goingUpState(nodeContent);","							}","							else {","								instance._goingDownState(nodeContent);","							}","						}","					}","				}","","				instance.nodeContent = nodeContent;","			},","","			/**","			 * Fires after the append event.","			 *","			 * @method _handleEvent","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_afterAppend: function(event) {","				var instance = this;","				var treeNode = event.tree.node;","","				if (treeNode.get(DRAGGABLE)) {","					instance._createDrag( treeNode.get(CONTENT_BOX) );","				}","			},","","			/**","			 * Fires after the drop hit event.","			 *","			 * @method _afterDropHit","			 * @param {EventFacade} event drop hit event facade","			 * @protected","			 */","			_afterDropHit: function(event) {","				var instance = this;","				var dropAction = instance.dropAction;","				var dragNode = event.drag.get(NODE).get(PARENT_NODE);","				var dropNode = event.drop.get(NODE).get(PARENT_NODE);","","				var dropTreeNode = dropNode.getData(TREE_NODE);","				var dragTreeNode = dragNode.getData(TREE_NODE);","","				var output = instance.getEventOutputMap(instance);","","				output.tree.dropNode = dropTreeNode;","				output.tree.dragNode = dragTreeNode;","","				if (dropAction === ABOVE) {","					dropTreeNode.insertBefore(dragTreeNode);","","					instance.bubbleEvent('dropInsert', output);","				}","				else if (dropAction === BELOW) {","					dropTreeNode.insertAfter(dragTreeNode);","","					instance.bubbleEvent('dropInsert', output);","				}","				else if (dropAction === APPEND) {","					if (dropTreeNode && !dropTreeNode.isLeaf()) {","						dropTreeNode.appendChild(dragTreeNode);","","						if (!dropTreeNode.get(EXPANDED)) {","							// expand node when drop a child on it","							dropTreeNode.expand();","						}","","						instance.bubbleEvent('dropAppend', output);","					}","				}","","				instance._resetState(instance.nodeContent);","","				// bubbling drop event","				instance.bubbleEvent('drop', output);","","				instance.dropAction = null;","			},","","			/**","			 * Fires on drag align event.","			 *","			 * @method _onDragAlign","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDragAlign: function(event) {","				var instance = this;","				var lastY = instance.lastY;","				var y = event.target.lastXY[1];","","				// if the y change","				if (y !== lastY) {","					// set the drag direction","					instance.direction = (y < lastY) ? UP : DOWN;","				}","","				instance.lastY = y;","			},","","			/**","			 * Fires on drag start event.","			 *","			 * @method _onDragStart","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDragStart: function(event) {","				var instance = this;","				var drag = event.target;","				var dragNode = drag.get(NODE).get(PARENT_NODE);","				var dragTreeNode = dragNode.getData(TREE_NODE);","				var lastSelected = instance.get(LAST_SELECTED);","","				// select drag node","				if (lastSelected) {","					lastSelected.unselect();","				}","","				dragTreeNode.select();","","				// initialize drag helper","				var helper = instance.get(HELPER);","				var helperLabel = helper.one(DOT+CSS_TREE_DRAG_HELPER_LABEL);","","				// show helper, we need display block here, yui dd hide it with display none","				helper.setStyle(DISPLAY, BLOCK).show();","","				// set the CSS_TREE_DRAG_HELPER_LABEL html with the label of the dragged node","				helperLabel.html( dragTreeNode.get(LABEL) );","","				// update the DRAG_NODE with the new helper","				drag.set(DRAG_NODE, helper);","			},","","			/**","			 * Fires on drop over event.","			 *","			 * @method _onDropOver","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDropOver: function(event) {","				var instance = this;","","				instance._updateNodeState(event);","			},","","			/**","			 * Fires on drop hit event.","			 *","			 * @method _onDropHit","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDropHit: function(event) {","				var dropNode = event.drop.get(NODE).get(PARENT_NODE);","				var dropTreeNode = dropNode.getData(TREE_NODE);","","				if (!isTreeNode(dropTreeNode)) {","					event.preventDefault();","				}","			},","","			/**","			 * Fires on drop exit event.","			 *","			 * @method _onDropExit","			 * @param {EventFacade} event append event facade","			 * @protected","			 */","			_onDropExit: function() {","				var instance = this;","","				instance.dropAction = null;","","				instance._resetState(instance.nodeContent);","			}","		}","	}",");","","A.TreeViewDD = TreeViewDD;","","}, '@VERSION@' ,{requires:['aui-tree-node','aui-tree-paginator','dd-drag','dd-drop','dd-proxy'], skinnable:true});"];
_yuitest_coverage["/build/aui-tree-view/aui-tree-view.js"].lines = {"1":0,"9":0,"39":0,"43":0,"88":0,"149":0,"150":0,"151":0,"153":0,"155":0,"157":0,"167":0,"169":0,"171":0,"175":0,"177":0,"178":0,"180":0,"183":0,"193":0,"195":0,"206":0,"208":0,"219":0,"221":0,"223":0,"224":0,"226":0,"231":0,"233":0,"235":0,"236":0,"239":0,"242":0,"245":0,"249":0,"250":0,"252":0,"253":0,"257":0,"268":0,"269":0,"270":0,"271":0,"272":0,"274":0,"276":0,"280":0,"282":0,"293":0,"295":0,"298":0,"299":0,"300":0,"302":0,"303":0,"314":0,"316":0,"318":0,"319":0,"320":0,"322":0,"323":0,"327":0,"328":0,"331":0,"332":0,"335":0,"348":0,"349":0,"351":0,"352":0,"364":0,"365":0,"367":0,"368":0,"380":0,"381":0,"383":0,"384":0,"391":0,"396":0,"460":0,"553":0,"554":0,"556":0,"557":0,"560":0,"561":0,"572":0,"574":0,"576":0,"586":0,"588":0,"591":0,"594":0,"596":0,"599":0,"610":0,"612":0,"613":0,"616":0,"617":0,"619":0,"622":0,"624":0,"626":0,"641":0,"644":0,"649":0,"660":0,"662":0,"664":0,"666":0,"667":0,"676":0,"678":0,"688":0,"690":0,"691":0,"697":0,"699":0,"702":0,"706":0,"707":0,"708":0,"709":0,"710":0,"711":0,"722":0,"724":0,"726":0,"728":0,"739":0,"741":0,"743":0,"745":0,"756":0,"758":0,"760":0,"762":0,"773":0,"774":0,"776":0,"777":0,"778":0,"780":0,"781":0,"782":0,"783":0,"795":0,"796":0,"797":0,"798":0,"799":0,"800":0,"801":0,"804":0,"808":0,"811":0,"812":0,"813":0,"814":0,"815":0,"818":0,"819":0,"822":0,"823":0,"826":0,"828":0,"829":0,"833":0,"834":0,"837":0,"843":0,"854":0,"855":0,"857":0,"858":0,"870":0,"871":0,"872":0,"873":0,"875":0,"876":0,"878":0,"880":0,"881":0,"883":0,"884":0,"886":0,"888":0,"889":0,"891":0,"893":0,"894":0,"895":0,"897":0,"899":0,"902":0,"906":0,"909":0,"911":0,"922":0,"923":0,"924":0,"927":0,"929":0,"932":0,"943":0,"944":0,"945":0,"946":0,"947":0,"950":0,"951":0,"954":0,"957":0,"958":0,"961":0,"964":0,"967":0,"978":0,"980":0,"991":0,"992":0,"994":0,"995":0,"1007":0,"1009":0,"1011":0,"1017":0};
_yuitest_coverage["/build/aui-tree-view/aui-tree-view.js"].functions = {"concat:38":0,"isTreeNode:42":0,"initializer:148":0,"bindUI:166":0,"(anonymous 2):177":0,"createNodes:174":0,"renderUI:192":0,"_afterSetChildren:205":0,"(anonymous 3):221":0,"_createFromHTMLMarkup:218":0,"_renderElements:267":0,"_delegateDOM:292":0,"_onClickNodeEl:313":0,"_onMouseEnterNodeEl:347":0,"_onMouseLeaveNodeEl:363":0,"_onClickHitArea:379":0,"destructor:552":0,"bindUI:571":0,"renderUI:585":0,"(anonymous 4):623":0,"_createDrag:609":0,"_createDragInitHandler:666":0,"_bindDragDrop:659":0,"_appendState:721":0,"_goingDownState:738":0,"_goingUpState:755":0,"_resetState:772":0,"_updateNodeState:794":0,"_afterAppend:853":0,"_afterDropHit:869":0,"_onDragAlign:921":0,"_onDragStart:942":0,"_onDropOver:977":0,"_onDropHit:990":0,"_onDropExit:1006":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-tree-view/aui-tree-view.js"].coveredLines = 232;
_yuitest_coverage["/build/aui-tree-view/aui-tree-view.js"].coveredFunctions = 36;
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 1);
AUI.add('aui-tree-view', function(A) {
/**
 * The TreeView Utility
 *
 * @module aui-tree
 * @submodule aui-tree-view
 */

_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 9);
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
		_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "concat", 38);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 39);
return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isTreeNode = function(v) {
		_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "isTreeNode", 42);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 43);
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
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 88);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "initializer", 148);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 149);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 150);
var boundingBox = instance.get(BOUNDING_BOX);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 151);
var contentBox = instance.get(CONTENT_BOX);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 153);
instance.set(CONTAINER, contentBox);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 155);
boundingBox.setData(TREE_VIEW, instance);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 157);
instance.initTreeData();
			},

			/**
			 * Bind the events on the TreeView UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "bindUI", 166);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 167);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 169);
instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 171);
instance._delegateDOM();
			},

			createNodes: function(nodes) {
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "createNodes", 174);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 175);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 177);
A.Array.each(A.Array(nodes), function(node) {
					_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "(anonymous 2)", 177);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 178);
var newNode = instance.createNode(node);

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 180);
instance.appendChild(newNode);
				});

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 183);
instance._syncPaginatorUI(nodes);
			},

			/**
			 * Create the DOM structure for the TreeView. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "renderUI", 192);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 193);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 195);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_afterSetChildren", 205);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 206);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 208);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_createFromHTMLMarkup", 218);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 219);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 221);
container.all('> li').each(function(node) {
					// use firstChild as label
					_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "(anonymous 3)", 221);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 223);
var labelEl = node.one('> *').remove();
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 224);
var label = labelEl.outerHTML();

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 226);
var treeNode = new A.TreeNode({
						boundingBox: node,
						label: label
					});

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 231);
var deepContainer = node.one('> ul');

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 233);
if (deepContainer) {
						// if has deepContainer it's not a leaf
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 235);
treeNode.set(LEAF, false);
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 236);
treeNode.set(CONTAINER, deepContainer);

						// render node before invoke the recursion
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 239);
treeNode.render();

						// propagating markup recursion
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 242);
instance._createFromHTMLMarkup(deepContainer);
					}
					else {
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 245);
treeNode.render();
					}

					// find the parent TreeNode...
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 249);
var parentNode = node.get(PARENT_NODE).get(PARENT_NODE);
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 250);
var parentInstance = parentNode.getData(TREE_NODE);

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 252);
if (!A.instanceOf(parentInstance, A.TreeNode)) {
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 253);
parentInstance = parentNode.getData(TREE_VIEW);
					}

					// and simulate the appendChild.
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 257);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_renderElements", 267);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 268);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 269);
var contentBox = instance.get(CONTENT_BOX);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 270);
var children = instance.get(CHILDREN);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 271);
var type = instance.get(TYPE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 272);
var CSS_TREE_TYPE = getCN(TREE, type);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 274);
contentBox.addClass(CSS_TREE_VIEW_CONTENT);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 276);
contentBox.addClass(
					concat(CSS_TREE_TYPE, CSS_TREE_ROOT_CONTAINER)
				);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 280);
if (!children.length) {
					// if children not specified try to create from markup
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 282);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_delegateDOM", 292);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 293);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 295);
var boundingBox = instance.get(BOUNDING_BOX);

				// expand/collapse delegations
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 298);
boundingBox.delegate('click', A.bind(instance._onClickNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 299);
boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_ICON);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 300);
boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_LABEL);
				// other delegations
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 302);
boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 303);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_onClickNodeEl", 313);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 314);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 316);
var treeNode = instance.getNodeByChild( event.currentTarget );

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 318);
if (treeNode) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 319);
if (event.target.test(DOT+CSS_TREE_HITAREA)) {
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 320);
treeNode.toggle();

						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 322);
if (!instance.get(SELECT_ON_TOGGLE)) {
							_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 323);
return;
						}
					}

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 327);
if (!treeNode.isSelected()) {
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 328);
var lastSelected = instance.get(LAST_SELECTED);

						// select drag node
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 331);
if (lastSelected) {
							_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 332);
lastSelected.unselect();
						}

						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 335);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_onMouseEnterNodeEl", 347);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 348);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 349);
var treeNode = instance.getNodeByChild( event.currentTarget );

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 351);
if (treeNode) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 352);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_onMouseLeaveNodeEl", 363);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 364);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 365);
var treeNode = instance.getNodeByChild( event.currentTarget );

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 367);
if (treeNode) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 368);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_onClickHitArea", 379);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 380);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 381);
var treeNode = instance.getNodeByChild( event.currentTarget );

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 383);
if (treeNode) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 384);
treeNode.toggle();
				}
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 391);
A.TreeView = TreeView;

/*
* TreeViewDD - Drag & Drop
*/
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 396);
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
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 460);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "destructor", 552);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 553);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 554);
var helper = instance.get(HELPER);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 556);
if (helper) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 557);
helper.remove(true);
				}

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 560);
if (instance.ddDelegate) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 561);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "bindUI", 571);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 572);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 574);
A.TreeViewDD.superclass.bindUI.apply(this, arguments);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 576);
instance._bindDragDrop();
			},

			/**
			 * Create the DOM structure for the TreeViewDD. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "renderUI", 585);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 586);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 588);
A.TreeViewDD.superclass.renderUI.apply(this, arguments);

				// creating drag helper and hiding it
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 591);
var helper = A.Node.create(HELPER_TPL).hide();

				// append helper to the body
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 594);
A.one(BODY).append(helper);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 596);
instance.set(HELPER, helper);

				// set DRAG_CURSOR to the default arrow
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 599);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_createDrag", 609);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 610);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 612);
if (!instance.dragTimers) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 613);
instance.dragTimers = [];
				}

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 616);
if (!DDM.getDrag(node)) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 617);
var dragTimers = instance.dragTimers;
					// dragDelay is a incremental delay for create the drag instances
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 619);
var dragDelay = 50 * dragTimers.length;

					// wrapping the _createDrag on a setTimeout for performance reasons
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 622);
var timer = setTimeout(
						function() {
							_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "(anonymous 4)", 623);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 624);
if (!DDM.getDrag(node)) {
								// creating delayed drag instance
								_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 626);
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

								_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 641);
drag.removeInvalid('a');
							}

							_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 644);
A.Array.removeItem(dragTimers, timer);
						},
						dragDelay
					);

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 649);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_bindDragDrop", 659);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 660);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 662);
var	boundingBox = instance.get(BOUNDING_BOX);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 664);
var	dragInitHandle = null;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 666);
instance._createDragInitHandler = function() {
					_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_createDragInitHandler", 666);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 667);
instance.ddDelegate = new A.DD.Delegate(
						{
							bubbleTargets: instance,
							container: boundingBox,
							nodes: DOT+CSS_TREE_NODE_CONTENT,
							target: true
						}
					);

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 676);
var dd = instance.ddDelegate.dd;

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 678);
dd.plug(A.Plugin.DDProxy, {
						moveOnEnd: false,
						positionProxy: false,
						borderStyle: null
					})
					.plug(A.Plugin.DDNodeScroll, {
						scrollDelay: instance.get(SCROLL_DELAY),
						node: boundingBox
					});

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 688);
dd.removeInvalid('a');

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 690);
if (dragInitHandle) {
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 691);
dragInitHandle.detach();
					}

				};

				// Check for mobile devices and execute _createDragInitHandler before events
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 697);
if (!UA.touch) {
					// only create the drag on the init elements if the user mouseover the boundingBox for init performance reasons
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 699);
dragInitHandle = boundingBox.on(['focus', 'mousedown', 'mousemove'], instance._createDragInitHandler);
				}
				else {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 702);
instance._createDragInitHandler();
				}

				// drag & drop listeners
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 706);
instance.on('drag:align', instance._onDragAlign);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 707);
instance.on('drag:start', instance._onDragStart);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 708);
instance.on('drop:exit', instance._onDropExit);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 709);
instance.after('drop:hit', instance._afterDropHit);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 710);
instance.on('drop:hit', instance._onDropHit);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 711);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_appendState", 721);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 722);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 724);
instance.dropAction = APPEND;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 726);
instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_APPEND);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 728);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_goingDownState", 738);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 739);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 741);
instance.dropAction = BELOW;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 743);
instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 745);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_goingUpState", 755);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 756);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 758);
instance.dropAction = ABOVE;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 760);
instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 762);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_resetState", 772);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 773);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 774);
var helper = instance.get(HELPER);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 776);
helper.removeClass(CSS_TREE_DRAG_STATE_APPEND);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 777);
helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 778);
helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 780);
if (nodeContent) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 781);
nodeContent.removeClass(CSS_TREE_DRAG_INSERT_ABOVE);
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 782);
nodeContent.removeClass(CSS_TREE_DRAG_INSERT_APPEND);
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 783);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_updateNodeState", 794);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 795);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 796);
var drag = event.drag;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 797);
var drop = event.drop;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 798);
var nodeContent = drop.get(NODE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 799);
var dropNode = nodeContent.get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 800);
var dragNode = drag.get(NODE).get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 801);
var dropTreeNode = dropNode.getData(TREE_NODE);

				// reset the classNames from the last nodeContent
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 804);
instance._resetState(instance.nodeContent);

				// cannot drop the dragged element into any of its children
				// using DOM contains method for performance reason
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 808);
if ( !dragNode.contains(dropNode) ) {
					// nArea splits the height in 3 areas top/center/bottom
					// these areas are responsible for defining the state when the mouse is over any of them
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 811);
var nArea = nodeContent.get(OFFSET_HEIGHT) / 3;
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 812);
var yTop = nodeContent.getY();
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 813);
var yCenter = yTop + nArea;
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 814);
var yBottom = yTop + nArea*2;
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 815);
var mouseY = drag.mouseXY[1];

					// UP: mouse on the top area of the node
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 818);
if ((mouseY > yTop) && (mouseY < yCenter)) {
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 819);
instance._goingUpState(nodeContent);
					}
					// DOWN: mouse on the bottom area of the node
					else {_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 822);
if (mouseY > yBottom) {
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 823);
instance._goingDownState(nodeContent);
					}
					// APPEND: mouse on the center area of the node
					else {_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 826);
if ((mouseY > yCenter) && (mouseY < yBottom)) {
						// if it's a folder set the state to append
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 828);
if (dropTreeNode && !dropTreeNode.isLeaf()) {
							_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 829);
instance._appendState(nodeContent);
						}
						// if it's a leaf we need to set the ABOVE or BELOW state instead of append
						else {
							_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 833);
if (instance.direction === UP) {
								_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 834);
instance._goingUpState(nodeContent);
							}
							else {
								_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 837);
instance._goingDownState(nodeContent);
							}
						}
					}}}
				}

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 843);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_afterAppend", 853);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 854);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 855);
var treeNode = event.tree.node;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 857);
if (treeNode.get(DRAGGABLE)) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 858);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_afterDropHit", 869);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 870);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 871);
var dropAction = instance.dropAction;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 872);
var dragNode = event.drag.get(NODE).get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 873);
var dropNode = event.drop.get(NODE).get(PARENT_NODE);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 875);
var dropTreeNode = dropNode.getData(TREE_NODE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 876);
var dragTreeNode = dragNode.getData(TREE_NODE);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 878);
var output = instance.getEventOutputMap(instance);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 880);
output.tree.dropNode = dropTreeNode;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 881);
output.tree.dragNode = dragTreeNode;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 883);
if (dropAction === ABOVE) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 884);
dropTreeNode.insertBefore(dragTreeNode);

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 886);
instance.bubbleEvent('dropInsert', output);
				}
				else {_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 888);
if (dropAction === BELOW) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 889);
dropTreeNode.insertAfter(dragTreeNode);

					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 891);
instance.bubbleEvent('dropInsert', output);
				}
				else {_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 893);
if (dropAction === APPEND) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 894);
if (dropTreeNode && !dropTreeNode.isLeaf()) {
						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 895);
dropTreeNode.appendChild(dragTreeNode);

						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 897);
if (!dropTreeNode.get(EXPANDED)) {
							// expand node when drop a child on it
							_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 899);
dropTreeNode.expand();
						}

						_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 902);
instance.bubbleEvent('dropAppend', output);
					}
				}}}

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 906);
instance._resetState(instance.nodeContent);

				// bubbling drop event
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 909);
instance.bubbleEvent('drop', output);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 911);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_onDragAlign", 921);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 922);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 923);
var lastY = instance.lastY;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 924);
var y = event.target.lastXY[1];

				// if the y change
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 927);
if (y !== lastY) {
					// set the drag direction
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 929);
instance.direction = (y < lastY) ? UP : DOWN;
				}

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 932);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_onDragStart", 942);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 943);
var instance = this;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 944);
var drag = event.target;
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 945);
var dragNode = drag.get(NODE).get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 946);
var dragTreeNode = dragNode.getData(TREE_NODE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 947);
var lastSelected = instance.get(LAST_SELECTED);

				// select drag node
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 950);
if (lastSelected) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 951);
lastSelected.unselect();
				}

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 954);
dragTreeNode.select();

				// initialize drag helper
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 957);
var helper = instance.get(HELPER);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 958);
var helperLabel = helper.one(DOT+CSS_TREE_DRAG_HELPER_LABEL);

				// show helper, we need display block here, yui dd hide it with display none
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 961);
helper.setStyle(DISPLAY, BLOCK).show();

				// set the CSS_TREE_DRAG_HELPER_LABEL html with the label of the dragged node
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 964);
helperLabel.html( dragTreeNode.get(LABEL) );

				// update the DRAG_NODE with the new helper
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 967);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_onDropOver", 977);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 978);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 980);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_onDropHit", 990);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 991);
var dropNode = event.drop.get(NODE).get(PARENT_NODE);
				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 992);
var dropTreeNode = dropNode.getData(TREE_NODE);

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 994);
if (!isTreeNode(dropTreeNode)) {
					_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 995);
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
				_yuitest_coverfunc("/build/aui-tree-view/aui-tree-view.js", "_onDropExit", 1006);
_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 1007);
var instance = this;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 1009);
instance.dropAction = null;

				_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 1011);
instance._resetState(instance.nodeContent);
			}
		}
	}
);

_yuitest_coverline("/build/aui-tree-view/aui-tree-view.js", 1017);
A.TreeViewDD = TreeViewDD;

}, '@VERSION@' ,{requires:['aui-tree-node','aui-tree-paginator','dd-drag','dd-drop','dd-proxy'], skinnable:true});
