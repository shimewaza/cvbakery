define(['views/landing'], function(LandingView) {

    var Controller = Backbone.Marionette.Controller.extend({

        initialize: function(options) {
            this.app = options.app;

            this.landingView = new LandingView();
            this.app.mainRegion.show(this.landingView);
        },

        // toLogin: function() {
        //     this.app.mainRegion.show(new LoginView());
        // },

        // toRegister: function() {
        //     this.app.mainRegion.show(new RegisterView());
        // }
    });

    return Controller;
});