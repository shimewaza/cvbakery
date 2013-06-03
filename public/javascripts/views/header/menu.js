define(['text!templates/menu.html'], function(menuTemplate) {

	var MenuView = Backbone.Marionette.ItemView.extend({

		// This view is a div
		tagName: 'div',

		// Class on HTML page
		className: 'navbar navbar-fixed-top',

		// ID on HTML page
		id: 'menuPanel',

		template: menuTemplate,

		onRender: function() {

			// move in the menu
			this.$el.animate({
				'top': '0px'
			});
		}
	});

	return MenuView;
});