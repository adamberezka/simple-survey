import { Router } from 'express';
import { getUser, loginUser } from "../contollers/users"
import requierAuth from '../middleware/authMiddleware';

const usersRouter = Router();

usersRouter.get('/test', requierAuth, getUser); // test route + auth

usersRouter.get('/login', loginUser);

export default usersRouter;