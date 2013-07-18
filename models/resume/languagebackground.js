var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

moment.lang('ja');

var LanguageBackground = new Schema({
	language: {
		type: String,
		trim: true
	},
	level: {
		type: Number,
		min: 0,
		max: 100
	}
});

LanguageBackground.virtual('barStyle').get(function() {

	var barStyle = '';

	if (this.level >= 85)
		barStyle = 'progress-success';
	else if (this.level >= 55)
		barStyle = 'progress-info';
	else if (this.level >= 25)
		barStyle = 'progress-warning';
	else
		barStyle = 'progress-danger';

	return barStyle;
});

module.exports = LanguageBackground;