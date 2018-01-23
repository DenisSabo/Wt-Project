var User = require('../models/users.js');

//If it is a new user: Safe his google data to database
//Needed data in message body: req.user -> req.user.id and req.user.displayname
exports.user_create_post = function(req, res) {
	if(req.user){
		var googleName = req.user.displayname;
		var googleID = req.user.id;
		var pathToPic = req.user.image;
		var cursor = User.find({ googleUserID: googleID });

		if(!cursor){
			//cursor is empty = it's a new user
			User.insert({ username: googleName, googleUserID: googleID, googlePicture: pathToPic }, function(err){
				if(err){
					console.log("Error while trying to safe new user: " + err);
					res.status(404).end(err);
				}
				else{
					console.log("New user added: " + googleName);
					res.status(201).end("New user " + googleName + " was created.");
				}
			})
		}
		else{
			//User already safed in database
			res.send(409).end("User already exists: " + googleName);
		}
	}
	else{
		console.log("req.user was empty");
		res.status(404).end("request.user data is missing. Try to gain information by using 'getAccountAPI'.");
	}

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