define(['views/login', 'views/register'], function(LoginView, RegisterView) {

    var Controller = Backbone.Marionette.Controller.extend({

        initialize: function(options) {
            this.app = options.app;
        },

        toLogin: function() {
            this.app.mainRegion.show(new LoginView());
        },

        toRegister: function() {
            this.app.mainRegion.show(new RegisterView());
        }
    });

    return Controller;
});