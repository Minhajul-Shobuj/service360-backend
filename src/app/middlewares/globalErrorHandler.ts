/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { Prisma } from '../../../generated/prisma';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Prisma-specific error handling
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // e.g., Unique constraint failed
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: 'Unique constraint failed on the field: ' + err.meta?.target,
      });
    }

    // Add more Prisma error code cases as needed
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: 'Validation error: ' + err.message,
    });
  }

  // Default case
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
};

export default globalErrorHandler;
