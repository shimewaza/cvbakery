define([
        'text!templates/resume/compositequalification.html',
        'views/resume/compositebase',
        'views/resume/itemqualification'
], function(template, BaseView, itemView) {

    var QualificationView = BaseView.extend({

        item: 'qualification',

        itemName: '資格',

        itemIcon: 'icon-bookmark',

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

    return QualificationView;
});