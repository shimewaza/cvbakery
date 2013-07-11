define([
        'views/resume/itembase',
        'text!templates/resume/default/itemqualification.html',
        'text!templates/resume/style1/itemqualification.html',
        'text!templates/resume/style2/itemqualification.html',
        'text!templates/resume/style3/itemqualification.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template) {

    var ItemEducation = BaseView.extend({

        itemName: '資格',

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
                inputQualifiedDate: 'input[name="qualifiedDate"]',
                inputQualificationName: 'input[name="qualificationName"]',
                inputDetail: 'textarea',
                areaQualifiedDate: '.qualifiedDateArea',
                areaQualificationName: '.qualificationNameArea',
                areaDetail: '.detailArea'
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="qualifiedDate"]': 'updateQualifiedDate',
                'change input[name="qualificationName"]': 'updateQualificationName',
                'change textarea': 'updateDetail',
                'click .btn': 'updateDetail'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {

            this.ui.inputDetail.markdown();

            this._appendDatePicker(this.ui.inputQualifiedDate, {
                startDate: new Date('1970/01/01'),
                endDate: new Date(),
            });
            this._appendInfoOnInput();
            this._appendInfoOnDeleteBtn();
        },

        validate: function() {

            var qualifiedDate = this.ui.inputQualifiedDate.val();
            var qualificationName = this.ui.inputQualificationName.val();
            var errors = [];

            // must be a date
            if (qualifiedDate && "Invalid Date" == new Date(qualifiedDate))
                errors.push({
                    target: this.ui.inputQualifiedDate,
                    title: "取得日",
                    message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                });

            // can't be late than today
            if (qualifiedDate && new Date(qualifiedDate) > new Date())
                errors.push({
                    target: this.ui.inputQualifiedDate,
                    title: "取得日",
                    message: '本日より前の日付をご入力ください。'
                });

            // no more than 20 characters
            if (qualificationName.length > 20)
                errors.push({
                    target: this.ui.inputQualificationName,
                    title: "資格名",
                    message: '20文字以内でご入力ください。'
                });

            return errors;
        },

        updateQualifiedDate: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputQualifiedDate))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            var qualifiedDate = this.ui.inputQualifiedDate.val();

            if (qualifiedDate) {
                var newEl = $('<span/>')
                            .addClass('label label-info')
                            .append($('<i/>').addClass('icon-calendar'))
                            .append('&nbsp;&nbsp;&nbsp;&nbsp;' + this._formatDate(qualifiedDate))
                this.ui.areaQualifiedDate.empty().append(newEl);
            }

            this.model.set('qualifiedDate', this.ui.inputQualifiedDate.val());
        },

        updateQualificationName: function() {

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputQualificationName))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            var qualificationName = this.ui.inputQualificationName.val();

            if (qualificationName) {
                var newEl = $('<h5/>')
                            .append($('<i/>').addClass('icon-bookmark-empty'))
                            .append('&nbsp;&nbsp;' + qualificationName);
                this.ui.areaQualificationName.empty().append(newEl);
            }

            this.model.set('qualificationName', this.ui.inputQualificationName.val());
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

            this.ui.areaDetail.empty().append(markdown.toHTML(this.ui.inputDetail.val()));
            this.model.set('detail', this.ui.inputDetail.val());
        },

        deleteItem: function() {
            var self = this;
            this.ui.editor.slideUp(function() {
                self.trigger('item:delete', self.model);
            });
        },

        _appendInfoOnInput: function() {
            this._appendInfoOn(this.ui.inputQualifiedDate, {
                title: "取得日",
                content: "ご資格を取る日期、「YYYY/MM/DD」のフォーマットで入力してください。"
            });
            this._appendInfoOn(this.ui.inputQualificationName, {
                title: "資格名",
                content: "ご資格の名称、20文字以内入力してください。"
            });
            this._appendInfoOn(this.ui.inputDetail, {
                title: "この資格について説明したいこと",
                content: "この資格について説明したいことを入力してください。"
            });
        }
    });

    return ItemEducation;
});