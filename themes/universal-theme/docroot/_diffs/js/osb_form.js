AUI.add(
	'osb-form',
	function(A) {
		var OSBForm = A.Component.create(
			{
				ATTRS: {
					customRules: {
						value: {}
					},

					fieldClassName: {
						value: 'field-wrapper'
					},

					fieldStrings: {
						value: {}
					},

					formId: {
						value: '#osbForm'
					},

					rules: {
						value: {}
					}
				},

				NAME: 'osb-form',

				prototype: {
					bindUI: function() {
						var instance = this;

						A.bind(instance.syncUI, instance);
					},

					syncUI: function() {
						var instance = this;

						var form = A.one(instance.get('formId'));

						instance._initializeValidator(form);

						instance._delegateFieldFocused(form);
						instance._delegateFieldCheck(form);
					},

					_addCustomRules: function(customRules) {
						var instance = this;

						if (A.Object.isEmpty(customRules)) {
							return;
						}

						var rules = A.config.FormValidator.RULES;
						var strings = A.config.FormValidator.STRINGS;

						A.each(
							customRules,
							function(rule, ruleName) {
								rules[ruleName] = rule;
								strings[ruleName] = strings.required;
							}
						);
					},

					_applyConditionalRule: function(form) {
						var instance = this;

						var conditionalRule = {
							conditional: function(val, node, ruleValue) {
								var defaultRequiredRule = A.config.FormValidator.RULES.required;

								var field = form.one('input[name="' + ruleValue.fieldname + '"]');

								if (ruleValue.values.indexOf(field.val()) >= 0) {
									return defaultRequiredRule(val, node, ruleValue);
								}
								else {
									return true;
								}
							}
						};

						instance._addCustomRules(conditionalRule);
					},

					_delegateFieldCheck: function(form) {
						var instance = this;

						form.delegate(
							'change',
							function(event) {
								var node = event.currentTarget;

								instance._fieldCheck(node);
							},
							'.' + instance.get('fieldClassName')
						);
					},

					_delegateFieldFocused: function(form) {
						var instance = this;

						form.delegate(
							'focus',
							function() {
								this.addClass('field-focused');
							},
							'.' + instance.get('fieldClassName')
						);

						form.delegate(
							'blur',
							function() {
								this.removeClass('field-focused');
							},
							'.' + instance.get('fieldClassName')
						);
					},

					_fieldCheck: function(node) {
						var input = node.one('.field');

						if (!input) {
							input = node.one('select');
						}

						if (!input) {
							input = node.one('input');
						}

						if (input.get('value') != "") {
							node.addClass('field-filled');
						}
						else {
							node.removeClass('field-filled');
						}
					},

					_initializeValidator: function(form) {
						var instance = this;

						instance._applyConditionalRule(form);

						instance._addCustomRules(instance.get('customRules'));

						new A.FormValidator(
							{
								boundingBox: instance.get('formId'),
								fieldContainer: '.' + instance.get('fieldClassName'),
								fieldStrings: instance.get('fieldStrings'),
								rules: instance.get('rules'),
								validateOnInput: true
							}
						);
					}
				}
			}
		);

		A.OSBForm = OSBForm;
	},
	'2.0',
	{
		requires: ['aui-base', 'aui-form-validator']
	}
);