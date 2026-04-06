import { prisma } from '../config/db.js';

export const getFinancialSummary = async (month, year) => {
  // 1. Build the filter logic
  let whereClause = {};

  if (month && year) {
    // JavaScript dates are 0-indexed for months (January is 0, April is 3)
    // So if the user asks for Month 4 (April), we do 4 - 1
    const startDate = new Date(year, month - 1, 1); 
    
    // The end date is exactly the 1st of the NEXT month
    const endDate = new Date(year, month, 1); 

    whereClause = {
      date: {
        gte: startDate, // Greater than or equal to the 1st of the requested month
        lt: endDate     // Less than the 1st of the NEXT month
      }
    };
  }

  // 2. Fetch with the new filter
  const transactions = await prisma.transaction.findMany({
    where: whereClause
  });

  // 3. The math stays exactly the same!
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((tx) => {
    const amount = Number(tx.amount); 
    if (tx.type === 'INCOME') {
      totalIncome += amount;
    } else if (tx.type === 'EXPENSE') {
      totalExpense += amount;
    }
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
    totalTransactions: transactions.length
  };
};