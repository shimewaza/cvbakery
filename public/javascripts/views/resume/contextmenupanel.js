define([
    'text!templates/resume/contextmenupanel.html'
], function(itemPanelTemplate) {

    var ContextMenuView = Backbone.Marionette.ItemView.extend({

        // This view is a div
        tagName: 'ul',

        // Class on HTML page
        className: 'well well-small container-fluid sl-panel dropdown-menu',

        // ID on HTML page
        id: 'resumeContextMenu',

        // Temple
        template: itemPanelTemplate,

        // SubTemplate for removed item button
        subTemplate: _.template('<button class="btn btn-success btn-item" data-item="<%- obj.item %>">\
            <i class="<%= obj.itemIcon %> icon-white btn-item" data-item="<%- obj.item %>">\
            </button>\
        '),

        // Events
        events: {
            'click .btn-item': 'addItem',
            'click .bk-sample': 'changePattern',
            'click .tp-sample': 'changeTemplate',
            'click #pdfBtn': 'outputPDF',
        },

        // Initializer
        initialize: function() {
            // listen to the resume event: item removed
            this.listenTo(vent, 'resume:itemRemoved', this.onItemRemoved);
        },

        // After render
        onRender: function() {

            // attach sample image to template sample button
            this.$el.find('.tp-sample').each(function() {
                var templateName = $(this).data('template-name');
                var val = "/images/resume/sample/" + templateName + ".png";
                $(this).popover({
                    title: 'フォーマットを変更',
                    content: '<img src="' + val + '" class="img-polaroid" style="display:block; height: 200px;">',
                    placement: 'right',
                    trigger: 'hover',
                    html: true,
                    container: 'body'
                });
            });

            // attach sample image to background button 
            this.$el.find('.bk-sample').each(function() {
                var imageName = $(this).data('image');
                var val = "url('/images/resume/" + imageName + "')";
                var val2 = "/images/resume/" + imageName;
                $(this)
                    .css('background-image', val)
                    .popover({
                        title: '背景文様を変更',
                        content: '<img src="' + val2 + '" class="img-polaroid" style="display:block; height: 100px;">',
                        placement: 'right',
                        trigger: 'hover',
                        html: true,
                        container: 'body'
                    });
            });
        },

        // Add item to resume
        addItem: function(event) {

            // clicked button
            var $target = $(event.target);

            // set user setting about this item to "true"(display)
            var data = this.model.get('setting');
            data[$target.data('item')] = true;

            // save the model
            this.model.save({
                setting: data
            }, {
                // if save success
                success: function() {
                    // emmit event with the item info, this will captured by resume
                    vent.trigger('resume:itemAdded', {
                        item: $target.data('item')
                    });
                    // slide up clicked button
                    $target.closest('button').slideUp();
                },
                // use patch
                patch: true
            });
        },

        // On resume removed item
        onItemRemoved: function(data) {

            var self = this;
            // This is not right...., if the context menu are not add to DOM yet, the button will lost, so i wait for 1s.
            setTimeout(function() {
                // add item's button to context menu's itemBtnArea
                $(self.subTemplate(data))
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
            }, 1000);
        },

        // Change background partten
        changePattern: function(event) {
            // get clicked partten
            var $target = $(event.target);
            // emmit event with partten info, this will captured by resume
            vent.trigger('resume:changePattern', $target.data('image'));
        },

        // Change resume template
        changeTemplate: function(event) {
            // get clicked button
            var $target = $(event.target);
            var templateName = $target.data('template-name');

            // set user setting about this item to "true"(display)
            var data = {};
            data['template'] = templateName;

            // save the model
            this.model.save(data, {
                // if save success
                success: function() {
                    // hide current resume with slide effect
                    $('#resumePanel').hide('slide', function() {
                        // emmit event with template info, this will captrued by conttorler
                        vent.trigger('resume:changeTemplate', templateName);
                    });
                },
                // use patch
                patch: true
            });
        },

        outputPDF: function() {
            $.fileDownload('/resume/me/pdf');
        }
    });

    return ContextMenuView;
});