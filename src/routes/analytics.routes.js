import { Router } from 'express';
import * as AnalyticsController from '../controllers/analytics.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Protect the analytics route - must have a valid token!
router.use(authenticate);

router.get('/summary', AnalyticsController.getDashboardStats);

export default router;