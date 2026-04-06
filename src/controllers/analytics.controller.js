import * as AnalyticsService from '../services/analytics.service.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    // Extract the query parameters from the URL (e.g., ?month=4&year=2024)
    const { month, year } = req.query;

    // Pass them to our upgraded service
    const stats = await AnalyticsService.getFinancialSummary(month, year);
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};