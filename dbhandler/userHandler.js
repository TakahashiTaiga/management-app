const mysql = require("mysql");
const md5 = require("md5");


class userHandler {
    constructor(){
        this.connection = mysql.createClient({
            host: "local_host",
            user: "root",
            password: "JjqKwzHd5RnA",
            database: "mydb"        
        });
        
        this.connection.connect();
    } 

    desconnect(){
        this.connection.end();
    }

    getUserIndividual(mail) {
        var mail = mail;
        var res;
        this.connection.query("SELECT * FROM user WHERE mail_address == ?", [mail], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    insertUserIndividual(mail, pass){
        var mail = mail;
        var pass = md5(pass);
        var res;
        this.connection.query("INSERT INTO user", {mail_address:mail, pass:pass}, function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    updateUserIndividual(user_id, mail, pass){
        var user_id = user_id;
        var mail = mail;
        var pass = md5(pass);
        var res;
        this.connection.query("UPDATE user SET mail_address = ? pass = ? WHERE user_id = ?", [mail, pass, user_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    deleteUserIndividual(user_id){
        var user_id = user_id;
        var res;
        this.connection.query("DELETE FROM user WHERE user_id = ?", [user_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }
}