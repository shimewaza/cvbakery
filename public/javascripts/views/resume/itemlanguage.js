define([
        'views/resume/itembase',
        'text!templates/resume/itemlanguage.html'
], function(BaseView, template) {

    var ItemLanguage = BaseView.extend({

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            input: 'input',
            deleteBtn: '.btn-delete'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="zipCode"]': 'getAddress',
                'change input[name="address"]': 'updateModel',
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

    });

    return ItemLanguage;
});