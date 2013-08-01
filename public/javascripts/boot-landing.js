require.config({
	paths: {
		jquery: 'lib/jquery-1.9.1',
		jqueryui: 'lib/jquery-ui-1.10.3.custom.min',
		jqueryraf: 'lib/jquery.requestAnimationFrame',         // not sure if this useful
		bootstrap: 'lib/bootstrap',
		'noty.core': 'lib/jquery.noty',                        // noty
		'noty.inline': 'lib/layouts/inline',                   // noty
		'noty.layout': 'lib/layouts/bottomRight',              // noty
		'noty': 'lib/themes/default',                          // noty
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		deepmodel: 'lib/deep-model',
		marionette: 'lib/backbone.marionette',
		'backbone.wreqr': 'lib/backbone.wreqr',
		'backbone.babysitter': 'lib/backbone.babysitter',
		vent: 'lib/vent',
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
		jqueryraf: {
			deps: ['jquery']
		},
		'noty.core': {
			deps: ['jquery']
		},
		'noty.inline': {
			deps: ['noty.core']
		},
		'noty.layout': {
			deps: ['noty.inline']
		},
		noty: {
			deps: ['noty.layout']
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
		landing: {
			deps: [
					'jqueryui',
					'jqueryraf',
					'bootstrap',
					'noty',
					'marionette',
					'deepmodel',
					'vent'
			]
		}
	}
});

require(['marionette', 'deepmodel', 'vent', 'landing'], function(marionette, deepmodel, vent, landing) {
	landing.start();
});