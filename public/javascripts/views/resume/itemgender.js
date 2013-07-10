define([
        'views/resume/itembase',
        'text!templates/resume/default/itemgender.html',
        'text!templates/resume/style1/itemgender.html',
        'text!templates/resume/style2/itemgender.html',
        'text!templates/resume/style3/itemgender.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template) {

    var GenderEditor = BaseView.extend({

        item: 'gender',

        itemName: '性別',

        itemIcon: 'icon-leaf',

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

            this.ui = _.extend({}, this.commonUI);

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'click .btn-value': 'updateModel',
            });
        },

        /*After Render*/
        onRender: function() {

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            var gender = this.model.get(this.item);

            this.$el.find(".btn-value").each(function() {
                if (gender == $.trim($(this).text()))
                    $(this).button('toggle');
            });

            // Attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();
        },

        /*Update model when edit finished*/
        updateModel: function(event) {

            var self = this;

            // Get input value
            var newVal = $.trim($(event.target).text());

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

    return GenderEditor;
});