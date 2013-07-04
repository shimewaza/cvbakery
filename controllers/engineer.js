var util = require('util');
var PDFDocument = require('pdfkit');

// Definition of Engineer
var Engineer = require('../models/engineer.js');

var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '..', 'mailtemplates')
  , emailTemplates = require('email-templates')
  , nodemailer     = require('nodemailer');

// Index
exports.index = function(req, res) {

	Engineer.find({}, function(err, docs) {
		res.render('engineer/index', {
			docs: docs,
			title: "index",
			user: req.session.user
		});
	});
};

// Get single Engineer
exports.show = function(req, res) {

	Engineer.findOne({
		_id: req.params.id
	}, function(err, profile) {
		if (err) res.send("error happend: " + err);
		console.log(profile);
		if (profile) res.json(profile);
	});
};

// Create Engineer
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

// Edit Engineer
exports.update = function(req, res) {

	delete req.body._id;
	console.log(req.body);
	console.log(req.files);

	if (req.files && req.files.photo) {
		var photoPath = req.files.photo.path;
		req.body.photo = /.*[\/|\\](.*)$/.exec(photoPath)[1];
	}

	Engineer.findById(req.params.id, function(err, engineer) {
		if (err) res.status(500).send("error happend: " + err);
		else {
			for(var prop in req.body) {
				engineer[prop] = req.body[prop];
			}
			engineer.save(function(err, newProfile) {
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

// Delete Engineer
exports.destroy = function(req, res) {

};

// Export PDF
exports.pdf = function(req, res) {

	sendMail();

	if (req.params.id === 'me') {

		Engineer.findOne({
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

sendMail = function() {

	emailTemplates(templatesDir, function(err, template) {

	  if (err) {
	    console.log(err);
	  } else {

	    // ## Send a single email

	    // Prepare nodemailer transport object
	    var transport = nodemailer.createTransport("SMTP", {
	      // service: "Gmail",
	      port: 587,
	      auth: {
	        user: "administrator@selink.jp",
	        pass: "ZSkikuD2O5"
	      }
	    });

	    // An example users object with formatted email function
	    var locals = {
	      email: 'joe_19840729@hotmail.com',
	      name: {
	        first: 'Joe',
	        last: 'Hetfield'
	      }
	    };

	    // Send a single email
	    template('2col-1-2', locals, function(err, html, text) {
	      if (err) {
	        console.log(err);
	      } else {
	        transport.sendMail({
	          from: 'Spicy Meatball <spicy.meatball@spaghetti.com>',
	          to: locals.email,
	          subject: 'Mangia gli spaghetti con polpette!',
	          html: html,
	          // generateTextFromHTML: true,
	          text: text
	        }, function(err, responseStatus) {
	          if (err) {
	            console.log(err);
	          } else {
	            console.log(responseStatus.message);
	          }
	        });
	      }
	    });


	    // // ## Send a batch of emails and only load the template once

	    // // Prepare nodemailer transport object
	    // var transportBatch = nodemailer.createTransport("SMTP", {
	    //   service: "Gmail",
	    //   auth: {
	    //     user: "some-user@gmail.com",
	    //     pass: "some-password"
	    //   }
	    // });

	    // // An example users object
	    // var users = [
	    //   {
	    //     email: 'pappa.pizza@spaghetti.com',
	    //     name: {
	    //       first: 'Pappa',
	    //       last: 'Pizza'
	    //     }
	    //   },
	    //   {
	    //     email: 'mister.geppetto@spaghetti.com',
	    //     name: {
	    //       first: 'Mister',
	    //       last: 'Geppetto'
	    //     }
	    //   }
	    // ];

	    // // Custom function for sending emails outside the loop
	    // //
	    // // NOTE:
	    // //  We need to patch postmark.js module to support the API call
	    // //  that will let us send a batch of up to 500 messages at once.
	    // //  (e.g. <https://github.com/diy/trebuchet/blob/master/lib/index.js#L160>)
	    // var Render = function(locals) {
	    //   this.locals = locals;
	    //   this.send = function(err, html, text) {
	    //     if (err) {
	    //       console.log(err);
	    //     } else {
	    //       transportBatch.sendMail({
	    //         from: 'Spicy Meatball <spicy.meatball@spaghetti.com>',
	    //         to: locals.email,
	    //         subject: 'Mangia gli spaghetti con polpette!',
	    //         html: html,
	    //         // generateTextFromHTML: true,
	    //         text: text
	    //       }, function(err, responseStatus) {
	    //         if (err) {
	    //           console.log(err);
	    //         } else {
	    //           console.log(responseStatus.message);
	    //         }
	    //       });
	    //     }
	    //   };
	    //   this.batch = function(batch) {
	    //     batch(this.locals, templatesDir, this.send);
	    //   };
	    // };

	    // // Load the template and send the emails
	    // template('newsletter', true, function(err, batch) {
	    //   for(var user in users) {
	    //     var render = new Render(users[user]);
	    //     render.batch(batch);
	    //   }
	    // });

	  }
	});
}