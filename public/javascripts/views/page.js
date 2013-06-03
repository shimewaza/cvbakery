define(['text!templates/page.html', 'views/header/menu'], function(pageTemplate, MenuView) {

	var PageView = Backbone.Marionette.Layout.extend({

		template: pageTemplate,

		regions: {
			header: '#header',
			content: '#content',
			navigator: '#navigator',
			footer: '#footer'
		},

		initialize: function() {
			console.log(this.header);
		},

		onRender: function() {
			this.header.show(new MenuView({model: this.model}));
			this.onPartScreen();
		},

		// Login action
		// Set up application main frame
		// Show menu and navigator panel
		onLogin: function() {

			this.onPartScreen();

			this.add(function(next) {

				// move in tool button with animation
				$('#fullScreenBtn').show('drop', function() {
					$('#logoutBtn').show('drop');
				});

				next();
			});
		},

		// Logout action
		// Hide menu and navigator panel
		onLogout: function() {

			this.add(function(next) {

				// hide tool button with animation
				$('#logoutBtn').hide('drop', function() {
					$('#fullScreenBtn').hide('drop', function() {
						$('#partScreenBtn').hide('drop');
					});
				});

				next();
			});

			this.onFullScreen();
		},

		onPartScreen: function() {

			// make space for menu panel
			$('body').animate({
				'padding-top': '45px'
			}, function() {
				
				// make space for navigator panel
				$('#main').animate({
					'padding-left': '265px'
				}, function() {

					// move in the navigator
					$('#navigator').animate({
						'right': '265px'
					});
				});
			});
		},

		onFullScreen: function() {

			// move the navigator out of screen
			$('#navigator').animate({
				'right': '530px'
			}, function() {
				// expand the main area
				$('#main').animate({
					'padding-left': '0px'
				});
				// move header out of screen
				$('#menuPanel').animate({
					'top': '-40px'
				}, function() {
					// expand body
					$('body').animate({
						'padding-top': '5px'
					});
				});
			});
		}

	});

	return PageView;
});