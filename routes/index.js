const express = require('express');
const path = require('path');
const router = express.Router();
var User = require('../models/users.js');

router.get('/', function (req, res){
    if (req.user) {
    	console.log("Route: index.js activated.");
    	var cursor = User.find({ googleUserID: req.user.id });
    	if(!cursor){
			//cursor is empty = it's a new user
			User.insert({ 'username': req.user.displayname, '_id': req.user.id, 'googlePicture': req.user.image }, function(err){
				if(err){
					console.log("Error while trying to safe new user: " + err);
					//Validation failed
					res.status(404).sendfile(path.resolve('views/index.html'));
				}
				else{
					console.log("New user added: " + req.user.displayname);
					res.sendfile(path.resolve('views/LoggedIn.html'));
				}
			})
		}
		else{
			//User already safed in database
			console.log("Cursor was not empty for user " + req.user.displayname);
			res.sendfile(path.resolve('views/LoggedIn.html'));
		}

    	
    }
    //no req.user data send
    else res.status(404).sendfile(path.resolve('views/index.html'));
});

module.exports = router;