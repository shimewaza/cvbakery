define([
        'views/resume/itembase',
        'text!templates/resume/itemneareststation.html'
], function(BaseView, template) {

    var NearestStationEditor = BaseView.extend({

        item: 'nearestStation',

        itemName: "最寄り駅",

        itemHelp: "20文字以内で入力してください。",

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            input: 'input',
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

            // Listen to the model, show validation error
            this.listenTo(this.model, 'invalid', this.showError);
        },

        /*After Render*/
        onRender: function() {

            // Attach popover for input control in edit panel
            this._appendInfoOnInput();

            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        /*Validate user input value*/
        validate: function(value) {

            // if user input nothing, just return
            if (!value) return;

            // no more than 20 characters
            if (value.length > 20)
                return {
                    message: '20文字以内でご入力ください。'
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
                    self.ui.value.text(newVal);
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        }

    });

    return NearestStationEditor;
});