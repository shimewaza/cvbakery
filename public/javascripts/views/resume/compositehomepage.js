define([
        'text!templates/resume/compositehomepage.html',
        'views/resume/compositebase',
        'views/resume/itemhomepage'
], function(template, BaseView, itemView) {

    var HomepageView = BaseView.extend({

        item: 'homepage',

        itemName: 'ホームページ',

        itemNumber: 5,

        /*Template*/
        template: template,

        itemViewContainer: '.item-container',

        itemView: itemView,

        /*UI*/
        ui: {
            editor: '.sl-editor',
            addBtn: '.btn-add',
            removeBtn: '.btn-remove'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents);

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {

            // Attach popover for add button in edit panel
            this._appendInfoOnAddBtn();

            // Attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();

            if (this.collection.length >= this.itemNumber)
                this.ui.addBtn.hide();
        }
    });

    return HomepageView;
});