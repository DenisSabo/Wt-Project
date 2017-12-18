var Image = require('../models/images.js');

//maybe we can/should put filterImagesController and manageImagesController together?

//Display image of all images, sorted by date (newest at first)
exports.image_recent_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Recent images list');
};

//Displays all images of one specific user/author
exports.image_user_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Images list of one user');
};

//Displays images of one category, sorted by popularity or recent uploads?!?
exports.image_category_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Images of one category');
};

//Displays images sorted by popularity (Clicks + likes)
exports.image_popular_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Most popular images');
};

//Displays images by given place
exports.image_place_list = function(req, res) {
	res.send('NOT IMPLEMENTED: Images taken in one place');
};

//Maybe 