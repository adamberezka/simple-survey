import { Router } from 'express';
import { getUser } from "../contollers/users"

const usersRouter = Router();

usersRouter.get('/user', getUser);

export default usersRouter;