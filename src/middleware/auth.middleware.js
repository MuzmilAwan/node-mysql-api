// src/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import { BlacklistRepository } from "#repository";
import ENV from "#env";

export const verifyAccessToken = async (req, res, next) => {

    const token = req.cookies?.accessToken;   // ← regular cookie

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised — no token",
        });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET);
    } catch {
        return res.status(401).json({
            success: false,
            message: "Unauthorised — invalid or expired token",
        });
    }

    const blacklisted = await BlacklistRepository.isBlacklisted(decoded.jti);
    if (blacklisted) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised — token has been revoked",
        });
    }

    req.user = decoded;   // { id, email, jti, iat, exp }
    next();
};