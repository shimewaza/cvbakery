define([], function(require) {

	var selink = new Backbone.Marionette.Application();

	selink.addRegions({
		mainRegion: 'body'
	});

	selink.addInitializer(function(options) {

		var LandingRouter = require('routers/landing');
		var LandingController = require('controllers/landing');

		var landingController = new LandingController({
			app: this
		});

		var landingRouter = new LandingRouter({
			controller: landingController
		})

		landingController.toLogin();
	});

	selink.on('initialize:before', function(options) {

		Backbone.Marionette.Region.prototype.open = function(view) {
			var self = this;
			this.$el.fadeOut(function() {
				self.$el.html(view.el);
				self.$el.fadeIn();
			});
		}

		Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {

			var template = templateId;

			if (!template || template.length === 0) {
				var msg = "Could not find template: '" + templateId + "'";
				var err = new Error(msg);
				err.name = "NoTemplateError";
				throw err;
			}

			return template;
		};

		console.log('SELink initialize started.');
	});

	selink.on('initialize:after', function(options) {
		Backbone.history.start();
		console.log('SELink initialize finished.');
	});

	selink.on('start', function(options) {
		console.log('SELink has started.');
	});

	selink.listenTo(vent, 'login:success', function(data) {

		var MainRouter = require('routers/main');
		var MainController = require('controllers/main');

		var mainController = new MainController({
			app: this,
			account: data.account,
			menu: data.menu
		});

		var mainRouter = new MainRouter({
			controller: mainController
		});

		mainController.toHome();
	});

	return selink;

	/*	var initialize = function() {

		// Require home page from server
		$.ajax({

			// page url
			url: '/home',

			// method is get
			type: 'GET',

			// use json format
			dataType: 'json',

			// success handler
			success: function(data) {
				// Start history
				mediator.publish('user:login', data);
			},

			// error handler
			error: function(xhr, status) {
				// Unauthed user move to login page
				mediator.publish('user:logout');
			}
		});
	};

	return {
		initialize: initialize
	};*/
});