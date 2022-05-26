const mysql = require("mysql");
const md5 = require("md5");


class installHandler {
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

    setTrapId(user_id, trap_id){
        var user_id = user_id;
        var trap_id = trap_id;
        var res;

        this.connection.query("INSERT INTO install", {user_id:user_id, trap_id:trap_id}, function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    setHanternoteId(install_id, hanternote_id){
        var install_id = install_id;
        var hanternote_id = hanternote_id;
        var res;

        this.connection.query("UPDATE install SET hanternote = ? WHERE install_id = ?", [hanternote_id, install_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    deleteUserIndividual(install_id){
        var install_id = install_id;
        var res;

        this.connection.query("DELETE FROM install WHERE install_id = ?", [install_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }
}