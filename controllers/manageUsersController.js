var User = require('../models/users.js');

//maybe we can/should put filterImagesController and manageImagesController together?

//Gets user by googleId or objecId
exports.user_get_id = function(req, res) {
	var id = req.params.id;
	User.findOne({ "googleUserId" : id }, function(err, user){
		if(err){
			res.status(500).end(err);
		}
		else{
			if(user){
				res.status(200).send(user);
				res.end();
			}
			else{
				User.findOne({"_id" : id}, function(err, user){
					if(err){
						res.status(500).end(err);
					}
					else{
						if(user){
							res.status(200).send(user);
							res.end();
						}
						else{
							res.status(404).end("User does not exist");
						}
					}
				})
			}
		}
	});
};