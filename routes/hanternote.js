var express = require('express');
var path = require('path');
var udbh = require('../dbhandler/hanternoteHandler');
var router = express.Router();

/* GET home page. */
//hanternote
router.get('/', function(req, res, next) {
  var contents = {
    1:{
        hanternoteID:1113,
        name:"わな3",
        result:"イノシシ",
        start:"2022:12:18:08:50",
        last:"2022:12:20:12:30"},
    2:{
        hanternoteID:1114,
        name:"わな4",
        result:"シカ",
        start:"2022:12:17:08:50",
        last:"2022:12:19:12:30"},   
  }

  var data = {
    title:"ハンターノート一覧",
    contents:contents
  }
 
  //hanternote uses index.ejs
  res.render('hanternote/index', data);
});

// hanternote/recode
router.get('/record/:hanternoteID', function(req, res, next) {
  const hanternoteID = req.params.hanternoteID * 1;
  if(hanternoteID == "1113"){
      var data = {
          name:"わな3",
          extentionUnitID:"aaaa",
          result:"イノシシ",
          start:"2022:12:18:08:50",
          last:"2022:12:20:12:30",
          memo:"雄、50kg",
          hanternoteID:hanternoteID
      }    
  }
  else if(hanternoteID == "1114"){
      var data = {
          name:"わな4",
          extentionUnitID:"bbbb",
          result:"シカ",
          start:"2022:12:17:08:50",
          last:"2022:12:19:12:30",
          memo:"メス、40kg",
          hanternoteID:hanternoteID
      }    
  }
    // add recordID to url
    res.render('hanternote/record', data);
});

//hanternote/add
router.get('/add/:trapID', function(req, res, next) {
  const trapID = req.params.trapID * 1;
    if(trapID == "1111"){
        var data = {
            name:"わな1",
            extentionUnitID:"aaaa",
            start:"2022:12:20:08:50",
            last:"2022:12:21:12:30",
            memo:"くくりわな、来週撤去",
            trapID:trapID
        }    
    }
    else if(trapID == "1112"){
        var data = {
            name:"わな2",
            extentionUnitID:"bbbb",
            start:"2022:12:20:08:50",
            last:"2022:12:21:12:30",
            memo:"くくりわな、再来週撤去",
            trapID:trapID
        }    
    }

  // add recordID to url
  res.render('hanternote/add', data);
});

//hanternote/add
router.post('/add', function(req, res, next) {
  // get post data

  // update db

  // redirect /hanternote/recode
  res.redirect('/hanternote');
});

//hanternote/edit
router.get('/edit/:hanternoteID', function(req, res, next) {
  const hanternoteID = req.params.hanternoteID * 1;
  if(hanternoteID == "1113"){
      var data = {
          name:"わな3",
          extentionUnitID:"aaaa",
          result:"イノシシ",
          memo:"雄、50kg",
          hanternoteID:hanternoteID
      }    
  }
  else if(hanternoteID == "1114"){
      var data = {
          name:"わな4",
          extentionUnitID:"bbbb",
          result:"シカ",
          memo:"メス、40kg",
          hanternoteID:hanternoteID
      }    
  }

  // add recordID to url
  res.render('hanternote/edit', data);
});

//hanternote/edit
router.post('/edit', function(req, res, next) {
  // get post data

  // update db

  // redirect /hanternote/recode
  res.redirect('/hanternote');
});
  

module.exports = router;
