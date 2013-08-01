define([
	'text!templates/landing.html',
	'views/login',
	'views/register'
], function(pageTemplate, LoginView, RegisterView) {

	var PageView = Backbone.Marionette.Layout.extend({

		id: 'landingPage',

		template: pageTemplate,

		events: {
			'click #narvLoginBtn': 'login',
			'click #forgotPassBtn': 'showRetriveInput',
			'click #retrivePassBtn': 'retrivePassword'
		},

		ui: {
			retrivePassModal: '#retrivePassModal',
			retrivePassModalMsg: '.modal-message',
			retrivePassBtn: '#retrivePassBtn'
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
			this.$el.find('#myCarousel').carousel();

			this.loginArea.show(this.loginView);
			this.registerArea.show(this.registerView);
		},

		// Login action
		// Post username and password for user authorize
		login: function() {

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
					window.location = '/home';
				},

				// login error handler
				error: function(xhr, status) {
					// self.$('.nav-message')
					// 	.text(xhr.responseText)
					// 	.show('slide', {
					// 		direction: 'right'
					// 	});
					self.$('.nav-message').noty({
						type: 'error',
						timeout: 3000,
						text: xhr.responseText
					});
				}
			});
		},

		showRetriveInput: function() {
			this.ui.retrivePassModal.modal('show');
			this.ui.retrivePassBtn.fadeIn();
		},

		retrivePassword: function() {

			// Hold this
			var self = this;

			// Login
			$.ajax({

				// page url
				url: '/retrivepass',

				// post form data
				data: this.$('.modal-form').serialize(),

				// method is post
				type: 'POST',

				// use json format
				dataType: 'json',

				// login success handler
				success: function(res) {
					self.ui.retrivePassModalMsg.noty({
						type: 'success',
						timeout: 3000,
						text: res.message
					});
					self.ui.retrivePassBtn.fadeOut();
				},

				// login error handler
				error: function(xhr, status) {
					self.ui.retrivePassModalMsg.noty({
						type: 'warning',
						timeout: 3000,
						text: xhr.responseText
					});
				}
			});
		}

	});

	return PageView;
});