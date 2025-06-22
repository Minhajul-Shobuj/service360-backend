import { Request } from 'express';
import { PrismaClient } from '../../../../generated/prisma';
const prisma = new PrismaClient();

const createServiceCategory = async (req: Request) => {
  const result = await prisma.service_Category.create({
    data: req.body,
  });
  return result;
};

export const ServiceCategoryService = {
  createServiceCategory,
};
