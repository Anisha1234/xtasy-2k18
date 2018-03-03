var mongoose = require('mongoose');
var request = require('request');
var mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var bcrypt = require('bcrypt');

var options = {
    service: 'gmail',
    secure: true,
    auth: {
        user: 'xtasy.2018@gmail.com',
        pass: 'CeTjInDaBaD2018'
    }
};

var transport = mailer.createTransport(smtpTransport(options));

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

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.emailid, salt, function (err, hash) {
                        // Store hash in your password DB.
                        var link = req.protocol + '://' + req.get('host') + '/login';
                        var mail = {
                            from: 'noreply@xtasy.cetb.in',
                            to: newUser.emailid,
                            subject: "Welcome to xtasy! Registration Confirmed!" ,
                            text:"Hello " + newUser.name + "!You have successfully registered. Kindly [LOGIN](" + link + ") to the Xtasy website to get your QRCode."+ 
                                 "You are receiving this mail because you or someone posing as you is" + 
                                 " trying to register for xtasy",
                            html: "<b>Hello " + newUser.name +
                            "!</b><br><br>You have successfully registered. Kindly <a href=" + link + " style='color:red;'>LOGIN</a> to the Xtasy website to get your QRCode." + "<br>" + 
                            "<br><small>You are receiving this mail because you or someone posing as you is" + 
                            " trying to register for xtasy</small>"
                        };

                        transport.sendMail(mail, (error, response) => {
                            transport.close()
                            if (error) {
                                console.log(error);
                                res.json({ "msg": 'Error in sending mail! Please register again' });
                            } else {
                                UserModel.saveUser(newUser, function (err, doc) {
                                    if (err) throw err;
                                    console.log(doc);

                                    console.log("Mail has been sent")
                                    res.json({ "msg": 'Successfully Registered!' });

                                    // res.json(doc);
                                });

                            }
                        })

                    });
                });

            } else {
                console.log("emailid already taken");
                res.json({ "msg": "Already registered" });
            }
        });

    });
}

module.exports = { "createUser": createUser };