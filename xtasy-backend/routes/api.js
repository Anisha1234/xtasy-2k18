var express = require('express');
var router = express.Router();

var register = require("../controllers/register");

var verify = require("../controllers/verify-mail");

var login = require("../controllers/login");

var find = require("../controllers/findid");

var logout = require("../controllers/logout");

router.get("/" , function(req,res){
    res.json({"msg" : "hello world"})
})

router.post("/register" , register.createUser );

router.post("/login" , login.userAuthenticate );

router.get("/logout" , logout.userDestroy );

router.get("/verify" , verify.verifyMail );

router.get("/find", find.findId);

module.exports = router;
