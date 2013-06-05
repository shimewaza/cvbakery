define([
        'text!templates/resume/itembirthday.html'
], function(template) {

    var TextEditor = Backbone.Marionette.ItemView.extend({

        // Template
        template: template,

        dialogTemplate: '<button class="btn btn-small btn-success btn-confirm">はい</button>  <button class="btn btn-small btn-danger btn-cancel">いいえ</button>',

        // UI
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            input: 'input',
            deleteBtn: '.btn-delete'
        },

        // View event
        events: {

            // Switch to edit-mode when the div was clicked
            'click': 'switchToEditor',

            // Update model when input's value was chenaged
            'change input': 'updateModel',

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

        // Initializer
        initialize: function() {

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Listen to the model, show validation error
            this.listenTo(this.model, 'invalid', this.showError);
        },

        // After Render
        onRender: function() {

            // Attach popover for input control in edit panel
            this.ui.input.popover({
                title: "生年月日",
                content: "生年月日を入力してください。",
                placement: 'bottom',
                trigger: 'hover',
                // container: 'body'
            });

            // Attach popover for delete button in edit panel
            this.ui.deleteBtn.popover({
                title: "「生年月日」を削除します",
                content: "「生年月日」を履歴書から取り除きます。",
                placement: 'bottom',
                trigger: 'hover',
                // container: 'body'
            });
        },

        // Switch sl-editor from view-mode to edit-mode
        switchToEditor: function() {

            var self = this;

            // FadeOut view panel
            this.ui.value.fadeOut(function() {
                // SlideDown edit panel
                self.ui.editor.slideDown();
                // Let the input control get focus
                self.ui.input.focus();
            });
        },

        // Switch sl-editor from edit-mode to view-mode
        switchToValue: function() {

            var self = this;

            // Stop execution if mouse still above this item
            if (this.focus) return;

            // Destroy previous popover            
            this.ui.deleteBtn.popover('destroy');

            // Attach popover for delete button in edit panel
            this.ui.deleteBtn.popover({
                title: "「生年月日」を削除します",
                content: "「生年月日」を履歴書から取り除きます。",
                placement: 'bottom',
                trigger: 'hover',
                // container: 'body'
            });

            // Slide up the edit panel
            this.ui.editor.slideUp(function() {
                // FadeIn view panel
                self.ui.value.fadeIn();
            });
        },

        // Update model when edit finished
        updateModel: function() {

            var self = this;

            // Get input value
            var newVal = this.ui.input.val();
            // Set the new value into model
            this.model.set('birthDay', newVal);

            // Save the model
            this.model.save({}, {
                success: function() {
                    // Update the view panel
                    self.ui.value.text(newVal);
                    // Switch to view panel
                    self.switchToValue();
                }
            });
        },

        // Set up a flag indicate mouse on
        setFocusIn: function(event) {
            this.$el.css('cursor', 'pointer');
            this.focus = true;
        },

        // Clear the flag when mouse out
        setFocusOut: function(event) {
            this.focus = false;
        },

        // Show a confirm dialog when user click delete button
        deleteConfirm: function() {

            // Destroy previous popover
            this.ui.deleteBtn.popover('destroy');
            // Attach a new popover 
            this.ui.deleteBtn.popover({
                title: "本当ですか？",
                content: this.dialogTemplate,
                placement: 'bottom',
                html: true,
                // container: 'body'
            });
            // Show it up 
            this.ui.deleteBtn.popover('show');
        },

        // Delete item when user click OK
        deleteItem: function() {

            var self = this;

            this.model.unset('birthDay');
            this.model.save({}, {
                success: function() {
                    self.$el.slideUp(function() {
                        // mediator.publish('resume:removeItem', self.model);
                        self.close();
                    });
                }
            });
        },

        deleteCancel: function() {

            this.ui.deleteBtn.popover('destroy');
            // Attach popover for delete button in edit panel
            this.ui.deleteBtn.popover({
                title: "「生年月日」を削除します",
                content: "「生年月日」を履歴書から取り除きます。",
                placement: 'bottom',
                trigger: 'hover',
                // container: 'body'
            });
        },

        showError: function(model, error) {

            // if (error.item == "birthDay") {

            //     this.ui.input.popover('destroy');

            //     this.$el.addClass('control-group error');

            //     // Attach popover for delete button in edit panel
            //     this.ui.input.popover({
            //         title: "「生年月日」は不正です",
            //         content: "正しいフォーマットでご入力ください。",
            //         placement: 'bottom',
            //         trigger: 'hover',
            //         // container: 'body'
            //     });
            // }
        }
    });

    return TextEditor;
});