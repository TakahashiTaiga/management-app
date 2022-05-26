const mysql = require("mysql");


class trapHandler {
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
 
    getTrapAll(user_id) {
        var res;
        this.userdb.query("select trap.trap_id, trap.name, trap.state, trap.first, trap.last from trap, install  where trap.trap_id = install.trap_id and install.user_id = ?;", [user_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    getTrapIndividual(trap_id) {
        var trap_id = trap_id;
        var res;
        this.connection.query("SELECT * FROM trap WHERE trap_id == ?", [trap_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    insertTrapRecord(name, extension_unit_id, location, memo){
        var name = name;
        var extension_unit_id = extension_unit_id;
        var location = location;
        var memo = memo;
        var res;
        this.connection.query("INSERT INTO trap", {name:name, extension_unit_id:extension_unit_id, location:location, memo:memo}, function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    updateTrapIndividual(trap_id, name, extension_unit_id, location, memo){
        var trap_id = trap_id;
        var name = name;
        var extension_unit_id = extension_unit_id;
        var location = location;
        var memo = memo;
        var res;
        this.connection.query("UPDATE trap SET  name= ? extension_unit_id = ? location = ? memo = ? WHERE trap_id = ?", [name, extension_unit_id, location, memo, trap_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }

    constantTrapUpdate(extension_unit_id, time, state){
        var extension_unit_id = extension_unit_id;
        var time = time;
        var state = state;
        var res;

        this.connection.query("UPDATE trap SET state = ? last = ? WHERE extension_unit_id = ?", [state, time, extension_unit_id], function(error, response) {
            if(error) throw error;
            res = response;
        });

        if(res.start==NULL){
            this.connection.query("UPDATE trap SET start = ? WHERE extension_unit_id = ?", [time, extension_unit_id], function(error, response) {
                if(error) throw error;
                res = response;
            });
        }
        return res;
    }

    deleteTrapIndividual(trap_id){
        var trap_id = trap_id;
        var res;
        this.connection.query("DELETE FROM trap WHERE trap_id = ?", [trap_id], function(error, response) {
            if(error) throw error;
            res = response;
        });
        return res;
    }
}