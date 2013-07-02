define([
        'views/page',
        'views/resume/resume',
        'models/engineer'
], function(
    PageView, 
    ResumeView, 
    EngineerModel) {

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

                    self._changeBackground(engineerModel.get('backgroundImg'));

                    var resumeView = new ResumeView({
                        model: engineerModel,
                        templateRef: 'default'
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
                        templateRef: data
                    });
                    self.pageView.content.show(resumeView);
                }
            });
        },

        _changeBackground: function(imageName) {

            if(!imageName) return;

            $('body').css('background', "url('/images/resume/" + imageName + "') repeat");
        }
    });

    return Controller;
});