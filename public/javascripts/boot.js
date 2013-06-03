require.config({
	paths: {
		jquery: 'lib/jquery-1.9.1',
		jqueryui: 'lib/jquery-ui-1.10.2.custom',
		bootstrap: 'lib/bootstrap',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		deepmodel: 'lib/deep-model',
		marionette: 'lib/backbone.marionette',
		'backbone.wreqr': 'lib/backbone.wreqr',
		'backbone.babysitter': 'lib/backbone.babysitter',
		vent: 'lib/vent',
		mediator: 'lib/mediator',
		text: 'lib/text',
		templates: '../templates'
	},

	shim: {
		jquery: {
			exports: 'jQuery'
		},
		jqueryui: {
			deps: ['jquery']
		},
		bootstrap: {
			deps: ['jquery']
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		deepmodel: {
			deps: ['backbone']
		},
		vent: {
			deps: ['backbone.wreqr']
		},
		selink: {
			deps: ['jqueryui', 'bootstrap', 'marionette', 'deepmodel', 'vent']
		}
	}
});

require(['selink'], function(selink) {
	selink.start();
});