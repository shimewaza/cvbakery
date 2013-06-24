define([
        'views/resume/itembase',
        'text!templates/resume/itemhomepage.html'
], function(BaseView, template) {

    var HomePageEditor = BaseView.extend({

        itemName: "ホームページ",

        itemHelp: "ご自分のサイトやブログなどのURLを入力してください。",

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
            if (!/^[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?$/.test(value))
                errors.push({
                    target: this.ui.input,
                    title: this.itemName,
                    message: 'URLの正しいフォーマットでご入力ください。'
                });

            return errors;
        },

        updateHomePage: function() {

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