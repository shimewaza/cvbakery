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
                'change input[name="zipCode"]': 'getAddress',
                'change input[name="address"]': 'updateModel',
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        /*After Render*/
        onRender: function() {

            // Attach popover for input control in edit panel
            this._appendInfoOnInputZipCode();
            this._appendInfoOnInputAddress();

            // Attach popover for delete button in edit panel
            this._appendInfoOnDeleteBtn();
        },

        getAddress: function() {

            var self = this;

            // Require home page from server
            $.ajax({

                // page url
                url: '/address/' + this.ui.inputZipCode.val(),

                // method is get
                type: 'GET',

                // use json format
                dataType: 'json',

                // wait for 3 seconds
                timeout: 3000,

                // complete: function() {
                //     self.$el.append($('<img>').attr({
                //        src: '../images/loading.gif',
                //        width: '100px'
                //     }));
                // },

                // success handler
                success: function(data) {
                    self.ui.inputAddress.val(data.state + data.city + data.street);
                    self.ui.inputAddress.trigger("change");
                }
            });
        },

        /*Validate user input value*/
        validate: function(value) {

            // if user input nothing, just return
            if (!value) return;

            // no more than 20 characters
            if (value.length > 20)
                return {
                    message: '20文字以内でご入力ください。'
            };
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // Get input value
            var newZipCode = this.ui.inputZipCode.val();
            var newAddress = this.ui.inputAddress.val();

            // Prepare the date for model update
            var data = {
                'zipCode': newZipCode,
                'address': newAddress
            };

            // Save the model
            this.model.save(data, {

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
                },
                // use patch
                patch: true
            });
        },

        /*Delete item when user click OK*/
        deleteItem: function() {

            var self = this;

            // Prepare the date for model update
            var data = {
                'zipCode': null,
                'address': null
            };

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
                content: '<div style="font-size: 12px">数字7桁で入力してください。ご住所は該当郵便番号で自動に埋め込みます。</div>',
                placement: 'right',
                trigger: 'hover',
                html: true
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
                content: "50文字以内で入力してください。",
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