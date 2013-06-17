define([
        'views/resume/itembase',
        'text!templates/resume/itemmarried.html'
], function(BaseView, template) {

    var MarriedEditor = BaseView.extend({

        item: 'married',

        itemName: '婚姻状況',

        itemIcon: 'icon-heart',

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            removeBtn: '.btn-remove'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'click .btn-value': 'updateModel',
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        /*After Render*/
        onRender: function() {

            var married = this.model.get(this.item);

            this.$el.find(".btn-value").each(function() {
                if (married == $(this).text())
                    $(this).button('toggle');
            });

            // Attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();
        },

        /*Update model when edit finished*/
        updateModel: function(event) {

            var self = this;

            // Get input value
            var newVal = $(event.target).text();

            // Prepare the date for model update
            var data = {};
            data[this.item] = newVal;

            // Save the model
            this.model.save(data, {

                // If save success
                success: function() {
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

    return MarriedEditor;
});