const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res){
    res.sendfile(path.resolve('views/index.html'));
});

module.exports = router;