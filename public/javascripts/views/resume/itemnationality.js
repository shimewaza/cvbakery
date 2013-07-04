define([
        'views/resume/itembase',
        'text!templates/resume/default/itemnationality.html',
        'text!templates/resume/style1/itemnationality.html',
        'text!templates/resume/style2/itemnationality.html',
        'text!templates/resume/style3/itemnationality.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template) {

    var NationalityEditor = BaseView.extend({

        item: 'nationality',

        itemName: '国籍',

        itemIcon: 'icon-flag',

        /*Template*/
        // template: template,

        getTemplate: function() {
            if (this.options.templateRef === "default")
                return defaultTemplate;
            else if (this.options.templateRef === "style1")
                return style1Template;
            else if (this.options.templateRef === "style2")
                return style2Template;
            else if (this.options.templateRef === "style3")
                return style3Template;
        },

        /*Initializer*/
        initialize: function() {
            
            this.ui = _.extend({}, this.commonUI, {
                input: 'select',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change select': 'updateModel',
            });
        },

        /*After Render*/
        onRender: function() {

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // Get input value
            var newVal = this.ui.input.find(':selected').val();

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

    return NationalityEditor;
});