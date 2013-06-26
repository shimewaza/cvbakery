define([
        'views/resume/itembase',
        'text!templates/resume/itemskill.html'
], function(BaseView, template) {

    var ItemSkill = BaseView.extend({

        itemName: 'スキル',

        /*Template*/
        template: template,

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                inputSkill: 'input[name="skill"]',
                inputLevel: '.sl-slider',
                areaSkill: '.skillArea',
                areaLevel: '.levelArea'
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="skill"]': 'updateSkill'
                // 'change input[name="level"]': 'updateLevel'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
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
                stop: function() {
                    self.renderValue();
                    self.model.set('level', self.ui.inputLevel.slider('value'));
                }
            });

            this._appendInfoOnInput();
            this._appendInfoOnDeleteBtn();
        },

        validate: function() {

            var skill = this.ui.inputSkill.val();
            var errors = [];

            // no more than 20 characters
            if (skill.length > 20)
                errors.push({
                    target: this.ui.inputSkill,
                    title: "卒業学校",
                    message: '20文字以内でご入力ください。'
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
            this.ui.areaSkill.text(this.ui.inputSkill.val());
            this.ui.areaLevel.text(this.ui.inputLevel.slider('value'));
        },

        _appendInfoOnInput: function() {
            this._appendInfoOn(this.ui.inputSkill, {
                title: "卒業日",
                content: "「YYYY/MM/DD」のフォーマットで入力してください。"
            });
            this._appendInfoOn(this.ui.inputLevel, {
                title: "卒業学校",
                content: "卒業学校の名称を20文字以内入力してください。"
            });
        }

    });

    return ItemSkill;
});