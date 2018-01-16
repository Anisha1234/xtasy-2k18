var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var UserModel = require('../models/user');

var userAuthenticate = function(req,res) {
    UserModel.findOne({"emailid" : req.body.emailid} , function(err,doc) {
      console.log(doc);
      if(err) throw err;
      if(doc){
        bcrypt.compare(req.body.password,doc.password,function(err,isMatch) {
          if(err) throw err;
          if(isMatch){
            var details = {
              "name" : doc.name,
              "emailid" : doc.emailid,
              "college" : doc.college
            };
            res.json(details);
          } else {
            res.json({msg:"Invalid Password, Enter again"});
          }
        });
      } else {
        res.json({msg:"Incorrect emailid"});
      }
    });
  };

module.exports = {"userAuthenticate" : userAuthenticate};
