define([
        'text!templates/resume/compositecareer.html',
        'views/resume/compositebase',
        'views/resume/itemcareer'
], function(template, BaseView, itemView) {

    var CareerView = BaseView.extend({

        item: 'career',

        itemName: '社歴',

        itemIcon: 'icon-briefcase',

        itemNumber: 5,

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

    return CareerView;
});