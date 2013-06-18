define([
        'views/resume/itembase',
        'text!templates/resume/itemlanguage.html'
], function(BaseView, template) {

    var ItemLanguage = BaseView.extend({

        itemName: '語学能力',

        /*Template*/
        template: template,

        /*Initializer*/
        initialize: function() {
            
            this.ui = _.extend({}, this.commonUI, {
                inputLanguage: 'select[name="language"]',
                inputBackground: 'select[name="background"]',
                areaLanguage: '.languageArea',
                areaBackground: '.backgroundArea',
                input: 'input',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change select[name="language"]': 'updateLanguage',
                'change select[name="background"]': 'updateBackground'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {
            this._appendInfoOnDeleteBtn();
        },

        updateLanguage: function() {
            this.ui.areaLanguage.text(this.ui.inputLanguage.val());
            this.model.set('language', this.ui.inputLanguage.val());
        },

        updateBackground: function() {
            this.ui.areaBackground.text(this.ui.inputBackground.val());
            this.model.set('background', this.ui.inputBackground.val());
        },

        deleteItem: function() {
            var self = this;
            this.ui.editor.slideUp(function() {
                self.trigger('item:delete', self.model);
            });
        }
    });

    return ItemLanguage;
});