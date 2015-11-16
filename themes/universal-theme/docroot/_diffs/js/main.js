AUI().ready(
	'anim',
	'class-toggle',
	'event-onscreen',
	'yui-throttle',
	function(A) {
		var BODY = A.getBody();

		var WIN = A.getWin();

		BODY.delegate(
			'click',
			function(event) {
				var node = event.currentTarget;

				var section = A.one(node.get('hash'));

				if (!section) {
					return;
				}

				event.preventDefault();

				var offset = parseInt(node.attr('data-offset'));

				var scrollTo = parseInt(section.getY());

				if (offset) {
					scrollTo -= offset;
				}

				new A.Anim(
					{
						duration: 0.5,
						easing: 'easeBoth',
						node: 'win',
						to: {
							scroll: [0, scrollTo]
						}
					}
				).run();

				window.history.pushState('','', node.get('hash'));
			},
			'.animate-scroll'
		);

		A.all('.lazy-load').each(
			function(node) {
				node.on(
					'onscreen',
					function(e) {
						var datasrc = node.attr('data-src');
						var src = node.attr('src');

						if (src != datasrc) {
							node.attr('src', datasrc);
						}

						node.addClass('lazy-loaded');

						node.detach();
					}
				);
			}
		);

		A.all('.on-screen-helper').each(
			function(node) {
				node.on(
					'onscreen',
					function(e) {
						node.addClass('on-screen');

						if (!node.attr('data-repeat')) {
							node.detach();
						}
					}
				);

				node.on(
					'onscreentop',
					function(e) {
						node.addClass('on-screen-top');

						if (!node.attr('data-repeat')) {
							node.detach();
						}
					}
				);

				node.on(
					['offscreenbottom', 'offscreentop'],
					function(e) {
						if (node.attr('data-repeat')) {
							node.removeClass('on-screen');
						}

						if (node.attr('data-repeat-top')) {
							node.removeClass('on-screen-top');
						}
					}
				);
			}
		);

		new A.ClassToggle().render();

		if (BODY.hasClass('smart-scroll-navigation')) {
			var lastScrollPos = 0;
			var savedScrollPos = 0;
			var triggerPos = 200;

			var displayBanner = function() {
				var scrollPos = WIN.get('docScrollY');

				if (scrollPos > lastScrollPos) {
					savedScrollPos = scrollPos;
				}

				if (scrollPos < (savedScrollPos - 100)) {
					savedScrollPos = scrollPos + 100;

					BODY.removeClass('hide-banner');
				}
				else if (scrollPos > triggerPos) {
					BODY.addClass('hide-banner');
				}
				else {
					BODY.removeClass('hide-banner');
				}

				lastScrollPos = scrollPos;
			}

			A.on(
				'scroll',
				function() {
					A.throttle(displayBanner(), 250);
				}
			);
		}

		var sectionNavigation = A.one('#navigation.on-page-navigation');

		if (sectionNavigation) {
			A.all('.dynamic-columns .portlet-column').each(
				function(node) {
					var newSelectedItem = sectionNavigation.one('.' + node.get('id'));

					node.on(
						'onscreentop',
						function(e) {
							var oldSelectedItem = sectionNavigation.one('.selected');

							if (oldSelectedItem) {
								oldSelectedItem.removeClass('selected');
							}

							newSelectedItem.addClass('selected');
						}
					);
				}
			);
		}
	}
);