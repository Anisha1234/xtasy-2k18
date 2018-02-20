const mongoose = require('mongoose');
const UserModel = require('../models/user');

var findId = function (req, res) {
  if (req.query.xtasyid) {
    var xtasyid = req.query.xtasyid.slice(-4);
    console.log(xtasyid);
    UserModel.findOne({
      "xtasyid": xtasyid
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