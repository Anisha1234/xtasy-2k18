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

module.exports = router;
