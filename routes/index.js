const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res){
    if (req.user) res.sendfile(path.resolve('views/LoggedIn.html'));
    else res.sendfile(path.resolve('views/index.html'));
});

module.exports = router;