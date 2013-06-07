define([
        'views/resume/itembase',
        'text!templates/resume/itemaddress.html'
], function(BaseView, template) {

    var AddressEditor = BaseView.extend({

        item: 'address',

        itemName: "住所",

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            inputZipCode: 'input[name="zipCode"]',
            inputAddress: 'input[name="address"]',
            areaZipCode: '#zipCodeSubArea',
            areaAddress: '#addressSubArea',
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

            // Attach popover for input control in edit panel
            this._appendInfoOnInputZipCode();
            this._appendInfoOnInputAddress();

            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // Get input value
            var newZipCode = this.ui.inputZipCode.val();
            var newAddress = this.ui.inputAddress.val();
            // Set the new value into model
            this.model.set('zipCode', newZipCode);
            this.model.set('address', newAddress);

            // Save the model
            this.model.save({}, {

                // If save success
                success: function() {
                    // clear the error flag
                    self.err = false;
                    // remove the error class from editor
                    self.ui.areaZipCode.removeClass('error');
                    self.ui.areaAddress.removeClass('error');
                    // append normal info help on editor
                    self._appendInfoOnInputZipCode();
                    self._appendInfoOnInputAddress();
                    // Update the view panel
                    self.ui.value.text(newAddress + "（〒" + newZipCode + "）");
                    // Switch to view panel
                    self.switchToValue();
                }
            });
        },

        /*Display error info for editor*/
        showError: function(model, error) {

            // if the error is about this view
            if (error.item == 'zipCode') {
                // setup error flag
                this.err = true;
                // highlight the editor
                this.ui.areaZipCode.addClass('control-group error');
                // Attach popover for delete button in edit panel
                this._appendErrOnInputZipCode(error.message);

            } else if (error.item == 'address') {
                // setup error flag
                this.err = true;
                // highlight the editor
                this.ui.areaAddress.addClass('control-group error');
                // Attach popover for delete button in edit panel
                this._appendErrOnInputAddress(error.message);
            }
        },

        /**/
        _appendInfoOnInputZipCode: function() {

            // Destroy previous popover
            this.ui.inputZipCode.popover('destroy');

            // Attach a new popover 
            this.ui.inputZipCode.popover({
                title: '郵便番号',
                content: "郵便番号をここで編集できます。",
                placement: 'right',
                trigger: 'hover',
                // container: 'body'
            });
        },

        /**/
        _appendInfoOnInputAddress: function() {

            // Destroy previous popover
            this.ui.inputAddress.popover('destroy');

            // Attach a new popover 
            this.ui.inputAddress.popover({
                title: '住所',
                content: "住所をここで編集できます。",
                placement: 'right',
                trigger: 'hover',
                // container: 'body'
            });
        },

        /**/
        _appendErrOnInputZipCode: function(message) {

            // Destroy previous popover
            this.ui.inputZipCode.popover('destroy');

            // Attach a new popover 
            this.ui.inputZipCode.popover({
                title: '<div class="text-error">「郵便番号」は不正です</div>',
                content: message + '<br/><small class="text-error">この項目は保存されていません。</small>',
                placement: 'right',
                html: true,
                trigger: 'hover',
                // container: 'body'
            });
        },

        /**/
        _appendErrOnInputAddress: function(message) {

            // Destroy previous popover
            this.ui.inputAddress.popover('destroy');

            // Attach a new popover 
            this.ui.inputAddress.popover({
                title: '<div class="text-error">「住所」は不正です</div>',
                content: message + '<br/><small class="text-error">この項目は保存されていません。</small>',
                placement: 'right',
                html: true,
                trigger: 'hover',
                // container: 'body'
            });
        }
    });

    return AddressEditor;
});