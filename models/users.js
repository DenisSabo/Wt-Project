//Require mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

//only works for google authentification
var UserSchema = new Schema({
	username: { 
		type: String, 
		minlength: [3, "Username to short"],
		maxlength: [30, "Username cannot be longer than 30 characters!"]//,
		//required: [true, "Username is missing!"] 
	}, 
	googleUserId: {
		type: Number
	},
	googlePicture: {
		type: String, 
		minlength: [3, "Path too short! At least 3 characters needed."],
		maxlength: [200, "Path cannot be longer than 200 characters!"],
		required: [true, "Path is missing!"],
		unique: [true, "Path already exists!"]
	}
	//lastLogin ?
});

module.exports = mongoose.model("User", UserSchema);