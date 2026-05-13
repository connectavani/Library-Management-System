import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error.js';
import userRouter from './routes/user.route.js';
import { configureCors } from './config/corsConfig.js';
import { logger } from './utils/logger.js';
import roleRouter from './routes/role.route.js';
import bookRouter from './routes/book.route.js';


dotenv.config();
export const app = express();
const API_URI = process.env.API_ROUTES;

app.use(configureCors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(
  '/uploads',
  express.static(path.join(path.resolve(), 'src', 'uploads')),
);

// cookie parser
app.use(cookieParser());

// Request Logger Middleware
app.use((req, res, next) => {
  logger.info(
    `Request ${req.method} - ${req.originalUrl} - ${req.ip} - ${new Date()}`,
  );
  logger.info(`Body: ${JSON.stringify(req.body)}`);

  next();
});

// Routers
app.use(`${API_URI}auth`, userRouter);
app.use(`${API_URI}role`, roleRouter);
app.use(`${API_URI}book`, bookRouter);

// test api
app.use('/test', (req, res, next) => {
  logger.info('✅ API is working ');
  res.status(200).json({
    success: true,
    message: '✅  API is Working',
  });
});

app.use('*', (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} Not Found`);
  err.statusCode = 404;
  logger.error(`Route ${req.originalUrl} Not Found`);
  next(err);
});

app.use(ErrorMiddleware);
