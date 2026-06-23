import { UserService } from "#service";
import { ResponseHandler } from "#utils";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

class UserController {

    static async userSignup(req, res) {

        const { name, email, password } = req.body;
        const result = await UserService.userSignup(name, email, password);
        res.cookie("accessToken", result.token, COOKIE_OPTIONS);
        ResponseHandler.successHandler(res, result);

    }

    static async userLogin(req, res) {

        const { email, password } = req.body;
        const result = await UserService.userLogin(email, password);
        res.cookie("accessToken", result.token, COOKIE_OPTIONS);
        ResponseHandler.successHandler(res, result);

    }

    static async userLogout(req, res) {

        const result = await UserService.userLogout();
        res.clearCookie("accessToken", COOKIE_OPTIONS);
        ResponseHandler.successHandler(res, result);
    }

}

export default UserController;