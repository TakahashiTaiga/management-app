const nodemailer = require("nodemailer");
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

class sendMail {
    constructor(){
        this.transporter = nodemailer.createTransport({
            
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            },
        });
    }
    
    sendGmail(mail_address, trap_name) {
        const data = {
            from: 'trapannouncement@gmail.com',
            to: mail_address,
            text: trap_name + "が作動しました",
            subject: trap_name + "が作動しました"
        }

        this.transporter.sendMail(data, (error, info) => {

            if(error) {          
              
              logger.debug(error); // エラー情報

            } else {
          
              logger.debug(info);  // 送信したメールの情報
              return info;
            }
          
        });
    }  
}

module.exports = sendMail;

/*
// メール送信関数
function sendMail (smtpData, mailData) {
 
    // SMTPサーバの情報をまとめる
    const transporter = NodeMailer.createTransport(smtpData);
   
    // メール送信
    transporter.sendMail(mailData, function (error, info) {
      if (error) {
        // エラー処理
        console.log(error);
      } else {
        // 送信時処理
        console.log('Email sent: ' + info.response);
      }
    });
  };
   
   
  // メイン処理
  function send_gmail(r) {
  
    // SMTP情報を格納（Gmailの場合）
    const smtpData = {
      host: 'smtp.gmail.com', // Gmailのサーバ
      port: '465',            // Gmailの場合　SSL: 465 / TLS: 587
      secure: true,           // true = SSL
      auth: {
        user: 'takahashitaiga22@gmail.com',  // メールアドレス（自身のアドレスを指定）
        pass: 'Takahashi22tiger'            // パスワード（自身のパスワードを指定）
      }
    };
  
    // 送信内容を作成
    const mailData = {
      from: 'test server', // 送信元名
      to: 'takahashitaiga22@gmail.com',                   // 送信先
      subject: 'test mail',                               // 件名
      text: 'date:' + Date.now() + '\nmessage: ' + r,       // 通常のメール本文
    };
   
    // メールを送信
    sendMail(smtpData, mailData);
  }
  */