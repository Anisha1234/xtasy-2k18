const mongoose = require('mongoose');
const UserModel = require('../models/user');

var findId = function (req, res) {
  if (req.query.xtasyid) {
    var xtasyid = Number(req.query.xtasyid);
    xtasyid = (((((xtasyid/300)-2)/7)+7)/30) - 5 ;
    console.log(xtasyid);
    UserModel.findOne({
      "xtasyid": xtasyid.toString()
    }, function (err, doc) {
      if (err) throw err;
      if (!doc) res.send("invalid xtasyid");
      else {
        var doc = {
          xtasyid: doc.xtasyid,
          emailid: doc.emailid,
          name: doc.name,
          college: doc.college,
          contact: doc.contact,
          gender: doc.gender
        };
        res.json(doc)
      }
    });
  }else{
    res.json({"msg" : "No id provided"});
  }
}

module.exports = {
  "findId": findId
};