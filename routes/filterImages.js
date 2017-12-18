var express = require('express');
var router = express.Router();

//localhost/images/filter/popular 
router.get("/popular", (res, req) => {

})

//most recent images, uploaded on this page
router.get("/newest", (res, req) => {

})

//get images from categorie "nature"
router.get("/nature", (res, req) => {

})

//category urban
router.get("/urban", (res, req) => {

})

//category "other"
router.get("/other", (res, req) => {

})

module.exports = router;