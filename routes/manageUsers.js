var express = require('express');
var router = express.Router();
var manage_users_controller = require('../controllers/manageUsersController.js');

//For uploading images to page, post JSON to "localhost:3000/users/manage".
router.post("/", manage_users_controller.user_create_post, function(){
	console.log("Route: POST: /users/manage route");
});

router.get("/", manage_users_controller.user_get_user, function(){
	console.log("Route: GET: /users/manage route");
});

module.exports = router;