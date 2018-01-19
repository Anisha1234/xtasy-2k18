var express = require('express');
var router = express.Router();
var register = require("../controllers/register")

var verify = require("../controllers/verify-mail")

var login = require("../controllers/login")

router.get("/" , function(req,res){
    res.json({"msg" : "hello world"})
})

router.post("/register" , register.createUser );

router.post("/login" , login.userAuthenticate );

router.get("/verify" , verify.verifyMail );

module.exports = router;
