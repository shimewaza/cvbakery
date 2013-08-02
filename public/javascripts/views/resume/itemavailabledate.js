define([
        'views/resume/itembase',
        'text!templates/resume/default/itemavailabledate.html',
        'text!templates/resume/style1/itemavailabledate.html',
        'text!templates/resume/style2/itemavailabledate.html',
        'text!templates/resume/style3/itemavailabledate.html',
        'text!templates/resume/style4/itemavailabledate.html',
        'text!templates/resume/style5/itemavailabledate.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template,
    style5Template) {

    var AvailableDateEditor = BaseView.extend({
        
        className: 'row-fluid sl-editable',

        item: 'availableDate',

        itemName: "Availability",

        itemIcon: 'icon-ok',

        itemHelp: "次の仕事を始められる日期を「YYYY/MM/DD」のフォーマットで入力してください。",

        getTemplate: function() {
            if (this.options.templateRef === "default")
                return defaultTemplate;
            else if (this.options.templateRef === "style1")
                return style1Template;
            else if (this.options.templateRef === "style2")
                return style2Template;
            else if (this.options.templateRef === "style3")
                return style3Template;
            else if (this.options.templateRef === "style4")
                return style4Template;
            else if (this.options.templateRef === "style5")
                return style5Template;
        },

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                input: 'input',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input': 'updateModel',
            });
        },

        /*After Render*/
        onRender: function() {

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // attach datapicker on calendar button
            this._appendDatePicker(this.ui.input, {
                todayBtn: true,
                startView: 0
            });

            // Attach popover for input control in edit panel
            this._appendInfoOn(this.ui.input, {
                title: this.itemName,
                content: this.itemHelp
            });

            // Attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();
        },

        /*Validate user input value*/
        validate: function(value) {

            var errors = [];

            // if user input nothing, just return
            if (!value) return errors;

            // must be a date
            if ("Invalid Date" == new Date(value))
                errors.push({
                    target: this.ui.input,
                    title: this.itemName,
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
                this._appendInfoOn(this.ui.input, {
                    title: this.itemName,
                    content: this.itemHelp
                });
            }

            // Prepare the date for model update
            var data = {};
            data[this.item] = newVal;

            // Save the model
            this.model.save(data, {

                // If save success
                success: function() {
                    // Update the view panel
                    self.renderValue(newVal);
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        },

        renderValue: function(newVal) {
            if(newVal)
                this.ui.value.text(this._formatDate(newVal));
            else
                this.ui.value.text("");
        }

    });

    return AvailableDateEditor;
});