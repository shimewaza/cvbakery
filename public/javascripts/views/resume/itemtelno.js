define([
        'views/resume/itembase',
        'text!templates/resume/itemtelno.html'
], function(BaseView, template) {

    var TelNoEditor = BaseView.extend({

        itemName: "電話番号",

        itemHelp: "「000-0000-0000」のフォーマットでお電話番号を入力してください。",

        /*Template*/
        template: template,

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                input: 'input',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input': 'updateTelNo'
            });
        },

        onRender: function() {
            this._appendInfoOn(this.ui.input, {
                title: this.itemName,
                content: this.itemHelp
            });
            this._appendInfoOnDeleteBtn();
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

        updateTelNo: function() {

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

            this.ui.value.text(this.ui.input.val());
            this.model.set('telNo', this.ui.input.val());
        },

        deleteItem: function() {
            var self = this;
            this.ui.editor.slideUp(function() {
                self.trigger('item:delete', self.model);
            });
        }

    });

    return TelNoEditor;
});