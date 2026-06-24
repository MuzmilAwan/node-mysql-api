// user.repo.js file
import { getPool } from "#connection";

class UserRepository {

    static async findByEmail(email) {

        const pool = getPool();
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
        return rows[0] ?? null;
    }

    static async findById(id) {

        const pool = getPool();
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);

        return rows[0] ?? null;
    }

    static async findByRefreshToken(refreshToken) {

        const pool = getPool();
        const [rows] = await pool.query("SELECT * FROM users WHERE refresh_token = ? LIMIT 1", [refreshToken]);

        return rows[0] ?? null;
    }

    static async createUser({ name, email, password }) {

        const pool = getPool();
        const [result] = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

        return { id: result.insertId, name, email };
    }

    static async saveRefreshToken(userId, refreshToken) {

        const pool = getPool();
        await pool.query("UPDATE users SET refresh_token = ? WHERE id = ?", [refreshToken, userId]);
    }

    static async clearRefreshToken(userId) {

        const pool = getPool();
        await pool.query("UPDATE users SET refresh_token = NULL WHERE id = ?", [userId]);
    }
}

export default UserRepository;