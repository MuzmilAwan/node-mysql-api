// src/cleaUp.js file

import { BlacklistRepository } from "#repository";

const INTERVAL_MS = 60 * 60 * 1000;

export const cleanUp = () => {

    setInterval(async () => {
        try {

            const deleted = await BlacklistRepository.deleteExpiredTokens();

            if (deleted > 0) {
                console.log(`Blacklist cleanup: removed ${deleted} expired token(s)`);
            }
        } catch (err) {
            console.error("Blacklist cleanup failed:", err.message);
        }
    }, INTERVAL_MS);

    console.log("Blacklist cleanup job scheduled every 1 hour");
};