var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
autoIncrement.initialize(db);

var userSchema = new Schema({

    //xtasyid : { type: String , default: "unassigned"},
    name : { type : String },
    emailid : { type : String },
    password : { type : String },
    college : { type : String },
    isVerified: { type: Boolean, default: false }

});

userSchema.plugin(autoIncrement.plugin, {
  model: 'user',
  field: 'xtasyid',
  startAt: 1000,
  incrementBy: 1
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
