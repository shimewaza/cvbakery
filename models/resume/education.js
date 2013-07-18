var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

moment.lang('ja');

var Education = new Schema({
	graduate: {
		type: Date
	},
	school: {
		type: String,
		trim: true
	},
	major: {
		type: String,
		trim: true
	},
	detail: {
		type: String,
		trim: true
	}
});

Education.virtual('graduateStr').get(function() {
	return moment(new Date(this.graduate)).format('LL');
});

module.exports = Education;