define([
        'views/resume/itembase',
        'text!templates/resume/itemeducation.html'
], function(BaseView, template) {

    var ItemEducation = BaseView.extend({

        itemName: '学歴',

        /*Template*/
        template: template,

        /*Initializer*/
        initialize: function() {
            
            this.ui = _.extend({}, this.commonUI, {
                inputGraduate: 'input[name="graduate"]',
                inputSchool: 'input[name="school"]',
                inputMajor: 'input[name="major"]',
                areaGraduate: '.graduateArea',
                areaSchool: '.schoolArea'
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="graduate"]': 'updateGraduate',
                'change input[name="school"]': 'updateSchool',
                'change input[name="major"]': 'updateMajor'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {
            this._appendDatePicker(this.ui.inputGraduate, {
                startDate: new Date('1970/01/01'),
                endDate: new Date(),
            });
            this._appendInfoOnInput();
            this._appendInfoOnDeleteBtn();
        },

        validate: function() {

            var graduate = this.ui.inputGraduate.val();
            var school = this.ui.inputSchool.val();
            var major = this.ui.inputMajor.val();
            var errors = [];

            // must be a date
            if (graduate && "Invalid Date" == new Date(graduate))
                errors.push({
                    target: this.ui.inputGraduate,
                    title: "卒業日",
                    message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                });

            // can't be late than today
            if (graduate && new Date(graduate) > new Date())
                errors.push({
                    target: this.ui.inputGraduate,
                    title: "卒業日",
                    message: '本日より前の日付をご入力ください。'
                });

            // no more than 20 characters
            if (school.length > 20)
                errors.push({
                    target: this.ui.inputSchool,
                    title: "卒業学校",
                    message: '20文字以内でご入力ください。'
                });

            // no more than 20 characters
            if (major.length > 20)
                errors.push({
                    target: this.ui.inputMajor,
                    title: "学部、学科、専攻",
                    message: '20文字以内でご入力ください。'
                });

            return errors;
        },

        updateGraduate: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputGraduate))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            this.renderValue();
            this.model.set('graduate', this.ui.inputGraduate.val());
        },

        updateSchool: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputSchool))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            this.renderValue();
            this.model.set('school', this.ui.inputSchool.val());
        },

        updateMajor: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputMajor))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            this.renderValue();
            this.model.set('major', this.ui.inputMajor.val());
        },

        deleteItem: function() {
            var self = this;
            this.ui.editor.slideUp(function() {
                self.trigger('item:delete', self.model);
            });
        },

        renderValue: function() {
            var graduate = this.ui.inputGraduate.val();
            var school = this.ui.inputSchool.val();
            var major = this.ui.inputMajor.val();
            var result = '';

            if(school) result += school;
            if(major) result += "　" + major;

            this.ui.areaGraduate.text(this._formatDate(graduate));
            this.ui.areaSchool.text(result);
        },

        _appendInfoOnInput: function() {
            this._appendInfoOn(this.ui.inputGraduate, {
                title: "卒業日",
                content: "「YYYY/MM/DD」のフォーマットで入力してください。"
            });
            this._appendInfoOn(this.ui.inputSchool, {
                title: "卒業学校",
                content: "卒業学校の名称を20文字以内入力してください。"
            });
            this._appendInfoOn(this.ui.inputMajor, {
                title: "学部、学科、専攻",
                content: "学部、学科、または専攻を20文字以内入力してください。"
            });
        }

    });

    return ItemEducation;
});