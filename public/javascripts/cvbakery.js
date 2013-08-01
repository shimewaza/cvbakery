define([
		'routers/main',
		'controllers/main'
], function(
	MainRouter,
	MainController) {

	// Setup CV Bakery application
	var CVBakery = new Backbone.Marionette.Application();

	// The application has only one region -- page body
	CVBakery.addRegions({
		mainRegion: 'body'
	});

	// // Add application initializer
	// CVBakery.addInitializer(function(options) {

	// 	// TODO: ajax default behavior (this may wrong)
	// 	$.ajaxSetup({
	// 		timeout: 3000,
	// 		error: function(xhr, errorType, exceptionThrown) {
	// 			console.log(xhr);
	// 			console.log(errorType);
	// 			console.log(exceptionThrown);
	// 		}
	// 	});

	// 	// Require home page from server
	// 	$.ajax({

	// 		// page url
	// 		url: '/home',

	// 		// method is get
	// 		type: 'GET',

	// 		// use json format
	// 		dataType: 'json',

	// 		// success handler
	// 		success: function(data) {
	// 			// singnal login success
	// 			vent.trigger('login:success', data);
	// 		},

	// 		// error handler
	// 		error: function(xhr, status) {
	// 			// singnal logout success as login faile
	// 			vent.trigger('logout:success');
	// 		}
	// 	});
	// });

	// Before application initialization
	CVBakery.on('initialize:before', function(options) {

		// THIS IS VITAL, change the default behavior of views load template
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
	});

	// After application initialization
	CVBakery.on('initialize:after', function(options) {
		// start backbone history
		Backbone.history.start();
	});

	// On application start
	CVBakery.on('start', function(options) {
		// make controller for main page
		var mainController = new MainController({
			app: this
			// account: data
		});
		// setup router for main page
		var mainRouter = new MainRouter({
			controller: mainController
		});
		// move to resume page
		mainController.toResume();

		// say hello to user
		noty({
			type: 'information',
			timeout: 5000,
			text: "こんにちは、CV Bakeryへようこそ！",
			layout: 'bottomRight'
		})
	});

	// // Listening logout success singnal
	// CVBakery.listenTo(vent, 'logout:success', function() {

	// 	// make controller for landing page
	// 	var landingController = new LandingController({
	// 		app: this
	// 	});
	// 	// setup router for landing page
	// 	var landingRouter = new LandingRouter({
	// 		controller: landingController
	// 	});
	// 	// move to login page
	// 	landingController.toLogin();
	// });

	// // Listening login success singnal
	// CVBakery.listenTo(vent, 'login:success', function(data) {

	// 	// make controller for main page
	// 	var mainController = new MainController({
	// 		app: this,
	// 		account: data
	// 	});
	// 	// setup router for main page
	// 	var mainRouter = new MainRouter({
	// 		controller: mainController
	// 	});
	// 	// move to resume page
	// 	mainController.toResume();

	// 	// say hello to user
	// 	noty({
	// 		type: 'information',
	// 		timeout: 5000,
	// 		text: "こんにちは、CV Bakeryへようこそ！",
	// 		layout: 'bottomRight'
	// 	})
	// });

	return CVBakery;
});