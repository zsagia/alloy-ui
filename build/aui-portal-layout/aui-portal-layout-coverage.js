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
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/aui-portal-layout/aui-portal-layout.js",
    code: []
};
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].code=["AUI.add('aui-portal-layout', function(A) {","/**"," * The PortalLayout Utility - Full documentation coming soon."," *"," * @module aui-portal-layout"," */","","var Lang = A.Lang,","	isBoolean = Lang.isBoolean,","	isFunction = Lang.isFunction,","	isObject = Lang.isObject,","	isString = Lang.isString,","	isValue = Lang.isValue,","","	toInt = Lang.toInt,","","	ceil = Math.ceil,","","	DDM = A.DD.DDM,","","	APPEND = 'append',","	CIRCLE = 'circle',","	COLUMN_CLASS = 'portlet-column',","	COLUMN_ITEM_CLASS = 'portlet-boundary',","	DELEGATE_CONFIG = 'delegateConfig',","	DOT = '.',","	DOWN = 'down',","	DRAG = 'drag',","	DRAG_NODE = 'dragNode',","	DRAG_NODES = 'dragNodes',","	DROP_CONTAINER = 'dropContainer',","	DROP_NODES = 'dropNodes',","	GROUPS = 'groups',","	ICON = 'icon',","	INDICATOR = 'indicator',","	L = 'l',","	LAZY_START = 'lazyStart',","	LEFT = 'left',","	MARGIN_BOTTOM = 'marginBottom',","	MARGIN_TOP = 'marginTop',","	NODE = 'node',","	OFFSET_HEIGHT = 'offsetHeight',","	OFFSET_WIDTH = 'offsetWidth',","	PLACEHOLDER = 'placeholder',","	PLACE_AFTER = 'placeAfter',","	PLACE_BEFORE = 'placeBefore',","	PORTAL_LAYOUT = 'portal-layout',","	PREPEND = 'prepend',","	PROXY = 'proxy',","	PROXY_NODE = 'proxyNode',","	R = 'r',","	REGION = 'region',","	RIGHT = 'right',","	SPACE = ' ',","	TARGET = 'target',","	TRIANGLE = 'triangle',","	UP = 'up',","","	EV_PLACEHOLDER_ALIGN = 'placeholderAlign',","	EV_QUADRANT_ENTER = 'quadrantEnter',","	EV_QUADRANT_EXIT = 'quadrantExit',","	EV_QUADRANT_OVER = 'quadrantOver',","","	// caching these values for performance","	PLACEHOLDER_MARGIN_BOTTOM = 0,","	PLACEHOLDER_MARGIN_TOP = 0,","	PLACEHOLDER_TARGET_MARGIN_BOTTOM = 0,","	PLACEHOLDER_TARGET_MARGIN_TOP = 0,","","	isNodeList = function(v) {","		return (v instanceof A.NodeList);","	},","","	concat = function() {","		return Array.prototype.slice.call(arguments).join(SPACE);","	},","","	nodeListSetter = function(val) {","		return isNodeList(val) ? val : A.all(val);","	},","","	getNumStyle = function(elem, styleName) {","		return toInt(elem.getStyle(styleName));","	},","","	getCN = A.getClassName,","","	CSS_DRAG_INDICATOR = getCN(PORTAL_LAYOUT, DRAG, INDICATOR),","	CSS_DRAG_INDICATOR_ICON = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON),","	CSS_DRAG_INDICATOR_ICON_LEFT = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON, LEFT),","	CSS_DRAG_INDICATOR_ICON_RIGHT = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON, RIGHT),","	CSS_DRAG_TARGET_INDICATOR = getCN(PORTAL_LAYOUT, DRAG, TARGET, INDICATOR),","	CSS_ICON = getCN(ICON),","	CSS_ICON_CIRCLE_TRIANGLE_L = getCN(ICON, CIRCLE, TRIANGLE, L),","	CSS_ICON_CIRCLE_TRIANGLE_R = getCN(ICON, CIRCLE, TRIANGLE, R),","","	TPL_PLACEHOLDER = '<div class=\"'+CSS_DRAG_INDICATOR+'\">' +","							'<div class=\"'+concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_LEFT, CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_R)+'\"></div>' +","							'<div class=\"'+concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_RIGHT, CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_L)+'\"></div>' +","						'<div>';","","/**"," * A base class for PortalLayout, providing:"," * <ul>"," *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>"," *    <li>DragDrop utility for drag lists, portal layouts (portlets)</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var portalLayout = new A.PortalLayout({"," *  	dragNodes: '.portlet',"," *  	dropNodes: '.column',"," *  	proxyNode: A.Node.create('<div class=\"aui-portal-layout-proxy\"></div>'),"," *  	lazyStart: true"," * </code></pre>"," *"," * Check the list of <a href=\"PortalLayout.html#configattributes\">Configuration Attributes</a> available for"," * PortalLayout."," *"," * @param config {Object} Object literal specifying widget configuration properties."," *"," * @class PortalLayout"," * @constructor"," * @extends Base"," */","var PortalLayout = A.Component.create(","	{","		/**","		 * Static property provides a string to identify the class.","		 *","		 * @property PortalLayout.NAME","		 * @type String","		 * @static","		 */","		NAME: PORTAL_LAYOUT,","","		/**","		 * Static property used to define the default attribute","		 * configuration for the PortalLayout.","		 *","		 * @property PortalLayout.ATTRS","		 * @type Object","		 * @static","		 */","		ATTRS: {","			delegateConfig: {","				value: null,","				setter: function(val) {","					var instance = this;","","					var config = A.merge(","						{","							bubbleTargets: instance,","							dragConfig: {},","							nodes: instance.get(DRAG_NODES),","							target: true","						},","						val","					);","","					A.mix(config.dragConfig, {","						groups: instance.get(GROUPS),","						startCentered: true","					});","","					return config;","				},","				validator: isObject","			},","","			proxyNode: {","				setter: function(val) {","					return isString(val) ? A.Node.create(val) : val;","				}","			},","","			dragNodes: {","				validator: isString","			},","","			dropContainer: {","				value: function(dropNode) {","					return dropNode;","				},","				validator: isFunction","			},","","			dropNodes: {","				setter: '_setDropNodes'","			},","","			groups: {","				value: [PORTAL_LAYOUT]","			},","","			lazyStart: {","				value: false,","				validator: isBoolean","			},","","			placeholder: {","				value: TPL_PLACEHOLDER,","				setter: function(val) {","					var placeholder = isString(val) ? A.Node.create(val) : val;","","					if (!placeholder.inDoc()) {","						A.getBody().prepend(","							placeholder.hide()","						);","					}","","					PLACEHOLDER_MARGIN_BOTTOM = getNumStyle(placeholder, MARGIN_BOTTOM);","					PLACEHOLDER_MARGIN_TOP = getNumStyle(placeholder, MARGIN_TOP);","","					placeholder.addClass(CSS_DRAG_TARGET_INDICATOR);","","					PLACEHOLDER_TARGET_MARGIN_BOTTOM = getNumStyle(placeholder, MARGIN_BOTTOM);","					PLACEHOLDER_TARGET_MARGIN_TOP = getNumStyle(placeholder, MARGIN_TOP);","","					return placeholder;","				}","			},","","			proxy: {","				value: null,","				setter: function(val) {","					var instance = this;","","					var defaults = {","						moveOnEnd: false,","						positionProxy: false","					};","","					// if proxyNode is set remove the border from the default proxy","					if (instance.get(PROXY_NODE)) {","						defaults.borderStyle = null;","					}","","					return A.merge(defaults, val || {});","				}","			}","		},","","		EXTENDS: A.Base,","","		prototype: {","			/**","			 * Construction logic executed during PortalLayout instantiation. Lifecycle.","			 *","			 * @method initializer","			 * @protected","			 */","			initializer: function() {","				var instance = this;","","				instance.bindUI();","			},","","			bindUI: function() {","				var instance = this;","","				// publishing placeholderAlign event","				instance.publish(EV_PLACEHOLDER_ALIGN, {","		            defaultFn: instance._defPlaceholderAlign,","		            queuable: false,","		            emitFacade: true,","		            bubbles: true","		        });","","				instance._bindDDEvents();","				instance._bindDropZones();","			},","","			/*","			* Methods","			*/","			addDropNode: function(node, config) {","				var instance = this;","","				node = A.one(node);","","				if (!DDM.getDrop(node)) {","					instance.addDropTarget(","						// Do not use DropPlugin to create the DropZones on","                        // this component, the \".drop\" namespace is used to check","                        // for the DD.Delegate target nodes","						new A.DD.Drop(","							A.merge(","								{","									bubbleTargets: instance,","									groups: instance.get(GROUPS),","									node: node","								},","								config","							)","						)","					);","				}","			},","","			addDropTarget: function(drop) {","				var instance = this;","","				drop.addToGroup(","					instance.get(GROUPS)","				);","			},","","			alignPlaceholder: function(region, isTarget) {","				var instance = this;","				var placeholder = instance.get(PLACEHOLDER);","","				if (!instance.lazyEvents) {","					placeholder.show();","				}","","				// sync placeholder size","				instance._syncPlaceholderSize();","","				placeholder.setXY(","					instance.getPlaceholderXY(region, isTarget)","				);","			},","","			calculateDirections: function(drag) {","				var instance = this;","				var lastY = instance.lastY;","				var lastX = instance.lastX;","","				var x = drag.lastXY[0];","				var y = drag.lastXY[1];","","				// if the x change","				if (x != lastX) {","					// set the drag direction","					instance.XDirection = (x < lastX) ? LEFT : RIGHT;","				}","","				// if the y change","				if (y != lastY) {","					// set the drag direction","					instance.YDirection = (y < lastY) ? UP : DOWN;","				}","","				instance.lastX = x;","				instance.lastY = y;","			},","","			calculateQuadrant: function(drag, drop) {","				var instance = this;","				var quadrant = 1;","				var dropNode = drop.get(NODE);","				var region = dropNode.get(REGION);","				var mouseXY = drag.mouseXY;","				var mouseX = mouseXY[0];","				var mouseY = mouseXY[1];","","				var top = region.top;","				var left = region.left;","","				if (dropNode.hasClass(COLUMN_CLASS)) {","					var portletsInColumn = dropNode.all(DOT + COLUMN_ITEM_CLASS);","","					if (!portletsInColumn.isEmpty()) {","						var lastPortletInColumn = portletsInColumn.item(portletsInColumn.size() - 1);","","						region.bottom = lastPortletInColumn.get(REGION).bottom;","					}","					else {","						region.bottom = top;","					}","				}","","				// (region.bottom - top) finds the height of the region","				var vCenter = top + (region.bottom - top)/2;","				// (region.right - left) finds the width of the region","				var hCenter = left + (region.right - left)/2;","","				if (mouseY < vCenter) {","					quadrant = (mouseX > hCenter) ? 1 : 2;","				}","				else {","					quadrant = (mouseX < hCenter) ? 3 : 4;","				}","","				instance.quadrant = quadrant;","","				return quadrant;","			},","","			getPlaceholderXY: function(region, isTarget) {","				var instance = this;","				var placeholder = instance.get(PLACEHOLDER);","				var marginBottom = PLACEHOLDER_MARGIN_BOTTOM;","				var marginTop = PLACEHOLDER_MARGIN_TOP;","","				if (isTarget) {","					// update the margin values in case of the target placeholder has a different margin","					marginBottom = PLACEHOLDER_TARGET_MARGIN_BOTTOM;","					marginTop = PLACEHOLDER_TARGET_MARGIN_TOP;","				}","","				// update the className of the placeholder when interact with target (drag/drop) elements","				placeholder.toggleClass(CSS_DRAG_TARGET_INDICATOR, isTarget);","","				var regionBottom = ceil(region.bottom);","				var regionLeft = ceil(region.left);","				var regionTop = ceil(region.top);","","				var x = regionLeft;","","				// 1 and 2 quadrants are the top quadrants, so align to the region.top when quadrant < 3","				var y = (instance.quadrant < 3) ?","							(regionTop - (placeholder.get(OFFSET_HEIGHT) + marginBottom)) : (regionBottom + marginTop);","","				return [ x, y ];","			},","","			removeDropTarget: function(drop) {","				var instance = this;","","				drop.removeFromGroup(","					instance.get(GROUPS)","				);","			},","","			_alignCondition: function() {","				var instance = this;","				var activeDrag = DDM.activeDrag;","				var activeDrop = instance.activeDrop;","","				if (activeDrag && activeDrop) {","					var dragNode = activeDrag.get(NODE);","					var dropNode = activeDrop.get(NODE);","","					return !dragNode.contains(dropNode);","				}","","				return true;","			},","","			_bindDDEvents: function() {","				var instance = this;","				var delegateConfig = instance.get(DELEGATE_CONFIG);","				var proxy = instance.get(PROXY);","","				// creating DD.Delegate instance","				instance.delegate = new A.DD.Delegate(delegateConfig);","","				// plugging the DDProxy","				instance.delegate.dd.plug(A.Plugin.DDProxy, proxy);","","				instance.on('drag:end', A.bind(instance._onDragEnd, instance));","				instance.on('drag:enter', A.bind(instance._onDragEnter, instance));","				instance.on('drag:exit', A.bind(instance._onDragExit, instance));","				instance.on('drag:over', A.bind(instance._onDragOver, instance));","				instance.on('drag:start', A.bind(instance._onDragStart, instance));","				instance.after('drag:start', A.bind(instance._afterDragStart, instance));","","				instance.on(EV_QUADRANT_ENTER, instance._syncPlaceholderUI);","				instance.on(EV_QUADRANT_EXIT, instance._syncPlaceholderUI);","			},","","			_bindDropZones: function() {","				var instance = this;","				var dropNodes = instance.get(DROP_NODES);","","				if (dropNodes) {","					dropNodes.each(function(node, i) {","						instance.addDropNode(node);","					});","				}","			},","","			_defPlaceholderAlign: function(event) {","				var instance = this;","				var activeDrop = instance.activeDrop;","				var placeholder = instance.get(PLACEHOLDER);","","				if (activeDrop && placeholder) {","					var node = activeDrop.get('node');","					// DD.Delegate use the Drop Plugin on its \"target\" items. Using Drop Plugin a \"node.drop\" namespace is created.","					// Using the .drop namespace to detect when the node is also a \"target\" DD.Delegate node","					var isTarget = !!node.drop;","","					instance.lastAlignDrop = activeDrop;","","					instance.alignPlaceholder(","						activeDrop.get(NODE).get(REGION),","						isTarget","					);","				}","			},","","			_evOutput: function() {","				var instance = this;","","				return {","					drag: DDM.activeDrag,","					drop: instance.activeDrop,","					quadrant: instance.quadrant,","					XDirection: instance.XDirection,","					YDirection: instance.YDirection","				};","			},","","			_fireQuadrantEvents: function() {","				var instance = this;","				var evOutput = instance._evOutput();","				var lastQuadrant = instance.lastQuadrant;","				var quadrant = instance.quadrant;","","				if (quadrant != lastQuadrant) {","					// only trigger exit if it has previously entered in any quadrant","					if (lastQuadrant) {","						// merging event with the \"last\" information","						instance.fire(","							EV_QUADRANT_EXIT,","							A.merge(","								{","									lastDrag: instance.lastDrag,","									lastDrop: instance.lastDrop,","									lastQuadrant: instance.lastQuadrant,","									lastXDirection: instance.lastXDirection,","									lastYDirection: instance.lastYDirection","								},","								evOutput","							)","						);","					}","","					// firing EV_QUADRANT_ENTER event","					instance.fire(EV_QUADRANT_ENTER, evOutput);","				}","","				// firing EV_QUADRANT_OVER, align event fires like the drag over without bubbling for performance reasons","				instance.fire(EV_QUADRANT_OVER, evOutput);","","				// updating \"last\" information","				instance.lastDrag = DDM.activeDrag;","				instance.lastDrop = instance.activeDrop;","				instance.lastQuadrant = quadrant;","				instance.lastXDirection = instance.XDirection;","				instance.lastYDirection = instance.YDirection;","			},","","			_getAppendNode: function() {","				return DDM.activeDrag.get(NODE);","			},","","			_positionNode: function(event) {","				var instance = this;","				var activeDrop = instance.lastAlignDrop || instance.activeDrop;","","				if (activeDrop) {","					var dragNode = instance._getAppendNode();","					var dropNode = activeDrop.get(NODE);","","					// detects if the activeDrop is a dd target (portlet) or a drop area only (column)","					// DD.Delegate use the Drop Plugin on its \"target\" items. Using Drop Plugin a \"node.drop\" namespace is created.","					// Using the .drop namespace to detect when the node is also a \"target\" DD.Delegate node","					var isTarget = isValue(dropNode.drop);","					var topQuadrants = (instance.quadrant < 3);","","					if (instance._alignCondition()) {","						if (isTarget) {","							dropNode[ topQuadrants ? PLACE_BEFORE : PLACE_AFTER ](dragNode);","						}","						// interacting with the columns (drop areas only)","						else {","							// find the dropContainer of the dropNode, the default DROP_CONTAINER function returns the dropNode","							var dropContainer = instance.get(DROP_CONTAINER).apply(instance, [dropNode]);","","							dropContainer[ topQuadrants ? PREPEND : APPEND ](dragNode);","						}","					}","				}","			},","","			_syncPlaceholderUI: function(event) {","				var instance = this;","","				if (instance._alignCondition()) {","					// firing placeholderAlign event","					instance.fire(EV_PLACEHOLDER_ALIGN, {","						drop: instance.activeDrop,","						originalEvent: event","					});","				}","			},","","			_syncPlaceholderSize: function() {","				var instance = this;","				var node = instance.activeDrop.get(NODE);","","				var placeholder = instance.get(PLACEHOLDER);","","				if (placeholder) {","					placeholder.set(","						OFFSET_WIDTH,","						node.get(OFFSET_WIDTH)","					);","				}","			},","","			_syncProxyNodeUI: function(event) {","				var instance = this;","				var dragNode = DDM.activeDrag.get(DRAG_NODE);","				var proxyNode = instance.get(PROXY_NODE);","","				if (proxyNode && !proxyNode.compareTo(dragNode)) {","					dragNode.append(proxyNode);","","					instance._syncProxyNodeSize();","				}","			},","","			_syncProxyNodeSize: function() {","				var instance = this;","				var node = DDM.activeDrag.get(NODE);","				var proxyNode = instance.get(PROXY_NODE);","","				if (node && proxyNode) {","					proxyNode.set(","						OFFSET_HEIGHT,","						node.get(OFFSET_HEIGHT)","					);","","					proxyNode.set(","						OFFSET_WIDTH,","						node.get(OFFSET_WIDTH)","					);","				}","			},","","			/*","			* Listeners","			*/","			_afterDragStart: function(event) {","				var instance = this;","","				if (instance.get(PROXY)) {","					instance._syncProxyNodeUI(event);","				}","			},","","			_onDragEnd: function(event) {","				var instance = this;","				var placeholder = instance.get(PLACEHOLDER);","				var proxyNode = instance.get(PROXY_NODE);","","				if (!instance.lazyEvents) {","					instance._positionNode(event);","				}","","				if (proxyNode) {","					proxyNode.remove();","				}","","				if (placeholder) {","					placeholder.hide();","				}","","				// reset the last information","				instance.lastQuadrant = null;","				instance.lastXDirection = null;","				instance.lastYDirection = null;","			},","","			// fires after drag:start","			_onDragEnter: function(event) {","				var instance = this;","","				instance.activeDrop = DDM.activeDrop;","","				// check if lazyEvents is true and if there is a lastActiveDrop","				// the checking for lastActiveDrop prevents fire the _syncPlaceholderUI when quadrant* events fires","				if (instance.lazyEvents && instance.lastActiveDrop) {","					instance.lazyEvents = false;","","					instance._syncPlaceholderUI(event);","				}","","				// lastActiveDrop is always updated by the drag exit,","				// but if there is no lastActiveDrop update it on drag enter update it","				if (!instance.lastActiveDrop) {","					instance.lastActiveDrop = DDM.activeDrop;","				}","			},","","			_onDragExit: function(event) {","				var instance = this;","","				instance._syncPlaceholderUI(event);","","				instance.activeDrop = DDM.activeDrop;","","				instance.lastActiveDrop = DDM.activeDrop;","			},","","			_onDragOver: function(event) {","				var instance = this;","				var drag = event.drag;","","				// prevent drag over bubbling, filtering the top most element","				if (instance.activeDrop == DDM.activeDrop) {","					instance.calculateDirections(drag);","","					instance.calculateQuadrant(drag, instance.activeDrop);","","					instance._fireQuadrantEvents();","				}","			},","","			// fires before drag:enter","			_onDragStart: function(event) {","				var instance = this;","","				if (instance.get(LAZY_START)) {","					instance.lazyEvents = true;","				}","","				instance.lastActiveDrop = null;","","				instance.activeDrop = DDM.activeDrop;","			},","","			_setDropNodes: function(val) {","				var instance = this;","","				if (isFunction(val)) {","					val = val.call(instance);","				}","","				return nodeListSetter(val);","			}","		}","	}",");","","A.PortalLayout = PortalLayout;","","}, '@VERSION@' ,{requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy'], skinnable:true});"];
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].lines = {"1":0,"8":0,"71":0,"75":0,"79":0,"83":0,"127":0,"150":0,"152":0,"162":0,"167":0,"174":0,"184":0,"205":0,"207":0,"208":0,"213":0,"214":0,"216":0,"218":0,"219":0,"221":0,"228":0,"230":0,"236":0,"237":0,"240":0,"255":0,"257":0,"261":0,"264":0,"271":0,"272":0,"279":0,"281":0,"283":0,"284":0,"303":0,"305":0,"311":0,"312":0,"314":0,"315":0,"319":0,"321":0,"327":0,"328":0,"329":0,"331":0,"332":0,"335":0,"337":0,"341":0,"343":0,"346":0,"347":0,"351":0,"352":0,"353":0,"354":0,"355":0,"356":0,"357":0,"359":0,"360":0,"362":0,"363":0,"365":0,"366":0,"368":0,"371":0,"376":0,"378":0,"380":0,"381":0,"384":0,"387":0,"389":0,"393":0,"394":0,"395":0,"396":0,"398":0,"400":0,"401":0,"405":0,"407":0,"408":0,"409":0,"411":0,"414":0,"417":0,"421":0,"423":0,"429":0,"430":0,"431":0,"433":0,"434":0,"435":0,"437":0,"440":0,"444":0,"445":0,"446":0,"449":0,"452":0,"454":0,"455":0,"456":0,"457":0,"458":0,"459":0,"461":0,"462":0,"466":0,"467":0,"469":0,"470":0,"471":0,"477":0,"478":0,"479":0,"481":0,"482":0,"485":0,"487":0,"489":0,"497":0,"499":0,"509":0,"510":0,"511":0,"512":0,"514":0,"516":0,"518":0,"534":0,"538":0,"541":0,"542":0,"543":0,"544":0,"545":0,"549":0,"553":0,"554":0,"556":0,"557":0,"558":0,"563":0,"564":0,"566":0,"567":0,"568":0,"573":0,"575":0,"582":0,"584":0,"586":0,"594":0,"595":0,"597":0,"599":0,"600":0,"608":0,"609":0,"610":0,"612":0,"613":0,"615":0,"620":0,"621":0,"622":0,"624":0,"625":0,"630":0,"641":0,"643":0,"644":0,"649":0,"650":0,"651":0,"653":0,"654":0,"657":0,"658":0,"661":0,"662":0,"666":0,"667":0,"668":0,"673":0,"675":0,"679":0,"680":0,"682":0,"687":0,"688":0,"693":0,"695":0,"697":0,"699":0,"703":0,"704":0,"707":0,"708":0,"710":0,"712":0,"718":0,"720":0,"721":0,"724":0,"726":0,"730":0,"732":0,"733":0,"736":0,"742":0};
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].functions = {"isNodeList:70":0,"concat:74":0,"nodeListSetter:78":0,"getNumStyle:82":0,"setter:149":0,"setter:173":0,"value:183":0,"setter:204":0,"setter:227":0,"initializer:254":0,"bindUI:260":0,"addDropNode:278":0,"addDropTarget:302":0,"alignPlaceholder:310":0,"calculateDirections:326":0,"calculateQuadrant:350":0,"getPlaceholderXY:392":0,"removeDropTarget:420":0,"_alignCondition:428":0,"_bindDDEvents:443":0,"(anonymous 2):470":0,"_bindDropZones:465":0,"_defPlaceholderAlign:476":0,"_evOutput:496":0,"_fireQuadrantEvents:508":0,"_getAppendNode:548":0,"_positionNode:552":0,"_syncPlaceholderUI:581":0,"_syncPlaceholderSize:593":0,"_syncProxyNodeUI:607":0,"_syncProxyNodeSize:619":0,"_afterDragStart:640":0,"_onDragEnd:648":0,"_onDragEnter:672":0,"_onDragExit:692":0,"_onDragOver:702":0,"_onDragStart:717":0,"_setDropNodes:729":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].coveredLines = 219;
_yuitest_coverage["/build/aui-portal-layout/aui-portal-layout.js"].coveredFunctions = 39;
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 1);
AUI.add('aui-portal-layout', function(A) {
/**
 * The PortalLayout Utility - Full documentation coming soon.
 *
 * @module aui-portal-layout
 */

_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 8);
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isValue = Lang.isValue,

	toInt = Lang.toInt,

	ceil = Math.ceil,

	DDM = A.DD.DDM,

	APPEND = 'append',
	CIRCLE = 'circle',
	COLUMN_CLASS = 'portlet-column',
	COLUMN_ITEM_CLASS = 'portlet-boundary',
	DELEGATE_CONFIG = 'delegateConfig',
	DOT = '.',
	DOWN = 'down',
	DRAG = 'drag',
	DRAG_NODE = 'dragNode',
	DRAG_NODES = 'dragNodes',
	DROP_CONTAINER = 'dropContainer',
	DROP_NODES = 'dropNodes',
	GROUPS = 'groups',
	ICON = 'icon',
	INDICATOR = 'indicator',
	L = 'l',
	LAZY_START = 'lazyStart',
	LEFT = 'left',
	MARGIN_BOTTOM = 'marginBottom',
	MARGIN_TOP = 'marginTop',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	PLACEHOLDER = 'placeholder',
	PLACE_AFTER = 'placeAfter',
	PLACE_BEFORE = 'placeBefore',
	PORTAL_LAYOUT = 'portal-layout',
	PREPEND = 'prepend',
	PROXY = 'proxy',
	PROXY_NODE = 'proxyNode',
	R = 'r',
	REGION = 'region',
	RIGHT = 'right',
	SPACE = ' ',
	TARGET = 'target',
	TRIANGLE = 'triangle',
	UP = 'up',

	EV_PLACEHOLDER_ALIGN = 'placeholderAlign',
	EV_QUADRANT_ENTER = 'quadrantEnter',
	EV_QUADRANT_EXIT = 'quadrantExit',
	EV_QUADRANT_OVER = 'quadrantOver',

	// caching these values for performance
	PLACEHOLDER_MARGIN_BOTTOM = 0,
	PLACEHOLDER_MARGIN_TOP = 0,
	PLACEHOLDER_TARGET_MARGIN_BOTTOM = 0,
	PLACEHOLDER_TARGET_MARGIN_TOP = 0,

	isNodeList = function(v) {
		_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "isNodeList", 70);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 71);
