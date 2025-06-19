import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.post('/create-admin', UserController.createAdmin);
router.post('/create-provider', UserController.createServicePorvider);

export const UserRoute = router;
