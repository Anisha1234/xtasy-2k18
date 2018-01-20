const mongoose = require('mongoose');
const UserModel = require('../models/user');

var findId = function(req,res){
  var xtasyid = req.query.xtasyid.slice(-4);
  console.log(id);
    UserModel.findOne({"xtasyid" : id},function(err,doc){
        if(err) throw err;
        if(!doc ) res.send("invalid xtasyid");
        else res.json(doc);
      });
}

module.exports = { "findId": findId};