return (v instanceof A.NodeList);
	},

	concat = function() {
		_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "concat", 74);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 75);
return Array.prototype.slice.call(arguments).join(SPACE);
	},

	nodeListSetter = function(val) {
		_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "nodeListSetter", 78);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 79);
return isNodeList(val) ? val : A.all(val);
	},

	getNumStyle = function(elem, styleName) {
		_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "getNumStyle", 82);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 83);
return toInt(elem.getStyle(styleName));
	},

	getCN = A.getClassName,

	CSS_DRAG_INDICATOR = getCN(PORTAL_LAYOUT, DRAG, INDICATOR),
	CSS_DRAG_INDICATOR_ICON = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON),
	CSS_DRAG_INDICATOR_ICON_LEFT = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON, LEFT),
	CSS_DRAG_INDICATOR_ICON_RIGHT = getCN(PORTAL_LAYOUT, DRAG, INDICATOR, ICON, RIGHT),
	CSS_DRAG_TARGET_INDICATOR = getCN(PORTAL_LAYOUT, DRAG, TARGET, INDICATOR),
	CSS_ICON = getCN(ICON),
	CSS_ICON_CIRCLE_TRIANGLE_L = getCN(ICON, CIRCLE, TRIANGLE, L),
	CSS_ICON_CIRCLE_TRIANGLE_R = getCN(ICON, CIRCLE, TRIANGLE, R),

	TPL_PLACEHOLDER = '<div class="'+CSS_DRAG_INDICATOR+'">' +
							'<div class="'+concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_LEFT, CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_R)+'"></div>' +
							'<div class="'+concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_RIGHT, CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_L)+'"></div>' +
						'<div>';

