define([
		'routers/landing',
		'controllers/landing'
], function(
	LandingRouter,
	LandingController) {

	// Setup CV Bakery application
	var Landing = new Backbone.Marionette.Application();

	// The application has only one region -- page body
	Landing.addRegions({
		mainRegion: 'body'
	});

	// Before application initialization
	Landing.on('initialize:before', function(options) {

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
	Landing.on('initialize:after', function(options) {
		// start backbone history
		Backbone.history.start();
	});

	// On application start
	Landing.on('start', function(options) {
		// make controller for landing page
		var landingController = new LandingController({
			app: this
		});
		// setup router for landing page
		var landingRouter = new LandingRouter({
			controller: landingController
		});
	});

	return Landing;
});