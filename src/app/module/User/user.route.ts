import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.post('/create-admin', UserController.createAdmin);

export const UserRoute = router;