/**
 * A base class for PortalLayout, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>DragDrop utility for drag lists, portal layouts (portlets)</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var portalLayout = new A.PortalLayout({
 *  	dragNodes: '.portlet',
 *  	dropNodes: '.column',
 *  	proxyNode: A.Node.create('<div class="aui-portal-layout-proxy"></div>'),
 *  	lazyStart: true
 * </code></pre>
 *
 * Check the list of <a href="PortalLayout.html#configattributes">Configuration Attributes</a> available for
 * PortalLayout.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class PortalLayout
 * @constructor
 * @extends Base
 */
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 127);
var PortalLayout = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property PortalLayout.NAME
		 * @type String
		 * @static
		 */
		NAME: PORTAL_LAYOUT,

		/**
		 * Static property used to define the default attribute
		 * configuration for the PortalLayout.
		 *
		 * @property PortalLayout.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			delegateConfig: {
				value: null,
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "setter", 149);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 150);
var instance = this;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 152);
var config = A.merge(
						{
							bubbleTargets: instance,
							dragConfig: {},
							nodes: instance.get(DRAG_NODES),
							target: true
						},
						val
					);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 162);
A.mix(config.dragConfig, {
						groups: instance.get(GROUPS),
						startCentered: true
					});

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 167);
return config;
				},
				validator: isObject
			},

			proxyNode: {
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "setter", 173);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 174);
return isString(val) ? A.Node.create(val) : val;
				}
			},

			dragNodes: {
				validator: isString
			},

			dropContainer: {
				value: function(dropNode) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "value", 183);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 184);
return dropNode;
				},
				validator: isFunction
			},

			dropNodes: {
				setter: '_setDropNodes'
			},

			groups: {
				value: [PORTAL_LAYOUT]
			},

			lazyStart: {
				value: false,
				validator: isBoolean
			},

			placeholder: {
				value: TPL_PLACEHOLDER,
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "setter", 204);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 205);
var placeholder = isString(val) ? A.Node.create(val) : val;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 207);
if (!placeholder.inDoc()) {
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 208);
A.getBody().prepend(
							placeholder.hide()
						);
					}

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 213);
PLACEHOLDER_MARGIN_BOTTOM = getNumStyle(placeholder, MARGIN_BOTTOM);
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 214);
PLACEHOLDER_MARGIN_TOP = getNumStyle(placeholder, MARGIN_TOP);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 216);
placeholder.addClass(CSS_DRAG_TARGET_INDICATOR);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 218);
PLACEHOLDER_TARGET_MARGIN_BOTTOM = getNumStyle(placeholder, MARGIN_BOTTOM);
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 219);
PLACEHOLDER_TARGET_MARGIN_TOP = getNumStyle(placeholder, MARGIN_TOP);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 221);
return placeholder;
				}
			},

			proxy: {
				value: null,
				setter: function(val) {
					_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "setter", 227);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 228);
var instance = this;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 230);
var defaults = {
						moveOnEnd: false,
						positionProxy: false
					};

					// if proxyNode is set remove the border from the default proxy
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 236);
if (instance.get(PROXY_NODE)) {
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 237);
defaults.borderStyle = null;
					}

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 240);
return A.merge(defaults, val || {});
				}
			}
		},

		EXTENDS: A.Base,

		prototype: {
			/**
			 * Construction logic executed during PortalLayout instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			initializer: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "initializer", 254);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 255);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 257);
instance.bindUI();
			},

			bindUI: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "bindUI", 260);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 261);
var instance = this;

				// publishing placeholderAlign event
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 264);
instance.publish(EV_PLACEHOLDER_ALIGN, {
		            defaultFn: instance._defPlaceholderAlign,
		            queuable: false,
		            emitFacade: true,
		            bubbles: true
		        });

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 271);
instance._bindDDEvents();
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 272);
instance._bindDropZones();
			},

			/*
			* Methods
			*/
			addDropNode: function(node, config) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "addDropNode", 278);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 279);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 281);
