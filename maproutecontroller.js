exports.mapModelRoute = function(app, prefix) {

	prefix = '/' + prefix;

	var obj = require('./controllers/' + prefix);

	// Index
	app.get(prefix, obj.index);

	// Get
	app.get(prefix + '/:id', obj.show);

	// Create
	app.post(prefix + '/create', obj.create);

	// Update
	app.put(prefix + '/:id', obj.update);

	// Patch
	app.patch(prefix + '/:id', obj.update);

	// Delete
	app.del(prefix + '/:id', obj.destroy);
};

exports.mapRoute = function(app) {

	var account = require('./controllers/account');
	var address = require('./controllers/address');
	var resume = require('./controllers/resume');

	// Login
	app.post('/login', account.login);

	// Logout
	app.get('/logout', account.logout);

	// Address query
	app.get('/address/:zipCode', address.show);

	// PDF download
	app.get('/resume/:id/pdf', resume.pdf);

};