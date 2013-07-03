define([
		'text!templates/landing.html',
		'views/login',
		'views/register'
], function(pageTemplate, LoginView, RegisterView) {

	var PageView = Backbone.Marionette.Layout.extend({

		template: pageTemplate,

		events: {
			'click #narvLoginBtn': 'login'
		},

		regions: {
			content: '#content',
			footer: '#footer',
			loginArea: '#login',
			registerArea: '#register'
		},

		initialize: function() {

			this.loginView = new LoginView();
			this.registerView = new RegisterView();
		},

		onRender: function() {

			// initialize carousel here for auto-start
			this.$el.find('#myCarousel').carousel({
				interval: 3000
			});

			this.loginArea.show(this.loginView);
			this.registerArea.show(this.registerView);
		},

		// Login action
		// Post username and password for user authorize
		login: function(event) {

			// Hold this
			var self = this;

			// Login
			$.ajax({

				// page url
				url: '/login',

				// post form data
				data: this.$('.navbar-form').serialize(),

				// method is post
				type: 'POST',

				// use json format
				dataType: 'json',

				// login success handler
				success: function(account) {
					vent.trigger('login:success', account);
				},

				// login error handler
				error: function(xhr, status) {
					self.$('.nav-message').text(xhr.responseText);
				}
			});
		}

	});

	return PageView;
});