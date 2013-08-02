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
				'click .bk-sample': 'changePattern',
				'mouseover .bk-sample': 'previewPattern'
			});
		},

		onRender: function() {
			// attach sample image to background button 
			this.$el.find('.bk-sample').each(function() {
			    var imageName = $(this).data('image');
			    var val = "url('/images/pattern/" + imageName + "')";
			    var val2 = "/images/pattern/" + imageName;
			    $(this)
			        .css('background-image', val)
			        .popover({
			            title: '背景文様を変更:' + imageName,
			            content: '<img src="' + val2 + '" class="img-polaroid" style="display:block; height: 100px;">',
			            placement: 'top',
			            trigger: 'hover',
			            html: true,
			            container: 'body'
			        });
			});
		},

		// Change background partten
		changePattern: function(event) {
		    // get clicked partten
		    var $target = $(event.target);
		    // emmit event with partten info, this will captured by resume
		    vent.trigger('resume:changePattern', $target.data('image'));
		},

		// Preview background partten
		previewPattern: function(event) {
		    // get clicked partten
		    var $target = $(event.target);
		    var imageName = $target.data('image');
		    // change back patten
		    $('body').css('background', "url('/images/pattern/" + imageName + "') repeat");
		},
	});

	return BackgroundMenuView;
});