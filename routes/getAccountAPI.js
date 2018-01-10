const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
    res.setHeader('Content-Rype', 'application/json');
    if (req.user) res.send(JSON.stringify(req.user));
    else res.send(JSON.stringify({"data": "undefined"}));
});

module.exports = router;

// JSON FILE:
// {
//      'id' : '123123123',
//      'displayname' : 'Carsten Chaos',
//      'image': 'https://....'
// }

// or 

// JSON FILE:
// {
//      'data' : 'undefined'
// }
