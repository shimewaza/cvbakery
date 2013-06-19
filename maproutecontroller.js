exports.mapModelRoute = function(app, prefix) {

	prefix = '/' + prefix;

	var obj = require('./controllers/' + prefix);

	// インデックス
	app.get(prefix, obj.index);

	// 作成フォーム
	// app.get(prefix + '/new', obj.new);

	// 取得
	app.get(prefix + '/:id', obj.show);

	// 作成
	app.post(prefix + '/create', obj.create);

	// 編集フォーム
	// app.get(prefix + '/:id/edit', obj.edit);

	// 編集
	app.put(prefix + '/:id', obj.update);

	// patch
	app.patch(prefix + '/:id', obj.update);

	// 削除
	app.del(prefix + '/:id', obj.destroy);
};

exports.mapRoute = function(app) {

	var account = require('./controllers/account');
	var address = require('./controllers/address');
	var engineer = require('./controllers/engineer');

	app.post('/login', account.login);

	app.get('/logout', account.logout);

	app.get('/address/:zipCode', address.show);

	// pdf download
	app.get('/engineer/:id/pdf', engineer.pdf);

};