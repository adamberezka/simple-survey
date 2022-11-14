import { Router } from 'express';
import requierAuth from '../middleware/authMiddleware';
import surveyRouter from './surveys';
import usersRouter from './users';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/user', requierAuth, usersRouter);
router.use('/surveys', surveyRouter);

// Export the base-router
export default router;