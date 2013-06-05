define([
        'text!templates/resume/itemgender.html'
], function(template) {

    var TextEditor = Backbone.Marionette.ItemView.extend({

        // Template
        template: template,

        dialogTemplate: '<button class="btn btn-small btn-success btn-confirm">はい</button>  <button class="btn btn-small btn-danger btn-cancel">いいえ</button>',

        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            input: 'input,label',
            deleteBtn: '.btn-delete'
        },

        // View event
        events: {
            // Switch to edit-mode when the div was clicked
            'click': 'switchToEditor',
            // Switch to view-mode when input lost focus
            // 'blur input': 'switchToValue',
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
            //this.listenTo(this.model, 'change', this.render);
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        // Render
        onRender: function() {

            // this.$el.html(this.template(this.model.toJSON())).appendTo('#basicInfo');
            // this.$value = this.$el.find('.sl-value');
            // this.$input = this.$el.find('.sl-input');
            // this.$control = this.$input.find('input,select,textarea');
            // this.$deleteBtn = this.$el.find('.btn-delete');

            // // Attach popover for input control in edit panel
            // this.$control.popover({
            //     title: this.model.get('title'),
            //     content: this.model.get('content'),
            //     placement: this.model.get('placement'),
            //     trigger: this.model.get('trigger'),
            // });

            // // Attach popover for delete button in edit panel
            // this.$deleteBtn.popover({
            //     title: "「" + this.model.get('title') + "」を削除します",
            //     content: "「" + this.model.get('title') + "」を履歴書から取り除きます。",
            //     placement: this.model.get('placement'),
            //     trigger: this.model.get('trigger'),
            // });

            // this.$el.draggable({
            //     snap: true
            // });
            // Attach popover for input control in edit panel
            this.ui.input.popover({
                title: "生年月日",
                content: "生年月日を入力してください。",
                placement: 'bottom',
                trigger: 'hover',
            });

            // Attach popover for delete button in edit panel
            this.ui.deleteBtn.popover({
                title: "「生年月日」を削除します",
                content: "「生年月日」を履歴書から取り除きます。",
                placement: 'bottom',
                trigger: 'hover',
            });
        },

        // Switch sl-editor from view-mode to edit-mode
        switchToEditor: function() {

            var self = this;

            // FadeOut view panel
            this.ui.value.fadeOut(function() {
                // SlideDown edit panel
                self.ui.editor.slideDown();
            });
        },

        // Switch sl-editor from edit-mode to view-mode
        switchToValue: function() {

            if (this.focus) return;

            this.ui.deleteBtn.popover('destroy');
            // Attach popover for delete button in edit panel
            this.ui.deleteBtn.popover({
                title: "「生年月日」を削除します",
                content: "「生年月日」を履歴書から取り除きます。",
                placement: 'bottom',
                trigger: 'hover',
            });

            var self = this;

            this.ui.editor.slideUp(function() {
                // FadeIn view panel
                self.ui.value.fadeIn();
            });

            /*
            var self = this;

            // If this method invoked immediately, user will not able to 
            // move to the next control in edit panel, so I wait 0.3 second
            window.setTimeout(function() {

                var $value = self.$el.find('.sl-value');
                var $input = self.$el.find('.sl-input');
                var $control = $input.find('input,select,textarea');
                var stop = false;

                // If any control in edit panel still got focus, means user 
                // haven't leave the edit panel yet, switch will be terminated
                $control.each(function() {
                    if ($(this).is(":focus")) {
                        stop = true;
                        return false;
                    }
                });

                // If none of the control got focus, SlideUp edit panel
                if (!stop) $input.slideUp(function() {
                        // FadeIn view panel
                        $value.fadeIn();
                    });

            }, 300);*/
        },

        // Update model when edit finished
        updateModel: function() {

            var self = this;
            var newVal = this.ui.input.val();

            // // Get key-value pair from every control, and set them to the model
            // $control.each(function() {
            //     self.model.set($(this).attr('name'), $(this).val());
            // });

            // var parentModel = this.model.get('parent');
            // var itemName = this.model.get('name');

            this.model.set('birthDay', newVal);

            // Save the model
            this.model.save();

            // TODO: rerender the view panel
            this.ui.value.text(newVal);

            // Switch to view panel
            this.switchToValue();
        },

        setFocusOut: function() {
            this.focus = false;
        },

        setFocusIn: function() {
            this.$el.css('cursor', 'pointer');
            this.focus = true;
        },

        deleteConfirm: function() {
            this.ui.deleteBtn.popover('destroy');
            this.ui.deleteBtn.popover({
                title: "本当ですか？",
                content: this.dialogTemplate,
                placement: 'bottom',
                html: true
            });
            this.ui.deleteBtn.popover('show');
        },

        deleteItem: function() {

            var self = this;

            this.model.set('birthDay', '');
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
            });
        }
    });

    return TextEditor;
});