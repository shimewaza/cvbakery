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
		    <i class="<%= obj.itemIcon %> icon-white icon-2x btn-item" data-item="<%- obj.item %>">\
		    </button>\
		'),

		initialize: function() {
			this.events = _.extend({}, this.commonEvents, {
				'click .btn-item': 'addItem'
			});
		},

		onRender: function() {

			// get user setting
			var setting = this.model.get('setting');

			if (!setting.birthDay)
				this._showItem({
					item: 'birthDay',
					itemName: "生年月日",
					itemIcon: 'icon-calendar'
				});
			
			if (!setting.gender)
				this._showItem({
					item: 'gender',
					itemName: '性別',
					itemIcon: 'icon-leaf'
				});

			if (!setting.nationality)
				this._showItem({
					item: 'nationality',
					itemName: '国籍',
					itemIcon: 'icon-flag'
				});

			if (!setting.married)
				this._showItem({
					item: 'married',
					itemName: '婚姻状況',
					itemIcon: 'icon-heart'
				});

			if (!setting.firstArrive)
				this._showItem({
					item: 'firstArrive',
					itemName: "初回来日",
					itemIcon: 'icon-plane'
				});

			if (!setting.itExperience)
				this._showItem({
					item: 'itExperience',
					itemName: "IT経験年数",
					itemIcon: 'icon-briefcase'
				});

			if (!setting.availableDate)
				this._showItem({
					item: 'availableDate',
					itemName: "稼働可能日",
					itemIcon: 'icon-ok'
				});

			if (!setting.address)
				this._showItem({
					item: 'address',
					itemName: "住所",
					itemIcon: 'icon-home'
				});

			if (!setting.nearestStation)
				this._showItem({
					item: 'nearestStation',
					itemName: "最寄り駅",
					itemIcon: 'icon-road'
				});

			if (!setting.telNo)
				this._showItem({
					item: 'telNo',
					itemName: "電話番号",
					itemIcon: 'icon-phone'

				});

			if (!setting.email)
				this._showItem({
					item: 'email',
					itemName: "E-mail",
					itemIcon: 'icon-envelope'
				});			

			if (!setting.homePage)
				this._showItem({
					item: 'homePage',
					itemName: "個人サイト",
					itemIcon: 'icon-globe'
				});
			
			if (!setting.selfIntroduction)
				this._showItem({
					item: 'selfIntroduction',
					itemName: "自己紹介",
					itemIcon: 'icon-user'
				});
			
			if (!setting.education)
				this._showItem({
					item: 'education',
					itemName: '学歴',
					itemIcon: 'icon-pencil'
				});
			
			if (!setting.career)
				this._showItem({
					item: 'career',
					itemName: '社歴',
					itemIcon: 'icon-briefcase'
				});
			
			if (!setting.workExperience)
				this._showItem({
					item: 'workExperience',
					itemName: '仕事経験',
					itemIcon: 'icon-group'
				});
			
			if (!setting.languageBackground)
				this._showItem({
					item: 'languageBackground',
					itemName: '語学能力',
					itemIcon: 'icon-comments-alt'
				});
			
			if (!setting.qualification)
				this._showItem({
					item: 'qualification',
					itemName: '資格',
					itemIcon: 'icon-credit-card'
				});
			
			if (!setting.skill)
				this._showItem({
					item: 'skill',
					itemName: 'スキル',
					itemIcon: 'icon-gear'
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

		_showItem: function(data) {
			// add item's button to context menu's itemBtnArea
			$(this.subTemplate(data))
			    .appendTo(this.$el.find('.itemMenu-inner'))
			    .popover({
			        title: data.itemName,
			        content: data.itemName + "履歴書に追加します。",
			        placement: 'top',
			        trigger: 'hover',
			        html: true,
			        container: 'body'
			    });
		}
	});

	return ItemMenuView;
});