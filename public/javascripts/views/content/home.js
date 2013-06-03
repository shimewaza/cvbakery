define([
	'text!templates/home.html',
	'views/base/basepanel'
], function(homeTemplate, BaseView) {

	var HomeView = BaseView.extend({

		// This view is a div
		tagName: 'div',

		// Class on HTML page
		className: 'sl-panel',

		// ID on HTML page
		id: 'HomePanel',

		render: function() {
			this.$el.html(homeTemplate).css('display', 'none').appendTo('#content');
		}
	});

	return new HomeView();
});