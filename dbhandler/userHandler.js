const mysql = require("mysql2/promise");
const md5 = require("md5");
const hf = require('./handleFuncs');

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";


class userHandler {

    async findUser(mail, pass){
        let hash_pass = md5(pass);

        const handle_func = new hf;
        const query = "SELECT user_id FROM user WHERE mail_address = ? and pass = ?";
        const values = [mail, hash_pass];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;

        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            const query = "SELECT user_id FROM user WHERE mail_address = ? and pass = ?";
            const [rows, fields] = await connection.execute(query, [mail, hash_pass]);
            const res = rows;
            logger.debug("res:" + res);
                
            await connection.end();
            logger.debug("closed db");
            return res;

        } catch(error) {
            logger.debug(error);
        }
        */
    }

    async addUser(mail, pass){
        let hash_pass = md5(pass);

        const handle_func = new hf;
        const query = "INSERT INTO user (mail_address, pass) VALUES (?, ?)";
        const values = [mail, hash_pass];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;

        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            const query = "INSERT INTO user (mail_address, pass) VALUES (?, ?)";
            const [rows, fields] = await connection.execute(query, [mail, hash_pass]);
            const res = rows;
            logger.debug("res:" + res);

            await connection.end();
            logger.debug("closed db");
            return res;

        } catch(error) {
            logger.debug(error);
        }
        */
    }

    async getUserMailAddress(user_id){

        const handle_func = new hf;
        const query = "SELECT mail_address FROM user WHERE user_id = ?";
        const values = [user_id];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;

        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            const query = "SELECT mail_address FROM user WHERE user_id = ?";
            const [rows, fields] = await connection.execute(query, [user_id]);
            const res = rows;
            logger.debug("res:" + res);
                
            await connection.end();
            logger.debug("closed db");
            return res;

        } catch(error) {
            logger.debug(error);
        }
        */
    }

    async updateUser(user_id, mail, pass){
        let hash_pass = md5(pass);

        const handle_func = new hf;
        const query = "UPDATE user SET mail_address = ?, pass = ? WHERE user_id = ?";
        const values = [mail, hash_pass, user_id];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;
        
        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            const query = "UPDATE user SET mail_address = ?, pass = ? WHERE user_id = ?";
            const [rows, fields] = await connection.execute(query, [mail, hash_pass, user_id]);
            const res = rows;
            logger.debug("res:" + res);

            await connection.end();
            logger.debug("closed db");
            return res;

        } catch(error) {
            logger.debug(error);
        }
        */
    }

    async deleteUser(user_id) {
        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            // 保留 参照関係の下から順に消していく
            logger.debug(user_id);
            const query = "DELETE from user WHERE user_id = ?";
            const [rows, fields] = await connection.execute(query, [user_id]);
            const res = rows;
            logger.debug("res:" + res);
                
            await connection.end();
            logger.debug("closed db");
            return res;

        } catch(error) {
            logger.debug(error);
        }
        */
       return
    }
}


module.exports = userHandler;