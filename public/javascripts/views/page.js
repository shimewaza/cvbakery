define([
	'text!templates/page.html',
	'views/menu',
	'views/resume/menutemplate',
	'views/resume/menuitem',
	'views/resume/menubackground'
], function(
	pageTemplate,
	MenuView,
	TemplateMenuView,
	ItemMenuView,
	BackgroundMenuView) {

	// PageView is the biggest frame of the application
	var PageView = Backbone.Marionette.Layout.extend({

		id: 'mainPage',

		// Template
		template: pageTemplate,

		// Events
		events: {
			// 'click #fullScreenBtn': 'onFullScreen',
			// 'click #partScreenBtn': 'onPartScreen',
			'click #logoutBtn': 'onLogout',
			'click #helpBtn': 'onShowHelp',
			'click #templateBtn': 'onShowTemplateMenu',
			'click #itemBtn': 'onShowItemMenu',
			'click #backgroundBtn': 'onShowBackgroundMenu',
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
			this.menuView = new MenuView();

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

			// listen to the universal-click, switch to view-mode when input lost focus
			this.listenTo(vent, 'logout:sessionTimeOut', this.doLogout);

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
					self.doLogout();
				},

				error: function() {
					self.doLogout();
				}
			});
		},

		// This is how actually logout affect page, used by multiple events
		doLogout: function() {

			var self = this;

			// expand screen to hide menu panel
			this.onFullScreen(function() {

				self.$el.fadeOut(function() {
					// singnal logout success
					window.location = '/';
				});
			});
		},

		// On part-screen button click
		onPartScreen: function() {

			var self = this;

			// make space for menu panel
			$('body').animate({
				'padding-top': '40px'
			}, function() {

				// move in the menu
				self.menuView.$el.animate({
					'top': '0px'
				});

			});
		},

		// On full-screen button click
		onFullScreen: function(callback) {

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

		onShowTemplateMenu: function() {

			var templateMenuView = new TemplateMenuView({
				model: this.model
			})
			// show menu
			this.footer.show(templateMenuView);

			$('#templateMenu').animate({
				'bottom': '0px'
			}, function() {
				templateMenuView.listenTo(vent, 'click:universal', templateMenuView.autoHide);
			});
		},

		onShowItemMenu: function() {

			var itemMenuView = new ItemMenuView({
				model: this.model
			})
			// show menu
			this.footer.show(itemMenuView);

			$('#itemMenu').animate({
				'bottom': '0px'
			}, function() {
				itemMenuView.listenTo(vent, 'click:universal', itemMenuView.autoHide);
			});
		},

		onShowBackgroundMenu: function() {

			var backgroundMenuView = new BackgroundMenuView({
				model: this.model
			})
			// show menu
			this.footer.show(backgroundMenuView);

			$('#backgroundMenu').animate({
				'bottom': '0px'
			}, function() {
				backgroundMenuView.listenTo(vent, 'click:universal', backgroundMenuView.autoHide);
			});
		},

		// Emit singnal on every click, sub component will use this signal to justify their behavior
		onClick: function() {
			vent.trigger('click:universal');
		}

	});

	return PageView;
});