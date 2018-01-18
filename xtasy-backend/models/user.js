var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    name : { type : String },
    emailid : { type : String },
    password : { type : String },
    college : { type : String },
    active: { type: Boolean, default: false }

});

var userModel = mongoose.model('user', userSchema );

module.exports = userModel;

module.exports.saveUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
