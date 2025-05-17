import { Request, Response } from 'express';

import errorHandler from '../../midleware/errorHandler';

describe('errorHandler middleware', () => {
  const mockReq = {} as Request;

  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;
  let mockRes: Response;

  beforeEach(() => {
    mockStatus = jest.fn().mockReturnThis();
    mockJson = jest.fn();

    mockRes = {
      json: mockJson,
      status: mockStatus,
    } as unknown as Response;
  });

  const mockNext = jest.fn();

  it('should respond with 500 and error message in non-production', () => {
    process.env.NODE_ENV = 'development'; // or 'test'
    const err = new Error('Something went wrong');

    errorHandler(err, mockReq, mockRes, mockNext);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Something went wrong',
        message: 'Internal Server Error',
      })
    );
  });

  it('should not include error details in production', () => {
    process.env.NODE_ENV = 'production';
    const err = new Error('Production error');

    errorHandler(err, mockReq, mockRes, mockNext);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
