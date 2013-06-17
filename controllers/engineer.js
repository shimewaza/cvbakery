var util = require('util');

// エンジニア
var Engineer = require('../models/engineer.js');

// インデックス
exports.index = function(req, res) {

	Engineer.find({}, function(err, docs) {
		res.render('engineer/index', {
			docs: docs,
			title: "index",
			user: req.session.user
		});
	});
};

// 作成フォーム
// exports.new = function(req, res) {
// 	res.render('engineer/new', {
// 		title: "new"
// 	});
// };

// 取得
exports.show = function(req, res) {

	Engineer.findOne({
		_id: req.params.id
	}, function(err, profile) {
		if (err) res.send("error happend: " + err);
		console.log(profile);
		if (profile) res.json(profile);
	});
};

// 作成
exports.create = function(req, res) {

	var engineer = {};

	for (var prop in req.body) {
		engineer[prop] = req.body[prop];
	}

	var engineerObj = new Engineer(engineer);

	engineerObj.save(function(err, data) {

		if (err) {
			console.log(util.inspect(err));
			res.render('engineer/new', {
				title: "new",
				err: err
			});
		} else {
			console.log(data);
			Engineer.find({}, function(err, docs) {
				res.render('engineer/index', {
					docs: docs,
					title: "index"
				});
			});
		}
	});
};

// 編集フォーム
// exports.edit = function(req, res) {
// 	Engineer.findById(req.params.id, function(err, profile) {

// 		if (err) res.send("error happend: " + err);

// 		if (profile) res.render('engineer/edit', {
// 			profile: profile,
// 			title: "edit"
// 		});
// 	});
// };

// 編集
exports.update = function(req, res) {

	delete req.body._id;
	console.log(req.body);
	console.log(req.files);

	if(req.files && req.files.photo) {
		var photoPath = req.files.photo.path;
		req.body.photo = photoPath.substring(photoPath.lastIndexOf("\\"));
	}

	Engineer.findByIdAndUpdate(req.params.id, req.body, function(err, newProfile) {

		if (err) res.status(500).send("error happend: " + err);
		else res.send(newProfile);
	})
};

// 削除
exports.destroy = function(req, res) {

};