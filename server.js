// node modules
var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
var config = require('config');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
var router = require('./router');

// mongoose connection
var mongoDB = config.get('MongoDB.connectionString');
mongoose.connect(mongoDB, { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

// start session
const sessionConfig = {
    resave: false,
    saveUninitialized: false,
    secret: config.get('SECRET'),
    signed: true
  };
app.use(expressSession(sessionConfig));

// use Oauth2
app.use(passport.initialize());
app.use(passport.session());
var oauth2Route = require('./models/oauth2');
app.use(oauth2Route.router);

// use router
app.use("/", router);

// listen on port
app.listen(config.get("WebServer.port"), function(){
    console.log(('Express server listening on port ' + config.get("WebServer.port")));
});