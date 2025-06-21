import express from 'express';
import { PCategoryController } from './parent_category.controller';

const router = express.Router();

router.post('/create', PCategoryController.createParentCategory);

export const PCategoryRoute = router;
