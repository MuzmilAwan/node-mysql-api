// blacklist.repo.js file
import { getPool } from "#connection";

class BlacklistRepository {


    static async addToBlacklist(jti, expiresAt) {
        const pool = getPool();
        await pool.query(
            "INSERT IGNORE INTO token_blacklist (jti, expires_at) VALUES (?, ?)",
            [jti, expiresAt]
        );
    }

    static async isBlacklisted(jti) {
        const pool = getPool();
        const [rows] = await pool.query(
            "SELECT 1 FROM token_blacklist WHERE jti = ? LIMIT 1",
            [jti]
        );
        return rows.length > 0;
    }

    static async deleteExpiredTokens() {
        const pool = getPool();
        const [result] = await pool.query(
            "DELETE FROM token_blacklist WHERE expires_at < NOW()"
        );
        return result.affectedRows;
    }
}

export default BlacklistRepository;