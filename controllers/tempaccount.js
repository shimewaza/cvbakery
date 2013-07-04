var util = require('util');
var Account = require('../models/account.js');
var TempAccount = require('../models/tempaccount.js');

exports.index = function(req, res) {

};

exports.new = function(req, res) {

};

exports.show = function(req, res) {

};

exports.create = function(req, res) {

    var tempAccountObj = new TempAccount(req.body, false);

    Account.findOne({
        accountId: req.body.accountId
    }, function(err, account) {
        if (err) {
            res.status(500).send("server error");
        } else if (account) {
            console.log(account);
            res.status(424).send("該当ユーザIDが既に取られましたので、他のIDで登録してください。");
        } else {
            console.log(req.body);
            tempAccountObj.save(function(err) {
                if (err) res.status(500).send(err);
                else res.json({
                        message: "ご登録ありがとうございます、ログイン画面からお入りください。"
                    });
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