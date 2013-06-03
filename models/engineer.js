var mongoose = require('mongoose');
var metadata = require('./metadata');
var Schema = mongoose.Schema;

var Engineer = new Schema({

	// 姓
	firstName: {
		type: String,
		trim: true
	},
	// 名
	lastName: {
		type: String,
		trim: true
	},
	// 姓（英字）
	firstNameEn: {
		type: String,
		trim: true
	},
	// 名（英字）
	lastNameEn: {
		type: String,
		trim: true
	},
	// 姓（フリガナ）
	firstNameKana: {
		type: String,
		trim: true
	},
	// 名（フリガナ）
	lastNameKana: {
		type: String,
		trim: true
	},
	// 生年月日
	birthDay: {
		type: Date
	},
	// 性別
	gender: {
		type: String,
		trim: true,
		enum: metadata.gender_option
	},
	// 国籍
	nationality: {
		type: String,
		trim: true,
		enum: metadata.nationality_option
	},
	// 婚姻状況
	married: {
		type: String,
		trim: true,
		enum: metadata.married_option
	},
	// 初回来日
	firstArrive: {
		type: Date
	},
	// IT経験年数
	itExperience: {
		type: Number,
		min: 0,
		max: 99
	},
	// 最寄り駅
	nearestStation: {
		type: String,
		trim: true
	},
	// 稼働可能日
	dateOfAvailable: {
		type: Date
	},
	// 電話番号
	telNo: {
		type: [String]
	},
	// E-mail
	email: {
		type: [String]
	},
	// ホームページ
	homePage: {
		type: String,
		trim: true
	},
	// 郵便番号
	zipCode: {
		type: String,
		trim: true,
		match: /^[0-9]{3}-[0-9]{4}$/
	},
	// 住所
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
	// 自己紹介
	selfIntroduction: {
		type: String,
		trim: true
	},
	// 言語背景
	languageBackground: [{
		language: {
			type: String,
			trim: true
		},
		background: {
			type: String,
			trim: true
		}
	}],
	// スキル補足
	skillRemark: {
		type: String,
		trim: true
	},
	// 公開フラグ
	publish: {
		type: Boolean,
		default: true
	},
	// 論理削除フラグ
	logicDelete: {
		type: Boolean,
		default: false
	},
	// 作成日
	createDate: {
		type: Date,
		default: Date.now
	},
	// 作成者
	createUser: {
		type: String,
		trim: true
	},
	// 更新日
	updateDate: {
		type: Date,
		default: Date.now
	},
	// 更新者
	updateUser: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('Engineer', Engineer);