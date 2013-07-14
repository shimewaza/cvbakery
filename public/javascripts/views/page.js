define([
	'text!templates/page.html',
	'views/menu'
], function(pageTemplate, MenuView) {

	// PageView is the biggest frame of the application
	var PageView = Backbone.Marionette.Layout.extend({

		id: 'mainPage',

		// Template
		template: pageTemplate,

		// Events
		events: {
			'click #fullScreenBtn': 'onFullScreen',
			'click #partScreenBtn': 'onPartScreen',
			'click #logoutBtn': 'onLogout',
			'click #helpBtn': 'onShowHelp',
			'click': 'onClick'
		},

		// Regions
		regions: {
			header: '#header',
			content: '#content',
			navigator: '#navigator',
			footer: '#footer'
		},

		// Initializer
		initialize: function() {

			// create menu
			this.menuView = new MenuView({
				model: this.model
			});

			// for slide animation effect change the default 
			// behavior of show view on content region
			this.content.open = function(view) {
				this.$el.hide('slide');
				this.$el.html(view.el);
				this.$el.show('slide', {
					direction: 'right'
				});
			};

			// for slide animation effect change the default 
			// behavior of show view on navigator region
			this.navigator.open = function(view) {
				this.$el.hide();
				this.$el.html(view.el);
				this.$el.show('slide');
			};
		},

		// After render
		onRender: function() {
			// show menu
			this.header.show(this.menuView);
		},

		// After show
		onShow: function() {
			// move in the page component
			this.onPartScreen();
		},

		// Logout action
		onLogout: function() {

			var self = this;

			$.ajax({

				url: '/logout',

				type: 'GET',

				dataType: 'json',

				success: function(data) {
					// expand screen to hide menu panel
					self.onFullScreen(function() {

						// hide tool button with animation
						$('#partScreenBtn').hide('drop', {
							direction: 'right'
						}, function() {

							$('#fullScreenBtn').hide('drop', {
								direction: 'right'
							}, function() {

								self.$el.fadeOut(function() {
									// singnal logout success
									vent.trigger('logout:success');
								});
							});
						});
					});
				}
			});
		},

		// On part-screen button click
		onPartScreen: function() {

			var self = this;

			this.$el.find('#fullScreenBtn').show();
			this.$el.find('#partScreenBtn').hide();

			// make space for menu panel
			$('body').animate({
				'padding-top': '40px'
			}, function() {

				// move in tool button with animation
				$('#logoutBtn').show('drop', function() {
					$('#fullScreenBtn').show('drop', function() {
						$('#helpBtn').show('drop');
					});
				});

				// move in the menu
				self.menuView.$el.animate({
					'top': '0px'
				});

			});
		},

		// On full-screen button click
		onFullScreen: function(callback) {

			this.$el.find('#fullScreenBtn').hide();
			this.$el.find('#partScreenBtn').show();

			// move header out of screen
			$('#menuPanel').animate({
				'top': '-40px'
			}, function() {
				// expand body
				$('body').animate({
					'padding-top': '0px'
				});

				if (typeof callback === "function") callback();
			});
		},

		// Show help tutorial
		onShowHelp: function() {
			// tour.start();
			vent.trigger('resume:showTour');
		},

		// Emit singnal on every click, sub component will use this signal to justify their behavior
		onClick: function() {
			vent.trigger('click:universal');
		}

	});

	return PageView;
});