import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../../../generated/prisma';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.post(
  '/create-admin',
  auth(UserRole.SUPER_ADMIN),
  UserController.createAdmin
);
router.post('/create-provider', UserController.createServicePorvider);

export const UserRoute = router;
