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

        subTemplate: _.template('<button class="btn btn-success btn-medium" data-item="<%- obj.item %>">\
            <i class="<%= obj.itemIcon %> icon-white" data-item="<%- obj.item %>"></i>&nbsp;&nbsp;<%- obj.itemName %>\
            </button>\
        '),

        events: {
            'click button': 'addItem',
            'click i': 'addItem',
        },

        initialize: function() {
            // mediator.subscribe('resume:missItem', this.missItem, {}, this);
            // mediator.subscribe('resume:removeItem', this.removeItem, {}, this);
            this.listenTo(vent, 'resume:itemRemoved', this.onItemRemoved);
        },

        // render: function() {
        //     this.$el.html(this.template());
        //     // this.$el.draggable({
        //     //     containment: "#content",
        //     //     scroll: false
        //     // });
        //     this.$el.appendTo('#content');
        //     _.each(this.missedItems, function(item) {
        //         item.appendTo('#resumeItemPanel');
        //     })
        // },

        // show: function() {
        //     this.$el.appendTo('#content');
        // },

        addItem: function(event) {

            var $target = $(event.target);

            // if (event.target.nodeName == "I")
            //     $target = $(event.target);
            // else
            //     $target = $(event.target).find('i');

            // var model = {
            //     name: $target.data('name'),
            //     icon: $target.data('icon'),
            //     title: $target.data('title'),
            //     content: $target.data('content')
            // };
            // // mediator.publish('resume:addItem', model);
            vent.trigger('resume:itemAdded', {
                item: $target.data('item')
            });
            $target.closest('button').fadeOut();
        },

        onItemRemoved: function(data) {

            $(this.subTemplate(data))
                .css('display', 'none')
                .appendTo('#resumeToolPanel')
                .fadeIn();
        },

        // missItem: function(model) {
        //     var missedItem = $(this.subTemplate(model.toJSON()))
        //         .popover({
        //         title: model.get('title'),
        //         content: "「" + model.get('title') + "」を履歴書に追加します。",
        //         placement: 'right',
        //         trigger: model.get('trigger'),
        //         container: 'body'
        //     });

        //     this.missedItems.push(missedItem);
        // }

    });

    return ToolPanelView;
});