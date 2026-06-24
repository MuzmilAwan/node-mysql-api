// src/controller/user.controller.js
import { UserService } from "#service";
import { ResponseHandler } from "#utils";

const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
};

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
};

const clearAuthCookies = (res) => {
    res.clearCookie("accessToken", ACCESS_COOKIE_OPTIONS);
    res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS);
};

class UserController {

    static async userSignup(req, res) {
        const { name, email, password } = req.body;
        const result = await UserService.userSignup(name, email, password);
        setAuthCookies(res, result.accessToken, result.refreshToken);
        ResponseHandler.successHandler(res, { user: result.user });
    }

    static async userLogin(req, res) {
        const { email, password } = req.body;
        const result = await UserService.userLogin(email, password);
        setAuthCookies(res, result.accessToken, result.refreshToken);
        ResponseHandler.successHandler(res, { user: result.user });
    }

    static async refreshToken(req, res) {
        const incomingRefreshToken = req.cookies?.refreshToken;  // ← regular cookie
        const result = await UserService.refreshAccessToken(incomingRefreshToken);
        setAuthCookies(res, result.accessToken, result.refreshToken);
        ResponseHandler.successHandler(res, { message: "Token refreshed" });
    }

    static async userLogout(req, res) {
        const { id, jti, exp } = req.user;   // populated by verifyAccessToken
        const result = await UserService.userLogout(id, jti, exp);
        clearAuthCookies(res);
        ResponseHandler.successHandler(res, result);
    }
}

export default UserController;