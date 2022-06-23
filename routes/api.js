var express = require('express')
var router = express.Router()
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

// const sqlite3 = require("mysql");
// const db = new sqlite3.Database('mydb.sqlite3');

// /api/post
router.post('/post', function (req, res, next) {
  const re = req;
  logger.debug(re);
  
  // time stamp
  /*
    todo "change db type from int to varchar" 
  */

  // update db
  /*
    
  */

});

module.exports = router;