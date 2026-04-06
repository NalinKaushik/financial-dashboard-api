import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import * as UserController from '../controllers/users.controller.js';

const router = Router();

// Protect all user routes with Admin-only access
router.use(authenticate, authorize('ADMIN'));

router.get('/:id', authorize('ADMIN'), UserController.getUserById);
router.delete('/:id', authorize('ADMIN'), UserController.deleteUser);
router.get('/profile', UserController.getProfile);
router.get('/', UserController.getAllUsers);
router.patch('/:id/role', UserController.updateUserRole);
router.patch('/:id/status', UserController.updateUserStatus);

export default router;