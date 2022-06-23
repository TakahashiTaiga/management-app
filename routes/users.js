const express = require('express');
const path = require('path');
const uh = require('../dbhandler/userHandler');
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

var router = express.Router();

/* GET home page. */
// /users/login
router.get('/login', function(req, res, next) {
  const data = {
    title:'ログイン',
    content:'メールアドレスとパスワードを入力して下さい。'
  }
  res.render('users/login', data);
});

// /users/login
router.post('/login', async function(req, res, next) {
  // get post data
  const mail_address = req.body.mail_address;
  const pass = req.body.password;

  if(mail_address==null || pass == null){
    const data = {
      title:'ログイン',
      content:'名前かパスワードに問題があります。再度入力して下さい。'
    }

    res.render('users/login', data);
  }
  
  logger.debug("call findUser");
  logger.debug(mail_address, pass);
  
  const user_handler = new uh();
  const result = await user_handler.findUser(mail_address, pass);
  logger.debug("result:" + result);
  
  if(result[0]!=null){
    req.session.login = result;
    let back = req.session.back;
    if (back == null){
      back = '/traps';
    }
    res.redirect(back);
  }else{
    const data = {
      title:'ログイン',
      content:'名前かパスワードに問題があります。再度して入力下さい。'
    }

    res.render('users/login', data);
  }
});

// /users/add
router.get('/add', function(req, res, next) {
  const data = {
    title:'新規登録',
    content:'新規登録するメールアドレスとパスワードを入力下さい。'
  }
  res.render('users/add', data);
});

// /users/add
router.post('/add', async function(req, res, next) {
  // get post data
  const mail_address = req.body.mail_address;
  const pass = req.body.password;

  logger.debug("called addUser");
  const user_handler = new uh();
  const result = await user_handler.addUser(mail_address, pass);
  logger.debug("result:" + result);

  // redirect /users/login
  res.redirect('/users/login');
});

// /users/edit
router.get('/edit', async function(req, res, next) {
  if (check(req,res)){ return };
  // user mailaddress from db
  const user_id = req.session.login[0]["user_id"];
  
  logger.debug("call getUserAddress")
  const user_handler = new uh();
  const result = await user_handler.getUserMailAddress(user_id);
  logger.debug("result:" + result);


  const data = {
    title:'ユーザー情報の編集',
    content:'新しいメールアドレスとパスワードを入力下さい。',
    old_mail_address:result[0]["mail_address"]
  }

  // redirect /
  res.render('users/edit', data);
});

// /users/edit
router.post('/edit', async function(req, res, next) {
  if (check(req,res)){ return };
  // get post data
  const new_mailaddress = req.body.new_mail_address;
  const new_pass = req.body.new_password;
  const user_id = req.session.login[0]["user_id"];
  logger.debug(user_id, new_mailaddress, new_pass);
  // update db
  logger.debug("called updateUser");
  const user_handler = new uh();
  const result = await user_handler.updateUser(user_id, new_mailaddress, new_pass);
  logger.debug("result:" + result);

  // redirect /
  res.redirect('/users/login');
});

// /users/delete
router.get('/delete', async function(req, res, next) {
  if (check(req,res)){ return };
  // user mailaddress from db
  const user_id = req.session.login[0]["user_id"];
  
  logger.debug("call getUserAddress")
  const user_handler = new uh();
  const result = await user_handler.deleteUser(user_id);
  logger.debug("result:" + result);

  // redirect /
  res.redirect('/users/login');
});

module.exports = router;
