define([
		'views/base/baseframe',
		'views/content/home',
		'views/content/login',
		'views/content/register',
		'views/content/resume/resume',
		'views/content/resume/resume-edit',
		'models/account',
		'models/engineer',
		'mediator-js'
], function(
	BaseView,
	homeView,
	loginView,
	registerView,
	ResumeView,
	resumeEditView,
	accountModel,
	EngineerModel,
	mediator) {

	var ContentView = BaseView.extend({

		el: $('#content'),

		initialize: function() {

			// enable default user event
			this.events = _.extend({}, this.genericEvents, {
				'click #fullScreenBtn': 'signalFullScreen',
				'click #partScreenBtn': 'signalShowTools',
				'click #logoutBtn': 'logout'
			});

			mediator.subscribe('user:login', this.onLogin, {}, this);
		},

		signalFullScreen: function() {
			mediator.publish('page:fullScreen');
			this.$el.find('#fullScreenBtn,#partScreenBtn').toggle();

			var userId = accountModel && accountModel.get('_id');

			if (userId) {
				sessionStorage.setItem('selink:' + userId + ':screenMode', 'full-screen');
			}
		},

		signalShowTools: function() {
			mediator.publish('page:partScreen');
			this.$el.find('#fullScreenBtn,#partScreenBtn').toggle();

			var userId = accountModel && accountModel.get('_id');

			if (userId) {
				sessionStorage.setItem('selink:' + userId + ':screenMode', 'part-screen');
			}
		},

		logout: function() {

			var self = this;

			$.ajax({

				url: '/logout',

				type: 'GET',

				dataType: 'json',

				success: function(data) {
					mediator.publish('user:logout');
				}
			});
		},

		onLogin: function(account) {
			var engineerModel = new EngineerModel({
				_id: account.userInfo.profileId
			});

			engineerModel.fetch({
				success: function() {
					var resumeView = new ResumeView({
						model: engineerModel
					});
				}
			});
		}
	});

	return new ContentView();
});