const mongoose = require('mongoose');
const UserModel = require('../models/user');


var userDestroy = function(req,res) {
  console.log("Logged Out");
  req.session.destroy();
  res.send("Logged Out");
};

module.exports = { "userDestroy": userDestroy };
