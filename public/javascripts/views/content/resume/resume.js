define([
		'text!templates/resume/resume.html',
		'views/base/basepanel',
		'views/content/resume/basicinfo',
		'views/content/resume/itempanel',
		'views/content/resume/languagebackground',
		'models/engineer',
		'models/account',
		'mediator-js'
], function(
	resumeTemplate,
	BaseView,
	BasicInfoView,
	ItemPanelView,
	LanguageBackgroundView,
	engineerModel,
	accountModel,
	mediator) {

	var ResumeView = BaseView.extend({

		// This view is a div
		tagName: 'div',

		// Class on HTML page
		className: 'well well-large container-fluid sl-panel',

		// ID on HTML page
		id: 'resumePanel',

		// Model
		model: engineerModel,

		// Template
		template: _.template(resumeTemplate),

		subViews: [],

		// Initializer
		initialize: function() {

			this.subViews.push(new ItemPanelView());

			this._initializeResume()

			// Model Event: Listen on model's _id, so this view will be rendered on first load
			this.listenTo(this.model, 'change:_id', this.render);

			// View Event
			this.events = _.extend({}, this.genericEvents, {});

			// Mediator event: Show up this view
			mediator.subscribe('resume:show', this.show, {}, this);
			mediator.subscribe('resume:addItem', this.addItem, {}, this);
		},

		// Render
		render: function() {

			this.$el.html(this.template(this.model.toJSON()))
			// .css('display', 'none')
			.appendTo('#content');

			_.each(this.subViews, function(subView) {
				subView.render();
			});

			_.each(this.model.get('languageBackground'), function(model) {
				(new LanguageBackgroundView({
					model: model
				})).render().show();
			});

			return this;
		},

		// Show this view
		show: function() {

			// Render the view
			this.render();

			// SlideIn the view
			this.$el.show('slide', {
				direction: 'right',
				easing: 'easeInQuart'
			});
		},

		addItem: function(data) {

			var itemModel = new Backbone.Model({
				value: '',
				name: data.name,
				icon: data.icon,
				title: data.title,
				content: data.content,
				trigger: 'hover',
				placement: 'bottom',
				parent: this.model
			});

			var itemView = new BasicInfoView({
				model: itemModel
			});

			itemView.render();
			itemView.switchToInput();

			this.subViews.push(itemView);
		},

		_initializeResume: function() {

			this._initializeItem('birthDay', {
				icon: 'icon-calendar',
				title: '生年月日',
				content: 'ご誕生日を入力してください。',
			});

			this._initializeItem('gender', {
				icon: 'icon-leaf',
				title: '性別',
				content: '性別を入力してください。',
			});

			this._initializeItem('nationality', {
				icon: 'icon-flag',
				title: '国籍',
				content: '国籍を入力してください。',
			});

			this._initializeItem('married', {
				icon: 'icon-heart',
				title: '婚姻状況',
				content: '婚姻状況を入力してください。',
			});

			this._initializeItem('address', {
				icon: 'icon-home',
				title: '住所',
				content: 'ご住所を入力してください。',
			});

			this._initializeItem('firstArrive', {
				icon: 'icon-plane',
				title: '初回来日',
				content: '初回来日を入力してください。',
			});

			this._initializeItem('itExperience', {
				icon: 'icon-briefcase',
				title: 'IT経験年数',
				content: 'IT経験年数を入力してください。',
			});

			this._initializeItem('nearestStation', {
				icon: 'icon-road',
				title: '最寄り駅',
				content: '最寄り駅を入力してください。',
			});

			this._initializeItem('dateOfAvailable', {
				icon: 'icon-ok',
				title: '稼働可能日',
				content: '稼働可能日を入力してください。',
			});

			this._initializeItem('telNo', {
				icon: 'icon-signal',
				title: '電話番号',
				content: '電話番号を入力してください。',
			});

			this._initializeItem('email', {
				icon: 'icon-envelope',
				title: 'E-mail',
				content: 'E-mailを入力してください。',
			});

			this._initializeItem('homePage', {
				icon: 'icon-globe',
				title: 'ホームページ',
				content: 'ホームページを入力してください。',
			});
		},

		_initializeItem: function(itemName, options) {

			var defaultOpt = {
				value: this.model.get(itemName),
				name: itemName,
				icon: 'icon-ok',
				title: 'New Item',
				content: 'Please input the value',
				trigger: 'hover',
				placement: 'bottom',
				parent: this.model
			};

			var itemModel = new Backbone.Model(_.extend(defaultOpt, options));

			if (this.model.get(itemName)) {

				this.subViews.push(new BasicInfoView({
					model: itemModel
				}));

			} else {
				mediator.publish('resume:missItem', itemModel);
			}
		},

		_addItem: function(itemName, options) {

			var defaultOpt = {
				value: this.model.get(itemName),
				name: itemName,
				icon: 'icon-ok',
				title: 'New Item',
				content: 'Please input the value',
				trigger: 'hover',
				placement: 'bottom',
			};

			var options = _.extend(defaultOpt, options);
			var itemModel = new Backbone.Model(options);
		}
	});

	return ResumeView;
});