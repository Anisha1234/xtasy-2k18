var mongoose = require('mongoose');

var UserModel = require('../models/user');

var userAuthenticate = function(req,res) {
    UserModel.findOne({"username" : req.body.username} , function(err,doc) {
      console.log(doc);
      if(err) throw err;
      if(doc){
        if(doc.password == req.body.password) {
          var details = {
            "name" : doc.name,
            "username" : doc.username,
            "college" : doc.college
          };
          res.json(details);

        } else {
              res.json({"msg" : "Invalid password"});
        }
      } else {
            res.json({"msg" : "Invalid username"});
      }
    })
}

module.exports = {"userAuthenticate" : userAuthenticate};
