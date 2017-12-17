var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
var config = require('config');
var app = express();

//set route for static files like css,js
app.use('/public', express.static(__dirname + '/public'));

app.get("/",function(req,res){
    res.sendfile("./views/index.html");
});

app.listen(config.get("WebServer.port"), function(){
    console.log(('Express server listening on port ' + config.get("WebServer.port")));
});

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
app.use(require('./lib/oauth2').router);
