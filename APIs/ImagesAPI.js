var express = require('express');
const MongoClient = require('mongodb').MongoClient;
//includes my image.js file (contains the image class, which validates the image class and converts it to a js-object)
var image = require('./image.js');
var myParser = require("body-parser");
var app = express();

const url = 'mongodb://localhost:27017/WtProject_Webgallery';

//get most popular (most clicked and upvoted images)
app.get("/images/popular", (res, req) {

});

//most recent images, uploaded on this page
app.get("/images/newest", (res, req) {

});

//get images from categorie "nature"
app.get("/images/nature", (res, req){

});

//category urban
app.get("/images/urban", (res, req){

});

//category "other"
app.get("/images/other", (res, req){

});

//push/upload images on page
app.push("/images", (req, res)
	//gets value of header "Content-Type"
	var contentType = req.get("Content-Type");
	if(contentType !== null || contentType !== undefined){
		console.log("Content-Type header is missing");
		res.status(406).send("Not acceptable content type: Header 'Content-Type' is missing.");
	}
	else if(contentType !== "application/json"){
		console.log("Content-Type is not set to application/json");
		res.status(406).send("Not acceptable content type: Header 'Content-Type' is not set to 'application/json'.");
	}
	//parse data to a javascript object
	var body = req.body;
	var imageObject = JSON.parse(body);
	//TODO check if sended object is a valid image object, like defined in image.js

	//if everything is fine, create connection with mongo database
	mongo.MongoClient.connect(url)
    .then(conn => conn.collection('images'))
    //insert json object
    .then(coll => coll.insertOne({name: 'korbinian', user: 'riko494'}))
    .catch((err) => {
        console.log(err);
    });
	
});
