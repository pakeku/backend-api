import express, { Application } from 'express';

import errorHandler from './midleware/errorHandler';
import rateLimiter from './midleware/rateLimiter';
import compression from './midleware/compression';
import helmet from './midleware/helmet';
import json from './midleware/json';
import cors from './midleware/cors';
import morgan from './midleware/morgan';

import notFoundRouter from './routes/notFoundRoute';
import healthRouter from './routes/healthRoute';
import storesRouter from './routes/storesRoute';
import rootRouter from './routes/rootRoute';
import authRouter from './routes/authRoute';

const app: Application = express();

// Disable Express identifying header
app.disable('x-powered-by');

// Apply Middleware
app.use(helmet);
app.use(json);
app.use(cors);
app.use(morgan);
app.use(errorHandler);
app.use(rateLimiter);
app.use(compression);

// Set Routes
app.use('/', rootRouter);
app.use('/health', healthRouter);
app.use('/stores', storesRouter);
app.use('/auth', authRouter);
app.use('*', notFoundRouter);

export default app;