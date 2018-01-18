var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var UserModel = require('../models/user');

var userAuthenticate = function(req,res) {
    if( req.body.emailid == "admin@mail.com" && req.body.password == "admin" ) {
      req.session.user = "admin";
      console.log("Session : ", req.session);
      res.json({ msg: "admin" });
    } else {

    
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
            req.session.user = details;
            res.json({"msg": "successful"});
          } else {
            res.json({msg:"Invalid Password, Enter again"});
          }
        });
      } else {
        res.json({msg:"Incorrect emailid"});
      }
    });
  }
  };

module.exports = {"userAuthenticate" : userAuthenticate};
