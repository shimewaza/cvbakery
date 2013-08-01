var util = require('util');
var Account = require('../models/account.js');
var Resume = require('../models/resume/resume.js');

exports.index = function(req, res) {

};

exports.new = function(req, res) {

};

exports.show = function(req, res) {

};

exports.create = function(req, res) {

};

exports.edit = function(req, res) {

};

exports.update = function() {

};

exports.destroy = function() {

};

exports.login = function(req, res) {

	Account.findOne({
		email: req.body.email,
		password: req.body.password
	}, function(err, account) {

		if (err) res.status(500).send("大変申し訳ございませんが、サーバエラーが発生しました。しばらくお待ちいただいて、再度お試してください。");
		else if (!account) res.status(401).send("認証エラー、ユーザIDとパスワードをお確かめてください。");

		if (account) {
			req.session.account = account;
			res.json({
				messages: "welcome"
			});
		}
	});
};

exports.logout = function(req, res) {
	req.session.destroy();
	res.json({
		messages: "good bye"
	});
};

exports.retrivepass = function(req, res) {

	Account.findOne({
		email: req.body.email
	}, function(err, account) {

		if (err) res.status(500).send("大変申し訳ございませんが、サーバエラーが発生しました。しばらくお待ちいただいて、再度お試してください。");
		else if (!account) res.status(424).send("申し訳ございませんが、該当メールアドレスは登録していません。");
		if (account) {
			res.json({
				message: "メール送信しました、メールボックスをご確認ください。"
			});
		}
	});
};