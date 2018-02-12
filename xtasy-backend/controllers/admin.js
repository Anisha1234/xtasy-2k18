const mongoose = require('mongoose');
const UserModel = require('../models/user');


var displayAll = function(req, res) {
    if (req.session.user && req.session.user == "admin") {
        var query = UserModel.find({ isVerified: true });
        query.select('name emailid college xtasyid contact');

        query.exec(function(err, user) {
            if (err) throw err;
            console.log(user);
            res.render("pages/admin", { "users": user })
        });
    } else {
        res.redirect("/login?action=4");
    }

}

module.exports = { "displayAll": displayAll };