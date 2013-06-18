define([
        'views/resume/itembase',
        'text!templates/resume/itemqualification.html'
], function(BaseView, template) {

    var ItemEducation = BaseView.extend({

        itemName: '資格',

        /*Template*/
        template: template,

        /*Initializer*/
        initialize: function() {
            
            this.ui = _.extend({}, this.commonUI, {
                inputQualifiedDate: 'input[name="qualifiedDate"]',
                inputQualificationName: 'input[name="qualificationName"]',
                inputRemark: 'input[name="remark"]',
                areaQualifiedDate: '.qualifiedDateArea',
                areaQualificationName: '.qualificationNameArea',
                areaRemark: '.remarkArea',
                input: 'input',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input[name="qualifiedDate"]': 'updateQualifiedDate',
                'change input[name="qualificationName"]': 'updateQualificationName',
                'change input[name="remark"]': 'updateRemark'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        onRender: function() {
            this._appendDatePicker(this.ui.inputQualifiedDate);
            this._appendInfoOnInput();
            this._appendInfoOnDeleteBtn();
        },

        updateQualifiedDate: function() {
            this.model.set('qualifiedDate', this.ui.inputQualifiedDate.val());
        },

        updateQualificationName: function() {
            this.ui.areaQualificationName.text(this.ui.inputQualificationName.val());
            this.model.set('qualificationName', this.ui.inputQualificationName.val());
        },

        updateRemark: function() {
            this.ui.areaRemark.text(this.ui.inputRemark.val());
            this.model.set('remark', this.ui.inputRemark.val());
        },

        deleteItem: function() {
            var self = this;
            this.ui.editor.slideUp(function() {
                self.trigger('item:delete', self.model);
            });
        },

        _appendInfoOnInput: function() {
            this._appendInfoOn(this.ui.inputQualifiedDate, {
                title: "取得日",
                content: "ご資格を取る日期、「YYYY/MM/DD」のフォーマットで入力してください。"
            });
            this._appendInfoOn(this.ui.inputQualificationName, {
                title: "資格名",
                content: "ご資格の名称、20文字以内入力してください。"
            });
            this._appendInfoOn(this.ui.inputRemark, {
                title: "備考",
                content: "ご資格に関する他の情報、20文字以内入力してください。"
            });
        }
    });

    return ItemEducation;
});