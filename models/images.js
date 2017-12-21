//Require mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var ImageModelSchema = new Schema({
	title: { 
		type: String, 
		minlength: [3, "Title has to contain at least 3 characters!"],
		maxlength: [15, "Title cannot be longer than 15 characters!"],
		required: [true, "Title of image is missing!"] 
	}, 
	//TODO add as foreign key to ./author.js
	author: { 
		type: String,
		minlength: [3, "Author name has to contain at least 3 characters!"], 
		maxlength: [20, "Author name cannot be longer than 20 characters!"],
		required: [true, "Author/Username is missing!"] 
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
	date: { //Timestamp, client side (What if user is from another country)
		type : Date, 
		required: [true, "Date of image upload required!"]
	},
	imageType: {
		type: String,
		required: [true, "Image type is missing!"],
		//you can add more image types here!
		enum: ['png', 'jpg', 'jpeg','gif']
	}
});

/* MORE VALIDATION ... YEAH! */
ImageModelSchema.path('categories').validate(function (value) {
	if(value.length > 3){
		return false
	}
	else 
		return true;
}, 'Not more than 3 categories allowed'); 

/* 
ImageModelSchema.path('author').validate(function (value) {
	if(value === "undefined" || value === "null"){
		return false
	}
	else 
		return true;
}, 'Author cannot be undefined or null'); 
*/


								//Collection  //Schema that will be used for creating the model
module.exports = mongoose.model("ImageModel", ImageModelSchema);