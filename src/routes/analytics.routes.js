import { Router } from 'express';
import * as AnalyticsController from '../controllers/analytics.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * 🔐 Security Layer
 * This middleware ensures that only authenticated users with a valid 
 * JWT token can access financial insights.
 */
router.use(authenticate);

/**
 * @route   GET /api/analysis/summary
 * @desc    Retrieve comprehensive financial dashboard metrics
 * @params  month (optional), year (optional)
 * @access  Private (Owner only)
 */
router.get('/summary', AnalyticsController.getDashboardStats);

/**
 * You can easily add more advanced analytics routes here in the future:
 * router.get('/trends', AnalyticsController.getWeeklyTrends);
 * router.get('/export', AnalyticsController.exportToCSV);
 */

export default router;