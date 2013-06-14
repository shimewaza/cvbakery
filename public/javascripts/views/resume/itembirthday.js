define([
        'views/resume/itembase',
        'text!templates/resume/itembirthday.html'
], function(BaseView, template) {

    var BirthDayEditor = BaseView.extend({

        item: 'birthDay',

        itemName: "生年月日",

        itemHelp: "「YYYY/MM/DD」のフォーマットで入力してください。ご年齢を該当情報によって計算します。",

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            input: 'input',
            removeBtn: '.btn-remove'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // update model when input's value was chenaged
                'change input': 'updateModel',
            });

            // listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        /*After Render*/
        onRender: function() {

            // attach datapicker on input control
            this._appendDatePicker(this.ui.input, {
                startDate: new Date('1970/01/01'),
                endDate: new Date(),
            });

            // attach popover for input control in edit panel
            this._appendInfoOn(this.ui.input, {
                title: this.itemName,
                content: this.itemHelp
            });

            // attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();
        },

        /*Validate user input value*/
        validate: function(value) {

            // do nothing if user input nothing
            if (!value) return;

            var errors = [];

            // must be a date
            if ("Invalid Date" == new Date(value))
                errors.push({
                    target: this.ui.input,
                    title: this.itemName,
                    message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                });

            // can't be late than today
            if (new Date(value) > new Date())
                errors.push({
                    target: this.ui.input,
                    title: this.itemName,
                    message: '本日より前の日付をご入力ください。'
                });

            return errors;
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // get input value
            var newVal = this.ui.input.val();

            // check input value
            var errors = this.validate(newVal);
            if (errors.length) {
                this.showError(errors);
                return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOn(this.ui.input, {
                    title: this.itemName,
                    content: this.itemHelp
                });
            }

            // prepare the date for model update
            var data = {};
            data[this.item] = newVal;

            // save the model
            this.model.save(data, {

                // if save success
                success: function() {
                    // update the view panel
                    self.ui.value.text(self._formatDate(newVal));
                    // switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        }

    });

    return BirthDayEditor;
});