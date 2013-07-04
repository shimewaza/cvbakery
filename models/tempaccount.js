var mongoose = require('mongoose');
var metadata = require('./metadata');
var Schema = mongoose.Schema;

var TempAccount = new Schema({
    // Account (user email)
    accountId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    // Password
    password: {
        type: String,
        trim: true,
        required: true,
        match:/^.{8,}$/
    },
    // User Type
    userType: {
        type: String,
        trim: true,
        required: true,
        default: 'Engineer',
        enum: metadata.userType_option
    },
    // Create Date
    createDate: {
        type: Date,
        default: Date.now,
        expires: 60
    }
});

module.exports = mongoose.model('TempAccount', TempAccount);