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
            datePickerBtn: '.btn-datepicker',
            deleteBtn: '.btn-delete'
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

            // attach datapicker on calendar button
            this._appendDatePicker(this.ui.datePickerBtn, this.ui.input, {
                startDate: new Date('1970/01/01'),
                endDate: new Date(),
            });

            // attach popover for input control in edit panel
            this._appendInfoOnInput();

            // attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        /*Validate user input value*/
        validate: function(value) {

            // if user input nothing, just return
            if (!value) return;

            // must be a date
            if ("Invalid Date" == new Date(value))
                return {
                    message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
            };

            // can't be late than today
            if (new Date(value) > new Date())
                return {
                    message: '本日より前の日付をご入力ください。'
            };
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // get input value
            var newVal = this.ui.input.val();

            // check input value
            var error = this.validate(newVal);
            if (error) {
                this.showError(error);
                return;
            }

            // prepare the date for model update
            var data = {};
            data[this.item] = newVal;

            // save the model
            this.model.save(data, {

                // if save success
                success: function() {
                    // clear the error flag
                    self.err = false;
                    // remove the error class from editor
                    self.$el.removeClass('control-group error');
                    // append normal info help on editor
                    self._appendInfoOnInput();
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