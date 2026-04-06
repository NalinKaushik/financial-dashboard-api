import { prisma } from '../config/db.js';

export const calculateSummary = async (filters) => {
  // Use Prisma's groupBy to sum amounts based on the 'type' (INCOME vs EXPENSE)
  const aggregations = await prisma.transaction.groupBy({
    by: ['type'],
    where: { isDeleted: false },
    _sum: { amount: true }
  });

  let totalIncome = 0;
  let totalExpense = 0;

  aggregations.forEach(group => {
    const sum = Number(group._sum.amount) || 0;
    if (group.type === 'INCOME') totalIncome = sum;
    if (group.type === 'EXPENSE') totalExpense = sum;
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense
  };
};

export const getCategoryBreakdown = async (filters) => {
  // Get totals grouped by category (Useful for Donut/Pie charts)
  const categories = await prisma.transaction.groupBy({
    by: ['category', 'type'],
    where: { 
      isDeleted: false,
      type: 'EXPENSE' // Usually, users want to see where they are spending money
    },
    _sum: { amount: true },
    orderBy: { _sum: { amount: 'desc' } }
  });

  // Format it nicely for the frontend
  return categories.map(cat => ({
    category: cat.category,
    total: Number(cat._sum.amount)
  }));
};

export const getMonthlyTrends = async () => {
  // Note: For advanced time-series data (like grouping by month/week), 
  // raw SQL is often much more powerful and efficient in PostgreSQL than the ORM.
  const trends = await prisma.$queryRaw`
    SELECT 
      DATE_TRUNC('month', date) as month, 
      type, 
      SUM(amount) as total
    FROM "Transaction"
    WHERE "isDeleted" = false
    GROUP BY DATE_TRUNC('month', date), type
    ORDER BY month ASC;
  `;

  // Prisma returns BigInt for sums in queryRaw, so we map it to standard numbers
  return trends.map(t => ({
    month: t.month,
    type: t.type,
    total: Number(t.total)
  }));
};