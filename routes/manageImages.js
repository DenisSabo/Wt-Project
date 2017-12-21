var express = require('express');
var router = express.Router();
var manage_images_controller = require('../controllers/manageImagesController.js');

//For uploading images to page, post JSON to "localhost:3000/images/manage".
router.post("/", manage_images_controller.image_create_post, function(){
	console.log("POST: /images/manage router");
});

//sends request to manageImagesControllers function image_delete_delete ...
router.delete("/:id", manage_images_controller.image_delete_delete);
//access via req.params.id

router.put("/:id", manage_images_controller.image_change_put);


module.exports = router;