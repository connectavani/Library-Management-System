import express from 'express';
import {
  loginUser,
  logoutUser,
  updateAccessToken,
  getAllUser,
  getUserById,
  userAction,
  registrationsUser,
} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
;

const userRouter = express.Router();

userRouter.post('/create', registrationsUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout', isAuthenticated, logoutUser);

userRouter.get('/refresh', updateAccessToken);

userRouter.get('/', getAllUser);

userRouter.get('/:userId', getUserById);

userRouter.post('/action/:userId/:isAuthenticated', userAction);



export default userRouter;
