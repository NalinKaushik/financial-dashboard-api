import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';


export const registerUser = async (data) => {
  // 1. Check if user already exists to provide a clean error
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    const error = new Error("Email is already in use");
    error.statusCode = 409; // Conflict
    throw error;
  }

  // 2. Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // 3. Save to database
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
      role: data.role || 'VIEWER'
    },
    // Only select safe fields to return
    select: { id: true, email: true, role: true, createdAt: true }
  });

  return newUser;
};

export const loginUser = async (email, password) => {
  // 1. Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  // 2. Check if account is active
  if (!user.isActive) {
    const error = new Error("Account is deactivated. Please contact support.");
    error.statusCode = 403; // Forbidden
    throw error;
  }

  // 3. Verify password
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // 4. Generate JWT
  const token = jwt.sign(
    { id: user.id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '12h' } // Token expires in 12 hours
  );

  return { 
    user: { id: user.id, email: user.email, role: user.role }, 
    token 
  };
};