var Mailer = require('../components/mailer.js');
var Account = require('../models/account.js');
var TempAccount = require('../models/tempaccount.js');

exports.index = function(req, res) {

};

exports.new = function(req, res) {

};

exports.show = function(req, res) {

};

exports.create = function(req, res) {

    // validate request parameter

    // create temporary account for a new registered user
    var tempAccountObj = new TempAccount(req.body, false);

    // try to find a account by the user applicated account ID
    Account.findOne({
        accountId: req.body.accountId
    }, function(err, account) {

        // handle error
        if (err) {
            res.status(500).send("server error");
        }
        // if a existed account are found, require another ID
        else if (account) {
            console.log(account);
            res.status(424).send("該当ユーザIDが既に取られましたので、他のIDで登録してください。");
        }
        // for valid account ID
        else {
            console.log(req.body);
            // save temp account object
            tempAccountObj.save(function(err) {
                // handle error
                if (err) res.status(500).send(err);
                else {
                    // send authorize mail
                    Mailer.sendAccountActiveMail();
                    // send success message
                    res.json({
                        message: "ご登録ありがとうございます、ログイン画面からお入りください。"
                    });
                }
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