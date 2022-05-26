const { checkPrime } = require('crypto');
var express = require('express');
var path = require('path');
var tdbh = require('../dbhandler/trapHandler');
var router = express.Router();

// login using session


/* GET home page. */
//trap
router.get('/', function(req, res, next) {
    var contents = {
        1:{
            trapID:1111,
            name:"わな1",
            state:"未作動",
            start:"2022:12:20:08:50",
            last:"2022:12:21:12:30"},
        2:{
            trapID:1112,
            name:"わな2",
            state:"未作動",
            start:"2022:12:20:08:50",
            last:"2022:12:21:12:30"},   
    }

    var data = {
        title:"わな一覧",
        contents:contents
    }
    // show table
    res.render('traps/index', data);
});

// /trap/add
router.get('/add', function(req, res, next) {

    // add installID to url
    res.render('traps/add');
});

// /trap/add
router.post('/add', function(req, res, next) {

    // redirect /
    res.redirect('/traps');
});

// trap/individual
router.get('/individual/:trapID', function(req, res, next) {
    const trapID = req.params.trapID * 1;
    if(trapID == "1111"){
        var data = {
            name:"わな1",
            extentionUnitID:"aaaa",
            state:"未作動",
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
            state:"未作動",
            start:"2022:12:20:08:50",
            last:"2022:12:21:12:30",
            memo:"くくりわな、再来週撤去",
            trapID:trapID
        }    
    }
  // add installID to url
  res.render('traps/individual', data);
});
  
// trap/edit
router.get('/edit/:trapID', function(req, res, next) {
    const trapID = req.params.trapID * 1;
    if(trapID == "1111"){
        var data = {
            name:"わな1",
            extentionUnitID:"aaaa",
            memo:"くくりわな、来週撤去",
            trapID:trapID
        }    
    }
    else if(trapID == "1112"){
        var data = {
            name:"わな2",
            extentionUnitID:"bbbb",
            memo:"くくりわな、再来週撤去",
            trapID:trapID
        }    
    }
  // redirect /trap
  res.render('traps/edit', data);
});

// trap/edit
router.post('/edit', function(req, res, next) {

    // redirect /trap
    res.redirect('/traps');
});
  

module.exports = router;
