import { Router } from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.schema.js';
import * as AuthController from '../controllers/auth.controller.js';

const router = Router();


router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);

export default router;