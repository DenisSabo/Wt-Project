var express = require('express');
var config = require('./config')();
var app = express();

//get '/' is listening on the index file
/* 
app.get('/', function (req, res){
	res.send("Hello world from server.js");
});
*/
//express command that tell where to look for static files
app.use(express.static(__dirname + "/public"));



http.createServer(app).listen(config.port, function(){
    console.log('Express server listening on port ' + config.port);
});