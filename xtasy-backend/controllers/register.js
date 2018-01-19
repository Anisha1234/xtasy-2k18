var mongoose = require('mongoose');
var request = require('request');
var mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var bcrypt = require('bcrypt');

var options = {
    service: 'gmail',
    secure: true,
    auth: {
        user: 'ramakpatt@gmail.com',
        pass: 'edtgh67ifr'
    }
};

var transport = mailer.createTransport(smtpTransport(options));

var UserModel = require('../models/user');

var createUser = function(req,res){
  console.log(req.body)
  console.log(req.body['g-recaptcha-response'])

  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Put your secret key here.
  var secretKey = "6LflXkEUAAAAANYLd6pLipDC1DMPsrkrtEQ9wdiF";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
    //res.json({"responseCode" : 0,"responseDesc" : "Sucess"});


    UserModel.findOne({"emailid" : req.body.emailid} , function(err,doc){

        if( !doc ){
            var newUser = new UserModel(req.body);
            //newUser.xtasyid
            UserModel.saveUser(newUser, function(err, doc) {
                if(err) throw err;
                console.log(doc);
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.emailid, salt, function(err, hash) {
                        // Store hash in your password DB.
                          var link = req.protocol + '://' + req.get('host') + '/api/verify?email=' + newUser.emailid +'&code=' + hash;
                          var mail = {  // to be set with appropriate req.body attributes
                          from:  "xtasy <3" + ' <ramakpatt@gmail.com>'  , // "<" + req.body.organizer + ">" ,   //'ramakpatt@gmail.com',
                          to: newUser.emailid,  // should be set to req.body.to
                          subject: "Verification mail" ,
                          html: "<p>" + "Click on the below link to verify "+ link + "</p>"
                      }

                     transport.sendMail(mail, (error, response) => {
                          transport.close()
                          if (error) {
                              console.log({ response: 'Error' });
                          } else {
                              console.log({ response: 'Sent' });
                          }
                      })
                    });
                });// nodemailer codes
                res.json(doc);
            });
        }else{
            console.log("emailid already taken");
            res.json({ "msg" : "Already registered"});
        }
    });

  });
}

module.exports = { "createUser" : createUser };
