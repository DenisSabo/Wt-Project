var express = require('express');
var router = express.Router();
var manage_users_controller = require('../controllers/manageUsersController.js');

//For uploading images to page, post JSON to "localhost:3000/user/:id".
router.get("/:id", manage_users_controller.user_get_id);

module.exports = router;