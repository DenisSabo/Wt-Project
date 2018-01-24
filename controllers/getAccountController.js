const express = require('express');
const path = require('path');
var User = require('../models/users.js');

exports.default = function (req, res){
    res.setHeader('Content-Rype', 'application/json');
    if (req.user) res.send(JSON.stringify(req.user));
    else res.send(JSON.stringify({"data": "undefined"}));
}
