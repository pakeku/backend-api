const cors = require('cors');

const ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS || '';
const ALLOWED_METHODS = process.env.CORS_ALLOWED_METHODS || 'GET,POST,PUT,DELETE';
const ALLOWED_HEADERS = process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization';

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ALLOWED_METHODS.split(',').map(m => m.trim()).filter(Boolean),
  allowedHeaders: ALLOWED_HEADERS.split(',').map(h => h.trim()).filter(Boolean),
  credentials: true,
};

module.exports = cors(corsOptions);