define([
        'text!templates/resume/contextmenupanel.html'
], function(itemPanelTemplate) {

    var ToolPanelView = Backbone.Marionette.ItemView.extend({

        // This view is a div
        tagName: 'ul',

        // Class on HTML page
        className: 'well well-small container-fluid sl-panel dropdown-menu',

        // ID on HTML page
        id: 'resumeContextMenu',

        template: itemPanelTemplate,

        subTemplate: _.template('<button class="btn btn-success btn-item" data-item="<%- obj.item %>">\
            <i class="<%= obj.itemIcon %> icon-white btn-item" data-item="<%- obj.item %>">\
            </button>\
        '),

        events: {
            'click .btn-item': 'addItem',
            'click .bk-sample': 'changePattern',
            'click .tp-sample': 'changeTemplate',
            'click #pdfBtn': 'outputPDF',
        },

        initialize: function() {
            this.listenTo(vent, 'resume:itemRemoved', this.onItemRemoved);
            // this.$el.draggable();
        },

        onRender: function() {
            this.$el.find('.bk-sample').each(function() {
                var imageName = $(this).data('image');
                var val = "url('/images/resume/" + imageName + "')";
                $(this).css('background-image', val);
            })
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
                .popover({
                    title: data.itemName,
                    content: data.itemName + "履歴書に追加します。",
                    placement: 'right',
                    trigger: 'hover',
                    html: true,
                    container: 'body'
                })
                .slideDown();
        },

        changePattern: function(event) {
            var $target = $(event.target);
            vent.trigger('resume:changePattern', $target.data('image'));
        },

        changeTemplate: function(event) {
            var $target = $(event.target);
            $('#resumePanel').hide('slide', function() {
                vent.trigger('resume:changeTemplate', $target.data('template'));
            })
        },

        outputPDF: function() {
            $.fileDownload('/resume/me/pdf');
        },
    });

    return ToolPanelView;
});