define([
		'text!templates/resume/resume.html',
		'views/resume/itemname',
		'views/resume/itembirthday',
		'views/resume/itemgender',
		'views/resume/itemnationality',
		'views/resume/itemmarried',
		'views/resume/itemfirstarrive',
		'views/resume/itemitexperience',
		'views/resume/itemavailabledate',
		'views/resume/itemaddress',
		'views/resume/itemneareststation',
		'views/resume/itemtelno',
		'views/resume/itememail',
		'views/resume/itemhomepage',
		'views/resume/itemselfintroduction',
		'views/resume/itemlanguage',
		'views/resume/itempanel'
], function(
	resumeTemplate,
	NameView,
	BirthDayView,
	GenderView,
	NationalityView,
	MarriedView,
	FirstArriveView,
	ItExperienceView,
	AvailableDateView,
	AddressView,
	NearestStationView,
	TelNoView,
	EMailView,
	HomePageView,
	SelfIntroductionView,
	LanguageView,
	ItemPanelView) {

	var ResumeView = Backbone.Marionette.Layout.extend({

		// This view is a div
		tagName: 'div',

		// Class on HTML page
		className: 'well well-large container-fluid sl-panel',

		// ID on HTML page
		id: 'resumePanel',

		// Template
		template: resumeTemplate,

		regions: {
			nameArea: '#name',
			birthDayArea: '#birthDay',
			genderArea: '#gender',
			nationalityArea: '#nationality',
			marriedArea: '#married',
			addressArea: '#address',
			firstArriveArea: '#firstArrive',
			itExperienceArea: '#itExperience',
			nearestStationArea: '#nearestStation',
			availableDateArea: '#availableDate',
			telNoArea: '#telNo',
			emailArea: '#email',
			homePageArea: '#homePage',
			selfIntroductionArea: '#selfIntroduction',
			languageArea: '#language'
		},

		// Initializer
		initialize: function() {

			this.nameView = new NameView({model: this.model});
			this.birthDayView = new BirthDayView({model: this.model});
			this.genderView = new GenderView({model: this.model});
			this.nationalityView = new NationalityView({model: this.model});
			this.marriedView = new MarriedView({model: this.model});
			this.firstArriveView = new FirstArriveView({model: this.model});
			this.itExperienceView = new ItExperienceView({model: this.model});
			this.availableDateView = new AvailableDateView({model: this.model});
			this.addressView = new AddressView({model: this.model});
			this.nearestStationView = new NearestStationView({model: this.model});
			this.telNoView = new TelNoView({model: this.model});
			this.emailView = new EMailView({model: this.model});
			this.homePageView = new HomePageView({model: this.model});
			this.selfIntroductionView = new SelfIntroductionView({model: this.model});
			this.languageView = new LanguageView({model: this.model});
		},

		// Render
		onRender: function() {

			this.nameArea.show(this.nameView);
			this.birthDayArea.show(this.birthDayView);
			this.genderArea.show(this.genderView);
			this.nationalityArea.show(this.nationalityView);
			this.marriedArea.show(this.marriedView);
			this.firstArriveArea.show(this.firstArriveView);
			this.itExperienceArea.show(this.itExperienceView);
			this.availableDateArea.show(this.availableDateView);
			this.addressArea.show(this.addressView);
			this.nearestStationArea.show(this.nearestStationView);
			this.telNoArea.show(this.telNoView);
			this.emailArea.show(this.emailView);
			this.homePageArea.show(this.homePageView);
			this.selfIntroductionArea.show(this.selfIntroductionView);
			this.languageArea.show(this.languageView);
		}
	});

	return ResumeView;
});