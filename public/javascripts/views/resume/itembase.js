define([], function() {

    var BaseItem = Backbone.Marionette.ItemView.extend({

        /*
            Common events may happend
        */
        commonEvents: {
            // Switch to edit-mode when the div was clicked
            'click': 'switchToEditor',

            // Set this editor lost foucs when mouseout
            'mouseout': 'setFocusOut',

            // Set this editor gain foucs when mouseover
            'mouseover': 'setFocusIn',

            // Remove editor when remove button clicked
            'click .btn-remove': 'removeItem',

            // Popup the confirm dialog when delete button clicked
            'click .btn-delete': 'deleteConfirm',

            // Delete editor when OK button clicked
            'click .btn-confirm': 'deleteItem',

            // Close the confirm dialog when cancel button clicked
            'click .btn-cancel': 'deleteCancel'
        },

        /*
            Switch sl-editor from view-mode to edit-mode
        */
        switchToEditor: function() {

            var self = this;

            // fadeOut view panel
            this.ui.value.fadeOut(function() {
                // slideDown edit panel
                self.ui.editor.slideDown();
            });
        },

        /*
            Switch sl-editor from edit-mode to view-mode
        */
        switchToValue: function() {

            var self = this;

            // stop execution if mouse still above this item
            // or item's editor has error
            if (this.focus || this.err) return;

            // attach popover for remove button in edit panel
            this._appendInfoOnRemoveBtn();

            // slide up the edit panel
            this.ui.editor.slideUp(function() {
                // fadeIn view panel
                self.ui.value.fadeIn();
            });
        },

        /*
            Set up a flag indicate mouse on
        */
        setFocusIn: function() {
            this.$el.css('cursor', 'pointer');
            this.$el.find('.sl-value').css('border', '1px solid #e3e3e3').addClass('sl-panel');
            this.focus = true;
        },

        /*
            Clear the flag when mouse out
        */
        setFocusOut: function() {
            this.$el.find('.sl-value').css('border', '1px none #e3e3e3').removeClass('sl-panel');
            this.focus = false;
        },

        /*========================= remove button part =================================*/
        /*
            Remove item 
            SubClass should override this method to define how to remove item.
        */
        removeItem: function(silence) {

            var self = this;

            vent.trigger('resume:itemRemoved', {
                item: this.item,
                itemName: this.itemName,
                itemIcon: this.itemIcon
            });

            if (silence) return;

            var data = this.model.get('setting');
            data[this.item] = false;

            // save the model
            this.model.save({
                setting: data
            }, {

                // if save success
                success: function() {
                    // slide up editor
                    self.$el.slideUp(function() {
                        // dispose the view
                        self.close();
                    });
                },
                // use patch
                patch: true
            });
        },

        /*========================= delete button part =================================*/
        /*
            Show a confirm dialog when user click delete button
        */
        deleteConfirm: function() {
            // append confirm dialog on delete buttom
            this._appendConfOnDeleteBtn();
            // show it up 
            this.ui.deleteBtn.popover('show');
        },

        /*
            Delete item when user click OK
            SubClass should override this method to define how to delete item.
        */
        deleteItem: function() {},

        /*
            Do nothing but switch helper info when user click NO
        */
        deleteCancel: function() {
            // append normal info helper on delete button
            this._appendInfoOnDeleteBtn();
        },

        /*
            Display error info for editor
        */
        showError: function(errors) {

            var self = this;

            // clear previous errors
            this.clearError();

            // setup error flag
            this.err = true;

            _.each(errors, function(error) {
                // highlight the input
                error.target.closest('.sl-input').addClass('control-group error');
                // attach popover for specified control
                self._appendErrOn(error.target, {
                    title: error.title,
                    content: error.message
                });
            });
        },

        /*
            Clear error flag and style
        */
        clearError: function() {
            // clear error flag
            this.err = false;
            // clear error style on the input
            this.$el.find('.sl-input').removeClass('control-group error');
        },

        /*
            template helper function
        */
        templateHelpers: function() {
            return {
                simpleFormatDate: this._simpleFormatDate,
                formatDate: this._formatDate
            }
        },

        /*
            Generic function for append popover on specific element
        */
        _appendInfoOn: function(target, options) {

            // do nothing if target is not exists
            if (!target) return;
            console.log(target);
            // destroy previous popover
            target.popover('destroy');

            // default option
            var defaultOpt = {
                placement: 'right',
                trigger: 'hover',
                html: true
            };

            // attach a new popover 
            target.popover(_.extend(defaultOpt, options));
        },

        /**/
        _appendErrOn: function(target, options) {

            if (options.title)
                options.title = '<div class="text-error">「' + options.title + '」は不正です</div>';

            if (options.content)
                options.content += '<br/><small class="text-error">この項目は保存されていません。</small>';

            this._appendInfoOn(target, options);
        },

        /**/
        _appendInfoOnRemoveBtn: function() {

            this._appendInfoOn(this.ui.removeBtn, {
                title: "「" + this.itemName + "」を非表示にします",
                content: "「" + this.itemName + "」を履歴書から取り除きます。"
            });
        },

        /**/
        _appendInfoOnDeleteBtn: function() {

            this._appendInfoOn(this.ui.deleteBtn, {
                title: "「" + this.itemName + "」を削除します",
                content: "「" + this.itemName + "」を削除します。"
            });
        },

        /**/
        _appendConfOnDeleteBtn: function() {

            this._appendInfoOn(this.ui.deleteBtn, {
                title: "「" + this.itemName + "」を削除しますか？",
                content: 'ご入力した内容が無くなりますので、ご注意ください。<br>\
                        <button class="btn btn-small btn-danger btn-confirm">はい</button>  \
                        <button class="btn btn-small btn-warning btn-cancel">いいえ</button>',
                trigger: 'click'
            });
        },

        _appendDatePicker: function(traget, options) {

            var self = this;

            // default option
            var defaultOpt = {
                format: 'yyyy/mm/dd',
                language: 'ja',
                startView: 2,
                forceParse: false,
                todayHighlight: true
            };

            traget.datepicker(_.extend(defaultOpt, options))
                .on('changeDate', function(e) {
                traget.datepicker('hide');
            });
        },

        _simpleFormatDate: function(date) {

            if (!date) return;

            if (typeof date !== "object")
                date = new Date(date);

            var curr_date = date.getDate();
            var curr_month = date.getMonth() + 1;
            var curr_year = date.getFullYear();
            return curr_year + "/" + curr_month + "/" + curr_date;
        },

        _formatDate: function(date) {

            if (!date) return;

            if (typeof date !== "object")
                date = new Date(date);

            var curr_date = date.getDate();
            var curr_month = date.getMonth() + 1;
            var curr_year = date.getFullYear();
            return curr_year + "年" + curr_month + "月" + curr_date + "日";
        }
    });

    return BaseItem;
});