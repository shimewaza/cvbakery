define([
        'views/resume/itembase',
        'text!templates/resume/itemcareer.html'
], function(BaseView, template) {

    var ItemEducation = BaseView.extend({

        itemName: '社歴',

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            inputStartDate: 'input[name="startDate"]',
            inputEndDate: 'input[name="endDate"]',
            inputCompany: 'input[name="company"]',
            inputAddress: 'input[name="address"]',
            inputPosition: 'input[name="position"]',
            areaDate: '.dateArea',
            areaCompany: '.companyArea',
            areaAddress: '.addressArea',
            areaPosition: '.positionArea',
            deleteBtn: '.btn-delete'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="startDate"]': 'updateStartDate',
                'change input[name="endDate"]': 'updateEndDate',
                'change input[name="company"]': 'updateCompany',
                'change input[name="address"]': 'updateAddress',
                'change input[name="position"]': 'updatePosition'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {
            this._appendDatePicker(this.ui.inputStartDate);
            this._appendDatePicker(this.ui.inputEndDate);
            this._appendInfoOnInput();
            this._appendInfoOnDeleteBtn();
        },

        updateStartDate: function() {
            // this.ui.areaStartDate.text(this._formatDate(this.ui.inputStartDate.val()));
            this.model.set('startDate', this.ui.inputStartDate.val());
        },

        updateEndDate: function() {
            // this.ui.areaEndDate.text(this._formatDate(this.ui.inputEndDate.val()));
            this.model.set('endDate', this.ui.inputEndDate.val());
        },

        updateCompany: function() {
            this.ui.areaCompany.text(this.ui.inputCompany.val());
            this.model.set('company', this.ui.inputCompany.val());
        },

        updateAddress: function() {
            this.ui.areaAddress.text(this.ui.inputAddress.val());
            this.model.set('address', this.ui.inputAddress.val());
        },

        updatePosition: function() {
            this.ui.areaPosition.text(this.ui.inputPosition.val());
            this.model.set('position', this.ui.inputPosition.val());
        },

        deleteItem: function() {
            var self = this;
            this.ui.editor.slideUp(function() {
                self.trigger('item:delete', self.model);
            });
        },

        _appendInfoOnInput: function() {
            this._appendInfoOn(this.ui.inputStartDate, {
                title: "勤務開始日",
                content: "「YYYY/MM/DD」のフォーマットで入力してください。"
            });
            this._appendInfoOn(this.ui.inputEndDate, {
                title: "勤務終了日",
                content: "「YYYY/MM/DD」のフォーマットで入力してください。"
            });
            this._appendInfoOn(this.ui.inputCompany, {
                title: "会社名",
                content: "お勤めていた会社の名称、20文字以内入力してください。"
            });
            this._appendInfoOn(this.ui.inputAddress, {
                title: "所在地",
                content: "お勤めていた会社の所在地、20文字以内入力してください。"
            });
            this._appendInfoOn(this.ui.inputPosition, {
                title: "職務",
                content: "ご担当していた職務、20文字以内入力してください。"
            });
        }
    });

    return ItemEducation;
});