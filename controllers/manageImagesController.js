var Image = require('../models/images.js');

//QUESTION: maybe we can/should put filterImagesController and manageImagesController together?

//Handle image creation on post
exports.image_create_post = function(req, res) {
	console.log("manageImagesController/image_create_post: " + req);
	res.send('NOT IMPLEMENTED: Image create on post');
};

//Handle image delete on delete
exports.image_delete_delete = function(req, res) {
	console.log("manageImagesController/image_delete_delete: " + req);
	res.send('NOT IMPLEMENTED: Image delete on delete');
};


//Handles image changes on put (for example new title, or description)
exports.image_change_put = function(req, res) {
	console.log("manageImagesController/image_change_put: " + req);
	res.send('NOT IMPLEMENTED: Image change on update');
};