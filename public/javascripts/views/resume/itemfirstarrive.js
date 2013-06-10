define([
        'views/resume/itembase',
        'text!templates/resume/itemfirstarrive.html'
], function(BaseView, template) {

    var FirstArriveEditor = BaseView.extend({

        item: 'firstArrive',

        itemName: "初回来日",

        itemHelp: "初めて日本へ来た日期を「YYYY/MM/DD」のフォーマットで入力してください。",

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
                // Update model when input's value was chenaged
                'change input': 'updateModel',
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        /*After Render*/
        onRender: function() {

            // attach datapicker on calendar button
            this._appendDatePicker(this.ui.datePickerBtn, this.ui.input, {
                endDate: new Date(),
            });

            // Attach popover for input control in edit panel
            this._appendInfoOnInput();

            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        /*Validate user input value*/
        validate: function(value) {

            // if user inpu nothing, just return
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

            // Get input value
            var newVal = this.ui.input.val();

            // check input value
            var error = this.validate(newVal);
            if (error) {
                this.showError(error);
                return;
            }

            // Prepare the date for model update
            var data = {};
            data[this.item] = newVal;

            // Save the model
            this.model.save(data, {

                // If save success
                success: function() {
                    // clear the error flag
                    self.err = false;
                    // remove the error class from editor
                    self.$el.removeClass('control-group error');
                    // append normal info help on editor
                    self._appendInfoOnInput();
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

    return FirstArriveEditor;
});