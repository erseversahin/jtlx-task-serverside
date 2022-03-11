import rateLimit from 'express-rate-limit'
export const limitAccess = (options:any) => rateLimit(options);
