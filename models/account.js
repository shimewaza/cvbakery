var mongoose = require('mongoose');
var metadata = require('./metadata');
var Schema = mongoose.Schema;

var Account = new Schema({
	// Email
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	// Password
	password: {
		type: String,
		trim: true,
		required: true
	},
	// Account Type
	type: {
		type: String,
		trim: true,
		required: true,
		enum: metadata.userType_option
	},
	// Resume
	resume: {
		type: Schema.Types.ObjectId
	},
	// 最終登録日
	lastLoginDate: {
		type: Date,
		default: Date.now
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

module.exports = mongoose.model('Account', Account);