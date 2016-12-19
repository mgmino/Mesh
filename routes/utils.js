var express = require('express');
var router = express.Router();

/* GET filename of contact picture */
router.get('/getPhotoName', function(req, res, next) {
  res.render('index');
});