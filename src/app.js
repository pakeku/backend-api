const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./midleware/errorHandler');
const notFoundRouter = require('./routes/notFoundRoute')
const healthRouter = require('./routes/healthRoute')
const storesRouter = require('./routes/storesRoutes');
const rootRouter = require('./routes/rootRoute');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(errorHandler);

app.use('/', rootRouter);
app.use('/health', healthRouter);
app.use('/stores', storesRouter);
app.use('*', notFoundRouter);

module.exports = app;