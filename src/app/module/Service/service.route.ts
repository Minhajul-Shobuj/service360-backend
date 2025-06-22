import express from 'express';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../../../generated/prisma';

const router = express.Router();

router.post(
  '/create',
  auth(UserRole.SERVICE_PROVIDER),
  ServiceController.createService
);

export const ServiceRoute = router;
