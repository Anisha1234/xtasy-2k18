var mongoose = require('mongoose');
var request = require('request');
var bcrypt = require('bcrypt');

var UserModel = require('../models/user');

var createUser = function (req, res) {
    console.log(req.body)
    console.log(req.body['g-recaptcha-response'])

    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
    }
    // Put your secret key here.
    var secretKey = "6LflXkEUAAAAANYLd6pLipDC1DMPsrkrtEQ9wdiF";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
        }
        //res.json({"responseCode" : 0,"responseDesc" : "Sucess"});

        req.body.emailid = req.body.emailid.toLowerCase().trim();
        UserModel.findOne({ "emailid": req.body.emailid }, function (err, doc) {

            if (!doc) {
                var newUser = new UserModel(req.body);

                //newUser.xtasyid

                UserModel.saveUser(newUser, function (err, doc) {
                    if (err) throw err;
                    console.log(doc);
                    res.json({ "msg": 'Successfully Registered!' });

                    // res.json(doc);
                });

            } else {
                console.log("emailid already taken");
                res.json({ "msg": "EmailID Already Registered!" });
            }
        });

    });
}

module.exports = { "createUser": createUser };