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
            inputLanguage: 'input[name="language"]',
            inputBackground: 'input[name="background"]',
            deleteBtn: '.btn-delete'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="language"]': 'changeBackground',
                'change input[name="background"]': 'updateModel'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        changeBackground: function() {

            var lang = this.ui.inputLanguage.val();

            if(lang == "英語") {
                this.ui.inputBackground.empty()
            }

        }

    });

    return ItemLanguage;
});