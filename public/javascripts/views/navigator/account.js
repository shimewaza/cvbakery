define([
	'text!templates/account.html',
	'views/base/basepanel',
	'models/account',
	'mediator-js'
], function(accountTemplate, BaseView, accountModel, mediator) {

	var AccountInfoView = BaseView.extend({

		// This view is a div
		tagName: 'div',

		// Class on HTML page
		className: 'well well-small sl-panel',

		// ID on HTML page
		id: 'accountPanel',

		// View's model
		model: accountModel,

		// View's HTML template
		template: _.template(accountTemplate),

		// Initializer
		initialize: function() {

			// bind model's change evnet
			this.listenTo(this.model, 'change', this.render);

			// enable default user event
			this.events = _.extend({}, this.genericEvents);

			// bind mediator event
			// this.subscriptions = _.extend({}, this.genericSubscriptions);
			mediator.subscribe('user:login', this.onLogin, {}, this);
			mediator.subscribe('user:logout', this.onLogout, {}, this);
		},

		// Render template with model
		render: function() {
			this.$el.html(this.template(this.model.toJSON())).appendTo('#navigator');
		},

		// Login action
		// Set user account info into model
		onLogin: function(account) {
			this.model.set(account.userInfo);
		},

		// Logout action
		// Clear user account model
		onLogout: function() {
			this.model.clear();
		}
	});

	return new AccountInfoView();
});