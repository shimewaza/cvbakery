define([
	'views/resume/menubase',
	'text!templates/resume/menubackground.html'
], function(
	BaseMenu,
	template) {

	var BackgroundMenuView = BaseMenu.extend({

		className: 'navbar navbar-fixed-bottom',

		id: 'backgroundMenu',

		template: template,

		initialize: function() {
			this.events = _.extend({}, this.commonEvents, {
				'click img': 'changePattern',
			});
		},

		// onRender: function() {
		// 	// attach sample image to background button 
		// 	this.$el.find('img').each(function() {
		// 	    var imageName = $(this).data('image');
		// 	    var val2 = "/images/pattern/" + imageName;
		// 	    $(this).popover({
		// 	            title: '背景文様を変更',
		// 	            content: '<img src="' + val2 + '" class="img-polaroid" style="display:block; height: 100px;">',
		// 	            placement: 'right',
		// 	            trigger: 'hover',
		// 	            html: true,
		// 	            container: 'body'
		// 	        });
		// 	});
		// },

		// Change background partten
		changePattern: function(event) {
		    // get clicked partten
		    var $target = $(event.target);
		    // emmit event with partten info, this will captured by resume
		    vent.trigger('resume:changePattern', $target.data('image'));
		},
	});

	return BackgroundMenuView;
});