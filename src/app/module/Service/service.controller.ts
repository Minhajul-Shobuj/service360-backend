import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import { ServiceOfService } from './service.service';

const createService: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceOfService.createServiceIntodb(req);
  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: 'Service Created Successfully',
    data: result,
  });
});

export const ServiceController = {
  createService,
};
