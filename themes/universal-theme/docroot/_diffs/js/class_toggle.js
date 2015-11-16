AUI.add(
	'class-toggle',
	function(A) {
		var ClassToggle = A.Component.create(
			{
				ATTRS: {
					activateCallback: {
						value: null
					},

					baseClassName: {
						value: 'class-toggle'
					},

					deactivateCallback: {
						value: null
					},

					item: {
						value: '.class-toggle'
					},

					offclickContent: {
						value: null
					},

					targetClass: {
						value: null
					},

					targetNodes: {
						value: null
					},

					toggleType: {
						value: null
					},

					trigger: {
						value: null
					}
				},

				NAME: 'class-toggle',

				prototype: {
					bindUI: function() {
						var instance = this;

						A.on('load', instance.syncUI, instance);
					},

					syncUI: function() {
						var instance = this;

						var wrapper = A.one('#wrapper');
						var trigger = instance.get('trigger');

						if (!trigger) {
							trigger = instance.get('item');
						}

						wrapper.delegate(
							'click',
							function(event) {
								var node = event.currentTarget;

								var targetClass = instance._getTargetClass(node);
								var targetNodes = instance._getTargetNodes(node);

								var active = false;

								if (targetNodes.item(0).hasClass(targetClass)) {
									active = true;
								}

								var toggleType = instance.get('toggleType');

								if (node.attr('data-toggle-type')) {
									toggleType = node.attr('data-toggle-type');
								}

								if (toggleType == "offclick") {
									if (active) {
										return;
									}

									instance._activate(node, targetNodes, targetClass);

									instance._offclickAction(node, targetNodes, targetClass, event);
								}
								else if (toggleType == "carousel") {
									if (active) {
										return;
									}

									instance._activate(node, targetNodes, targetClass);

									instance._carouselAction(node, targetNodes, targetClass);
								}
								else if (active) {
									instance._deactivate(node, targetNodes, targetClass);
								}
								else {
									instance._activate(node, targetNodes, targetClass);
								}
							},
							trigger
						);
					},

					_activate: function(node, targetNodes, targetClass) {
						var instance = this;

						targetNodes.addClass(targetClass);

						var activateCallback = instance.get('activateCallback');

						if (A.Lang.isFunction(activateCallback)) {
							activateCallback(instance, node, targetNodes, targetClass);
						}
					},

					_carouselAction: function(node, targetNodes, targetClass) {
						var instance = this;

						var curActiveNode = targetNodes._nodes[0]._activeNode;

						if (curActiveNode && (curActiveNode != node)) {
							instance._deactivate(curActiveNode, instance._getTargetNodes(curActiveNode), instance._getTargetClass(curActiveNode));
						}

						targetNodes._nodes[0]._activeNode = node;
					},

					_deactivate: function(node, targetNodes, targetClass) {
						var instance = this;

						targetNodes.removeClass(targetClass);

						var deactivateCallback = instance.get('deactivateCallback');

						if (A.Lang.isFunction(deactivateCallback)) {
							deactivateCallback(instance, node, targetNodes, targetClass);
						}
					},

					_getTargetClass: function(node) {
						var instance = this;

						var className = instance.get('baseClassName') + '-active';

						if (node.attr('data-target-class')) {
							className = node.attr('data-target-class');
						}
						else if (instance.get('targetClass')) {
							className = instance.get('targetClass');
						}

						return className;
					},

					_getTargetNodes: function(node) {
						var instance = this;

						if (node.attr('data-target-nodes')) {
							var nodes = A.all(node.attr('data-target-nodes'));
						}
						else if (instance.get('targetNodes')) {
							var nodes = A.all(instance.get('targetNodes'));
						}

						if (!nodes || nodes.length == 0) {
							var nodes = A.NodeList.create();

							nodes.push(node);
						}

						return nodes;
					},

					_offclickAction: function(node, targetNodes, targetClass, event) {
						var instance = this;

						event.stopPropagation();

						if (node.attr('data-offclick-content')) {
							var nodeContent = A.all(node.attr('data-offclick-content'));
						}
						else if (node.attr('data-target-nodes')) {
							var offclickContent = node.attr('data-target-nodes') + ' .' + instance.get('baseClassName') + '-content';

							var nodeContent = A.all(offclickContent);
						}
						else if (instance.get('offclickContent')) {
							var nodeContent = A.all(instance.get('offclickContent'));
						}
						else {
							var nodeContent = node.one('.' + instance.get('baseClassName') + '-content');
						}

						if (!nodeContent) {
							nodeContent = node;
						}

						nodeContent.on(
							'clickoutside',
							function(event) {
								instance._deactivate(node, targetNodes, targetClass);

								nodeContent.detach('clickoutside');
							}
						);
					}
				}
			}
		);

		A.ClassToggle = ClassToggle;
	},
	'2.0',
	{
		requires: ['aui-base', 'event']
	}
);