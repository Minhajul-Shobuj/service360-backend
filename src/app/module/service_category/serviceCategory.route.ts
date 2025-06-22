import express from 'express';
import { ServiceCategoryController } from './serviceCategoty.controller';

const router = express.Router();

router.post('/create', ServiceCategoryController.createServiceCategory);

export const ServiceCategoryRoute = router;
