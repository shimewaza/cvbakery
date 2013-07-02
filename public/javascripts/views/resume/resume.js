define([
		'text!templates/resume/default/resume.html',
		'text!templates/resume/style1/resume.html',
		'views/resume/itemphoto',
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
		'views/resume/compositeeducation',
		'views/resume/compositecareer',
		'views/resume/compositelanguage',
		'views/resume/compositequalification',
		'views/resume/compositeskill',
		'views/resume/contextmenupanel'
], function(
	defaultTemplate,
	style1Template,
	PhotoView,
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
	EducationComposite,
	CareerComposite,
	LanguageComposite,
	QualificationComposite,
	SkillComposite,
	ContextMenuPanelView) {

	var ResumeView = Backbone.Marionette.Layout.extend({

		// This view is a div
		tagName: 'div',

		// Class on HTML page
		className: 'well well-large container-fluid sl-panel',

		// ID on HTML page
		id: 'resumePanel',

		// Template
		// template: resumeTemplate,

		getTemplate: function() {
			if (this.options.templateRef === "default") {
				this.$el.addClass('default');
				return defaultTemplate;
			} else if (this.options.templateRef === "style1") {
				this.$el.addClass('style1');
				return style1Template;
			}
		},

		regions: {
			photoArea: '#photo',
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
			qualificationArea: '#qualification',
			skillArea: '#skill',
			contextMenuArea: '#contextMenu'
		},

		// Initializer
		initialize: function() {

			this.regionManager.each(function(region) {
				region.open = function(view) {
					this.$el.hide();
					this.$el.html(view.el);
					this.$el.show('drop');
				};
			});

			this.contextMenuPanelView = new ContextMenuPanelView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.photoView = new PhotoView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.nameView = new NameView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.birthDayView = new BirthDayView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.genderView = new GenderView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.nationalityView = new NationalityView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.marriedView = new MarriedView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.firstArriveView = new FirstArriveView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.itExperienceView = new ItExperienceView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.availableDateView = new AvailableDateView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.addressView = new AddressView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.nearestStationView = new NearestStationView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.telNoView = new TelNoView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.emailView = new EMailView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.homePageView = new HomePageView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			this.selfIntroductionView = new SelfIntroductionView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			var educations = new Backbone.Collection(this.model.get('education'));
			this.educationComposite = new EducationComposite({
				model: this.model,
				collection: educations,
				templateRef: this.options.templateRef
			});

			var careers = new Backbone.Collection(this.model.get('career'));
			this.careerComposite = new CareerComposite({
				model: this.model,
				collection: careers,
				templateRef: this.options.templateRef
			});

			var languages = new Backbone.Collection(this.model.get('languageBackground'));
			this.languageComposite = new LanguageComposite({
				model: this.model,
				collection: languages,
				templateRef: this.options.templateRef
			});

			var qualifications = new Backbone.Collection(this.model.get('qualification'));
			this.qualificationComposite = new QualificationComposite({
				model: this.model,
				collection: qualifications,
				templateRef: this.options.templateRef
			});

			var skills = new Backbone.Collection(this.model.get('skill'));
			this.skillComposite = new SkillComposite({
				model: this.model,
				collection: skills,
				templateRef: this.options.templateRef
			});

			this.listenTo(vent, 'resume:itemAdded', this.onItemAdded);
			this.listenTo(vent, 'resume:changePattern', this.onChangePatter);
			this.listenTo(vent, 'resume:changeTemplate', this.onChangeTemplate);
		},

		// Render
		onRender: function() {

			var self = this;
			var setting = this.model.get('setting');

			this.contextMenuArea.show(this.contextMenuPanelView);

			this.photoArea.show(this.photoView);
			this.nameArea.show(this.nameView);

			if (setting.birthDay)
				this.birthDayArea.show(this.birthDayView);
			else
				this.birthDayView.removeItem();

			if (setting.gender)
				this.genderArea.show(this.genderView);
			else
				this.genderView.removeItem();

			if (setting.nationality)
				this.nationalityArea.show(this.nationalityView);
			else
				this.nationalityView.removeItem();

			if (setting.married)
				this.marriedArea.show(this.marriedView);
			else
				this.marriedView.removeItem();

			if (setting.firstArrive)
				this.firstArriveArea.show(this.firstArriveView);
			else
				this.firstArriveView.removeItem();

			if (setting.itExperience)
				this.itExperienceArea.show(this.itExperienceView);
			else
				this.itExperienceView.removeItem();

			if (setting.availableDate)
				this.availableDateArea.show(this.availableDateView);
			else
				this.availableDateView.removeItem();

			if (setting.address)
				this.addressArea.show(this.addressView);
			else
				this.addressView.removeItem();

			if (setting.nearestStation)
				this.nearestStationArea.show(this.nearestStationView);
			else
				this.nearestStationView.removeItem();

			if (setting.telNo)
				this.telNoArea.show(this.telNoView);
			else
				this.telNoView.removeItem();

			if (setting.email)
				this.emailArea.show(this.emailView);
			else
				this.emailView.removeItem();

			if (setting.homePage)
				this.homePageArea.show(this.homePageView);
			else
				this.homePageView.removeItem();

			if (setting.selfIntroduction)
				this.selfIntroductionArea.show(this.selfIntroductionView);
			else
				this.selfIntroductionView.removeItem();

			if (setting.education)
				this.educationArea.show(this.educationComposite);
			else
				this.educationComposite.removeItem();

			if (setting.career)
				this.careerArea.show(this.careerComposite);
			else
				this.careerComposite.removeItem();

			if (setting.languageBackground)
				this.languageArea.show(this.languageComposite);
			else
				this.languageComposite.removeItem();

			if (setting.qualification)
				this.qualificationArea.show(this.qualificationComposite);
			else
				this.qualificationComposite.removeItem();

			if (setting.skill)
				this.skillArea.show(this.skillComposite);
			else
				this.skillComposite.removeItem();

			$('#content').contextmenu({
				target: '#contextMenu'
			});
		},

		onItemAdded: function(data) {

			if (data.item == "birthDay") {
				this.birthDayView = new BirthDayView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.birthDayArea.show(this.birthDayView);
				return;
			}

			if (data.item == "gender") {
				this.genderView = new GenderView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.genderArea.show(this.genderView);
				return;
			}

			if (data.item == "nationality") {
				this.nationalityView = new NationalityView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.nationalityArea.show(this.nationalityView);
				return;
			}

			if (data.item == "married") {
				this.marriedView = new MarriedView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.marriedArea.show(this.marriedView);
				return;
			}

			if (data.item == "firstArrive") {
				this.firstArriveView = new FirstArriveView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.firstArriveArea.show(this.firstArriveView);
				return;
			}

			if (data.item == "itExperience") {
				this.itExperienceView = new ItExperienceView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.itExperienceArea.show(this.itExperienceView);
				return;
			}

			if (data.item == "availableDate") {
				this.availableDateView = new AvailableDateView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.availableDateArea.show(this.availableDateView);
				return;
			}

			if (data.item == "address") {
				this.addressView = new AddressView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.addressArea.show(this.addressView);
				return;
			}

			if (data.item == "nearestStation") {
				this.nearestStationView = new NearestStationView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.nearestStationArea.show(this.nearestStationView);
				return;
			}

			if (data.item == "telNo") {
				this.telNoView = new TelNoView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.telNoArea.show(this.telNoView);
				return;
			}

			if (data.item == "email") {
				this.emailView = new EMailView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.emailArea.show(this.emailView);
				return;
			}

			if (data.item == "homePage") {
				this.homePageView = new HomePageView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.homePageArea.show(this.homePageView);
				return;
			}

			if (data.item == "selfIntroduction") {
				this.selfIntroductionView = new SelfIntroductionView({
					model: this.model,
					templateRef: this.options.templateRef
				});
				this.selfIntroductionArea.show(this.selfIntroductionView);
				return;
			}

			if (data.item == "education") {
				var educations = new Backbone.Collection(this.model.get('education'));
				this.educationComposite = new EducationComposite({
					model: this.model,
					collection: educations,
					templateRef: this.options.templateRef
				});
				this.educationArea.show(this.educationComposite);
				return;
			}

			if (data.item == "career") {
				var careers = new Backbone.Collection(this.model.get('career'));
				this.careerComposite = new CareerComposite({
					model: this.model,
					collection: careers,
					templateRef: this.options.templateRef
				});
				this.careerArea.show(this.careerComposite);
				return;
			}

			if (data.item == "languageBackground") {
				var languages = new Backbone.Collection(this.model.get('languageBackground'));
				this.languageComposite = new LanguageComposite({
					model: this.model,
					collection: languages,
					templateRef: this.options.templateRef
				});
				this.languageArea.show(this.languageComposite);
				return;
			}

			if (data.item == "qualification") {
				var qualifications = new Backbone.Collection(this.model.get('qualification'));
				this.qualificationComposite = new QualificationComposite({
					model: this.model,
					collection: qualifications,
					templateRef: this.options.templateRef
				});
				this.qualificationArea.show(this.qualificationComposite);
				return;
			}

			if (data.item == "skill") {
				var skills = new Backbone.Collection(this.model.get('skill'));
				this.skillComposite = new SkillComposite({
					model: this.model,
					collection: skills,
					templateRef: this.options.templateRef
				});
				this.skillArea.show(this.skillComposite);
				return;
			}

		},

		onChangePatter: function(imageName) {

			// prepare the date for model update
			var data = {};
			data['backgroundImg'] = imageName;

			// save the model
			this.model.save(data, {
				// if save success
				success: function() {
					var val = "url('/images/resume/" + imageName + "')";
					$('body').css('background', val + ' repeat');
				},
				// use patch
				patch: true
			});
		}
	});

	return ResumeView;
});