const mysql = require("mysql");


class hanternoteHandler {
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
 
    //
    getHanternoteAll(user_id) {
        var user_id = user_id;
        var res;
        this.userdb.query("select hanternote.name, hanternote.result, hanternote.first, hanternote.last from hantenote, install  where hanternote.hanternote_id = install.hanternote_id and install.user_id = ?;", [user_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    getHanternoteIndividual(hanternote_id) {
        var hanternote_id = hanternote_id;
        var res;
        this.connection.query("SELECT * FROM hanternote WHERE hanternote_id == ?", [hanternote_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    insertHanternoteRecord(name, result, extension_unit_id, location, memo){
        var name = name;
        var result = result;
        var extension_unit_id = extension_unit_id;
        var location = location;
        var memo = memo;
        var res;
        this.connection.query("INSERT INTO hanternote", {name:name, result:result, extension_unit_id:extension_unit_id, location:location, memo:memo}, function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    updateHanternoteIndividual(hanternote_id, name, result, extension_unit_id, location, memo){
        var hanternote_id = hanternote_id;
        var name = name;
        var result = result;
        var extension_unit_id = extension_unit_id;
        var location = location;
        var memo = memo;
        var res;
        this.connection.query("UPDATE trap SET name= ? result = ? extension_unit_id = ? location = ? memo = ? WHERE hanternote_id = ?", [name, result, extension_unit_id, location, memo, hanternote_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    deleteHantenoteIndividual(hanternote_id){
        var hanternote_id = hanternote_id;
        var res;
        this.connection.query("DELETE FROM hanternote WHERE hanternote_id = ?", [hanternote_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }
}