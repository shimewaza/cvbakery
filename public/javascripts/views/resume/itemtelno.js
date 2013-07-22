define([
        'views/resume/itembase',
        'text!templates/resume/default/itemtelno.html',
        'text!templates/resume/style1/itemtelno.html',
        'text!templates/resume/style2/itemtelno.html',
        'text!templates/resume/style3/itemtelno.html',
        'text!templates/resume/style4/itemtelno.html',
        'text!templates/resume/style5/itemtelno.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template,
    style5Template) {

    var TelNoEditor = BaseView.extend({

        item: 'telNo',

        itemName: "電話番号",

        itemIcon: 'icon-phone',

        itemHelp: "「000-0000-0000」のフォーマットでお電話番号を入力してください。",

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
                'change input': 'updateModel'
            });
        },

        onRender: function() {

            // listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            this._appendInfoOn(this.ui.input, {
                title: this.itemName,
                content: this.itemHelp
            });

            this._appendInfoOnRemoveBtn();
        },

        /*Validate user input value*/
        validate: function(value) {

            var errors = [];

            // do nothing if user input nothing
            if (!value) return errors;

            // must be a date
            if (!/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(value))
                errors.push({
                    target: this.ui.input,
                    title: this.itemName,
                    message: '「000-0000-0000」のフォーマットでご入力ください。'
                });

            return errors;
        },

        updateModel: function() {

            var self = this;

            // get input value
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

            // prepare the date for model update
            var data = {};
            data[this.item] = newVal;

            // save the model
            this.model.save(data, {
                // if save success
                success: function() {
                    // update the view panel
                    self.ui.value.text(newVal);
                    // switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        }

    });

    return TelNoEditor;
});