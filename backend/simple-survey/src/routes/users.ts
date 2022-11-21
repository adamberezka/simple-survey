import { Router } from 'express';
import { getUser, loginUser } from "../controllers/users"

const usersRouter = Router();

usersRouter.post('/test', getUser); // test route + auth

usersRouter.post('/login', loginUser);

export default usersRouter;