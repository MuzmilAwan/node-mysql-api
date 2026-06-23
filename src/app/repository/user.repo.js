
import { getPool } from "#connection";

class UserRepository {

    static async findByEmail(email) {

        const pool = getPool();
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
        return rows[0] ?? null;
    }

    static async createUser({ name, email, password }) {

        const pool = getPool();
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
        );

        return { id: result.insertId, name, email };
    }
}

export default UserRepository;