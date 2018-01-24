const express = require('express');
const path = require('path');
var User = require('../models/users.js');

exports.default = function (req, res){
    if (req.user) {
    	User.findOne({ "googleUserId" : req.user.id }, function(err, user){
    		if(err){
    			res.status(404).end(err);
    		}
    		else{
    			if(user){
    				//user already safed in database
    				res.sendFile(path.resolve('views/LoggedIn.html'));
    			}
    			else{
    				var user_instance = new User({ googleUserId: req.user.id, username: req.user.displayname, googlePicture: req.user.image});
    				user_instance.save(function(err){
						if(err){
							console.log("Error while trying to safe new user: " + err);
							//Validation failed
							res.status(404).sendFile(path.resolve('views/index.html'));
						}
						else{
							console.log("New user added: " + req.user.displayname);
							res.status(404).sendFile(path.resolve('views/LoggedIn.html'));
						}
					})
    			}
    		}
    	})
    }
    else{
    	res.status(200).sendFile(path.resolve('views/index.html'));
    }
};