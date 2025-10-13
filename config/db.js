const mysql = require('mysql2'); 
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

const TRANSIENT = new Set([
    'ETIMEDOUT',
    'ECONNRESET',
    'PROTOCOL_CONNECTION_LOST',
    'EPIPE'
]);

class DbService {
    constructor() {
        
this._pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    connectionLimit: Number(process.env.DB_POOL_LIMIT) || 10,
    waitForConnections: true,
    connectTimeout: 20000, // OK
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    maxIdle: 2,
    idleTimeout: 60000
}).promise();


        this._keepAliveTimer = setInterval(async () => {
            try {
                const conn = await this._pool.getConnection();
                await conn.ping();
                conn.release();
            } catch (e) {
                console.warn('mysql keepalive:', e.code || e.message);
            }
        }, 120_000);
        this._keepAliveTimer.unref?.();
    }

    static getDbServiceInstance() {
        if (!instance) instance = new DbService();
        return instance;
    }

    get pool() { return this._pool; }

    async test() { await this._pool.query('SELECT 1'); }

    async query(sql, params = []) {
        try {
            const [rows] = await this._pool.query(sql, params);
            return rows;
        } catch (err) {
            if (TRANSIENT.has(err.code)) {
                try {
                    const conn = await this._pool.getConnection();
                    await conn.ping().catch(() => {});
                    conn.release();
                } catch(_) {}
                const [rows] = await this._pool.query(sql, params);
                return rows;
            }
            console.error('Error en la consulta:', err);
            throw err;
        }
    }

    async withTransaction(workFn) {
        const conn = await this._pool.getConnection();
        try {
            await conn.beginTransaction();
            const result = await workFn(conn); 
            await conn.commit();
            return result;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }

    async close() {
        clearInterval(this._keepAliveTimer);
        await this._pool.end();
    }
}

module.exports = DbService;