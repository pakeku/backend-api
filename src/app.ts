import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './documentation/swaggerOptions';
import compression from './midleware/compression';
import cors from './midleware/cors';
import errorHandler from './midleware/errorHandler';
import helmet from './midleware/helmet';
import json from './midleware/json';
import morgan from './midleware/morgan';
import rateLimiter from './midleware/rateLimiter';
import authRouter from './routes/authRoute';
import healthRouter from './routes/healthRoute';
import notFoundRouter from './routes/notFoundRoute';
import rootRouter from './routes/rootRoute';
import storesRouter from './routes/storesRoute';

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('*', notFoundRouter);

export default app;
