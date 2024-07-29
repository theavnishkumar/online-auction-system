import express from 'express';
import { handleSignup, handleLogin } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', handleSignup);
userRouter.post('/login', handleLogin);

export default userRouter;