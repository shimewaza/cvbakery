var moment = require('moment');
var markdown = require('markdown').markdown;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

moment.lang('ja');

var Qualification = new Schema({
	qualifiedDate: {
		type: Date
	},
	qualificationName: {
		type: String,
		trim: true
	},
	detail: {
		type: String,
		trim: true
	}
});

Qualification.virtual('qualifiedDateStr').get(function() {
	return moment(new Date(this.qualifiedDate)).format('LL');
});

Qualification.virtual('detailStr').get(function() {
	return markdown.toHTML(this.detail);
});

module.exports = Qualification;