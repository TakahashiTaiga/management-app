var express = require('express');
var path = require('path');
var tdbh = require('../dbhandler/userHandler');
var router = express.Router();

/* GET home page. */
// /users/login
router.get('/login', function(req, res, next) {
  // get user ID
  var data = {
    title:'ログイン',
    content:'メールアドレスとパスワードを入力して下さい。'
  }
  res.render('users/login', data);
});

// /users/login
router.post('/login', function(req, res, next) {
  // get post data
  var mailaddress = req.body.mailaddress;
  var pass = req.body.pass;
  
  // search db 

  res.redirect('/traps');
});

// /users/add
router.get('/add', function(req, res, next) {
  var data = {
    title:'新規登録',
    content:'新規登録するメールアドレスとパスワードを入力下さい。'
  }
  res.render('users/add', data);
});

// /users/add
router.post('/add', function(req, res, next) {
  // get post data
  var mailaddress = req.body.mailaddress;
  var pass = req.body.pass;

  // update db

  // redirect /
  res.redirect('/users/login');
});

// /users/edit
router.get('/edit', function(req, res, next) {
  // user mailaddress from db
  var old_mailaddress = 'aaa@bb.cc'

  var data = {
    title:'ユーザー情報の編集',
    content:'新しいメールアドレスとパスワードを入力下さい。',
    old_mailaddress:old_mailaddress
  }

  // update db

  // redirect /
  res.render('users/edit', data);
});

// /users/edit
router.get('/edit', function(req, res, next) {
  // get post data
  var newmailaddress = req.body.newmailaddress;
  var newpass = req.body.newpass;

  // update db

  // redirect /
  res.redirect('/users/login');
});

module.exports = router;
