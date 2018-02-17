var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
autoIncrement.initialize(db);

var userSchema = new Schema({

    //xtasyid : { type: String , default: "unassigned"},
    name : { type : String , required : true},
    emailid : { type : String , unique : true , required : true},
    password : { type : String , required : true},
    college : { type : String , required : true},
    contact : { type : String , required : true},
    gender : { type : String , required : true},
    accomodation: {type : String, required: true, enum: [ "yes", "no" ], default: "no" },
    isVerified : { type: Boolean, default: false }
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
