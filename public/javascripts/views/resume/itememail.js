define([
        'views/resume/itembase',
        'text!templates/resume/itememail.html'
], function(BaseView, template) {

    var EmailEditor = BaseView.extend({

        itemName: "E-mail",

        itemHelp: "メールアドレスを入力してください。",

        /*Template*/
        template: template,

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                input: 'input',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input': 'updateEmail'
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
            if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
                errors.push({
                    target: this.ui.input,
                    title: this.itemName,
                    message: 'メールアドレスの正しいフォーマットでご入力ください。'
                });

            return errors;
        },

        updateEmail: function() {

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
            this.model.set('email', this.ui.input.val());
        },

        deleteItem: function() {
            var self = this;
            this.ui.editor.slideUp(function() {
                self.trigger('item:delete', self.model);
            });
        }

    });

    return EmailEditor;
});