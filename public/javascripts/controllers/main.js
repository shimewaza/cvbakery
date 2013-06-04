define([
        'views/page',
        'views/resume/resume',
        'models/engineer'
], function(PageView, ResumeView, EngineerModel) {

    var Controller = Backbone.Marionette.Controller.extend({

        initialize: function(options) {
            this.app = options.app;
            this.account = options.account;

            this.pageView = new PageView({
                model: new Backbone.Model(this.account)
            });
            this.app.mainRegion.show(this.pageView);
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
                        model: engineerModel
                    });
                    self.pageView.content.show(resumeView);
                }
            });
        }
    });

    return Controller;
});