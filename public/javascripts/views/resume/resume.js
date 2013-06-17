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
		'views/resume/compositetelno',
		'views/resume/compositeemail',
		'views/resume/compositehomepage',
		'views/resume/itemselfintroduction',
		'views/resume/compositeeducation',
		'views/resume/compositecareer',
		'views/resume/compositelanguage',
		'views/resume/compositequalification',
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
	TelNoComposite,
	EMailComposite,
	HomePageComposite,
	SelfIntroductionView,
	EducationComposite,
	CareerComposite,
	LanguageComposite,
	QualificationComposite,
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
			educationArea: '#education',
			careerArea: '#career',
			languageArea: '#language',
			qualificationArea: '#qualification'
		},

		// Initializer
		initialize: function() {

			this.nameView = new NameView({
				model: this.model
			});
			this.birthDayView = new BirthDayView({
				model: this.model
			});
			this.genderView = new GenderView({
				model: this.model
			});
			this.nationalityView = new NationalityView({
				model: this.model
			});
			this.marriedView = new MarriedView({
				model: this.model
			});
			this.firstArriveView = new FirstArriveView({
				model: this.model
			});
			this.itExperienceView = new ItExperienceView({
				model: this.model
			});
			this.availableDateView = new AvailableDateView({
				model: this.model
			});
			this.addressView = new AddressView({
				model: this.model
			});
			this.nearestStationView = new NearestStationView({
				model: this.model
			});
			// this.telNoView = new TelNoView({
			// 	model: this.model
			// });

			var telnos = new Backbone.Collection(this.model.get('telNo'));
			this.telNoComposite = new TelNoComposite({
				model: this.model,
				collection: telnos
			});
			var emails = new Backbone.Collection(this.model.get('email'));
			this.emailComposite = new EMailComposite({
				model: this.model,
				collection: emails
			});
			var homepages = new Backbone.Collection(this.model.get('homePage'));
			this.homePageComposite = new HomePageComposite({
				model: this.model,
				collection: homepages
			});
			// this.emailView = new EMailView({
			// 	model: this.model
			// });
			// this.homePageView = new HomePageView({
			// 	model: this.model
			// });
			this.selfIntroductionView = new SelfIntroductionView({
				model: this.model
			});

			var educations = new Backbone.Collection(this.model.get('education'));
			this.educationComposite = new EducationComposite({
				model: this.model,
				collection: educations
			});

			var careers = new Backbone.Collection(this.model.get('career'));
			this.careerComposite = new CareerComposite({
				model: this.model,
				collection: careers
			});

			var languages = new Backbone.Collection(this.model.get('languageBackground'));
			this.languageComposite = new LanguageComposite({
				model: this.model,
				collection: languages
			});

			var qualifications = new Backbone.Collection(this.model.get('qualification'));
			this.qualificationComposite = new QualificationComposite({
				model: this.model,
				collection: qualifications
			});
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
			this.telNoArea.show(this.telNoComposite);
			this.emailArea.show(this.emailComposite);
			this.homePageArea.show(this.homePageComposite);
			this.selfIntroductionArea.show(this.selfIntroductionView);
			this.educationArea.show(this.educationComposite);
			this.careerArea.show(this.careerComposite);
			this.languageArea.show(this.languageComposite);
			this.qualificationArea.show(this.qualificationComposite);
		}
	});

	return ResumeView;
});