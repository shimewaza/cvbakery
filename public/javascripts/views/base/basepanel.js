define([], function() {

	var BasePanel = Backbone.View.extend({

		buffer: [],

		add: function(fn) {

			var buffer = this.buffer;

			buffer.push(fn);

			if (buffer.length == 1) fn(next);

			function next() {
				buffer.shift();
				if (buffer.length) buffer[0](next);
			}
		},

		genericEvents: {
			'mouseover': 'onHover',
			'mouseout': 'onBlur'
		},

		genericSubscribes: {
			'user:login': 'onLogin',
			'user:logout': 'onLogout'
		},

		subscriptions: [],

		initialize: function() {
			this.subscribe('user:login', this.onLogin, {}, this);
			this.subscribe('user:logout', this.onLogout, {}, this);
		},

		onLogin: function() {

		},

		onLogout: function() {

		},

		onBlur: function() {

		},

		onHover: function() {

		},

		dispose: function() {
			this.off();
			this.remove();
		},

		subscribe: function(channel, callback, options, context) {
			// var sub = mediator.subscribe(channel, callback, options, context);
			this.subscriptions.push(sub);
		}

	});

	return BasePanel;
});