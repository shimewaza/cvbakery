define(['text!templates/login.html'], function(loginTemplate) {

	var LoginView = Backbone.Marionette.ItemView.extend({

		template: loginTemplate,

		// Bind user event
		events: {
			'click #loginBtn': 'login'
		},

		ui: {
			'msgArea': '.message'
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
				data: this.$('#login-form').serialize(),

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
					self.ui.msgArea.noty({
						type: 'warning',
						timeout: 3000,
						text: xhr.responseText
					});
				}
			});
		}
	});

	return LoginView;
});