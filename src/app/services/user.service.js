// src/app/services/user.service.js
import { UserRepository } from "#repository";
import { BlacklistRepository } from "#repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import ENV from "#env";

const SALT_ROUNDS = 10;

const newUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
});

const generateAccessToken = (user) => {
    const jti = uuidv4();
    const token = jwt.sign(
        { id: user.id, email: user.email, jti },
        ENV.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
    );
    return { token, jti };
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id },
        ENV.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

class UserService {

    static async userSignup(name, email, password) {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) throw new Error("Email is already registered");

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await UserRepository.createUser({ name, email, password: hashedPassword });

        const { token: accessToken } = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await UserRepository.saveRefreshToken(user.id, refreshToken);
        return { user: newUser(user), accessToken, refreshToken };
    }

    static async userLogin(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error("Invalid email or password");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid email or password");

        const { token: accessToken } = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await UserRepository.saveRefreshToken(user.id, refreshToken);
        return { user: newUser(user), accessToken, refreshToken };
    }

    static async refreshAccessToken(incomingRefreshToken) {
        if (!incomingRefreshToken) throw new Error("Refresh token missing");

        let decoded;
        try {
            decoded = jwt.verify(incomingRefreshToken, ENV.JWT_REFRESH_SECRET);
        } catch {
            throw new Error("Invalid or expired refresh token");
        }

        const user = await UserRepository.findByRefreshToken(incomingRefreshToken);
        if (!user) throw new Error("Refresh token not recognised");

        const { token: accessToken } = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        await UserRepository.saveRefreshToken(user.id, newRefreshToken);
        return { accessToken, refreshToken: newRefreshToken };
    }

    static async userLogout(userId, jti, tokenExp) {
        const expiresAt = new Date(tokenExp * 1000);   // ← was * 10000, now fixed
        await BlacklistRepository.addToBlacklist(jti, expiresAt);
        await UserRepository.clearRefreshToken(userId);
        return { message: "Logged out successfully" };
    }
}

export default UserService;