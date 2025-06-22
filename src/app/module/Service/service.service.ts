/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();
const createServiceIntodb = async (req: Request) => {
  const { category, ...serviceData } = req.body;
  const user = (req as any).user;
  const result = await prisma.$transaction(async (trns) => {
    const createService = await trns.service.create({
      data: serviceData,
    });
    const setProvider = await trns.providerServices.create({
      data: {
        providerId: user.id,
        serviceId: createService.id,
      },
    });
    const setCategory = await category.map((catId: string) =>
      trns.service_Category.update({
        where: { id: catId },
        data: { service_id: createService.id },
      })
    );
    return {
      setProvider,
      createService,
      setCategory,
    };
  });
  return result;
};
export const ServiceOfService = {
  createServiceIntodb,
};
