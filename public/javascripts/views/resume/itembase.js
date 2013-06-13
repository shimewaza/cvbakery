define([], function() {

    var BaseItem = Backbone.Marionette.ItemView.extend({

        commonEvents: {
            // Switch to edit-mode when the div was clicked
            'click': 'switchToEditor',

            // Set this editor lost foucs when mouseout
            'mouseout': 'setFocusOut',

            // Set this editor gain foucs when mouseover
            'mouseover': 'setFocusIn',

            // Popup the confirm dialog when remove button clicked
            'click .btn-remove': 'removeConfirm',

            // Remove editor when OK button clicked
            'click .btn-confirm': 'removeItem',

            // Close the confirm dialog when cancel button clicked
            'click .btn-cancel': 'removeCancel'
        },

        /*Switch sl-editor from view-mode to edit-mode*/
        switchToEditor: function() {

            var self = this;

            // fadeOut view panel
            this.ui.value.fadeOut(function() {
                // slideDown edit panel
                self.ui.editor.slideDown();
            });
        },

        /*Switch sl-editor from edit-mode to view-mode*/
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

        /*Set up a flag indicate mouse on*/
        setFocusIn: function() {
            this.$el.css('cursor', 'pointer');
            this.focus = true;
        },

        /*Clear the flag when mouse out*/
        setFocusOut: function() {
            this.focus = false;
        },

        /*Show a confirm dialog when user click remove button*/
        removeConfirm: function() {
            // append confirm dialog on remove buttom
            this._appendConfOnRemoveBtn();
            // show it up 
            this.ui.removeBtn.popover('show');
        },

        /*Remove item when user click OK*/
        removeItem: function() {

            var self = this;

            // set the value to null (this feel unright)
            // this.model.set(this.item, null);

            // prepare the date for model update
            var data = {};
            data[this.item] = null;

            // save model
            this.model.save(data, {
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

        /*Do nothing but switch helper info when user click NO*/
        removeCancel: function() {
            // append normal info helper on remove button
            this._appendInfoOnRemoveBtn();
        },

        /*Display error info for editor*/
        showError: function(errors) {

            var self = this;

            // setup error flag
            this.err = true;

            _.each(errors, function(error) {
                // highlight the input
                error.target.closest('.sl-input').addClass('control-group error');
                // attach popover for specified control
                self._appendErrOn(error.target, {
                    content: error.message
                });
            });
        },

        clearError: function() {
            // clear error flag
            this.err = false;
            // clear error style on the input
            this.$el.find('.sl-input').removeClass('control-group error');
        },

        templateHelpers: function() {
            return {
                simpleFormatDate: this._simpleFormatDate,
                formatDate: this._formatDate
            }
        },

        /**/
        _appendInfoOn: function(target, options) {

            // do nothing if target is not exists
            if (!target) return;

            // destroy previous popover
            target.popover('destroy');

            // default option
            var defaultOpt = {
                title: this.itemName,
                content: this.itemHelp,
                placement: 'right',
                trigger: 'hover',
                html: true
            };

            // attach a new popover 
            target.popover(_.extend(defaultOpt, options));
        },

        /**/
        _appendErrOn: function(target, options) {

            // do nothing if target is not exists
            if (!target) return;

            // destroy previous popover
            target.popover('destroy');

            // default option
            var defaultOpt = {
                html: true,
                title: '<div class="text-error">「' + this.itemName + '」は不正です</div>',
                content: '<br/><small class="text-error">この項目は保存されていません。</small>',
                trigger: 'hover',
                placement: 'right'
            }

            // attach a new popover 
            target.popover(_.extend(defaultOpt, options));
        },

        /**/
        _appendInfoOnRemoveBtn: function() {

            if (!this.ui.removeBtn) return;

            // Destroy previous popover
            this.ui.removeBtn.popover('destroy');

            // Attach a new popover 
            this.ui.removeBtn.popover({
                title: "「" + this.itemName + "」を非表示にします",
                content: "「" + this.itemName + "」を履歴書から取り除きます。",
                trigger: 'hover',
                placement: 'right'
            });
        },

        /**/
        _appendConfOnRemoveBtn: function() {

            // Destroy previous popover
            this.ui.removeBtn.popover('destroy');

            // Attach a new popover 
            this.ui.removeBtn.popover({
                html: true,
                title: "本当ですか？",
                content: '<button class="btn btn-small btn-danger btn-confirm">はい</button>  <button class="btn btn-small btn-warning btn-cancel">いいえ</button>',
                placement: 'right'
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

            if (!date || typeof date !== "object")
                date = new Date(date);

            var curr_date = date.getDate();
            var curr_month = date.getMonth() + 1;
            var curr_year = date.getFullYear();
            return curr_year + "/" + curr_month + "/" + curr_date;
        },


        _formatDate: function(date) {

            if (!date || typeof date !== "object")
                date = new Date(date);

            var curr_date = date.getDate();
            var curr_month = date.getMonth() + 1;
            var curr_year = date.getFullYear();
            return curr_year + "年" + curr_month + "月" + curr_date + "日";
        }
    });

    return BaseItem;
});