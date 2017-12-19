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
	author: { 
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
	imageType: {
		type: String,
		//you can add more image types here!
		enum: ['png', 'jpg', 'gif']
	},
	categories: [String],
	place: String, //Where did they shoot the picture?
	clicks: Number,
	likes: Number,
	timestamp: Date //When was the picture uploaded?
});

var ImageModel = mongoose.model("ImageModel", ImageModelSchema);