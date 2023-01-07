import { Router } from 'express';
import { getLogs, loginUser } from "../controllers/users"

const usersRouter = Router();

usersRouter.post('/login', loginUser);
usersRouter.post('/logs', getLogs);

export default usersRouter;