import {rateLimit}from 'express-rate-limit'
const rateLimiter = rateLimit({
    windowMs:5*1000,
    max:3,
    message: 'Too many requests.',
    standardHeaders: true,
    legacyHeaders: true
});
export default rateLimiter;