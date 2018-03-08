var express = require('express');
var router = express.Router();

var register = require("../controllers/register");

var verify = require("../controllers/verify-mail");

var login = require("../controllers/login");

var find = require("../controllers/findid");

var logout = require("../controllers/logout");

var forgot = require("../controllers/passwordresetmailer");

var reset = require("../controllers/resetpassword");

var change = require("../controllers/changepassword");

var getUsers = require("../controllers/getallusers");

var central = require("../controllers/centralreg");


router.get("/" , function(req,res){
    res.json({"msg" : "hello world"})
})

router.post("/register" , register.createUser );

router.post("/login" , login.userAuthenticate );

router.get("/logout" , logout.userDestroy );

router.get("/verify" , verify.verifyMail );

router.post("/forgot" , forgot.passwordReset );

router.get("/reset" , reset.verifyReset);

router.get("/find", find.findId);

router.post("/change", change.changePassword);

router.get("/getallusers" , function(req,res){
    res.send("Security key missing");
});

router.get("/getallusers/:key", getUsers.getAllUsers)

router.get("/centralregd" , function(req,res){
    res.send("Id missing");
});

router.get("/centralregd/:id" , central.centralRegd);


module.exports = router;
