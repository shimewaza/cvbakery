require.config({
	paths: {
		jquery: 'lib/jquery-1.9.1',
		jqueryui: 'lib/jquery-ui-1.10.3.custom.min',
		jqueryraf: 'lib/jquery.requestAnimationFrame',         // not sure if this useful
		bootstrap: 'lib/bootstrap',
		datepickerlang: 'lib/locales/bootstrap-datepicker.ja', // date picker
		datepicker: 'lib/bootstrap-datepicker',                // date picker
		contextmenu: 'lib/bootstrap-contextmenu',              // context menu
		markdown: 'lib/bootstrap-markdown',                    // markdown input
		'markdown.lib': 'lib/markdown',                        // markdown input
		bootstro: 'lib/bootstro',                              // bootstro
		'jquery.ui.widget': 'lib/jquery.ui.widget',            // upload/download
		iframetransport: 'lib/jquery.iframe-transport',        // upload/download
		fileupload: 'lib/jquery.fileupload',                   // upload/download
		filedownload: 'lib/jquery.fileDownload',               // upload/download
		isotope: 'lib/jquery.isotope.min',                     // isotope
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
		datepicker: {
			deps: ['jquery']
		},
		datepickerlang: {
			deps: ['datepicker']
		},
		markdown: {
			deps: ['jquery', 'markdown.lib']
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
		selink: {
			deps: [
					'jqueryui',
					'jqueryraf',
					'bootstrap',
					'datepickerlang',
					'markdown',
					'bootstro',
					'contextmenu',
					'fileupload',
					'filedownload',
					'isotope',
					'noty',
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