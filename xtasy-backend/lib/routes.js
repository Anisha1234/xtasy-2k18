var express = require('express');
var router = express.Router();
var register = require("../controllers/register")

var login = require("../controllers/login")

router.get("/test" , function(req,res){
    res.json({"msg" : "hello world"})
})

router.post("/register" , register.createUser );

router.post("/login" , login.userAuthenticate );

module.exports = router ;
