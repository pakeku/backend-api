const express = require('express');
const app = express();

// Middleware
const errorHandler = require('./midleware/errorHandler');
const rateLimiter = require('./midleware/rateLimiter');
const compression = require('./midleware/compression');
const helmet = require('./midleware/helmet')
const json = require('./midleware/json');
const cors = require('./midleware/cors')
const morgan = require('./midleware/morgan');

// Routers
const notFoundRouter = require('./routes/notFoundRoute')
const healthRouter = require('./routes/healthRoute')
const storesRouter = require('./routes/storesRoutes');
const rootRouter = require('./routes/rootRoute');

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
app.use('*', notFoundRouter);

module.exports = app;