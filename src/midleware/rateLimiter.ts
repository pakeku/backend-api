import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes
});

export default limiter;
