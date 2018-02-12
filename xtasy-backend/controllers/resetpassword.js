const mongoose = require('mongoose');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');


var verifyReset = function(req,res) {
  if(req.query.email && req.query.code)
  {
    bcrypt.compare(req.query.email,req.query.code,function(err,isMatch) {
      if(err) throw err;
      if(isMatch) {
        UserModel.findOne({emailid : req.query.email} , function(err,doc) {
          if(err) throw err;
          if(!doc) res.redirect("/login?action=2") // res.send("invalid mail");
          res.render("./pages/passwordreset" , {"mail" : doc.emailid})
      //    else res.redirect("/login?action=1")
        } );

      }
      else res.redirect("/login?action=3");
    });
  }
  else res.redirect("/")
}

module.exports = { "verifyReset": verifyReset };
