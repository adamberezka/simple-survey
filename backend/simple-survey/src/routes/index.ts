import { Router } from 'express';
import requireAuth from '../middleware/authMiddleware';
import surveyRouter from './surveys';
import usersRouter from './users';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/user', requireAuth, usersRouter);
router.use('/surveys', requireAuth, surveyRouter);

// Export the base-router
export default router;