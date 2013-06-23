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
            'click .img-polaroid': 'changePattern',
            'click #pdfBtn': 'outputPDF',
            'click #twoColsBtn': 'changeTemplate2Cols',
        },

        initialize: function() {
            this.listenTo(vent, 'resume:itemRemoved', this.onItemRemoved);
            this.$el.draggable();
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
            console.log($target.css('background-image'));
            vent.trigger('resume:changePattern', $target.css('background-image'));
        },

        outputPDF: function() {

            $.fileDownload('/engineer/me/pdf');
        },

        changeTemplate2Cols: function() {
            vent.trigger('resume:changeTemplate', 'resume-tow-cloumns');
        }
    });

    return ToolPanelView;
});