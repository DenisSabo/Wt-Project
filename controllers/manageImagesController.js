var Image = require('../models/images.js');

//QUESTION: maybe we can/should put filterImagesController and manageImagesController together?

//Handle image creation on post
exports.image_create_post = function(req, res) {
	console.log("manageImagesController/image_create_post: " + req);
	//validate request
	var returnedObj = createImageIfValid(req, res)
	if(returnedObj.validRequest){
		//TODO images schema still not perfect (duplicates possible)
		//TODO URL of image in local filesystem
		//TODO handle error if entry cannot be safed !!!
	res.send('NOT FULLY IMPLEMENTED: Image create on post');
	}
	else{
		res.send(returnedObject.errMessage);
	}
};

//Handle image delete on delete
exports.image_delete_delete = function(req, res) {
	console.log("manageImagesController/image_delete_delete: " + req);
	res.send('NOT IMPLEMENTED: Image delete on delete');
};


//Handles image changes on put (for example new title, or description)
exports.image_change_put = function(req, res) {
	console.log("manageImagesController/image_change_put: " + req);
	res.send('NOT IMPLEMENTED: Image change on update');
};

/* Bad request: Sends response to client with ErrorMessage and status code
   Good request: returns true */
function createImageIfValid(req, res){
		console.log(req.body);
	//return has to contain two values, 1: Was request valid? 2: If not, why?
	var returnObject = {
		validRequest: true,
		errMessage: null
	}

	/* Content-Type header must be set to 'application/json'*/
	var contentType =  req.get("Content-Type");

	if(contentType !== "application/json"){
		res.status(406).send("Not Acceptable : Content-Type header must be set to 'application/json'");
		returnObject.validRequest = false;
		return returnObject;
	}

	//gets request body, that should be a json and parse it into normal javascript object
	else if(req.body === null || req.body === undefined){
		res.status(406).send("Not Acceptable : Request body must contain a valid JSON, but body was empty");
		returnObject.validRequest = false;
		return returnObject;
	}

	else{

		//trying to insert into db
		// Create an instance of model ImageModel, by giving it the send json as js object
		var image_instance = new Image(req.body);

		// Save the new model instance, passing a callback
		image_instance.save(function (err) {
 		 	if (err) {
 		 		returnObject.validRequest = false;
 		 		returnObject.errMessage = "Was not able to create entry! " + err;
 		 		return returnObject;
 		 	}

 		 	else{
 		 		//instance of image was created and safed in collection of database
 		 		return returnObject;
 		 	}
  			// saved!
  		});
  		return returnObject;
  	}	
}

/* Eigene Funktionen für die Queries erstellen!!! */


