var express = require('express');
var router = express.Router();


/* GET Recipes listing. */
router.get('/', function(req, res, next) {
    res.send('Everything is ready to go!');
  });
  

// 

  module.exports = router;