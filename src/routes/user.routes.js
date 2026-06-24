// user.routes.js file

import express from "express";
import { UserController } from "#controller";
import { verifyAccessToken, validate, signupSchema, loginSchema } from "#middleware";

const userRouter = express.Router();

userRouter.route("/signup").post(validate(signupSchema), UserController.userSignup);
userRouter.route("/login").post(validate(loginSchema), UserController.userLogin);
userRouter.route("/refresh").post(UserController.refreshToken);
userRouter.route("/logout").post(verifyAccessToken, UserController.userLogout);

export default userRouter;