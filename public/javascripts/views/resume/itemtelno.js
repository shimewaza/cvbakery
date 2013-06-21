define([
        'views/resume/itembase',
        'text!templates/resume/itemtelno.html'
], function(BaseView, template) {

    var TelNoEditor = BaseView.extend({

        itemName: "電話番号",

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
                title: "電話番号",
                content: "お電話番号を入力してください。"
            });
            this._appendInfoOnDeleteBtn();
        },

        updateTelNo: function() {
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