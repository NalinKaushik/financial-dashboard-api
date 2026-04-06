import * as DashboardService from '../services/dashboard.service.js';

export const getSummary = async (req, res, next) => {
  try {
    const filters = req.query; // e.g., { startDate: '...', endDate: '...' }
    const summary = await DashboardService.calculateSummary(filters);
    
    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryData = async (req, res, next) => {
  try {
    const categoryTotals = await DashboardService.getCategoryBreakdown(req.query);
    
    res.status(200).json({
      success: true,
      data: categoryTotals
    });
  } catch (error) {
    next(error);
  }
};

export const getTrendData = async (req, res, next) => {
  try {
    const trends = await DashboardService.getMonthlyTrends(req.query);
    
    res.status(200).json({
      success: true,
      data: trends
    });
  } catch (error) {
    next(error);
  }
};