const mongoose = require('mongoose');
const UserModel = require('../models/user');


var displayAll = function(req,res) {
  var query = UserModel.find();
  query.select('name college');

  query.exec(function(err, user) {
    if(err) throw err;
    console.log(user);
    res.render("pages/admin" , {"users" : user})
  })

}
 module.exports = {"displayAll":displayAll};
