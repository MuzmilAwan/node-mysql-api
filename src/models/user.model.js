// src/models/user.model.js
import { getPool } from "#connection";

export const userTable = async () => {
    const pool = getPool();

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id            INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name          VARCHAR(100) NOT NULL,
            email         VARCHAR(255) NOT NULL UNIQUE,
            password      VARCHAR(255) NOT NULL,
            refresh_token TEXT         DEFAULT NULL,
            created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
            updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log("users table ready");

    await pool.query(`
        CREATE TABLE IF NOT EXISTS token_blacklist (
            id         INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
            jti        VARCHAR(36) NOT NULL UNIQUE,
            expires_at TIMESTAMP   NOT NULL,
            created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_jti        (jti),
            INDEX idx_expires_at (expires_at)
        )
    `);
    console.log("token_blacklist table ready");
};