define([
        'text!templates/resume/itempanel.html'
], function(itemPanelTemplate) {

    var ItemPanelView = Backbone.View.extend({

        // This view is a div
        tagName: 'div',

        // Class on HTML page
        className: 'well well-small container-fluid sl-panel',

        // ID on HTML page
        id: 'resumeItemPanel',

        template: _.template(itemPanelTemplate),

        missedItems: [],

        subTemplate: _.template('<button class="btn btn-success btn-mini">\
            <i class="<%= obj.icon %> icon-white" data-name="<%= obj.name %>" data-icon="<%= obj.icon %>" data-title="<%= obj.title %>" data-content="<%= obj.content %>"></i>\
            </button>\
        '),

        events: {
            'click button': 'addItem'
        },

        initialize: function() {
            // mediator.subscribe('resume:missItem', this.missItem, {}, this);
            // mediator.subscribe('resume:removeItem', this.removeItem, {}, this);
        },

        render: function() {
            this.$el.html(this.template());
            this.$el.draggable({
                containment: "#content",
                scroll: false
            });
            this.$el.appendTo('#content');
            _.each(this.missedItems, function(item) {
                item.appendTo('#resumeItemPanel');
            })
        },

        // show: function() {
        //     this.$el.appendTo('#content');
        // },

        addItem: function(event) {

            var $target = null;

            if (event.target.nodeName == "I")
                $target = $(event.target);
            else
                $target = $(event.target).find('i');

            var model = {
                name: $target.data('name'),
                icon: $target.data('icon'),
                title: $target.data('title'),
                content: $target.data('content')
            };

            // mediator.publish('resume:addItem', model);
            $target.closest('button').fadeOut();
        },

        removeItem: function(model) {

            $(this.subTemplate(model.toJSON()))
                .css('display', 'none')
                .popover({
                title: model.get('title'),
                content: "「" + model.get('title') + "」を履歴書に追加します。",
                placement: 'right',
                trigger: model.get('trigger'),
                container: 'body'
            })
                .appendTo('#resumeItemPanel')
                .fadeIn();
        },

        missItem: function(model) {
            var missedItem = $(this.subTemplate(model.toJSON()))
                .popover({
                title: model.get('title'),
                content: "「" + model.get('title') + "」を履歴書に追加します。",
                placement: 'right',
                trigger: model.get('trigger'),
                container: 'body'
            });

            this.missedItems.push(missedItem);
        }

    });

    return ItemPanelView;
});