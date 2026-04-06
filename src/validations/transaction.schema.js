import { z } from 'zod';

// This is what the error message was looking for!
export const createTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive("Amount must be greater than zero"),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.string().min(2, "Category is required"),
    date: z.string().datetime("Must be a valid ISO date string"),
    description: z.string().optional()
  })
});

export const updateTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    category: z.string().min(2).optional(),
    date: z.string().datetime().optional(),
    description: z.string().optional()
  })
});