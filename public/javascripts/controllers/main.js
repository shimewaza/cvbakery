define([
        'views/page',
        'views/resume/resume',
        'models/resume'
], function(
    PageView, 
    ResumeView, 
    ResumeModel) {

    // Main page controller
    var Controller = Backbone.Marionette.Controller.extend({

        // Initializer of main page controller 
        initialize: function(options) {

            // hold application ref
            this.app = options.app;
            // hold user account info
            this.account = options.account;
            // create and hold resume model            
            this.resumeModel = new ResumeModel({
                _id: options.account.userInfo.profileId
            });

            // create main page
            this.pageView = new PageView({
                model: new Backbone.Model(this.account)
            });
            // show main page
            this.app.mainRegion.show(this.pageView);

            // Listening the resume template change singnal
            this.listenTo(vent, 'resume:changeTemplate', this.toResume);
        },

        // To home page
        toHome: function() {

        },

        // To resume page
        toResume: function(templateName) {

            var self = this;

            // populate resume model with lastest data
            this.resumeModel.fetch({

                // if success
                success: function() {

                    // create new resume view
                    var resumeView = new ResumeView({
                        model: self.resumeModel,
                        templateRef: templateName || self.resumeModel.get('template') || 'default'
                    });
                    // show resume
                    self.pageView.content.show(resumeView);
                }
            });
        }
    });

    return Controller;
});