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

        subTemplate: _.template('<button class="btn btn-success btn-small" data-item="<%- obj.item %>">\
            <i class="<%= obj.itemIcon %> icon-white" data-item="<%- obj.item %>">\
            </button>\
        '),

        events: {
            'click button': 'addItem',
            'click i': 'addItem',
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
        }
    });

    return ToolPanelView;
});