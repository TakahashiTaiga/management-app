const mysql = require("mysql2/promise");
// const ih = require('./installHandler');
const hf = require("./handleFuncs");

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

class trapHandler {
 
    async getTrapAll(user_id) {
        const handle_func = new hf;
        const query = "SELECT trap.trap_id, trap.name, trap.state, trap.start, trap.last FROM trap, install WHERE trap.trap_id = install.trap_id and install.user_id = ?";
        const values = [user_id];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;

        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            const query = "SELECT trap.trap_id, trap.name, trap.state, trap.start, trap.last FROM trap, install WHERE trap.trap_id = install.trap_id and install.user_id = ?";
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

    async addTrap(user_id, extension_unit_id, name, memo, lat, lng){
        const handle_func = new hf;
        
        const result = await handle_func.executeAddTrap(user_id, extension_unit_id, name, memo, lat, lng);

        logger.debug(result);
        return result;

        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            const query = "INSERT INTO trap (extension_unit_id, name, memo) VALUES (?, ?, ?)";
            const [rows, fields] = await connection.execute(query, [extension_unit_id, name, memo]);
            const res = rows;
            logger.debug("res:" + res);
            logger.debug(JSON.stringify(res));

            const trap_id = res.insertId;
                
            await connection.end();
            logger.debug("closed db");

            // update install
            logger.debug("call setTrapId");
            const install_handler = new ih();
            const result = await install_handler.setTrapId(user_id, trap_id);
            logger.debug("result:" + result);

            return res;

        } catch(error) {
            logger.debug(error);
        }
        */
    }

    async getTrapIndividual(trap_id) {
        const handle_func = new hf;
        const query = "SELECT * FROM trap WHERE trap_id = ?";
        const values = [trap_id];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;

        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            const query = "SELECT * FROM trap WHERE trap_id = ?";
            const [rows, fields] = await connection.execute(query, [trap_id]);
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

    async getTrapByExtensionUnitID(extension_unit_id) {
        const handle_func = new hf;
        const query = "SELECT * FROM trap WHERE extension_unit_id = ?";
        const values = [extension_unit_id];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;

    }

    async updateTrapIndividual(trap_id, extension_unit_id, name, memo, lat, lng) {
        const handle_func = new hf;
        const query = "UPDATE trap SET extension_unit_id = ?, name = ?, memo = ?, lat = ?, lng = ? WHERE trap_id = ?";
        const values = [extension_unit_id, name, memo, lat, lng, trap_id];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;

        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            logger.debug(extension_unit_id, name, memo, trap_id);
            const query = "UPDATE trap SET extension_unit_id = ?, name = ?, memo = ? WHERE trap_id = ?";
            const [rows, fields] = await connection.execute(query, [extension_unit_id, name, memo, trap_id]);
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

    async updatePosedtData(trap_id, state, time, option) {
        const handle_func = new hf;

        // option = 1 -> also update trap.start
        if(option==0) {
            const query = "UPDATE trap SET state = ?, last = ? WHERE trap_id = ?";
            const values = [state, time, trap_id];
        
            const result = await handle_func.executeSingleQuery(query, values);
            logger.debug(result);
            return result;

        } else if(option==1){
            const query = "UPDATE trap SET state = ?, start = ?, last = ? WHERE trap_id = ?";
            const values = [state, time, time, trap_id];
        
            const result = await handle_func.executeSingleQuery(query, values);
            logger.debug(result);
            return result;
            
        }
        
        
    }

    async deleteTrap(trap_id) {
        const handle_func = new hf;
        const query = "DELETE from trap WHERE trap_id = ?";
        const values = [trap_id];
        
        const result = await handle_func.executeSingleQuery(query, values);

        logger.debug(result);
        return result;
        
        /*
        try {
            const connection = await mysql.createConnection(this.db_setting);
            logger.debug("connected db");

            logger.debug(trap_id);
            const query = "DELETE from trap WHERE trap_id = ?";
            const [rows, fields] = await connection.execute(query, [trap_id]);
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
}

module.exports = trapHandler;