node = A.one(node);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 283);
if (!DDM.getDrop(node)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 284);
instance.addDropTarget(
						// Do not use DropPlugin to create the DropZones on
                        // this component, the ".drop" namespace is used to check
                        // for the DD.Delegate target nodes
						new A.DD.Drop(
							A.merge(
								{
									bubbleTargets: instance,
									groups: instance.get(GROUPS),
									node: node
								},
								config
							)
						)
					);
				}
			},

			addDropTarget: function(drop) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "addDropTarget", 302);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 303);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 305);
drop.addToGroup(
					instance.get(GROUPS)
				);
			},

			alignPlaceholder: function(region, isTarget) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "alignPlaceholder", 310);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 311);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 312);
var placeholder = instance.get(PLACEHOLDER);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 314);
if (!instance.lazyEvents) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 315);
placeholder.show();
				}

				// sync placeholder size
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 319);
instance._syncPlaceholderSize();

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 321);
placeholder.setXY(
					instance.getPlaceholderXY(region, isTarget)
				);
			},

			calculateDirections: function(drag) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "calculateDirections", 326);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 327);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 328);
var lastY = instance.lastY;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 329);
var lastX = instance.lastX;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 331);
var x = drag.lastXY[0];
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 332);
var y = drag.lastXY[1];

				// if the x change
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 335);
if (x != lastX) {
					// set the drag direction
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 337);
instance.XDirection = (x < lastX) ? LEFT : RIGHT;
				}

				// if the y change
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 341);
if (y != lastY) {
					// set the drag direction
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 343);
instance.YDirection = (y < lastY) ? UP : DOWN;
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 346);
instance.lastX = x;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 347);
instance.lastY = y;
			},

			calculateQuadrant: function(drag, drop) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "calculateQuadrant", 350);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 351);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 352);
