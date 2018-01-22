//Require mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

//only works for google authentification
var UserSchema = new Schema({
	username: { 
		type: String, 
		minlength: [3, "Username to short"],
		maxlength: [30, "Username cannot be longer than 15 characters!"],
		required: [true, "Username is missing!"] 
	}, 
	googleUserID: {
		type: String, 
		minlength: [3, "GoogleID too short! At least 3 characters needed."],
		maxlength: [40, "GoogleID cannot be longer than 15 characters!"],
		required: [true, "GoogleID is missing!"],
		unique: [true, "User already exists!"]
	}//,
	//lastLogin: {
	//	type: Date
	//}
});

module.exports = mongoose.model("User", UserSchema);