var mongoose = require('mongoose');

var UserModel = require('../models/user');

var createUser = function(req,res){
    UserModel.findOne({"username" : req.body.username} , function(err,doc){

        if( !doc ){
            var newUser = new UserModel(req.body);
            UserModel.saveUser(newUser, function(err, doc) {
                if(err) throw err;
                console.log(doc);
                res.json(doc);
            });
        }else{
            console.log("username already taken");
            res.json({ "msg" : "Already registered"});
        }
    })
}

module.exports = { "createUser" : createUser };
