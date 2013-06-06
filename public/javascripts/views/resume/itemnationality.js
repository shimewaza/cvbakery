define([
        'views/resume/itembase',
        'text!templates/resume/itemnationality.html'
], function(BaseView, template) {

    var NationalityEditor = BaseView.extend({

        item: 'nationality',

        itemName: '国籍',

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            input: 'select',
            deleteBtn: '.btn-delete'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change select': 'updateModel',
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        /*After Render*/
        onRender: function() {

            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // Get input value
            var newVal = this.ui.input.find(':selected').val();
            // Set the new value into model
            this.model.set('nationality', newVal);

            // Save the model
            this.model.save({}, {

                // If save success
                success: function() {
                    // Update the view panel
                    self.ui.value.text(newVal);
                    // Switch to view panel
                    self.switchToValue();
                }
            });
        }

    });

    return NationalityEditor;
});