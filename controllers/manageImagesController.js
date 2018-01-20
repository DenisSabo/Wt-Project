var Image = require('../models/images.js');
var fs = require("fs");
var errorHandler = require("./services/errorHandlingService.js");

// Save image to server in "/uploads/"
exports.image_create_post = function(req, res) {

	console.log("manageImagesController/image_create_post: ");

	var oldPath = req.file.path;
	var fileEnding =  getMimeTypeEnding(req.file.mimetype); //needed in renameUploadedFile and in var image
	var timestamp = Date.now(); 
	var newPath = "uploads/" + req.user.id + '_' + req.body.title + '_' + timestamp + '.' + fileEnding;
	var categories = req.body.categories;
	var result = categories.split(","); 

	var image = {
		title : req.body.title,
		user : req.user.id, //works for google authentification
		description : req.body.description,
		tags : req.body.tags,
		categories : result,
		place : req.body.place,
		path : newPath,
		fileType : fileEnding
	}

	//trying to insert into db. Validation happens in model. (Mongoose validation)
	insertImage(image, function(err){
		if(err){
			//Image was not safed to database
			console.log(err);
			fs.unlink(oldPath, function(err){
				if(err){
					console.log(err);
					//Should not happen
					console.log("WARNING: Useless image was not deleted from filesystem: " + oldPath);
				}
				else{
					//Uploaded file was deleted from filesystem
					console.log("Uploaded file was deleted from filesystem");
					res.status(404).end("Invalid data: " + err);
				}
			})
			
		}
		else{
			fs.rename(oldPath, newPath, function(err){
				if(err){
					fs.unlink(oldPath, function(err){
						if(err){
							console.log("WARNING: Useless image was not deleted from filesystem: " + oldPath);
							res.status(500).end(err);
						}
						else{
							console.log("Error occured while renaming file");
							res.status(500).end(err);
						}
					})
					
				}
				else{
					//File was successfully safed to database and uploaded
					console.log("File was uploaded successfully");
					res.status(201).end("File was created successfully");
				}
			});
		}
	});


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
		image.categories, place : image.place, path : image.path, imageType : image.fileType});
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
            console.log("Author/User '" + image.user + "' safed a image called '" + 
            	image.title + "' to our database.");
            callback(0);
        }
    });
}