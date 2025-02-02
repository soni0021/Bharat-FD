import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import faqRoutes from './routes/faq.route.js';

dotenv.config({ path: './.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Health check endpoint for testing the backend
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running on port 5000' });
});

// Mount FAQ routes at /api/faqs
app.use('/api/faqs', faqRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error-handling middleware
app.use((err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Connect to MongoDB and then export the app
connectDB();

export default app;