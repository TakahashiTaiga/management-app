var express = require('express');
var path = require('path');
var hh = require('../dbhandler/hanternoteHandler');
var th = require('../dbhandler/trapHandler');
var router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });


const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

function check(req,res) {
  if (req.session.login == null) {
    req.session.back = '/traps';
    res.redirect('/users/login');
    return true;
  } else {
    return false;
  }
}

/* GET home page. */
//hanternote
router.get('/', async function(req, res, next) {
  if (check(req,res)){ return };

    const user_id = req.session.login[0]["user_id"];
    const mail_address =req.session.login[0]["mail_address"];
    logger.debug(user_id);

    logger.debug("call getHanternoteAll");
    const hanternote_handler = new hh();
    const result = await hanternote_handler.getHanternoteAll(user_id);
    logger.debug("result:" + result);
/*
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
*/
  const data = {
    title:"ハンターノート",
    mail_address:mail_address,
    contents:result
  }
 
  //hanternote uses index.ejs
  res.render('hanternote/index', data);
});

// hanternote/record
router.get('/record/:hanternote_id', async function(req, res, next) {
  if (check(req,res)){ return };

  const hanternote_id = req.params.hanternote_id * 1;
  logger.debug(hanternote_id);

  logger.debug("call getHanternoteRecord");
  const hanternote_handler = new hh();
  const result = await hanternote_handler.getHanternoteRecord(hanternote_id);
  logger.debug("result:" + result);

  /*
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
  */
    // add recordID to url
    res.render('hanternote/record', result[0]);
});

//hanternote/add
router.get('/add/:trap_id', csrfProtection, async function(req, res, next) {
  if (check(req,res)){ return };

  const trap_id = req.params.trap_id * 1;
  logger.debug(trap_id);

  logger.debug("call getTrapIndividual");
  const trap_handler = new th();
  const result = await trap_handler.getTrapIndividual(trap_id);
  logger.debug("result:" + result);

  /*
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
  */

  const data = {
    "contents":result[0],
    csrfToken: req.csrfToken()
  }
  // add recordID to url
  res.render('hanternote/add', data);
});

//hanternote/add
router.post('/add/:trap_id', async function(req, res, next) {
  if (check(req,res)){ return };

  const trap_id = req.params.trap_id * 1;
  logger.debug(trap_id);
  const user_id = req.session.login[0]["user_id"];
  logger.debug(user_id);

  // get post data
  const new_name = req.body.new_name;
  const new_result = req.body.new_result;
  const new_extension_unit_id = req.body.new_extension_unit_id;
  const new_memo = req.body.new_memo;

  logger.debug(trap_id, new_name, new_result, new_extension_unit_id, new_memo);  
  
  logger.debug("call addHanternote");
  const hanternote_handler = new hh();
  const result = await hanternote_handler.addHnaternote(trap_id, new_name, new_result, new_extension_unit_id, new_memo);
  logger.debug("result:" + result);

  /*
  logger.debug("call deleteTrap")
  const trap_handler = new th();
  const result2 = await trap_handler.deleteTrap(trap_id);
  logger.debug("result:" + result2);
  */

  // redirect /hanternote/recode
  res.redirect('/hanternote');
});

//hanternote/edit
router.get('/edit/:hanternote_id', csrfProtection, async function(req, res, next) {
  if (check(req,res)){ return };
  const hanternote_id = req.params.hanternote_id * 1;

  logger.debug("call getHanternoteRecord");
  const hanternote_handler = new hh();
  const result = await hanternote_handler.getHanternoteRecord(hanternote_id);
  logger.debug("result:" + result[0], { csrfToken: req.csrfToken() });

/*
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
*/

  const data = {
    contents:result[0],
    csrfToken: req.csrfToken()
  }
  // add recordID to url
  res.render('hanternote/edit', data);
});

//hanternote/edit
router.post('/edit/:hanternote_id', async function(req, res, next) {
  if (check(req,res)){ return };
  const hanternote_id = req.params.hanternote_id * 1;
  
  // get post data
  const new_name = req.body.new_name;
  const new_result = req.body.new_result;
  const new_extension_unit_id = req.body.new_extension_unit_id;
  const new_memo = req.body.new_memo;

  // update db
  logger.debug("call updateHanternoteIndividual");
  const hanternote_handler = new hh();
  const result = await hanternote_handler.updateHanternoteIndividual(hanternote_id, new_extension_unit_id, new_name, new_memo, new_result);
  logger.debug("result:" + result);

  // redirect /hanternote/recode
  res.redirect('/hanternote');
});
  
//hanternote/delete
router.get('/delete/:hanternote_id', csrfProtection, async function(req, res, next) {
  if (check(req,res)){ return };
  const hanternote_id = req.params.hanternote_id * 1;

  logger.debug("call deleteHanternoteRecord");
  const hanternote_handler = new hh();
  const result = await hanternote_handler.deleteHanternoteRecord(hanternote_id);
  logger.debug("result:" + result[0]);


  // redirect /hanternote/
  res.redirect('/hanternote/');
});

module.exports = router;
