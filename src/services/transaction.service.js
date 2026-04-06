import { prisma } from '../config/db.js';

export const getAll = async (filters) => {
  // 1. Destructure ALL possible filters, with defaults for pagination
  const { 
    type, 
    category, 
    startDate, 
    endDate, 
    page = 1, 
    limit = 10, 
    searchTerm = '' 
  } = filters;

  const skip = (page - 1) * limit;

  // 2. Build the ultimate dynamic query object
  const whereClause = {
    isDeleted: false, // Soft delete check is ALWAYS active
    ...(type && { type }),
    ...(category && { category }),
    ...(startDate || endDate ? {
      date: {
        ...(startDate && { gte: new Date(startDate) }),
        ...(endDate && { lte: new Date(endDate) })
      }
    } : {}),
    ...(searchTerm && {
      OR: [
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { category: { contains: searchTerm, mode: 'insensitive' } } // Fallback if they search category text
      ]
    })
  };

  // 3. Run the optimized dual-query
  const [transactions, totalRecords] = await Promise.all([
    prisma.transaction.findMany({
      where: whereClause,
      skip: skip,
      take: Number(limit),
      orderBy: { date: 'desc' }
    }),
    prisma.transaction.count({ where: whereClause })
  ]);

  return {
    transactions,
    meta: {
      totalRecords,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      hasNextPage: page * limit < totalRecords
    }
  };
};

export const create = async (data, userId) => {
  return await prisma.transaction.create({
    data: {
      ...data,
      date: new Date(data.date),
      createdBy: userId
    }
  });
};

export const update = async (id, data) => {
  return await prisma.transaction.update({
    where: { id },
    data: {
      ...data,
      ...(data.date && { date: new Date(data.date) })
    }
  });
};

export const softDelete = async (id) => {
  return await prisma.transaction.update({
    where: { id },
    data: { isDeleted: true }
  });
};