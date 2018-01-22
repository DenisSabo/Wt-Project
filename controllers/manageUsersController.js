var User = require('../models/users.js');

//Save user to database
//Data in req: req.user.displayname = google display name; req.user.id = google user id;
exports.user_create_post = function(req, res) {
	User.insert({username: req.user.displayname, googleUserID: req.user.id}, function(err){
		if(err){
			console.log("An error occured, while trying to safe user: " + err);
			res.status(404).end(err);
		}
		else{
			console.log("User " + req.user.displayname + " was added to database ");
			res.status(201).end("User was added to database");
		}
	});

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