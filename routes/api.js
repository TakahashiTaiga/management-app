var express = require('express')
var router = express.Router()
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

// /api/post
router.post('/post', function (req, res, next) {
  const re = req.body.post_data;
  logger.debug(re);
  
  

});

module.exports = router;