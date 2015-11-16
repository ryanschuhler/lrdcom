AUI().add(
	'event-onscreen',
	function(A) {
		A.Event.defineOnScreen = function(name) {
			var config = {
				detach: function(node, subscription, notifier) {
					var eventHandle = subscription._eventHandle;

					if (eventHandle) {
						eventHandle.detach();
					}
				},

				on: function(node, subscription, notifier) {
					var instance = this;

					if (node.attr('data-offset')) {
						var offsetObject = A.JSON.parse(node.attr('data-offset'));
					}

					if (offsetObject) {
						subscription._nodeOffset = offsetObject;
					}

					if (name == 'offscreenbottom') {
						instance._createEventHandle(node, subscription, notifier, instance._processOffScreenBottomEvent);
					}
					else if (name == 'offscreentop') {
						instance._createEventHandle(node, subscription, notifier, instance._processOffScreenTopEvent);
					}
					else if (name == 'onscreenbottom') {
						instance._createEventHandle(node, subscription, notifier, instance._processOnScreenBottomEvent);
					}
					else if (name == 'onscreentop') {
						instance._createEventHandle(node, subscription, notifier, instance._processOnScreenTopEvent);
					}
					else if (name == 'pastscreenbottom') {
						instance._createEventHandle(node, subscription, notifier, instance._processPastScreenBottomEvent);
					}
					else if (name == 'pastscreentop') {
						instance._createEventHandle(node, subscription, notifier, instance._processPastScreenTopEvent);
					}
					else if (name == 'beforescreenbottom') {
						instance._createEventHandle(node, subscription, notifier, instance._processBeforeScreenBottomEvent);
					}
					else if (name == 'beforescreentop') {
						instance._createEventHandle(node, subscription, notifier, instance._processBeforeScreenTopEvent);
					}
					else {
						instance._createEventHandle(node, subscription, notifier, instance._processOnScreenEvent);
					}
				},

				_createEventHandle: function(node, subscription, notifier, eventFunction) {
					var instance = this;

					subscription._eventHandle = A.on(
						['load', 'resize', 'scroll'],
						function(event) {
							var winPosition = instance._findWindowPosition();

							var nodePosition = instance._findNodePosition(node, subscription, event);

							eventFunction(winPosition, nodePosition, node, notifier);
						}
					);
				},

				_findNodePosition: function(node, subscription, event) {
					if (!subscription.nodePosition) {
						subscription.nodePosition = {}
					}

					var nodePosition = subscription.nodePosition;

					if (!event || (Object.keys(nodePosition).length == 0) || (event && (event.type != 'scroll'))) {
						nodePosition.top = node.getY();

						nodePosition.bottom = nodePosition.top + node.get('clientHeight');

						var offset = subscription._nodeOffset;

						if (offset && offset.top) {
							nodePosition.top += parseInt(offset.top);
						}

						if (offset && offset.bottom) {
							nodePosition.bottom += parseInt(offset.bottom);
						}
					}

					return nodePosition;
				},

				_findWindowPosition: function() {
					var WIN = A.getWin();

					var winPosition = {};

					winPosition.top = WIN.get('docScrollY');

					var winHeight = WIN.get('innerHeight');

					if (winHeight == undefined) {
						winHeight = document.documentElement.clientHeight;
					}

					winPosition.bottom = winPosition.top + winHeight;

					return winPosition;
				},

				_processBeforeScreenBottomEvent: function(winPosition, nodePosition, node, notifier) {
					if (winPosition.bottom > nodePosition.bottom) {
						notifier.fire(node);
					}
				},

				_processBeforeScreenTopEvent: function(winPosition, nodePosition, node, notifier) {
					if (winPosition.top > nodePosition.top) {
						notifier.fire(node);
					}
				},

				_processOffScreenBottomEvent: function(winPosition, nodePosition, node, notifier) {
					if (winPosition.bottom < nodePosition.top) {
						notifier.fire(node);
					}
				},

				_processOffScreenTopEvent: function(winPosition, nodePosition, node, notifier) {
					if (winPosition.top > nodePosition.bottom) {
						notifier.fire(node);
					}
				},

				_processOnScreenBottomEvent: function(winPosition, nodePosition, node, notifier) {
					if ((winPosition.bottom >= nodePosition.top) && (winPosition.bottom <= nodePosition.bottom)) {
						notifier.fire(node);
					}
				},

				_processOnScreenEvent: function(winPosition, nodePosition, node, notifier) {
					if ((winPosition.bottom >= nodePosition.top) && (winPosition.top <= nodePosition.bottom)) {
						notifier.fire(node);
					}
				},

				_processOnScreenTopEvent: function(winPosition, nodePosition, node, notifier) {
					if ((winPosition.top >= nodePosition.top) && (winPosition.top <= nodePosition.bottom)) {
						notifier.fire(node);
					}
				},

				_processPastScreenBottomEvent: function(winPosition, nodePosition, node, notifier) {
					if (winPosition.bottom <= nodePosition.bottom) {
						notifier.fire(node);
					}
				},

				_processPastScreenTopEvent: function(winPosition, nodePosition, node, notifier) {
					if (winPosition.top <= nodePosition.top) {
						notifier.fire(node);
					}
				}
			};

			A.Event.define(name, config);
		};

		A.Event.defineOnScreen('beforescreenbottom');
		A.Event.defineOnScreen('beforescreentop');
		A.Event.defineOnScreen('offscreenbottom');
		A.Event.defineOnScreen('offscreentop');
		A.Event.defineOnScreen('onscreen');
		A.Event.defineOnScreen('onscreenbottom');
		A.Event.defineOnScreen('onscreentop');
		A.Event.defineOnScreen('pastscreenbottom');
		A.Event.defineOnScreen('pastscreentop');
	},
	'',
	{
		requires: ['aui-base','event-synthetic', 'json-parse', 'yui-throttle']
	}
);