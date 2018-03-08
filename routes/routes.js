var express = require('express');
var router = express.Router();
var admin = require('../controllers/admin');


var isLoggedIn = false;

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
      isLoggedIn = true;
    }
    else isLoggedIn = false;
    res.render('./pages/index', {"isLoggedIn" : isLoggedIn});
});

router.get("/login", function(req, res, next) {
    if (req.session.user) {
        if (req.session.user === "admin") res.redirect('/admin');
        else res.redirect('/profile');
    } else res.render("./pages/login");
});

router.get("/admin", admin.displayAll);

router.get("/profile", function(req, res) {
    if (req.session.user) {
        if (req.session.user === "admin") res.redirect('/admin');
        else res.render('./pages/profile', { "details": req.session.user });
    } else res.redirect("/login");
});

/*router.get("/reset", function(req,res,next){
  res.render("./pages/passwordreset")
}) */

router.get("/forgot", function(req, res, next) {
    res.render("./pages/forgot");
});

router.get("/events", function(req, res, next) {
  if(req.session.user){
    isLoggedIn = true;
  }
  else isLoggedIn = false;
    res.render("./pages/events", {"isLoggedIn" : isLoggedIn});
});

router.get("/gallery", function(req, res, next) {
  if(req.session.user){
    isLoggedIn = true;
  }
  else isLoggedIn = false;
    res.render("./pages/gallery", {"isLoggedIn" : isLoggedIn});
});

router.get("/team", function(req, res, next) {
  if(req.session.user){
    isLoggedIn = true;
  }
  else isLoggedIn = false;
    res.render("./pages/team", {"isLoggedIn" : isLoggedIn});
});

router.get("/ca", function(req, res, next) {
  if(req.session.user){
    isLoggedIn = true;
  }
  else isLoggedIn = false;

    res.render("./pages/ca",{"isLoggedIn" : isLoggedIn});
});

router.get("/sponsors", function(req, res, next) {
  if(req.session.user){
    isLoggedIn = true;
  }
  else isLoggedIn = false;
    res.render("./pages/sponsors",{"isLoggedIn" : isLoggedIn});
});

module.exports = router;
