define([
        'views/resume/itembase',
        'text!templates/resume/default/itemworkexperience.html',
        'text!templates/resume/style1/itemworkexperience.html',
        'text!templates/resume/style2/itemworkexperience.html',
        'text!templates/resume/style3/itemworkexperience.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template) {

    var ItemWorkExperience = BaseView.extend({

        itemName: '仕事経験',

        getTemplate: function() {
            if (this.options.templateRef === "default")
                return defaultTemplate;
            else if (this.options.templateRef === "style1")
                return style1Template;
            else if (this.options.templateRef === "style2")
                return style2Template;
            else if (this.options.templateRef === "style3")
                return style3Template;
        },

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                inputStartDate: 'input[name="startDate"]',
                inputEndDate: 'input[name="endDate"]',
                inputTitle: 'input[name="title"]',
                inputPosition: 'input[name="position"]',
                inputDetail: 'textarea',
                areaDate: '.dateArea',
                areaTitle: '.titleArea',
                areaDetail: '.detailArea'
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="startDate"]': 'updateStartDate',
                'change input[name="endDate"]': 'updateEndDate',
                'change input[name="title"]': 'updateTitle',
                'change input[name="position"]': 'updatePosition',
                'change textarea': 'updateDetail',
                'click .btn': 'updateDetail'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {

            this.ui.inputDetail.markdown();

            this._appendDatePicker(this.ui.inputStartDate, {
                startDate: new Date('1970/01/01'),
                endDate: new Date(),
            });
            this._appendDatePicker(this.ui.inputEndDate, {
                startDate: new Date('1970/01/01'),
                endDate: new Date(),
            });
            this._appendInfoOnInput();
            this._appendInfoOnDeleteBtn();
        },

        validate: function() {

            var startDate = this.ui.inputStartDate.val();
            var endDate = this.ui.inputEndDate.val();
            var title = this.ui.inputTitle.val();
            var position = this.ui.inputPosition.val();
            var errors = [];

            // must be a date
            if (startDate && "Invalid Date" == new Date(startDate))
                errors.push({
                    target: this.ui.inputStartDate,
                    title: "勤務開始日",
                    message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                });

            // can't be late than today
            if (startDate && new Date(startDate) > new Date())
                errors.push({
                    target: this.ui.inputStartDate,
                    title: "勤務開始日",
                    message: '本日より前の日付をご入力ください。'
                });

            // must be a date
            if (endDate && "Invalid Date" == new Date(endDate))
                errors.push({
                    target: this.ui.inputEndDate,
                    title: "勤務終了日",
                    message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                });

            // can't be late than today
            if (endDate && new Date(endDate) > new Date())
                errors.push({
                    target: this.ui.inputEndDate,
                    title: "勤務終了日",
                    message: '本日より前の日付をご入力ください。'
                });

            // no more than 20 characters
            if (title.length > 20)
                errors.push({
                    target: this.ui.inputTitle,
                    title: "会社名",
                    message: '20文字以内でご入力ください。'
                });

            // no more than 20 characters
            if (position.length > 20)
                errors.push({
                    target: this.ui.inputPosition,
                    title: "職務",
                    message: '20文字以内でご入力ください。'
                });

            return errors;
        },

        updateStartDate: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputStartDate))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            this.renderValue();
            this.model.set('startDate', this.ui.inputStartDate.val());
        },

        updateEndDate: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputEndDate))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            this.renderValue();
            this.model.set('endDate', this.ui.inputEndDate.val());
        },

        updateTitle: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputTitle))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            this.renderValue();
            this.model.set('title', this.ui.inputTitle.val());
        },

        updatePosition: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputPosition))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            this.renderValue();
            this.model.set('position', this.ui.inputPosition.val());
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

            var startDate = this.ui.inputStartDate.val();
            var endDate = this.ui.inputEndDate.val();
            var title = this.ui.inputTitle.val();
            var position = this.ui.inputPosition.val();
            var detail = this.ui.inputDetail.val();
            var resultDate = '';

            if(startDate && endDate) 
                resultDate = this._formatDate(startDate) + '～' + this._formatDate(endDate);
            else if (startDate && !endDate)
                resultDate = this._formatDate(startDate) + '～';
            else if (!startDate && endDate)
                resultDate = '～' + this._formatDate(endDate);

            if (resultDate) {
                var newEl = $('<span/>')
                            .addClass('label label-info')
                            .append($('<i/>').addClass('icon-calendar'))
                            .append('&nbsp;&nbsp;&nbsp;&nbsp;' + resultDate)
                this.ui.areaDate.empty().append(newEl);
            }

            this.ui.areaTitle.empty();

            if (title) {
                var newEl = $('<h5/>')
                            .append($('<i/>').addClass('icon-flag-alt'))
                            .append('&nbsp;&nbsp;' + title);
                this.ui.areaTitle.append(newEl);
            }

            if (position) {
                var newEl = $('<h6/>')
                            .addClass('sl-placeholder')
                            .append($('<i/>').addClass('icon-wrench'))
                            .append('&nbsp;&nbsp;' + position);
                this.ui.areaTitle.append(newEl);
            }

            this.ui.areaDetail.empty().append(markdown.toHTML(detail));
        },

        _appendInfoOnInput: function() {
            this._appendInfoOn(this.ui.inputStartDate, {
                title: "開始日",
                content: "「YYYY/MM/DD」のフォーマットで入力してください。"
            });
            this._appendInfoOn(this.ui.inputEndDate, {
                title: "終了日",
                content: "「YYYY/MM/DD」のフォーマットで入力してください。"
            });
            this._appendInfoOn(this.ui.inputTitle, {
                title: "仕事名",
                content: "お勤めていた会社の名称、20文字以内入力してください。"
            });
            this._appendInfoOn(this.ui.inputPosition, {
                title: "担当職務",
                content: "ご担当していた職務、20文字以内入力してください。"
            });
            this._appendInfoOn(this.ui.inputDetail, {
                title: "この仕事について説明したいこと",
                content: "この仕事について説明したいことを入力してください。"
            });
        }
    });

    return ItemWorkExperience;
});