var User = require('../models/users.js');

//If it is a new user: Safe his google data to database
//Needed data in message body: req.user -> req.user.id and req.user.displayname
exports.user_create_post = function(req, res) {
	//Is not needed anymore: index.js 

}


//Gets an entry in collection for schema users.
//Data in req: req.user.id = google user id
exports.user_get_user = function(req, res){
	User.findOne({googleUserID: req.user.id}, function(err, user){
		if(err){
			console.log("Requested user " + user + " does not exist. Error: " + err);
			res.status(404).end("User does not exist " + err);
		}
		else{
			console.log("User: " + user + " was requested");
			res.status(200).send(user).end();
		}
	});
}