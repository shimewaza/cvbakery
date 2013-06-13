define([
        'views/resume/itembase',
        'text!templates/resume/itemeducation.html'
], function(BaseView, template) {

    var ItemEducation = BaseView.extend({

        /*Template*/
        template: template,

        /*UI*/
        ui: {
            value: '.sl-value',
            editor: '.sl-editor',
            inputGraduate: 'input[name="graduate"]',
            inputSchool: 'input[name="school"]',
            inputMajor: 'input[name="major"]',
            deleteBtn: '.btn-delete'
        },

        /*Initializer*/
        initialize: function() {

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'change input': 'updateModel',
                'click .btn-delete': 'deleteItem'
            });

            // Listen to the universal-click, switch to view-mode when input lost focus
            // this.listenTo(vent, 'click:universal', this.switchToValue);
        },

        updateModel: function() {

            this.model.set('graduate', this.ui.inputGraduate.val());
            this.model.set('school', this.ui.inputSchool.val());
            this.model.set('major', this.ui.inputMajor.val());

            this.trigger('item:modify', this.model);
        },

        deleteItem: function() {
            this.trigger('item:delete', this.model);
        }

    });

    return ItemEducation;
});