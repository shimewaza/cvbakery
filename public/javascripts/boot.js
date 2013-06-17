require.config({
	paths: {
		jquery: 'lib/jquery-1.9.1',
		bootstrap: 'lib/bootstrap',
		datepickerlang: 'lib/locales/bootstrap-datepicker.ja',
		datepicker: 'lib/bootstrap-datepicker',
		'jquery.ui.widget': 'lib/jquery.ui.widget',
		iframetransport: 'lib/jquery.iframe-transport',
		fileupload: 'lib/jquery.fileupload',
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
		datepicker: {
			deps: ['jquery']
		},
		datepickerlang: {
			deps: ['datepicker']
		},
		fileupload: {
			deps: ['jquery', 'jquery.ui.widget', 'iframetransport']
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
			deps: ['bootstrap', 'datepickerlang', 'fileupload', 'marionette', 'deepmodel', 'vent']
		}
	}
});

require(['selink'], function(selink) {
	selink.start();
});