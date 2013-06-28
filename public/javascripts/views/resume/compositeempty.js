define([], function() {

    var EmptyView = Backbone.Marionette.ItemView.extend({
        template: '<i class="sl-placeholder">クリックして編集.</i>'
    });

    return EmptyView;
});