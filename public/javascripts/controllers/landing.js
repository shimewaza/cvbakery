define(['views/landing'], function(LandingView) {

    // Landing page controller
    var Controller = Backbone.Marionette.Controller.extend({

        // Initializer of landing page controller 
        initialize: function(options) {

            // hold application ref
            this.app = options.app;
            // create landing page
            this.landingView = new LandingView();
            // show landing page
            this.app.mainRegion.show(this.landingView);
        }
    });

    return Controller;
});