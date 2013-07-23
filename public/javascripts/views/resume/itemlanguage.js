define([
        'views/resume/itembase',
        'text!templates/resume/default/itemlanguage.html',
        'text!templates/resume/style1/itemlanguage.html',
        'text!templates/resume/style2/itemlanguage.html',
        'text!templates/resume/style3/itemlanguage.html',
        'text!templates/resume/style4/itemlanguage.html',
        'text!templates/resume/style5/itemlanguage.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template,
    style5Template) {

    var ItemLanguage = BaseView.extend({
        
        className: 'sl-sub-editable',

        itemName: '語学能力',

        getTemplate: function() {
            if (this.options.templateRef === "default")
                return defaultTemplate;
            else if (this.options.templateRef === "style1")
                return style1Template;
            else if (this.options.templateRef === "style2")
                return style2Template;
            else if (this.options.templateRef === "style3")
                return style3Template;
            else if (this.options.templateRef === "style4")
                return style4Template;
            else if (this.options.templateRef === "style5") {
                this.$el.addClass('span6');
                return style5Template;
            }
        },

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

        // TODO: this lost the benifet of inhertance.....
        switchToValue: function() {

            var self = this;
            var level = self.ui.inputLevel.slider('value');
            var language = this.ui.inputLanguage.val();

            // stop execution if mouse still above this item
            // or item's editor has error
            if (this.focus || this.err) return;

            // delete this item if got empty input
            if (!level && !language) {
                this.deleteItem();
                return;
            }

            // attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();

            // slide up the edit panel
            this.ui.editor.slideUp('fast', function() {
                // fadeIn view panel
                self.ui.value.fadeIn('fast');
            });
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
                .append($('<i/>').addClass('icon-comment-alt'))
                .append('&nbsp;&nbsp;' + this.ui.inputLanguage.val());
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