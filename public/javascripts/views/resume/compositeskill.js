define([
        'text!templates/resume/compositeskill.html',
        'views/resume/compositebase',
        'views/resume/itemskill'
], function(template, BaseView, itemView) {

    var SkillView = BaseView.extend({

        item: 'skill',

        itemName: 'スキル',

        itemIcon: 'icon-gear',

        itemNumber: 20,

        /*Template*/
        template: template,

        itemViewContainer: '.item-container',

        itemView: itemView,

        /*Initializer*/
        initialize: function() {
            this.ui = _.extend({}, this.commonUI);
            this.events = _.extend({}, this.commonEvents);
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

    return SkillView;
});