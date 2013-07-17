define([
        'views/resume/itembase',
        'text!templates/resume/default/itemname.html',
        'text!templates/resume/style1/itemname.html',
        'text!templates/resume/style2/itemname.html',
        'text!templates/resume/style3/itemname.html',
        'text!templates/resume/style4/itemname.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template) {

    var NameEditor = BaseView.extend({

        item: 'name',

        itemName: "氏名",

        getTemplate: function() {
            if (this.options.templateRef === "default")
                return defaultTemplate;
            else if (this.options.templateRef === "style1")
                return style1Template;
            else if (this.options.templateRef === "style2")
                return style2Template;
            else if (this.options.templateRef === "style3")
                return style3Template;
            else if (this.options.templateRef === "style4")
                return style4Template;
        },

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                inputFirstName: 'input[name="firstName"]',
                inputLastName: 'input[name="lastName"]',
                inputFirstNameKana: 'input[name="firstNameKana"]',
                inputLastNameKana: 'input[name="lastNameKana"]',
                inputFirstNameEn: 'input[name="firstNameEn"]',
                inputLastNameEn: 'input[name="lastNameEn"]',
                areaName: '#nameArea',
                areaNameKana: '#nameKanaArea',
                areaNameEn: '#nameEnArea',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="firstName"]': 'updateFirstName',
                'change input[name="lastName"]': 'updateLastName',
                'change input[name="firstNameKana"]': 'updateFirstNameKana',
                'change input[name="lastNameKana"]': 'updateLastNameKana',
                'change input[name="firstNameEn"]': 'updateFirstNameEn',
                'change input[name="lastNameEn"]': 'updateLastNameEn'
            });
        },

        /*After Render*/
        onRender: function() {

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Attach popover for input control in edit panel
            this._appendInfoOnInput();
        },

        updateFirstName: function() {
            // Get input value
            var newVal = this.ui.inputFirstName.val();
            this.updateModel({
                firstName: newVal
            });
        },

        updateLastName: function() {
            // Get input value
            var newVal = this.ui.inputLastName.val();
            this.updateModel({
                lastName: newVal
            });
        },

        updateFirstNameKana: function() {
            // Get input value
            var newVal = this.ui.inputFirstNameKana.val();
            this.updateModel({
                firstNameKana: newVal
            });
        },

        updateLastNameKana: function() {
            // Get input value
            var newVal = this.ui.inputLastNameKana.val();
            this.updateModel({
                lastNameKana: newVal
            });
        },

        updateFirstNameEn: function() {
            // Get input value
            var newVal = this.ui.inputFirstNameEn.val();
            this.updateModel({
                firstNameEn: newVal
            });
        },

        updateLastNameEn: function() {
            // Get input value
            var newVal = this.ui.inputLastNameEn.val();
            this.updateModel({
                lastNameEn: newVal
            });
        },       

        /*Update model when edit finished*/
        updateModel: function(data) {

            var self = this;

            // Save the model
            this.model.save(data, {

                // If save success
                success: function() {
                    // Update the view panel
                    self._renderValue();
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        },

        _renderValue: function() {

            var firstName = this.ui.inputFirstName.val();
            var lastName = this.ui.inputLastName.val();
            var firstNameKana = this.ui.inputFirstNameKana.val();
            var lastNameKana = this.ui.inputLastNameKana.val();
            var firstNameEn = this.ui.inputFirstNameEn.val();
            var lastNameEn = this.ui.inputLastNameEn.val();

            if (!firstName && !lastName && !firstNameKana && !lastNameKana && !firstNameEn && !lastNameEn) {

                this.ui.value.empty().append('<h4 class="sl-placeholder">氏名を入力</h4>');

            } else if (this.options.templateRef === "style2") {

                this.ui.value.empty().append('<h4></h4>');
                var innerH4 = this.ui.value.find('h4');
                if (firstName || lastName) {
                    innerH4.append(firstName + '&nbsp;&nbsp;&nbsp;&nbsp;' + lastName);
                }
                if (firstNameKana || lastNameKana) {
                    innerH4.append(firstNameKana + '&nbsp;&nbsp;&nbsp;&nbsp;' + lastNameKana);
                } 
                if (firstNameEn || lastNameEn) {
                    innerH4.append(firstNameEn + '&nbsp;&nbsp;&nbsp;&nbsp;' + lastNameEn);
                } 
            } else {
                
                this.ui.value.empty();

                if (firstNameEn || lastNameEn) {
                    this.ui.value.append('<h5>' + firstNameEn + '&nbsp;&nbsp;&nbsp;&nbsp;' + lastNameEn + '</h5>');
                }
                if (firstNameKana || lastNameKana) {
                    this.ui.value.append('<h5>' + firstNameKana + '&nbsp;&nbsp;&nbsp;&nbsp;' + lastNameKana + '</h5>');
                } 
                if (firstName || lastName) {
                    this.ui.value.append('<h4>' + firstName + '&nbsp;&nbsp;&nbsp;&nbsp;' + lastName + '</h4>');
                }
            }
        },

        _appendInfoOnInput: function() {
            this._appendInfoOn(this.ui.inputFirstName, {
                title: "姓（漢字）",
                content: "ご氏名（漢字）を10文字入力してください。"
            });
            this._appendInfoOn(this.ui.inputLastName, {
                title: "名（漢字）",
                content: "ご氏名（漢字）を10文字入力してください。"
            });
            this._appendInfoOn(this.ui.inputFirstNameKana, {
                title: "姓（フリガナ）",
                content: "ご氏名（フリガナ）を10文字入力してください。"
            });
            this._appendInfoOn(this.ui.inputLastNameKana, {
                title: "名（フリガナ）",
                content: "ご氏名（フリガナ）を10文字入力してください。"
            });
            this._appendInfoOn(this.ui.inputFirstNameEn, {
                title: "姓（英字）",
                content: "ご氏名（英字）を20文字入力してください。"
            });
            this._appendInfoOn(this.ui.inputLastNameEn, {
                title: "名（英字）",
                content: "ご氏名（英字）を20文字入力してください。"
            });
        }

    });

    return NameEditor;
});