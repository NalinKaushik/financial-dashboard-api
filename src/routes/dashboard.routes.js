import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import * as DashboardController from '../controllers/dashboard.controller.js';

const router = Router();

// Analysts and Admins usually need these insights; Viewers might only see basic summaries
router.get('/summary', authenticate, authorize('VIEWER', 'ANALYST', 'ADMIN'), DashboardController.getSummary);
router.get('/categories', authenticate, authorize('ANALYST', 'ADMIN'), DashboardController.getCategoryData);
router.get('/trends', authenticate, authorize('ANALYST', 'ADMIN'), DashboardController.getTrendData);

export default router;