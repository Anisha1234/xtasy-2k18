const mongoose = require('mongoose');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
var mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var options = {
  service: 'gmail',
  secure: true,
  auth: {
    user: 'xtasy.2018@gmail.com',
    pass: 'CeTjInDaBaD2018'
  }
};

var transport = mailer.createTransport(smtpTransport(options));

var verifyMail = function (req, res) {
  bcrypt.compare(req.query.email, req.query.code, function (err, isMatch) {
    if (err) throw err;
    if (isMatch) {
      UserModel.findOneAndUpdate({ emailid: req.query.email }, { $set: { isVerified: true } }, function (err, doc) {
        console.log(doc);
        if (err) throw err;
        if (!doc) res.redirect("/login?action=2");
        var mail = {
          from: "xtasy" + '<xtasy.2018@gmail.com>',
          to: doc.emailid,
          subject: "Confirmation Mail",
          html: "<p>You have been successfully verified</p><br><br>" + 
                "<table><tr><th>Name:</th><td>" + doc.name + "</td></tr>" + 
                "<tr><th>XtasyID:</th><td>" + doc.xtasyid + "</td></tr>" + 
                "<tr><th>College:</th><td>" + doc.college + "</td></tr>" + 
                "<tr><th>Email ID:</th><td>" + doc.emailid + "</td></tr></table><br>" +
                "<p>Kindly login to the xtasy site to obtain the QRcode</p>"
        };
        console.log(mail);
        transport.sendMail(mail, (error, response) => {
          transport.close()
          if (error) {
            console.log(error);
          } else {
            console.log("Mail has been sent");
            res.redirect("/login?action=1");
          }
        });
        
      });

    }
    else res.redirect("/login?action=3");
  });
}

module.exports = { "verifyMail": verifyMail };
