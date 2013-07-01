require.config({
	paths: {
		jquery: 'lib/jquery-1.9.1',
		jqueryui: 'lib/jquery-ui-1.10.3.custom.min',
		bootstrap: 'lib/bootstrap',
		datepickerlang: 'lib/locales/bootstrap-datepicker.ja',
		datepicker: 'lib/bootstrap-datepicker',
		contextmenu: 'lib/bootstrap-contextmenu',
		markdown: 'lib/bootstrap-markdown',
		bootstro: 'lib/bootstro',
		'jquery.ui.widget': 'lib/jquery.ui.widget',
		iframetransport: 'lib/jquery.iframe-transport',
		fileupload: 'lib/jquery.fileupload',
		filedownload: 'lib/jquery.fileDownload',
		isotope: 'lib/jquery.isotope.min',
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
		datepicker: {
			deps: ['jquery']
		},
		datepickerlang: {
			deps: ['datepicker']
		},
		markdown: {
			deps: ['jquery']
		},
		bootstro: {
			deps: ['bootstrap']
		},
		contextmenu: {
			deps: ['bootstrap']
		},
		fileupload: {
			deps: ['jquery', 'jquery.ui.widget', 'iframetransport']
		},
		filedownload: {
			deps: ['jquery']
		},
		isotope: {
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
			deps: [
					'jqueryui',
					'bootstrap',
					'datepickerlang',
					'markdown',
					'bootstro',
					'contextmenu',
					'fileupload',
					'filedownload',
					'isotope',
					'marionette',
					'deepmodel',
					'vent'
			]
		}
	}
});

require(['fileupload', 'marionette', 'deepmodel', 'vent', 'selink'], function(fileupload, marionette, deepmodel, vent, selink) {
	selink.start();
});