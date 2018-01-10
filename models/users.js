//Require mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
	username: { 
		type: String, 
		minlength: [3, "Name too short! At least 3 characters needed."],
		maxlength: [15, "Name cannot be longer than 15 characters!"],
		required: [true, "Username is missing!"] 
	}, 
	//TODO add as foreign key to ./author.js
	email: { 
		type: String,
		minlength: [3, "E-Mail has to contain at least 3 characters!"], 
		maxlength: [20, "E-Mail cannot be longer than 20 characters!"],
		required: [true, "E-Mail is missing!"] 
	},
	password: {
		type: String,
		minlength: [3, "Password too short! At least 3 characters needed."], 
		maxlength: [30, "Password too long! Use less than 30 characters."],
		required: [true, "Password is missing!"] 
	},
 
	picturePaths: [String], //Problematic ?? "Änderungs-/Löschanomalien ..." But good for quicksearch
	signupDate: { 
		type : Date, 
		required: [true, "Date of sign up is missing!"]
	},
	lastLogin: { 
		type : Date,
		required : [true, "Date of last login is missing."]
	},
	profileDescription: {
		type: String,
	}
});

module.exports = mongoose.model("UserModel", UserModelSchema);