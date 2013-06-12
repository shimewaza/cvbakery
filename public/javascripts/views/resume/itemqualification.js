define([
        'views/resume/itembase',
        'text!templates/resume/itemqualification.html'
], function(BaseView, template) {

    var ItemEducation = BaseView.extend({

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            inputEducation: 'input[name="education"]',
            inputBackground: 'input[name="background"]',
            removeBtn: '.btn-remove'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="education"]': 'changeBackground',
                'change input[name="background"]': 'updateModel',
                'click .btn-remove': 'removeItem'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        changeBackground: function() {

            var lang = this.ui.inputEducation.val();

            if(lang == "英語") {
                this.ui.inputBackground.empty()
            }

        },

        removeItem: function() {
            this.trigger('item:remove', this.model);
        }

    });

    return ItemEducation;
});