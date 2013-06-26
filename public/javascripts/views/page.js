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
			'click #helpBtn': 'showHelp',
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
				// this.$el.fadeIn();
				this.$el.show('slide', {
					direction: 'right',
					easing: 'linear'
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
					$('#helpBtn').hide('drop', function() {					
						$('#partScreenBtn').hide('drop', function() {
							$('#fullScreenBtn').hide('drop', function() {
								$('#logoutBtn').hide('drop');
							});
						});
					});
				}
			});		
		},

		onPartScreen: function() {

			var self = this;

			this.$el.find('#fullScreenBtn').hide();
			this.$el.find('#partScreenBtn').hide();

			// make space for menu panel
			$('body').animate({
				'padding-top': '45px'
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

		showHelp: function() {
		    bootstro.start('.bootstro', {
		        nextButton: '<button class="btn btn-primary bootstro-next-btn">次  <i class="icon-chevron-right"></i></button>',
		        prevButton: '<button class="btn btn-primary bootstro-prev-btn"><i class="icon-chevron-left"></i>  前</button>',
		        finishButton: ''
		    });
		},

		onClick: function() {
			vent.trigger('click:universal');
		}

	});

	return PageView;
});