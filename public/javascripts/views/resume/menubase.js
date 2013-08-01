define([], function() {

	var BaseMenu = Backbone.Marionette.ItemView.extend({

		/*
		    Common events may happend
		*/
		commonEvents: {

		    // Set this editor lost foucs when mouseout
		    'mouseout': 'setFocusOut',

		    // Set this editor gain foucs when mouseover
		    'mouseover': 'setFocusIn'
		},

		autoHide: function() {
			if(!this.focus)
				this.$el.animate({
					'bottom': '-70px'
				});
		},

		/*
		    Set up a flag indicate mouse on
		*/
		setFocusIn: function() {
		    this.focus = true;
		},

		/*
		    Clear the flag when mouse out
		*/
		setFocusOut: function() {
		    this.focus = false;
		},

	});

	return BaseMenu;
});