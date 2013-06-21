define([
        'views/resume/itembase',
        'text!templates/resume/itemhomepage.html'
], function(BaseView, template) {

    var HomePageEditor = BaseView.extend({

        itemName: "ホームページ",

        /*Template*/
        template: template,

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                input: 'input',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input': 'updateHomePage'
            });
        },

        onRender: function() {
            this._appendInfoOn(this.ui.input, {
                title: "個人サイト",
                content: "ご自分のサイトやブログなどのURLを入力してください。"
            });
            this._appendInfoOnDeleteBtn();
        },

        updateHomePage: function() {
            this.ui.value.text(this.ui.input.val());
            this.model.set('homePage', this.ui.input.val());
        },

        deleteItem: function() {
            var self = this;
            this.ui.editor.slideUp(function() {
                self.trigger('item:delete', self.model);
            });
        }

    });

    return HomePageEditor;
});