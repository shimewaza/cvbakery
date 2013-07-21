var moment = require('moment');
var markdown = require('markdown').markdown;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

moment.lang('ja');

var WorkExperience = new Schema({
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	},
	title: {
		type: String,
		trim: true
	},
	position: {
		type: String,
		trim: true
	},
	detail: {
		type: String,
		trim: true
	}
});

WorkExperience.virtual('startDateStr').get(function() {
	if (this.startDate)
		return moment(new Date(this.startDate)).format('LL');
	else
		return "";
});

WorkExperience.virtual('endDateStr').get(function() {
	if (this.endDate)
		return moment(new Date(this.endDate)).format('LL');
	else
		return "";
});

WorkExperience.virtual('detailStr').get(function() {
	return markdown.toHTML(this.detail);
});

module.exports = WorkExperience;