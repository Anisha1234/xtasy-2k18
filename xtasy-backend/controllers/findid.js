const mongoose = require('mongoose');
const UserModel = require('../models/user');

var findId = function(req,res){
  var xtasyid = req.query.xtasyid.slice(-4);
  console.log(xtasyid);
    UserModel.findOne({"xtasyid" : xtasyid},function(err,doc){
        if(err) throw err;
        if(!doc ) res.send("invalid xtasyid");
        else{
          var doc = { xtasyid : doc.xtasyid , emailid : doc.emailid , 
                      name : doc.name , college : doc.college ,
                      contact : doc.contact , gender : doc.gender };
          res.json(doc)
        }
      });
}

module.exports = { "findId": findId};
