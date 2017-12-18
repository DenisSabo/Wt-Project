var Image = require('../models/images.js');

//QUESTION: maybe we can/should put filterImagesController and manageImagesController together?

//Handle image creation on post
exports.image_create_post = function(req, res) {
	res.send('NOT IMPLEMENTED: Image create on post');
};

//Handle image delete on delete
exports.image_delete_delete = function(req, res) {
	res.send('NOT IMPLEMENTED: Image delete on delete');
};


//Handles image changes on update (for example new title, or description)
exports.image_change_update = function(req, res) {
	res.send('NOT IMPLEMENTED: Image change on update');
};