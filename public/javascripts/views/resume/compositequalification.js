define([
        'text!templates/resume/compositequalification.html',
        'views/resume/itemqualification'
], function(template, itemView) {

    var EducationView = Backbone.Marionette.CompositeView.extend({

        item: 'education',

        itemName: '語学能力',

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

        events: {
            // Switch to edit-mode when the div was clicked
            'click': 'switchToEditor',

            // Set this editor lost foucs when mouseout
            'mouseout': 'setFocusOut',

            // Set this editor gain foucs when mouseover
            'mouseover': 'setFocusIn',

            // 
            'click .btn-add': 'addItem',

            // Popup the confirm dialog when delete button clicked
            'click .btn-delete': 'deleteConfirm',

            // Delete the data from model and remove this editor when OK button clicked
            'click .btn-confirm': 'deleteItem',

            // Close the confirm dialog when cancel button clicked
            'click .btn-cancel': 'deleteCancel'
        },

        collectionEvents: {
            'add': 'updateModel',
            'remove': 'updateModel'
        },

        /*Initializer*/
        initialize: function() {
            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        appendHtml: function(collectionView, itemView, index) {

            var model = itemView.model;

            if (model.get('_id')) {
                this.$el.find(this.itemViewContainer).append(itemView.el);
                itemView.listenTo(vent, 'click:universal', itemView.switchToValue);
                this.listenTo(itemView, 'item:remove', this.removeItem);
            } else {
                itemView.$el.hide();
                itemView.ui.value.hide();
                itemView.ui.editor.show();
                this.$el.find(this.itemViewContainer).append(itemView.el);
                itemView.$el.slideDown(function() {
                    itemView.listenTo(vent, 'click:universal', itemView.switchToValue);
                });
                this.listenTo(itemView, 'item:remove', this.removeItem);
            }
        },

        onRender: function() {
            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        // onAfterItemAdded: function(itemView) {
        //     setTimeout(function() {
        //         itemView.switchToEditor();   
        //     }, 3000);
        // },

        updateModel: function() {

            console.log(this.collection);

            // Prepare the date for model update
            var data = {};
            data[this.item] = this.collection.toJSON();

            // Save the model
            this.model.save(data, {

                // If save success
                success: function() {
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        },

        /*Switch sl-editor from view-mode to edit-mode*/
        switchToEditor: function() {
            // SlideDown edit panel
            this.ui.editor.slideDown();
        },

        /*Switch sl-editor from edit-mode to view-mode*/
        switchToValue: function() {

            // Stop execution if mouse still above this item
            if (this.focus) return;

            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();

            // Slide up the edit panel
            this.ui.editor.slideUp();
        },

        /*Set up a flag indicate mouse on*/
        setFocusIn: function() {
            this.$el.css('cursor', 'pointer');
            this.focus = true;
        },

        /*Clear the flag when mouse out*/
        setFocusOut: function() {
            this.focus = false;
        },

        addItem: function() {
            this.collection.add(new Backbone.Model());
        },

        removeItem: function(model) {
            console.log(model);
            this.collection.remove(model);
        },

        /*Show a confirm dialog when user click delete button*/
        deleteConfirm: function() {
            // append confirm dialog on delete buttom
            this._appendConfOnDeleteBtn();
            // show it up 
            this.ui.deleteBtn.popover('show');
        },

        /*Delete item when user click OK*/
        deleteItem: function() {

            var self = this;

            // set the value to null (this feel unright)
            // this.model.set(this.item, null);

            // Prepare the date for model update
            var data = {};
            data[this.item] = [];

            // save model
            this.model.save(data, {
                // if save success
                success: function() {
                    // slide up editor
                    self.$el.slideUp(function() {
                        // dispose the view
                        self.close();
                    });
                },
                // use patch
                patch: true
            });
        },

        /*Do nothing but switch helper info when user click NO*/
        deleteCancel: function() {
            // append normal info helper on delete button
            this._appendInfoOnDeleteBtn();
        },

        /**/
        _appendInfoOnDeleteBtn: function() {

            // Destroy previous popover
            this.ui.deleteBtn.popover('destroy');

            // Attach a new popover 
            this.ui.deleteBtn.popover({
                title: "「" + this.itemName + "」を削除します",
                content: "「" + this.itemName + "」を履歴書から取り除きます。",
                placement: 'right',
                trigger: 'hover',
                // container: 'body'
            });
        },

        /**/
        _appendConfOnDeleteBtn: function() {

            // Destroy previous popover
            this.ui.deleteBtn.popover('destroy');

            // Attach a new popover 
            this.ui.deleteBtn.popover({
                title: "本当ですか？",
                content: '<button class="btn btn-small btn-danger btn-confirm">はい</button>  <button class="btn btn-small btn-warning btn-cancel">いいえ</button>',
                placement: 'right',
                html: true,
                // container: 'body'
            });
        },
    });

    return EducationView;
});