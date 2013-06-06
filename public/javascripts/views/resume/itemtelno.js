define([
        'views/resume/itembase',
        'text!templates/resume/itemtelno.html'
], function(BaseView, template) {

    var TelNoEditor = BaseView.extend({

        item: 'telNo',

        itemName: "電話番号",

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
                'change input': 'updateModel'
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

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // Get input value
            var newVal = this.ui.input.val();
            // Set the new value into model
            this.model.set('telNo', newVal);

            // Save the model
            this.model.save({}, {

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
                }
            });
        }

    });

    return TelNoEditor;
});