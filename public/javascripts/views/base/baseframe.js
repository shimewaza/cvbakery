define([], function() {

	var BaseFrame = Backbone.View.extend({

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

		genericSubscriptions: {
			'user:login' : 'onLogin',
			'user:logout' : 'onLogout'
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
		}

	});

	return BaseFrame;
});