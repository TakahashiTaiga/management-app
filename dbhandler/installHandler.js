const mysql = require("mysql2/promise");

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

class installHandler {
    constructor(){
        this.db_setting = {
            host: "localhost",
            user: "root",
            password: "JjqKwzHd5RnA",
            database: "mydb"       
        };
    } 

    async setTrapId(user_id, trap_id){
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            const query = "INSERT INTO install (user_id, trap_id, hanternote_id) VALUES (?, ?, -999999)";
            const [rows, fields] = await connection.execute(query, [user_id, trap_id]);
            const res = rows;
            logger.debug("res:" + res);

            await connection.end();
            logger.debug("closed db");
            return res;

        } catch(error) {
            logger.debug(error);
        }
    }

    async setHanternoteId(trap_id, hanternote_id){
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            logger.debug(trap_id, hanternote_id);
            const query = "UPDATE install SET hanternote_id = ? WHERE trap_id = ?";
            const [rows, fields] = await connection.execute(query, [hanternote_id, trap_id]);
            const res = rows;
            logger.debug("res:" + res);

            await connection.end();
            logger.debug("closed db");
            return res;

        } catch(error) {
            logger.debug(error);
        }
    }
}

module.exports = installHandler;