import { Router } from 'express';
import { getUser, loginUser } from "../contollers/users"

const usersRouter = Router();

usersRouter.get('/user', getUser); // test route

usersRouter.get('/login', loginUser);

export default usersRouter;