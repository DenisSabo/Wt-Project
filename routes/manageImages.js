var express = require('express');
var router = express.Router();

//For uploading images to page, post JSON to "localhost:3000/images/manage".
router.post("/", (req, res) => {
	//TODO: Put this in controller!!!
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
	//TODO send to controller
})
//TODO: Update
//TODO: Delete

module.exports = router;