var quadrant = 1;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 353);
var dropNode = drop.get(NODE);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 354);
var region = dropNode.get(REGION);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 355);
var mouseXY = drag.mouseXY;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 356);
var mouseX = mouseXY[0];
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 357);
var mouseY = mouseXY[1];

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 359);
var top = region.top;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 360);
var left = region.left;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 362);
if (dropNode.hasClass(COLUMN_CLASS)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 363);
var portletsInColumn = dropNode.all(DOT + COLUMN_ITEM_CLASS);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 365);
if (!portletsInColumn.isEmpty()) {
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 366);
var lastPortletInColumn = portletsInColumn.item(portletsInColumn.size() - 1);

						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 368);
region.bottom = lastPortletInColumn.get(REGION).bottom;
					}
					else {
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 371);
region.bottom = top;
					}
				}

				// (region.bottom - top) finds the height of the region
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 376);
var vCenter = top + (region.bottom - top)/2;
				// (region.right - left) finds the width of the region
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 378);
var hCenter = left + (region.right - left)/2;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 380);
if (mouseY < vCenter) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 381);
quadrant = (mouseX > hCenter) ? 1 : 2;
				}
				else {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 384);
quadrant = (mouseX < hCenter) ? 3 : 4;
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 387);
instance.quadrant = quadrant;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 389);
return quadrant;
			},

			getPlaceholderXY: function(region, isTarget) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "getPlaceholderXY", 392);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 393);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 394);
