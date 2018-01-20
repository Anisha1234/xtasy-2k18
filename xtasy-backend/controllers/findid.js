const mongoose = require('mongoose');
const UserModel = require('../models/user');

var findId = function(req,res){
  var id = req.query.xtasyid.slice(-4);
  id = parseInt(id);
  console.log(id);
    UserModel.findOne({"xtasyid" : id},function(err,doc){
        if(err) throw err;
        if(!doc) res.send("invalid xtasyid");
        else res.json(doc);
      });
}

module.exports = { "findId": findId};
