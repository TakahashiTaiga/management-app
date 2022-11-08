var express = require('express')
var router = express.Router();
const sm = require('./sendMail');
const th = require('../dbhandler/trapHandler');
const ih = require('../dbhandler/installHandler');
const uh = require('../dbhandler/userHandler');
const dh = require('../dbhandler/dataHandler');
const log4js = require("log4js");
const { query } = require('express');
const logger = log4js.getLogger();
logger.level = "debug";

// /api/post
router.post('/post', async function (req, res, next) {
  const re = req.query;
  logger.debug("query:" + re);
  const post_data = re.post_data;
  logger.debug("body.post_data:" + post_data);

  
  // ポストされてきたデータの処理
  const post_extension_unit_ID = post_data.slice(0, 8);
  logger.debug("post_extension_unit_ID:" + post_extension_unit_ID);
  const post_trap_state = post_data.slice(8, 9);
  logger.debug("post_trap_state:" + post_trap_state);
  
  // 該当のtrapのデータを持ってくる
  logger.debug("call getTrapByExtensionUnitID");
  const trap_handler = new th();
  const trap = await trap_handler.getTrapByExtensionUnitID(post_extension_unit_ID);
  logger.debug("trap:"+trap);
 
  // もしpostされてきたデータのstateが1だったら
  if(post_trap_state=="1"){

    // postされてきたデータのstate=1　かつ　データベースのデータのstate=0　のとき
    if(trap[0]["state"]=="0") {
    
      // installからuser_idを持ってくる
      logger.debug("call getUserId");
      const install_handler = new ih();
      const user_id = await install_handler.getUserId(trap[0]["trap_id"]);
      logger.debug("user_id:"+user_id);
    
      // userからmail_addressをもってくる
      logger.debug("call getUserMaiiAddress");
      const user_handler = new uh();
      const mail_address = await user_handler.getUserMailAddress(user_id[0]["user_id"]);
      logger.debug("mail_address:"+mail_address);
    

      /* ここに通知機能を */
      // メールする
      logger.debug("call sendGmail");
      const send_mail = new sm();
      const mail = send_mail.sendGmail(mail_address[0]["mail_address"], trap[0]["name"]);
      logger.debug("result:" + mail);
      
    }
  }

  /* タイムスタンプを用意 */
  const date = new Date();
  const time = date.getFullYear() + ' ' + date.getMonth() + ' ' + date.getDate() + ' ' + date.getHours() + ' ' + date.getMinutes() + ' ' + date.getSeconds();
  
  let start = trap[0]["start"];
  // trapの最初の更新の時はstartも更新する
  if(start!=null) {
    logger.debug("call updatePostedData option 0")
    const result = await trap_handler.updatePosedtData(trap[0]["trap_id"], post_trap_state, time, 0);
    logger.debug("result:"+result);

  } else if(start==null) {
    start = time;
    logger.debug("call updatePostedData option 1")
    const result = await trap_handler.updatePosedtData(trap[0]["trap_id"], post_trap_state, time, 1);
    logger.debug("result:"+result);
  
  }
  
  /* api用にデータを突っ込む */
  logger.debug("call getDataAll");
  const data_handler = new dh();
  await data_handler.addData(start, time, trap[0]["lat"], trap[0]["lng"], trap[0]["state"]);
  
});

router.get('/get', async function (req, res, next) {
  // dataからデータを持ってくる
  logger.debug("call getDataAll");
  const data_handler = new dh();
  const data = await data_handler.getDataAll();

  res.status(200).send(data);
});

module.exports = router;