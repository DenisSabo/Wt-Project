//Require mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var ImageModelSchema = new Schema({
	title: { 
		type: String, 
		minlength: 3,
		maxlength: 15,
		required: true 
	}, 
	author: { //TODO add as foreign key to ./author.js
		type: String,
		minlength: 3,
		maxlength: 15, 
		required: true 
	},
	description: {
		type: String,
		maxlength: 200
	},
	tags: [String], //Used for searching later (Tags + title + maybe: categories)
	categories: [String],
	place: String, //Where did they shoot the picture?
	url: String, //where can you find picture in local filesystem "root/images"
	clicks: Number,
	likes: Number,
	timestamp: Date, //When was the picture uploaded?


	//maybe later if we want to safe images as binary data in database. Usefull if data will be bigger than 16MB (GridFs ...)
	/* 
	imageType: {
		type: String,
		//you can add more image types here!
		enum: ['png', 'jpg', 'gif']
	},
	
	imageData: {
		type: Buffer,
		//required: true, later!!!!!!!!!!!!!!!!!!!!!!!
		//unique: true //no same images 
	}
	*/
});
								//Collection  //Schema that will be used for creating the model
module.exports = mongoose.model("ImageModel", ImageModelSchema);