import express from 'express';
import {handleGetUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

// userRouter.post('/user', handleGetUser);
// userRouter.post('/signup', handleSignup);
// userRouter.post('/login', handleLogin);
// userRouter.delete('/delete', handleDelete);
userRouter.get('/', handleGetUser);

export default userRouter;