var placeholder = instance.get(PLACEHOLDER);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 395);
var marginBottom = PLACEHOLDER_MARGIN_BOTTOM;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 396);
var marginTop = PLACEHOLDER_MARGIN_TOP;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 398);
if (isTarget) {
					// update the margin values in case of the target placeholder has a different margin
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 400);
marginBottom = PLACEHOLDER_TARGET_MARGIN_BOTTOM;
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 401);
marginTop = PLACEHOLDER_TARGET_MARGIN_TOP;
				}

				// update the className of the placeholder when interact with target (drag/drop) elements
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 405);
placeholder.toggleClass(CSS_DRAG_TARGET_INDICATOR, isTarget);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 407);
var regionBottom = ceil(region.bottom);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 408);
var regionLeft = ceil(region.left);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 409);
var regionTop = ceil(region.top);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 411);
var x = regionLeft;

				// 1 and 2 quadrants are the top quadrants, so align to the region.top when quadrant < 3
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 414);
var y = (instance.quadrant < 3) ?
							(regionTop - (placeholder.get(OFFSET_HEIGHT) + marginBottom)) : (regionBottom + marginTop);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 417);
return [ x, y ];
			},

			removeDropTarget: function(drop) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "removeDropTarget", 420);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 421);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 423);
drop.removeFromGroup(
					instance.get(GROUPS)
				);
			},

			_alignCondition: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_alignCondition", 428);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 429);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 430);
