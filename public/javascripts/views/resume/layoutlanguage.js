define([
        'text!templates/resume/layoutlanguage.html',
        'views/resume/itemlanguage'
], function(template, itemView) {

    var LanguageView = Backbone.Marionette.CompositeView.extend({

        /*Template*/
        template: template,

        itemViewContainer: '.item-container',

        itemView: itemView,
    });

    return LanguageView;
});