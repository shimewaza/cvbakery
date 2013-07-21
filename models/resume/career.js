var moment = require('moment');
var markdown = require('markdown').markdown;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

moment.lang('ja');

var Career = new Schema({
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	},
	company: {
		type: String,
		trim: true
	},
	address: {
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

Career.virtual('startDateStr').get(function() {
	if (this.startDate)
		return moment(new Date(this.startDate)).format('LL');
	else
		return "";
});

Career.virtual('endDateStr').get(function() {
	if (this.endDate)
		return moment(new Date(this.endDate)).format('LL');
	else
		return "";
});

Career.virtual('detailStr').get(function() {
	return markdown.toHTML(this.detail);
});

module.exports = Career;