define([
        'views/resume/itembase',
        'text!templates/resume/itemfirstarrive.html'
], function(BaseView, template) {

    var FirstArriveEditor = BaseView.extend({

        item: 'firstArrive',

        itemName: "初回来日",

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            input: 'input',
            datePickerBtn: '.btn-datepicker',
            deleteBtn: '.btn-delete'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input': 'updateModel',
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Listen to the model, show validation error
            this.listenTo(this.model, 'invalid', this.showError);
        },

        /*After Render*/
        onRender: function() {

            var self = this;

            this.ui.datePickerBtn.datepicker({
                language: 'ja',
                autoclose: true,
                startView: 2,
                todayHighlight: true,
                format: 'yyyy/mm/dd'
            }).on('changeDate', function(e) {
                self.ui.datePickerBtn.datepicker('hide');
                self.ui.input.val(self._simpleFormatDate(e.date)).trigger('change');
            });

            // Attach popover for input control in edit panel
            this._appendInfoOnInput();

            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // Get input value
            var newVal = this.ui.input.val();
            // Set the new value into model
            this.model.set('firstArrive', newVal);

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
                    self.ui.value.text(self._formatDate(newVal));
                    // Switch to view panel
                    self.switchToValue();
                }
            });
        }
        
    });

    return FirstArriveEditor;
});