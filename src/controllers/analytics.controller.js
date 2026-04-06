import * as AnalyticsService from '../services/analytics.service.js';

/**
 * Retrieves full dashboard analytics including totals, category breakdown, and recent activity.
 * Route: GET /api/analysis/summary?month=4&year=2026
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Extract query parameters
    const { month, year } = req.query;

    // 2. Default to the current month and year if not provided in the URL
    // This ensures the dashboard isn't empty when first loaded
    const targetMonth = month ? parseInt(month) : new Date().getMonth() + 1;
    const targetYear = year ? parseInt(year) : new Date().getFullYear();

    /**
     * 3. Call the Advanced Analytics Service
     * We pass req.user.id to ensure the data is scoped ONLY to the logged-in user.
     * Note: Make sure your Service function is named 'getDashboardStats' 
     * to match the aggregation logic we built earlier.
     */
    const stats = await AnalyticsService.getDashboardStats(
      req.user.id, 
      targetMonth, 
      targetYear
    );

    // 4. Return the consolidated response
    return res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    /**
     * 5. Pass errors to the Global Error Handler
     * This keeps the controller clean and ensures consistent JSON error responses.
     */
    next(error);
  }
};