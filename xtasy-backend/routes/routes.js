var express = require('express');
var router = express.Router();
var admin = require('../controllers/admin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./pages/index');
});

router.get("/login" , function(req,res ,next){
  res.render("./pages/login")
})

router.get("/admin" , admin.displayAll);

router.get("/dashboard", function(req, res) {
  if(req.session.user && req.session.user !== "admin") {
    res.render('./pages/dashboard' , { "details" : req.session.user });
  } else {
    res.redirect("/login?action=4");
  }
});

/*router.get("/reset", function(req,res,next){
  res.render("./pages/passwordreset")
}) */

router.get("/forgot", function (req,res,next) {
  res.render("./pages/forgot");
});

router.get("/events", function(req,res,next){
  res.render("./pages/events");
});

module.exports = router;
