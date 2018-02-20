const mongoose = require('mongoose');
const UserModel = require('../models/user');


var userDestroy = function(req,res) {
  console.log("Logged Out");
  req.session.destroy();
  console.log(req.session);
  res.send("Logged Out");
};

module.exports = { "userDestroy": userDestroy };
