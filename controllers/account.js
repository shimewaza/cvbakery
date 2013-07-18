var util = require('util');
var Account = require('../models/account.js');
var Resume = require('../models/resume/resume.js');

var personMenu = [{
	icon: 'icon-home',
	name: 'Home',
	url: '/#home'
}, {
	icon: 'icon-user',
	name: '私の履歴書',
	url: '/#resume'
}/*, {
	icon: 'icon-search',
	name: '仕事探し',
	url: '/link3'
}, {
	icon: 'icon-envelope',
	name: 'メッセージセンター',
	url: '/link4'
}, {
	icon: 'icon-wrench',
	name: 'アカウント管理',
	url: '/link5'
}, */];

exports.index = function(req, res) {

};

exports.new = function(req, res) {

	console.log(util.inspect(req.session));
	res.render('account/new', {
		title: "create new account"
	});
};

exports.show = function(req, res) {

};

exports.create = function(req, res) {

	var accountObj = new Account(req.body, false);
	var resumeObj = new Resume();

	accountObj.userType = "Person";
	accountObj.profileId = resumeObj._id;

	accountObj.save(function(err, data) {

		if (err) {
			if (err.code == 11000) res.status(424).send("該当ユーザIDが既に取られましたので、他のIDで登録してください。");
			else res.status(500).send("server error");
		} else {
			resumeObj.save();
			res.json({
				message: "ご登録ありがとうございます、ログイン画面からお入りください。"
			});
		}
	});
};

exports.edit = function(req, res) {

};

exports.update = function() {

};

exports.destroy = function() {

};

exports.login = function(req, res) {

	Account.findOne({
		accountId: req.body.username,
		password: req.body.password
	}, function(err, account) {

		if (err) res.status(500).send("大変申し訳ございませんが、サーバエラーが発生しました。しばらくお待ちいただいて、再度お試してください。");
		else if (!account) res.status(401).send("認証エラー、ユーザIDとパスワードをお確かめてください。");

		if (account) {
			req.session.accountId = account._id;
			req.session.accountInfo = {
				userInfo: account,
				menu: personMenu
			};
			res.json(req.session.accountInfo);
		}
	});
};

exports.logout = function(req, res) {
	req.session.destroy();
	res.json({
		messages: "good bye"
	});
};