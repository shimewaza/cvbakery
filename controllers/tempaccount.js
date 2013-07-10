var Mailer = require('../components/mailer.js');
var Account = require('../models/account.js');
var Resume = require('../models/resume.js');
var TempAccount = require('../models/tempaccount.js');

var personMenu = [{
    icon: 'icon-home',
    name: 'Home',
    url: '/#home'
}, {
    icon: 'icon-user',
    name: '私の履歴書',
    url: '/#resume'
}];

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

    var accountId = req.body.accountId;

    // try to find a account by the user applicated account ID
    Account.findOne({
        accountId: accountId
    }, function(err, account) {

        // handle error
        if (err) {
            res.status(500).send("server error");
        }
        // if a existed account are found, require another ID
        else if (account) {
            res.status(424).send("該当ユーザIDが既に取られましたので、他のIDで登録してください。");
        }
        // for valid account ID
        else {
            // save temp account object
            tempAccountObj.save(function(err) {
                // handle error
                if (err) {
                    if (err.code == 11000) res.status(424).send("該当メールアドレスが既に取られましたので、他のメールアドレスで登録してみてください。");
                    else res.status(500).send(err);
                } else {
                    // send account-activate mail
                    Mailer.sendAccountActiveMail({
                        id: tempAccountObj._id,
                        email: accountId
                    });

                    console.log("http://localhost:3000/activate/" + tempAccountObj._id);

                    // send success message
                    res.json({
                        message: "ご登録ありがとうございます！認証用メールを送りしました、メールボックスにご確認ください。"
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

/*
    Activate temporary account
*/
exports.activate = function(req, res) {

    // find account by id in TempAccount collection
    TempAccount.findOne({
        _id: req.params.id
    }, function(err, tempAccount) {

        // handle error
        if (err) {
            res.status(500).send("server error");
        }
        // if the target account not exists
        else if (!tempAccount) {
            res.status(424).send("大変申し訳ございませんが、ご登録情報が見つかりませんでした。");
        }
        // if the target account was found
        else {

            // create resume object for this account
            var resumeObj = new Resume();

            // create real account object and connect it to resume
            var accountObj = new Account({
                accountId: tempAccount.accountId,
                password: tempAccount.password,
                userType: tempAccount.userType,
                profileId: resumeObj._id
            }, false);

            // save the new account
            accountObj.save(function(err, data) {

                // handle error
                if (err) {
                    if (err.code == 11000) res.status(424).send("該当ユーザIDが既に取られましたので、他のIDで登録してください。");
                    else res.status(500).send("server error");
                } else {

                    // save the resume object
                    resumeObj.save();

                    // remove the temporary account
                    tempAccount.remove();

                    // setup session for new account
                    req.session.accountId = accountObj._id;
                    req.session.accountInfo = {
                        userInfo: accountObj,
                        menu: personMenu
                    };

                    // redirect to home page
                    res.redirect('/');
                    // res.json({
                    //     message: "ご登録ありがとうございます、ログイン画面からお入りください。"
                    // });
                }
            });

        }
    })

};