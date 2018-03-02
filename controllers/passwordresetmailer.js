var mongoose = require('mongoose');
var request = require('request');
const sgMail = require('@sendgrid/mail');
var bcrypt = require('bcrypt');
var UserModel = require('../models/user');

sgMail.setApiKey("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");

var passwordReset = function (req, res) {
    //  if(!req.body.emailid ) res.json({"msg": "Enter your email"});
    UserModel.findOne({ emailid: req.body.emailid }, function (err, doc) {
        if (err) throw (err);
        if (doc) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.emailid, salt, function (err, hash) {
                    // Store hash in your password DB.
                    var link = req.protocol + '://' + req.get('host') + '/api/reset?email=' + req.body.emailid + '&code=' + hash;
                    var mail = {
                        from: "noreply@xtasy.cetb.in",
                        to: req.body.emailid,
                        subject: "Reset your password for xtasy",
                        html: "<b>Hello " + doc.name + "!</b><br>" + "<p>" + "Click on the <a href='"
                            + link + "'>link</a> to reset your password</p>" +
                            "<small>You are receiving this mail because you or someone posing as you is" +
                            " trying to register for xtasy</small>"
                    };
                    sgMail.send(mail, function () {
                        console.log("Mail has been sent");
                        res.redirect("/login?action=7");
                    });
                });
            });
        }
        else {
            res.redirect("/login?action=2");
        }
    })
}

module.exports = { "passwordReset": passwordReset }
