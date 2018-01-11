var Image = require('../models/images.js');
var fs = require("fs");
var errorHandler = require("./services/errorHandlingService.js");

// Save image to server in "/uploads/"
exports.image_create_post = function(req, res) {
	//TODO no upload if invalid fileFilter()
	//TODO return does not work

	console.log("manageImagesController/image_create_post: " + req);

	//checkRequestType(req.get("Content-Type"), function(err){
	//	if(err){
	//		errorHandler.clientErrorHandling(406, err, res);
	//		return false; //returns from image_create_post
	//	}
	//});
	var fileEnding =  getMimeTypeEnding(req.file.mimetype); //needed in renameUploadedFile and in var image

	var newPath = generateNewPath(req, fileEnding, function(err){
		if(err){
			var err = "Internal Server Error: Renaming file failed.";
			errorHandler.clientErrorHandling(500, err, res);
			//Return does not work here
		}
	});
	
	var image = {
		title : req.body.title,
		user : req.user.id, //works for google authentification
		description : req.body.description,
		tags : req.body.tags,
		categories : req.body.categories,
		place : req.body.place,
		path : newPath,
		timestamp : req.body.date,
		fileType : fileEnding
	}

	//trying to insert into db. Validation happens in model. (Mongoose validation)
	insertImage(image, function(err){
		if(err){
		errorHandler.clientErrorHandling(404, err, res);
		console.log("WARNING: Image was not safed to database. PLEASE CHECK IF IMAGE WAS SAFED IN /uploads.");
		}
	});

	res.status(200).end("Image was uploaded and safed to database");

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

/* TODO : Eigene Funktionen für die Queries erstellen!!! */

/* Functions for validation */
function validateType(mimeType){
	if(!notNull(mimeType)){
		return false;
	}
	else if(mimeType.split("/", 2)[0] !== "image"){ //if first part of mime type is not image (image/jpeg ....)
		return false;
	}
}

/* Value cannot be null*/
function notNull(anything){
	if(typeof(anything) === null || typeof(anything) === undefined){
		return false;
	}
	else{
		return true;
	}
}

function getFileEnding(filename){
	var arr = filename.split(".", 2);
	return arr[1];
}

function getMimeTypeEnding(mimetype){
	var arr = mimetype.split("/", 2);
	if(arr[1] === "jpeg"){
		return "jpg";
	}
	return arr[1];
}

function insertImage(image, callback){
	try{
	var image_instance = new Image({ title : image.title, user: image.user, description: image.description, tags: image.tags, categories : 
		image.categories, place : image.place, path : image.path, date : image.timestamp, imageType : image.fileType});
	}catch(err){
		//callback will be called with error message in parameter
		callback(err);
	}

	// Save the new model instance, passing a callback
        image_instance.save(function (err) {
        	//err = error messages defined in Schema of image (root/models/image.js)
              if (err) {
                  callback(err);
              	}
			  else{
                  console.log("Author/User '" + image.user + "' safed a image called '" + image.title + "' to our site.");
              	}
        });
}

function checkRequestType(requestType, callback){
	//jQuery sets datatype to urlencoded, forcing it to set Contet-Type to multipart/form-data leads to errors, eventhough it is the right thing
	if(requestType !== "application/x-www-form-urlencoded"){
		var err = "Invalid Content-Type. Only 'application/x-www-form-urlencoded' allowed.";
		callback(err);
	}
	else{
		callback(null);
	}

}

function generateNewPath(request, fileEnding, callback){
		/* COLLECT DATA */
		try{
			var oldPath = request.file.path; //path to which file was uploaded
			//rename file
			//idea : unique name for image = timestamp + username + title
			var timestamp = Date.now(); 
			var newPath = "uploads/" + request.user.id + '_' + request.body.title + '_' + timestamp + '.' + fileEnding;

			fs.rename(oldPath, newPath, function(err){
				if(err){
					callback(err);
				}
			});

			return newPath;
		}
		catch(err){
			err += "WARNING: unknown error";
			callback(err);
		}
}