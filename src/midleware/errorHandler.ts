import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`[ERROR] ${err.stack}`);

  const response = {
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
  };

  res.status(500).json(response);
};

export default errorHandler;