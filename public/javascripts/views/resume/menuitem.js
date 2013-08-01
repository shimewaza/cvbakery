define([
	'views/resume/menubase',
	'text!templates/resume/menuitem.html'
], function(
	BaseMenu,
	template) {

	var ItemMenuView = BaseMenu.extend({

		className: 'navbar navbar-fixed-bottom',

		id: 'itemMenu',

		template: template,

		// SubTemplate for removed item button
		subTemplate: _.template('<button class="btn btn-success btn-item" data-item="<%- obj.item %>">\
		    <i class="<%= obj.itemIcon %> icon-white btn-item" data-item="<%- obj.item %>">\
		    </button>\
		'),

		initialize: function() {
			this.events = _.extend({}, this.commonEvents, {
				'click .btn-item': 'addItem'
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
	});

	return ItemMenuView;
});