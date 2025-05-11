const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// Redirect root to /health
app.get('/', (req, res) => {
  res.redirect('/health');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Routes
app.use('/stores', require('./routes/storesRoutes'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

module.exports = app;