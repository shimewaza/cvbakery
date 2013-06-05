define([], function() {

    var Engineer = Backbone.DeepModel.extend({

        idAttribute: "_id",

        urlRoot: '/engineer',

        initialize: function() {

        },

        validate: function(attrs, options) {

            console.log(attrs);

            if(attrs.birthDay && "Invalid Date" == new Date(attrs.birthDay)) 
                return {
                    item: 'birthDay',
                    message: 'invalid birthDay'
                };
        }
    });

    return Engineer;
});