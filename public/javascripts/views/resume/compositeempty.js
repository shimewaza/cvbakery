define([], function() {

    var EmptyView = Backbone.Marionette.ItemView.extend({
        template: '<i class="sl-placeholder">Click to edit</i>'
    });

    return EmptyView;
});