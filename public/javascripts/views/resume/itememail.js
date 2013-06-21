define([
        'views/resume/itembase',
        'text!templates/resume/itememail.html'
], function(BaseView, template) {

    var EmailEditor = BaseView.extend({

        itemName: "E-mail",

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
                title: "E-mail",
                content: "メールアドレスを入力してください。"
            });
            this._appendInfoOnDeleteBtn();
        },

        updateEmail: function() {
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