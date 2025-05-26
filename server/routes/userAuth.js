import express from "express";
import { handleUserSignup, handleUserLogin, handleUserLogout } from "../controllers/userAuth.controller.js";
const userAuthRouter = express.Router();

userAuthRouter.post("/login", handleUserLogin);
userAuthRouter.post("/signup", handleUserSignup);
userAuthRouter.post("/logout", handleUserLogout);

export default userAuthRouter;