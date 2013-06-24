define([
		'text!templates/page.html',
		'views/menu',
		'views/account'
], function(pageTemplate, MenuView, AccountView) {

	var PageView = Backbone.Marionette.Layout.extend({

		template: pageTemplate,

		events: {
			'click #fullScreenBtn': 'onFullScreen',
			'click #partScreenBtn': 'onPartScreen',
			'click #logoutBtn': 'onLogout',
			'click': 'onClick'
		},

		regions: {
			header: '#header',
			content: '#content',
			navigator: '#navigator',
			footer: '#footer'
		},

		initialize: function() {

			this.menuView = new MenuView({
				model: this.model
			});
			this.accountView = new AccountView({
				model: this.model
			});

			this.content.open = function(view) {
				this.$el.hide('slide');
				this.$el.html(view.el);
				this.$el.show('slide', {
					direction: 'right'
				});
			};

			this.navigator.open = function(view) {
				this.$el.hide('slide');
				this.$el.html(view.el);
				this.$el.show('slide');
			};
		},

		onRender: function() {
			this.header.show(this.menuView);
			this.navigator.show(this.accountView);
		},

		onShow: function() {
			this.onPartScreen();
		},

		// Logout action
		// Hide menu and navigator panel
		onLogout: function() {

			var self = this;

			$.ajax({

				url: '/logout',

				type: 'GET',

				dataType: 'json',

				success: function(data) {
					self.onFullScreen(function() {
						vent.trigger('logout:success');
					});

					// hide tool button with animation
					$('#logoutBtn').hide('drop', function() {
						$('#fullScreenBtn').hide('drop', function() {
							$('#partScreenBtn').hide('drop');
						});
					});
				}
			});		
		},

		onPartScreen: function() {

			var self = this;

			this.$el.find('#fullScreenBtn').show();
			this.$el.find('#partScreenBtn').hide();

			// make space for menu panel
			$('body').animate({
				'padding-top': '45px'
			}, function() {

				// move in tool button with animation
				$('#fullScreenBtn').show('drop', function() {
					$('#logoutBtn').show('drop');
				});

				// move in the menu
				self.menuView.$el.animate({
					'top': '0px'
				});

				// make space for navigator panel
				$('#body').animate({
					'padding-left': '210px'
				}, function() {

					// move in the navigator
					$('#navigator').animate({
						'right': '210px'
					});
				});
			});
		},

		onFullScreen: function(callback) {

			this.$el.find('#fullScreenBtn').hide();
			this.$el.find('#partScreenBtn').show();

			// move the navigator out of screen
			$('#navigator').animate({
				'right': '410px'
			}, function() {
				// expand the main area
				$('#body').animate({
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
					
					if(typeof callback === "function") callback();
				});
			});

		},

		onClick: function() {
			vent.trigger('click:universal');
		}

	});

	return PageView;
});