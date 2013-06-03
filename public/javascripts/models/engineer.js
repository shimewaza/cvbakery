define([], function() {

    var Engineer = Backbone.DeepModel.extend({

        idAttribute: "_id",

        urlRoot: '/engineer',

        initialize: function() {

        }
    });

    return Engineer;
});