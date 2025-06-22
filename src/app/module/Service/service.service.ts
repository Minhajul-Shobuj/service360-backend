import { Request } from 'express';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();
const createServiceIntodb = async (req: Request) => {
  const { category, ...serviceData } = req.body;
  //const user = req.user;
  const result = await prisma.$transaction(async (trns) => {
    const createService = await trns.service.create({
      data: serviceData,
    });
    const setProvider = await trns.providerServices.create({
      data: {
        providerId: '01JY4NZP6F627Y01XQ0ZEK3HMR',
        serviceId: createService.id,
      },
    });
    const setCategory = await Promise.all(
      category.map((catId: string) =>
        trns.service_Category.update({
          where: { id: catId },
          data: { service_id: createService.id },
        })
      )
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
