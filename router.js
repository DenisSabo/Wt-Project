var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
// controllers
var index_controller = require('./controllers/indexController');
var manage_users_controller = require('./controllers/manageUsersController.js');
var get_Account_Controller = require('./controllers/getAccountController');
// special routes
var filterImagesRoute = require("./routes/filterImages.js");
var manageImagesRoute = require("./routes/manageImages.js");
var oauth2Route = require('./routes/oauth2');

// serve static files in directory "public"
router.use('/public', express.static(__dirname + '/public'));
router.use('/uploads', express.static(__dirname + '/uploads'));

router.use('/images/filter', filterImagesRoute);
router.use("/images/manage", upload.single("file"));
router.use('/images/manage', manageImagesRoute);
router.use(oauth2Route.router);

router.get('/', index_controller.default);
router.get("/getAccount", get_Account_Controller.default);
router.get('/user/:id', manage_users_controller.user_get_id);

module.exports = router;