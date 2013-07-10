define([
        'views/resume/itembase',
        'text!templates/resume/default/itemphoto.html',
        'text!templates/resume/style1/itemphoto.html',
        'text!templates/resume/style2/itemphoto.html',
        'text!templates/resume/style3/itemphoto.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template) {

    var PhotoEditor = BaseView.extend({

        item: 'photo',

        itemName: '写真',

        itemIcon: 'icon-leaf',

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
                photo: 'img',
                inputFile: 'input[type="file"]',
                hideBtn: '.hideBtn',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'click .btn-value': 'updateModel',
            });
        },

        /*After Render*/
        onRender: function() {

            var self = this;

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();

            this.ui.inputFile.fileupload({
                type: 'PUT',
                dataType: 'json',
                done: function(e, data) {
                    self.ui.photo.fadeOut(function(){
                        self.ui.photo.attr('src', '/upload/'+data.result.photo);
                        self.ui.photo.fadeIn();
                    });
                    // console.log(data);
                    // $.each(data.result.files, function(index, file) {
                    //  $('<p/>').text(file.name).appendTo(self.$el);
                    // });
                }
            });
        },

        /*Update model when edit finished*/
        updateModel: function(event) {

            var self = this;

            // Get input value
            var newVal = $(event.target).text();

            // Prepare the date for model update
            var data = {};
            data[this.item] = newVal;

            // Save the model
            this.model.save(data, {
                // If save success
                success: function() {
                    // Update the view panel
                    self.ui.value.text(newVal);
                    // Switch to view panel
                    self.switchToValue();
                },
                // use patch
                patch: true
            });
        }

    });

    return PhotoEditor;
});