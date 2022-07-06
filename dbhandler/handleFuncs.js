const mysql = require("mysql2/promise");
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

class handleFuncs {
    constructor(){
        this.db_setting = {
            
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE            
        };
        
    } 
    
    async executeSingleQuery(query, values) {
        let connection;
        let res;
        try {
            connection = await mysql.createConnection(this.db_setting)
            await connection.beginTransaction();
            const [row] = await connection.execute(query, values);
            await connection.commit();
            res = row;
            logger.debug("res:" + res);
        } catch (error) {
            await connection.rollback();
            logger.debug("rollback error:" + error);
        } finally {
            await connection.end();
            logger.debug("closed db");
            return res;
        }
    }

    async executeAddTrap(user_id, extension_unit_id, name, memo) {
        let connection;
        let res;
        try {
            connection = await mysql.createConnection(this.db_setting)
            await connection.beginTransaction();
            
            const query1 = "INSERT INTO trap (extension_unit_id, name, memo) VALUES (?, ?, ?)";
            const [row1] = await connection.execute(query1, [extension_unit_id, name, memo]);
            logger.debug("row1:" + row1);
            
            const trap_id = row1.insertId;
            
            const query2 = "INSERT INTO install (user_id, trap_id, hanternote_id) VALUES (?, ?, -999999)";
            const [row2] = await connection.execute(query2, [user_id, trap_id]);
            logger.debug("row2:" + row2);

            await connection.commit();
            res = row2;
            logger.debug("res:" + res);
        } catch (error) {
            await connection.rollback();
            logger.debug("rollback error:" + error);
        } finally {
            await connection.end();
            logger.debug("closed db");
            return res;
        }
    }

    async executeAddHanternote(trap_id, name, result, extension_unit_id, memo) {
        let connection;
        let res;
        try {
            connection = await mysql.createConnection(this.db_setting)
            await connection.beginTransaction();
            
            const query1 = "SELECT * FROM trap WHERE trap_id = ?";
            const [row1] = await connection.execute(query1, [trap_id]);
            logger.debug("row1:" + row1);
            
            const query2 = "INSERT INTO hanternote (name, extension_unit_id, start, last, memo, result) VALUES (?, ?, ?, ?, ?, ?)";
            const [row2] = await connection.execute(query2, [name, extension_unit_id, row1[0]["start"], row1[0]["last"], memo, result]);
            logger.debug("row2:" + row2);

            const hanternote_id = row2.insertId;

            const query3 = "UPDATE install SET hanternote_id = ? WHERE trap_id = ?";
            
            const [row3] = await connection.execute(query3, [hanternote_id, trap_id]);
            logger.debug("row3:" + row3);

            const query4 = "DELETE from trap WHERE trap_id = ?";
            
            const [row4] = await connection.execute(query4, [trap_id]);
            logger.debug("row4:" + row4);


            await connection.commit();
            res = row2;
            logger.debug("res:" + res);
        } catch (error) {
            await connection.rollback();
            logger.debug("rollback error:" + error);
        } finally {
            await connection.end();
            logger.debug("closed db");
            return res;
        }
    }
}

module.exports = handleFuncs;