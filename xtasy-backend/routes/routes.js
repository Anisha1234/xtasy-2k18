var express = require('express');
var router = express.Router();
var admin = require('../controllers/admin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./pages/index');
});

router.get("/login" , function(req, res,next){
  if(req.session.user) {
    if(req.session.user === "admin") res.redirect('/admin');
    else res.redirect('/profile');
  } else res.render("./pages/login");
});

router.get("/admin" , admin.displayAll);

router.get("/profile", function(req, res) {
  if(req.session.user) {
    if(req.session.user === "admin") res.redirect('/admin');
    else res.render('./pages/profile' , { "details" : req.session.user });
  } else res.redirect("/login");
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

router.get("/gallery" , function(req,res,next){
  res.render("./pages/gallery");
});

router.get("/team" , function(req,res,next){
  res.render("./pages/team");
});

module.exports = router;
