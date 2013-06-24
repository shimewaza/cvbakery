define([
        'views/resume/itembase',
        'text!templates/resume/itemqualification.html'
], function(BaseView, template) {

    var ItemEducation = BaseView.extend({

        itemName: '資格',

        /*Template*/
        template: template,

        /*Initializer*/
        initialize: function() {
            
            this.ui = _.extend({}, this.commonUI, {
                inputQualifiedDate: 'input[name="qualifiedDate"]',
                inputQualificationName: 'input[name="qualificationName"]',
                areaQualifiedDate: '.qualifiedDateArea',
                areaQualificationName: '.qualificationNameArea',
                input: 'input'
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="qualifiedDate"]': 'updateQualifiedDate',
                'change input[name="qualificationName"]': 'updateQualificationName'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {
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

            this.ui.areaQualifiedDate.text(this._formatDate(this.ui.inputQualifiedDate.val()));
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

            this.ui.areaQualificationName.text(this.ui.inputQualificationName.val());
            this.model.set('qualificationName', this.ui.inputQualificationName.val());
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
        }
    });

    return ItemEducation;
});