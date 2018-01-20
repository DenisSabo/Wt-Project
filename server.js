// node modules
var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
var config = require('config');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var mongoose = require('mongoose');

/**
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.filename + '.' + getMimeTypeEnding(file.mimetype))
  }
})
*/

//var upload = multer({ storage: storage })

//Set up default mongoose connection
var mongoDB = config.get('MongoDB.connectionString');
mongoose.connect(mongoDB, {
  useMongoClient: true
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// routes
var indexRoute = require('./routes/index');
var oauth2Route = require('./models/oauth2');
var getAccountAPIRoute = require('./routes/getAccountAPI');

//more routes
var filterImages = require("./routes/filterImages.js");
var manageImages = require("./routes/manageImages.js");
var basicAuth = require("./routes/basicAuth.js");

var app = express();

// serve static files in directory "public"
app.use('/public', express.static(__dirname + '/public'));

// serve uploaded images 
app.use('/uploads', express.static(__dirname + '/uploads'));

//localhost/signedIn
app.get("/loggedIn", function(req, res) {
	res.sendfile(__dirname + "/views/LoggedIn.html");
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
app.use(oauth2Route.router);

// first route
app.use("/", indexRoute);

//login route
app.use("/getAccount", getAccountAPIRoute);

/* ROUTER FOR HANDLING IMAGES */



app.use('/images/filter', filterImages); //https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

/* ADD COMMENT , jsonParser, upload.single()*/

// multipart/form-data
app.use("/images/manage", upload.single("file"));
app.use('/images/manage', manageImages);

//Router "signupOrLogin.js" redirects requests to AuthController.js
app.use("/login", basicAuth);
app.use("/signup", basicAuth);

//serves jQuery framework in directory root/lib (for frontend)
app.get("/jquery-3.2.1.js", function(req, res){
	res.sendfile(__dirname + "/lib/jquery-3.2.1.js");
});

// listen on port
app.listen(config.get("WebServer.port"), function(){
    console.log(('Express server listening on port ' + config.get("WebServer.port")));
});

function getMimeTypeEnding(mimetype){
  var arr = mimetype.split("/", 2);
  if(arr[1] === "jpeg"){
    return jpg;
  }
  else{
    return arr[1];
  }
}