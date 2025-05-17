import { NextFunction, Request, Response } from 'express';

// using _ to indicate that the parameter is not used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const response = {
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
  };

  res.status(500).json(response);
};

export default errorHandler;
