import { Router } from 'express';
import usersRouter from './users';

// Init router and path
const router = Router();
// Add sub-routes
router.use('/users', usersRouter);
// Export the base-router
export default router;