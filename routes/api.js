var express = require('express')
var router = express.Router()

// const sqlite3 = require("mysql");
// const db = new sqlite3.Database('mydb.sqlite3');

// /api/post
router.post('/post', function (req, res, next) {
  const re = req.query;
  // const trap = re.parentID + re.childID; delete parent
  const trap = re.childID;
  const status = re.status;

  // time stamp
  /*
    todo "change db type from int to varchar" 
  */

  // update db
  /*
    
  */

});

module.exports = router