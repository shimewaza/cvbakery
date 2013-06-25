define([
        'views/page',
        'views/resume/resume',
        'models/engineer',
        'text!templates/resume/resume.html',
        'text!templates/resume/resume-two-columns.html'
], function(
    PageView, 
    ResumeView, 
    EngineerModel,
    resumeTemplate,
    resumeTemplateTwoCols) {

    var Controller = Backbone.Marionette.Controller.extend({

        initialize: function(options) {
            this.app = options.app;
            this.account = options.account;

            this.pageView = new PageView({
                model: new Backbone.Model(this.account)
            });
            this.app.mainRegion.show(this.pageView);

            this.listenTo(vent, 'resume:changeTemplate', this.onChangeTemplate);
        },

        toHome: function() {

        },

        toResume: function() {

            var self = this;

            var engineerModel = new EngineerModel({
                _id: this.account.userInfo.profileId
            });

            engineerModel.fetch({
                success: function() {
                    var resumeView = new ResumeView({
                        model: engineerModel,
                        template: resumeTemplate
                    });
                    self.pageView.content.show(resumeView);
                }
            });
        },

        onChangeTemplate: function(data) {

            var self = this;

            var engineerModel = new EngineerModel({
                _id: this.account.userInfo.profileId
            });

            engineerModel.fetch({
                success: function() {
                    var resumeView = new ResumeView({
                        model: engineerModel,
                        template: resumeTemplateTwoCols
                    });
                    self.pageView.content.show(resumeView);
                }
            });
        }
    });

    return Controller;
});