const mysql = require("mysql2/promise");
const hf = require("./handleFuncs");

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

class dataHandler {
 
    async getDataAll() {
        const handle_func = new hf;
        
        const result = await handle_func.getDataAll();

        logger.debug(result);
        return result;
    }

    async addData(start, update_time, lat, lng, state){
        const handle_func = new hf;
        const query = "INSERT INTO data (start, update_time, lat, lng, state) VALUES (?, ?, ?, ?, ?)";
        const values = [start, update_time, lat, lng, state];
        const res = await handle_func.executeSingleQuery(query, values);

        logger.debug(res);
    }

}

module.exports = dataHandler;