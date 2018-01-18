const mongoose = require('mongoose');
const UserModel = require('../models/user');


var displayAll = function(req,res) {
  if (req.session.user) {
    var query = UserModel.find();
    query.select('name emailid college');
  
    query.exec(function(err, user) {
      if(err) throw err;
      console.log(user);
      res.render("pages/admin" , {"users" : user})
    });
  } else {
    res.send("Invalid Session!");
  }

}

module.exports = { "displayAll": displayAll };
