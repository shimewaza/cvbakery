var util = require('util');
var PDFDocument = require('pdfkit');

// Definition of Resume
var Resume = require('../models/resume.js');

// Index
exports.index = function(req, res) {

	Resume.find({}, function(err, docs) {
		res.render('resume/index', {
			docs: docs,
			title: "index",
			user: req.session.user
		});
	});
};

// Get single Resume
exports.show = function(req, res) {

	Resume.findOne({
		_id: req.params.id
	}, function(err, profile) {
		if (err) res.send("error happend: " + err);
		console.log(profile);
		if (profile) res.json(profile);
	});
};

// Create Resume
exports.create = function(req, res) {

	var resume = {};

	for (var prop in req.body) {
		resume[prop] = req.body[prop];
	}

	var resumeObj = new Resume(resume);

	resumeObj.save(function(err, data) {

		if (err) {
			console.log(util.inspect(err));
			res.render('resume/new', {
				title: "new",
				err: err
			});
		} else {
			console.log(data);
			Resume.find({}, function(err, docs) {
				res.render('resume/index', {
					docs: docs,
					title: "index"
				});
			});
		}
	});
};

// Edit Resume
exports.update = function(req, res) {

	delete req.body._id;
	console.log(req.body);
	console.log(req.files);

	if (req.files && req.files.photo) {
		var photoPath = req.files.photo.path;
		req.body.photo = /.*[\/|\\](.*)$/.exec(photoPath)[1];
	}

	Resume.findById(req.params.id, function(err, resume) {
		if (err) res.status(500).send("error happend: " + err);
		else {
			for(var prop in req.body) {
				resume[prop] = req.body[prop];
			}
			resume.save(function(err, newProfile) {
				if (err) res.status(400).send("error happend: " + err);
				else res.send(newProfile);
			});
		}
	});

	// Engineer.findByIdAndUpdate(req.params.id, req.body, function(err, newProfile) {

	// 	if (err) res.status(500).send("error happend: " + err);
	// 	else res.send(newProfile);
	// });
};

// Delete Resume
exports.destroy = function(req, res) {

};

// Export PDF
exports.pdf = function(req, res) {

	// sendMail();

	if (req.params.id === 'me') {

		Resume.findOne({
			_id: req.session.accountInfo.userInfo.profileId
		}, function(err, profile) {
			if (err) res.send("error happend: " + err);
			console.log(profile);
			var doc = createPDF(profile);

			doc.output(function(pdf) {
				res.cookie('fileDownload', true)
					.set({
					'Content-Length': pdf.length,
					'Content-Type': 'application/pdf',
					'Content-Disposition': 'attachment',
				})
					.end(pdf, 'binary');
			});
		});
	} else {

	}
};

exports.myresume = function(req, res) {

	Resume.findOne({
		_id: req.params.id
	}, function(err, profile) {
		if (err) res.send("error happend: " + err);
		console.log(profile);
		if (profile) {
			res.render('resume/style1', profile);
		}
	});
}

// Generate PDF
createPDF = function(profile) {

	var doc = new PDFDocument();

	console.log(profile.firstName + " " + profile.lastName);

	doc.info['Title'] = profile.firstName + " " + profile.lastName;
	doc.info['Author'] = "Joe Hetfield";
	doc.info['Subject'] = "Resume create test";
	doc.info['Keywords'] = "resume";
	doc.info['CreationDate'] = new Date;
	doc.info['ModDate'] = new Date

	doc.fillColor('black')
		.text(profile.firstName + " " + profile.lastName, {
		paragraphGap: 10,
		indent: 20,
		align: 'justify',
		columns: 2
	});

	return doc;
}
