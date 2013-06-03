define(['views/page'], function(PageView) {

    var Controller = Backbone.Marionette.Controller.extend({

        initialize: function(options) {
            this.app = options.app;
            this.account = options.account;
            this.menu = options.menu;
        },

        toHome: function() {
            var pageView = new PageView({
                model: new Backbone.Model(this.menu)
            })
            this.app.mainRegion.show(pageView);
        }
    });

    return Controller;
});