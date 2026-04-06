import { prisma } from '../config/db.js';

/**
 * 📊 Dashboard Aggregation Service
 * Uses SQL-level grouping for performance and accuracy.
 */
export const getDashboardStats = async (userId, month, year) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  // 1. Get Totals via Aggregation
  const totals = await prisma.transaction.groupBy({
    by: ['type'],
    where: {
      createdBy: userId,
      isDeleted: false,
      date: { gte: startDate, lt: endDate }
    },
    _sum: { amount: true }
  });

  // 2. Get Category Breakdown (The "Chart" data)
  const categoryData = await prisma.transaction.groupBy({
    by: ['category'],
    where: {
      createdBy: userId,
      isDeleted: false,
      date: { gte: startDate, lt: endDate }
    },
    _sum: { amount: true },
    orderBy: { _sum: { amount: 'desc' } }
  });

  // 3. Get Recent Activity (Top 5)
  const recentActivity = await prisma.transaction.findMany({
    where: {
      createdBy: userId,
      isDeleted: false
    },
    orderBy: { date: 'desc' },
    take: 5
  });

  // 4. Format numbers for clean JSON response
  const income = Number(totals.find(t => t.type === 'INCOME')?._sum.amount || 0);
  const expense = Number(totals.find(t => t.type === 'EXPENSE')?._sum.amount || 0);

  return {
    summary: {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    },
    categoryBreakdown: categoryData.map(item => ({
      category: item.category,
      amount: Number(item._sum.amount)
    })),
    recentActivity
  };
};