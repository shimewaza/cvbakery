define([
	'text!templates/resume/default/resume.html',
	'text!templates/resume/style1/resume.html',
	'text!templates/resume/style2/resume.html',
	'text!templates/resume/style3/resume.html',
	'text!templates/resume/style4/resume.html',
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
	'views/resume/compositeworkexperience',
	'views/resume/compositelanguage',
	'views/resume/compositequalification',
	'views/resume/compositeskill',
	'views/resume/contextmenupanel'
], function(
	defaultTemplate,
	style1Template,
	style2Template,
	style3Template,
	style4Template,
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
	WorkExperienceComposite,
	LanguageComposite,
	QualificationComposite,
	SkillComposite,
	ContextMenuPanelView) {

	// Resume View
	var ResumeView = Backbone.Marionette.Layout.extend({

		// This view is a div
		tagName: 'div',

		// Class on HTML page
		className: 'well well-large container-fluid sl-panel',

		// ID on HTML page
		id: 'resumePanel',

		// Template
		getTemplate: function() {
			if (this.options.templateRef === "default") {
				this.$el.addClass('default');
				return defaultTemplate;
			} else if (this.options.templateRef === "style1") {
				this.$el.addClass('style1');
				return style1Template;
			} else if (this.options.templateRef === "style2") {
				this.$el.addClass('style2');
				return style2Template;
			} else if (this.options.templateRef === "style3") {
				this.$el.addClass('style3');
				return style3Template;
			} else if (this.options.templateRef === "style4") {
				this.$el.addClass('style4');
				return style4Template;
			}
		},

		// UI
		ui: {
			// Modal dialog for user's first visit
			instructionModal: '#instructionModal'
		},

		// Events
		events: {
			'click #instructionStartBtn': 'onInstructionStart',
			'click #instructionCancelBtn': 'onInstructionCancel'
		},

		// Regions
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
			workExperienceArea: '#workExperience',
			languageArea: '#language',
			qualificationArea: '#qualification',
			skillArea: '#skill',
			contextMenuArea: '#contextMenu'
		},

		// Initializer
		initialize: function() {

			// user drop effection for every region's open method
			this.regionManager.each(function(region) {
				region.open = function(view) {
					this.$el.hide();
					this.$el.html(view.el);
					this.$el.show('drop');
				};
			});

			// build context menu
			this.contextMenuPanelView = new ContextMenuPanelView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build photo view
			this.photoView = new PhotoView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build name view
			this.nameView = new NameView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build birth day view
			this.birthDayView = new BirthDayView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build gender view
			this.genderView = new GenderView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build nationality view
			this.nationalityView = new NationalityView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build marrage view
			this.marriedView = new MarriedView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build first arrive view
			this.firstArriveView = new FirstArriveView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build IT experience view
			this.itExperienceView = new ItExperienceView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build availabilty view
			this.availableDateView = new AvailableDateView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build address view
			this.addressView = new AddressView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build nearest station view
			this.nearestStationView = new NearestStationView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build tel no view
			this.telNoView = new TelNoView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build email view
			this.emailView = new EMailView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build home page view
			this.homePageView = new HomePageView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// build self introduction view
			this.selfIntroductionView = new SelfIntroductionView({
				model: this.model,
				templateRef: this.options.templateRef
			});

			// get education collection
			var educations = new Backbone.Collection(this.model.get('education'));
			// build education view
			this.educationComposite = new EducationComposite({
				model: this.model,
				collection: educations,
				templateRef: this.options.templateRef
			});

			// get career collection
			var careers = new Backbone.Collection(this.model.get('career'));
			// build career view
			this.careerComposite = new CareerComposite({
				model: this.model,
				collection: careers,
				templateRef: this.options.templateRef
			});

			// get work experience collection
			var workExperiences = new Backbone.Collection(this.model.get('workExperience'));
			// build work experience view
			this.workExperienceComposite = new WorkExperienceComposite({
				model: this.model,
				collection: workExperiences,
				templateRef: this.options.templateRef
			});

			// get language collection
			var languages = new Backbone.Collection(this.model.get('languageBackground'));
			// build language view
			this.languageComposite = new LanguageComposite({
				model: this.model,
				collection: languages,
				templateRef: this.options.templateRef
			});

			// get qualification collection
			var qualifications = new Backbone.Collection(this.model.get('qualification'));
			// build qualification view
			this.qualificationComposite = new QualificationComposite({
				model: this.model,
				collection: qualifications,
				templateRef: this.options.templateRef
			});

			// get skill collection
			var skills = new Backbone.Collection(this.model.get('skill'));
			// build skill view
			this.skillComposite = new SkillComposite({
				model: this.model,
				collection: skills,
				templateRef: this.options.templateRef
			});

			// setup user instruction
			this._setupTour();

			// listen to context menu event: add item 
			this.listenTo(vent, 'resume:itemAdded', this.onItemAdded);
			// listen to context menu event: change back pattern
			this.listenTo(vent, 'resume:changePattern', this.onChangePatter);
			// listen to context menu event: change template
			this.listenTo(vent, 'resume:changeTemplate', this.onChangeTemplate);
			// listen to main page event: show user instruction
			this.listenTo(vent, 'resume:showTour', this.onShowTour);
		},

		// Render
		onRender: function() {

			var self = this;

			// get user setting
			var setting = this.model.get('setting');

			// change back pattern to user setting
			this._changeBackground(this.model.get('backgroundImg'));

			// show(add) context menu
			this.contextMenuArea.show(this.contextMenuPanelView);
			// activate context menu
			$('#content').contextmenu({
				target: '#contextMenu'
			});

			// show photo view
			this.photoArea.show(this.photoView);

			// show name view
			this.nameArea.show(this.nameView);

			if (setting.birthDay)
				this.birthDayArea.show(this.birthDayView);
			else
				this.birthDayView.removeItem({
					silence: true
				});

			if (setting.gender)
				this.genderArea.show(this.genderView);
			else
				this.genderView.removeItem({
					silence: true
				});

			if (setting.nationality)
				this.nationalityArea.show(this.nationalityView);
			else
				this.nationalityView.removeItem({
					silence: true
				});

			if (setting.married)
				this.marriedArea.show(this.marriedView);
			else
				this.marriedView.removeItem({
					silence: true
				});

			if (setting.firstArrive)
				this.firstArriveArea.show(this.firstArriveView);
			else
				this.firstArriveView.removeItem({
					silence: true
				});

			if (setting.itExperience)
				this.itExperienceArea.show(this.itExperienceView);
			else
				this.itExperienceView.removeItem({
					silence: true
				});

			if (setting.availableDate)
				this.availableDateArea.show(this.availableDateView);
			else
				this.availableDateView.removeItem({
					silence: true
				});

			if (setting.address)
				this.addressArea.show(this.addressView);
			else
				this.addressView.removeItem({
					silence: true
				});

			if (setting.nearestStation)
				this.nearestStationArea.show(this.nearestStationView);
			else
				this.nearestStationView.removeItem({
					silence: true
				});

			if (setting.telNo)
				this.telNoArea.show(this.telNoView);
			else
				this.telNoView.removeItem({
					silence: true
				});

			if (setting.email)
				this.emailArea.show(this.emailView);
			else
				this.emailView.removeItem({
					silence: true
				});

			if (setting.homePage)
				this.homePageArea.show(this.homePageView);
			else
				this.homePageView.removeItem({
					silence: true
				});

			if (setting.selfIntroduction)
				this.selfIntroductionArea.show(this.selfIntroductionView);
			else
				this.selfIntroductionView.removeItem({
					silence: true
				});

			if (setting.education)
				this.educationArea.show(this.educationComposite);
			else
				this.educationComposite.removeItem({
					silence: true
				});

			if (setting.career)
				this.careerArea.show(this.careerComposite);
			else
				this.careerComposite.removeItem({
					silence: true
				});

			if (setting.workExperience)
				this.workExperienceArea.show(this.workExperienceComposite);
			else
				this.workExperienceComposite.removeItem({
					silence: true
				});

			if (setting.languageBackground)
				this.languageArea.show(this.languageComposite);
			else
				this.languageComposite.removeItem({
					silence: true
				});

			if (setting.qualification)
				this.qualificationArea.show(this.qualificationComposite);
			else
				this.qualificationComposite.removeItem({
					silence: true
				});

			if (setting.skill)
				this.skillArea.show(this.skillComposite);
			else
				this.skillComposite.removeItem({
					silence: true
				});

			// if this is the fisrt time of user access
			if (setting.isFirstVisit) {
				// show user instruction modal, delay for 1s
				setTimeout(function() {
					self.ui.instructionModal.modal('show');
				}, 1000);
			}
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

			if (data.item == "workExperience") {
				var workExperiences = new Backbone.Collection(this.model.get('workExperience'));
				this.workExperienceComposite = new WorkExperienceComposite({
					model: this.model,
					collection: workExperiences,
					templateRef: this.options.templateRef
				});
				this.workExperienceArea.show(this.workExperienceComposite);
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

		// On user clicked OK button of the instruction modal
		onInstructionStart: function() {

			var self = this;

			// hide modal
			this.ui.instructionModal.modal('hide');
			// clear the first time visit flag
			this._setUserVisited();
			// start instruction after 0.5s
			setTimeout(function() {
				self.tour.start();
			}, 500);
		},

		// On user clicked NO button of the instruction modal
		onInstructionCancel: function() {
			// just clear the first time visit flag
			this._setUserVisited();
		},

		// Clear the first time visit flag
		_setUserVisited: function() {

			// prepare the date for model update
			var data = this.model.get('setting');
			data['isFirstVisit'] = false;

			// save the model
			this.model.save({
				setting: data
			}, {
				// use patch
				patch: true
			});
		},

		// Change back pattern
		onChangePatter: function(imageName) {

			var self = this;

			// prepare the date for model update
			var data = {};
			data['backgroundImg'] = imageName;

			// save the model
			this.model.save(data, {
				// if save success
				success: function() {
					self._changeBackground(imageName);
				},
				// use patch
				patch: true
			});
		},

		// Change back patten actually
		_changeBackground: function(imageName) {

			// do nothing when told nothing
			if (!imageName) return;

			// get the current back patten name with regex
			var currentBk = /.*[\/|\\](.*)\)$/.exec($('body').css('background-image'))[1];

			// do nothing if the same pattern
			if (imageName == currentBk) return;

			// change back patten
			$('body').css('background', "url('/images/resume/" + imageName + "') repeat");
		},

		// Run user instruction
		onShowTour: function() {
			this.tour.start();
		},

		// Setup user instruction
		_setupTour: function() {

			var self = this;

			this.tour = new Tour({
				backdrop: true,
				onEnd: function() {
					$.removeCookie('tour_current_step');
					$.removeCookie('tour_end');
				}
			});

			this.tour.addSteps([{
				element: "#photo",
				title: "ここは顔写真です",
				content: "履歴書に写真をつけるのはイメージアップには効果的。",
				onHide: function() {
					self.photoView.switchToEditor();
				}
			}, {
				element: "#photo",
				title: "顔写真を添付しましょう",
				content: "写真をクリックすると、アップロードボタン表示します。",
				onHide: function() {
					self.photoView.switchToValue();
				}
			}, {
				element: "#basic-info",
				title: "こちらは基本情報です",
				content: "各項目クリックしたら、編集できます。",
				onHide: function() {
					self.telNoView.switchToEditor();
				}
			}, {
				element: "#telNo",
				title: "例えば、電話番号",
				content: '項目自体を履歴書に載せたくない場合は、\
						<button class="btn btn-small btn-warning btn-remove"><i class="icon-remove icon-white"></i></button>\
						ボタンで隠せます。',
				onHide: function() {
					self.telNoView.switchToValue();
				}
			}, {
				element: "#skill",
				title: "複合な項目もあります",
				content: "基本情報と同じく、クリックしだい編集できます。初めての時はレコード0件です。",
				onHide: function() {
					self.skillComposite.switchToEditor();
				}
			}, {
				element: "#skill",
				title: "スキルを例としたら",
				content: 'レコード作成、追加する場合は、\
						<button class="btn btn-small btn-info btn-add"><i class="icon-plus icon-white"></i></button>\
						ボタンをクリックします。',
				onHide: function() {
					self.skillComposite.addItem();
				}
			}, {
				element: "#skill .item-container .sl-editor",
				title: "スキルを例としたら",
				content: 'これは新たに作成したレコードです。'
			}, {
				element: "#skill .item-container .sl-editor input",
				title: "スキルを例としたら",
				content: 'ここでスキルの名称を入力出来ます。'
			}, {
				element: "#skill .item-container .sl-editor .sl-slider",
				title: "スキルを例としたら",
				content: 'ここはスキルレベルを示すゲージです、ハンドルをドラグして調整出来ます。'
			}, {
				element: "#skill .item-container .sl-editor .btn-delete",
				title: "スキルを例としたら",
				content: '該当レコードを不要となりましたら、\
						<button class="btn btn-small btn-danger btn-delete"><i class="icon-minus icon-white"></i></button>\
						ボタンで削除できます。',
				onHide: function() {
					self.skillComposite.switchToValue();
					self.educationComposite.switchToEditor();
					self.educationComposite.addItem();
				}
			}, {
				element: "#education .item-container .sl-editor",
				title: "他の項目も同じです",
				content: '項目により編集できる内容が違うですが、使い方は一緒です。',
				onHide: function() {
					self.educationComposite.switchToValue();
					console.log($('#education'));
					$('#education').trigger({
						type: 'click',
						which: 3
					});
				}
			}, {
				element: "#contextMenu",
				title: "スキルを例としたら",
				content: 'ここはスキルレベルを示すゲージです、ハンドルをドラグして調整出来ます。'
			},]);
		}
	});

	return ResumeView;
});