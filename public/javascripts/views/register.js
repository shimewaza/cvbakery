define(['text!templates/register.html'], function(registerTemplate) {

	var RegisterView = Backbone.Marionette.ItemView.extend({

		template: registerTemplate,

		// Bind user event
		events: {
			'click #registerBtn': 'register'
		},

		ui: {
			'msgArea': '.message'
		},

		// Register new user, feedback result
		register: function() {

			var self = this;

			// Login
			$.ajax({

				// page url
				url: '/tempaccount/create',

				// post form data
				data: this.$('form').serialize(),

				// method is post
				type: 'POST',

				// use json format
				dataType: 'json',

				// login success handler
				success: function(result) {
					self.ui.msgArea.noty({
						type: 'success',
						timeout: 3000,
						text: result.message
					});
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

	return RegisterView;
});