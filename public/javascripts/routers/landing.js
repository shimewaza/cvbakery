define([], function() {

	var Router = Backbone.Marionette.AppRouter.extend({

		appRoutes: {
			// 'home': 'home',
			'login': 'toLogin',
			'register': 'toRegister',
			// 'resume': 'resume',
			// 'resume_edit': 'resume_edit'
		}
/*		home: function() {
		},

		login: function() {
			this._changeViewFade('login:show');
		},

		register: function() {
			this._changeViewFade('register:show');
		},

		resume: function() {
			this._changeViewSlide('resume:show');
		},

		resume_edit: function() {
			this._changeViewSlide('resume_edit:show');
		},

		_changeViewFade: function(pub) {
			var currentView = contentView.$el.find('.sl-panel:visible');

			if(currentView.length > 0) {
				currentView.fadeOut(function(){
					mediator.publish(pub);
				});
			} else {
				mediator.publish(pub);
			}
			// contentView.$el.find('.sl-panel:visible').fadeOut(function(){
			// 	mediator.publish(pub);
			// });
		},

		_changeViewSlide: function(pub) {
			var currentView = contentView.$el.find('.sl-panel:visible');

			if(currentView.length > 0) {
				currentView.hide('slide', {
					direction: 'left',
					easing: 'easeInQuart'
				}, function(){
					mediator.publish(pub);
				});
			} else {
				mediator.publish(pub);
			}
			// contentView.$el.find('.sl-panel:visible').fadeOut(function(){
			// 	mediator.publish(pub);
			// });
		}*/
	});

	return Router;
});