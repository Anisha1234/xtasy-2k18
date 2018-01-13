var express = require('express');
var router = express.Router();
var register = require("../controllers/register")

router.get("/test" , function(req,res){
    res.json({"msg" : "hello world"})
})

router.post("/register" , register.createUser );

module.exports = router ;