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
		'views/resume/compositequalification'
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
	QualificationComposite) {

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

			var telnos = new Backbone.Collection(this.model.get('telNos'));
			this.telNoComposite = new TelNoComposite({
				model: this.model,
				collection: telnos
			});

			var emails = new Backbone.Collection(this.model.get('emails'));
			this.emailComposite = new EMailComposite({
				model: this.model,
				collection: emails
			});

			var homepages = new Backbone.Collection(this.model.get('homePages'));
			this.homePageComposite = new HomePageComposite({
				model: this.model,
				collection: homepages
			});

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

			this.listenTo(vent, 'resume:itemAdded', this.onItemAdded);
		},

		// Render
		onRender: function() {

			var self = this;
			var setting = this.model.get('setting');

			this.nameArea.show(this.nameView);

			if (setting.birthDay)
				this.birthDayArea.show(this.birthDayView);
			else
				this.birthDayView.removeItem(true);

			if (setting.gender)
				this.genderArea.show(this.genderView);
			else
				this.genderView.removeItem(true);

			if (setting.nationality)
				this.nationalityArea.show(this.nationalityView);
			else
				this.nationalityView.removeItem(true);

			if (setting.married)
				this.marriedArea.show(this.marriedView);
			else
				this.marriedView.removeItem(true);

			if (setting.firstArrive)
				this.firstArriveArea.show(this.firstArriveView);
			else
				this.firstArriveView.removeItem(true);

			if (setting.itExperience)
				this.itExperienceArea.show(this.itExperienceView);
			else
				this.itExperienceView.removeItem(true);

			if (setting.available)
				this.availableDateArea.show(this.availableDateView);
			else
				this.availableDateView.removeItem(true);

			if (setting.address)
				this.addressArea.show(this.addressView);
			else
				this.addressView.removeItem(true);

			if (setting.nearestStation)
				this.nearestStationArea.show(this.nearestStationView);
			else
				this.nearestStationView.removeItem(true);

			if (setting.telNos)
				this.telNoArea.show(this.telNoComposite);
			else
				this.telNoComposite.removeItem(true);

			if (setting.emails)
				this.emailArea.show(this.emailComposite);
			else
				this.emailComposite.removeItem(true);

			if (setting.homePages)
				this.homePageArea.show(this.homePageComposite);
			else
				this.homePageComposite.removeItem(true);

			if (setting.selfIntroduction)
				this.selfIntroductionArea.show(this.selfIntroductionView);
			else
				this.selfIntroductionView.removeItem(true);

			if (setting.education)
				this.educationArea.show(this.educationComposite);
			else
				this.educationComposite.removeItem(true);

			if (setting.career)
				this.careerArea.show(this.careerComposite);
			else
				this.careerComposite.removeItem(true);

			if (setting.languageBackground)
				this.languageArea.show(this.languageComposite);
			else
				this.languageComposite.removeItem(true);

			if (setting.qualification)
				this.qualificationArea.show(this.qualificationComposite);
			else
				this.qualificationComposite.removeItem(true);

			this.$el.find('#fileupload').fileupload({
				type: 'PUT',
				dataType: 'json',
				done: function(e, data) {
					$.each(data.result.files, function(index, file) {
						$('<p/>').text(file.name).appendTo(self.$el);
					});
				}
			});
		},

		onItemAdded: function(data) {

			if (data.item == "birthDay") {
				this.birthDayView = new BirthDayView({
					model: this.model
				});
				this.birthDayArea.show(this.birthDayView);
				return;
			}

			if (data.item == "gender") {
				this.genderView = new GenderView({
					model: this.model
				});
				this.genderArea.show(this.genderView);
				return;
			}

			if (data.item == "nationality") {
				this.nationalityView = new NationalityView({
					model: this.model
				});
				this.nationalityArea.show(this.nationalityView);
				return;
			}

			if (data.item == "married") {
				this.marriedView = new MarriedView({
					model: this.model
				});
				this.marriedArea.show(this.marriedView);
				return;
			}

			if (data.item == "firstArrive") {
				this.firstArriveView = new FirstArriveView({
					model: this.model
				});
				this.firstArriveArea.show(this.firstArriveView);
				return;
			}

			if (data.item == "itExperience") {
				this.itExperienceView = new ItExperienceView({
					model: this.model
				});
				this.itExperienceArea.show(this.itExperienceView);
				return;
			}

			if (data.item == "availableDate") {
				this.availableDateView = new AvailableDateView({
					model: this.model
				});
				this.availableDateArea.show(this.availableDateView);
				return;
			}

			if (data.item == "address") {
				this.addressView = new AddressView({
					model: this.model
				});
				this.addressArea.show(this.addressView);
				return;
			}

			if (data.item == "nearestStation") {
				this.nearestStationView = new NearestStationView({
					model: this.model
				});
				this.nearestStationArea.show(this.nearestStationView);
				return;
			}

			if (data.item == "telNos") {
				var telnos = new Backbone.Collection(this.model.get('telNos'));
				this.telNoComposite = new TelNoComposite({
					model: this.model,
					collection: telnos
				});
				this.telNoArea.show(this.telNoComposite);
				return;
			}

			if (data.item == "emails") {
				var emails = new Backbone.Collection(this.model.get('emails'));
				this.emailComposite = new EMailComposite({
					model: this.model,
					collection: emails
				});
				this.emailArea.show(this.emailComposite);
				return;
			}

			if (data.item == "homePages") {
				var homepages = new Backbone.Collection(this.model.get('homePages'));
				this.homePageComposite = new HomePageComposite({
					model: this.model,
					collection: homepages
				});
				this.homePageArea.show(this.homePageComposite);
				return;
			}

			if (data.item == "selfIntroduction") {
				this.selfIntroductionView = new SelfIntroductionView({
					model: this.model
				});
				this.selfIntroductionArea.show(this.selfIntroductionView);
				return;
			}

			if (data.item == "education") {
				var educations = new Backbone.Collection(this.model.get('education'));
				this.educationComposite = new EducationComposite({
					model: this.model,
					collection: educations
				});
				this.educationArea.show(this.educationComposite);
				return;
			}

			if (data.item == "career") {
				var careers = new Backbone.Collection(this.model.get('career'));
				this.careerComposite = new CareerComposite({
					model: this.model,
					collection: careers
				});
				this.careerArea.show(this.careerComposite);
				return;
			}

			if (data.item == "languageBackground") {
				var languages = new Backbone.Collection(this.model.get('languageBackground'));
				this.languageComposite = new LanguageComposite({
					model: this.model,
					collection: languages
				});
				this.languageArea.show(this.languageComposite);
				return;
			}

			if (data.item == "qualification") {
				var qualifications = new Backbone.Collection(this.model.get('qualification'));
				this.qualificationComposite = new QualificationComposite({
					model: this.model,
					collection: qualifications
				});
				this.qualificationArea.show(this.qualificationComposite);
				return;
			}

		}
	});

	return ResumeView;
});