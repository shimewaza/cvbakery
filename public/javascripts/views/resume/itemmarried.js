define([
        'views/resume/itembase',
        'text!templates/resume/itemmarried.html'
], function(BaseView, template) {

    var MarriedEditor = BaseView.extend({

        item: 'married',

        itemName: '婚姻状況',

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            deleteBtn: '.btn-delete'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'click input:radio': 'updateModel',
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
        updateModel: function(event) {

            var self = this;

            // Get input value
            var newVal = event.target.value;
            // Set the new value into model
            this.model.set('married', newVal);

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

    return MarriedEditor;
});