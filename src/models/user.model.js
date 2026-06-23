
import { getPool } from "#connection";

const initUserTable = async () => {

    const pool = getPool();
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name       VARCHAR(100) NOT NULL,
            email      VARCHAR(255) NOT NULL UNIQUE,
            password   VARCHAR(255) NOT NULL,
            created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);

    console.log("users table ready");
};

export default initUserTable;