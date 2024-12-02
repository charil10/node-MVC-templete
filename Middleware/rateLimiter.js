import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs:  1 * 1000, // 60seconds
  max: 20, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

export default limiter;
