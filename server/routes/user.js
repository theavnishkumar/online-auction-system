import express from 'express';
import { handleSignup, handleLogin, handleDelete, handleGetUser, handleUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/user', handleGetUser);
userRouter.post('/signup', handleSignup);
userRouter.post('/login', handleLogin);
userRouter.delete('/delete', handleDelete);
userRouter.get('/:userId', handleUser);

export default userRouter;