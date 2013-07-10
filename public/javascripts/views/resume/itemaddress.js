define([
        'views/resume/itembase',
        'text!templates/resume/default/itemaddress.html',
        'text!templates/resume/style1/itemaddress.html',
        'text!templates/resume/style2/itemaddress.html',
        'text!templates/resume/style3/itemaddress.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template) {

    var AddressEditor = BaseView.extend({

        item: 'address',

        itemName: "住所",

        itemIcon: 'icon-home',

        getTemplate: function() {
            if (this.options.templateRef === "default")
                return defaultTemplate;
            else if (this.options.templateRef === "style1")
                return style1Template;
            else if (this.options.templateRef === "style2")
                return style2Template;
            else if (this.options.templateRef === "style3")
                return style3Template;
        },

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                inputZipCode: 'input[name="zipCode"]',
                inputAddress: 'input[name="address"]',
                iconLoading: '.icon-loading',
                areaZipCode: '#zipCodeSubArea',
                areaAddress: '#addressSubArea',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="zipCode"]': 'updateZipCode',
                'change input[name="address"]': 'updateAddress',
            });
        },

        /*After Render*/
        onRender: function() {

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Attach popover for input control in edit panel
            this._appendInfoOnInput();

            // Attach popover for delete button in edit panel
            this._appendInfoOnRemoveBtn();
        },

        /*Validate user input value*/
        validate: function() {

            var zipCode = this.ui.inputZipCode.val();
            var address = this.ui.inputAddress.val();
            var errors = [];

            if (zipCode && !/^[0-9]{7}$/.test(zipCode))
                errors.push({
                    target: this.ui.inputZipCode,
                    title: "郵便番号",
                    message: '半角数字7桁でご入力ください。'
                });

            if (address.length > 50)
                errors.push({
                    target: this.ui.inputAddress,
                    title: "住所",
                    message: '50文字以内でご入力ください。'
                });

            return errors;
        },

        updateZipCode: function() {

            var self = this;

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputZipCode))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            var zipCode = this.ui.inputZipCode.val();

            if(zipCode) this._getAddress(zipCode);

            // Prepare the date for model update
            var data = {
                'zipCode': zipCode
            };

            // Save the model
            this.model.save(data, {

                // If save success
                success: function() {
                    // Update the view panel
                    self.ui.value.text(self._renderValue()/*"〒 " + zipCode + "）" + self.model.get('address')*/);
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        },

        /*Update model when edit finished*/
        updateAddress: function() {

            var self = this;

            var errors = this.validate();
            if (errors.length) {
                this.showError(errors);

                if (_.contains(_.pluck(errors, 'target'), this.ui.inputAddress))
                    return;
            } else {
                this.clearError();
                // append normal info help on editor
                this._appendInfoOnInput();
            }

            var address = this.ui.inputAddress.val();

            // Prepare the date for model update
            var data = {
                'address': address
            };

            // Save the model
            this.model.save(data, {

                // If save success
                success: function() {
                    // Update the view panel
                    self.ui.value.text(self._renderValue()/*"〒 " + self.model.get('zipCode') + "）" + address*/);
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        },

        _renderValue: function() {

            var result = '';

            if(this.model.get('zipCode'))
                result += "〒 " + this.model.get('zipCode') + "）"

            result += this.model.get('address');

            return result;
        },

        _getAddress: function(zipCode) {

            var self = this;

            // Require home page from server
            $.ajax({

                // page url
                url: '/address/' + zipCode,

                // method is get
                type: 'GET',

                // use json format
                dataType: 'json',

                // wait for 3 seconds
                timeout: 3000,

                complete: function() {
                    self.ui.iconLoading.empty().append('<i class="icon-refresh icon-spin"><i>');
                },

                // success handler
                success: function(data) {
                    setTimeout(function() {
                        self.ui.iconLoading.empty().text('〒');
                    }, 100);
                    self.ui.inputAddress.val(data.state + data.city + data.street);
                    self.ui.inputAddress.trigger("change");
                }
            });
        },

        _appendInfoOnInput: function() {

            this._appendInfoOn(this.ui.inputZipCode, {
                title: '郵便番号',
                content: '数字7桁で入力してください。ご住所は該当郵便番号で自動に埋め込みます。'
            });

            this._appendInfoOn(this.ui.inputAddress, {
                title: '住所',
                content: "50文字以内で入力してください。"
            })
        }
    });

    return AddressEditor;
});