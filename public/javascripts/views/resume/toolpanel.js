define([
        'text!templates/resume/toolpanel.html'
], function(itemPanelTemplate) {

    var ToolPanelView = Backbone.Marionette.ItemView.extend({

        // This view is a div
        tagName: 'div',

        // Class on HTML page
        className: 'well well-small container-fluid sl-panel',

        // ID on HTML page
        id: 'resumeToolPanel',

        template: itemPanelTemplate,

        missedItems: [],

        subTemplate: _.template('<button class="btn btn-success btn-item" data-item="<%- obj.item %>">\
            <i class="<%= obj.itemIcon %> icon-white btn-item" data-item="<%- obj.item %>">\
            </button>\
        '),

        events: {
            'click .btn-item': 'addItem',
            'click .btn-pdf': 'outputPDF',
            'click .img-polaroid': 'changePattern'
        },

        initialize: function() {
            this.listenTo(vent, 'resume:itemRemoved', this.onItemRemoved);
        },

        addItem: function(event) {

            var $target = $(event.target);

            var data = this.model.get('setting');
            data[$target.data('item')] = true;

            // save the model
            this.model.save({
                setting: data
            }, {

                // if save success
                success: function() {

                    vent.trigger('resume:itemAdded', {
                        item: $target.data('item')
                    });

                    $target.closest('button').slideUp();
                },
                // use patch
                patch: true
            });

        },

        onItemRemoved: function(data) {

            $(this.subTemplate(data))
                .css('display', 'none')
                .appendTo('#itemBtnArea')
                .slideDown();
        },

        changePattern: function(event) {
            var $target = $(event.target);
            console.log($target.css('background-image'));
            vent.trigger('resume:changePattern', $target.css('background-image'));
        },

        outputPDF: function() {

            $.fileDownload('/engineer/me/pdf');

            // // Login
            // $.ajax({

            //     // page url
            //     url: '/engineer/me/pdf',

            //     // method is post
            //     type: 'GET',

            //     // login success handler
            //     success: function(result) {
            //         self.$('.message').text(result.message);
            //     },

            //     // login error handler
            //     error: function(xhr, status) {
            //         self.$('.message').text(xhr.responseText);
            //     }
            // }, {
            //     iframe: true,
            // });
        }
    });

    return ToolPanelView;
});