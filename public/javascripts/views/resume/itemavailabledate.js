define([
        'views/resume/itembase',
        'text!templates/resume/itemavailableDate.html'
], function(BaseView, template) {

    var AvailableDateEditor = BaseView.extend({

        item: 'availableDate',

        itemName: "稼働可能日",

        itemHelp: "次の仕事を始められる日期を「YYYY/MM/DD」のフォーマットで入力してください。",

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
                // Update model when input's value was chenaged
                'change input': 'updateModel',
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        /*After Render*/
        onRender: function() {

            // attach datapicker on calendar button
            this._appendDatePicker(this.ui.input, {
                todayBtn: true,
                startView: 0
            });

            // Attach popover for input control in edit panel
            this._appendInfoOn(this.ui.input);

            // Attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();
        },

        /*Validate user input value*/
        validate: function(value) {

            // if user input nothing, just return
            if (!value) return;

            var errors = [];

            // must be a date
            if ("Invalid Date" == new Date(value))
                errors.push({
                    target: this.ui.input,
                    message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                });

            return errors;
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // Get input value
            var newVal = this.ui.input.val();

            // check input value
            var errors = this.validate(newVal);
            if (errors.length) {
                this.showError(errors);
                return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOn(this.ui.input);
            }

            // Prepare the date for model update
            var data = {};
            data[this.item] = newVal;

            // Save the model
            this.model.save(data, {

                // If save success
                success: function() {
                    // Update the view panel
                    self.ui.value.text(self._formatDate(newVal));
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        }

    });

    return AvailableDateEditor;
});