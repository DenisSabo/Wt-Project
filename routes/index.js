const express = require('express');
const path = require('path');
const router = express.Router();
var User = require('../models/users.js');

router.get('/', function (req, res){
    if (req.user) {
    	var cursor = User.find({ googleUserID: googleID });
    	if(!cursor){
			//cursor is empty = it's a new user
			User.insert({ username: googleName, googleUserID: googleID, googlePicture: pathToPic }, function(err){
				if(err){
					console.log("Error while trying to safe new user: " + err);
					//Validation failed
					res.status(404)sendfile(path.resolve('views/index.html'));
				}
				else{
					console.log("New user added: " + googleName);
					res.sendfile(path.resolve('views/LoggedIn.html'));
				}
			})
		}
		else{
			//User already safed in database
			res.sendfile(path.resolve('views/LoggedIn.html'));
		}

    	
    }
    //no req.user data send
    else res.status(404).sendfile(path.resolve('views/index.html'));
});

module.exports = router;