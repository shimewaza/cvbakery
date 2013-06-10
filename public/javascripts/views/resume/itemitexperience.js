define([
        'views/resume/itembase',
        'text!templates/resume/itemitexperience.html'
], function(BaseView, template) {

    var ItExperienceEditor = BaseView.extend({

        item: 'itExperience',

        itemName: "IT経験年数",

        itemHelp: "IT業界で勤めていた年数を入力してください。",

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

            // attach popover for input control in edit panel
            this._appendInfoOnInput();

            // attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        /*Validate user input value*/
        validate: function(value) {

            // if user input nothing, just return
            if (!value) return;

            // must be a number less than 99
            if (value.search(/^\d{1,2}$/) || Number(value) > 99 || Number(value) == 0)
                return {
                    message: '年単位で有効な数字ををご入力ください。'
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
                    self.ui.value.text(!newVal ? newVal : newVal + '年');
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        }

    });

    return ItExperienceEditor;
});