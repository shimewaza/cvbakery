define([], function() {

	var Router = Backbone.Marionette.AppRouter.extend({

		appRoutes: {
			'home': 'toHome'
		}
	});

	return Router;
});