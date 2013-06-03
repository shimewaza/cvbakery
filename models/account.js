var mongoose = require('mongoose');
var metadata = require('./metadata');
var Schema = mongoose.Schema;

var Account = new Schema({
	// ユーザ名
	userName: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	// パスワード
	passWord: {
		type: String,
		trim: true,
		required: true
	},
	// ユーザタイプ
	userType: {
		type: String,
		trim: true,
		required: true,
		enum: metadata.userType_option
	},
	profileId: {
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