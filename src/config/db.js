import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { PrismaClient } = pkg;

// 1. Create a PostgreSQL connection pool using your Neon URL
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// 2. Attach the pool to the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Instantiate Prisma using the adapter
export const prisma = new PrismaClient({ adapter });