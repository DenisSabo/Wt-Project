var Image = require('../models/images.js');

//maybe we can/should put filterImagesController and manageImagesController together?

//Display image of all images, sorted by date (newest at first)
exports.image_recent_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Recent images list');
};

//Displays all images of one specific user/author
exports.image_user_list = function(req, res) {
	//for google authentification 
	var googleUserID = req.user.id;
	console.log(googleUserID);

	//mongoose query for getting all images of one specific user in one array
	Image.find({ 'user': googleUserID }, function(err, image){
		if(err){
			console.log(err);
			res.status(500).send("Something went wrong: %s", err).end();
			return false;
		}
		else{
			console.log("The image object looks like this %s", image);
			res.status(201).json(image).end();
		}
	});

	

};

//Displays images of one category, sorted by popularity or recent uploads?!?
exports.image_category_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Images of one category');
};

//Displays images sorted by popularity (Clicks + likes)
exports.image_popular_list = function(req, res) {
	Image.find({}, function(err, image){
		if(err){
			console.log(err);
			res.status(500).send("Something went wrong: %s", err).end();
			return false;
		}
		else{
			/** BUBBLESORT */
			//iterate through images
			for(var x = 0; x < (image.length - 1); x++){ //Worst Case: Most popular image is the last item of array. n-1 iterations needed for bringing it at it's right position
				//compare image[i] and next image[i+1]
				for(var i = 0; i < (image.length - 1 - x); i++){ //x is the limit of the right side. After each iteration the limit moves from the right side, on element down to the left side
					//sort images by popularity
					var popularityLevel = image[i].clicks + (image[i].likes * 5); // likes are more important than clicks, so other weighting
					var popularityLevelNext = image[i+1].clicks + (image[i + 1].likes * 5);
					if(popularityLevelNext > popularityLevel){
						//exchange: most popular will be in front
						var cache = image[i]; 
						image[i] = image[i + 1];
						image[i + 1] = cache;
					}
				}
			}

			console.log("Sorted array of objects %s", image);
			res.status(201).json(image).end();
		}
	})
};

//Displays images by given place
exports.image_place_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Images taken in one place');
};

