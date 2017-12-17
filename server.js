// node modules
var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
var config = require('config');

// routes
var indexRoute = require('./lib/index');
var oauth2Route = require('./lib/oauth2');

// init express
var app = express();

// set route for static files like css,js
app.use('/public', express.static(__dirname + '/public'));

// [START session]
// Configure the session and session storage.
const sessionConfig = {
    resave: false,
    saveUninitialized: false,
    secret: config.get('SECRET'),
    signed: true
  };
 
app.use(expressSession(sessionConfig));
// [END session]

// OAuth2
app.use(passport.initialize());
app.use(passport.session());
app.use(oauth2Route.router);

// first route
app.use("/", indexRoute);

// listen on port
app.listen(config.get("WebServer.port"), function(){
    console.log(('Express server listening on port ' + config.get("WebServer.port")));
});

