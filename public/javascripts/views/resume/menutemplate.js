define([
	'views/resume/menubase',
	'text!templates/resume/menutemplate.html'
], function(
	BaseMenu,
	template) {

	var TemplateMenuView = BaseMenu.extend({

		className: 'navbar navbar-fixed-bottom',

		id: 'templateMenu',

		template: template,

		initialize: function() {
			this.events = _.extend({}, this.commonEvents, {
				'click img': 'changeTemplate'
			});
		},

		onRender: function() {
			// attach sample image to template sample button
			this.$el.find('img').each(function() {
			    var templateName = $(this).data('template-name');
			    var val = "/images/resume/sample/" + templateName + ".png";
			    $(this).popover({
			        title: 'フォーマットを変更',
			        content: '<img src="' + val + '" class="img-polaroid" style="display:block; height: 200px; width: auto;">',
			        placement: 'top',
			        trigger: 'hover',
			        html: true,
			        container: 'body'
			    });
			});
		},

		// Change resume template
		changeTemplate: function(event) {
		    // get clicked button
		    var $target = $(event.target);
		    var templateName = $target.data('template-name');

		    // set user setting about this item to "true"(display)
		    var data = {};
		    data['template'] = templateName;

		    // save the model
		    this.model.save(data, {
		        // if save success
		        success: function() {
		            // hide current resume with slide effect
		            $('#resumePanel').hide('slide', function() {
		                // emmit event with template info, this will captrued by conttorler
		                vent.trigger('resume:changeTemplate', templateName);
		            });
		        },
		        // use patch
		        patch: true
		    });
		},

	});

	return TemplateMenuView;
});