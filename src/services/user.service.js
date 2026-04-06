import { prisma } from '../config/db.js';

export const getProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { 
      id: userId 
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      // Do NOT include password here
    }
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    }
  });
};

/**
 * Permanently deletes a user from the database
 */
export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: id }
  });
};




export const fetchAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const changeRole = async (id, role) => {
  return await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, email: true, role: true } // Don't return the whole object
  });
};

export const toggleStatus = async (id, isActive) => {
  return await prisma.user.update({
    where: { id },
    data: { isActive },
    select: { id: true, email: true, isActive: true }
  });
};