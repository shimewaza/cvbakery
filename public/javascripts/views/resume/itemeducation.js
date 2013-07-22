define([
        'views/resume/itembase',
        'text!templates/resume/default/itemeducation.html',
        'text!templates/resume/style1/itemeducation.html',
        'text!templates/resume/style2/itemeducation.html',
        'text!templates/resume/style3/itemeducation.html',
        'text!templates/resume/style4/itemeducation.html',
        'text!templates/resume/style5/itemeducation.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template,
    style5Template) {

    var ItemEducation = BaseView.extend({

        itemName: '学歴',

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
            else if (this.options.templateRef === "style5")
                return style5Template;
        },

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                inputGraduate: 'input[name="graduate"]',
                inputSchool: 'input[name="school"]',
                inputMajor: 'input[name="major"]',
                inputDetail: 'textarea',
                areaGraduate: '.graduateArea',
                areaSchool: '.schoolArea',
                areaDetail: '.detailArea'
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="graduate"]': 'updateGraduate',
                'change input[name="school"]': 'updateSchool',
                'change input[name="major"]': 'updateMajor',
                'change textarea': 'updateDetail',
                'click .btn': 'updateDetail'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {

            this.ui.inputDetail.markdown();

            this._appendDatePicker(this.ui.inputGraduate, {
                startDate: new Date('1970/01/01'),
                endDate: new Date(),
            });
            this._appendInfoOnInput();
            this._appendInfoOnDeleteBtn();
        },

        // TODO: this lost the benifet of inhertance.....
        switchToValue: function() {

            var self = this;
            var graduate = this.ui.inputGraduate.val();
            var school = this.ui.inputSchool.val();
            var major = this.ui.inputMajor.val();
            var detail = this.ui.inputDetail.val();

            // stop execution if mouse still above this item
            // or item's editor has error
            if (this.focus || this.err) return;

            // delete this item if got empty input
            if (!graduate && !school && !major && !detail) {
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

        updateDetail: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputDetail))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            this.renderValue();
            this.model.set('detail', this.ui.inputDetail.val());
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
            var detail = this.ui.inputDetail.val();
            var result = '';

            if (graduate) {
                var newEl = $('<span/>')
                            .addClass('label label-info')
                            .append($('<i/>').addClass('icon-bell'))
                            .append('&nbsp;&nbsp;&nbsp;&nbsp;' + this._formatDate(graduate))
                this.ui.areaGraduate.empty().append(newEl);
            }

            this.ui.areaSchool.empty();
            if (school) {
                var newEl = $('<h5/>')
                            .append($('<i/>').addClass('icon-book'))
                            .append('&nbsp;&nbsp;' + school);
                this.ui.areaSchool.append(newEl);
            }

            if (major) {
                var newEl = $('<h6/>')
                            .addClass('sl-placeholder')
                            .append($('<i/>').addClass('icon-pencil'))
                            .append('&nbsp;&nbsp;' + major);
                this.ui.areaSchool.append(newEl);
            }

            this.ui.areaDetail.empty().append(markdown.toHTML(detail));
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
            this._appendInfoOn(this.ui.inputDetail, {
                title: "この学歴について説明したいこと",
                content: "この学歴について説明したいことを入力してください。"
            });
        }

    });

    return ItemEducation;
});