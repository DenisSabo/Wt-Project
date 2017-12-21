var Image = require('../models/images.js');
var fs = require("fs");

//QUESTION: maybe we can/should put filterImagesController and manageImagesController together?

//Handle image creation on post
exports.image_create_post = function(req, res) {
	console.log("manageImagesController/image_create_post: " + req);

	var contentType = req.get("Content-Type");
	//jQuery sets datatype to urlencoded, forcing it to set Contet-Type to multipart/form-data leads to errors
	if(contentType = "application/x-www-form-urlencoded"){
		/* COLLECT DATA*/
		var fileEnding =  getMimeTypeEnding(req.file.mimetype);

		var image = {
			/* VALIDATION IN ROOT/models/images.js */
			title : req.body.title,
			author : req.body.author,
			description : req.body.description,
			tags : req.body.tags,
			categories : req.body.categories,
			place : req.body.place,
			path : req.file.path,
			timestamp : req.body.date,
			fileType : fileEnding
		}
		

		//trying to insert into db
		insertImage(image, function(err){
			console.log(err);
		});


        // Create an instance of model ImageModel, by giving it the send json as js object
        
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
	return arr[1];
}

function insertImage(image, callback){
	try{
	var image_instance = new Image({ title : image.title, author: image.author, description: image.description, tags: image.tags, categories : 
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
                  console.log("Author/User '" +image.author + "' safed a image called '" + image.title + "' to our site.");
              	}
        });
}

