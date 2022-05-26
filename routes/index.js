var express = require('express');
var path = require('path');
var router = express.Router();

var tdbh = require('../dbhandler/trapHandler');

/* GET home page. */
router.get('/', function(req, res, next) {
  // get userID from session

  // get trap data from db

  res.render('index', { title: 'Express' });
});

module.exports = router;