var activeDrag = DDM.activeDrag;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 431);
var activeDrop = instance.activeDrop;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 433);
if (activeDrag && activeDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 434);
var dragNode = activeDrag.get(NODE);
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 435);
var dropNode = activeDrop.get(NODE);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 437);
return !dragNode.contains(dropNode);
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 440);
return true;
			},

			_bindDDEvents: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_bindDDEvents", 443);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 444);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 445);
var delegateConfig = instance.get(DELEGATE_CONFIG);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 446);
var proxy = instance.get(PROXY);

				// creating DD.Delegate instance
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 449);
instance.delegate = new A.DD.Delegate(delegateConfig);

				// plugging the DDProxy
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 452);
instance.delegate.dd.plug(A.Plugin.DDProxy, proxy);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 454);
instance.on('drag:end', A.bind(instance._onDragEnd, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 455);
instance.on('drag:enter', A.bind(instance._onDragEnter, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 456);
instance.on('drag:exit', A.bind(instance._onDragExit, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 457);
instance.on('drag:over', A.bind(instance._onDragOver, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 458);
instance.on('drag:start', A.bind(instance._onDragStart, instance));
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 459);
instance.after('drag:start', A.bind(instance._afterDragStart, instance));

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 461);
instance.on(EV_QUADRANT_ENTER, instance._syncPlaceholderUI);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 462);
instance.on(EV_QUADRANT_EXIT, instance._syncPlaceholderUI);
			},

			_bindDropZones: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_bindDropZones", 465);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 466);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 467);
var dropNodes = instance.get(DROP_NODES);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 469);
if (dropNodes) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 470);
dropNodes.each(function(node, i) {
						_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "(anonymous 2)", 470);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 471);
instance.addDropNode(node);
					});
				}
			},

			_defPlaceholderAlign: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_defPlaceholderAlign", 476);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 477);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 478);
var activeDrop = instance.activeDrop;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 479);
var placeholder = instance.get(PLACEHOLDER);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 481);
if (activeDrop && placeholder) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 482);
var node = activeDrop.get('node');
					// DD.Delegate use the Drop Plugin on its "target" items. Using Drop Plugin a "node.drop" namespace is created.
					// Using the .drop namespace to detect when the node is also a "target" DD.Delegate node
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 485);
var isTarget = !!node.drop;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 487);
instance.lastAlignDrop = activeDrop;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 489);
instance.alignPlaceholder(
						activeDrop.get(NODE).get(REGION),
						isTarget
					);
				}
			},

			_evOutput: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_evOutput", 496);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 497);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 499);
return {
					drag: DDM.activeDrag,
					drop: instance.activeDrop,
					quadrant: instance.quadrant,
					XDirection: instance.XDirection,
					YDirection: instance.YDirection
				};
			},

			_fireQuadrantEvents: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_fireQuadrantEvents", 508);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 509);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 510);
var evOutput = instance._evOutput();
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 511);
var lastQuadrant = instance.lastQuadrant;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 512);
var quadrant = instance.quadrant;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 514);
if (quadrant != lastQuadrant) {
					// only trigger exit if it has previously entered in any quadrant
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 516);
if (lastQuadrant) {
						// merging event with the "last" information
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 518);
instance.fire(
							EV_QUADRANT_EXIT,
							A.merge(
								{
									lastDrag: instance.lastDrag,
									lastDrop: instance.lastDrop,
									lastQuadrant: instance.lastQuadrant,
									lastXDirection: instance.lastXDirection,
									lastYDirection: instance.lastYDirection
								},
								evOutput
							)
						);
					}

					// firing EV_QUADRANT_ENTER event
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 534);
instance.fire(EV_QUADRANT_ENTER, evOutput);
				}

				// firing EV_QUADRANT_OVER, align event fires like the drag over without bubbling for performance reasons
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 538);
instance.fire(EV_QUADRANT_OVER, evOutput);

				// updating "last" information
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 541);
instance.lastDrag = DDM.activeDrag;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 542);
instance.lastDrop = instance.activeDrop;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 543);
instance.lastQuadrant = quadrant;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 544);
instance.lastXDirection = instance.XDirection;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 545);
instance.lastYDirection = instance.YDirection;
			},

			_getAppendNode: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_getAppendNode", 548);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 549);
