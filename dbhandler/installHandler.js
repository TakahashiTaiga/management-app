const mysql = require("mysql2/promise");
const hf = require("./handleFuncs");

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

class installHandler {

    async setTrapId(user_id, trap_id){
        const handle_func = new hf;
        const query = "INSERT INTO install (user_id, trap_id, hanternote_id) VALUES (?, ?, -999999)";
        const values = [user_id, trap_id];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;

        /*
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
        */
    }

    async setHanternoteId(trap_id, hanternote_id){
        const handle_func = new hf;
        const query = "UPDATE install SET hanternote_id = ? WHERE trap_id = ?";
        const values = [hanternote_id, trap_id];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;
        
        /*
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
        */
    }

    async getUserId(trap_id){
        const handle_func = new hf;
        const query = "SELECT user_id from install WHERE trap_id = ?";
        const values = [trap_id];

        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;
    }
}

module.exports = installHandler;