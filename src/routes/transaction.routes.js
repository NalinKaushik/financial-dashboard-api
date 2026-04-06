import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createTransactionSchema, updateTransactionSchema } from '../validations/transaction.schema.js';
import * as TransactionController from '../controllers/transaction.controller.js';

const router = Router();

// --- GLOBAL MIDDLEWARE ---
router.use(authenticate); // Everyone must be logged in

// --- ROUTES ---

// 1. Get All (Viewers, Analysts, Admins)
router.get('/', authorize('VIEWER', 'ANALYST', 'ADMIN'), TransactionController.getTransactions);

// 2. Get Single (Viewers, Analysts, Admins) - ADDED THIS
// router.get('/:id', authorize('VIEWER', 'ANALYST', 'ADMIN'), TransactionController.getOneTransaction);

// 3. Create (Admin Only)
router.post(
  '/', 
  authorize('ADMIN'), 
  validate(createTransactionSchema), 
  TransactionController.createTransaction
);

// 4. Update (Admin Only) - CHANGED TO PATCH
router.patch(
  '/:id', 
  authorize('ADMIN'), 
  validate(updateTransactionSchema), 
  TransactionController.updateTransaction
);

// 5. Delete (Admin Only) - SIMPLIFIED PATH
router.delete('/:id', authorize('ADMIN'), TransactionController.deleteTransaction);

export default router;