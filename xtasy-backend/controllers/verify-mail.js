const mongoose = require('mongoose');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');


var verifyMail = function(req,res) {
    bcrypt.compare(req.query.email,req.query.code,function(err,isMatch) {
      if(err) throw err;
      if(isMatch) {
        UserModel.findOneAndUpdate({emailid : req.query.email} , {$set : {isVerified : true}}, function(err,doc) {
          if(err) throw err;
          if(!doc) res.redirect("/login?action=2") // res.send("invalid mail");
          else res.redirect("/login?action=1")
        } );

      }
      else res.redirect("/login?action=3");
    });
  }







module.exports = { "verifyMail": verifyMail };
