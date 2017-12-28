var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/AuthController.js');


router.post("/login", auth_controller.user_login);

router.post("/signup", auth_controller.user_signup);

module.exports = router;