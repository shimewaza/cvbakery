define([
        'views/resume/itembase',
        'text!templates/resume/itemhomepage.html'
], function(BaseView, template) {

    var HomePageEditor = BaseView.extend({

        itemName: "ホームページ",

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            input: 'input',
            deleteBtn: '.btn-delete'
        },

        /*Initializer*/
        initialize: function() {
            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input': 'updateHomePage'
            });
        },

        onRender: function() {
            this._appendInfoOn(this.ui.input, {
                title: "ホームページ",
                content: "「YYYY/MM/DD」のフォーマットで入力してください。"
            });
            this._appendInfoOnDeleteBtn();
        },

        updateHomePage: function() {
            this.ui.value.text(this.ui.input.val());
            this.model.set('homepage', this.ui.input.val());
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