import { Router } from 'express';
import { getLogs, getUser, loginUser } from "../controllers/users"

const usersRouter = Router();

usersRouter.post('/test', getUser); // test route + auth

usersRouter.post('/login', loginUser);
usersRouter.post('/logs', getLogs);

export default usersRouter;