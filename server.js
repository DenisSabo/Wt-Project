var express = require('express');
var config = require('config');
var app = express();

//get '/' is listening on the index file
/* 
app.get('/', function (req, res){
	res.send("Hello world from server.js");
});
*/
//express command that tell where to look for static files
app.use('/public', express.static(__dirname + '/public'));

app.get("/",function(req,res){
    res.sendfile("./views/index.html");
})

app.listen(config.get("WebServer.port"), function(){
    console.log(('Express server listening on port ' + config.get("WebServer.port")));
});