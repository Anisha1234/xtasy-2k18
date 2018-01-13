var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    "name" : { type : String },
    "username" : { type : String },
    "password" : { type : String },
    "college" : { type : String }

});

var userModel = mongoose.model('user', userSchema );

module.exports = userModel;

