define([], function() {

    var BaseView = Backbone.Marionette.CompositeView.extend({

        /*
            Common events may happend
        */
        commonEvents: {
            // Switch to edit-mode when the div was clicked
            'click': 'switchToEditor',

            // Set this editor lost foucs when mouseout
            'mouseout': 'setFocusOut',

            // Set this editor gain foucs when mouseover
            'mouseover': 'setFocusIn',

            // Add a new item when add button clicked
            'click .btn-add': 'addItem',

            // Remove the item when remove button clicked
            'click .btn-remove': 'removeItem'
        },

        /*
            Common events may happend on Collection
        */
        collectionEvents: {
            'remove': 'updateModel',
            'change': 'updateModel'
        },

        appendHtml: function(collectionView, itemView, index) {

            var model = itemView.model;

            if (model.get('_id')) {
                this.$el.find(this.itemViewContainer).append(itemView.el);
                itemView.listenTo(vent, 'click:universal', itemView.switchToValue);
                this.listenTo(itemView, 'item:delete', this.deleteItem);
            } else {
                itemView.$el.hide();
                itemView.ui.value.hide();
                itemView.ui.editor.show();
                this.$el.find(this.itemViewContainer).append(itemView.el);
                itemView.$el.slideDown(function() {
                    itemView.listenTo(vent, 'click:universal', itemView.switchToValue);
                });
                this.listenTo(itemView, 'item:delete', this.deleteItem);
            }
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
            this._appendInfoOnRemoveBtn();

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
            if (this.collection.length >= this.itemNumber)
                this.ui.addBtn.fadeOut();
        },

        deleteItem: function(model) {
            this.collection.remove(model);
            if (this.collection.length < this.itemNumber)
                this.ui.addBtn.fadeIn();
        },

        /*Remove item*/
        removeItem: function(silence) {
            var self = this;

            vent.trigger('resume:itemRemoved', {
                item: this.item,
                itemName: this.itemName,
                itemIcon: this.itemIcon
            });

            if (silence) return;

            var data = this.model.get('setting');
            data[this.item] = false;

            // save the model
            this.model.save({
                setting: data
            }, {

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

        updateModel: function() {

            var self = this;

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

        /*
            Generic function for append popover on specific element
        */
        _appendInfoOn: function(target, options) {

            // do nothing if target is not exists
            if (!target) return;

            // destroy previous popover
            target.popover('destroy');

            // default option
            var defaultOpt = {
                placement: 'right',
                trigger: 'hover',
                html: true
            };

            // attach a new popover 
            target.popover(_.extend(defaultOpt, options));
        },

        /**/
        _appendInfoOnAddBtn: function() {
            this._appendInfoOn(this.ui.addBtn, {
                title: "「" + this.itemName + "」を追加します",
                content: "「" + this.itemName + '」を1件追加します。<br/><small class="text-info">' + this.itemNumber + '件まで追加できます。</small>'
            })
        },

        /**/
        _appendInfoOnRemoveBtn: function() {
            this._appendInfoOn(this.ui.removeBtn, {
                title: "「" + this.itemName + "」を非表示にします",
                content: "「" + this.itemName + "」を履歴書から取り除きます。"
            })
        },
    });

    return BaseView;
});