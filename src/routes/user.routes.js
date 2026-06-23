 
import express from "express";
const userRouter = express.Router();
import { UserController } from "#controller";


userRouter.route("/signup").post(UserController.userSignup);
userRouter.route("/login").post(UserController.userLogin);
userRouter.route("/logout").post(UserController.userLogout); 

export default userRouter;