define([
        'views/resume/itembase',
        'text!templates/resume/default/itemskill.html',
        'text!templates/resume/style1/itemskill.html',
        'text!templates/resume/style2/itemskill.html',
        'text!templates/resume/style3/itemskill.html',
        'text!templates/resume/style4/itemskill.html',
        'text!templates/resume/style5/itemskill.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template,
    style5Template) {

    var ItemSkill = BaseView.extend({

        className: 'sl-sub-editable',

        itemName: 'スキル',

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
                inputSkill: 'input[name="skill"]',
                inputLevel: '.sl-slider'
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="skill"]': 'updateSkill'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        // TODO: this lost the benifet of inhertance.....
        switchToValue: function() {

            var self = this;
            var level = self.ui.inputLevel.slider('value');
            var name = this.ui.inputSkill.val();

            // stop execution if mouse still above this item
            // or item's editor has error
            if (this.focus || this.err) return;

            // delete this item if got empty input
            if (!level && !name) {
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

            this.ui.inputSkill.typeahead({
                source: function(query, process) {
                    $.ajax({

                        // page url
                        url: 'http://api.stackoverflow.com/1.1/tags?filter=' + query,

                        // method is post
                        type: 'GET',

                        // use json format
                        dataType: 'jsonp',

                        jsonp: 'jsonp',

                        // login success handler
                        success: function(data) {
                            var ahead = _.pluck(data.tags, 'name');
                            process(ahead);
                        }
                    });
                }
            });

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

        validate: function() {

            var skill = this.ui.inputSkill.val();
            var errors = [];

            // no more than 20 characters
            if (skill.length > 50)
                errors.push({
                    target: this.ui.inputSkill,
                    title: "スキル",
                    message: '50文字以内でご入力ください。'
                });

            return errors;
        },

        updateSkill: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputSkill))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            this.renderValue();
            this.model.set('name', this.ui.inputSkill.val());
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
                .append($('<i/>').addClass('icon-gear'))
                .append('&nbsp;&nbsp;' + this.ui.inputSkill.val());
        },

        _appendInfoOnInput: function() {
            this._appendInfoOn(this.ui.inputSkill, {
                title: "スキル",
                content: "スキル名を50文字まで入力してください。"
            });
            this._appendInfoOn(this.ui.inputLevel, {
                title: "スキルレベル",
                content: "ご自分のスキルレベルの評価を入れてください。"
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

    return ItemSkill;
});