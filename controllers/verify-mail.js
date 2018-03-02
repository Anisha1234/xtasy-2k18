const mongoose = require('mongoose');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey("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");

var verifyMail = function (req, res) {
  bcrypt.compare(req.query.email, req.query.code, function (err, isMatch) {
    if (err) throw err;
    if (isMatch) {
      UserModel.findOneAndUpdate({ emailid: req.query.email }, { $set: { isVerified: true } }, function (err, doc) {
        console.log(doc);
        if (err) throw err;
        if (!doc) res.redirect("/login?action=2");
        var mail = {
          from: 'noreply@xtasy.cetb.in',
          to: doc.emailid,
          subject: doc.name + "!You are hereby confirmed and all set for xtasy",
          text: "Hello " + doc.name + "!" +
            "You have been successfully verified" +
            "Name:" + doc.name + "XtasyID:" + doc.xtasyid  +
            "College:" + doc.college  + "Email ID:" + doc.emailid  +
            "Kindly login to the xtasy site to obtain the QRcode" + 
            "You are receiving this mail because you or someone posing as you is" + 
            " trying to register for xtasy",
          html: "<b>Hello " + doc.name + "!</b><br>" +
            "<p>You have been successfully verified</p><br><br>" +
            "<table><tr><th>Name:</th><td>" + doc.name + "</td></tr>" +
            "<tr><th>XtasyID:</th><td>" + doc.xtasyid + "</td></tr>" +
            "<tr><th>College:</th><td>" + doc.college + "</td></tr>" +
            "<tr><th>Email ID:</th><td>" + doc.emailid + "</td></tr></table><br>" +
            "<p>Kindly login to the xtasy site to obtain the QRcode</p>" + 
            "<small>You are receiving this mail because you or someone posing as you is" + 
            " trying to register for xtasy</small>"
        };
        console.log(mail);
        sgMail.send(mail, function () {
          console.log("Mail has been sent");
          res.redirect("/login?action=1");
        });

      });

    }
    else res.redirect("/login?action=3");
  });
}

module.exports = { "verifyMail": verifyMail };
