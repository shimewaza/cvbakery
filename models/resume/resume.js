var moment = require('moment');
var mongoose = require('mongoose');
var metadata = require('../metadata');
var Schema = mongoose.Schema;

// Sub documents
var Skill = require('./skill');
var Career = require('./career');
var Education = require('./education');
var Qualification = require('./qualification');
var WorkExperience = require('./workexperience');
var LanguageBackground = require('./languagebackground');

moment.lang('ja');

var Resume = new Schema({

	// First Name
	firstName: {
		type: String,
		trim: true
	},
	// Last Name
	lastName: {
		type: String,
		trim: true
	},
	// First Name in English
	firstNameEn: {
		type: String,
		trim: true
	},
	// Last Name in English
	lastNameEn: {
		type: String,
		trim: true
	},
	// First Name in Japanese
	firstNameKana: {
		type: String,
		trim: true
	},
	// Last Name in Japanese
	lastNameKana: {
		type: String,
		trim: true
	},
	// Photo
	photo: {
		type: String,
		trim: true
	},
	// Birth Day
	birthDay: {
		type: Date
	},
	// Gender
	gender: {
		type: String,
		trim: true,
		enum: metadata.gender_option
	},
	// Nationality
	nationality: {
		type: String,
		trim: true,
		enum: metadata.nationality_option
	},
	// Marriage
	married: {
		type: String,
		trim: true,
		enum: metadata.married_option
	},
	// First time arrive this country
	firstArrive: {
		type: Date
	},
	// IT Experience (In Year)
	itExperience: {
		type: Number,
		min: 0,
		max: 99
	},
	// Nearest Station
	nearestStation: {
		type: String,
		trim: true
	},
	// Availability
	availableDate: {
		type: Date
	},
	// Tel No
	telNo: {
		type: String,
		trim: true,
		match: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/
	},
	// E-mail
	email: {
		type: String,
		trim: true
	},
	// Home Page
	homePage: {
		type: String,
		trim: true
	},
	// Zip Code
	zipCode: {
		type: String,
		trim: true,
		match: /^[0-9]{7}$/
	},
	// Address
	address: {
		type: String,
		trim: true
	},
	// 希望給与下限
	salaryTop: {
		type: Number,
		min: 0
	},
	// 希望給与上限
	salaryBottom: {
		type: Number,
		min: 0
	},
	// Self Introduction
	selfIntroduction: {
		type: String,
		trim: true
	},
	// Language Background
	languageBackground: [LanguageBackground],
	// Education
	education: [Education],
	// Career
	career: [Career],
	// Work Experience
	workExperience: [WorkExperience],
	// Qualification
	qualification: [Qualification],
	// Skill
	skill: [Skill],
	// BackGround Image
	backgroundImg: {
		type: String,
		trim: true
	},
	// Resume Template
	template: {
		type: String,
		trim: true
	},
	// Item open flag
	setting: {
		name: {
			type: Boolean,
			default: true
		},
		photo: {
			type: Boolean,
			default: true
		},
		birthDay: {
			type: Boolean,
			default: true
		},
		gender: {
			type: Boolean,
			default: true
		},
		nationality: {
			type: Boolean,
			default: false
		},
		married: {
			type: Boolean,
			default: false
		},
		firstArrive: {
			type: Boolean,
			default: false
		},
		itExperience: {
			type: Boolean,
			default: false
		},
		nearestStation: {
			type: Boolean,
			default: true
		},
		availableDate: {
			type: Boolean,
			default: false
		},
		telNo: {
			type: Boolean,
			default: true
		},
		email: {
			type: Boolean,
			default: true
		},
		homePage: {
			type: Boolean,
			default: true
		},
		address: {
			type: Boolean,
			default: true
		},
		selfIntroduction: {
			type: Boolean,
			default: true
		},
		languageBackground: {
			type: Boolean,
			default: false
		},
		education: {
			type: Boolean,
			default: true
		},
		career: {
			type: Boolean,
			default: true
		},
		workExperience: {
			type: Boolean,
			default: true
		},
		qualification: {
			type: Boolean,
			default: true
		},
		skill: {
			type: Boolean,
			default: true
		},
		// Flag of frist visit
		isFirstVisit: {
			type: Boolean,
			default: true
		},
	},
	// Logical Delete flag
	logicDelete: {
		type: Boolean,
		default: false
	},
	// Create Date
	createDate: {
		type: Date,
		default: Date.now
	},
	// Creator
	createUser: {
		type: String,
		trim: true
	},
	// Modify Date
	updateDate: {
		type: Date,
		default: Date.now
	},
	// Modifier
	updateUser: {
		type: String,
		trim: true
	}
});

Resume.virtual('birthDayStr').get(function() {
	return moment(new Date(this.birthDay)).format('LL');
});

Resume.virtual('firstArriveStr').get(function() {
	return moment(new Date(this.firstArrive)).format('LL');
});

Resume.virtual('availableDateStr').get(function() {
	return moment(new Date(this.availableDate)).format('LL');
});

Resume.virtual('availableDateStr').get(function() {
	return moment(new Date(this.availableDate)).format('LL');
});

Resume.virtual('itExperienceStr').get(function() {
	if (this.itExperience)
		return this.itExperience + '年';
	else
		return "";
});

Resume.virtual('addressStr').get(function() {
	if (this.zipCode)
		return '〒' + this.zipCode + '）' + this.address;
	else
		return this.address;
});

module.exports = mongoose.model('Resume', Resume);