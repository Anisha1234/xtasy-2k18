const mongoose = require('mongoose');
const UserModel = require('../models/user');

var getAllUsers = function (req, res) {
    if (req.params.key === "kjasXxxYrqe25oli") {
        var query = UserModel.find({});
        query.select('name emailid college xtasyid contact accomodation');

        query.exec(function (err, users) {
            if (err) throw err;
            res.json(users);
        });
    }else{
        res.send("Invalid security id")
    }

}

module.exports = { "getAllUsers": getAllUsers };