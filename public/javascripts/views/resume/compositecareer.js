define([
        'text!templates/resume/compositecareer.html',
        'views/resume/compositebase',
        'views/resume/itemcareer'
], function(template, BaseView, itemView) {

    var CareerView = BaseView.extend({

        item: 'career',

        itemName: '社歴',

        itemNumber: 5,

        /*Template*/
        template: template,

        itemViewContainer: '.item-container',

        itemView: itemView,

        /*UI*/
        ui: {
            editor: '.sl-editor',
            addBtn: '.btn-add',
            deleteBtn: '.btn-delete'
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

            // Attach popover for delete button in edit panel
            this._appendInfoOnRemoveBtn();
            
            if (this.collection.length >= this.itemNumber)
                this.ui.addBtn.hide();
        }

    });

    return CareerView;
});