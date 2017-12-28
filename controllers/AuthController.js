var User = require('../models/users.js');

exports.user_login = function (req, res) {

	var userLogin = {
		mail : req.body.mail,
		password : req.body.password
	}

	console.log(userLogin);

	validateUserLogin(userLogin, function(err, suc) {
		if(err){
			console.log(err);
			res.send("Login failed: " + err);
		}
		else{
			console.log(suc);
			//create session and send to loggedIn page
			createSession();
			sendToLoggedIn();
		}
	})

	
}

exports.user_signup = function (req, res) {

	var user = {
		username : req.body.username,
		mail : req.body.mail,
		password : req.body.password
	}
	console.log(user);

	createNewUser(user, function(error, success) {
		//error not null
		if( error ){
			console.log(error);
			res.send(error);
		}
		else{
			console.log(success);
			res.send(success);
		}
	});
}

function createNewUser(user, callback){
	try{
	var user_instance = new User({ username : user.username, mail: user.mail, password: user.password });
	}catch(err){
		//callback will be called with error message in parameter
		callback(err);
	}

	// Save the new model instance, passing a callback
        user_instance.save(function (err) {
        	//err = error messages defined in Schema of image (root/models/users.js)
              if (err) {
                  callback(err, 0);
              	}
			  else{
			  	var success = "New user '" +user.username + "' signed to our site '";
			  	//no error: value = 0
                  callback(0, success);
              	}
        });
}


function validateUserLogin(userLogin, callback){
	User.findOne({ "mail" : userLogin.mail}, function (err, user) {
		if (err) {
			callback(err, 0);
		}
		else if(userLogin.password !== user.password){ //Password of request does not match with the one of database
			var err = "Password does not match.";
			callback(err, 0);
		}
		else{
			var success = userLogin.mail + " is now logged in";
			callback(0, success);
		}

	});
}