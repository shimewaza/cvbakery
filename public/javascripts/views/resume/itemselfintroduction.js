define([
        'views/resume/itembase',
        'text!templates/resume/default/itemselfintroduction.html',
        'text!templates/resume/style1/itemselfintroduction.html',
        'text!templates/resume/style2/itemselfintroduction.html',
        'text!templates/resume/style3/itemselfintroduction.html',
        'text!templates/resume/style4/itemselfintroduction.html',
        'text!templates/resume/style5/itemselfintroduction.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template,
    style5Template) {

    var SelfIntroductionEditor = BaseView.extend({

        item: 'selfIntroduction',

        itemName: "自己紹介",

        itemIcon: 'icon-user',

        itemHelp: "なるべくアピールしましょう！",

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
                input: 'textarea',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change textarea': 'updateModel',
                'click .btn': 'updateModel'
            });
        },

        /*After Render*/
        onRender: function() {

            this.ui.input.markdown();

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Attach popover for input control in edit panel
            this._appendInfoOn(this.ui.input, {
                title: this.itemName,
                content: this.itemHelp
            });

            // Attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // Get input value
            var newVal = this.ui.input.val();

            console.log(newVal);

            // Prepare the date for model update
            var data = {};
            data[this.item] = newVal;

            // Save the model
            this.model.save(data, {

                // If save success
                success: function() {
                    // clear the error flag
                    self.err = false;
                    // remove the error class from editor
                    self.$el.removeClass('control-group error');
                    // append normal info help on editor
                    self._appendInfoOn();
                    // Update the view panel
                    self.ui.value.empty().append(markdown.toHTML(newVal));
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        }

    });

    return SelfIntroductionEditor;
});