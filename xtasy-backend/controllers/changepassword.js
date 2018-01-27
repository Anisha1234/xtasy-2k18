const mongoose = require('mongoose');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

var changePassword = function (req,res) {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        UserModel.findOneAndUpdate({emailid : req.body.emailid} , {$set : {password : hash}}, function(err,doc) {
          if(err) throw err;
          console.log(hash)
          //if(!doc) res.redirect("/login?action=2") // res.send("invalid mail");
          //else res.redirect("/login?action=1")
          res.json({"msg" : "successful"})
        } );

      })
  })
};

module.exports = { "changePassword" : changePassword }
