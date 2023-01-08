import { Router } from 'express';
import { donwloadLogs, getLogs, loginUser } from "../controllers/users"
import cors from 'cors';

const usersRouter = Router();

usersRouter.post('/login', loginUser);
usersRouter.post('/logs', getLogs);
usersRouter.post('/download-logs', cors({
  exposedHeaders: ['Content-Disposition'],
}), donwloadLogs);

export default usersRouter;