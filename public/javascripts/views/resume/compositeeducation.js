define([
        'text!templates/resume/default/compositeeducation.html',
        'text!templates/resume/style1/compositeeducation.html',
        'text!templates/resume/style2/compositeeducation.html',
        'text!templates/resume/style3/compositeeducation.html',
        'text!templates/resume/style4/compositeeducation.html',
        'text!templates/resume/style5/compositeeducation.html',
        'views/resume/compositebase',
        'views/resume/itemeducation'
], function(
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template,
    style5Template,
    BaseView,
    itemView) {

    var EducationView = BaseView.extend({

        item: 'education',

        itemName: '学歴',

        itemIcon: 'icon-pencil',

        itemNumber: 5,

        /*Template*/
        // template: template,

        itemViewContainer: '.item-container',

        itemView: itemView,
        
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
            this.ui = _.extend({}, this.commonUI);
            this.events = _.extend({}, this.commonEvents);
            this.itemViewOptions = {
                templateRef: this.options.templateRef
            };
        },

        onRender: function() {

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Attach popover for add button in edit panel
            this._appendInfoOnAddBtn();

            // Attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();

            if (this.collection.length >= this.itemNumber)
                this.ui.addBtn.hide();
        }
    });

    return EducationView;
});