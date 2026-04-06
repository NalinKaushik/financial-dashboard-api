import express from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

import rateLimit from 'express-rate-limit';
import transactionRoutes from './routes/transaction.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';


const swaggerDocument = YAML.load('./swagger.yaml');


const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});



const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: "Too many login attempts. Take a breather!" }
});



const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(globalLimiter)

// Middleware to parse incoming JSON payloads
app.use(express.json());

app.use('/api/auth/login', authLimiter);


// Mount the routes
app.use('/api/transactions', transactionRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/analysis', analyticsRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Finance Dashboard API is running!');
});

// 404 error handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({success:false,error:'endpoint not found'});
});


// Global Error Handler MUST be the last middleware
app.use(errorHandler);

export default app;