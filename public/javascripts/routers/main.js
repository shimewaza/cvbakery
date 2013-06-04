define([], function() {

	var Router = Backbone.Marionette.AppRouter.extend({

		appRoutes: {
			'home': 'toHome',
            'resume': 'toResume'
		}
	});

	return Router;
});