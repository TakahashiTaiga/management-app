const express = require('express');
const path = require('path');
const th = require('../dbhandler/trapHandler');
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

// login using session
function check(req,res) {
    if (req.session.login == null) {
      req.session.back = '/traps';
      res.redirect('/users/login');
      return true;
    } else {
      return false;
    }
}

function window_check() {
    if(window.innerWidth>1023){
        return true;
    } else {
        return false;
    }
}

const router = express.Router();

/* GET home page. */
//trap
router.get('/', async function(req, res, next) {
    if (check(req,res)){ return };

    const user_id = req.session.login[0]["user_id"];
    const mail_address = req.session.login[0]["mail_address"]
    logger.debug(user_id);


    logger.debug("call getTrapAll");
    const trap_handler = new th();
    const result = await trap_handler.getTrapAll(user_id);
    logger.debug("result:" + result);

    const data = {
        title:"ホーム",
        window_type:window_check,
        mail_address:mail_address,
        contents:result
    }
    // show table
    res.render('traps/index', data);
});

// /trap/add
router.get('/add', function(req, res, next) {
    if (check(req,res)){ return };

    const data = {
        window_type:window_check
    }
    res.render('traps/add', data);
});

// /trap/add
router.post('/add', async function(req, res, next) {
    if (check(req,res)){ return };
    const name = req.body.name;
    const extension_unit_id = req.body.extension_unit_id;
    const memo = req.body.memo;
    const user_id = req.session.login[0]["user_id"];

    logger.debug("call addTrap");
    const trap_handler = new th();
    const result = await trap_handler.addTrap(user_id, extension_unit_id, name, memo);
    logger.debug("result:" + result);

    // redirect /
    res.redirect('/traps');
});

// trap/individual
router.get('/individual/:trapID', async function(req, res, next) {
    if (check(req,res)){ return };
    const trap_id = req.params.trapID * 1;
    
    logger.debug("call getTrapIndividual");
    const trap_handler = new th();
    const result = await trap_handler.getTrapIndividual(trap_id);
    logger.debug("result:" + JSON.stringify(result));
/*
    const data = {
        trap_id:result[0]["trap_id"],
        name:result[0]["name"],
        extension_unit_id:result[0]["extension"],
        state:result[0]["trap_id"],
        start:result[0]["trap_id"],
        last:result[0]["trap_id"],
        memo:result[0]["trap_id"],
    }
*/
    
    const data = {
        window_type:window_check,
        contents:result[0]
    }

    // add installID to url
    res.render('traps/individual', data);
});
  
// trap/edit
router.get('/edit/:trap_id', async function(req, res, next) {
    if (check(req,res)){ return };
    const trap_id = req.params.trap_id * 1;

    logger.debug("call getTrapIndividual")
    const trap_handler = new th();
    const result = await trap_handler.getTrapIndividual(trap_id);
    logger.debug("result:" + result);

    const data = {
        window_type:window_check,
        contents:result[0]
    }
    // redirect /trap
    res.render('traps/edit', data);
});

// trap/edit
router.post('/edit/:trap_id', async function(req, res, next) {
    if (check(req,res)){ return };
    const trap_id = req.params.trap_id * 1;
    const name = req.body.new_name;
    const extension_unit_id = req.body.new_extension_unit_id;
    const memo = req.body.new_memo;
    logger.debug(trap_id, extension_unit_id, name, memo);

    logger.debug("call updateTrapIndividual")
    const trap_handler = new th();
    const result = await trap_handler.updateTrapIndividual(trap_id, extension_unit_id, name, memo);
    logger.debug("result:" + result);

    // redirect /trap
    res.redirect('/traps');
});
  
// trap/delete/:trap_id
router.get('/delete/:trap_id', async function(req, res, next) {
    if (check(req,res)){ return };
    const trap_id = req.params.trap_id * 1;

    logger.debug("call deleteTrap")
    const trap_handler = new th();
    const result = await trap_handler.deleteTrap(trap_id);
    logger.debug("result:" + result);

    const data = {
        window_type:window_check
    }
    // redirect /trap/
    res.redirect('/traps/', data);
});

module.exports = router;
