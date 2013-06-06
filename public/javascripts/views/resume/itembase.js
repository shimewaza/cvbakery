define([], function(baseinfoTemplate) {

    var BaseItem = Backbone.Marionette.ItemView.extend({

        commonEvents: {
            // Switch to edit-mode when the div was clicked
            'click': 'switchToEditor',

            // Set this editor lost foucs when mouseout
            'mouseout': 'setFocusOut',

            // Set this editor gain foucs when mouseover
            'mouseover': 'setFocusIn',

            // Popup the confirm dialog when delete button clicked
            'click .btn-delete': 'deleteConfirm',

            // Delete the data from model and remove this editor when OK button clicked
            'click .btn-confirm': 'deleteItem',

            // Close the confirm dialog when cancel button clicked
            'click .btn-cancel': 'deleteCancel'
        },

        /*Switch sl-editor from view-mode to edit-mode*/
        switchToEditor: function() {

            var self = this;

            // FadeOut view panel
            this.ui.value.fadeOut(function() {
                // SlideDown edit panel
                self.ui.editor.slideDown();
                // Let the input control get focus
                // self.ui.input.focus();
            });
        },

        /*Switch sl-editor from edit-mode to view-mode*/
        switchToValue: function() {

            var self = this;

            // Stop execution if mouse still above this item
            // or item's editor has error
            if (this.focus || this.err) return;

            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();

            // Slide up the edit panel
            this.ui.editor.slideUp(function() {
                // FadeIn view panel
                self.ui.value.fadeIn();
            });
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
            this.model.set(this.item, null);
            // save model
            this.model.save({}, {
                // if save success
                success: function() {
                    // slide up editor
                    self.$el.slideUp(function() {
                        // dispose the view
                        self.close();
                    });
                }
            });
        },

        /*Do nothing but switch helper info when user click NO*/
        deleteCancel: function() {
            // append normal info helper on delete button
            this._appendInfoOnDeleteBtn();
        },

        /*Display error info for editor*/
        showError: function(model, error) {

            // if the error is about this view
            if (error.item == this.item) {
                // setup error flag
                this.err = true;
                // highlight the editor
                this.$el.addClass('control-group error');
                // Attach popover for delete button in edit panel
                this._appendErrOnInput(error.message);
            }
        },

        /**/
        _appendInfoOnInput: function() {

            // Destroy previous popover
            this.ui.input.popover('destroy');

            // Attach a new popover 
            this.ui.input.popover({
                title: this.itemName,
                content: this.itemName + "をここで編集できます。",
                placement: 'bottom',
                trigger: 'hover',
                // container: 'body'
            });
        },

        /**/
        _appendInfoOnDeleteBtn: function() {

            // Destroy previous popover
            this.ui.deleteBtn.popover('destroy');

            // Attach a new popover 
            this.ui.deleteBtn.popover({
                title: "「" + this.itemName + "」を削除します",
                content: "「" + this.itemName + "」を履歴書から取り除きます。",
                placement: 'bottom',
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
                placement: 'bottom',
                html: true,
                // container: 'body'
            });
        },

        /**/
        _appendErrOnInput: function(message) {

            // Destroy previous popover
            this.ui.input.popover('destroy');

            // Attach a new popover 
            this.ui.input.popover({
                title: '<div class="text-error">「' + this.itemName + '」は不正です</div>',
                content: message + '<p class="text-error">この項目は保存されていません。</p>',
                placement: 'bottom',
                html: true,
                trigger: 'hover',
                // container: 'body'
            });
        },

        _simpleFormatDate: function(date) {

            if (typeof date !== "object")
                date = new Date(date);

            var curr_date = date.getDate();
            var curr_month = date.getMonth() + 1;
            var curr_year = date.getFullYear();
            return curr_year + "/" + curr_month + "/" + curr_date;
        },


        _formatDate: function(date) {

            if (typeof date !== "object")
                date = new Date(date);

            var curr_date = date.getDate();
            var curr_month = date.getMonth() + 1;
            var curr_year = date.getFullYear();
            return curr_year + "年" + curr_month + "月" + curr_date + "日";
        }
    });

    return BaseItem;
});