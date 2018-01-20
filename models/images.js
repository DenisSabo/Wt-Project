//Require mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
	title: { 
		type: String, 
		minlength: [3, "Title has to contain at least 3 characters!"],
		maxlength: [15, "Title cannot be longer than 15 characters!"],
		required: [true, "Title of image is missing!"] 
	}, 
	//TODO add as foreign key to ./author.js
	user: { 
		type: String,
		minlength: [3, "User name has to contain at least 3 characters!"], 
		maxlength: [40, "User name cannot be longer than 20 characters!"],
		required: [true, "User is missing!"] 
	},
	description: {
		type: String,
		maxlength: [200, "Sorry, but the description cannot be longer than 200 characters!"]
	},
	//Used for searching later (Tags + title + maybe: categories)
	tags: [String], 
	categories: [String], 
	//Where was the picture shot? (Country, City, point of interest, whatever)
	place: { 	
		type: String,
		minlength: [3, "Name of place to small (min. 3 characters)!"],
		maxlength: [20, "Name of place to long (max. 20 charachters)!"],
	},
	path: {
		type : String,
		required: [true, "Path to picture's destination is missing!"]
	},
	clicks: {
		type : Number,
		default : 0
	},
	likes: {
		type : Number,
		default : 0
	},
	imageType: {
		type: String,
		required: [true, "Image type is missing!"],
		//you can add more image types here!
		enum: ['png', 'jpg', 'jpeg','gif']
	},
	uploadTime: {
        type: Date,
        default: Date.now,
      }
});

/* Check categories. Same as ENUM. Could be implemented as foreign key in a schema called categories ... */
ImageSchema.path('categories').validate(function (value) {

	if(value[0] !== "non-photographic" && value[0] !== "photographic" && value[0] !== "else"){
		return false;
	}
	else if(value[1] !== "nature" && value[1] !== "urban" && value[1] !== "people" && value[1] !== "else"){
		return false;
	}
	else if(value[2] !== "science" && value[2] !== "technology" && value[2] !== "entertainment" && value[2] !== "else"){
		return false;
	}
	else{
		return true;
	}
}, 'Invalid categories!'); 


								//Collection  //Schema that will be used for creating the model
module.exports = mongoose.model("ImageModel", ImageSchema);