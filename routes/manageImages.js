var express = require('express');
var router = express.Router();
var manage_images_controller = require('../controllers/manageImagesController.js');

//For uploading images to page, post JSON to "localhost:3000/images/manage".
router.post("/", manage_images_controller.image_create_post, function(){
	console.log("POST: /images/manage route");
});

//sends request to manageImagesControllers function image_delete_delete ...
router.delete("/:path", manage_images_controller.image_delete_delete);

//increments 'clicks' in database for specific entry with :id
router.put("/clicked/:id", manage_images_controller.image_increment_clicks);


module.exports = router;