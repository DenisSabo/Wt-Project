var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/indexController');

router.get('/', index_controller.default);

module.exports = router;