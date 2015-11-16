AUI.add(
	'pop-up',
	function(A) {
		var PopUp = A.Component.create(
			{
				ATTRS: {
					activateCallback: {
						value: null
					},

					baseClassName: {
						value: 'pop-up'
					},

					centered: {
						value: true
					},

					deactivateCallback: {
						value: null
					},

					defaultCallbacks: {
						value: true
					},

					overlayDisplay: {
						value: true
					},

					overlayZIndex: {
						value: 100
					},

					popUp: {
						value: null
					},

					trigger: {
						value: '.pop-up-trigger'
					}
				},

				NAME: 'pop-up',

				prototype: {
					bindUI: function() {
						var instance = this;

						var popUp = instance.get('popUp');

						if (!popUp) {
							var popUpId = Math.floor((Math.random() * 100) + 1);

							popUp = '#' + popUpId;

							A.one('#main-content').append('<div class="' + instance.get('baseClassName') + '" id="' + popUpId + '">X<div class="' + instance.get('baseClassName') + '-content"></div></div>');
						}

						var activateCallback = function(classToggleInstance, node, targetNodes, targetClass) {
							if (instance.get('defaultCallbacks')) {
								instance._defaultActivateCallback(classToggleInstance, node, targetNodes, targetClass);
							}

							if (instance.get('overlayDisplay')) {
								instance._createOverlay();
							}

							if (instance.get('centered')) {
								instance._centerOnPage(targetNodes);
							}

							var customActivateCallback = instance.get('activateCallback');

							if (A.Lang.isFunction(customActivateCallback)) {
								customActivateCallback(classToggleInstance, node, targetNodes, targetClass);
							}
						};

						var deactivateCallback = function(classToggleInstance, node, targetNodes, targetClass) {
							if (instance.get('defaultCallbacks')) {
								instance._defaultDeactivateCallback(classToggleInstance, node, targetNodes, targetClass);
							}

							var overlayMask = A.one('.yui3-overlay');

							if (overlayMask) {
								overlayMask.remove(true);
							}

							var customDeactivateCallback = instance.get('deactivateCallback');

							if (A.Lang.isFunction(customDeactivateCallback)) {
								customDeactivateCallback(classToggleInstance, node, targetNodes, targetClass);
							}
						};

						new A.ClassToggle(
							{
								baseClassName: instance.get('baseClassName'),
								activateCallback: activateCallback,
								deactivateCallback: deactivateCallback,
								item: '.' + instance.get('baseClassName'),
								offclickContent: popUp + ' .' + instance.get('baseClassName') + '-content',
								targetNodes: popUp,
								toggleType: 'offclick',
								trigger: instance.get('trigger'),
							}
						).render();
					},

					_centerOnPage: function(node) {
						var instance = this;

						var WIN = A.getWin();

						var currentScrollPos = WIN.get('docScrollY');

						var winHeight = WIN.get('innerHeight');

						if (winHeight == undefined) {
							winHeight = document.documentElement.clientHeight;
						}

						var contentWidth = A.one('#wrapper').get('clientWidth');

						var nodeHeight = node.get('clientHeight');
						var nodeWidth = node.get('clientWidth');

						xCenter = (contentWidth / 2) - (nodeWidth / 2);
						yCenter = ((winHeight / 2) - (nodeHeight / 2)) + currentScrollPos;


						node.setStyle('right', xCenter);
						node.setStyle('top', yCenter);
					},

					_createOverlay: function() {
						var instance = this;

						if (A.one('.yui3-overlay')) {
							return;
						}

						new A.Overlay(
							{
								zIndex: instance.get('overlayZIndex')
							}
						).render();
					},

					_defaultActivateCallback: function(classToggleInstance, node, targetNodes, targetClass) {
						var nodeContent = node.one('.' + classToggleInstance.get('baseClassName') + '-content');
						var targetNodesContent = targetNodes.one('.' + classToggleInstance.get('baseClassName') + '-content');

						if (targetNodesContent && nodeContent) {
							targetNodesContent.setContent(nodeContent.getContent());
						}
					},

					_defaultDeactivateCallback: function(classToggleInstance, node, targetNodes, targetClass) {
						var targetNodesContent = targetNodes.one('.' + classToggleInstance.get('baseClassName') + '-content');

						if (targetNodesContent) {
							targetNodesContent.empty();
						}
					}
				}
			}
		);

		A.PopUp = PopUp;
	},
	'2.0',
	{
		requires: ['aui-base', 'class-toggle', 'event', 'overlay']
	}
);