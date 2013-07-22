define([
    'views/resume/itembase',
    'text!templates/resume/default/itemphoto.html',
    'text!templates/resume/style1/itemphoto.html',
    'text!templates/resume/style2/itemphoto.html',
    'text!templates/resume/style3/itemphoto.html',
    'text!templates/resume/style4/itemphoto.html',
    'text!templates/resume/style5/itemphoto.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template,
    style5Template) {

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
            else if (this.options.templateRef === "style4")
                return style4Template;
            else if (this.options.templateRef === "style5")
                return style5Template;
        },

        /*Initializer*/
        initialize: function() {

            this.ui = _.extend({}, this.commonUI, {
                photo: 'img',
                inputFile: 'input[type="file"]',
                hideBtn: '.btn-hide',
            });

            this.events = _.extend({}, this.commonEvents, {
                // Update model when input's value was chenaged
                'click .btn-hide': 'updateModel',
            });
        },

        /*After Render*/
        onRender: function() {

            var self = this;

            // Listen to the universal-click, switch to view-mode when input lost focus
            this.listenTo(vent, 'click:universal', this.switchToValue);

            // Attach popover for input control in edit panel
            this._appendInfoOnInput();

            this.ui.inputFile.fileupload({
                type: 'PUT',
                dataType: 'json',
                done: function(e, data) {
                    self.ui.photo.fadeOut(function() {
                        self.ui.photo.attr('src', '/upload/' + data.result.photo);
                        self.ui.photo.fadeIn();
                    });
                }
            });
        },

        /*Update model when edit finished*/
        updateModel: function() {

            var self = this;

            // toggle value bettween "true"(display) and "false"(hide)
            var data = this.model.get('setting');
            data[this.item] = !data[this.item];

            console.log(data);
            // Save the model
            this.model.save({
                setting: data
            }, {
                // If save success
                success: function() {

                    var icon = self.ui.hideBtn.find('i');
                    var message = '';
                    
                    // Update the view panel
                    icon.removeClass('icon-eye-close icon-eye-open');
                    if (data[self.item]) {
                        icon.addClass('icon-eye-close');
                        message = "写真を公開にしました。";
                    } else {
                        icon.addClass('icon-eye-open');
                        message = "写真を非公開にしました。";
                    }
                    self._appendInfoOnInput();

                    // Switch to view panel
                    self.switchToValue();

                    // say hello to user
                    noty({
                        type: 'success',
                        timeout: 3000,
                        text: message,
                        layout: 'bottomRight'
                    })
                },
                // use patch
                patch: true
            });
        },

        _appendInfoOnInput: function() {

            this._appendInfoOn(this.$el.find('.fileinput-button'), {
                title: '写真を変更',
                content: 'ここをクリックして写真を選択できます。'
            });

            var popoverContent = {
                title: '写真を非公開にする',
                content: '写真を非公開にすれば、他人からあなたの写真を見えなくなります。<br><small class="text-error">※只今写真公開中です</small>'
            }

            if (!this.model.get('setting').photo) {
                popoverContent = {
                    title: '写真を公開にする',
                    content: '写真を公開にすれば、他人からあなたの写真を見えます。 <br><small class="text-error">※只今写真非公開です</small>'
                }
            }

            this._appendInfoOn(this.ui.hideBtn, popoverContent);
        }

    });

    return PhotoEditor;
});