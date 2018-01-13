var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// routes
var routes = require('./lib/routes');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/', routes);

mongoose.connect('mongodb://localhost:27017/xtasy');
var db = mongoose.connection;
db.once('open', function () {
  console.log("Connection to MongoDB succesful...");
}).on('error', function (error) {
  console.log("MongoDB connection error: ", error);
});

app.listen(3000, function () {
    console.log("Listening to port 3000...");
});