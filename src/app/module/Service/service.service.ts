import { Request } from 'express';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();
const createServiceIntodb = async (req: Request) => {
  const data = req.body;
  //const user = req.user;
  const result = await prisma.$transaction(async (trns) => {
    const createService = await trns.service.create({
      data: data,
    });
    const setProvider = await trns.providerServices.create({
      data: {
        providerId: '01JY4NZP6F627Y01XQ0ZEK3HMR',
        serviceId: createService.id,
      },
    });
    return {
      setProvider,
      createService,
    };
  });
  return result;
};
export const ServiceOfService = {
  createServiceIntodb,
};
