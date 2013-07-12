define([
        'views/resume/itembase',
        'text!templates/resume/default/itemitexperience.html',
        'text!templates/resume/style1/itemitexperience.html',
        'text!templates/resume/style2/itemitexperience.html',
        'text!templates/resume/style3/itemitexperience.html',
        'text!templates/resume/style4/itemitexperience.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template) {

    var ItExperienceEditor = BaseView.extend({

        item: 'itExperience',

        itemName: "IT経験年数",

        itemIcon: 'icon-briefcase',

        itemHelp: "IT業界で勤めていた年数を入力してください。",

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
        },

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                input: 'input',
            });

            this.events = _.extend({}, this.commonEvents, {
                // update model when input's value was chenaged
                'change input': 'updateModel',
            });
        },

        /*After Render*/
        onRender: function() {

            // listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // attach popover for input control in edit panel
            this._appendInfoOn(this.ui.input, {
                title: this.itemName,
                content: this.itemHelp
            });

            // attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();
        },

        /*Validate user input value*/
        validate: function(value) {

            var errors = [];

            // if user input nothing, just return
            if (!value) return errors;

            // must be a number less than 99
            if (value.search(/^\d{1,2}$/) || Number(value) > 99 || Number(value) == 0)
                errors.push({
                    target: this.ui.input,
                    title: this.itemName,
                    message: '年単位で有効な数字（1～99）をご入力ください。'
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