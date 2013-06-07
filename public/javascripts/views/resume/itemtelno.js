define([
        'views/resume/itembase',
        'text!templates/resume/itemtelno.html'
], function(BaseView, template) {

    var TelNoEditor = BaseView.extend({

        item: 'telNo',

        itemName: "電話番号",

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            input: 'input',
            addBtn: '.btn-add',
            deleteBtn: '.btn-delete'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'click .btn-add': 'addInput',
                // Update model when input's value was chenaged
                'change input': 'updateModel'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Listen to the model, show validation error
            this.listenTo(this.model, 'invalid', this.showError);
        },

        /*After Render*/
        onRender: function() {

            // Attach popover for input control in edit panel
            this._appendInfoOnInput();

            // Attach popover for add button in edit panel
            this._appendInfoOnAddBtn();

            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        addInput: function() {
            $('<input>').attr({
                'type': 'text',
                'class': 'input-medium',
                'name': 'telNo'
            })
                .css('display', 'none')
                .popover({
                title: this.itemName,
                content: this.itemName + "をここで編集できます。",
                placement: 'right',
                trigger: 'hover',
                // container: 'body'
            })
                .insertBefore(this.$el.find('input').first())
                .slideDown();
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;
            var newVal = [];
            this.$el.find('input').each(function() {
                newVal.push($(this).val());
                self.model.set('telNo', newVal);
            })

            // Get input value
            // var newVal = this.ui.input.val();
            // Set the new value into model
            // this.model.set('telNo', newVal);

            // Save the model
            this.model.save({}, {

                // If save success
                success: function() {
                    // clear the error flag
                    self.err = false;
                    // remove the error class from editor
                    self.$el.removeClass('control-group error');
                    // append normal info help on editor
                    self._appendInfoOnInput();
                    // Update the view panel
                    self.ui.value.text(newVal);
                    // Switch to view panel
                    self.switchToValue();
                }
            });
        },

        /**/
        _appendInfoOnAddBtn: function() {

            // Destroy previous popover
            this.ui.addBtn.popover('destroy');

            // Attach a new popover 
            this.ui.addBtn.popover({
                title: "「" + this.itemName + "」を追加します",
                content: "「" + this.itemName + "」をもう一個を追加します。",
                placement: 'right',
                trigger: 'hover',
                // container: 'body'
            });
        },

    });

    return TelNoEditor;
});