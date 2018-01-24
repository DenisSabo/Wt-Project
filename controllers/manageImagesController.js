var fs = require("fs");
var Image = require('../models/images.js');
var User = require('../models/users.js');

// Save image to server in "/uploads/"
exports.image_create_post = function(req, res) {

	console.log("manageImagesController/image_create_post: ");

	//get current user, who trys to upload
	console.log("manage images: current user: " + req.user.id);

	User.findOne({ "googleUserId" : req.user.id }, function(err, user){
		if(err){
			console.log("User not available");
			res.status(404).end(err);
		}
		else{
			console.log("manage images: obejctId: " + user._id);
			var objectId = user._id;

			var oldPath = req.file.path;
			var fileEnding =  getMimeTypeEnding(req.file.mimetype); //needed in renameUploadedFile and in var image
			var timestamp = Date.now(); 
			var newPath = "uploads/" + req.user.id + '_' + req.body.title + '_' + timestamp + '.' + fileEnding;
			var categories = req.body.categories;
			var result = categories.split(","); 

			var image = {
					title : req.body.title,
					user : objectId, //works for google authentification
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
					//File will be deleted (Uploaded instantly by multer)
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
		}
	});
	
};

//Handle image delete on delete
//Route: /images/manage/
//Method: delete
//Data: req.params.path (/images/manage/:path) must contain path to image, that has to be deleted
exports.image_delete_delete = function(req, res) {
	var path = req.params.path;
	if(path === null || path === undefined){
		console.log("Req.body.path is needed.");
		res.status(404).end("Req.body.path is needed.");
	}
	else{
		Image.remove( { path: path }, function(err){
		if(err){
			res.status(404).end("Image not deleted: " + err + "; " + req.body.path);
		}
		else{
			fs.unlink(path, function(err){
				//deletes file from filesystem 
				if(err){
					res.status(500).end("Image was not deleted from filesystem. Please check in filesystem: " + req.body.path);
				}
				else{
					res.status(204).end("Image was deleted successfully");
				}
			});
			console.log("Image deleted: " + req.body.path);
			res.status(204).end("Image deleted: " + req.body.path);
		}
	});
	}
	
};

//Handles image changes on put (for example new title, or description)
//Route: /images/manage/clicked/:id
//Method: put
exports.image_increment_clicks = function(req, res) {
	var objectID = req.params.id;	
	if(objectID === null || objectID === undefined){
		console.log("/images/manage/clicked/:id; id is empty. Send images objectid");
		res.status(404).end("/images/manage/clicked/:id; id is empty. Send images objectid");
	}
	else{
		Image.update({_id: objectID }, { $inc : { "clicks" : 1 }}, function(err, image){
			if(err){
				console.log("Error occured while trying to increment clicks" + err);
				res.status(404).end("Image does not exist. Clicks not incremented: " + err);
			}
			else{
				console.log("Image clicks are now: " + image.clicks);
				res.status(200).end("Clicks incremented");
			}
		})
	}
};

//Handles image changes on put (for example new title, or description)
exports.image_change_put = function(req, res) {

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