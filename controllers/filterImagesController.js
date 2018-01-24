var Image = require('../models/images.js');
var User = require('../models/users.js');

//maybe we can/should put filterImagesController and manageImagesController together?

//Display image of all images, sorted by date (newest at first)
exports.image_recent_list = function(req, res) {
	Image.find({}, null, {sort: {uploadTime: -1}}, function(err, docs) {
		if(err){
			res.status(500).end();
		}
		else{
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(docs);
		}
	});
};

//Displays all images of one specific user/author
exports.image_user_list = function(req, res) {

	User.findOne({ 'googleUserId' : req.user.id}, function(err, user){
		if(err) res.status(500).end("Something went wrong: %s", err);
		else{
			if(user){
				console.log("User was found: " + user._id);
				//mongoose query for getting all images of one specific user in one array
				Image.find({ 'user': user._id }, function(err, images){
					if(err){
						console.log(err);
						res.status(500).end("Something went wrong: %s", err);
					}
					else{
						res.setHeader('Content-Type', 'application/json');
						res.status(201).json(images).end();
					}
				});
			}
			else{
				res.status(404).end("This user does not exist");
			}
		}
	})
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
					var popularityLevel = image[i].clicks;
					var popularityLevelNext = image[i+1].clicks;
					if(popularityLevelNext > popularityLevel){
						//exchange: most popular will be in front
						var cache = image[i]; 
						image[i] = image[i + 1];
						image[i + 1] = cache;
					}
				}
			}

			res.setHeader('Content-Type', 'application/json');
			res.status(201).json(image).end();
		}
	})
};

//Displays images by given place
exports.image_place_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Images taken in one place');
};

exports.image_all = function(req, res){
	Image.find({}, function(err, image){
		if(err){
			res.status(500).end("Something went wrong: %s", err);
		}
		else{
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(image).end(); 
		}
	});
};



//only 9 images [page has 9 images]
exports.image_list_page = function(req, res){
	var pageNumber = req.body.page;
	pageNumber--; 

	if(pageNumber !== null && pageNumber !== undefined){
		Image.find({}, function(err, image){
			if(err){
				res.status(500),end("Something went wrong: %s", err);
			}
			else{
				res.setHeader('Content-Type', 'application/json');
				res.status(200).json(image).end(); 
			}
		}).skip(pageNumber * 9).limit(9);
	}
	else{
		res.status(404).end("Send page number in request body as 'page'");
	}
};



//only 9 per page (Better solution. Instead of requesting all images, you can request images, for one page)
exports.image_popular_list_page = function(req, res){
	//Problem: If somebody uploads new image, next page could show images, that were already seen by user. 
	//Solution: Get time of request for first page -> compare uploadTime of images with that

	var pageNumber = req.body.page;
	pageNumber--; 

	if(pageNumber !== null && pageNumber !== undefined){
			Image.find({}, function(err, image){
				if(err){
				console.log(err);
				res.status(500).send("Something went wrong: %s", err).end();
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
				res.setHeader('Content-Type', 'application/json');
				res.status(200).json(image).end();
			}
		}).skip(pageNumber * 9).limit(9);
	}
};
