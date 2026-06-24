// dbConnection.js file
import mysql from "mysql2/promise";
import ENV from "#env";

let pool;

const connectDB = async () => {

    pool = mysql.createPool({
        host: ENV.HOST,
        user: ENV.USER,
        password: ENV.PASSWORD,
        database: ENV.DB_NAME,
        waitForConnections: true,
        connectionLimit: 20,
    });


    const conn = await pool.getConnection();
    console.log(`MySQL connected database: ${ENV.DB_NAME}`);
    conn.release();

    return pool;
};

export const getPool = () => {

    if (!pool) throw new Error("DB not initialised. Call connectDB() first.");
    return pool;
};

export default connectDB;