return DDM.activeDrag.get(NODE);
			},

			_positionNode: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_positionNode", 552);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 553);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 554);
var activeDrop = instance.lastAlignDrop || instance.activeDrop;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 556);
if (activeDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 557);
var dragNode = instance._getAppendNode();
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 558);
var dropNode = activeDrop.get(NODE);

					// detects if the activeDrop is a dd target (portlet) or a drop area only (column)
					// DD.Delegate use the Drop Plugin on its "target" items. Using Drop Plugin a "node.drop" namespace is created.
					// Using the .drop namespace to detect when the node is also a "target" DD.Delegate node
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 563);
var isTarget = isValue(dropNode.drop);
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 564);
var topQuadrants = (instance.quadrant < 3);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 566);
if (instance._alignCondition()) {
						_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 567);
if (isTarget) {
							_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 568);
dropNode[ topQuadrants ? PLACE_BEFORE : PLACE_AFTER ](dragNode);
						}
						// interacting with the columns (drop areas only)
						else {
							// find the dropContainer of the dropNode, the default DROP_CONTAINER function returns the dropNode
							_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 573);
var dropContainer = instance.get(DROP_CONTAINER).apply(instance, [dropNode]);

							_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 575);
dropContainer[ topQuadrants ? PREPEND : APPEND ](dragNode);
						}
					}
				}
			},

			_syncPlaceholderUI: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_syncPlaceholderUI", 581);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 582);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 584);
if (instance._alignCondition()) {
					// firing placeholderAlign event
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 586);
instance.fire(EV_PLACEHOLDER_ALIGN, {
						drop: instance.activeDrop,
						originalEvent: event
					});
				}
			},

			_syncPlaceholderSize: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_syncPlaceholderSize", 593);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 594);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 595);
var node = instance.activeDrop.get(NODE);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 597);
var placeholder = instance.get(PLACEHOLDER);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 599);
if (placeholder) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 600);
placeholder.set(
						OFFSET_WIDTH,
						node.get(OFFSET_WIDTH)
					);
				}
			},

			_syncProxyNodeUI: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_syncProxyNodeUI", 607);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 608);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 609);
var dragNode = DDM.activeDrag.get(DRAG_NODE);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 610);
var proxyNode = instance.get(PROXY_NODE);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 612);
if (proxyNode && !proxyNode.compareTo(dragNode)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 613);
dragNode.append(proxyNode);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 615);
instance._syncProxyNodeSize();
				}
			},

			_syncProxyNodeSize: function() {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_syncProxyNodeSize", 619);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 620);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 621);
var node = DDM.activeDrag.get(NODE);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 622);
var proxyNode = instance.get(PROXY_NODE);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 624);
if (node && proxyNode) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 625);
proxyNode.set(
						OFFSET_HEIGHT,
						node.get(OFFSET_HEIGHT)
					);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 630);
proxyNode.set(
						OFFSET_WIDTH,
						node.get(OFFSET_WIDTH)
					);
				}
			},

			/*
			* Listeners
			*/
			_afterDragStart: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_afterDragStart", 640);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 641);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 643);
if (instance.get(PROXY)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 644);
instance._syncProxyNodeUI(event);
				}
			},

			_onDragEnd: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragEnd", 648);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 649);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 650);
var placeholder = instance.get(PLACEHOLDER);
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 651);
var proxyNode = instance.get(PROXY_NODE);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 653);
if (!instance.lazyEvents) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 654);
instance._positionNode(event);
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 657);
if (proxyNode) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 658);
proxyNode.remove();
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 661);
if (placeholder) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 662);
placeholder.hide();
				}

				// reset the last information
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 666);
instance.lastQuadrant = null;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 667);
instance.lastXDirection = null;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 668);
instance.lastYDirection = null;
			},

			// fires after drag:start
			_onDragEnter: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragEnter", 672);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 673);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 675);
instance.activeDrop = DDM.activeDrop;

				// check if lazyEvents is true and if there is a lastActiveDrop
				// the checking for lastActiveDrop prevents fire the _syncPlaceholderUI when quadrant* events fires
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 679);
if (instance.lazyEvents && instance.lastActiveDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 680);
instance.lazyEvents = false;

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 682);
instance._syncPlaceholderUI(event);
				}

				// lastActiveDrop is always updated by the drag exit,
				// but if there is no lastActiveDrop update it on drag enter update it
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 687);
if (!instance.lastActiveDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 688);
instance.lastActiveDrop = DDM.activeDrop;
				}
			},

			_onDragExit: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragExit", 692);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 693);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 695);
instance._syncPlaceholderUI(event);

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 697);
instance.activeDrop = DDM.activeDrop;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 699);
instance.lastActiveDrop = DDM.activeDrop;
			},

			_onDragOver: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragOver", 702);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 703);
var instance = this;
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 704);
var drag = event.drag;

				// prevent drag over bubbling, filtering the top most element
				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 707);
if (instance.activeDrop == DDM.activeDrop) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 708);
instance.calculateDirections(drag);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 710);
instance.calculateQuadrant(drag, instance.activeDrop);

					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 712);
instance._fireQuadrantEvents();
				}
			},

			// fires before drag:enter
			_onDragStart: function(event) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_onDragStart", 717);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 718);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 720);
if (instance.get(LAZY_START)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 721);
instance.lazyEvents = true;
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 724);
instance.lastActiveDrop = null;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 726);
instance.activeDrop = DDM.activeDrop;
			},

			_setDropNodes: function(val) {
				_yuitest_coverfunc("/build/aui-portal-layout/aui-portal-layout.js", "_setDropNodes", 729);
_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 730);
var instance = this;

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 732);
if (isFunction(val)) {
					_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 733);
val = val.call(instance);
				}

				_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 736);
return nodeListSetter(val);
			}
		}
	}
);

_yuitest_coverline("/build/aui-portal-layout/aui-portal-layout.js", 742);
A.PortalLayout = PortalLayout;

}, '@VERSION@' ,{requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy'], skinnable:true});
