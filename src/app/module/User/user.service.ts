import { Request } from 'express';
import { PrismaClient } from '../../../../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUserIntoDb = async (req: Request) => {
  const data = req.body;
  const { address, ...userData } = data;
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  const result = prisma.$transaction(async (trns) => {
    const user = await trns.user.create({
      data: userData,
    });
    const setAddress = await trns.address.create({
      data: {
        ...address,
        user_id: user.user_id,
      },
    });
    return {
      user,
      setAddress,
    };
  });
  return result;
};

const createAdminIntoDb = async (req: Request) => {
  const data = req.body;
  const { address, ...userData } = data;
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  const adminData = {
    email: userData.email,
    fullName: userData.fullName,
  };
  const result = prisma.$transaction(async (trns) => {
    const user = await trns.user.create({
      data: userData,
    });
    const setAddress = await trns.address.create({
      data: {
        ...address,
        user_id: user.user_id,
      },
    });
    const admin = await trns.admin.create({
      data: adminData,
    });
    return {
      user,
      setAddress,
      admin,
    };
  });
  return result;
};

export const UserService = {
  createUserIntoDb,
  createAdminIntoDb,
};
