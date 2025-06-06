import express from 'express';
import { handleGetUser, handleChangePassword, getLoginHistory } from '../controllers/user.controller.js';

const userRouter = express.Router();

// userRouter.post('/user', handleGetUser);
// userRouter.post('/signup', handleSignup);
// userRouter.post('/login', handleLogin);
// userRouter.delete('/delete', handleDelete);
userRouter.get('/', handleGetUser);
userRouter.patch("/", handleChangePassword);
userRouter.get("/logins", getLoginHistory)

export default userRouter;