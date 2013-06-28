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
                inputLanguage: 'select',
                inputLevel: '.sl-slider'
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change select': 'updateLanguage'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {

            var self = this;

            this.ui.inputLevel.slider({
                range: 'min',
                value: this.model.get('level'),
                slide: function() {
                    $(this).removeClass(self._getCurrentBarStyle).addClass(self._getBarStyle());
                },
                stop: function() {
                    self.renderValue();
                    self.model.set('level', self.ui.inputLevel.slider('value'));
                }
            }).find('.ui-slider-range').addClass('bar');

            this._appendInfoOnInput();
            this._appendInfoOnDeleteBtn();
        },

        updateLanguage: function() {
            this.renderValue();
            this.model.set('language', this.ui.inputLanguage.val());
        },

        deleteItem: function() {
            var self = this;
            this.ui.editor.slideUp(function() {
                self.trigger('item:delete', self.model);
            });
        },

        renderValue: function() {

            this.ui.value.find('.progress')
                .removeClass(this._getCurrentBarStyle)
                .addClass(this._getBarStyle());

            this.ui.value.find('.bar')
                .css('width', this.ui.inputLevel.slider('value') + '%');

            this.ui.value.find('p')
                .empty()
                .text(this.ui.inputLanguage.val());
        },

        _appendInfoOnInput: function() {
            this._appendInfoOn(this.ui.inputSkill, {
                title: "言語",
                content: "言語を選択してください。"
            });
            this._appendInfoOn(this.ui.inputLevel, {
                title: "レベル",
                content: "この言語レベルの自己評価を入れてください。"
            });
        },

        _getBarStyle: function() {

            var barStyle = '';

            if (this.ui.inputLevel.slider('value') >= 85)
                barStyle = 'progress-success';
            else if (this.ui.inputLevel.slider('value') >= 55)
                barStyle = 'progress-info';
            else if (this.ui.inputLevel.slider('value') >= 25)
                barStyle = 'progress-warning';
            else
                barStyle = 'progress-danger';

            return barStyle;
        },

        _getCurrentBarStyle: function(index, css) {
            return (css.match (/\bprogress-\S+/g) || []).join(' ');
        }
    });

    return ItemLanguage;
});