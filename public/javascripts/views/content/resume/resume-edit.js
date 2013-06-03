define([
	'text!templates/resume/resume-edit.html',
	'views/base/basepanel',
	'models/engineer',
	'mediator-js'
], function(resumeTemplate, BaseView, engineerModel, mediator) {

	var ResumeView = BaseView.extend({

		// This view is a div
		tagName: 'div',

		// Class on HTML page
		className: 'well well-large container-fluid sl-panel',

		// ID on HTML page
		id: 'profilePanel',

		model: engineerModel,

		template: _.template(resumeTemplate),

		initialize: function() {
			// this.listenTo(this.model, 'change', this.render);
			mediator.subscribe('resume_edit:show', this.show, {}, this);
		},

		render: function() {

			this.$el.html(this.template(this.model.toJSON()))
				.css('display', 'none')
				.appendTo('#content');

			return this;
		},

		onLogout: function() {
		},

		show: function() {
			this.render();
			this.$el.show('slide', {
				direction: 'right',
				easing: 'easeInQuart'
			});
		}
	});

	return new ResumeView();
});