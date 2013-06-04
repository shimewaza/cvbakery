define([
        'text!templates/resume/basicinfo.html'
], function(baseinfoTemplate) {

    var TextEditor = Backbone.View.extend({

        // Template
        template: _.template(baseinfoTemplate),

        dialogTemplate: '<button class="btn btn-small btn-success btn-confirm">はい</button>  <button class="btn btn-small btn-danger btn-cancel">いいえ</button>',

        // View event
        events: {
            // Switch to edit-mode when the div was clicked
            'click': 'switchToInput',
            // Switch to view-mode when input lost focus
            'blur .sl-input': 'switchToValue',
            // Update model when input's value was chenaged
            'change .sl-input': 'updateModel',
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

        },

        // Render
        render: function() {

            this.$el.html(this.template(this.model.toJSON())).appendTo('#basicInfo');
            this.$value = this.$el.find('.sl-value');
            this.$input = this.$el.find('.sl-input');
            this.$control = this.$input.find('input,select,textarea');
            this.$deleteBtn = this.$el.find('.btn-delete');

            // Attach popover for input control in edit panel
            this.$control.popover({
                title: this.model.get('title'),
                content: this.model.get('content'),
                placement: this.model.get('placement'),
                trigger: this.model.get('trigger'),
            });

            // Attach popover for delete button in edit panel
            this.$deleteBtn.popover({
                title: "「" + this.model.get('title') + "」を削除します",
                content: "「" + this.model.get('title') + "」を履歴書から取り除きます。",
                placement: this.model.get('placement'),
                trigger: this.model.get('trigger'),
            });

            this.$el.draggable({
                snap: true
            });
        },

        // Switch sl-editor from view-mode to edit-mode
        switchToInput: function() {

            var self = this;

            // FadeOut view panel
            this.$value.fadeOut(function() {
                // SlideDown edit panel
                self.$input.slideDown();
                // Let the first control in edit panel get focus
                self.$control.first().focus();
            });
        },

        // Switch sl-editor from edit-mode to view-mode
        switchToValue: function() {

            if (this.focus) return;

            this.$deleteBtn.popover('destroy');
            // Attach popover for delete button in edit panel
            this.$deleteBtn.popover({
                title: "「" + this.model.get('title') + "」を削除します",
                content: "「" + this.model.get('title') + "」を履歴書から取り除きます。",
                placement: this.model.get('placement'),
                trigger: this.model.get('trigger'),
            });

            var self = this;

            this.$input.slideUp(function() {
                // FadeIn view panel
                self.$value.fadeIn();
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

            // // Get key-value pair from every control, and set them to the model
            // $control.each(function() {
            //     self.model.set($(this).attr('name'), $(this).val());
            // });

            var parentModel = this.model.get('parent');
            var itemName = this.model.get('name');

            parentModel.set(itemName, this.$control.val());

            // Save the model
            parentModel.save();

            // TODO: rerender the view panel
            this.$value.text(this.$control.val());

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
            this.$deleteBtn.popover('destroy');
            this.$deleteBtn.popover({
                title: "本当ですか？",
                content: this.dialogTemplate,
                placement: 'bottom',
                html: true
            });
            this.$deleteBtn.popover('show');
        },

        deleteItem: function() {

            var self = this;
            var parentModel = this.model.get('parent');
            var itemName = this.model.get('name');

            parentModel.set(itemName, '');
            parentModel.save({}, {
                success: function() {
                    self.$el.slideUp(function() {
                        // mediator.publish('resume:removeItem', self.model);
                        self.off();
                        self.remove();
                    });
                }
            });
        },

        deleteCancel: function() {

            this.$deleteBtn.popover('destroy');
            // Attach popover for delete button in edit panel
            this.$deleteBtn.popover({
                title: "「" + this.model.get('title') + "」を削除します",
                content: "「" + this.model.get('title') + "」を履歴書から取り除きます。",
                placement: this.model.get('placement'),
                trigger: this.model.get('trigger'),
            });
        }
    });

    return TextEditor;
});