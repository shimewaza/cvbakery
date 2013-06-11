define([
        'text!templates/resume/layoutlanguage.html',
        'views/resume/itemlanguage'
], function(template, itemView) {

    var LanguageView = Backbone.Marionette.CompositeView.extend({

        /*Template*/
        template: template,

        itemViewContainer: '.item-container',

        itemView: itemView,

        onRender: function() {

            if(this.collection.length == 0) {
                this.collection.add(new Backbone.Model());
            }
        }
    });

    return LanguageView;
});