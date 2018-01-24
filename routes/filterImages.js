var express = require('express');
var router = express.Router();
var filter_images_controller = require('../controllers/filterImagesController.js');

/*if get requests goes to "localhost/images/filter/popular", router will 
use function image_popular_list in filterImagesController */
router.get("/popular", filter_images_controller.image_popular_list);

//most recent images, uploaded on this page
router.get("/newest", filter_images_controller.image_recent_list);

//get images from any category 
router.get("/category/:category", filter_images_controller.image_category_list);

//get images that were taken at one specific place
router.get("/place/:place", filter_images_controller.image_place_list);

//get images of one specific user
router.get("/user/all", filter_images_controller.image_user_list);

//get one specific image
router.get("/user/:id", filter_images_controller.image_user_list);

//get all images
router.get("/all", filter_images_controller.image_all);



module.exports = router;